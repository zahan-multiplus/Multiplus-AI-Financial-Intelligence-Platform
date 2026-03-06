# Multiplus AI Platform — Core Architecture Diagrams

**Purpose:** High-level sequence diagrams for the AI platform. Components and flows are defined in earlier documentation (AI Integration Architecture, AI Gateway API Contract, Model Serving Architecture).

**Format:** Mermaid sequence diagrams. Render in any Markdown viewer that supports Mermaid (e.g. GitHub, GitLab, VS Code with Mermaid extension).

---

## 1. Platform → AI Integration Flow

Shows how an AI request (e.g. "Explain my risk score") travels from the client through the frontend, Quarkus backend, AI Gateway, AI Orchestrator, and Model Serving.

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

    Client->>Frontend: User action (e.g. "Explain risk score")
    Frontend->>Backend: HTTP POST /api/v1/... (e.g. explain-risk)
    Backend->>Backend: Load user context (score, profile)
    Backend->>Gateway: POST /ai/explain-risk-score (AIRequest)
    Gateway->>Orchestrator: Route by requestType
    Orchestrator->>Orchestrator: Build prompt from context
    Orchestrator->>Router: POST /v1/completion (prompt, modelId)
    Router->>LLM: Forward completion request
    LLM->>LLM: Model inference
    LLM-->>Router: Completion (text)
    Router-->>Orchestrator: Response (text, usage)
    Orchestrator-->>Gateway: AIResponse (result.explanation)
    Gateway-->>Backend: AIResponse
    Backend-->>Frontend: API response (explanation)
    Frontend-->>Client: Display explanation
```

---

## 2. AI Gateway Routing Flow

Shows how the AI Gateway routes requests to the correct AI service based on `requestType`. Each service may call Model Serving internally (not expanded here).

```mermaid
sequenceDiagram
    autonumber
    participant Backend as Quarkus Backend
    participant Gateway as AI Gateway
    participant Orchestrator as AI Orchestrator
    participant DocIntel as Document Intelligence Service
    participant Reasoning as Recommendation Reasoning Engine
    participant Insight as Financial Insight Engine

    Backend->>Gateway: AIRequest (requestType, contextObject)

    alt requestType = explain_risk_score
        Gateway->>Orchestrator: explain_risk_score
        Orchestrator-->>Gateway: AIResponse (explanation)
    else requestType = explain_allocation
        Gateway->>Orchestrator: explain_allocation
        Orchestrator-->>Gateway: AIResponse (explanation)
    else requestType = extract_document
        Gateway->>DocIntel: extract_document
        DocIntel-->>Gateway: AIResponse (entities)
    else requestType = generate_insight
        Gateway->>Insight: generate_financial_insight
        Insight-->>Gateway: AIResponse (insight)
    else requestType = recommendation_reasoning
        Gateway->>Reasoning: recommendation_reasoning
        Reasoning-->>Gateway: AIResponse (reasoning)
    end

    Gateway-->>Backend: AIResponse
```

---

## 3. AI Service → Model Serving Flow

Shows how AI services call the Inference Router, which forwards to the appropriate model server (LLM, Embedding, OCR, Document Extraction). Multiple service types are illustrated in parallel for clarity.

```mermaid
sequenceDiagram
    autonumber
    participant Orchestrator as AI Orchestrator
    participant DocIntel as Document Intelligence Service
    participant Insight as Financial Insight Engine
    participant Router as Inference Router
    participant LLM as LLM Inference Server
    participant Embed as Embedding Service
    participant OCR as OCR Service
    participant Extract as Document Extraction Service

    Note over Orchestrator,Extract: Completion (explanation / reasoning / insight)
    Orchestrator->>Router: POST /v1/completion (modelId, prompt)
    Router->>LLM: Forward
    LLM-->>Router: Generated text
    Router-->>Orchestrator: Response

    Note over Orchestrator,Extract: Document pipeline (OCR + extraction)
    DocIntel->>Router: POST /v1/ocr (document)
    Router->>OCR: Forward
    OCR-->>Router: Text + layout
    Router-->>DocIntel: OCR result
    DocIntel->>Router: POST /v1/extract (text, documentType)
    Router->>Extract: Forward
    Extract-->>Router: Entities + confidence
    Router-->>DocIntel: Extraction result

    Note over Orchestrator,Extract: Embedding (e.g. RAG)
    Insight->>Router: POST /v1/embed (texts)
    Router->>Embed: Forward
    Embed-->>Router: Vectors
    Router-->>Insight: Vectors
```

---

*Diagrams only. No other files modified. Render in a Mermaid-capable viewer.*
