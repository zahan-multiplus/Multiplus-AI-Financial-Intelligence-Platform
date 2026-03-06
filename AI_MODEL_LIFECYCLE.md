# Multiplus AI Platform — Model Lifecycle Management

**Purpose:** Define how AI models (LLM, embedding, OCR, document extraction, future tabular ML) move through their lifecycle from selection and training through deployment, monitoring, and retraining. Integrates with the existing AI Gateway, AI services, Model Serving layer, and Model Registry.

**Scope:** Model lifecycle only. Documentation definition; no implementation file changes.

---

## 1. Model Lifecycle Stages

### 1.1 Model Selection

**What happens:** The platform decides which model (and variant) to use for each capability. For pre-trained models, selection is the choice of base model (e.g. LLaMA 8B, Mistral 7B, sentence-transformers/all-MiniLM) and optional variant (quantized, instruction-tuned). For custom or fine-tuned models, selection includes architecture choice and base checkpoint. Decisions are documented and versioned (e.g. in Model Registry metadata or a config repo). Selection criteria: task fit, latency and cost constraints, license and compliance, and availability of evaluation benchmarks.

**Output:** Selected model id, base artifact reference, and intended use (e.g. `llama-3-8b` for explanation, `embed-all-minilm` for embeddings). Feeds into training (if fine-tuning) or directly into evaluation and registration (if using off-the-shelf).

---

### 1.2 Training or Fine-Tuning

**What happens:** For models that require training or adaptation, a training pipeline runs. **Pre-trained models** may skip this stage initially (use as-is). **Fine-tuning** (e.g. LLM on explanation examples, extractor on labeled documents) consumes curated datasets and produces a new artifact. **Tabular ML** models are trained from scratch on feature tables. Training runs in a dedicated environment (e.g. GPU training cluster or managed ML service); outputs are model weights and config. Training jobs are logged (config, data version, metrics) for reproducibility. No production traffic is used for training without explicit consent and governance.

**Output:** Trained or fine-tuned artifact (weights, tokenizer, config) and training report (loss curves, validation metrics). Artifact is not yet in the Model Registry; it is a candidate for evaluation.

---

### 1.3 Evaluation

**What happens:** Before a model is used in production, it is evaluated. **Offline evaluation** uses held-out datasets and metrics (accuracy, F1, BLEU/ROUGE for text, latency, robustness). **A/B testing** (optional) runs the candidate model on a fraction of production traffic and compares to the current model (latency, user feedback, guardrail violations). **Human review** (e.g. sample of explanations or extractions) checks for quality, safety, and compliance. Evaluation gates determine whether the model is promoted to the next stage. Failures are documented and fed back to selection or training.

**Output:** Evaluation report (metrics, comparison to baseline, human review summary) and a go/no-go decision for registration and deployment.

---

### 1.4 Model Registration

**What happens:** Approved model artifacts are uploaded to the **Model Registry** with a version tag (e.g. `llama-3-8b-explanation-v1`). Metadata is stored: creation time, training or base model ref, evaluation summary, owner, and optional compliance or approval flags. Registry entries are immutable; new versions create new entries. This stage does not serve traffic; it only makes the model available for deployment.

**Output:** Registered model id and version, stored artifacts and metadata. Deployment and Model Serving can reference this version.

---

### 1.5 Deployment

**What happens:** A registered model version is deployed into the **Model Serving** layer. Deployment pipeline (or manual process) configures the inference servers (e.g. LLM Inference Server, Embedding Service) to load the artifact from the Registry and exposes it under an endpoint or model id. **Rollout** can be gradual (canary, percentage-based). Traffic is shifted from the previous version to the new one. Health checks and smoke tests confirm the deployed model responds correctly. Rollback is available if monitoring or alerts indicate a problem.

**Output:** Model version live in production; AI services can call it via the Inference Router. Deployment log (version, time, target environment) is recorded.

---

### 1.6 Monitoring

**What happens:** Once deployed, the model is monitored continuously. **Operational metrics:** latency, throughput, error rate, timeouts. **Quality and safety metrics:** user feedback (e.g. thumbs up/down), guardrail violations (e.g. refusals, content flags), and optional accuracy proxies (e.g. consistency checks, sample-based human review). **Business metrics:** token usage, cost per request. Dashboards and alerts surface degradation (e.g. latency spike, error rate increase, drop in satisfaction). Monitoring data is retained for analysis and for triggering retraining.

**Output:** Time-series metrics, alerts, and optionally labeled datasets (e.g. failed cases, user corrections) for future model improvement.

---

### 1.7 Retraining

**What happens:** When triggers indicate the model should be updated—scheduled (e.g. quarterly), or event-driven (e.g. accuracy drop, drift, new document types)—the lifecycle re-enters **Model Selection** (or stays with same base) and **Training/Fine-Tuning** with updated or additional data. New artifacts are produced, then **Evaluation**, **Registration**, and **Deployment** follow again. Previous version can be kept in Registry for rollback; deprecated versions are eventually archived or removed per policy.

**Output:** New model version in production; previous version available for rollback. Lifecycle repeats.

---

## 2. Training Pipeline

### 2.1 How Training Datasets Are Created

- **Pre-trained models:** No platform-owned training in the first phase. Base models (LLM, embedding, OCR) are obtained from vendors or open-source releases. “Dataset” for selection is the set of evaluation benchmarks and internal test cases.
- **Fine-tuning (LLM):** Datasets are created from (1) **curated examples:** explanation and reasoning pairs (input context + desired output) from internal drafts or human-authored templates; (2) **production data:** sampled and anonymized user contexts with human-edited or approved outputs; (3) **synthetic data:** generated from rules or a teacher model and then filtered/verified. Datasets are versioned (e.g. in object store or DVC) and tagged with purpose (e.g. risk_explanation_v1). Labels and consent for use in training are tracked for compliance.
- **Document extraction:** Labeled documents (CAS, bank statement, etc.) with annotated entities (holdings, transactions). Can be produced by human annotators or by running existing extractors and then correcting. Document type and schema version are part of the dataset metadata.
- **Tabular ML (future):** Feature tables (user/portfolio features) and target labels (e.g. outcome, churn). Built from the data platform or feature store; train/validation/test split and time boundaries are defined to avoid leakage.

**Governance:** Dataset creation and usage follow data governance and privacy policy. Personal data used for training is minimized, anonymized, or pseudonymized as required; access is restricted.

---

### 2.2 Where Training Jobs Run

- **Environment:** Training runs outside the production inference path. Options: (1) dedicated **GPU training cluster** (e.g. Kubernetes with GPU nodes, or EC2/GCE GPU instances); (2) **managed ML platform** (e.g. SageMaker, Vertex AI, Databricks); (3) **external partner** for fine-tuning with strict data and artifact handoff. The same Model Registry can receive artifacts from any of these.
- **Orchestration:** Training jobs are launched by a pipeline (e.g. Airflow, Kubeflow, or CI/CD). Job config includes: dataset ref, model base ref, hyperparameters, and output path. Jobs produce artifacts (checkpoints, final weights, config) and logs. Failed jobs are retried or escalated; success triggers the next stage (evaluation).
- **Isolation:** Training does not read from production model serving or from live user traffic unless explicitly exported and approved for training use.

---

### 2.3 How Models Are Produced and Stored

- **Produced:** Training job writes artifacts to a **job output location** (e.g. S3, shared filesystem). Artifacts include: model weights (e.g. safetensors, bin), tokenizer/config, and a small manifest (framework, version, base model). For tabular ML, serialized model (e.g. pickle, ONNX) and feature schema are produced.
- **Stored:** After evaluation approval, artifacts are **copied or registered** into the **Model Registry**. Registry stores binaries and metadata (version, creation time, training run id, evaluation summary). Registry is the single source of truth for deployable versions. Initial pre-trained models are also ingested into the Registry (e.g. download from vendor and register with a version tag) so that deployment always pulls from the Registry.

---

## 3. Evaluation Process

### 3.1 Evaluation Datasets

- **Held-out sets:** For each capability, one or more evaluation datasets are maintained: (1) **generic:** public or internal benchmarks (e.g. instruction following, extraction F1); (2) **domain:** platform-specific cases (e.g. risk explanations, CAS extractions) with reference answers or labels. Datasets are versioned and not used for training the model under test.
- **Coverage:** Evaluation sets cover main user segments, document types, and edge cases (e.g. low scores, missing fields). Regression tests: a fixed subset is run on every candidate model; results are compared to a baseline to catch regressions.

---

### 3.2 Offline Testing

- **Process:** Before deployment, the candidate model is run against the evaluation datasets in an **offline** environment (no production traffic). Metrics are computed: for LLM—e.g. BLEU/ROUGE, coherence score, or task-specific rubric; for extraction—precision, recall, F1, entity-level accuracy; for embedding—retrieval accuracy or downstream task score. Latency and throughput are measured on a representative hardware profile.
- **Gates:** Minimum thresholds (e.g. F1 &gt; 0.9, p95 latency &lt; 5 s) must be met. If the candidate fails, it is not promoted; findings are fed back to training or selection.
- **Reporting:** Evaluation report is stored with the model version (e.g. in Registry metadata or a separate store) and linked from the deployment pipeline.

---

### 3.3 A/B Testing

- **Process:** After offline approval, the new model can be deployed to a **fraction of production traffic** (e.g. 10%) via the Inference Router. Same request is not sent to both models; users are consistently assigned to A or B. Metrics are collected per variant: latency, errors, token usage, and optional user feedback (e.g. thumbs up/down on explanations).
- **Analysis:** After a defined period or sample size, metrics are compared. If the new model is not worse on safety and latency and is better or neutral on quality, it can be promoted to 100%. Otherwise, it is rolled back and the experiment is documented.
- **Optional:** For low-traffic endpoints, A/B may be skipped and promotion done after offline testing only, with close monitoring post-deploy.

---

### 3.4 Human Review

- **Process:** A sample of model outputs (explanations, extractions, insights) is reviewed by humans. Review checks: correctness, clarity, no harmful or off-policy content, and alignment with compliance (e.g. no unauthorised advice). For extraction, review can validate entity correctness against source documents.
- **Volume:** Can be continuous (e.g. 1% of production outputs) or one-off per release. Results are logged (approved / rejected / edit) and used to compute quality metrics and to build future training or guardrail datasets.
- **Escalation:** Systematic issues (e.g. repeated hallucination pattern) trigger a review of prompts, model, or guardrails and may block further rollout or trigger retraining.

---

## 4. Deployment Workflow

### 4.1 Registry → Model Serving

- **Trigger:** Deployment is triggered after a model version is **registered** and **evaluation** has passed. Trigger can be manual (e.g. “deploy v2”) or automated (e.g. pipeline deploys after A/B success).
- **Steps:** (1) Deployment pipeline reads the model version from the Model Registry (artifact path and config). (2) It updates the **Model Serving** configuration (e.g. Kubernetes ConfigMap, or inference server config file) to point to this version. (3) It performs a **rolling update** of inference servers: new replicas load the new version from the Registry, join the pool, and old replicas are drained and removed. (4) Smoke tests call the Inference Router with the new model id and assert on response shape and basic correctness.
- **Inference Router:** Router config is updated if the new version is exposed under a new id or replaces an existing id (e.g. `explain_risk_score` → `llama-3-8b-v2`). No change to AI Gateway or backend contract.

---

### 4.2 Version Promotion

- **Promotion:** A version is “promoted” when it becomes the default for a given capability or endpoint. Promotion is a configuration change: e.g. “production” alias or default model id for `explain_risk_score` now points to `llama-3-8b-v2`. Can be staged: e.g. promote to canary first, then to full production after validation.
- **Metadata:** Registry or config store can record “promoted at” time and environment. This supports audit and rollback (know which version was live when).

---

### 4.3 Rollout Strategy

- **Canary:** New version serves a small percentage of traffic (e.g. 5–10%). Latency and errors are monitored. If metrics are acceptable for a defined period, traffic is gradually increased to 100%.
- **Blue-green:** New version is deployed in parallel; switch traffic in one step (or via weighted routing). Allows fast rollback by switching back.
- **Rolling:** Default in the doc: new replicas with new version are added, old replicas removed gradually. No big-bang cutover; rollback is “roll forward” to the previous version by redeploying that version.

---

### 4.4 Rollback

- **Trigger:** Rollback is triggered when monitoring or alerts indicate a problem (e.g. error rate spike, latency degradation, safety incident). Can be manual or automated (e.g. auto-rollback if p99 latency &gt; 2× baseline for 5 minutes).
- **Mechanism:** Revert the deployment config to the **previous** registered version and run the same deployment pipeline (rolling update). Model Serving loads the previous artifact from the Registry; no need to rebuild. Inference Router is reverted if it was changed. Post-rollback, incidents are analyzed and fixes (data, model, or config) are applied before re-deploying the new version.

---

## 5. Monitoring and Feedback Loops

### 5.1 Model Performance

- **Metrics:** Per model version and endpoint: request count, success/error rate, latency (p50, p95, p99), and token usage (for LLM). Dashboards and alerts track trends and SLO breaches.
- **Feedback:** User feedback (e.g. thumbs up/down, “was this helpful”) is collected where the UI supports it. Feedback is attributed to model id (and optionally request id) and aggregated for quality metrics. Low satisfaction can trigger sampling for human review or retraining.

---

### 5.2 Hallucination and Safety Risks

- **Detection:** (1) **Guardrails:** Output is checked against rules (e.g. no specific investment advice, no personal data in response). Violations are logged and optionally block the response. (2) **Sampling:** A sample of outputs is reviewed by humans or by a second model (e.g. NLI, fact-check) to estimate hallucination or off-policy content. (3) **Consistency:** For deterministic contexts (e.g. same risk score), repeated calls can be checked for consistency.
- **Signals:** Rise in guardrail violations or in “flagged” samples can trigger alert, prompt/model review, and optionally pause of the model or rollback.

---

### 5.3 Latency and Accuracy

- **Latency:** Tracked per endpoint and model (see Model Serving observability). Sustained high latency can trigger scaling or model swap (e.g. smaller/quantized model). Latency SLOs are part of the deployment gates where applicable.
- **Accuracy:** For extraction, accuracy can be monitored via human review samples or by comparing to a trusted source (e.g. known test documents). For LLM explanations, accuracy is harder to automate; human review and user feedback are the main signals. Drop in accuracy (e.g. extraction F1 on sampled data) can trigger retraining or re-evaluation.

---

### 5.4 How Monitoring Triggers Retraining

- **Scheduled:** Retraining is scheduled (e.g. quarterly) for models that benefit from fresh data (e.g. extraction with new document types, tabular ML with new features).
- **Event-driven:** (1) **Quality drop:** Sustained drop in user feedback or in human-review pass rate triggers a retraining or prompt-update pipeline. (2) **Drift:** Change in input distribution (e.g. new document layouts, new product set) triggers re-evaluation and, if needed, retraining or fine-tuning. (3) **Incident:** A safety or correctness incident may trigger immediate rollback and a retraining cycle with additional data or guardrails.
- **Feedback loop:** Production data (with consent and anonymization) and human corrections can be fed back into dataset creation for the next training run. Versioning of training data and model ensures reproducibility.

---

## 6. Governance and Safety

### 6.1 Prompt Template Control

- **Ownership:** Prompt templates (system prompt, few-shot examples, output format instructions) are **versioned and controlled**. They live in a repo or config store (not ad hoc in code). Changes go through review (e.g. PR) and are logged.
- **Testing:** Template changes are tested against evaluation datasets and, where possible, A/B tested. A bad template can cause quality or safety issues even if the model is unchanged; so template version is part of the deployment or config release.
- **Separation:** Prompts are maintained by the AI services (Orchestrator, Document Intelligence, etc.) or by a dedicated prompt service; Model Serving only receives the final prompt. This keeps model and prompt lifecycle decoupled but both under governance.

---

### 6.2 Output Validation

- **Schema:** For structured outputs (e.g. extraction JSON), responses are validated against a schema (required fields, types, ranges). Invalid outputs are logged and not returned to the user; optionally retried or replaced with a safe fallback.
- **Content:** For free-text (explanations, insights), validation can include: max length, blocklist (forbidden phrases), and optional PII detection. Failing content is not returned; incident is logged.
- **Place:** Validation runs in the AI service or in the Gateway before returning to the backend. Model Serving can also perform basic schema checks if it returns structured completion.

---

### 6.3 Guardrails

- **Pre-generation:** Input (user context, prompt) can be checked for policy violations (e.g. prompt injection, off-scope questions). Requests that fail are rejected or redirected.
- **Post-generation:** Output is checked for: no unauthorised financial advice, no hallucinated numbers (e.g. risk score in explanation must match context), no harmful or off-brand content. Violations result in blocking or replacing the response and logging.
- **Implementation:** Guardrails can be rule-based (regex, keyword, allowed ranges) or model-based (e.g. classifier or NLI). They are versioned and tested like prompts. Metrics on guardrail triggers are monitored to detect abuse or model drift.

---

### 6.4 Audit Logging

- **What is logged:** For each request (or sampled): request id, model id and version, endpoint, timestamp, and optionally prompt/response hashes or redacted snippets. For deployments: who promoted which version, when, and from which pipeline. For evaluation: dataset version, metrics, and approver. For incidents: rollback events, guardrail triggers, and human review outcomes.
- **Retention and access:** Logs are retained per compliance and operational policy. Access is restricted; logs are used for debugging, audit, and improving models. PII and full prompts/responses are minimised or redacted in logs.
- **Integration:** Logging integrates with the platform’s existing audit and observability (e.g. central logging, SIEM). Model lifecycle events (train, evaluate, deploy, rollback) are part of the same audit trail.

---

## Summary

| Stage | Purpose | Output |
|-------|---------|--------|
| **Model Selection** | Choose base/variant for each capability | Model id, base ref, intended use |
| **Training / Fine-Tuning** | Produce or adapt model artifacts | Weights, config; training report |
| **Evaluation** | Validate before production | Eval report; go/no-go |
| **Model Registration** | Store approved artifacts and metadata | Registered version in Registry |
| **Deployment** | Run model in Model Serving | Live version; rollout and smoke tests |
| **Monitoring** | Track performance, safety, quality | Metrics, alerts, feedback data |
| **Retraining** | Update model with new data or fixes | Re-entry to training → evaluation → deploy |

Training uses versioned datasets and runs in a dedicated environment; artifacts are stored in the Model Registry after evaluation. Deployment moves versions from Registry to Model Serving with rollout and rollback. Monitoring drives retraining and rollback. Governance covers prompt control, output validation, guardrails, and audit logging.

---

*This document defines the AI model lifecycle only. No implementation files are modified.*
