# Multiplus Platform — Technical Architecture Intelligence

This document describes the **current implementation** of the Multiplus financial platform. It is intended to align future AI platform architecture documentation with the real system and to support smooth integration of AI capabilities.

**Generated:** Architecture extraction from the multiplus codebase.  
**Scope:** Repository structure, core services, data models, business logic, data infrastructure, external integrations, document processing, and existing analytics/AI logic.

---

## 1. Repository Architecture

### 1.1 Top-Level Structure

| Path | Description |
|------|-------------|
| **backend/** | Quarkus Java backend (single Maven module). Main application server, APIs, and business logic. |
| **frontend/** | React SPA — dashboard, CRM, invoice, forms, authentication. |
| **webapp/** | Second React app — landing, public-facing flows. |
| **database/** | Schema and migrations for MySQL. Flyway-style migrations plus full schema scripts. |
| **deployment/** | Deployment documentation and scripts (e.g. EC2, deploy-admin). |
| **ci-cd/** | CI/CD setup and documentation. |
| **scripts/** | Utility scripts (e.g. setup-remote-database). |
| **docs/** | Project-level documentation (e.g. ARCHITECTURE_ANALYSIS.md, AI_INFRASTRUCTURE_REQUIREMENTS_ANALYSIS.md, diagrams). |

### 1.2 Backend Stack

- **Runtime:** Quarkus 3.6, Java 17  
- **Build:** Maven; single module, no submodules  
- **HTTP:** REST with JAX-RS (Resteasy Reactive), JSON (Jackson)  
- **Database:** MySQL (Hibernate ORM + Panache), MongoDB (MongoClient)  
- **Migrations:** Flyway **disabled** — migrations in `database/migrations/` are run manually (e.g. `run-all-migrations.ps1`)  
- **Security:** SmallRye JWT (issuer from `RBAC_JWT_ISSUER`), RBAC (roles, permissions, resource/action types)  
- **Scheduler:** Quarkus Scheduler (e.g. NAV daily run at 22:00)  
- **Config:** YAML (`application.yml`), SmallRye ConfigMapping (`ApplicationConfig`), secrets from environment (`.env`)

Key backend dependencies (from `backend/pom.xml`):  
`quarkus-hibernate-orm-panache`, `quarkus-jdbc-mysql`, `quarkus-mongodb-client`, `quarkus-smallrye-jwt`, `quarkus-scheduler`, `quarkus-mailer`, `quarkus-cache`, Apache PDFBox, docx4j (DOCX→PDF), AWS S3/SNS, Twilio (SMS), BouncyCastle (key parsing).

### 1.3 Backend Package Structure

All Java sources live under `backend/src/main/java/com/multiplus/`:

| Package / Area | Purpose |
|----------------|---------|
| **controller/** | JAX-RS REST controllers; subpackages: account, admin, billing, config, consent, customer, family, master, mf, mitra, notification, payment, portfolio, rbac, report |
| **service/** | Business logic; subpackages: consent, document, master, mf, rbac, sms, storage |
| **model/entity/** | JPA/Panache entities (MySQL) — RBAC, sign-in, KYC, consent, notifications, family, mitra, user risk, config |
| **model/dto/** | Request/response DTOs by domain (rbac, kyc, consent, master, etc.) |
| **model/mf/** | NAV/ingestion models (e.g. IngestionState, NavData) |
| **riskprofile/** | Risk questionnaire and AI risk: entity, repository, service, web (REST), dto, util |
| **nav/** | NAV pipeline: migration (Mongo→MySQL), metrics (calculation, normalization, fund risk score) |
| **repository/** | MongoDB repositories (credit reports, Kyckart raw) |
| **config/** | ApplicationConfig (SmallRye ConfigMapping, prefix `multiplus`) and nested config interfaces |
| **event/** | Domain events (e.g. RiskScoreComputedEvent) |
| **security/** | CORS, permission checks (`@RequiresPermission`) |
| **util/** | JwtUserResolver, SecurityContextUtil, ValidationUtil, CryptoUtil, JwtTokenUtil |
| **common/** | AmcWhitelist, FundHouseAndCategoryMapping, FundsSchemaAssumption |
| **exception/** | ErrorResponse, exception mappers (e.g. OptimisticLockExceptionMapper) |

Data access is a mix of **Panache entities** (static finders), **dedicated repositories** (riskprofile, nav, MongoDB), and **direct JDBC** (AgroalDataSource) for NAV/metrics and allocation queries.

---

## 2. Core Services

### 2.1 REST API Overview

APIs are versioned under `/api/v1/` (and some under `/api/`). Authentication is JWT-based; many endpoints require RBAC permissions.

| Domain | Base Path | Main Resource(s) |
|--------|-----------|-------------------|
| **RBAC / Auth** | `/api/v1/rbac/auth` | AuthController |
| | `/api/v1/rbac/users`, `/roles`, `/permissions`, `/resource-types`, `/action-types` | UserController, RoleController, PermissionController, ResourceTypeController, ActionTypeController |
| **Account** | `/api/v1/account` | AccountController |
| **Customer** | `/api/v1/customer`, `/api/v1/customer/leads` | CustomerController, CustomerLeadController |
| **Onboarding / Sign-up** | `/api/v1/onboarding`, `/api/v1/signup` | OnboardingController, SignupController |
| **Sign-in** | `/api/v1/signin` | SignInController |
| **KYC** | `/api/v1/kyc` | KycController |
| **Product** | `/api/v1/products` | ProductController |
| **Portfolio** | `/api/v1/portfolio` | PortfolioController |
| **User risk (credit)** | `/api/v1/user-risk` | UserRiskController |
| **Risk profile (questionnaire)** | `/api/v1/riskprofile`, `/api/v1/riskprofile/ai`, `/api/v1/riskprofile/admin` | ManualAssessmentResource, AiRiskAnalysisResource, AdminResource, AdminQuestionResource |
| **MF / NAV** | `/api/v1/mf/nav` | NavIngestionController |
| **Documents** | `/api/v1/documents` | DocumentUploadController |
| **Billing / Payment** | `/api/v1/billing`, `/api/v1/payment` | BillingController, PaymentController |
| **Report** | `/api/v1/report` | ReportController |
| **Consent** | `/api/v1/consent/clauses`, `/purposes`, `/user-consents` | ConsentManagementController, ConsentPurposeController, UserConsentController |
| **Config** | `/api/v1/config` | ConfigurationController |
| **Master data** | `/api/v1/master/countries`, `/languages`, `/content`, `/content/translations`, `/products` | MasterCountryController, MasterLanguageController, MasterContentController, MasterContentTranslationController, MasterProductController |
| **Notifications** | `/api/notifications`, `/api/v1/notification-preferences`, `/api/v1/notification-types` | UserNotificationController, NotificationPreferenceController, NotificationTypeController |
| **CRM** | `/api/v1/crm` | CrmController |
| **Localization** | `/api/v1/localization` | LocalizationController |
| **Public** | `/api/public/terms`, `/api/public/consent`, `/api/public/feedback` | PublicTermsController, PublicConsentController, FeedbackController |
| **Mitra** | `/api/mitra`, `/api/admin/mitra` | MitraController, AdminMitraController |
| **Health / Test** | `/api/health`, `/api/v1/test/sms` | HealthController, SmsTestController |
| **Webhook** | `/webhook` | WhatsAppWebhookController |

OpenAPI: `/openapi`; Swagger UI: `/swagger-ui`.

### 2.2 Service Layer (Key Classes by Domain)

| Domain | Services / Beans |
|--------|------------------|
| **User / RBAC** | RbacService, AuthService, UserService, RoleService, PermissionService, ActionTypeService, ResourceTypeService, RbacAuditService |
| **Onboarding / Sign-in** | SignupService, SignInService, SignInSecurityService, JourneyService, OtpIpThrottleService |
| **KYC** | KycService, KycValidationService, PanVerificationService, BankVerificationService, MobileVerificationService |
| **Customer / CRM** | CrmService, ERPNextIntegrationService |
| **User risk / Credit** | CreditReportService, CreditReportProcessingService, UserRiskCalculatorService, UserRiskOrchestrationService, RiskVariableDerivationService, RiskScoringConfigService |
| **Asset allocation / Product** | AssetAllocationService, ProductService |
| **Risk profile (questionnaire)** | ManualAssessmentService, RiskAnalysisEngineService, AuditService, PdfReportService |
| **Documents** | DocumentUploadService, AwsS3Service (storage) |
| **NAV / MF** | NavIngestionService, MfApiClient, FundSyncService, NavMongoToMysqlMigrationService, MongoNavReaderService, NavMysqlWriterService, NavDailyRunService, NavDailyRunScheduler, NavPipelineProgressService, IngestionStateService, FundIdResolverService, NavMetricsCalculationService, NavMetricsWriterService, FundMetricsNormalizationService, FundMetricsNormalizedWriterService, FundProcessorService, NavMigrationRunner |
| **Master** | MasterCountryService, MasterProductService, MasterLanguageService, MasterContentTranslationService |
| **Consent** | TcClauseService, ConsentPurposeService, UserConsentService |
| **Config** | ConfigurationService, FeatureFlagService |
| **Notifications** | UserNotificationService, NotificationTypeAdminService |
| **Other** | LocalizationService, TermsService, SmsService, EmailValidationService, AccountNumberService, MitraService, MitraWithdrawalService, WhatsAppService, WhatsAppOnboardingPersistenceService, ConversationService, WebhookMessageProcessor |

### 2.3 Notable API Behaviors

- **User risk:**  
  - **POST /api/v1/user-risk/generate** — Body: `multiplus_account_no` (required); optional `force_regenerate`, `admin_force_regenerate_override`. Reuses recent credit report when fresh; otherwise Kyckart call, parse, derive variables, compute score, persist.  
  - **GET /api/v1/user-risk/allocation?multiplus_account_no=...** — Returns allocation bands and matching funds by risk score (Strong/Acceptable gap).
- **Portfolio:** GET `/api/v1/portfolio/me` and `/me/list` — Permission-gated; actual portfolio retrieval is marked TODO/pending.
- **Risk profile AI:** `/api/v1/riskprofile/ai` run/initiate is deprecated (410); only fetch of existing report is supported; no active AI model pipeline.

---

## 3. Data Models

### 3.1 Relational (MySQL / Hibernate Panache)

Entities live under `model/entity/` and `riskprofile/entity/`. Schema is managed via `database/schema/` and `database/migrations/` (no Hibernate DDL).

**Sign-in / onboarding:** SigninAttempt, OtpRequest, OtpIpThrottle, EmailVerificationToken, SigninMagicLink, SigninAuditTrail.

**Customer / KYC:** PersonalDetails, ContactDetails, FinanceDetails, BankDetails; CustomerLead, CustomerKycDetails, CustomerDocument.

**Config / audit:** ApplicationConfig, ApplicationAuditLog.

**Master:** MasterCountry, MasterLanguage, MasterContent, MasterContentTranslation, MasterProduct, MasterDisposableEmailDomain.

**Consent:** ConsentPurpose, TcClause, ConsentClauseMapping, UserConsent, UserConsentClause.

**Notifications:** Notification, NotificationType, NotificationTypeDefault, NotificationChannel, UserNotification, UserNotificationPreference.

**Family:** GroupInvitation, GroupMember, FamilyGroup, FamilyGroupMemberHistory.

**Mitra:** MitraProfile, MitraWithdrawalRequest.

**User risk:** UserRiskScore, UserRiskScoreHistory, UserRiskVariables, RiskGenerationJob, RiskAssetAllocationConfig.

**RBAC:** RbacUser, RbacRole, RbacPermission, RbacUserRole, RbacRolePermission, RbacResourceType, RbacActionType, RbacTokenBlacklist, RbacAuditTrail.

**Risk profile:** RiskProfile, AiRiskProfile, RiskQuestion, RiskQuestionOption, RiskQuestionCategory, AssessmentTemplate, TemplateRatio, ManualAssessmentSession, SessionQuestion, SessionAnswer, FriendlySummary, AuditLog, RiskProfileUserLock, RiskProfileUserCycle.

**NAV (migration):** FundNavMysqlEntity (for Mongo→MySQL NAV migration).

### 3.2 Document (MongoDB)

No JPA entities; access via **MongoClient** and **MongoCollection<Document>**:

- **NAV:** Database `mf_navs` (configurable), collection `navs` — raw NAV from MFAPI ingestion; read by MongoNavReaderService, NavMongoToMysqlMigrationService, FundSyncService.
- **Credit reports:** Database from `mongodb.credit-reports.database` (default `mf_navs`), collection `credit_reports` — parsed report JSON, raw_text (capped), processing_status, extraction_confidence_score, created_at.
- **Kyckart raw:** Collection `kyckart_credit_report_raw` — raw Kyckart API response (redacted; no full base64); written by CreditReportService.

### 3.3 NAV / Fund Models (Non-Entity)

- **model/mf/IngestionState** — Mapped to/from MongoDB Document.
- **model/mf/NavData** — NAV document shape for MongoDB `navs`.
- **nav/metrics:** FundNavMetricEntity, FundMetricsNormalizedEntity (normalized metrics and fund risk score in MySQL).

---

## 4. Business Logic

### 4.1 User Risk Score (Credit-Bureau-Based)

- **Location:** UserRiskCalculatorService, RiskScoringConfigService; formulas documented in `backend/docs/USER-RISK-SCORE-FORMULAS.md`.
- **Input:** CreditReportDto (from parsed credit report or direct API): age, creditScore, EMIs, limits, utilization, DPD, write-offs, loans, income proxies, behavioral flags, extractionConfidenceScore.
- **Process:**  
  - Estimated monthly income from up to four proxies (EMI/FOIR, credit limit, secured loan, collateral) with configurable weights and FOIR rules.  
  - DTI and utilization computed and normalized.  
  - Eight components (each 1–1000): credit score, income, DTI, utilization, repayment history, loan mix, age, city tier. Weights configurable via `application_config` (e.g. credit 18%, income 18%, DTI 18%, utilization 9%, repayment 9%, loan mix 9%, age 9%, city tier 10%).  
  - Weighted sum with redistribution over finite components → raw score → clamp and round → **score (1–1000)**.  
  - Post-adjustments: low income reliability cap; extraction confidence and thin file affect **risk_confidence** only.  
  - **Risk bucket:** Secure (≤200), Conservative (≤400), Moderate (≤600), Growth (≤800), Aggressive (>800).  
- **Config:** All thresholds and weights from `application_config` (RiskScoringConfigService; 5-minute cache). Key keys: `risk_scoring.*` (bucket boundaries, income caps, weights, city tier, extraction_confidence_min, etc.), `credit_report_freshness_days`.

### 4.2 Fund Risk Score

- **Location:** FundMetricsNormalizationService, FundMetricsNormalizedWriterService.
- **Input:** fund_nav_metrics (volatility, max_drawdown, downside_deviation, etc.).
- **Process:** Normalize metrics and compute **fund risk score** (e.g. 0.40×Vol + 0.35×Drawdown + 0.25×DownsideDev), scale 1–1000; persist to `fund_metrics_normalized`.

### 4.3 Questionnaire Risk Profile

- **Location:** RiskAnalysisEngineService, ManualAssessmentService; band logic in RiskScoreBand.
- **Process:** Category scores from session answers → composite score (1–1000) → RiskScoreBand (band/subBand) → behavioral insights and recommended actions; persist RiskProfile, FriendlySummary, AuditLog. Version SCORE_VERSION v1.0. PdfReportService generates DOCX/PDF risk report.

### 4.4 Asset Allocation and Product Filtering

- **Location:** AssetAllocationService, RiskAssetAllocationConfig.
- **Process:** Load UserRiskScore and RiskAssetAllocationConfig for user; validate allocation sums; map allocation columns to scheme categories; **find matching funds** by comparing fund_risk_score (from fund_metrics_normalized) to user score — gap thresholds **Strong** (e.g. ≤75) and **Acceptable** (e.g. ≤150) from config (`risk_scoring.gap_threshold_strong`, `risk_scoring.gap_threshold_acceptable`). No separate recommendation engine; historical recommendation columns removed (migration 054).

### 4.5 Product Service

- ProductService returns country products with localization; product filtering for allocation is done inside AssetAllocationService via fund risk score gap (see above).

---

## 5. Data Architecture

### 5.1 MySQL

- **Config:** `quarkus.datasource` in `application.yml` — JDBC URL from env (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD), pool min 5 / max 20, acquisition-timeout 45s.
- **Hibernate:** `database.generation: none`, `schema-management.strategy: none`; naming: CamelCaseToUnderscoresNamingStrategy.
- **Usage:** All Panache entities; direct JDBC (AgroalDataSource) for NAV migration, metrics, and allocation queries. Repositories use Panache static finders or custom repositories (e.g. riskprofile, FundNavMysqlRepository).

### 5.2 MongoDB

- **Config:** `quarkus.mongodb.connection-string`, `mongodb.database` (e.g. mf_navs); `mongodb.credit-reports.database`, `mongodb.credit-reports.collection` (credit_reports); `mongodb.kyckart-raw.collection` (kyckart_credit_report_raw).
- **Usage:** NAV raw storage and read path; credit report storage (CreditReportMongoRepository); Kyckart raw storage (KyckartCreditReportRawMongoRepository). Indexes for credit reports ensured at startup by CreditReportMongoIndexInitializer.

### 5.3 NAV / Financial Data Flow

1. **Ingestion:** MfApiClient (https://api.mfapi.in) → NavIngestionService writes to MongoDB `navs`.
2. **Migration:** NavMongoToMysqlMigrationService reads MongoDB `navs`; NavMysqlWriterService / FundNavMysqlRepository write to MySQL `fund_navs`. Allowed AMCs/categories via `nav.migration.allowed-amcs`, `nav.migration.allowed-categories`.
3. **Fund sync:** FundSyncService syncs `funds` from MongoDB (or MySQL) with AMC/category filters; optional `nav.fund.sync-only-active`.
4. **Metrics:** NavMetricsCalculationService reads fund_navs → NavMetricsWriterService → `fund_nav_metrics`.
5. **Normalization:** FundMetricsNormalizationService reads fund_nav_metrics, computes fund risk score → FundMetricsNormalizedWriterService → `fund_metrics_normalized`.
6. **Scheduler:** NavDailyRunScheduler runs the full pipeline (MFAPI → MongoDB → MySQL → metrics → normalization). NavPipelineProgressService tracks progress.

### 5.4 Database Migrations and Schema

- **Migrations:** `database/migrations/` — many numbered migrations (e.g. 001–078) for risk profile, consent, user risk, funds, notifications, family, etc. Applied manually (e.g. `run-all-migrations.ps1`); Flyway disabled.
- **Schema:** `database/schema/` — full schema scripts (01–33+) for initial setup and reference (master, RBAC, sign-in, consent, risk profile, fund tables, etc.). See `database/README.md` for setup and account number generation.

---

## 6. External Integrations

| System | Config / Env | Client / Service | Purpose |
|--------|--------------|------------------|---------|
| **CRM (ERPNext)** | multiplus.crm.enabled, crm.api.url, api-key, api-secret, master-key | ERPNextIntegrationService (HttpURLConnection), CrmService | Lead create/update, KYC push |
| **Kyckart** | kyckart.base-url, kyckart.api.url, api.key | CreditReportService (HttpClient), PanVerificationService, BankVerificationService, KycKartService | PAN verify, bank/UPI verify, mobileToCreditReport |
| **MFAPI** | multiplus.mf.api.base-url (MF_API_BASE_URL), timeout-seconds | MfApiClient (JAX-RS Client) | Fund list, NAV data for ingestion |
| **SMS** | multiplus.sms.provider, api-key, api-secret, sender-id | SmsService, SmsProviderFactory, TwilioSmsProvider | OTP / SMS |
| **Email** | SMTP_*, MAIL_FROM; multiplus.mail | Quarkus Mailer | Verification, notifications |
| **WhatsApp** | whatsapp.verify.token, app.secret, phone.number.id, access.token, research.link, consent.purpose | WhatsAppService (HttpClient), WhatsAppOnboardingPersistenceService, WebhookMessageProcessor | Webhook, onboarding, consent |
| **S3** | documents.s3.enabled, bucket-name, region, accessKey, secretKey, masterKey (encryption) | AwsS3Service (AWS SDK S3) | Document storage |
| **Geo-IP** | geo-ip.api-url | Used for country-from-IP | Localization / country |

All application config is under `com.multiplus.config.ApplicationConfig` (SmallRye ConfigMapping, prefix `multiplus`) and nested interfaces (CrmConfig, KyckartConfig, MfConfig, DocumentsConfig, etc.). Secrets and env-specific values are in `.env`; see `backend/docs/CREDENTIALS_AND_ENV.md`.

---

## 7. Document Processing

### 7.1 Upload and Storage

- **Controller:** DocumentUploadController — `/api/v1/documents`: upload by type, list, download; file signature validation (magic bytes).
- **Service:** DocumentUploadService — Document type mapping (PAN, Aadhaar, bank book, etc.), validation, temp file or S3 upload, CustomerDocument entity (MySQL), optional encryption.
- **Storage:** AwsS3Service — S3 init from config (optional), put/get/delete, encryption support. Config: `multiplus.documents.upload` (max-size-mb, allowed-types, temp-dir), `documents.s3` (enabled, bucket, region, keys).

### 7.2 Credit Report PDF Pipeline

- **Location:** CreditReportProcessingService, CreditReportMongoRepository.
- **Flow:** Base64 decode → Apache PDFBox PDFTextStripper → preprocess/normalize → parse full report to structured JSON (Experian-style sections, account blocks, regex/value-after-label) → validateParsedReport, computeExtractionConfidence → store in MongoDB `credit_reports` (report_json, raw_text cap, processing_status, extraction_confidence_score). Image-only PDFs: store failure, no scoring.
- **Ref:** `backend/docs/SYSTEM-DOCUMENTATION.md` describes credit report flow, freshness, Kyckart, PDF vs direct JSON path, and MongoDB fields.

---

## 8. Existing Analytics / AI Logic

### 8.1 Rule-Based and Formula-Based

- **User risk (credit):** UserRiskCalculatorService — weighted formula (eight components, configurable weights); no ML. RiskVariableDerivationService derives variables from credit report JSON; UserRiskOrchestrationService coordinates job lock, Kyckart call, derive → compute → persist. RiskScoreComputedEvent fired on new score.
- **Fund risk:** FundMetricsNormalizationService — fund risk score from volatility, drawdown, downside deviation; persisted to fund_metrics_normalized.
- **Questionnaire risk profile:** RiskAnalysisEngineService — composite score and band from session answers; ManualAssessmentService; PdfReportService for DOCX/PDF report.

### 8.2 AI Risk Profile Endpoint

- AiRiskAnalysisResource (`/api/v1/riskprofile/ai`) — run/initiate deprecated (410); only fetch existing report; **no active AI model pipeline** in codebase.

### 8.3 Recommendations

- AssetAllocationService returns allocation and “matching funds” by risk score gap (Strong/Acceptable) only; no separate recommendation or ML engine.

### 8.4 Dependencies

- No ML/AI runtime dependencies in `pom.xml`. All current “analytics” are rule-based and formula-based (user risk, fund risk, questionnaire composite score).

---

## 9. Summary and Integration Notes

- **Backend:** Single Quarkus app; REST under `/api/v1/` and `/api/`; MySQL for transactional and config data; MongoDB for NAV raw and credit reports; NAV pipeline (MFAPI → Mongo → MySQL → metrics → fund risk score) runs on a schedule.
- **User risk:** Credit report from Kyckart (or reuse if fresh) → parse (PDF or JSON) → derive variables → config-driven user risk score and bucket → allocation bands and matching funds by fund risk score gap.
- **Risk profile:** Questionnaire-based risk score and report; AI risk endpoint exists but is deprecated with no active model.
- **Documents:** Upload/store (local or S3); credit report PDF parsing and storage in MongoDB for risk pipeline.
- **Integrations:** CRM (ERPNext), Kyckart, MFAPI, SMS (Twilio), email, WhatsApp, S3, Geo-IP; all configured via `ApplicationConfig` and env.

This document should be updated as the codebase evolves and when the AI platform is integrated (e.g. new services, new data flows, and replacement or extension of the deprecated AI risk endpoint).
