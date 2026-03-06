# Multiplus AI Platform — AI Workflow Diagrams (PlantUML)

**Purpose:** PlantUML sequence diagrams for the main AI feature workflows. Use with PlantUML (CLI, IDE plugin, or server) to generate PNG/SVG.

**Format:** PlantUML sequence diagram syntax. Copy each block to a `.puml` file or render in a PlantUML-capable viewer.

---

## 1. Risk Explanation Workflow

```puml
@startuml Risk Explanation Workflow
title Risk Explanation Workflow

participant "Client" as Client
participant "Frontend\n(Next.js)" as Frontend
participant "Backend\n(Quarkus)" as Backend
participant "AI Gateway" as Gateway
participant "AI Orchestrator" as Orchestrator
participant "Inference Router" as Router
participant "LLM Inference\nServer" as LLM

Client -> Frontend: Request risk explanation
Frontend -> Backend: GET/POST explain risk (userId)

Backend -> Backend: Load FinancialProfile\n(riskScore, riskBand, components)
Backend -> Gateway: POST /ai/explain-risk-score\n(AIRequest, contextObject)

Gateway -> Orchestrator: Route explain_risk_score
Orchestrator -> Orchestrator: Build prompt from context
Orchestrator -> Router: POST /v1/completion\n(prompt, modelId)

Router -> LLM: Completion request
LLM -> LLM: Generate explanation text
LLM --> Router: Explanation (text)

Router --> Orchestrator: Response
Orchestrator --> Gateway: AIResponse (result.explanation)
Gateway --> Backend: AIResponse

Backend --> Frontend: API response (explanation)
Frontend --> Client: Display risk explanation

@enduml
```

---

## 2. Allocation Reasoning Workflow

Allocation is computed by the platform; AI only explains it.

```puml
@startuml Allocation Reasoning Workflow
title Allocation Reasoning Workflow\n(Platform computes allocation; AI explains)

participant "Client" as Client
participant "Frontend" as Frontend
participant "Backend" as Backend
participant "AssetAllocation\nService" as Allocation
participant "AI Gateway" as Gateway
participant "Recommendation\nReasoning Engine" as Reasoning
participant "Inference Router" as Router
participant "LLM Inference\nServer" as LLM

Client -> Frontend: Request allocation + "Why these funds?"
Frontend -> Backend: Get allocation with explanation (userId)

Backend -> Allocation: getAllocation(userId)
activate Allocation
Allocation -> Allocation: Load UserRiskScore,\nRiskAssetAllocationConfig
Allocation -> Allocation: Compute allocation +\nmatching funds (deterministic)
Allocation --> Backend: allocation, recommendedFunds
deactivate Allocation

Backend -> Backend: Build context\n(FinancialProfile + Recommendation)
Backend -> Gateway: POST /ai/recommendation-reasoning\n(AIRequest, contextObject)

Gateway -> Reasoning: Route recommendation_reasoning
Reasoning -> Reasoning: Build prompt\n(allocation, funds, profile)
Reasoning -> Router: POST /v1/completion (prompt, modelId)

Router -> LLM: Completion request
LLM -> LLM: Generate reasoning text
LLM --> Router: Reasoning (text)

Router --> Reasoning: Response
Reasoning --> Gateway: AIResponse (result.reasoning)
Gateway --> Backend: AIResponse

Backend -> Backend: Attach reasoning to allocation response
Backend --> Frontend: allocation + funds + reasoning
Frontend --> Client: Display allocation and explanation

@enduml
```

---

## 3. Document Extraction Workflow

```puml
@startuml Document Extraction Workflow
title Document Extraction Workflow

participant "Client" as Client
participant "Frontend" as Frontend
participant "Backend" as Backend
participant "AI Gateway" as Gateway
participant "Document\nIntelligence Service" as DocIntel
participant "Inference Router" as Router
participant "OCR Service" as OCR
participant "Document Extraction\nService" as Extract

Client -> Frontend: Request extract document (documentId)
Frontend -> Backend: POST extract document\n(documentId, documentType)

Backend -> Backend: Resolve storageKey\n(e.g. S3) for documentId
Backend -> Gateway: POST /ai/extract-document\n(AIRequest: documentId, documentType, storageKey)

Gateway -> DocIntel: Route extract_document

DocIntel -> Router: POST /v1/ocr (document ref / bytes)
Router -> OCR: Forward
OCR -> OCR: Run OCR on document
OCR --> Router: Text + layout
Router --> DocIntel: OCR result

DocIntel -> Router: POST /v1/extract\n(documentType, text, layout)
Router -> Extract: Forward
Extract -> Extract: Extract entities\n(holdings, transactions)
Extract --> Router: Entities + confidence
Router --> DocIntel: Extraction result

DocIntel --> Gateway: AIResponse (entities, confidence)
Gateway --> Backend: AIResponse

Backend -> Backend: Store extracted entities
Backend --> Frontend: Structured extraction result
Frontend --> Client: Display extracted data

@enduml
```

---

## 4. Portfolio Insight Workflow

```puml
@startuml Portfolio Insight Workflow
title Portfolio Insight Workflow

participant "Client" as Client
participant "Frontend" as Frontend
participant "Backend" as Backend
participant "Portfolio\nService" as Portfolio
participant "AI Gateway" as Gateway
participant "Financial Insight\nEngine" as Insight
participant "Inference Router" as Router
participant "LLM Inference\nServer" as LLM

Client -> Frontend: Request portfolio insight
Frontend -> Backend: GET portfolio insight (userId)

Backend -> Portfolio: getPortfolio(userId)
Portfolio --> Backend: Portfolio (holdings, allocation, value)
Backend -> Backend: Load FinancialProfile
Backend -> Backend: Build context\n(FinancialProfile + Portfolio)

Backend -> Gateway: POST /ai/generate-insight\n(AIRequest, contextObject)

Gateway -> Insight: Route generate_financial_insight
Insight -> Insight: Build prompt (profile + portfolio)
Insight -> Router: POST /v1/completion (prompt, modelId)

Router -> LLM: Completion request
LLM -> LLM: Generate insight narrative
LLM --> Router: Insight (text)

Router --> Insight: Response
Insight --> Gateway: AIResponse (result.insight)
Gateway --> Backend: AIResponse

Backend --> Frontend: API response (insight)
Frontend --> Client: Display portfolio insight

@enduml
```

---

## 5. Trigger Engine Workflow

Example event: **RiskScoreComputed**. Backend publishes; Trigger Engine consumes, runs AI workflow, stores result.

```puml
@startuml Trigger Engine Workflow
title Trigger Engine Workflow (e.g. RiskScoreComputed)

participant "Backend\n(Quarkus)" as Backend
participant "Event Bus\n/ Queue" as Bus
participant "Trigger\nEngine" as Trigger
participant "AI Gateway" as Gateway
participant "AI Service\n(e.g. Orchestrator)" as Service
participant "Inference\nRouter" as Router
participant "Model\nServer" as Model

Backend -> Backend: UserRiskOrchestrationService\npersists UserRiskScore
Backend -> Bus: Publish TriggerEvent\n(RiskScoreComputed, userId,\nriskScore, riskBand, payload)

Trigger -> Bus: Consume event
Trigger -> Trigger: Deduplicate\n(eventType, entityId)
Trigger -> Trigger: Build AIRequest\n(explain_risk_score, contextObject)

Trigger -> Gateway: POST /ai/explain-risk-score\n(AIRequest)
Gateway -> Service: Route to Orchestrator
Service -> Service: Build prompt from context
Service -> Router: Completion request
Router -> Model: Forward
Model -> Model: Generate explanation
Model --> Router: Explanation (text)
Router --> Service: Response
Service --> Gateway: AIResponse (result.explanation)
Gateway --> Trigger: AIResponse

Trigger -> Trigger: Store result\n(e.g. explanation cache by userId)
Trigger -> Bus: Ack message

note right of Trigger
  Later: user requests "Explain risk"
  → Backend reads from cache
end note

@enduml
```

---

*Workflow diagrams only. PlantUML syntax. No other files modified. Render with PlantUML to produce PNG/SVG.*
