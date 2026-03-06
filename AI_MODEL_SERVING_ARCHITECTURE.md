# Multiplus AI Platform — Model Serving Architecture

**Purpose:** Define the model serving infrastructure that runs all AI models used by the platform. Only AI services (Orchestrator, Document Intelligence, Recommendation Reasoning, Financial Insight) call this layer; the Quarkus backend never interacts with models directly.

**Scope:** Model serving components, runtime architecture, request flow, model management, performance optimization, and observability. Documentation only; no implementation file changes.

---

## 1. Model Serving Components

### 1.1 LLM Inference Server

**Purpose:** Load and run large language models (LLMs) and expose a completion API. Accepts prompts (and optional system prompt, stop sequences, max tokens, temperature) and returns generated text. Handles model loading into GPU memory, batching of concurrent requests when supported, and streaming of tokens if the client requests it. One or more instances can serve different model ids (e.g. 7B for explanations, 13B for reasoning) or the same model with different configs. Typical implementations: vLLM, Ollama, TGI (Text Generation Inference), or a custom server wrapping a runtime (e.g. llama.cpp).

**Consumers:** AI Orchestrator, Recommendation Reasoning Engine, Financial Insight Engine, and optionally Document Intelligence (when extraction is LLM-based). All call via a unified completion endpoint (e.g. POST with model id, messages/prompt, parameters).

---

### 1.2 Embedding Service

**Purpose:** Load and run embedding models and expose an embedding API. Accepts text (single or batch) and returns fixed-size vectors. Stateless and typically fast; used for semantic search and RAG. Can run on CPU for moderate QPS or on GPU for higher throughput and lower latency. May expose a single endpoint (e.g. POST /embed with model id and texts) or separate endpoints per model. Typical implementations: sentence-transformers in a small HTTP service, or a dedicated embedding server (e.g. Infinity, FastEmbed, or vendor API).

**Consumers:** Semantic retrieval component, RAG pipeline inside Financial Insight Engine or Document Intelligence. AI services send text(s); Embedding Service returns vectors; consumers then query the vector store.

---

### 1.3 OCR Service

**Purpose:** Accept raw document bytes or a reference (e.g. URL, S3 key) and return extracted text plus optional layout (regions, lines, tables). Used for scanned PDFs and images before document extraction. Can be a single model/engine (e.g. Tesseract, PaddleOCR) or a wrapper around a cloud OCR API. Runs on CPU or GPU depending on the engine; often CPU is sufficient. Exposes an endpoint such as POST /ocr with document payload and optional options (language, output format).

**Consumers:** Document Intelligence Service. It sends document bytes or ref; OCR Service returns text/layout; Document Intelligence then passes output to Document Extraction Service or LLM.

---

### 1.4 Document Extraction Service

**Purpose:** Accept document text (and optionally layout) and return structured entities (e.g. holdings, transactions, policy fields). Can be implemented as (1) an LLM call with a strict output schema (same LLM Inference Server with a dedicated extraction prompt/config), or (2) a dedicated extraction model (e.g. NER, layout-aware model) served in a separate process. Exposes an endpoint such as POST /extract with documentType, text, and optional layout. Returns JSON with entities and confidence.

**Consumers:** Document Intelligence Service. It sends OCR output (or raw text for digital PDFs); Document Extraction Service returns entities; Document Intelligence persists or returns them to the Gateway.

---

### 1.5 Model Registry

**Purpose:** Store and version model artifacts (weights, config files, tokenizer, optional fine-tuning metadata). Does not run inference. Provides a catalog of model ids and versions (e.g. llama-3-8b-v1, embedding-all-minilm-v1) and a way for inference servers to pull artifacts at startup or on demand. Can be a blob store (S3, GCS) with a manifest/index, or a dedicated registry (MLflow, custom API). Access control and audit (who deployed what, when) can be implemented at this layer.

**Consumers:** LLM Inference Server, Embedding Service, OCR Service, Document Extraction Service (when they load models at startup or on-demand). Deployment pipelines push artifacts to the registry; inference processes pull by model id and version.

---

### 1.6 Inference Router

**Purpose:** Single entry point for AI services calling the Model Serving layer. Receives requests with a target (e.g. completion, embed, ocr, extract) and optional model id or endpoint name; routes to the appropriate backend (LLM Inference Server, Embedding Service, OCR Service, Document Extraction Service). Can enforce auth, rate limits, and request validation; add request ids and correlation for tracing; and return a unified error format. Enables A/B routing (e.g. 10% of completion requests to model B) and version selection without AI services knowing individual server URLs. Optionally aggregates metrics (latency, errors, token usage) per route and model.

**Consumers:** All AI services. They call the Inference Router (e.g. HTTP/gRPC) instead of individual servers. Router forwards to the right service and returns the response.

---

## 2. Runtime Architecture

### 2.1 GPU Nodes

- **Role:** Run LLM inference and optionally heavy OCR or embedding at scale. Each node has one or more GPUs (e.g. A10, A100, L4) with sufficient VRAM for the target model (e.g. 7B–8B fits on a single 24 GB GPU; 13B may need 40 GB or quantization).
- **Deployment:** LLM Inference Server runs in containers (e.g. one pod per model id, or one server managing multiple models with dynamic loading). Kubernetes (or equivalent) schedules pods on GPU nodes; resource limits (nvidia.com/gpu, memory) ensure one model per GPU or a defined share.
- **Scaling:** Horizontal: add more GPU nodes and more LLM server replicas; load balancer or Inference Router distributes completion requests. Vertical: use larger GPUs or multi-GPU for a single large model. Autoscaling can be based on request queue depth, GPU utilization, or latency SLO.

---

### 2.2 CPU Workers

- **Role:** Run embedding service, OCR service, and tabular ML (future). No GPU required; lower cost per node. Suitable for stateless, batch-friendly or low-latency small models.
- **Deployment:** Embedding Service and OCR Service run in containers on CPU-only nodes. Document Extraction Service (when not LLM-based) can run here. Multiple replicas behind a load balancer or via the Inference Router.
- **Scaling:** Horizontal scaling by adding replicas; CPU utilization or request rate can drive autoscaling.

---

### 2.3 Containerized Inference

- **Principle:** Each inference component (LLM server, Embedding Service, OCR Service, Document Extraction Service) runs in its own container image. Images include the runtime (Python, CUDA, etc.), the serving code, and optionally a default model; model weights can be loaded from the Model Registry at startup to keep images small and models versioned separately.
- **Orchestration:** Kubernetes (or similar) manages deployment, health checks, and resource limits. Same cluster can host GPU and CPU node pools; pods are scheduled on the appropriate pool based on resource requests (e.g. nvidia.com/gpu: 1 for LLM).
- **Isolation:** Failure or high load in one component (e.g. LLM) does not bring down embedding or OCR; each service scales and restarts independently.

---

### 2.4 Model Loading

- **At startup:** Inference servers read config (e.g. model id and version, or path in registry). They pull artifacts from the Model Registry (or mount a pre-populated volume) and load the model into memory/VRAM. Startup time can be 30 s to several minutes for large LLMs; readiness probes should wait until loading is complete.
- **On-demand (optional):** For many models with low QPS, servers can load models on first request and cache them; this reduces idle GPU usage but adds latency to the first request. Preloading is preferred for high-traffic models.
- **Multiple models:** A single LLM server process can host one model; alternatively, a server can support multiple model ids and load them on demand or keep a subset in memory, depending on VRAM and traffic.

---

### 2.5 Scaling

- **LLM:** Scale out by adding more replicas of the LLM Inference Server; each replica can serve the same model id. Inference Router or load balancer distributes requests. Queue-based backpressure (e.g. reject or queue when all replicas are busy) prevents overload.
- **Embedding / OCR / Extraction:** Scale out by adding more CPU replicas. Stateless design allows any replica to handle any request.
- **Autoscaling:** Use HPA (Kubernetes Horizontal Pod Autoscaler) or similar on CPU/GPU utilization or custom metrics (e.g. request latency, queue depth). Scale-in should be gradual to avoid dropping in-flight requests.

---

### 2.6 How AI Services Call Model Servers

- **Unified path:** AI services do not call LLM or Embedding servers directly. They call the **Inference Router** at a fixed base URL (e.g. internal DNS or load balancer). Request body specifies operation type (completion, embed, ocr, extract) and parameters (model id, prompt, texts, document, etc.). Router forwards to the appropriate backend and returns the response.
- **Protocol:** HTTP REST or gRPC. Same as used between AI Gateway and AI services; only the Router talks to the individual inference services. Auth can be service-to-service (e.g. JWT or network policy); no user tokens at the model layer.
- **Failure handling:** Timeouts and retries are configured at the AI service or Router level. Router returns a structured error (e.g. 503, timeout) so AI services can degrade (e.g. no explanation) or retry.

---

## 3. Request Flow

### 3.1 Completion (Explanation, Reasoning, Insight)

1. **AI Orchestrator** (or Recommendation Reasoning / Financial Insight Engine) builds a prompt and decides it needs an LLM completion. It sends a request to the **Inference Router**: e.g. `POST /v1/completion` with body `{ "modelId": "llama-3-8b-v1", "prompt": "...", "maxTokens": 512, "temperature": 0.3 }`.
2. **Inference Router** validates the request, optionally applies A/B or version routing (e.g. map `llama-3-8b-v1` to backend pool), adds request id and correlation id, and forwards to the **LLM Inference Server** (e.g. POST to the server’s completion endpoint). If multiple replicas exist, Router or load balancer selects one.
3. **LLM Inference Server** loads the model (if not already loaded), runs inference, and returns generated text (or stream of tokens). Response includes tokens generated, stop reason, and optional usage metadata.
4. **Inference Router** receives the response, optionally logs metrics (latency, tokens), and returns to the **AI Orchestrator** in a unified shape (e.g. `{ "text": "...", "modelId": "...", "usage": { "promptTokens", "completionTokens" } }`).
5. **AI Orchestrator** uses the text in the AIResponse result and returns to the AI Gateway.

---

### 3.2 Embedding

1. **Semantic retrieval / RAG component** needs vectors for a query or a set of texts. It sends a request to the **Inference Router**: e.g. `POST /v1/embed` with body `{ "modelId": "embed-all-minilm-v1", "texts": ["..."] }`.
2. **Inference Router** forwards to the **Embedding Service**.
3. **Embedding Service** returns vectors (e.g. list of float arrays).
4. **Inference Router** returns them to the caller. Caller then queries the vector store or uses vectors in an LLM prompt.

---

### 3.3 Document (OCR + Extraction)

1. **Document Intelligence Service** has a document to process. It first calls the **Inference Router**: e.g. `POST /v1/ocr` with document bytes or ref. Router forwards to **OCR Service**; OCR Service returns text and layout.
2. **Document Intelligence Service** then calls the Router again: e.g. `POST /v1/extract` with `documentType`, `text`, and optional layout. Router forwards to **Document Extraction Service** (or to LLM completion with extraction prompt). Document Extraction returns entities and confidence.
3. **Document Intelligence Service** aggregates results and returns to the AI Gateway; Gateway or backend persists entities.

---

### 3.4 Flow Summary

```
AI Orchestrator / Recommendation Reasoning / Financial Insight
    → Inference Router (POST /v1/completion)
        → LLM Inference Server
            → Model (e.g. LLaMA 8B)

Semantic retrieval / RAG
    → Inference Router (POST /v1/embed)
        → Embedding Service
            → Embedding model

Document Intelligence
    → Inference Router (POST /v1/ocr) → OCR Service → OCR model
    → Inference Router (POST /v1/extract) → Document Extraction Service → Extraction model or LLM
```

Responses flow back along the same path; Router does not modify response body except to wrap in a common envelope if desired (e.g. add requestId, modelId, latency).

---

## 4. Model Management

### 4.1 Model Versioning

- **Scheme:** Each model has an id (e.g. `llama-3-8b`) and a version (e.g. `v1`, `v2`) or a full tag (e.g. `llama-3-8b-20250307`). The Model Registry stores artifacts per (model id, version). Inference servers and the Router resolve `modelId` to a concrete artifact and optional backend.
- **Immutability:** Published versions are immutable. New training or config changes produce a new version. This allows repeatable deployments and rollback to a known version.
- **Metadata:** Registry can store metadata per version: creation time, training config, metrics (e.g. eval loss), and compliance or approval flags for production use.

---

### 4.2 Deployment of New Models

- **Build and push:** Training or procurement pipeline produces model artifacts (weights, config, tokenizer). Artifacts are pushed to the Model Registry with a new version tag.
- **Deploy:** Deployment pipeline (e.g. CI/CD) updates the inference server config or Kubernetes manifest to use the new version (e.g. `MODEL_VERSION=v2`). New pods are rolled out (see rolling upgrade). Router config is updated if the new model is exposed under a new id or replaces an existing id.
- **Smoke test:** After deploy, automated tests send sample requests to the Router and assert on response shape and basic quality. Optional canary: route a small percentage of traffic to the new version and compare metrics.

---

### 4.3 Rolling Upgrades

- **Process:** New replicas (pods) with the new model version are started. They are added to the load balancer or Router backend pool after readiness. Old replicas are drained (no new requests) and terminated. Request draining and graceful shutdown (finish in-flight requests) prevent user-visible errors.
- **Pace:** Roll out one or a few replicas at a time; wait for health and latency to stabilize before continuing. Rollback if error rate or latency exceeds a threshold.
- **Zero-downtime:** With multiple replicas, the service remains available throughout the rollout. Single-replica deployments will have a short unavailability during replacement unless a blue-green or canary strategy is used.

---

### 4.4 Rollback Strategy

- **Trigger:** Rollback when error rate, latency, or quality metrics (e.g. user feedback, automated checks) degrade after a new version. Can be manual or automated (e.g. revert if p99 latency &gt; 2x baseline for 5 minutes).
- **Mechanism:** Revert the deployment config to the previous model version and trigger a new rollout. Previous version artifacts remain in the Model Registry so that inference servers can load them again. Router or service config is reverted so that traffic goes to the old version.
- **Data:** No request/response data is stored in the inference layer for rollback; only config and artifact version change. AI services and Gateway may log model id for analysis so that bad versions can be identified post hoc.

---

## 5. Performance Optimization

### 5.1 Request Batching

- **Embedding:** Embedding Service can accept a batch of texts in one request and return a batch of vectors. AI services or a batching middleware can collect multiple embed requests (e.g. over a short window) and send one batch to reduce overhead and improve GPU/CPU utilization. Trade-off: slightly higher latency for the first request in a batch.
- **LLM:** Some runtimes (e.g. vLLM) support continuous batching: multiple requests are batched in the same forward pass when their sequences fit. This increases GPU utilization and throughput. No change required at the AI service if the LLM server handles batching internally; otherwise, a dedicated batching proxy in front of the LLM server can aggregate completion requests.

---

### 5.2 Streaming Responses

- **LLM:** Completion endpoint can support Server-Sent Events (SSE) or chunked transfer: tokens are streamed as they are generated. Reduces time-to-first-token and improves perceived latency for long answers. AI services can either (1) stream through to the Gateway and client, or (2) consume the full stream and then return a single response. Router passes through streaming responses; no buffering of full body required.
- **Other services:** Embedding and OCR typically return a single response; no streaming. Document extraction returns one JSON payload.

---

### 5.3 GPU Utilization

- **Batching:** As above; continuous batching for LLM increases GPU utilization.
- **Quantization:** INT8 or INT4 quantization reduces memory and can increase throughput per GPU so that more concurrent requests are served.
- **Kernel optimization:** Use optimized kernels (e.g. FlashAttention, CUDA graphs) when supported by the runtime to reduce latency and improve utilization.
- **Sizing:** Right-size GPU allocation per model (e.g. one 7B model per 24 GB GPU) so that memory is used efficiently and multiple replicas can share a node if needed.

---

### 5.4 Caching Strategies

- **Embedding cache:** Repeated identical texts (e.g. same product description, same insight template) can be cached by (hash of text, model id) and the cached vector returned without calling the Embedding Service. Cache can live in the AI service or in a small cache layer next to the Router.
- **LLM cache:** Optional prompt/response cache for identical prompts (e.g. same risk score and band). Useful for pre-generated explanations that are read multiple times. Cache key: hash of (model id, prompt, params). TTL can be short (e.g. 1 hour) to allow model or data updates.
- **Model output cache:** Document extraction results for the same document id can be cached so that repeated requests (e.g. retries) do not re-run OCR and extraction. Invalidate on document replace or version change.

---

## 6. Observability

### 6.1 Model Latency

- **Metrics:** Each inference component (or the Inference Router) records request latency (e.g. time from request received to response sent). Report percentiles (p50, p95, p99) and histogram per (endpoint, model id, optional version). Export to a metrics system (e.g. Prometheus, CloudWatch).
- **SLO:** Define latency SLOs per operation (e.g. completion p95 &lt; 5 s, embed p95 &lt; 100 ms). Alert when latency exceeds threshold. Dashboards show latency by model and by AI service caller.

---

### 6.2 Error Rates

- **Metrics:** Count of requests that return 4xx/5xx or timeout per (endpoint, model id, error type). Error rate = errors / total requests over a window. Alert on elevated error rate or a spike in timeouts.
- **Logging:** Log request id, model id, error code, and optional message for failed requests. Avoid logging full prompts or responses in production; use sampling or redaction if needed for debugging.

---

### 6.3 Token Usage

- **LLM:** LLM Inference Server (or Router) reports prompt tokens and completion tokens per request. Aggregate by (model id, caller, date) for cost and usage analysis. Store in metrics or a dedicated usage store. Optional: expose a usage API for billing or quotas.
- **Embedding:** Report number of input tokens or text count per request; optional vector dimension. Used for capacity planning and cost attribution.

---

### 6.4 Model Version Usage

- **Tracking:** Every request to the Router (or to each server) should include or record the resolved model id and version. Log or metric: (model id, version) per request or per batch. Enables: (1) A/B analysis (compare latency and errors across versions), (2) rollback impact (which traffic was on the bad version), (3) deprecation (traffic per version before retiring).
- **AIResponse:** The AI Gateway can include `modelUsed` in the response (from the inference layer) so that the backend or client can log it for user-facing requests and support debugging.

---

### 6.5 Summary of Observability

| Concern | What to track | Where |
|---------|----------------|-------|
| Model latency | p50/p95/p99 per endpoint, model id | Router or each inference service; export to Prometheus/CloudWatch |
| Error rates | Count of errors and timeouts per endpoint, model id | Same |
| Token usage | Prompt + completion tokens per request; aggregate by model, caller, date | LLM server or Router; optional usage store |
| Model version usage | Resolved model id and version per request | Router or server; logs and metrics |

Alerts: latency SLO breach, error rate spike, and optional token budget. Dashboards: latency by model, error rate by model, token usage over time, and version distribution.

---

*This document defines the model serving infrastructure only. No implementation files are modified.*
