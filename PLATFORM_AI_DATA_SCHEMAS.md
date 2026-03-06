# Multiplus Platform — AI Integration Data Schemas

**Purpose:** Canonical data structures used in requests and responses between the Quarkus backend and the AI Gateway. These schemas form the **contract between the platform and AI systems**.

**Context:** The AI layer does not query backend services directly. The backend sends structured context objects to the AI Gateway. All schemas use JSON; field types and semantics are defined below.

---

## 1. FinancialProfile

**What it represents**  
A snapshot of a user’s financial characteristics used for AI reasoning (explanations, insights, recommendation narrative). It is a read-only, aggregated view produced by the platform from risk scoring, questionnaire, and (when available) profile/KYC data.

**How it is generated**  
The backend builds it from: **UserRiskCalculatorService** (risk score, band, variables), **RiskAnalysisEngineService** / **ManualAssessmentService** (questionnaire answers and composite score), **RiskAssetAllocationConfig** (allocation bands), and optionally KYC/profile (age, income range). No AI is involved in generation; it is assembled by a backend service (e.g. `FinancialProfileAssembler` or controller) before calling the AI Gateway.

**Schema (conceptual)**

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | Platform user identifier. |
| `riskScore` | number | User risk score (e.g. 1–1000) from credit/questionnaire. |
| `riskBand` | string | Risk bucket (e.g. Secure, Conservative, Moderate, Growth, Aggressive). |
| `investmentHorizon` | string | e.g. "short", "medium", "long" or years. |
| `age` | number \| null | User age if available from KYC/profile. |
| `incomeRange` | string \| null | e.g. "0-5L", "5-10L", "10L+" or band code. |
| `liquidityNeeds` | string \| null | e.g. "low", "medium", "high". |
| `taxBracket` | string \| null | e.g. "10%", "20%", "30%" or slab. |
| `investmentGoals` | string[] | e.g. ["retirement", "wealth_creation", "child_education"]. |
| `questionnaireResults` | object | Summary of questionnaire outcome (e.g. category scores, band, version). |
| `generatedAt` | string (ISO 8601) | When this profile snapshot was built. |

**JSON example**

```json
{
  "userId": "usr_abc123",
  "riskScore": 420,
  "riskBand": "Moderate",
  "investmentHorizon": "long",
  "age": 34,
  "incomeRange": "10-20L",
  "liquidityNeeds": "medium",
  "taxBracket": "20%",
  "investmentGoals": ["retirement", "wealth_creation"],
  "questionnaireResults": {
    "version": "1.0",
    "compositeScore": 420,
    "band": "Moderate",
    "categoryScores": { "risk_tolerance": 65, "time_horizon": 70 }
  },
  "generatedAt": "2025-03-07T10:30:00Z"
}
```

**Platform production**  
Backend loads `UserRiskScore`, `UserRiskVariables`, `RiskProfile` / `ManualAssessmentSession`, and optional profile/KYC; maps to the fields above; returns or attaches to an AI request. Single service or controller responsible for building this DTO.

---

## 2. Portfolio

**What it represents**  
A user’s current investment holdings and high-level metrics: list of holdings, asset allocation breakdown, total value, and optional risk/performance metrics. Used by AI for allocation explanation, insight, or recommendation reasoning.

**How the data originates**  
**PortfolioController** / portfolio service (when implemented) returns holdings from platform storage (MySQL/API). **AssetAllocationService** provides allocation bands and matching funds; NAV/valuation may come from **NavIngestionService** / fund data. Backend aggregates holdings, computes or retrieves allocation and value, and optionally attaches fund risk or performance from **FundMetricsNormalizationService** / `fund_metrics_normalized`. The backend assembles this object; AI only consumes it.

**Schema (conceptual)**

| Field | Type | Description |
|-------|------|-------------|
| `portfolioId` | string | Platform portfolio identifier. |
| `userId` | string | Owner. |
| `holdings` | array | List of positions (scheme id, name, quantity/units, value, allocation %). |
| `assetAllocation` | object | Current allocation by asset class (e.g. equity, debt, hybrid, cash). |
| `currentValue` | number | Total portfolio value (e.g. INR). |
| `riskScore` | number \| null | Portfolio-level risk score if computed. |
| `performanceMetrics` | object \| null | e.g. return (1Y, 3Y), volatility, drawdown if available. |
| `asOf` | string (ISO 8601) | Valuation / snapshot time. |

**JSON example**

```json
{
  "portfolioId": "port_xyz789",
  "userId": "usr_abc123",
  "holdings": [
    {
      "schemeId": "fund_001",
      "schemeName": "ABC Equity Fund",
      "units": 150.5,
      "currentValue": 25000,
      "allocationPercent": 45
    }
  ],
  "assetAllocation": {
    "equity": 45,
    "debt": 35,
    "hybrid": 15,
    "cash": 5
  },
  "currentValue": 55000,
  "riskScore": 380,
  "performanceMetrics": {
    "return1Y": 12.5,
    "return3Y": 8.2,
    "volatility": 14
  },
  "asOf": "2025-03-07T00:00:00Z"
}
```

**Platform production**  
Portfolio service loads holdings from DB; enrichment (NAV, value, allocation %) from fund/NAV data; allocation breakdown and optional risk/metrics from allocation and metrics services. One DTO built per portfolio view requested.

---

## 3. Recommendation

**What it represents**  
A portfolio recommendation produced by the platform: target allocation, recommended funds, and optional reasoning text. Used to separate **deterministic output** (allocation, fund list) from **AI-generated reasoning**.

**Deterministic vs AI**  
- **From platform (deterministic):** `recommendationId`, `userId`, `allocation`, `recommendedFunds`, `generatedAt`, and any suitability/constraint metadata. Produced by **AssetAllocationService** (and future recommendation engine): risk-based allocation and matching funds by risk gap.  
- **From AI:** `reasoning` (natural-language “why these funds / this allocation”). Filled when the backend calls the AI Gateway (e.g. `explain_allocation`) and attaches the returned text to the recommendation response.

**Schema (conceptual)**

| Field | Type | Description |
|-------|------|-------------|
| `recommendationId` | string | Unique id for this recommendation. |
| `userId` | string | User for whom it was generated. |
| `allocation` | object | Target allocation by asset class (same shape as Portfolio.assetAllocation). |
| `recommendedFunds` | array | List of recommended schemes (id, name, category, suggested allocation %, risk score). |
| `reasoning` | string \| null | Natural-language explanation (AI-generated when requested). |
| `generatedAt` | string (ISO 8601) | When the recommendation was produced. |
| `metadata` | object \| null | e.g. risk band used, gap thresholds, version. |

**JSON example**

```json
{
  "recommendationId": "rec_20250307_usr_abc123",
  "userId": "usr_abc123",
  "allocation": {
    "equity": 50,
    "debt": 35,
    "hybrid": 10,
    "cash": 5
  },
  "recommendedFunds": [
    {
      "schemeId": "fund_001",
      "schemeName": "ABC Equity Fund",
      "category": "Equity",
      "suggestedAllocationPercent": 25,
      "fundRiskScore": 400
    }
  ],
  "reasoning": "Your Moderate risk profile supports a 50% equity allocation. The selected funds align with your risk score (420) within an acceptable gap and improve diversification across large-cap and debt.",
  "generatedAt": "2025-03-07T10:35:00Z",
  "metadata": { "riskBand": "Moderate", "gapThreshold": "Acceptable" }
}
```

**Platform production**  
Backend gets allocation and `recommendedFunds` from **AssetAllocationService**; assigns `recommendationId` and `generatedAt`. If the client requested explanation, backend calls AI Gateway with this (or a subset) as context and sets `reasoning` from the AI response.

---

## 4. TriggerEvent

**What it represents**  
An event emitted by the platform (or AI) to drive asynchronous AI workflows: risk explanation pre-generation, document extraction, insight batch, etc. The **Trigger Engine** consumes these and invokes the AI Gateway or internal AI services.

**Schema (conceptual)**

| Field | Type | Description |
|-------|------|-------------|
| `eventType` | string | Canonical event name. |
| `entityType` | string | e.g. "user", "portfolio", "document", "recommendation". |
| `entityId` | string | Id of the primary entity (user id, portfolio id, document id). |
| `timestamp` | string (ISO 8601) | Event time. |
| `payload` | object | Event-specific data (score, document ref, allocation summary, etc.). |
| `correlationId` | string \| null | Optional id for tracing. |

**Example event types**

| eventType | entityType | Typical payload contents |
|-----------|------------|---------------------------|
| `RiskScoreComputed` | user | `userId`, `riskScore`, `riskBand`, `components` (optional). |
| `PortfolioCreated` | portfolio | `portfolioId`, `userId`, initial `holdings` or summary. |
| `DocumentUploaded` | document | `documentId`, `userId`, `documentType`, `storageKey` or URL. |
| `PortfolioRebalanced` | portfolio | `portfolioId`, `userId`, new `allocation`, `previousAllocation`. |
| `AllocationGenerated` | recommendation | `userId`, `recommendationId`, allocation summary (for pre-generating reasoning). |

**JSON example (RiskScoreComputed)**

```json
{
  "eventType": "RiskScoreComputed",
  "entityType": "user",
  "entityId": "usr_abc123",
  "timestamp": "2025-03-07T10:30:00Z",
  "payload": {
    "userId": "usr_abc123",
    "riskScore": 420,
    "riskBand": "Moderate",
    "components": { "credit": 450, "income": 400, "dti": 380 }
  },
  "correlationId": "corr_evt_001"
}
```

**JSON example (DocumentUploaded)**

```json
{
  "eventType": "DocumentUploaded",
  "entityType": "document",
  "entityId": "doc_upload_456",
  "timestamp": "2025-03-07T11:00:00Z",
  "payload": {
    "documentId": "doc_upload_456",
    "userId": "usr_abc123",
    "documentType": "CAS",
    "storageKey": "s3://bucket/path/doc_upload_456.pdf"
  },
  "correlationId": null
}
```

**Platform production**  
Backend (or domain services) publishes events after state changes: e.g. after **UserRiskOrchestrationService** persists a new score it emits `RiskScoreComputed`; after **DocumentUploadService** stores a file it emits `DocumentUploaded`. Events are sent to a message queue or event bus consumed by the Trigger Engine.

---

## 5. AIRequest

**What it represents**  
Generic request envelope sent from the Quarkus backend to the AI Gateway. Identifies the kind of AI operation, the user, a context object (profile, portfolio, recommendation, document ref, etc.), and optional metadata and timeout.

**Schema (conceptual)**

| Field | Type | Description |
|-------|------|-------------|
| `requestId` | string | Unique id for idempotency and tracing. |
| `requestType` | string | One of the canonical request types (see below). |
| `userId` | string \| null | User context when applicable. |
| `contextObject` | object | Type-specific payload (e.g. FinancialProfile, Portfolio, Recommendation, or document ref). |
| `metadata` | object \| null | e.g. locale, clientId, feature flags. |
| `timeout` | number \| null | Max response time in milliseconds (optional; gateway may enforce default). |

**Example request types**

| requestType | Typical contextObject |
|-------------|------------------------|
| `explain_risk_score` | `{ "riskScore", "riskBand", "components" }` or full FinancialProfile subset. |
| `explain_allocation` | Allocation + recommendedFunds + optional FinancialProfile. |
| `extract_document` | `{ "documentId", "storageKey" or "url", "documentType" }`. |
| `generate_financial_insight` | FinancialProfile and optionally Portfolio or summary. |
| `recommendation_reasoning` | Same as explain_allocation (Recommendation or equivalent). |

**JSON example (explain_risk_score)**

```json
{
  "requestId": "req_ai_001",
  "requestType": "explain_risk_score",
  "userId": "usr_abc123",
  "contextObject": {
    "riskScore": 420,
    "riskBand": "Moderate",
    "components": { "credit": 450, "income": 400, "dti": 380, "utilization": 350 }
  },
  "metadata": { "locale": "en-IN" },
  "timeout": 15000
}
```

**JSON example (extract_document)**

```json
{
  "requestId": "req_ai_002",
  "requestType": "extract_document",
  "userId": "usr_abc123",
  "contextObject": {
    "documentId": "doc_upload_456",
    "storageKey": "s3://bucket/path/doc_upload_456.pdf",
    "documentType": "CAS"
  },
  "metadata": null,
  "timeout": 60000
}
```

**Platform production**  
Backend builds `AIRequest` in the code path that needs AI (e.g. explanation endpoint, document extraction endpoint). It sets `requestId` (UUID or similar), `requestType`, `userId`, and builds `contextObject` from **FinancialProfile**, **Portfolio**, **Recommendation**, or document metadata. Then it sends the JSON to the AI Gateway (HTTP POST).

---

## 6. AIResponse

**What it represents**  
Generic response envelope returned by the AI Gateway to the backend: status, result payload, optional reasoning/model/latency, or error details.

**Schema (conceptual)**

| Field | Type | Description |
|-------|------|-------------|
| `requestId` | string | Echo of the request id. |
| `status` | string | e.g. "success", "partial", "error", "timeout". |
| `result` | object \| null | Type-specific result (e.g. `{ "explanation": "..." }`, `{ "entities": [...] }`). |
| `reasoning` | string \| null | Optional free-form reasoning or model comment. |
| `modelUsed` | string \| null | Model identifier (e.g. "llama-3-8b"). |
| `latency` | number \| null | Response latency in milliseconds. |
| `error` | object \| null | If status is error: `{ "code", "message" }`. |

**JSON example (success — explanation)**

```json
{
  "requestId": "req_ai_001",
  "status": "success",
  "result": {
    "explanation": "Your risk score of 420 places you in the Moderate band. This reflects a balanced credit profile, with income and DTI contributing positively. Your allocation can include a mix of equity and debt funds aligned with this band."
  },
  "reasoning": null,
  "modelUsed": "llama-3-8b",
  "latency": 1200,
  "error": null
}
```

**JSON example (success — document extraction)**

```json
{
  "requestId": "req_ai_002",
  "status": "success",
  "result": {
    "entities": {
      "schemeName": "ABC Fund",
      "holdings": [
        { "scheme": "ABC Fund", "units": 100, "value": 15000 }
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

**JSON example (error)**

```json
{
  "requestId": "req_ai_001",
  "status": "error",
  "result": null,
  "reasoning": null,
  "modelUsed": null,
  "latency": 15000,
  "error": {
    "code": "GATEWAY_TIMEOUT",
    "message": "Model serving did not respond within timeout."
  }
}
```

**Platform production**  
AI Gateway (and downstream AI services) builds `AIResponse` after processing: sets `requestId` from request, `status`, `result` (explanation text, extracted entities, insight payload), and optionally `modelUsed` and `latency`. On failure, sets `status` and `error`. Backend reads `status` and `result` (or `error`) and either attaches the result to the API response or handles the error (e.g. no explanation, retry, or user message).

---

## Summary

| Schema | Producer | Consumer | Purpose |
|--------|----------|----------|---------|
| **FinancialProfile** | Backend (from UserRisk, Questionnaire, profile) | AI Gateway / AI services | Context for risk explanation, insight, reasoning. |
| **Portfolio** | Backend (portfolio + allocation + metrics) | AI Gateway / AI services | Context for allocation explanation, insight. |
| **Recommendation** | Backend (AssetAllocationService) + AI (reasoning) | AI Gateway (context) / Client (response) | Deterministic recommendation + optional AI reasoning. |
| **TriggerEvent** | Backend (event publisher) | Trigger Engine | Drive async AI workflows. |
| **AIRequest** | Backend | AI Gateway | Canonical request envelope. |
| **AIResponse** | AI Gateway | Backend | Canonical response envelope. |

All of these are documentation definitions only; no implementation files are modified. Implementations (Java DTOs, OpenAPI, or JSON Schema) can be derived from this document.
