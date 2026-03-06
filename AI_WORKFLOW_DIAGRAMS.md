# Multiplus AI Platform — AI Workflow Diagrams

**Purpose:** Sequence diagrams for the main AI feature workflows. These show the step-by-step flow through frontend, backend, AI Gateway, AI services, and Model Serving. Infrastructure is described in earlier architecture docs.

**Format:** Mermaid sequence diagrams. Render in a Mermaid-capable Markdown viewer.

---

## 1. Risk Explanation Workflow

End-to-end flow when the user requests an explanation of their risk score. The backend loads the financial profile, sends an explain request to the AI Gateway, and the Orchestrator uses the LLM to generate the explanation.

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Frontend as Frontend (Next.js)
    participant Backend as Quarkus Backend
    participant Gateway as AI Gateway
    participant Orchestrator as AI Orchestrator
    participant Router as Inference Router
    participant LLM as LLM Inference Server

    Client->>Frontend: Request "Explain my risk score"
    Frontend->>Backend: GET/POST explain risk (userId)

    Backend->>Backend: Load FinancialProfile (riskScore, riskBand, components)
    Backend->>Gateway: POST /ai/explain-risk-score (AIRequest, contextObject=FinancialProfile)

    Gateway->>Orchestrator: Route explain_risk_score
    Orchestrator->>Orchestrator: Build prompt from FinancialProfile
    Orchestrator->>Router: POST /v1/completion (prompt, modelId)

    Router->>LLM: Completion request
    LLM->>LLM: Generate explanation text
    LLM-->>Router: Completion (explanation)

    Router-->>Orchestrator: Response (text)
    Orchestrator-->>Gateway: AIResponse (result.explanation)
    Gateway-->>Backend: AIResponse

    Backend-->>Frontend: API response (explanation)
    Frontend-->>Client: Display risk explanation
```

---

## 2. Allocation Reasoning Workflow

The platform computes allocation and matching funds; AI only generates the reasoning text. Backend calls AssetAllocationService first, then sends the result to the AI Gateway for explanation.

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Frontend as Frontend (Next.js)
    participant Backend as Quarkus Backend
    participant Allocation as AssetAllocationService
    participant Gateway as AI Gateway
    participant Reasoning as Recommendation Reasoning Engine
    participant Router as Inference Router
    participant LLM as LLM Inference Server

    Client->>Frontend: Request allocation + "Why these funds?"
    Frontend->>Backend: Get allocation with explanation (userId)

    Backend->>Allocation: getAllocation(userId)
    Allocation->>Allocation: Load UserRiskScore, RiskAssetAllocationConfig
    Allocation->>Allocation: Compute allocation + matching funds (deterministic)
    Allocation-->>Backend: allocation, recommendedFunds

    Backend->>Backend: Build context (FinancialProfile + Recommendation)
    Backend->>Gateway: POST /ai/recommendation-reasoning (AIRequest, contextObject)

    Gateway->>Reasoning: Route recommendation_reasoning
    Reasoning->>Reasoning: Build prompt (allocation, funds, profile)
    Reasoning->>Router: POST /v1/completion (prompt, modelId)

    Router->>LLM: Completion request
    LLM->>LLM: Generate reasoning text
    LLM-->>Router: Completion (reasoning)

    Router-->>Reasoning: Response (text)
    Reasoning-->>Gateway: AIResponse (result.reasoning)
    Gateway-->>Backend: AIResponse

    Backend->>Backend: Attach reasoning to allocation response
    Backend-->>Frontend: allocation + recommendedFunds + reasoning
    Frontend-->>Client: Display allocation and explanation
```

---

## 3. Document Extraction Workflow

User has uploaded a document; the backend requests extraction. Document Intelligence runs OCR, then extraction, and returns structured entities.

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Frontend as Frontend (Next.js)
    participant Backend as Quarkus Backend
    participant Gateway as AI Gateway
    participant DocIntel as Document Intelligence Service
    participant Router as Inference Router
    participant OCR as OCR Service
    participant Extract as Document Extraction Service

    Client->>Frontend: Request extract document (documentId)
    Frontend->>Backend: POST extract document (documentId, documentType)

    Backend->>Backend: Resolve storageKey (e.g. S3) for documentId
    Backend->>Gateway: POST /ai/extract-document (AIRequest, contextObject: documentId, documentType, storageKey)

    Gateway->>DocIntel: Route extract_document

    DocIntel->>Router: POST /v1/ocr (document ref / bytes)
    Router->>OCR: Forward
    OCR->>OCR: Run OCR on document
    OCR-->>Router: Text + layout
    Router-->>DocIntel: OCR result

    DocIntel->>Router: POST /v1/extract (documentType, text, layout)
    Router->>Extract: Forward
    Extract->>Extract: Extract entities (e.g. holdings, transactions)
    Extract-->>Router: Entities + confidence
    Router-->>DocIntel: Extraction result

    DocIntel-->>Gateway: AIResponse (result.entities, result.confidence)
    Gateway-->>Backend: AIResponse

    Backend->>Backend: Store extracted entities (DB / API)
    Backend-->>Frontend: Structured extraction result
    Frontend-->>Client: Display extracted data
```

---

## 4. Portfolio Insight Workflow

User requests a portfolio insight (or the UI loads the insight). Backend loads portfolio and profile, then the Financial Insight Engine generates narrative insight via the LLM.

```mermaid
sequenceDiagram
    autonumber
    participant Client
    participant Frontend as Frontend (Next.js)
    participant Backend as Quarkus Backend
    participant Portfolio as Portfolio Service
    participant Gateway as AI Gateway
    participant Insight as Financial Insight Engine
    participant Router as Inference Router
    participant LLM as LLM Inference Server

    Client->>Frontend: Request portfolio insight (or load dashboard)
    Frontend->>Backend: GET portfolio insight (userId)

    Backend->>Portfolio: getPortfolio(userId)
    Portfolio-->>Backend: Portfolio (holdings, allocation, value)
    Backend->>Backend: Load FinancialProfile (userId)
    Backend->>Backend: Build context (FinancialProfile + Portfolio)

    Backend->>Gateway: POST /ai/generate-insight (AIRequest, contextObject)

    Gateway->>Insight: Route generate_financial_insight
    Insight->>Insight: Build prompt (profile + portfolio context)
    Insight->>Router: POST /v1/completion (prompt, modelId)

    Router->>LLM: Completion request
    LLM->>LLM: Generate insight narrative
    LLM-->>Router: Completion (insight text)

    Router-->>Insight: Response (text)
    Insight-->>Gateway: AIResponse (result.insight)
    Gateway-->>Backend: AIResponse

    Backend-->>Frontend: API response (insight)
    Frontend-->>Client: Display portfolio insight
```

---

## 5. Trigger Engine Workflow

Asynchronous flow: the backend publishes a domain event (e.g. RiskScoreComputed); the Trigger Engine consumes it, runs an AI workflow via the AI Gateway, and stores the result (e.g. cached explanation). No synchronous client request.

```mermaid
sequenceDiagram
    autonumber
    participant Backend as Quarkus Backend
    participant Bus as Event Bus / Queue
    participant Trigger as Trigger Engine
    participant Gateway as AI Gateway
    participant Service as AI Service (e.g. Orchestrator)
    participant Model as Model Serving (LLM)

    Note over Backend: User risk score computed and persisted
    Backend->>Backend: UserRiskOrchestrationService persists UserRiskScore
    Backend->>Bus: Publish TriggerEvent (RiskScoreComputed, userId, riskScore, riskBand, payload)

    Trigger->>Bus: Consume event
    Trigger->>Trigger: Deduplicate (eventType, entityId)
    Trigger->>Trigger: Build AIRequest (explain_risk_score, contextObject from payload)

    Trigger->>Gateway: POST /ai/explain-risk-score (AIRequest)
    Gateway->>Service: Route to Orchestrator
    Service->>Service: Build prompt from context
    Service->>Model: Completion request
    Model-->>Service: Explanation text
    Service-->>Gateway: AIResponse (result.explanation)
    Gateway-->>Trigger: AIResponse

    Trigger->>Trigger: Store result (e.g. explanation cache keyed by userId)
    Trigger->>Bus: Ack message

    Note over Trigger: Later: user requests "Explain risk" → Backend reads from cache
```

---

*Workflow diagrams only. No other files modified. Render in a Mermaid-capable viewer.*
