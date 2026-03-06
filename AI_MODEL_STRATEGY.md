# Multiplus AI Platform — Model Strategy

**Purpose:** Define which model categories power each AI capability, how models interact with AI services, selection criteria, and how the architecture supports model replacement, multi-model orchestration, A/B testing, and upgrades without changing the Quarkus backend.

**Context:** Architecture is Quarkus Backend → AI Gateway → AI Layer → Model Serving. All inference runs in the Model Serving layer; the backend never calls models directly.

**Scope:** AI model strategy only. No implementation changes; documentation definition only.

---

## 1. Model Categories

### 1.1 LLM (Large Language Models)

**Purpose:** Generate fluent, context-aware text from structured or semi-structured input. Used for explanations (risk, allocation, recommendation), narrative insights, and any task that requires natural language output grounded in platform data. LLMs consume prompts built by AI services (Orchestrator, Recommendation Reasoning Engine, Financial Insight Engine) and return completion text. No training in-platform; use pre-trained or fine-tuned open-source models (e.g. LLaMA, Mistral, Mixtral) served via a single inference API.

**Typical use:** Risk score explanation, allocation explanation, recommendation reasoning, financial insight generation, optional summarization of extracted document content.

---

### 1.2 Embedding Models

**Purpose:** Map text (or structured content serialized as text) to fixed-size dense vectors for similarity search and retrieval. Used for semantic search over product descriptions, document chunks, or FAQ content so that the AI can retrieve relevant context before calling the LLM (RAG). Embedding models are stateless: input text → output vector; no generation. Smaller and faster than LLMs; often run on CPU or a single GPU shared across many requests.

**Typical use:** Semantic search (product search, document retrieval), RAG context retrieval before LLM calls, optional clustering or deduplication of content.

---

### 1.3 OCR Models

**Purpose:** Convert image or scanned-document pixels into machine-readable text (and optionally layout structure such as regions, lines, tables). Used when uploaded documents are images or image-based PDFs. Output is raw text and layout; downstream extraction models or rules then parse that text into structured entities. OCR can be a dedicated model (e.g. Tesseract, PaddleOCR, or a cloud OCR API) or a component within a document pipeline.

**Typical use:** Document Intelligence pipeline for scanned CAS, bank statements, or photos of documents before entity extraction.

---

### 1.4 Document Extraction Models

**Purpose:** Turn document text (and optionally layout) into structured entities (e.g. scheme name, holdings, transactions, policy number, premium). Can be rule-based (regex, templates), LLM-based (prompt + completion with structured output), or a dedicated extraction model (e.g. NER, layout-aware extraction). In this strategy, “Document Extraction Models” includes both LLM-used-for-extraction and any dedicated extractors; the important distinction is the *task* (extraction) rather than a single model class. For clarity: extraction can be done by an LLM with a strict output schema or by a smaller task-specific model.

**Typical use:** CAS parsing, bank statement transaction extraction, insurance policy field extraction, tax document field extraction. Output feeds platform storage and downstream workflows.

---

### 1.5 Tabular ML Models (Future)

**Purpose:** Predict numeric or categorical outcomes from structured, tabular data (e.g. user features, portfolio features, market features). Examples: portfolio return prediction, risk tier prediction from behavior, churn or engagement prediction. These are classical ML (e.g. gradient boosting, linear models) or small neural nets, not LLMs. Training and serving are separate from the LLM path; they can be served via the same Model Serving layer (e.g. a separate endpoint or container) or a dedicated tabular-model service.

**Typical use:** Future capabilities such as portfolio performance prediction, next-best-action, or risk trend prediction. Not required for Phase 1 explanation/insight/document flows.

---

## 2. Capability → Model Type Mapping

| Capability | Primary model type | Secondary / optional | Notes |
|------------|--------------------|------------------------|-------|
| **Risk explanation** | LLM | — | Orchestrator builds prompt from score/band/components; LLM returns explanation text. |
| **Allocation explanation** | LLM | — | Orchestrator or Recommendation Reasoning builds prompt from allocation + funds + profile; LLM returns explanation. |
| **Recommendation reasoning** | LLM | — | Same as allocation; can be same LLM with different prompt or dedicated smaller LLM. |
| **Financial insights** | LLM | Embedding (optional) | LLM generates narrative from profile + portfolio; optional RAG over insights library using embeddings. |
| **Document extraction** | Document extraction (LLM or dedicated) | OCR | If input is image/scan, OCR first; then extraction model (LLM with schema or NER/extraction model) produces entities. |
| **Semantic search** | Embedding | LLM (optional) | Embedding model for query and corpus; optional LLM to refine or summarize retrieved chunks. |
| **Future portfolio prediction** | Tabular ML | LLM (optional) | Tabular model for numeric prediction; optional LLM to explain or summarize prediction. |

**Summary:** Explanation, reasoning, and insight are **LLM-driven**. Document understanding is **OCR + extraction** (extraction can be LLM or dedicated model). Semantic retrieval is **embedding-driven**, with optional LLM. Future predictive features are **tabular ML**, with optional LLM for narrative.

---

## 3. How Models Interact with AI Services

### 3.1 AI Orchestrator → LLM

**Interaction:** The Orchestrator prepares context (e.g. risk score, band, components) and builds a prompt. It calls the Model Serving layer’s **LLM completion API** (e.g. single prompt → completion). The LLM returns natural language; the Orchestrator may validate or trim the response and return it to the Gateway.

**Reasoning:** Orchestrator owns “what to ask” and “what to do with the answer”; it does not own model weights or inference. All generation tasks (risk explanation, allocation explanation, general insight) that need one or more LLM calls go through the Orchestrator (or a dedicated service that also uses the LLM). One LLM endpoint can serve multiple request types by varying the prompt.

---

### 3.2 Document Intelligence Service → OCR + Extraction

**Interaction:** For image or scanned PDF input, Document Intelligence first calls an **OCR** capability (dedicated OCR model or API) to get text and layout. It then passes that text (and optionally layout) to an **extraction** step: either an LLM prompted with a strict output schema (e.g. JSON with holdings, transactions) or a dedicated document extraction model. The service returns structured entities to the Gateway; the Gateway (or backend) persists them.

**Reasoning:** OCR and extraction are separate steps so that (1) OCR can be swapped (e.g. cloud vs on-prem) without changing extraction logic, and (2) extraction can use LLM for flexibility or a smaller model for speed/cost. Document Intelligence orchestrates the pipeline; Model Serving exposes OCR and extraction endpoints (or a single “document pipeline” endpoint that runs both internally).

---

### 3.3 Recommendation Reasoning Engine → LLM

**Interaction:** The Recommendation Reasoning Engine receives allocation + recommended funds + profile from the Gateway. It builds a prompt (e.g. “Explain why these funds were chosen for this user”) and calls the **LLM completion API**. The LLM returns reasoning text; the engine returns it in the AIResponse result.

**Reasoning:** Recommendation reasoning is a text-generation task; an LLM is the natural fit. It can share the same LLM as allocation explanation with a different prompt, or use a smaller/cheaper LLM if latency and cost are constrained. The engine does not perform ranking or allocation; it only explains the platform’s recommendation.

---

### 3.4 Financial Insight Engine → LLM

**Interaction:** The Financial Insight Engine receives FinancialProfile and optionally Portfolio. It builds a prompt (e.g. “Generate a short narrative insight for this user’s risk and portfolio”) and calls the **LLM completion API**. Optionally it first uses **semantic retrieval** (see below) to pull similar insights or product snippets, then includes them in the prompt (RAG). The LLM returns narrative text; the engine returns it in the result.

**Reasoning:** Insights are narrative; an LLM is appropriate. RAG (embedding + retrieval + LLM) is optional for Phase 2+ to ground responses in an insights library or product catalog.

---

### 3.5 Semantic Retrieval → Embedding Model

**Interaction:** A retrieval component (e.g. inside Financial Insight Engine or a dedicated RAG service) takes a query (e.g. user profile summary or “diversification insight”). It calls the **embedding API** to get a query vector, then queries a vector store (e.g. product descriptions, document chunks, insight templates) for similar vectors. Retrieved items are passed to the LLM as context or returned as search results.

**Reasoning:** Embedding models are optimized for similarity; they are not used for generation. Separation allows the vector store and embedding model to be updated independently of the LLM. The same embedding model can serve product search, document retrieval, and RAG.

---

### 3.6 Summary: Service → Model

| AI service | Model(s) used | Flow |
|------------|----------------|------|
| AI Orchestrator | LLM | Context → prompt → completion API → text. |
| Document Intelligence Service | OCR, then Document extraction (LLM or dedicated) | Binary → OCR API → text → extraction API → entities. |
| Recommendation Reasoning Engine | LLM | Recommendation + profile → prompt → completion API → reasoning text. |
| Financial Insight Engine | LLM; optionally Embedding + vector store (RAG) | Profile + portfolio → (optional: embed + retrieve) → prompt → completion API → insight text. |
| Semantic search / RAG | Embedding | Query → embed → vector search → (optional) LLM with retrieved context. |

---

## 4. Model Selection Criteria

### 4.1 Latency Requirements

- **User-facing explanation (risk, allocation, recommendation):** Target p95 &lt; 5 s. Single LLM call with small-to-medium context. Prefer models that complete in 1–3 s on target hardware (e.g. 7B–8B parameter models on one GPU, or smaller models).
- **Financial insight (on-demand):** Same as above; single LLM call.
- **Document extraction:** Acceptable 10–60 s for full pipeline (OCR + extraction). Can be async from user perspective; sync API should set gateway timeout accordingly (e.g. 60 s).
- **Semantic search / embedding:** Target &lt; 100 ms per embed for good UX when used in RAG; batch embedding for indexing can be slower.

**Implication:** Prefer smaller or quantized LLMs for explanation/reasoning/insight if they meet quality bars; reserve larger LLMs for complex or low-latency-tolerant tasks.

---

### 4.2 GPU vs CPU Inference

- **LLM:** GPU (or dedicated accelerator) for 7B+ parameter models at acceptable latency. CPU-only is possible for very small models (e.g. 1B–3B) but latency and throughput may be limiting.
- **Embedding:** Often feasible on CPU for batch and moderate QPS; GPU can reduce latency and increase throughput for real-time RAG.
- **OCR:** Depends on model; many OCR engines run on CPU; GPU can speed up heavy layouts.
- **Document extraction (LLM-based):** Same as LLM. Dedicated small extraction models may run on CPU.
- **Tabular ML:** Typically CPU (e.g. XGBoost, sklearn); small neural nets can run on CPU or GPU.

**Implication:** Model Serving layer should support both GPU (LLM, optional embedding/OCR) and CPU (embedding, tabular, small models) so that cost and capacity can be balanced.

---

### 4.3 Cost Considerations

- **LLM:** Cost scales with model size, sequence length, and QPS. Smaller models (7B–8B) reduce cost per request; quantization (e.g. INT8) further reduces memory and can reduce cost. Prefer one “general” LLM for explanation/insight/reasoning to avoid multiple large deployments.
- **Embedding:** Usually low cost per request; batch indexing has one-time cost.
- **OCR + extraction:** Per-document cost; batch and async processing avoid blocking user flows and allow use of slightly heavier models if needed.
- **Tabular ML:** Typically low inference cost; training cost is separate.

**Implication:** Use smaller or quantized LLMs where quality is sufficient; reserve larger/full-precision models for tasks that clearly benefit (e.g. complex reasoning, multi-turn, or high-stakes explanation).

---

### 4.4 Accuracy and Capability Requirements

- **High-capability LLM (e.g. 13B+, or 7B with strong instruction tuning):** Use when output must be nuanced, compliant, or multi-facet (e.g. allocation explanation that references risk, diversification, and product fit). Recommendation reasoning and allocation explanation can justify a better model if regulatory or UX bar is high.
- **Smaller / more efficient LLM (e.g. 7B–8B, quantized):** Use for risk explanation (narrow task), short insights, or high-volume/low-latency paths. Acceptable when prompts are well-structured and output format is constrained (e.g. one paragraph).
- **Dedicated extraction model vs LLM:** Dedicated (NER, layout-based) can be more accurate and faster for fixed document types (e.g. CAS); LLM extraction is more flexible for new doc types and varied layouts. Start with LLM for extraction for flexibility; add dedicated models later for high-volume, fixed-schema types.

**Summary:** Map “explanation/reasoning/insight” to one or two LLM tiers (e.g. “fast” 7B for risk/short insight, “quality” 13B for allocation/recommendation reasoning) and document extraction to OCR + LLM or dedicated extractor based on volume and schema stability.

---

## 5. Model Extensibility

The architecture keeps the Quarkus backend unchanged while allowing model replacement, multi-model orchestration, A/B testing, and upgrades. All of the following are done inside the **AI Layer** and **Model Serving** layer; the backend only calls the **AI Gateway** with the same **AIRequest** / **AIResponse** contract.

### 5.1 Model Replacement

- **Where it happens:** Model Serving layer loads model artifacts (weights, config) from a registry or volume. To replace a model, deploy a new model version (or new model id) and update the serving config to point to it. AI services (Orchestrator, Document Intelligence, etc.) call the Model Serving API by **model id** or **endpoint name** (e.g. `explain_risk_score` → `llama-3-8b-v1`). Changing the mapping from endpoint to model id does not require backend or Gateway API changes.
- **Backend impact:** None. Request/response shape (AIRequest, AIResponse) and Gateway endpoints stay the same. Only the model behind the gateway changes.

---

### 5.2 Multi-Model Orchestration

- **Where it happens:** AI services can call more than one model in a single workflow. Example: Document Intelligence calls OCR endpoint, then extraction endpoint (different model or same LLM with different prompt). Financial Insight Engine can call embedding endpoint for retrieval, then LLM endpoint for generation. Orchestration logic lives in the AI Layer (Document Intelligence, Orchestrator, etc.); the Gateway can expose a single operation (e.g. `extract_document`) that internally runs OCR + extraction.
- **Backend impact:** None. Backend sends one request; Gateway returns one response. Internal multi-model steps are hidden.

---

### 5.3 A/B Testing

- **Where it happens:** AI Gateway or the service behind it (e.g. Orchestrator) can route a percentage of requests to different model backends based on request id, user id, or random bucket. Example: 90% of `explain_risk_score` to `llama-3-8b`, 10% to `mistral-7b`. Results are logged with model id; offline evaluation compares metrics (latency, user feedback, compliance). Decision to promote a variant is config-driven (feature flag or routing config); no backend change.
- **Backend impact:** None. Backend may optionally send a `metadata.experimentId` or similar for analysis; response shape is unchanged. Model id can be returned in `AIResponse.modelUsed` for logging.

---

### 5.4 Model Upgrades

- **Where it happens:** Model Serving deploys a new version (e.g. `llama-3-8b-v2` with better instruction tuning). AI services or Gateway config is updated to use the new version. Rollout can be gradual (routing by percentage or by user segment). Old version is kept until the new one is validated, then deprecated.
- **Backend impact:** None. Contract (AIRequest, AIResponse) is stable; only the model version and behavior change. Backend and clients do not depend on model identity except optionally for logging or analytics via `modelUsed`.

---

### 5.5 Summary

| Concern | Handled in | Backend change? |
|---------|------------|------------------|
| Replace model (e.g. LLaMA → Mistral) | Model Serving + Gateway/service config | No |
| Use multiple models in one flow (OCR + LLM) | AI Layer (Document Intelligence, etc.) | No |
| A/B test two LLMs for explanation | Gateway or Orchestrator routing + config | No (optional metadata) |
| Upgrade to new model version | Model Serving + config | No |

Stable **Gateway API** and **request/response schema** ensure the backend remains decoupled from model choice, version, and orchestration details.

---

*This document defines the AI model strategy only. No implementation files are modified.*
