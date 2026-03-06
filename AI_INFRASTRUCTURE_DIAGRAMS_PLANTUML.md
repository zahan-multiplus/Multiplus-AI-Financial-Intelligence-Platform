# Multiplus AI Platform — Infrastructure Architecture Diagrams (PlantUML)

**Purpose:** PlantUML component and deployment diagrams for the AI platform infrastructure: deployment layout, GPU inference, event processing, and model training/deployment pipeline.

**Format:** PlantUML. Copy each block to a `.puml` file and render with PlantUML (CLI, IDE, or server).

---

## 1. AI Platform Deployment Architecture

High-level deployment layout with logical layers: Platform Layer, AI Application Layer, Model Serving Layer.

```puml
@startuml AI Platform Deployment Architecture
title AI Platform Deployment Architecture

skinparam packageStyle rectangle
skinparam componentStyle rectangle

package "Platform Layer" as Platform {
  [Frontend\n(Next.js)] as Frontend
  [Quarkus Backend] as Backend
}

package "AI Application Layer" as AIApp {
  [AI Gateway] as Gateway
  package "AI Services" as AISvc {
    [AI Orchestrator] as Orchestrator
    [Document Intelligence\nService] as DocIntel
    [Financial Insight\nEngine] as Insight
    [Recommendation\nReasoning Engine] as Reasoning
  }
  [Inference Router] as Router
}

package "Model Serving Layer" as ModelServing {
  package "Model Servers" as Servers {
    [LLM Inference\nServer] as LLM
    [Embedding\nService] as Embed
    [OCR Service] as OCR
    [Document Extraction\nService] as Extract
  }
  [Model Registry] as Registry
}

Frontend --> Backend : HTTPS
Backend --> Gateway : HTTP (AIRequest)
Gateway --> Orchestrator : route
Gateway --> DocIntel : route
Gateway --> Insight : route
Gateway --> Reasoning : route

Orchestrator --> Router : completion
DocIntel --> Router : ocr / extract
Insight --> Router : completion
Reasoning --> Router : completion

Router --> LLM : completion
Router --> Embed : embed
Router --> OCR : ocr
Router --> Extract : extract

Registry ..> LLM : load artifacts
Registry ..> Embed : load artifacts
Registry ..> OCR : load artifacts
Registry ..> Extract : load artifacts

@enduml
```

---

## 2. GPU Inference Infrastructure

LLM inference on GPU nodes with multiple replicas and scaling. Inference requests from AI services through the router to GPU-backed LLM servers.

```puml
@startuml GPU Inference Infrastructure
title GPU Inference Infrastructure\n(LLM scaling and request flow)

skinparam componentStyle rectangle

package "AI Application Layer" as AIApp {
  [AI Orchestrator] as Orchestrator
  [Recommendation\nReasoning Engine] as Reasoning
  [Financial Insight\nEngine] as Insight
  [Inference Router] as Router
}

cloud "GPU Node Cluster" as GPUCluster {
  package "Node 1" as N1 {
    [LLM Inference Server\nReplica 1] as R1
  }
  package "Node 2" as N2 {
    [LLM Inference Server\nReplica 2] as R2
  }
  package "Node N" as Nn {
    [LLM Inference Server\nReplica N] as Rn
  }
}

Orchestrator --> Router : completion request
Reasoning --> Router : completion request
Insight --> Router : completion request

Router --> R1 : forward (load balanced)
Router --> R2 : forward
Router --> Rn : forward

R1 --> Router : response (text)
R2 --> Router : response
Rn --> Router : response

Router --> Orchestrator : response
Router --> Reasoning : response
Router --> Insight : response

note right of GPUCluster
  Multiple GPU nodes
  Multiple inference containers (replicas)
  Horizontal scaling
end note

@enduml
```

---

## 3. Event Processing Infrastructure

Event-driven AI: backend publishes to event bus, Trigger Engine consumes and runs AI workflows via AI Gateway.

```puml
@startuml Event Processing Infrastructure
title Event Processing Infrastructure\n(Event-driven AI workflows)

skinparam componentStyle rectangle

actor "Backend\n(Quarkus)" as Backend
queue "Event Bus / Queue" as Bus
component "Trigger Engine" as Trigger
component "AI Gateway" as Gateway
package "AI Services" as AISvc {
  [AI Orchestrator] as Orchestrator
  [Document Intelligence] as DocIntel
  [Financial Insight\nEngine] as Insight
}

database "Explanation Cache\n/ Result Store" as Store

Backend --> Bus : Publish TriggerEvent\n(RiskScoreComputed,\nDocumentUploaded, ...)

Bus --> Trigger : Consume event
Trigger --> Trigger : Deduplicate\nRoute by eventType

Trigger --> Gateway : POST /ai/explain-risk-score\n(or extract_document, generate_insight)
Gateway --> Orchestrator : explain_risk_score
Gateway --> DocIntel : extract_document
Gateway --> Insight : generate_insight

Orchestrator --> Gateway : AIResponse
DocIntel --> Gateway : AIResponse
Insight --> Gateway : AIResponse

Gateway --> Trigger : AIResponse
Trigger --> Store : Store result\n(cache, DB)
Trigger --> Bus : Ack message

note bottom of Trigger
  Example: RiskScoreComputed
  → generate risk explanation
  → store in cache
end note

@enduml
```

---

## 4. Model Training and Deployment Pipeline

Model lifecycle: dataset → training → evaluation → registry → deployment to model serving.

```puml
@startuml Model Training and Deployment Pipeline
title Model Training and Deployment Pipeline

skinparam componentStyle rectangle

storage "Dataset Storage" as Datasets {
  [Curated / Labeled\nDatasets] as Data
  [Evaluation\nDatasets] as EvalData
}

node "Training Environment" as TrainEnv {
  [Training Job\n(GPU Cluster / Managed ML)] as TrainJob
}

node "Evaluation System" as EvalSys {
  [Offline Evaluation] as OfflineEval
  [A/B Testing\n(optional)] as ABTest
  [Human Review] as HumanReview
}

database "Model Registry" as Registry {
  [Model Artifacts\n(weights, config)] as Artifacts
  [Version Metadata] as Meta
}

node "Model Serving\nInfrastructure" as Serving {
  [Inference Router] as Router
  [LLM / Embedding /\nOCR / Extraction] as Servers
}

Data --> TrainJob : input
TrainJob --> Artifacts : trained artifact\n(conditional on approval)
TrainJob --> EvalData : (eval split)

Artifacts --> OfflineEval : candidate version
EvalData --> OfflineEval : held-out set
OfflineEval --> HumanReview : sample outputs
OfflineEval --> ABTest : optional traffic split

OfflineEval --> Registry : approve & register version
ABTest --> Registry : promote on success
HumanReview --> Registry : gate for registration

Registry --> Router : deploy config\n(version, endpoint)
Registry --> Servers : load artifacts
Router --> Servers : route requests

note right of TrainEnv
  Training produces artifact
  → not in Registry until
  evaluation passes
end note

note right of Registry
  Immutable versions
  Rollback = redeploy
  previous version
end note

@enduml
```

---

*Infrastructure architecture diagrams only. PlantUML syntax. No other files modified. Render with PlantUML to produce PNG/SVG.*
