# AI Trigger Event Model and Trigger Engine

**Purpose:** Define the event-driven automation layer used by the AI Trigger Engine. Events follow the platform schema in `PLATFORM_AI_DATA_SCHEMAS.md` (TriggerEvent). This document specifies event types, Trigger Engine behavior, example workflows, and scheduled triggers.

**Scope:** Event-driven AI automation only. No changes to existing platform code; documentation definition only.

---

## 1. Trigger Event Model

The AI system uses the **TriggerEvent** schema defined in `PLATFORM_AI_DATA_SCHEMAS.md`. Every event consumed by the Trigger Engine conforms to this structure.

### 1.1 Schema (Reference)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `eventType` | string | Yes | Canonical event name (e.g. `RiskScoreComputed`, `DocumentUploaded`). |
| `entityType` | string | Yes | Primary entity category: `user`, `portfolio`, `document`, `recommendation`, `nav`. |
| `entityId` | string | Yes | Id of the primary entity (userId, portfolioId, documentId, recommendationId, etc.). |
| `timestamp` | string (ISO 8601) | Yes | Event occurrence time. |
| `payload` | object | Yes | Event-specific data; structure depends on `eventType`. |
| `correlationId` | string \| null | No | Optional id for distributed tracing and request correlation. |

### 1.2 Transport and Format

- **Format:** JSON. Same shape whether events are published to a message queue (e.g. RabbitMQ, Kafka, SQS), event bus (e.g. SmallRye Reactive Messaging), or HTTP webhook.
- **Producer:** Quarkus backend (or platform services) publishes events after state changes. Events are serialized as JSON and sent to the configured destination (topic, queue, or endpoint).
- **Consumer:** The Trigger Engine subscribes to the same destination, deserializes JSON into TriggerEvent, and processes each event according to the rules defined below.

### 1.3 Idempotency and Deduplication

- Events may be delivered more than once (at-least-once). The Trigger Engine should use a **deduplication key** (e.g. `eventType` + `entityType` + `entityId` + optional `timestamp` window) to avoid running the same AI workflow twice for the same logical occurrence.
- Optional: include a unique `eventId` in the payload or as a top-level field for idempotent processing and audit.

---

## 2. Core Trigger Event Types

### 2.1 RiskScoreComputed

**Description:** Emitted when a user’s risk score has been (re)computed and persisted. Used to pre-generate risk explanations so that when the user requests “Explain my risk,” the backend can return a cached explanation without calling the AI Gateway synchronously.

**Entity type:** `user`

**Typical payload fields:**

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | User whose score was computed. |
| `riskScore` | number | Final score (e.g. 1–1000). |
| `riskBand` | string | Risk bucket (Secure, Conservative, Moderate, Growth, Aggressive). |
| `components` | object \| null | Optional component breakdown (credit, income, DTI, etc.). |
| `source` | string \| null | Optional: `credit`, `questionnaire`, `hybrid`. |

**Emitted by:** Backend domain logic after **UserRiskOrchestrationService** (or equivalent) persists a new **UserRiskScore** (e.g. after Kyckart + derive + compute, or after questionnaire submission). Fired after transaction commit or via a transactional event publisher.

**AI workflow triggered:** **Generate risk explanation** → call AI Gateway `POST /ai/explain-risk-score` with context built from payload → store result in explanation cache (e.g. keyed by `userId` and optionally `riskScore` or version).

---

### 2.2 AllocationGenerated

**Description:** Emitted when a recommendation (allocation + matching funds) has been generated for a user. Used to pre-generate allocation explanation and/or recommendation reasoning so that the user sees instant explanation when viewing the recommendation.

**Entity type:** `recommendation`

**Typical payload fields:**

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | User for whom allocation was generated. |
| `recommendationId` | string | Platform recommendation id. |
| `allocation` | object | Target allocation by asset class. |
| `recommendedFunds` | array | List of recommended schemes (id, name, category, allocation %, fundRiskScore). |
| `riskBand` | string | User risk band used for allocation. |

**Emitted by:** Backend after **AssetAllocationService** (or future recommendation service) produces and persists a new recommendation (e.g. when user requests allocation or when a scheduled job generates recommendations).

**AI workflow triggered:** **Generate allocation explanation** and/or **recommendation reasoning** → call AI Gateway `POST /ai/explain-allocation` and/or `POST /ai/recommendation-reasoning` with FinancialProfile + Recommendation built from payload (and any data the Trigger Engine can read) → store result in cache keyed by `recommendationId` or `userId` + recommendation version.

---

### 2.3 PortfolioCreated

**Description:** Emitted when a new portfolio is created for a user (e.g. first investment or first linked account). Used to generate an initial portfolio insight or onboarding message.

**Entity type:** `portfolio`

**Typical payload fields:**

| Field | Type | Description |
|-------|------|-------------|
| `portfolioId` | string | New portfolio id. |
| `userId` | string | Owner. |
| `holdings` | array \| null | Initial holdings if any; may be empty. |
| `currentValue` | number | Initial value (may be 0). |

**Emitted by:** Backend **PortfolioController** or portfolio service when a new portfolio record is created (e.g. first “create portfolio” or “link account” flow).

**AI workflow triggered:** **Generate portfolio insight** → call AI Gateway `POST /ai/generate-insight` with FinancialProfile + Portfolio (from payload or fetched via backend read API) → attach insight to portfolio record (e.g. store in DB or cache keyed by `portfolioId`) or send via notification.

---

### 2.4 PortfolioRebalanced

**Description:** Emitted when a portfolio’s allocation has changed significantly (e.g. after rebalancing or after substantial inflows/outflows). Used to generate an insight about the new allocation or a rebalancing summary.

**Entity type:** `portfolio`

**Typical payload fields:**

| Field | Type | Description |
|-------|------|-------------|
| `portfolioId` | string | Portfolio that was rebalanced. |
| `userId` | string | Owner. |
| `allocation` | object | New allocation by asset class. |
| `previousAllocation` | object | Allocation before rebalance. |
| `currentValue` | number | Portfolio value after rebalance. |

**Emitted by:** Backend portfolio or rebalancing service when rebalance is applied and persisted.

**AI workflow triggered:** **Generate portfolio / rebalance insight** → call AI Gateway `POST /ai/generate-insight` with context including old vs new allocation → store or send insight (e.g. attach to portfolio, push notification).

---

### 2.5 DocumentUploaded

**Description:** Emitted when a user has uploaded a financial document (CAS, bank statement, insurance, tax document) and it is stored and ready for processing. Used to run document extraction asynchronously so that structured data is available without the user waiting.

**Entity type:** `document`

**Typical payload fields:**

| Field | Type | Description |
|-------|------|-------------|
| `documentId` | string | Platform document id. |
| `userId` | string | Uploader. |
| `documentType` | string | e.g. `CAS`, `BANK_STATEMENT`, `INSURANCE`, `TAX`. |
| `storageKey` | string | Reference for gateway to fetch document (e.g. S3 key, URL). |
| `mimeType` | string \| null | Optional (e.g. application/pdf). |

**Emitted by:** Backend **DocumentUploadService** (or controller) after the file is successfully stored (e.g. S3 or local) and the document record (e.g. CustomerDocument) is persisted. Emit only for document types that support AI extraction.

**AI workflow triggered:** **Run document extraction** → call AI Gateway `POST /ai/extract-document` with `documentId`, `documentType`, `storageKey` → on success, store extracted entities in platform storage (e.g. MongoDB collection or MySQL table) or call backend “ingest extraction result” API; optionally trigger downstream workflows (e.g. update profile, portfolio).

---

### 2.6 NAVUpdated

**Description:** Emitted when NAV or fund metrics have been updated (e.g. after daily NAV ingestion and metrics run). Used for batch or downstream workflows that depend on fresh NAV (e.g. portfolio valuation refresh, performance insight). Less commonly used for direct AI calls; more for “data ready” signaling.

**Entity type:** `nav` (or `fund`)

**Typical payload fields:**

| Field | Type | Description |
|-------|------|-------------|
| `runId` | string | Ingestion or metrics run identifier. |
| `asOfDate` | string (date) | NAV date. |
| `fundsUpdated` | number \| null | Count of funds updated (optional). |
| `metricsCompleted` | boolean | Whether fund risk scores / metrics were recomputed. |

**Emitted by:** Backend after **NavDailyRunScheduler** (or equivalent) completes the NAV pipeline: ingestion → migration → metrics → normalization. May be emitted once per run rather than per fund.

**AI workflow triggered:** Optional **batch portfolio insight** or **performance insight** for active users whose portfolio uses updated funds; or no direct AI call—event can be used to trigger “portfolio valuation refreshed” notifications with optional AI-generated summary. Alternatively, Trigger Engine may run a scheduled job that uses “NAV updated” as a precondition (e.g. “after NAV run, run DailyPortfolioInsightJob”).

---

## 3. Trigger Engine Behavior

### 3.1 Consuming Events

- **Subscription:** The Trigger Engine subscribes to the same destination as the backend publisher (queue, topic, or webhook). It runs as a separate process or container; it is not part of the Quarkus JVM.
- **Receive:** For each message, the engine deserializes the body to a **TriggerEvent** (JSON). It validates required fields (`eventType`, `entityType`, `entityId`, `timestamp`, `payload`). Invalid events are logged and acknowledged (or dead-lettered) to avoid blocking the queue.
- **Deduplication:** Before processing, the engine checks a deduplication store (e.g. cache or DB) with key `eventType:entityType:entityId` (and optionally a time window, e.g. 5 minutes). If the event was already processed, the message is acknowledged and skipped.
- **Routing:** The engine uses `eventType` (and optionally `entityType`) to select the **workflow** to run (see section 4). Configuration (e.g. map of `eventType` → workflow id) can be file-based or from a config service.

### 3.2 Deciding Which AI Workflow to Run

- **Mapping table:** The Trigger Engine maintains a mapping from `eventType` (and optionally payload conditions) to one or more **workflow steps**. Example:

  | eventType | Workflow | AI Gateway endpoint | Post-step |
  |-----------|----------|---------------------|-----------|
  | RiskScoreComputed | generate_risk_explanation | POST /ai/explain-risk-score | store_explanation_cache |
  | AllocationGenerated | generate_allocation_explanation | POST /ai/explain-allocation | store_explanation_cache |
  | DocumentUploaded | extract_document | POST /ai/extract-document | store_extraction_result |
  | PortfolioCreated | generate_portfolio_insight | POST /ai/generate-insight | attach_insight_to_portfolio |
  | PortfolioRebalanced | generate_rebalance_insight | POST /ai/generate-insight | attach_insight / notify |
  | NAVUpdated | (optional) batch_insight_or_no_op | — | — |

- **Context building:** For each workflow step, the engine builds an **AIRequest**:
  - **contextObject** is built from the event `payload` and, when needed, from additional data (e.g. backend read API or shared DB) to form FinancialProfile, Portfolio, or Recommendation.
  - **requestId** is generated (e.g. UUID) and optionally tied to `correlationId`.
  - **userId** comes from payload when present.
  - **timeout** is set per workflow (e.g. 15s for explanation, 60s for extraction).

- **Conditional execution:** Optional feature flags or payload conditions (e.g. only run extraction for `documentType` in `["CAS","BANK_STATEMENT"]`) can skip workflows without failing the event.

### 3.3 Calling the AI Gateway

- **HTTP client:** The Trigger Engine calls the AI Gateway over HTTP (e.g. POST to the appropriate path). It uses the same **AIRequest** / **AIResponse** contract as the backend (see `AI_GATEWAY_API_CONTRACT.md`).
- **Authentication:** Service-to-service auth (API key, JWT, or mTLS) as configured for the gateway.
- **Timeout:** Each request sends a `timeout` in the body (or relies on gateway default). The HTTP client should enforce a slightly higher timeout (e.g. request timeout + 5s) to avoid hanging.
- **Response handling:** On `status: "success"`, the engine proceeds to the **post-step** (e.g. store cache, persist extraction). On `status: "error"` or `"timeout"`, the engine applies failure handling (retry or dead-letter).

### 3.4 Failures and Retries

- **Retry policy:** Transient failures (network error, gateway 5xx, timeout) can be retried with exponential backoff (e.g. 3 retries: 1s, 2s, 4s). The event message is not acknowledged until the workflow completes or max retries are exceeded.
- **Dead-letter:** After max retries, the event is moved to a dead-letter queue (DLQ) or marked as failed in a store. A separate process or alert can inspect DLQ for manual replay or investigation.
- **Partial success:** If the AI call succeeds but the post-step (e.g. writing to cache or backend) fails, the engine may retry the post-step only (with the same AI result) or treat as failure and retry the whole workflow. Recommendation: retry post-step with idempotent writes.
- **Idempotency:** Post-steps (e.g. “store explanation for userId”) should be idempotent so that duplicate events or retries do not corrupt data.

---

## 4. Example Trigger Workflows

### 4.1 RiskScoreComputed → Generate Risk Explanation → Store Explanation Cache

1. **Event received:** `eventType: RiskScoreComputed`, `entityType: user`, `entityId: usr_abc123`, `payload: { userId, riskScore, riskBand, components }`.
2. **Deduplication:** Key `RiskScoreComputed:user:usr_abc123` (within last 5 min). If seen, ack and skip.
3. **Build AIRequest:** `requestType: explain_risk_score`, `contextObject`: payload (riskScore, riskBand, components), `userId: usr_abc123`, `requestId: <uuid>`.
4. **Call:** `POST /ai/explain-risk-score` with body = AIRequest.
5. **On success:** Read `result.explanation` from AIResponse; store in explanation cache (e.g. Redis or DB) with key `risk_explanation:usr_abc123` and optional TTL. Optionally store `reasoningStructure` if present.
6. **On failure:** Retry up to 3 times; then DLQ.
7. **Ack message** after step 5 or after final failure.

**Result:** When the user later requests “Explain my risk,” the backend can read from cache and return immediately without calling the AI Gateway.

---

### 4.2 DocumentUploaded → Run Extract Document → Store Structured Data

1. **Event received:** `eventType: DocumentUploaded`, `entityType: document`, `entityId: doc_upload_456`, `payload: { documentId, userId, documentType, storageKey }`.
2. **Deduplication:** Key `DocumentUploaded:document:doc_upload_456`. If seen, ack and skip.
3. **Build AIRequest:** `requestType: extract_document`, `contextObject: { documentId, documentType, storageKey }`, `userId` from payload, `requestId: <uuid>`, `timeout: 60000`.
4. **Call:** `POST /ai/extract-document` with body = AIRequest.
5. **On success:** Read `result.entities` and `result.confidence` from AIResponse. Persist to platform storage:
   - Option A: Trigger Engine writes to a dedicated MongoDB collection or MySQL table (e.g. `document_extractions`) with `documentId`, `userId`, `entities`, `confidence`, `timestamp`.
   - Option B: Trigger Engine calls a backend API (e.g. `PUT /api/v1/documents/{documentId}/extraction`) with the result; backend persists.
6. **On failure:** Retry up to 3 times (extraction can be slow); then DLQ. Optionally mark document as `extraction_failed` in platform.
7. **Ack message** after step 5 or after final failure.

**Result:** Structured data is available for profile enrichment, portfolio sync, or display without the user waiting on the upload screen.

---

### 4.3 PortfolioCreated → Generate Portfolio Insight → Attach Insight to Portfolio Record

1. **Event received:** `eventType: PortfolioCreated`, `entityType: portfolio`, `entityId: port_xyz789`, `payload: { portfolioId, userId, holdings, currentValue }`.
2. **Deduplication:** Key `PortfolioCreated:portfolio:port_xyz789`. If seen, ack and skip.
3. **Context:** If payload is insufficient for a rich insight, Trigger Engine may call a backend read API to get FinancialProfile and full Portfolio (or use payload only).
4. **Build AIRequest:** `requestType: generate_financial_insight`, `contextObject: { financialProfile, portfolio }`, `userId` from payload, `requestId: <uuid>`.
5. **Call:** `POST /ai/generate-insight` with body = AIRequest.
6. **On success:** Read `result.insight` (and optional `result.sections`). Attach to portfolio:
   - Option A: Trigger Engine writes to DB (e.g. `portfolio_insights` table with `portfolioId`, `insight`, `generatedAt`).
   - Option B: Trigger Engine calls backend `PUT /api/v1/portfolio/{portfolioId}/insight` with the text; backend persists.
   - Optionally: send a one-time notification (e.g. “Your portfolio is set up; here’s a quick insight”) via backend notification API with the same text.
7. **On failure:** Retry up to 3 times; then DLQ.
8. **Ack message** after step 6 or after final failure.

**Result:** New portfolio gets an initial narrative insight stored and optionally pushed to the user.

---

### 4.4 AllocationGenerated → Generate Allocation Explanation → Store Explanation Cache

1. **Event received:** `eventType: AllocationGenerated`, `entityType: recommendation`, `entityId: rec_001`, `payload: { userId, recommendationId, allocation, recommendedFunds, riskBand }`.
2. **Deduplication:** Key `AllocationGenerated:recommendation:rec_001`. If seen, ack and skip.
3. **Build AIRequest:** `requestType: explain_allocation`, `contextObject: { financialProfile: { userId, riskScore, riskBand } (from payload or fetch), recommendation: payload }`, `userId`, `requestId: <uuid>`.
4. **Call:** `POST /ai/explain-allocation` with body = AIRequest.
5. **On success:** Read `result.explanation`; store in cache with key `allocation_explanation:rec_001` or `allocation_explanation:userId:recommendationId`.
6. **Optional second call:** Same event can trigger `POST /ai/recommendation-reasoning` and cache `result.reasoning` under `recommendation_reasoning:rec_001`.
7. **On failure:** Retry; then DLQ. Ack after success or final failure.

**Result:** When the user opens the recommendation screen, the backend can return pre-generated explanation and reasoning from cache.

---

## 5. Scheduling Triggers

The Trigger Engine can run **scheduled jobs** that are not driven by a single event but by a cron or fixed interval. These jobs typically iterate over a set of entities (users, portfolios) and call the AI Gateway for each, then store or send results.

### 5.1 DailyPortfolioInsightJob

**Description:** Runs once per day (e.g. after NAV and metrics are updated). For each active user with a portfolio, generates a short narrative insight (e.g. diversification, performance, or risk) and stores it or sends it via notification.

**Schedule:** Cron, e.g. `0 8 * * *` (08:00 daily) or after NAV run (e.g. 23:30).

**Behavior:**

1. **Input:** Trigger Engine queries or calls backend for “users with portfolio updated in last 24h” or “active users with non-empty portfolio.” Alternatively, Trigger Engine reads from a shared DB view or API (e.g. `GET /api/v1/internal/users-with-portfolio`).
2. **For each user (with rate limiting):**
   - Build FinancialProfile + Portfolio (from backend API or from event/store).
   - Build AIRequest: `requestType: generate_financial_insight`, `contextObject: { financialProfile, portfolio }`, `userId`.
   - Call `POST /ai/generate-insight`.
   - On success: store insight (e.g. `daily_insight:userId:date`) or call backend to enqueue notification (e.g. “Daily portfolio insight” with the text). Backend uses existing **UserNotificationService** / SmsService / Mailer / WhatsApp to send.
3. **Failures:** Log per-user failures; do not block the rest. Optionally push failed user ids to a retry list for next run or DLQ.

**Result:** Users receive a daily digest or in-app insight without requesting it.

---

### 5.2 WeeklyRiskMonitoringJob

**Description:** Runs once per week. For users whose risk score or questionnaire is older than a threshold, or who have not been contacted recently, generates a short risk insight or reminder (e.g. “Your risk profile supports a balanced allocation; consider reviewing your portfolio”).

**Schedule:** Cron, e.g. `0 9 * * 1` (Monday 09:00).

**Behavior:**

1. **Input:** Trigger Engine calls backend API (e.g. `GET /api/v1/internal/users-risk-review-due`) that returns users with: risk score older than 6 months, or questionnaire not updated in 12 months, or similar criteria.
2. **For each user:**
   - Build FinancialProfile (from backend or payload).
   - Build AIRequest: `requestType: generate_financial_insight`, `contextObject: { financialProfile }`, optional `insightType: "risk"`.
   - Call `POST /ai/generate-insight`.
   - On success: store or send via backend notification (“Time to review your risk profile?” with the insight text).
3. **Failures:** Log and continue; optional retry list.

**Result:** Proactive risk-review prompts with AI-generated, personalized copy.

---

### 5.3 How the Trigger Engine Executes Scheduled Workflows

- **Scheduler:** The Trigger Engine process includes a scheduler (e.g. cron, Quartz, or cloud-native scheduler like AWS EventBridge + Lambda, or K8s CronJob) that triggers jobs at defined times.
- **Job entrypoint:** Each job is a named routine (e.g. `DailyPortfolioInsightJob`, `WeeklyRiskMonitoringJob`) that:
  1. Fetches the list of entities to process (users, portfolios) from backend API or shared DB.
  2. Optionally checks feature flags or config (e.g. “insight job enabled”) and exits if disabled.
  3. Iterates over the list; for each entity, builds AIRequest, calls AI Gateway, and performs the post-step (store, notify). Applies rate limiting and optional concurrency limits to avoid overloading the gateway.
  4. Logs summary (success count, failure count, duration).
- **No event required:** Scheduled jobs do not consume TriggerEvents; they are time-based. They may, however, use the same AI Gateway and same storage/notification patterns as event-driven workflows.
- **Idempotency:** For “daily insight” and “weekly risk,” storing by `userId` + date or `userId` + week ensures one insight per user per period; re-runs do not duplicate user-facing content if the store is keyed correctly.

---

## Summary

| Event Type | Entity | Emitter | AI Workflow | Post-step |
|------------|--------|---------|-------------|-----------|
| RiskScoreComputed | user | UserRiskOrchestrationService (backend) | explain-risk-score | store explanation cache |
| AllocationGenerated | recommendation | AssetAllocationService / recommendation service | explain-allocation, recommendation-reasoning | store explanation cache |
| PortfolioCreated | portfolio | Portfolio service | generate-insight | attach insight to portfolio / notify |
| PortfolioRebalanced | portfolio | Portfolio / rebalance service | generate-insight | attach insight / notify |
| DocumentUploaded | document | DocumentUploadService | extract-document | store extraction result |
| NAVUpdated | nav | Nav pipeline / scheduler | optional batch insight or no-op | — |

| Scheduled Job | Schedule | Purpose |
|----------------|----------|---------|
| DailyPortfolioInsightJob | Daily (e.g. 08:00) | Generate and store/send portfolio insight for active users. |
| WeeklyRiskMonitoringJob | Weekly (e.g. Monday 09:00) | Generate and send risk-review insight for users due for review. |

The Trigger Engine consumes events from the platform, deduplicates, maps event type to workflow, calls the AI Gateway with an AIRequest, and performs post-steps (cache, persist, notify). Failures are retried with backoff; after max retries, events are dead-lettered. Scheduled jobs run independently and use the same gateway and storage patterns.

---

*This document defines the event-driven AI automation layer only. No implementation files are modified.*
