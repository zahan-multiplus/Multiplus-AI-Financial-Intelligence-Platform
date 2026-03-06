# Multiplus AI Architecture — Documentation vs Implementation Mapping

**Purpose:** Map documented AI platform architecture components to the current Multiplus platform implementation. No design or architecture changes are proposed.

**Implementation source:** `C:\Users\Zenith\Documents\dev\multiplus\docs\PLATFORM_ARCHITECTURE_INTELLIGENCE.md`  
**Documentation source:** Multiplus AI architecture documentation (content/, ARCHITECTURE_BOUNDARIES.md, ARCHITECTURE_REVIEW.md).

---

## Mapping Table

| Component | Status | Existing Implementation | Notes |
|-----------|--------|-------------------------|-------|
| **User Risk Scoring** | Implemented | UserRiskCalculatorService, RiskScoringConfigService, RiskVariableDerivationService, UserRiskOrchestrationService | Credit-report-based; eight components (credit score, income, DTI, utilization, repayment, loan mix, age, city tier) with configurable weights from application_config; score 1–1000 and risk bucket (Secure/Conservative/Moderate/Growth/Aggressive). Formulas in backend/docs/USER-RISK-SCORE-FORMULAS.md. |
| **Risk Profile Questionnaire** | Implemented | ManualAssessmentService, RiskAnalysisEngineService, RiskScoreBand, PdfReportService; entities: RiskProfile, RiskQuestion, RiskQuestionOption, ManualAssessmentSession, SessionQuestion, SessionAnswer, FriendlySummary | Category scores from session answers → composite score (1–1000) → band/subBand → behavioral insights and recommended actions; DOCX/PDF risk report generation. REST under /api/v1/riskprofile (ManualAssessmentResource, AdminResource, AdminQuestionResource). |
| **Asset Allocation Engine** | Implemented | AssetAllocationService, RiskAssetAllocationConfig | Loads UserRiskScore and RiskAssetAllocationConfig; validates allocation sums; maps allocation columns to scheme categories; finds matching funds by comparing fund_risk_score to user score with Strong/Acceptable gap thresholds from config. GET /api/v1/user-risk/allocation returns allocation bands and matching funds. |
| **Portfolio Evaluation Logic** | Partially Implemented | PortfolioController (/api/v1/portfolio/me, /me/list) | API and permission gating exist; actual portfolio retrieval is marked TODO/pending in implementation. No portfolio aggregation, diversification, or performance metrics pipeline as in documentation. |
| **Fund Scoring Logic** | Implemented | FundMetricsNormalizationService, FundMetricsNormalizedWriterService, FundMetricsNormalizedEntity | Normalizes fund_nav_metrics (volatility, max_drawdown, downside_deviation, etc.); computes fund risk score (e.g. 0.40×Vol + 0.35×Drawdown + 0.25×DownsideDev), scale 1–1000; persists to fund_metrics_normalized. Part of NAV pipeline. |
| **Recommendation Engine** | Partially Implemented | AssetAllocationService (allocation + “matching funds” by risk score gap only) | No separate recommendation engine or ML pipeline. Matching funds by Strong/Acceptable gap only; no product ranking, suitability checks, optimization, or recommendation object pipeline. Historical recommendation columns removed (migration 054). |
| **Document Intelligence** | Partially Implemented | DocumentUploadController, DocumentUploadService, AwsS3Service; CreditReportProcessingService (PDFBox), CreditReportMongoRepository | Upload, validation, storage (local/S3), type mapping (PAN, Aadhaar, bank book, etc.). Credit report PDF: decode → PDFTextStripper → parse to structured JSON → MongoDB. No OCR for generic docs, no CAS/bank statement/insurance parsing, no entity extraction or document knowledge graph. |
| **Data Ingestion Pipelines** | Partially Implemented | NavIngestionService, MfApiClient → MongoDB navs; NavMongoToMysqlMigrationService, NavMysqlWriterService; NavMetricsCalculationService, NavMetricsWriterService; FundMetricsNormalizationService, FundMetricsNormalizedWriterService; NavDailyRunScheduler, NavPipelineProgressService. Credit: Kyckart → CreditReportService → parse → MongoDB credit_reports | NAV: MFAPI → MongoDB → MySQL → metrics → normalization on schedule. Credit report ingestion and storage. No general-purpose batch/streaming/event-driven ingestion framework; no feature store or vector DB ingestion. |
| **External Financial Integrations** | Partially Implemented | MfApiClient (MFAPI: fund list, NAV); CreditReportService + Kyckart (credit report, PAN/bank/UPI verify) | MFAPI and Kyckart only. No broad financial data aggregation or multiple bank/investment-platform connectors as described in documentation. |
| **Trigger Framework** | Not Implemented | Quarkus Scheduler (e.g. NavDailyRunScheduler); RiskScoreComputedEvent (fired on new score) | No trigger detection layer, deduplication, or AI workflow dispatcher. Scheduled jobs and single domain event only; no event-driven trigger routing to AI workflows. |
| **AI Platform Modules** | Partially Implemented | Backend services: UserRiskCalculatorService, AssetAllocationService, RiskAnalysisEngineService, FundMetricsNormalizationService, CreditReportProcessingService, etc. | Analytical logic exists as backend services. No dedicated “AI platform” layer or module abstraction; no AI module orchestration as in doc. AiRiskAnalysisResource (/api/v1/riskprofile/ai) deprecated (410); no active AI model pipeline. |
| **Model Serving Infrastructure** | Not Implemented | — | No ML/AI runtime in pom.xml; no vLLM, Ollama, or model server. All current analytics are rule-based and formula-based. |
| **Agent Architecture** | Not Implemented | — | No agent, context builder, tool invocation layer, or LLM-based orchestration. |
| **Monitoring / Model Lifecycle** | Partially Implemented | HealthController (/api/health) | Basic health endpoint only. No model monitoring, model versioning/registry, retraining pipeline, A/B testing, or recommendation performance tracking as in documentation. |

---

## Summary by Status

| Status | Count | Components |
|--------|--------|------------|
| **Implemented** | 4 | User Risk Scoring, Risk Profile Questionnaire, Asset Allocation Engine, Fund Scoring Logic |
| **Partially Implemented** | 7 | Portfolio Evaluation Logic, Recommendation Engine, Document Intelligence, Data Ingestion Pipelines, External Financial Integrations, AI Platform Modules, Monitoring / Model Lifecycle |
| **Not Implemented** | 3 | Trigger Framework, Model Serving Infrastructure, Agent Architecture |

---

*This mapping is based solely on the implementation described in PLATFORM_ARCHITECTURE_INTELLIGENCE.md and the documented AI architecture. No architecture changes or recommendations are made.*
