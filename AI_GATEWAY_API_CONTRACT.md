# AI Gateway — API Contract

**Purpose:** Concrete API contract between the Multiplus Quarkus backend and the AI Gateway. All AI functionality is exposed through these endpoints; the backend never calls the Model Serving layer directly.

**Reference:** Request/response envelopes are defined in `PLATFORM_AI_DATA_SCHEMAS.md` (AIRequest, AIResponse). This document specifies the per-endpoint usage and payloads.

**Base path:** All endpoints are relative to the AI Gateway base URL (e.g. `https://ai-gateway.example.com`). Assume API version prefix if needed (e.g. `/v1`); paths below are written without version for brevity.

---

## Common Conventions

- **Content-Type:** `application/json` for request and response bodies.
- **Authentication:** Service-to-service (e.g. API key, JWT, or mTLS) as agreed; not defined in this contract.
- **Request envelope:** Every request body is an **AIRequest** with `requestType` aligned to the endpoint (or endpoint inferred from path).
- **Response envelope:** Every response body is an **AIResponse** with `requestId` echoed, `status`, and `result` or `error`.
- **Idempotency:** Backend should send a unique `requestId` per call; gateway may use it for idempotent handling or logging.

---

## 1. Risk Score Explanation

**Endpoint:** `POST /ai/explain-risk-score`

**HTTP method:** POST

**Purpose:** Generate a human-readable explanation of the user's risk score (e.g. why they are in a given band, what the score reflects). Used when the user asks "Explain my risk score" or when pre-generating explanations after a new score is computed.

**Request structure:**  
Body is an **AIRequest** where:
- `requestType`: `"explain_risk_score"` (or omitted if path implies it).
- `userId`: Required (string).
- `contextObject`: **FinancialProfile** or a minimal subset sufficient for explanation:
  - Required: `riskScore`, `riskBand`.
  - Recommended: `questionnaireResults` (if questionnaire-based), or score components (e.g. credit, income, DTI) if available.
  - Optional: `age`, `investmentHorizon`, `incomeRange`, `investmentGoals`, etc. for richer narrative.
- `metadata`: Optional (e.g. `locale`).
- `timeout`: Optional (milliseconds).

**Response structure:**  
Body is an **AIResponse** where:
- `status`: `"success"` | `"error"` | `"timeout"`.
- `result`: Object with at least:
  - `explanation` (string): Human-readable explanation text.
  - Optionally `reasoningStructure` (object): e.g. breakdown by component or section for UI.
- `error`: Populated when `status` is `"error"` (e.g. `code`, `message`).

**Example request**

```json
{
  "requestId": "req_explain_risk_001",
  "requestType": "explain_risk_score",
  "userId": "usr_abc123",
  "contextObject": {
    "userId": "usr_abc123",
    "riskScore": 420,
    "riskBand": "Moderate",
    "investmentHorizon": "long",
    "questionnaireResults": {
      "version": "1.0",
      "compositeScore": 420,
      "band": "Moderate",
      "categoryScores": { "risk_tolerance": 65, "time_horizon": 70 }
    },
    "generatedAt": "2025-03-07T10:30:00Z"
  },
  "metadata": { "locale": "en-IN" },
  "timeout": 15000
}
```

**Example response**

```json
{
  "requestId": "req_explain_risk_001",
  "status": "success",
  "result": {
    "explanation": "Your risk score of 420 places you in the Moderate band. This reflects a balanced approach: your risk tolerance and time horizon scores support a mix of equity and debt. You can consider a 50–60% equity allocation with the remainder in debt and hybrid funds.",
    "reasoningStructure": {
      "summary": "Moderate band, balanced profile",
      "factors": ["risk_tolerance", "time_horizon", "composite_score"]
    }
  },
  "reasoning": null,
  "modelUsed": "llama-3-8b",
  "latency": 1200,
  "error": null
}
```

**Sync vs async:** Synchronous. Backend blocks until the gateway returns. User-facing flow.

**Timeout recommendation:** 15–30 seconds. Risk explanation is a single LLM call with small context.

---

## 2. Allocation Explanation

**Endpoint:** `POST /ai/explain-allocation`

**HTTP method:** POST

**Purpose:** Explain why a particular asset allocation and fund set were recommended (e.g. alignment with risk band, gap closure, diversification). Used when the user views their recommendation and asks for an explanation.

**Request structure:**  
Body is an **AIRequest** where:
- `requestType`: `"explain_allocation"`.
- `userId`: Required (string).
- `contextObject`: Object containing:
  - **FinancialProfile** (or minimal subset: `riskScore`, `riskBand`, `investmentHorizon`).
  - **Recommendation** (or equivalent): `allocation`, `recommendedFunds`, optionally `metadata` (e.g. risk band, gap threshold). Do not require `reasoning` in request (that is the output).
- `metadata`: Optional (e.g. `locale`).
- `timeout`: Optional (ms).

**Response structure:**  
Body is an **AIResponse** where:
- `status`: `"success"` | `"error"` | `"timeout"`.
- `result`: Object with at least:
  - `explanation` (string): Human-readable explanation of the allocation and fund selection.
- `error`: Populated when `status` is `"error"`.

**Example request**

```json
{
  "requestId": "req_explain_alloc_001",
  "requestType": "explain_allocation",
  "userId": "usr_abc123",
  "contextObject": {
    "financialProfile": {
      "userId": "usr_abc123",
      "riskScore": 420,
      "riskBand": "Moderate",
      "investmentHorizon": "long",
      "generatedAt": "2025-03-07T10:30:00Z"
    },
    "recommendation": {
      "recommendationId": "rec_001",
      "userId": "usr_abc123",
      "allocation": { "equity": 50, "debt": 35, "hybrid": 10, "cash": 5 },
      "recommendedFunds": [
        { "schemeId": "fund_001", "schemeName": "ABC Equity Fund", "category": "Equity", "suggestedAllocationPercent": 25, "fundRiskScore": 400 }
      ],
      "generatedAt": "2025-03-07T10:35:00Z",
      "metadata": { "riskBand": "Moderate", "gapThreshold": "Acceptable" }
    }
  },
  "metadata": { "locale": "en-IN" },
  "timeout": 20000
}
```

**Example response**

```json
{
  "requestId": "req_explain_alloc_001",
  "status": "success",
  "result": {
    "explanation": "Your Moderate risk profile supports a 50% equity allocation. The recommended funds were chosen because their risk scores sit within an acceptable range of your score (420), balancing growth with stability. ABC Equity Fund fits the large-cap equity slot and helps diversify your portfolio while staying within your risk band."
  },
  "reasoning": null,
  "modelUsed": "llama-3-8b",
  "latency": 1800,
  "error": null
}
```

**Sync vs async:** Synchronous. User is waiting for the explanation on the recommendation screen.

**Timeout recommendation:** 20–30 seconds. Single LLM call with allocation + fund list context.

---

## 3. Document Extraction

**Endpoint:** `POST /ai/extract-document`

**HTTP method:** POST

**Purpose:** Extract structured data from uploaded financial documents. Supports document types such as CAS statements, bank statements, insurance policies, and tax documents. Gateway delegates to Document Intelligence Service; result is structured fields (e.g. holdings, transactions, policy details) for the backend to persist.

**Request structure:**  
Body is an **AIRequest** where:
- `requestType`: `"extract_document"`.
- `userId`: Optional but recommended (string).
- `contextObject`: Object containing:
  - `documentId` (string): Platform document identifier.
  - `documentType` (string): e.g. `"CAS"`, `"BANK_STATEMENT"`, `"INSURANCE"`, `"TAX"`.
  - `storageKey` (string): Reference for the gateway to fetch the document (e.g. S3 key, or URL if gateway can access it). Format is environment-specific (e.g. `s3://bucket/key` or `https://...`).
  - Optionally `options`: e.g. `{ "extractTables": true }` for document-type-specific hints.
- `metadata`: Optional.
- `timeout`: Optional (ms); document processing can be slower.

**Response structure:**  
Body is an **AIResponse** where:
- `status`: `"success"` | `"error"` | `"timeout"`.
- `result`: Object with document-type-specific structure, for example:
  - Common: `entities` (object with named fields), `confidence` (number 0–1).
  - CAS: e.g. `schemeName`, `holdings[]`, `transactions[]`.
  - Bank: e.g. `accountNumber`, `transactions[]`, `balance`.
  - Insurance: e.g. `policyNumber`, `premium`, `sumAssured`.
- `error`: Populated when `status` is `"error"` (e.g. unsupported type, parse failure).

**Example request**

```json
{
  "requestId": "req_extract_doc_001",
  "requestType": "extract_document",
  "userId": "usr_abc123",
  "contextObject": {
    "documentId": "doc_upload_456",
    "documentType": "CAS",
    "storageKey": "s3://multiplus-docs/usr_abc123/doc_upload_456.pdf"
  },
  "metadata": null,
  "timeout": 60000
}
```

**Example response**

```json
{
  "requestId": "req_extract_doc_001",
  "status": "success",
  "result": {
    "entities": {
      "schemeName": "ABC Growth Fund",
      "folioNumber": "FOL123",
      "holdings": [
        { "scheme": "ABC Growth Fund", "units": 100, "nav": 150, "value": 15000 }
      ],
      "transactions": []
    },
    "confidence": 0.92
  },
  "reasoning": null,
  "modelUsed": "document-extraction-v1",
  "latency": 3500,
  "error": null
}
```

**Sync vs async:** Can be synchronous (backend waits for extraction) or asynchronous (gateway returns `202 Accepted` with a `jobId`, backend polls or receives callback). Contract above is synchronous; async variant can be added later with a separate status/poll endpoint.

**Timeout recommendation:** 45–90 seconds for OCR + extraction. Backend should set a higher timeout than for pure LLM endpoints.

---

## 4. Financial Insight Generation

**Endpoint:** `POST /ai/generate-insight`

**HTTP method:** POST

**Purpose:** Generate narrative financial insights for the user, e.g. risk insights, portfolio diversification insights, or investment behavior insights. Used for dashboard widgets, notification content, or report sections.

**Request structure:**  
Body is an **AIRequest** where:
- `requestType`: `"generate_financial_insight"` or `"generate_insight"`.
- `userId`: Required (string).
- `contextObject`: Object containing:
  - **FinancialProfile** (or subset).
  - **Portfolio** (or subset): holdings, assetAllocation, currentValue, performanceMetrics. Can be null if user has no portfolio yet.
  - Optionally `insightType`: e.g. `"risk"`, `"diversification"`, `"behavior"`, or omit for a general insight.
- `metadata`: Optional (e.g. `locale`, `channel` for notification).
- `timeout`: Optional (ms).

**Response structure:**  
Body is an **AIResponse** where:
- `status`: `"success"` | `"error"` | `"timeout"`.
- `result`: Object with at least:
  - `insight` (string): Narrative insight text.
  - Optionally `sections` (object or array): e.g. `risk`, `diversification`, `behavior` for structured display.
- `error`: Populated when `status` is `"error"`.

**Example request**

```json
{
  "requestId": "req_insight_001",
  "requestType": "generate_financial_insight",
  "userId": "usr_abc123",
  "contextObject": {
    "financialProfile": {
      "userId": "usr_abc123",
      "riskScore": 420,
      "riskBand": "Moderate",
      "investmentHorizon": "long",
      "investmentGoals": ["retirement", "wealth_creation"],
      "generatedAt": "2025-03-07T10:30:00Z"
    },
    "portfolio": {
      "portfolioId": "port_xyz789",
      "userId": "usr_abc123",
      "holdings": [],
      "assetAllocation": { "equity": 0, "debt": 0, "hybrid": 0, "cash": 0 },
      "currentValue": 0,
      "asOf": "2025-03-07T00:00:00Z"
    },
    "insightType": "risk"
  },
  "metadata": { "locale": "en-IN" },
  "timeout": 20000
}
```

**Example response**

```json
{
  "requestId": "req_insight_001",
  "status": "success",
  "result": {
    "insight": "Your Moderate risk profile suggests a balanced mix of equity and debt. With a long investment horizon and goals like retirement and wealth creation, you can consider gradually building equity exposure through SIPs in diversified funds while keeping a cushion in debt.",
    "sections": {
      "risk": "Moderate band supports 50–60% equity.",
      "diversification": "No current holdings; consider starting with one equity and one debt fund."
    }
  },
  "reasoning": null,
  "modelUsed": "llama-3-8b",
  "latency": 1500,
  "error": null
}
```

**Sync vs async:** Typically synchronous when requested on-demand (e.g. dashboard). Can be invoked asynchronously by the Trigger Engine for batch insight generation (e.g. daily digest); in that case the caller is the Trigger Engine, not the backend user API.

**Timeout recommendation:** 20–30 seconds for a single narrative insight.

---

## 5. Recommendation Reasoning

**Endpoint:** `POST /ai/recommendation-reasoning`

**HTTP method:** POST

**Purpose:** Explain why specific funds were selected for the recommendation (fund-level reasoning, risk alignment, ranking rationale). Complements allocation explanation with more focus on product choice. Can be used on the same screen as allocation explanation or as a separate “Why these funds?” section.

**Request structure:**  
Body is an **AIRequest** where:
- `requestType`: `"recommendation_reasoning"`.
- `userId`: Required (string).
- `contextObject`: Object containing:
  - **FinancialProfile** (or subset: `riskScore`, `riskBand`, `investmentHorizon`).
  - **Recommendation**: `recommendedFunds` (with schemeId, schemeName, category, suggestedAllocationPercent, fundRiskScore), and optionally `allocation`, `metadata`.
- `metadata`: Optional (e.g. `locale`).
- `timeout`: Optional (ms).

**Response structure:**  
Body is an **AIResponse** where:
- `status`: `"success"` | `"error"` | `"timeout"`.
- `result`: Object with at least:
  - `reasoning` (string): Human-readable reasoning for the fund selection.
  - Optionally `fundReasons` (array): Short reason per fund for UI bullets.
- `error`: Populated when `status` is `"error"`.

**Example request**

```json
{
  "requestId": "req_reasoning_001",
  "requestType": "recommendation_reasoning",
  "userId": "usr_abc123",
  "contextObject": {
    "financialProfile": {
      "userId": "usr_abc123",
      "riskScore": 420,
      "riskBand": "Moderate",
      "investmentHorizon": "long",
      "generatedAt": "2025-03-07T10:30:00Z"
    },
    "recommendation": {
      "recommendationId": "rec_001",
      "userId": "usr_abc123",
      "recommendedFunds": [
        { "schemeId": "fund_001", "schemeName": "ABC Equity Fund", "category": "Equity", "suggestedAllocationPercent": 25, "fundRiskScore": 400 },
        { "schemeId": "fund_002", "schemeName": "XYZ Debt Fund", "category": "Debt", "suggestedAllocationPercent": 35, "fundRiskScore": 350 }
      ],
      "generatedAt": "2025-03-07T10:35:00Z"
    }
  },
  "metadata": { "locale": "en-IN" },
  "timeout": 20000
}
```

**Example response**

```json
{
  "requestId": "req_reasoning_001",
  "status": "success",
  "result": {
    "reasoning": "ABC Equity Fund was selected for the equity slot because its risk score (400) sits within an acceptable range of your score (420), reducing volatility risk while allowing growth. XYZ Debt Fund fits your Moderate band for the debt portion and provides stability. Together they align with your long horizon and 50% equity target.",
    "fundReasons": [
      "ABC Equity Fund: Risk-aligned large-cap equity, acceptable gap to your score.",
      "XYZ Debt Fund: Stable debt option for Moderate band."
    ]
  },
  "reasoning": null,
  "modelUsed": "llama-3-8b",
  "latency": 1900,
  "error": null
}
```

**Sync vs async:** Synchronous when the user is on the recommendation screen. Can be pre-generated asynchronously (e.g. on AllocationGenerated event) and cached for fast retrieval.

**Timeout recommendation:** 20–30 seconds.

---

## Summary Table

| Endpoint | Purpose | contextObject | Sync/Async | Timeout (recommended) |
|----------|---------|----------------|------------|------------------------|
| `POST /ai/explain-risk-score` | Human-readable risk score explanation | FinancialProfile (min: riskScore, riskBand) | Sync | 15–30 s |
| `POST /ai/explain-allocation` | Why this allocation and fund set | FinancialProfile + Recommendation | Sync | 20–30 s |
| `POST /ai/extract-document` | Structured extraction from documents | documentId, documentType, storageKey | Sync (or async later) | 45–90 s |
| `POST /ai/generate-insight` | Narrative financial insights | FinancialProfile + Portfolio (+ optional insightType) | Sync or async (batch) | 20–30 s |
| `POST /ai/recommendation-reasoning` | Why these funds were selected | FinancialProfile + Recommendation | Sync | 20–30 s |

---

## Error Response Shape

For any endpoint, when `status` is `"error"` or `"timeout"`, the gateway returns an **AIResponse** with:

- `status`: `"error"` or `"timeout"`.
- `result`: null.
- `error`: `{ "code": "<ERROR_CODE>", "message": "<human-readable message>" }`.

Example error codes (to be aligned with gateway implementation): `GATEWAY_TIMEOUT`, `MODEL_UNAVAILABLE`, `INVALID_REQUEST`, `EXTRACTION_FAILED`, `RATE_LIMITED`.

---

*This document defines the API contract only. No implementation files are modified. OpenAPI/JSON Schema can be generated from this specification.*
