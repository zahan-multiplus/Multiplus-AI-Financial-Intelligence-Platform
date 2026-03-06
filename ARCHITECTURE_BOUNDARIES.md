# Multiplus AI Platform — Architecture Boundary Definitions

**Purpose:** Define clear subsystem boundaries so that each component has well-defined responsibilities and no overlapping ownership.  
**Reference:** Technical architecture review (`ARCHITECTURE_REVIEW.md`) and documentation under `content/`.

---

## 1. Core Platform Backend

**Subsystem:** Core Platform Backend (Platform Layer / Quarkus Backend)

**Responsibilities:**
- Expose and orchestrate APIs for user-facing applications (web, mobile)
- Authenticate and authorize users
- Manage user accounts and non-analytical profile data (e.g. preferences, consent)
- Manage financial product catalog (metadata, availability) and investment transaction processing
- Route user requests to the appropriate downstream subsystems (AI Platform, Data Platform, etc.)
- Deliver approved recommendations and insights to the user interface
- Integrate with external financial providers for non-analytical operations (e.g. account linking, transaction submission)
- Enforce rate limits and request-level quotas for API consumers

**Inputs:**
- HTTP/API requests from the user layer (frontend)
- Responses from AI Platform (profiles, risk scores, recommendations, explanations)
- Responses from Compliance Engine (approval/rejection of recommendations)
- Data from Data Platform (for read-through to UI, e.g. portfolio snapshot)
- External provider API responses (for account/transaction operations)

**Outputs:**
- API responses to the user layer (recommendations, insights, portfolio data, product catalog)
- Invocations to AI Platform (e.g. “generate recommendation”, “generate explanation”)
- Invocations to Trigger Framework (e.g. user action events)
- Invocations to Data Platform (e.g. document upload notification, read requests)
- Audit events for user actions and API usage

**Dependencies:**
- AI Platform (for analytical outputs)
- Compliance Engine (for recommendation approval before delivery)
- Data Platform (for persisted data read-through and document/event notifications)
- Trigger Framework (to emit user-driven events)
- External financial providers (for account and transaction operations)

**Explicitly does NOT:**
- Run AI/ML inference or host model serving
- Execute data ingestion pipelines or define storage schemas
- Perform suitability or compliance validation of recommendations
- Detect triggers or dispatch workflows (that is Trigger Framework)
- Build financial profiles, risk scores, or recommendation logic (that is AI Platform / Recommendation Engine)

---

## 2. AI Platform

**Subsystem:** AI Platform (AI Intelligence Layer — analytical modules)

**Responsibilities:**
- Interpret raw or structured financial data into analytical inputs (e.g. transaction categorization, income/expense detection)
- Construct and maintain user financial profiles from transactions, portfolio, and documents
- Generate portfolio intelligence (aggregation, allocation analysis, diversification, concentration risk)
- Compute risk profiles and risk scores for users
- Evaluate financial products (ranking, scoring) for use by the Recommendation Engine
- Run document intelligence pipelines (OCR, entity extraction, structured data conversion) and expose extracted data to the Data Platform for storage
- Generate natural-language explanations (risk score, portfolio recommendation) by calling Model Serving with context prepared by the backend
- Coordinate with the Recommendation Engine to produce recommendation outputs (allocation, product selection) and with Compliance Engine only indirectly (recommendations are validated by Compliance after generation)

**Inputs:**
- Structured financial data from Data Platform (feature store, processed storage, vector DB as needed)
- Requests from Core Platform Backend (e.g. “generate recommendation for user X”, “explain risk score for user Y”)
- Trigger events from Trigger Framework (e.g. “profile update”, “portfolio analysis”) that result in invocations to AI workflows
- Document binaries or references from Data Platform (for document intelligence)

**Outputs:**
- User financial profiles and risk scores (to Data Platform for storage and to Recommendation Engine for use)
- Portfolio analysis results (to Recommendation Engine and to backend for display)
- Recommendation outputs (allocation + product set) to Compliance Engine (via backend or direct contract)
- Natural-language explanations (to Core Platform Backend for delivery to user)
- Extracted structured data from documents (to Data Platform for storage and downstream use)

**Dependencies:**
- Data Platform (read/write of features, profiles, portfolio data, document storage, vector DB for RAG when applicable)
- Recommendation Engine (invoked to generate recommendations; receives product rankings and analytical inputs)
- Model Serving Infrastructure (LLM and other model inference for explanations and future RAG/agents)
- Trigger Framework (receives dispatched workflow events; does not perform trigger detection)

**Explicitly does NOT:**
- Ingest data from external sources or operate ingestion pipelines (Data Platform)
- Validate recommendations against regulatory rules (Compliance Engine)
- Detect or deduplicate trigger events (Trigger Framework)
- Load or serve models (Model Serving Infrastructure)
- Own product catalog or user account lifecycle (Core Platform Backend)

---

## 3. Recommendation Engine

**Subsystem:** Recommendation Engine

**Responsibilities:**
- Define and maintain the product universe and product classification used for recommendations
- Compute risk-aligned asset allocation targets and allocation gaps
- Rank financial products (e.g. funds) within categories using defined metrics and scoring
- Perform diversification and concentration analysis for portfolio construction
- Run portfolio optimization and generate allocation plans
- Produce recommendation objects: selected products, allocation distribution, and suitability-related scores
- Apply **business suitability** checks: risk alignment with user profile, allocation constraints, concentration limits, diversification improvement, liquidity fit, product eligibility (platform policy)
- Output recommendation payloads for **regulatory validation** by the Compliance Engine (does not perform regulatory compliance itself)

**Inputs:**
- User financial profile and risk profile (from AI Platform / Data Platform)
- Portfolio data and portfolio analysis results (from AI Platform)
- Product universe and product metadata (from Data Platform / product catalog)
- Ranked products and allocation targets (internal to Recommendation Engine pipeline)
- Configuration for suitability rules (business rules only)

**Outputs:**
- Recommendation objects: list of recommended products, allocation per product, suitability score, supporting metrics
- These outputs are sent to the Compliance Engine for regulatory validation; only Compliance-approved recommendations are delivered to users by the backend

**Dependencies:**
- Data Platform (product universe, feature store for profile/portfolio inputs)
- AI Platform (receives profile, risk score, portfolio analysis; invoked by AI Platform or backend to generate recommendations)
- Compliance Engine (consumes recommendation output; Recommendation Engine does not call Compliance—flow is: Recommendation Engine → Compliance Engine → Backend)

**Explicitly does NOT:**
- Enforce regulatory or legal compliance rules (Compliance Engine)
- Ingest or store raw financial data (Data Platform)
- Generate natural-language explanations (AI Platform / explanation modules)
- Detect triggers or dispatch workflows (Trigger Framework)
- Serve models or run inference (Model Serving Infrastructure)

---

## 4. Compliance Engine

**Subsystem:** Compliance Engine

**Responsibilities:**
- Maintain the regulatory and policy rule repository (risk alignment, allocation limits, product eligibility, diversification, reporting rules)
- Evaluate recommendation outputs (and optionally other platform outputs) against **regulatory** rules only
- Enforce policy on rule violations (reject, adjust allocation, replace product) and return approved or adjusted recommendations
- Validate product-level and portfolio-level compliance for regulatory requirements
- Record compliance decisions and audit logs for regulatory and internal oversight
- Support regulatory reporting and governance workflows based on audit data

**Inputs:**
- Recommendation objects from the Recommendation Engine (after business suitability has been applied)
- Rule and policy definitions (regulatory and internal compliance)
- Optional: user/profile/portfolio context needed to evaluate rules

**Outputs:**
- Approved or adjusted recommendation set for delivery (to Core Platform Backend)
- Compliance validation results and audit records (to audit logging / reporting)
- Alerts or flags when violations require manual review

**Dependencies:**
- Recommendation Engine (or the path that carries recommendation output) — Compliance receives recommendations; it does not generate them
- Core Platform Backend (receives approved recommendations for delivery; may provide context)
- Audit logging / storage (Data Platform or dedicated audit store)

**Explicitly does NOT:**
- Generate recommendations or compute allocation/ranking (Recommendation Engine)
- Apply business suitability rules (Recommendation Engine); Compliance applies **regulatory** rules only
- Ingest or store financial data (Data Platform)
- Run AI/ML models or explanations (AI Platform / Model Serving)
- Detect triggers or dispatch workflows (Trigger Framework)

---

## 5. Trigger Framework

**Subsystem:** Trigger Framework

**Responsibilities:**
- Consume events from defined sources (user actions, data pipeline events, market events, scheduled jobs)
- Detect whether an event satisfies a trigger condition (trigger detection layer)
- Deduplicate trigger events (key, time window, and merge policy as defined)
- Route each validated trigger event to the **appropriate subsystem** that owns the workflow (AI Platform, Recommendation Engine, Data Platform, etc.)
- Apply priority and scheduling policy for trigger processing
- Log trigger activations for monitoring and debugging
- Handle trigger-level failures (retries, dead-letter, alerts) — not the execution failures inside the target workflow

**Inputs:**
- Events from event sources: user interface (via backend), data pipelines, document processing, market feeds, schedulers
- Trigger configuration (event types, conditions, mapping to workflows, priority)
- Deduplication configuration (keys, windows)

**Outputs:**
- Dispatched workflow invocations to the correct subsystem (e.g. “run profile update for user X”, “run recommendation for user Y”, “run document processing for document Z”)
- Trigger logs and metrics (to monitoring/observability)

**Dependencies:**
- Core Platform Backend (for user-driven events)
- Data Platform (for data-driven and document events; pipeline completion events)
- AI Platform / Recommendation Engine / etc. (as **consumers** of dispatched invocations; Trigger Framework does not execute the workflow logic)

**Explicitly does NOT:**
- Execute the actual workflows (profile update, recommendation generation, document processing) — those subsystems execute their own logic
- Ingest or transform financial data (Data Platform)
- Perform analytical or recommendation logic (AI Platform, Recommendation Engine)
- Validate recommendations (Compliance Engine)
- Define business or regulatory rules (Recommendation Engine, Compliance Engine)

---

## 6. Data Platform

**Subsystem:** Data Platform (Data Infrastructure Layer)

**Responsibilities:**
- Ingest financial data from external sources (batch, streaming, event-driven) and from internal sources (e.g. document uploads)
- Validate, clean, normalize, and transform data in pipelines; route to appropriate storage
- Store raw data (data lake), processed datasets, and derived features (feature store)
- Store and index embeddings and support vector search (vector database) for RAG and retrieval
- Provide document storage and lifecycle for uploads and processed outputs
- Orchestrate pipeline execution (scheduling, event-driven triggers for ingestion)
- Expose data to AI Platform, Recommendation Engine, and Backend via defined read APIs or data contracts
- Emit events when data or pipelines change (for Trigger Framework and downstream consumers)

**Inputs:**
- Raw data from external providers (APIs, feeds, files)
- Document uploads and references from Core Platform Backend
- Extracted or enriched data from AI Platform (e.g. document extraction results, profile snapshots) for storage
- Pipeline configuration and scheduling signals

**Outputs:**
- Structured datasets, features, and profile/portfolio data for AI Platform and Recommendation Engine
- Product universe and market data for Recommendation Engine and backend
- Document storage and vector index for document intelligence and RAG
- Pipeline completion and data-change events for Trigger Framework
- Audit and pipeline metrics for monitoring

**Dependencies:**
- External financial data providers (source of raw data)
- Core Platform Backend (document uploads, read-through requests)
- AI Platform (receives extracted/processed data from AI; stores and serves it)
- Trigger Framework (receives events from Data Platform; Data Platform does not dispatch triggers)

**Explicitly does NOT:**
- Run financial analysis, risk profiling, or recommendation logic (AI Platform, Recommendation Engine)
- Apply suitability or compliance rules (Recommendation Engine, Compliance Engine)
- Run AI/ML inference or model serving (Model Serving Infrastructure)
- Detect triggers or route workflows (Trigger Framework)
- Authenticate users or manage product catalog (Core Platform Backend)

---

## 7. Agent System

**Subsystem:** Agent System (optional orchestration layer — e.g. Phase 3)

**Responsibilities:**
- Interpret user or system requests (intent, task definition)
- Build context for reasoning (retrieve profile, portfolio, documents, product info via tools)
- Select and invoke tools (data retrieval, portfolio analysis, product lookup, vector search)
- Call Model Serving (LLM) with structured context for synthesis and natural-language output
- Structure and validate LLM output for downstream consumption
- Manage agent-level memory and conversation context where applicable
- Apply decision logic (e.g. when to call which tool, when to stop)
- Handle agent-level failures (retries, fallbacks, timeouts)

**Inputs:**
- User or system requests (from Core Platform Backend or Trigger Framework)
- Responses from tools (Data Platform, AI Platform services, Recommendation Engine, vector DB)
- Model Serving responses (LLM completions, embeddings if used by agent)
- Agent configuration and tool definitions

**Outputs:**
- Structured insights and natural-language responses (to Core Platform Backend)
- Tool invocation requests to Data Platform, AI Platform, and other subsystems
- Agent execution logs and metrics

**Dependencies:**
- Data Platform (feature store, vector DB for retrieval)
- AI Platform (portfolio analysis, risk profile, product evaluation as tools)
- Recommendation Engine (may invoke to get recommendations as context for explanation)
- Model Serving Infrastructure (LLM and optionally embedding models)
- Core Platform Backend or Trigger Framework (request source)

**Explicitly does NOT:**
- Replace the simple “AI module” path used in Phase 1 (explanation generation without full agent)
- Ingest or run data pipelines (Data Platform)
- Enforce suitability or compliance (Recommendation Engine, Compliance Engine)
- Load or serve models (Model Serving Infrastructure)
- Detect or route triggers (Trigger Framework)

---

## 8. Model Serving Infrastructure

**Subsystem:** Model Serving Infrastructure

**Responsibilities:**
- Load and run AI/ML models (LLMs, embedding models, and other models used by the platform)
- Expose inference APIs (e.g. completion, embedding) to AI Platform and Agent System
- Manage model versions and runtime configuration (e.g. vLLM, Ollama)
- Scale and manage GPU/compute resources for inference
- Apply inference-level security (auth, rate limits at inference layer if delegated)
- Report inference metrics (latency, throughput, errors) to monitoring

**Inputs:**
- Inference requests from AI Platform or Agent System (prompts, parameters, model id)
- Model artifacts (weights, config) from model registry or deployment pipeline
- Configuration for scaling and routing

**Outputs:**
- Model responses (completions, embeddings, classification results) to callers
- Inference metrics and health status to monitoring

**Dependencies:**
- AI Platform / Agent System (only as callers; Model Serving does not call back into business logic)
- Model registry or artifact store (for loading models)
- Infrastructure (compute, GPU, network)

**Explicitly does NOT:**
- Implement business logic, recommendation logic, or suitability (Recommendation Engine, AI Platform)
- Build context or orchestrate tools (AI Platform, Agent System)
- Ingest or store application data (Data Platform)
- Validate recommendations (Compliance Engine)
- Detect triggers or route workflows (Trigger Framework)

---

## Boundary Summary Table

| Subsystem              | Owns suitability? | Owns compliance? | Runs pipelines? | Runs inference? | Dispatches workflows? |
|------------------------|-------------------|-------------------|-----------------|------------------|------------------------|
| Core Platform Backend  | No                | No                | No              | No               | No (emits events)      |
| AI Platform            | No                | No                | No*             | No               | No                     |
| Recommendation Engine  | **Yes (business)**| No                | No              | No               | No                     |
| Compliance Engine      | No                | **Yes (regulatory)** | No           | No               | No                     |
| Trigger Framework      | No                | No                | No              | No               | **Yes (routes only)**  |
| Data Platform          | No                | No                | **Yes**         | No               | No                     |
| Agent System           | No                | No                | No              | No               | No                     |
| Model Serving          | No                | No                | No              | **Yes**          | No                     |

\* AI Platform runs *analytical* pipelines (e.g. document intelligence); Data Platform runs *data* ingestion and storage pipelines.

---

## Resolved Overlaps (from architecture review)

1. **Suitability vs compliance**  
   - **Recommendation Engine** applies **business suitability** (risk alignment, allocation limits, concentration, diversification, liquidity, product eligibility).  
   - **Compliance Engine** applies **regulatory** rules and policy enforcement only.  
   - Flow: Recommendation Engine → Compliance Engine → Backend (only approved recommendations are delivered).

2. **Data ingestion vs data extraction vs data architecture**  
   - **Data Platform** owns all **ingestion** (batch, streaming, event-driven, document), **storage** (lake, feature store, vector DB), and **pipeline orchestration**.  
   - **AI Platform** performs **extraction** in the analytical sense: turning raw/unstructured inputs into structured data (e.g. document OCR, entity extraction). Extracted results are **written back to Data Platform** for storage and reuse.  
   - “Data architecture” is the Data Platform’s design; “data extraction” is an AI Platform capability that consumes and produces data via the Data Platform.

3. **AI module vs agent**  
   - **AI Platform** includes non-agent modules (e.g. profile construction, risk scoring, document intelligence, explanation generation in Phase 1).  
   - **Agent System** is an optional layer (e.g. Phase 3) for multi-step, tool-using orchestration and LLM synthesis.  
   - Phase 1 can use only AI Platform modules calling Model Serving directly; no agent required.

4. **Trigger detection vs workflow execution**  
   - **Trigger Framework** detects events, deduplicates, and **routes** (dispatches) to the subsystem that owns the workflow.  
   - **Workflow execution** is owned by the target subsystem (e.g. AI Platform runs profile update; Recommendation Engine runs recommendation generation; Data Platform runs ingestion jobs).  
   - Trigger Framework does not execute business or analytical logic.

---

*Boundary definitions can be inserted into or linked from the main documentation (e.g. System Architecture or a new “Architecture Boundaries” section) to keep the architectural contract explicit.*
