# Multiplus AI Integration Architecture

**Purpose:** Define how AI modules integrate with the existing Quarkus backend without redesigning the platform. The backend remains the core system; AI provides reasoning, explanation, document understanding, and insight generation only.

**Scope:** High-level architecture, component responsibilities, communication patterns, and interaction with existing services. No diagram generation; no platform redesign.

---

## 1. AI Integration Principles

1. **Quarkus backend is the core.** All user-facing APIs, authentication, business orchestration, and deterministic financial logic (risk scoring, allocation, fund matching) remain in the Quarkus monolith. AI is a set of capabilities invoked by the backend when needed.

2. **AI augments; it does not replace.** Deterministic rules (UserRiskCalculatorService, RiskScoringConfigService, AssetAllocationService, FundMetricsNormalizationService, questionnaire scoring) stay in the backend. AI adds natural-language explanations, document extraction, recommendation reasoning, and insights. No financial decision (score, allocation, suitability) is made solely by AI.

3. **Single entry point from backend.** The backend does not call individual AI subsystems directly from every use case. An **AI Gateway** (or equivalent facade) is the single contact point. The backend calls the gateway with a request type and context; the gateway routes to the appropriate AI component(s) and returns a response. This keeps backend code simple and allows AI-side routing and versioning.

4. **Inference is outside the application server.** Model inference (LLM, embeddings, document models) runs in a **Model Serving Layer** (e.g. vLLM, Ollama, or similar) on separate infrastructure (e.g. GPU-enabled nodes). The Quarkus process never loads model weights. AI components (orchestrator, document intelligence, etc.) call the model serving layer over HTTP/gRPC. This preserves backend stability and allows independent scaling of inference.

5. **AI data pipelines are co-located with AI services.** Document processing pipelines (OCR, extraction, embedding) and any batch insight or embedding jobs run in the same deployment boundary as the AI services (e.g. same cluster or network), not inside the Quarkus JVM. They read from and write to the same storage (S3, MongoDB, MySQL) that the platform already uses, via defined contracts (e.g. document table, extraction result schema).

6. **Existing storage is the source of truth.** AI reads from MySQL (risk scores, allocation, profile, product data), MongoDB (documents, credit reports, NAV raw if needed), and S3 (uploaded documents). AI writes extraction results, embeddings, or generated text to agreed stores or returns them in API responses for the backend to persist. No separate “AI database” that duplicates financial data; optional dedicated stores only for embeddings or model artifacts if needed.

7. **Fail-safe and degradable.** If the AI gateway or model serving layer is unavailable or slow, the backend can skip AI (e.g. no explanation, or a static message) and still return deterministic results (score, allocation, matching funds). No user-facing flow depends solely on AI for core data.

---

## 2. High-Level AI Integration Architecture

**Where AI services live**  
AI services (Gateway, Orchestrator, Document Intelligence, Recommendation Reasoning, Financial Insight, Trigger Engine) run as separate deployable units—e.g. separate processes, containers, or a dedicated “AI runtime” layer—on the same network as the Quarkus backend. They are not JAX-RS resources inside the Quarkus app. This keeps the monolith free of model dependencies and allows AI to be scaled, updated, or swapped independently.

**How Quarkus communicates with AI**  
Quarkus communicates with the AI layer through a single **AI Gateway** over HTTP/REST (or gRPC). The backend sends requests with a type (e.g. `explain_risk_score`, `explain_allocation`, `extract_document`, `generate_insight`) and a JSON payload (user id, account number, score, allocation result, document reference, etc.). The gateway returns a response (explanation text, extracted entities, insight payload) or an error. The backend does not need to know which internal AI component handled the request. Optionally, for fire-and-forget or event-driven flows, the backend (or a trigger engine) publishes events to a message queue or event bus, and AI components consume them asynchronously.

**Where model inference happens**  
Model inference runs in the **Model Serving Layer**: a separate service (e.g. vLLM, Ollama, or a custom inference API) that loads model weights and exposes completion/embedding endpoints. It runs on GPU-capable infrastructure when needed. All AI components that need LLM or embedding calls invoke this layer over the network. The Quarkus backend never talks to the model server directly; it only talks to the AI Gateway (or Orchestrator).

**Where AI data pipelines run**  
AI data pipelines (e.g. document OCR + extraction, batch embedding of documents, scheduled insight generation) run as jobs or workers in the same deployment boundary as the AI services. They may be triggered by the **Trigger Engine** (on schedule or on event) or by an explicit backend call (e.g. “process this document”). They read from S3, MongoDB, or MySQL and write results back to those stores or to the AI Gateway for synchronous return. They do not run inside the Quarkus JVM.

---

## 3. AI System Components

### 3.1 AI Gateway

**Responsibility**  
Single entry point for all AI requests from the Quarkus backend. Accepts a request type and payload, routes to the correct AI component (Orchestrator, Document Intelligence, Recommendation Reasoning, Financial Insight), and returns a unified response (text, structured JSON, or error). Handles auth (e.g. service-to-service token or network-level trust), rate limiting, and timeouts so the backend has a simple, stable contract.

**How it interacts with Quarkus**  
Quarkus calls the AI Gateway over HTTP (e.g. `POST /ai/v1/request` or dedicated paths per use case). Request body includes `type` (e.g. `explain_risk_score`, `explain_allocation`, `extract_document`, `financial_insight`) and `context` (ids, scores, allocation, document ref, etc.). Gateway responds synchronously with the result or a timeout/error. Quarkus treats the gateway as an external HTTP client; no shared libraries or in-process calls.

**Data sources used**  
Gateway itself is stateless; it does not read from MySQL/MongoDB/S3. Downstream AI components that the gateway invokes use platform data (see below).

---

### 3.2 AI Orchestrator

**Responsibility**  
For requests that need multi-step reasoning or coordination (e.g. “explain this user’s allocation”), the Orchestrator prepares context by gathering data (e.g. user risk score, allocation result, matching funds, product metadata), builds a prompt or structured input, calls the Model Serving Layer (LLM), and optionally validates or structures the output before returning it to the gateway. It is the “brain” for explanation and insight flows that require one or more LLM calls with platform data.

**How it interacts with Quarkus**  
Quarkus does not call the Orchestrator directly. The AI Gateway receives a request from Quarkus and invokes the Orchestrator (or a service that wraps it) for explanation/insight types. The Orchestrator may call backend read APIs (e.g. allocation, product list) if the gateway did not pass full context, or it may receive all context in the gateway payload to avoid extra round-trips. Preferred: gateway payload carries all necessary context so Orchestrator is stateless and does not call back into Quarkus.

**Data sources used**  
Orchestrator uses data passed in the request (risk score, allocation, funds, profile summary). If needed, it can read from MySQL/MongoDB via a dedicated read-only data access layer or API exposed for AI, to avoid embedding Quarkus internals. Optional: vector store for RAG (e.g. product or document embeddings) for future richer reasoning.

---

### 3.3 Document Intelligence Service

**Responsibility**  
Handles document understanding: OCR for scanned/images, entity extraction (e.g. CAS, bank statement, insurance), and conversion to structured data. Runs in the AI layer; can call the Model Serving Layer for LLM-based extraction or use dedicated document models. Writes extraction results to the platform’s storage (e.g. MongoDB collection or MySQL table) or returns them to the gateway so the backend can persist. Does not replace existing credit-report PDF pipeline; can extend it or handle other document types.

**How it interacts with Quarkus**  
(1) **Synchronous:** Backend uploads a document (existing flow); later, when “extract” is needed, Quarkus calls the AI Gateway with type `extract_document` and document reference (e.g. S3 key or storage id). Gateway delegates to Document Intelligence Service; service reads document from S3 (or URL), runs OCR/extraction, returns structured result; backend saves it. (2) **Asynchronous:** Backend or Trigger Engine publishes “document ready” event; Document Intelligence Service consumes it, processes the document, and writes results to storage; backend polls or is notified. Either way, Quarkus does not perform OCR or extraction itself.

**Data sources used**  
Reads: document binary or URL from S3 (or platform document store). Writes: extraction result to MongoDB, MySQL, or back via API for backend to persist. May use Model Serving Layer for LLM-based extraction or embedding.

---

### 3.4 Recommendation Reasoning Engine

**Responsibility**  
Produces natural-language reasoning for *why* a set of funds or an allocation was recommended. It does not compute allocation or select funds; that remains in AssetAllocationService. Given inputs (user risk score, allocation result, matching funds, product metadata), it generates text explaining the rationale (risk alignment, gap closure, diversification, etc.) for display to the user or for audit.

**How it interacts with Quarkus**  
Quarkus calls the AI Gateway with type `explain_allocation` (or `recommendation_reasoning`) and payload containing allocation result and matching funds (and optionally risk profile summary). Gateway routes to Recommendation Reasoning Engine (or Orchestrator that implements this). Engine calls Model Serving Layer with structured context; returns explanation text to gateway → backend. Backend attaches explanation to the allocation API response or stores it. Synchronous call from backend when user requests allocation + explanation.

**Data sources used**  
All context is provided in the request from the backend (allocation, funds, risk score). No direct DB access required if backend sends a rich payload. Optional: product or document embeddings from vector store for richer narrative.

---

### 3.5 Financial Insight Engine

**Responsibility**  
Generates narrative insights from financial data (e.g. profile summary, portfolio snapshot, risk score, behavioral cues). Used for dashboard insights, notification content, or report narrative. Does not compute scores or allocation; it only turns existing platform outputs into readable summaries or alerts.

**How it interacts with Quarkus**  
(1) **Synchronous:** Backend requests “insight for user X” via AI Gateway (e.g. type `financial_insight`); Gateway invokes Financial Insight Engine with context (profile, score, allocation, recent activity if any); Engine returns text; backend sends to UI or notification. (2) **Asynchronous / scheduled:** Trigger Engine or scheduler runs a job that pulls users needing insight, calls Financial Insight Engine with data, and writes results to DB or pushes to Notification system (via backend API or event). Backend notification services (SmsService, Mailer, WhatsApp) send the content; they do not call AI themselves—they send pre-generated content or the backend fetches insight and then sends.

**Data sources used**  
Context passed in the request (profile, score, allocation, optional portfolio). For batch/scheduled insights, the Trigger Engine or a job may read from MySQL/MongoDB (via read API or dedicated read path) to build the payload for the Insight Engine.

---

### 3.6 Trigger Engine

**Responsibility**  
Listens for platform events (e.g. risk score computed, document uploaded, allocation viewed) or runs on a schedule, and triggers AI workflows without the user waiting. Examples: “when risk score is computed, generate explanation and cache it”; “when document is uploaded, run extraction”; “nightly, generate insights for active users.” It decides *when* to call which AI component and with what payload; it does not perform inference itself.

**How it interacts with Quarkus**  
(1) **Event-driven:** Backend (or existing event emitter) publishes events (e.g. RiskScoreComputedEvent) to a message queue or event bus. Trigger Engine consumes events, applies rules (e.g. dedupe, throttle), and invokes the AI Gateway or internal AI services (e.g. “generate explanation for this score”). Results can be written to cache/DB for later API response, or sent to notification. (2) **Scheduled:** Trigger Engine runs cron-like jobs that call AI (e.g. batch insight generation) and then invoke backend APIs or write to storage. Quarkus may expose a small “ingest AI result” or “notify” endpoint for the Trigger Engine to call. Quarkus does not run the trigger logic; it only emits events and optionally receives callbacks.

**Data sources used**  
Event payload (user id, score, document id, etc.). For scheduled jobs, Trigger Engine may read from MySQL/MongoDB (via read-only API or internal connector) to build batch payloads. Writes: AI results to cache, DB, or callback to backend.

---

### 3.7 Model Serving Layer

**Responsibility**  
Loads and runs AI models (LLM, embedding, optional document models). Exposes HTTP/gRPC APIs for completion and optionally embedding. Handles batching, GPU utilization, and versioning. No business logic; pure inference.

**How it interacts with Quarkus**  
Quarkus does not call the Model Serving Layer. Only AI components (Orchestrator, Document Intelligence, Recommendation Reasoning, Financial Insight) call it. All interaction is inside the AI boundary. Quarkus → AI Gateway → (Orchestrator / Document Intelligence / etc.) → Model Serving Layer.

**Data sources used**  
Model artifacts (weights, config) from a registry or volume. No direct access to application MySQL/MongoDB/S3; context is passed from the calling AI component.

---

## 4. Communication Patterns

**Synchronous API calls**  
- **Backend → AI Gateway:** All user-initiated flows (e.g. “get risk explanation,” “get allocation explanation,” “extract this document”) are synchronous. Backend calls the gateway, waits for response (with a timeout, e.g. 10–30 s), and returns to the client or stores the result.  
- **AI Gateway → Orchestrator / Document Intelligence / Recommendation Reasoning / Financial Insight:** Synchronous internal calls.  
- **AI components → Model Serving Layer:** Synchronous HTTP/gRPC for completion and embedding.

**Asynchronous events**  
- **Backend (or platform) → Trigger Engine:** Events such as “risk score computed,” “document uploaded,” “allocation generated” are published to a queue or bus. Trigger Engine consumes asynchronously and invokes AI workflows.  
- **Trigger Engine → AI Gateway / AI services:** Can be async (fire-and-forget) when the result is cached or written to DB for later retrieval, or when the result is pushed to notifications without the user waiting.

**Scheduled jobs**  
- **Trigger Engine** runs scheduled jobs (e.g. daily “generate insights for segment,” “re-embed documents”) that call AI services and then update storage or notify via backend.  
- **NAV and credit-report pipelines** remain in the platform (Quarkus/scheduler); they are not moved to AI. Optional: after document pipeline writes to MongoDB, a Trigger Engine job could run “extract/embed” for new documents.

---

## 5. Interaction of Existing Services with AI

**UserRiskCalculatorService**  
- Keeps full ownership of score and bucket computation (formula, weights, config). No AI in the calculation path.  
- **Interaction with AI:** After a new score is computed, (1) Backend can call AI Gateway with `explain_risk_score` and payload (score, components, bucket) to get natural-language explanation and return it on the next “get score” or “get explanation” request. (2) Optionally, when RiskScoreComputedEvent is emitted, Trigger Engine consumes it and calls AI to pre-generate and cache the explanation. UserRiskCalculatorService does not call AI; the controller or a separate “explanation” endpoint calls the gateway.

**AssetAllocationService**  
- Keeps full ownership of allocation rules and matching funds (risk gap logic). No AI in the allocation path.  
- **Interaction with AI:** When the user requests allocation *and* explanation, the backend first calls AssetAllocationService to get allocation and matching funds, then calls AI Gateway with `explain_allocation` and that result. Gateway (Recommendation Reasoning Engine or Orchestrator) returns explanation text; backend appends it to the response. AssetAllocationService does not call AI; the controller or a dedicated “allocation with explanation” flow does.

**FundMetricsNormalizationService**  
- Unchanged. Continues to compute fund risk score and persist to `fund_metrics_normalized`.  
- **Interaction with AI:** AI never changes fund metrics. When generating recommendation reasoning or insights, the backend (or AI request payload) may include fund metrics or fund list; AI uses them only as context for text generation. No direct call from FundMetricsNormalizationService to AI.

**PortfolioController**  
- Keeps ownership of portfolio retrieval and any portfolio-related APIs (when implemented).  
- **Interaction with AI:** When portfolio data exists, the backend can pass a summary (e.g. allocation, holdings) to the AI Gateway for “portfolio insight” or “allocation explanation.” PortfolioController (or a higher-level service) requests AI-generated content and attaches it to the response; it does not call AI directly. Same pattern: controller gets data from services, then calls AI Gateway for narrative.

**Document pipelines**  
- **Upload/storage:** DocumentUploadService and AwsS3Service stay as-is. Documents are stored; no AI in the upload path.  
- **Credit report PDF:** CreditReportProcessingService stays as-is. Optionally, Document Intelligence Service can be invoked for “hard” cases or for additional extraction; result can be merged or stored.  
- **Other documents (CAS, bank, insurance):** When the user requests extraction (or when a document is tagged for extraction), the backend sends the document reference to the AI Gateway (`extract_document`). Document Intelligence Service runs OCR/extraction and returns structured data; backend (or Trigger Engine) persists it. Pipeline “runs” in the AI layer; the platform pipeline remains for upload, validation, and storage; extraction is delegated to AI.

---

## 6. Deterministic Logic Remaining in the Platform

The following stay entirely in the Quarkus backend and are not replaced or overridden by AI:

- User risk score formula and bucket (UserRiskCalculatorService, RiskScoringConfigService).  
- Questionnaire composite score and band (RiskAnalysisEngineService, ManualAssessmentService).  
- Fund risk score (FundMetricsNormalizationService).  
- Asset allocation rules and validation (AssetAllocationService, RiskAssetAllocationConfig).  
- Fund matching by risk gap (AssetAllocationService).  
- NAV ingestion and metrics pipeline (NavIngestionService, NavMetricsCalculationService, etc.).  
- Credit report PDF parsing (CreditReportProcessingService) unless explicitly extended with AI for specific steps.  
- Product catalog and filtering (ProductService).  
- Regulatory or business suitability rules (when implemented); AI does not enforce them.  
- Authentication, authorization, and API orchestration.

AI only provides: **reasoning** (natural-language rationale for recommendations), **explanation** (risk score, allocation), **document understanding** (OCR, extraction for supported types), and **insight generation** (summaries, alerts, report narrative). All numeric and rule-based decisions remain in the platform.

---

## 7. Service Interaction Model

- **Quarkus** exposes all user-facing and internal APIs; it owns sessions, auth, and business flow.  
- **Quarkus → AI Gateway** over HTTP (sync) for explanation, extraction, insight.  
- **AI Gateway** routes to Orchestrator, Document Intelligence, Recommendation Reasoning, or Financial Insight; these may call **Model Serving Layer** for inference.  
- **Quarkus** (or platform events) → **Trigger Engine** via events or scheduler; **Trigger Engine** → AI Gateway / AI services (sync or async).  
- **Document Intelligence** and batch jobs read/write **S3, MongoDB, MySQL** via agreed contracts; Quarkus remains owner of schema and critical data.  
- **Model Serving Layer** is used only by AI components; Quarkus has no direct dependency on it.

---

## 8. Example Integration Flows

**Flow 1: Risk score explanation (sync)**  
User requests “explain my risk score.” Backend loads UserRiskScore (and components) from DB, calls AI Gateway `explain_risk_score` with score and components. Gateway invokes Orchestrator; Orchestrator builds prompt, calls Model Serving Layer (LLM), returns explanation text. Gateway returns to backend; backend sends explanation to client. UserRiskCalculatorService is not involved in this request; only the stored score is read.

**Flow 2: Allocation with reasoning (sync)**  
User requests allocation and “why these funds.” Backend calls AssetAllocationService → gets allocation and matching funds. Backend calls AI Gateway `explain_allocation` with allocation + funds + user risk summary. Gateway invokes Recommendation Reasoning Engine; Engine calls LLM with context, returns reasoning text. Backend appends reasoning to allocation response and returns to client.

**Flow 3: Document extraction (sync or async)**  
User uploads a CAS document (existing upload flow). Later, user or system requests extraction. Backend calls AI Gateway `extract_document` with document ref (e.g. S3 key). Gateway invokes Document Intelligence Service; Service fetches document from S3, runs OCR/extraction (and optionally LLM), returns structured entities. Backend stores result in MongoDB/MySQL and returns to client. Alternative: on upload, backend emits “document ready”; Trigger Engine runs extraction asynchronously and writes result; client polls or gets notified.

**Flow 4: Pre-generated risk explanation (async)**  
UserRiskOrchestrationService computes a new score and emits RiskScoreComputedEvent. Trigger Engine consumes event, calls AI Gateway `explain_risk_score` with score payload, receives explanation, writes to cache or DB (e.g. keyed by user/score id). When user later requests “explain my risk,” backend reads cached explanation and returns it (or calls AI if cache miss). Reduces latency for the user.

**Flow 5: Scheduled financial insight (batch)**  
Trigger Engine runs on schedule (e.g. daily). For a segment of users, it loads from MySQL (via read API or internal read) risk score, allocation summary, and recent activity. For each user, it calls AI Gateway `financial_insight` with that context; Financial Insight Engine returns short narrative. Trigger Engine writes insights to DB or calls backend “enqueue notification” API with content; backend Notification services (SmsService, Mailer, WhatsApp) send using existing logic. No AI inside Quarkus; only pre-generated content is sent.

---

*This document describes the intended AI integration architecture. Implementation details (endpoints, payload schemas, deployment topology) can be derived from this in a later phase.*
