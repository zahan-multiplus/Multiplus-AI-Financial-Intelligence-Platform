flowchart TD
classDef default fill:#ffffff,stroke:#4da3ff,stroke-width:2px,color:#003366;

Root["Multiplus AI Financial Intelligence Platform Documentation"]
P1["PART 1 — PREFACE"]
P2["PART 2 — PROBLEM CONTEXT"]
P3["PART 3 — SYSTEM OVERVIEW"]
P4["PART 4 — SYSTEM ARCHITECTURE"]
P5["PART 5 — AI PLATFORM DESIGN"]
P6["PART 6 — DATA ARCHITECTURE"]
P7["PART 7 — FINANCIAL DATA PROCESSING"]
P8["PART 8 — MODEL STRATEGY"]
P9["PART 9 — AI AGENT ARCHITECTURE"]
P10["PART 10 — RECOMMENDATION ENGINE"]
P11["PART 11 — DOCUMENT INTELLIGENCE"]
P12["PART 12 — COMPLIANCE"]
P13["PART 13 — AI TRIGGERS"]
P14["PART 14 — MONITORING"]
P15["PART 15 — INFRASTRUCTURE"]
P16["PART 16 — SECURITY"]
P17["PART 17 — FUTURE EXTENSIONS"]
S10_1["10.1 Product Universe Definition"]
S10_10["10.10 Suitability Checks"]
S10_11["10.11 Recommendation Explainability"]
S10_12["10.12 Continuous Recommendation Improvement"]
S10_2["10.2 Investment Product Classification"]
S10_3["10.3 Risk Profiling Methodology"]
S10_4["10.4 Portfolio Analysis Engine"]
S10_5["10.5 Asset Allocation Models"]
S10_6["10.6 Fund Ranking Algorithms"]
S10_7["10.7 Diversification Analysis"]
S10_8["10.8 Portfolio Optimization"]
S10_9["10.9 Recommendation Generation Logic"]
S11_1["11.1 Financial Document Processing"]
S11_2["11.2 CAS Document Parsing"]
S11_3["11.3 Bank Statement Analysis"]
S11_4["11.4 Insurance Document Processing"]
S11_5["11.5 OCR Pipeline Architecture"]
S11_6["11.6 Document Entity Extraction"]
S11_7["11.7 Structured Data Conversion"]
S11_8["11.8 Document Knowledge Graph"]
S12_1["12.1 Regulatory Overview"]
S12_2["12.2 Suitability Requirements"]
S12_3["12.3 Risk Alignment Checks"]
S12_4["12.4 Compliance Engine Architecture"]
S12_5["12.5 Audit Logging"]
S12_6["12.6 Explainability Requirements"]
S12_7["12.7 Regulatory Reporting"]
S12_8["12.8 Governance Framework"]
S13_1["13.1 Trigger Framework"]
S13_2["13.2 User Triggered Intelligence"]
S13_3["13.3 Data Driven Triggers"]
S13_4["13.4 Market Event Triggers"]
S13_5["13.5 Scheduled AI Tasks"]
S13_6["13.6 Event Driven Architecture"]
S14_1["14.1 System Monitoring Architecture"]
S14_2["14.2 Model Monitoring"]
S14_3["14.3 Recommendation Performance Tracking"]
S14_4["14.4 Data Pipeline Monitoring"]
S14_5["14.5 Feedback Collection"]
S14_6["14.6 Continuous Learning"]
S15_1["15.1 Infrastructure Overview"]
S15_2["15.2 Compute Infrastructure"]
S15_3["15.3 GPU Infrastructure"]
S15_4["15.4 Storage Infrastructure"]
S15_5["15.5 Networking Architecture"]
S15_6["15.6 Containerization Strategy"]
S15_7["15.7 Scaling Strategy"]
S15_8["15.8 Cost Optimization"]
S16_1["16.1 Security Overview"]
S16_2["16.2 Data Encryption"]
S16_3["16.3 Access Control"]
S16_4["16.4 Secure API Architecture"]
S16_5["16.5 Model Security"]
S16_6["16.6 Secure Document Handling"]
S16_7["16.7 Data Privacy Architecture"]
S16_8["16.8 Threat Mitigation"]
S17_1["17.1 Autonomous Financial Agents"]
S17_2["17.2 AI Portfolio Managers"]
S17_3["17.3 Predictive Market Intelligence"]
S17_4["17.4 Automated Portfolio Rebalancing"]
S17_5["17.5 Personalized Financial Planning"]
S17_6["17.6 Multi Agent Financial Systems"]
S17_7["17.7 Reinforcement Learning Portfolio Models"]
S17_8["17.8 Self Improving Financial AI"]
S1_1["1.1 Introduction"]
S1_2["1.2 Purpose of the System"]
S1_3["1.3 Scope of the Platform"]
S1_4["1.4 Intended Audience"]
S1_5["1.5 System Vision"]
S2_1["2.1 Current Financial Advisory Limitations"]
S2_2["2.2 Need for AI-driven Financial Intelligence"]
S2_3["2.3 Challenges in Financial Data Understanding"]
S2_4["2.4 Role of Automation in Financial Platforms"]
S3_1["3.1 Multiplus Platform Overview"]
S3_2["3.2 Role of the AI Platform in Multiplus"]
S3_3["3.3 High Level System Architecture"]
S3_4["3.4 Key Capabilities of the System"]
S4_1["4.1 Overall Platform Architecture"]
S4_2["4.2 Core System Layers"]
S5_1["5.1 AI Platform Overview"]
S5_2["5.2 AI Platform Responsibilities"]
S5_3["5.3 Data Extraction Module"]
S5_4["5.4 Data Enrichment Module"]
S5_5["5.5 Data Ingestion Module"]
S5_6["5.6 Data Management Module"]
S5_7["5.7 Document Management Module"]
S5_8["5.8 Recommendation Engine Module"]
S6_1["6.1 Financial Data Sources"]
S6_2["6.2 Internal Platform Data Sources"]
S6_3["6.3 External Financial Data Providers"]
S6_4["6.4 Data Ingestion Pipelines"]
S6_5["6.5 Data Validation and Quality Checks"]
S6_6["6.6 Data Storage Strategy"]
S6_7["6.7 Data Lake Design"]
S6_8["6.8 Feature Store Design"]
S6_9["6.9 Vector Database Design"]
S7_1["7.1 Financial Data Models"]
S7_10["7.10 Financial Health Indicators"]
S7_2["7.2 User Financial Profile Construction"]
S7_3["7.3 Portfolio Data Models"]
S7_4["7.4 Transaction Data Modeling"]
S7_5["7.5 Transaction Categorization"]
S7_6["7.6 Income Detection Algorithms"]
S7_7["7.7 Expense Detection Algorithms"]
S7_8["7.8 Financial Behavior Analysis"]
S7_9["7.9 Asset and Liability Detection"]
S8_1["8.1 Model Requirements"]
S8_2["8.2 Model Capability Requirements"]
S8_3["8.3 Model Selection Strategy"]
S8_4["8.4 Open Source LLM Options"]
S8_5["8.5 Model Evaluation Criteria"]
S8_6["8.6 Model Deployment Strategy"]
S8_7["8.7 GPU and Infrastructure Requirements"]
S8_8["8.8 Model Performance Optimization"]
S9_1["9.1 AI Agent Concept"]
S9_10["9.10 Agent Failure Handling"]
S9_2["9.2 Agent Responsibilities"]
S9_3["9.3 Tool-Based Agent Architecture"]
S9_4["9.4 Context Builder"]
S9_5["9.5 Prompt Generation"]
S9_6["9.6 Tool Invocation Layer"]
S9_7["9.7 Output Structuring"]
S9_8["9.8 Agent Memory and Context Retention"]
S9_9["9.9 Agent Decision Logic"]
S10_10_1["10.10.1 Purpose of Suitability Checks"]
S10_10_10["10.10.10 Recommendation Validation Rules"]
S10_10_11["10.10.11 Suitability Scoring"]
S10_10_12["10.10.12 Recommendation Adjustment"]
S10_10_13["10.10.13 Suitability Validation Logging"]
S10_10_14["10.10.14 Importance in the Recommendation Engine"]
S10_10_2["10.10.2 Suitability Validation Workflow"]
S10_10_3["10.10.3 Risk Alignment Validation"]
S10_10_4["10.10.4 Asset Allocation Constraints"]
S10_10_5["10.10.5 Product Eligibility Validation"]
S10_10_6["10.10.6 Portfolio Concentration Limits"]
S10_10_7["10.10.7 Diversification Validation"]
S10_10_8["10.10.8 Liquidity Considerations"]
S10_10_9["10.10.9 Regulatory Compliance Checks"]
S10_11_1["10.11.1 Purpose of Recommendation Explainability"]
S10_11_10["10.11.10 Integration with AI Language Models"]
S10_11_11["10.11.11 Explanation Consistency"]
S10_11_12["10.11.12 Logging and Traceability"]
S10_11_13["10.11.13 Importance in the Recommendation Engine"]
S10_11_2["10.11.2 Sources of Explanation Data"]
S10_11_3["10.11.3 Explanation Generation Workflow"]
S10_11_4["10.11.4 Risk-Based Explanation"]
S10_11_5["10.11.5 Asset Allocation Explanation"]
S10_11_6["10.11.6 Portfolio Improvement Explanation"]
S10_11_7["10.11.7 Product Selection Explanation"]
S10_11_8["10.11.8 Supporting Metrics Display"]
S10_11_9["10.11.9 Structured Explanation Output"]
S10_12_1["10.12.1 Purpose of Continuous Improvement"]
S10_12_10["10.12.10 Recommendation Quality Metrics"]
S10_12_11["10.12.11 Continuous Learning Pipeline"]
S10_12_12["10.12.12 Human Oversight"]
S10_12_13["10.12.13 Importance in the Recommendation System"]
S10_12_2["10.12.2 Feedback Sources"]
S10_12_3["10.12.3 User Interaction Feedback"]
S10_12_4["10.12.4 Portfolio Outcome Analysis"]
S10_12_5["10.12.5 Model Performance Monitoring"]
S10_12_6["10.12.6 Market Data Adaptation"]
S10_12_7["10.12.7 Fund Ranking Model Updates"]
S10_12_8["10.12.8 Asset Allocation Model Refinement"]
S10_12_9["10.12.9 A/B Testing of Recommendation Strategies"]
S10_1_1["10.1.1 Purpose of the Product Universe"]
S10_1_10["10.1.10 Product Metadata Management"]
S10_1_11["10.1.11 Product Universe Updates"]
S10_1_12["10.1.12 Data Quality and Validation"]
S10_1_13["10.1.13 Storage and Access Architecture"]
S10_1_14["10.1.14 Importance in the Recommendation Engine"]
S10_1_2["10.1.2 Categories of Financial Products"]
S10_1_3["10.1.3 Mutual Fund Product Universe"]
S10_1_4["10.1.4 Product Data Requirements"]
S10_1_5["10.1.5 Product Performance Metrics"]
S10_1_6["10.1.6 Product Eligibility Criteria"]
S10_1_7["10.1.7 Product Data Sources"]
S10_1_8["10.1.8 Product Universe Construction Workflow"]
S10_1_9["10.1.9 Product Classification"]
S10_2_1["10.2.1 Purpose of Product Classification"]
S10_2_10["10.2.10 Multi-Dimensional Product Classification"]
S10_2_11["10.2.11 Classification Data Management"]
S10_2_12["10.2.12 Classification Updates"]
S10_2_13["10.2.13 Importance in the Recommendation Engine"]
S10_2_2["10.2.2 Classification Dimensions"]
S10_2_3["10.2.3 Asset Class Classification"]
S10_2_4["10.2.4 Equity Product Classification"]
S10_2_5["10.2.5 Debt Product Classification"]
S10_2_6["10.2.6 Hybrid Product Classification"]
S10_2_7["10.2.7 Passive Investment Product Classification"]
S10_2_8["10.2.8 Risk Level Classification"]
S10_2_9["10.2.9 Benchmark Classification"]
S10_3_1["10.3.1 Purpose of Risk Profiling"]
S10_3_10["10.3.10 Risk Profile Updates"]
S10_3_11["10.3.11 Risk Profile Validation"]
S10_3_12["10.3.12 Integration with the Recommendation Engine"]
S10_3_13["10.3.13 Importance in the Recommendation System"]
S10_3_2["10.3.2 Dimensions of Risk Assessment"]
S10_3_3["10.3.3 Financial Capacity for Risk"]
S10_3_4["10.3.4 Investment Time Horizon"]
S10_3_5["10.3.5 Financial Stability Indicators"]
S10_3_6["10.3.6 Behavioral Risk Indicators"]
S10_3_7["10.3.7 Risk Score Calculation"]
S10_3_8["10.3.8 Risk Profile Categories"]
S10_3_9["10.3.9 Risk Profile Data Structure"]
S10_4_1["10.4.1 Purpose of the Portfolio Analysis Engine"]
S10_4_10["10.4.10 Portfolio Analysis Workflow"]
S10_4_11["10.4.11 Integration with the Recommendation Engine"]
S10_4_12["10.4.12 Continuous Portfolio Monitoring"]
S10_4_13["10.4.13 Importance in the Recommendation Engine"]
S10_4_2["10.4.2 Portfolio Data Inputs"]
S10_4_3["10.4.3 Portfolio Aggregation"]
S10_4_4["10.4.4 Asset Allocation Analysis"]
S10_4_5["10.4.5 Diversification Analysis"]
S10_4_6["10.4.6 Concentration Risk Detection"]
S10_4_7["10.4.7 Risk Alignment Analysis"]
S10_4_8["10.4.8 Portfolio Performance Metrics"]
S10_4_9["10.4.9 Portfolio Health Indicators"]
S10_5_1["10.5.1 Purpose of Asset Allocation"]
S10_5_10["10.5.10 Allocation Constraints"]
S10_5_11["10.5.11 Integration with Product Selection"]
S10_5_12["10.5.12 Continuous Allocation Monitoring"]
S10_5_13["10.5.13 Importance in the Recommendation Engine"]
S10_5_2["10.5.2 Asset Classes in the Allocation Model"]
S10_5_3["10.5.3 Risk-Aligned Allocation Strategies"]
S10_5_4["10.5.4 Strategic Asset Allocation"]
S10_5_5["10.5.5 Tactical Asset Allocation"]
S10_5_6["10.5.6 Portfolio Gap Analysis"]
S10_5_7["10.5.7 Allocation Gap Metrics"]
S10_5_8["10.5.8 Investment Allocation Generation"]
S10_5_9["10.5.9 Portfolio Rebalancing Considerations"]
S10_6_1["10.6.1 Purpose of Fund Ranking"]
S10_6_10["10.6.10 Ranking Score Structure"]
S10_6_11["10.6.11 Top-N Fund Selection"]
S10_6_12["10.6.12 Periodic Ranking Updates"]
S10_6_13["10.6.13 Data Pipeline Integration"]
S10_6_14["10.6.14 Importance in the Recommendation Engine"]
S10_6_2["10.6.2 Fund Ranking Workflow"]
S10_6_3["10.6.3 Category-Based Ranking"]
S10_6_4["10.6.4 Performance Metrics"]
S10_6_5["10.6.5 Risk-Adjusted Return Metrics"]
S10_6_6["10.6.6 Rolling Return Consistency"]
S10_6_7["10.6.7 Volatility Measurement"]
S10_6_8["10.6.8 Metric Normalization"]
S10_6_9["10.6.9 Weighted Scoring Model"]
S10_7_1["10.7.1 Purpose of Diversification Analysis"]
S10_7_10["10.7.10 Integration with Asset Allocation Models"]
S10_7_11["10.7.11 Diversification Improvement Recommendations"]
S10_7_12["10.7.12 Continuous Diversification Monitoring"]
S10_7_13["10.7.13 Importance in the Recommendation Engine"]
S10_7_2["10.7.2 Diversification Dimensions"]
S10_7_3["10.7.3 Asset Class Diversification"]
S10_7_4["10.7.4 Product-Level Diversification"]
S10_7_5["10.7.5 Sector Diversification"]
S10_7_6["10.7.6 Investment Strategy Diversification"]
S10_7_7["10.7.7 Concentration Risk Metrics"]
S10_7_8["10.7.8 Diversification Score Calculation"]
S10_7_9["10.7.9 Diversification Gap Identification"]
S10_8_1["10.8.1 Purpose of Portfolio Optimization"]
S10_8_10["10.8.10 Incremental Optimization"]
S10_8_11["10.8.11 Optimization Output Structure"]
S10_8_12["10.8.12 Continuous Portfolio Optimization"]
S10_8_13["10.8.13 Importance in the Recommendation Engine"]
S10_8_2["10.8.2 Optimization Inputs"]
S10_8_3["10.8.3 Target Portfolio Structure"]
S10_8_4["10.8.4 Optimization Workflow"]
S10_8_5["10.8.5 Portfolio Gap Analysis"]
S10_8_6["10.8.6 Product Selection for Optimization"]
S10_8_7["10.8.7 Investment Allocation Calculation"]
S10_8_8["10.8.8 Portfolio Risk Evaluation"]
S10_8_9["10.8.9 Constraint-Based Optimization"]
S10_9_1["10.9.1 Purpose of Recommendation Generation"]
S10_9_10["10.9.10 Recommendation Output Structure"]
S10_9_11["10.9.11 Explanation Generation"]
S10_9_12["10.9.12 Recommendation Updates"]
S10_9_13["10.9.13 Importance in the Recommendation System"]
S10_9_2["10.9.2 Inputs to the Recommendation Engine"]
S10_9_3["10.9.3 Recommendation Generation Workflow"]
S10_9_4["10.9.4 Asset Allocation Alignment"]
S10_9_5["10.9.5 Product Filtering"]
S10_9_6["10.9.6 Ranked Product Selection"]
S10_9_7["10.9.7 Allocation Distribution"]
S10_9_8["10.9.8 Portfolio Impact Evaluation"]
S10_9_9["10.9.9 Suitability Validation"]
S11_1_1["11.1.1 Purpose of Financial Document Processing"]
S11_1_10["11.1.10 Data Validation"]
S11_1_11["11.1.11 Integration with Financial Data Models"]
S11_1_12["11.1.12 Document Storage and Retrieval"]
S11_1_13["11.1.13 Importance in the Financial Intelligence Platform"]
S11_1_2["11.1.2 Types of Financial Documents"]
S11_1_3["11.1.3 Document Processing Workflow"]
S11_1_4["11.1.4 Document Ingestion"]
S11_1_5["11.1.5 Document Preprocessing"]
S11_1_6["11.1.6 Text Extraction"]
S11_1_7["11.1.7 Document Structure Detection"]
S11_1_8["11.1.8 Data Parsing"]
S11_1_9["11.1.9 Structured Data Generation"]
S11_2_1["11.2.1 Purpose of CAS Parsing"]
S11_2_10["11.2.10 Portfolio Reconstruction"]
S11_2_11["11.2.11 Data Validation"]
S11_2_12["11.2.12 Integration with Portfolio Analysis"]
S11_2_13["11.2.13 Importance in the Financial Intelligence Platform"]
S11_2_2["11.2.2 CAS Document Characteristics"]
S11_2_3["11.2.3 CAS Parsing Workflow"]
S11_2_4["11.2.4 Investor Information Extraction"]
S11_2_5["11.2.5 Scheme Identification"]
S11_2_6["11.2.6 Transaction History Extraction"]
S11_2_7["11.2.7 Holdings Extraction"]
S11_2_8["11.2.8 Table Detection and Parsing"]
S11_2_9["11.2.9 Scheme Mapping"]
S11_3_1["11.3.1 Purpose of Bank Statement Analysis"]
S11_3_10["11.3.10 Savings Rate Estimation"]
S11_3_11["11.3.11 Financial Health Indicators"]
S11_3_12["11.3.12 Integration with Financial Profiles"]
S11_3_13["11.3.13 Data Validation and Error Handling"]
S11_3_14["11.3.14 Importance in the Financial Intelligence Platform"]
S11_3_2["11.3.2 Bank Statement Characteristics"]
S11_3_3["11.3.3 Bank Statement Processing Workflow"]
S11_3_4["11.3.4 Transaction Extraction"]
S11_3_5["11.3.5 Transaction Classification"]
S11_3_6["11.3.6 Income Detection"]
S11_3_7["11.3.7 Expense Pattern Analysis"]
S11_3_8["11.3.8 Recurring Payment Detection"]
S11_3_9["11.3.9 Cash Flow Analysis"]
S11_4_1["11.4.1 Purpose of Insurance Document Processing"]
S11_4_10["11.4.10 Data Normalization"]
S11_4_11["11.4.11 Integration with Financial Profiles"]
S11_4_12["11.4.12 Insurance Coverage Analysis"]
S11_4_13["11.4.13 Importance in the Financial Intelligence Platform"]
S11_4_2["11.4.2 Types of Insurance Documents"]
S11_4_3["11.4.3 Insurance Document Processing Workflow"]
S11_4_4["11.4.4 Policyholder Identification"]
S11_4_5["11.4.5 Policy Type Detection"]
S11_4_6["11.4.6 Coverage Amount Extraction"]
S11_4_7["11.4.7 Premium Schedule Extraction"]
S11_4_8["11.4.8 Policy Duration and Term"]
S11_4_9["11.4.9 Policy Benefit Extraction"]
S11_5_1["11.5.1 Purpose of the OCR Pipeline"]
S11_5_10["11.5.10 Structured Text Output"]
S11_5_11["11.5.11 Integration with Document Parsing Systems"]
S11_5_12["11.5.12 Error Detection and Quality Monitoring"]
S11_5_13["11.5.13 Importance in the Document Intelligence System"]
S11_5_2["11.5.2 OCR Pipeline Workflow"]
S11_5_3["11.5.3 Supported Document Formats"]
S11_5_4["11.5.4 Image Preprocessing"]
S11_5_5["11.5.5 Text Detection"]
S11_5_6["11.5.6 OCR Text Extraction"]
S11_5_7["11.5.7 Layout Analysis"]
S11_5_8["11.5.8 Table Recognition"]
S11_5_9["11.5.9 Text Post-Processing"]
S11_6_1["11.6.1 Purpose of Entity Extraction"]
S11_6_10["11.6.10 Product and Institution Detection"]
S11_6_11["11.6.11 Entity Validation"]
S11_6_12["11.6.12 Structured Entity Storage"]
S11_6_13["11.6.13 Integration with Financial Data Models"]
S11_6_14["11.6.14 Importance in the Document Intelligence System"]
S11_6_2["11.6.2 Types of Financial Entities"]
S11_6_3["11.6.3 Entity Extraction Workflow"]
S11_6_4["11.6.4 Text Preprocessing"]
S11_6_5["11.6.5 Entity Detection Methods"]
S11_6_6["11.6.6 Named Entity Recognition Models"]
S11_6_7["11.6.7 Entity Classification"]
S11_6_8["11.6.8 Monetary Value Extraction"]
S11_6_9["11.6.9 Date and Time Extraction"]
S11_7_1["11.7.1 Purpose of Structured Data Conversion"]
S11_7_10["11.7.10 Storage in Financial Data Infrastructure"]
S11_7_11["11.7.11 Integration with Downstream Systems"]
S11_7_12["11.7.12 Error Handling and Data Correction"]
S11_7_13["11.7.13 Importance in the Document Intelligence Pipeline"]
S11_7_2["11.7.2 Input Sources for Conversion"]
S11_7_3["11.7.3 Conversion Workflow"]
S11_7_4["11.7.4 Entity Mapping"]
S11_7_5["11.7.5 Data Normalization"]
S11_7_6["11.7.6 Transaction Record Conversion"]
S11_7_7["11.7.7 Investment Holding Conversion"]
S11_7_8["11.7.8 Insurance Policy Data Conversion"]
S11_7_9["11.7.9 Data Consistency Validation"]
S11_8_1["11.8.1 Purpose of the Document Knowledge Graph"]
S11_8_10["11.8.10 Querying the Knowledge Graph"]
S11_8_11["11.8.11 Integration with AI Systems"]
S11_8_12["11.8.12 Graph Storage Architecture"]
S11_8_13["11.8.13 Importance in the Financial Intelligence Platform"]
S11_8_2["11.8.2 Core Graph Components"]
S11_8_3["11.8.3 Entity Nodes"]
S11_8_4["11.8.4 Relationship Edges"]
S11_8_5["11.8.5 Document Reference Layer"]
S11_8_6["11.8.6 Graph Construction Workflow"]
S11_8_7["11.8.7 Entity Normalization"]
S11_8_8["11.8.8 Relationship Detection"]
S11_8_9["11.8.9 Example Knowledge Graph Structure"]
S12_1_1["12.1.1 Purpose of Regulatory Compliance"]
S12_1_10["12.1.10 Compliance Integration in System Architecture"]
S12_1_11["12.1.11 Role of Compliance Monitoring"]
S12_1_12["12.1.12 Importance of Regulatory Compliance"]
S12_1_2["12.1.2 Regulatory Scope"]
S12_1_3["12.1.3 Financial Advisory Regulations"]
S12_1_4["12.1.4 Suitability and Investor Protection"]
S12_1_5["12.1.5 Transparency Requirements"]
S12_1_6["12.1.6 Financial Product Compliance"]
S12_1_7["12.1.7 Data Privacy and Financial Data Protection"]
S12_1_8["12.1.8 Auditability and Record Keeping"]
S12_1_9["12.1.9 Risk Management Requirements"]
S12_2_1["12.2.1 Purpose of Suitability Requirements"]
S12_2_10["12.2.10 Suitability Validation Workflow"]
S12_2_11["12.2.11 Suitability Scoring Framework"]
S12_2_12["12.2.12 Suitability Audit Logging"]
S12_2_13["12.2.13 Importance of Suitability Enforcement"]
S12_2_2["12.2.2 Core Suitability Dimensions"]
S12_2_3["12.2.3 Risk Profile Alignment"]
S12_2_4["12.2.4 Financial Capacity Assessment"]
S12_2_5["12.2.5 Investment Horizon Consideration"]
S12_2_6["12.2.6 Portfolio Exposure Limits"]
S12_2_7["12.2.7 Product Eligibility Rules"]
S12_2_8["12.2.8 Diversification Requirements"]
S12_2_9["12.2.9 Liquidity Requirements"]
S12_3_1["12.3.1 Purpose of Risk Alignment Checks"]
S12_3_10["12.3.10 Risk Adjustment Mechanisms"]
S12_3_11["12.3.11 Risk Monitoring and Re-Evaluation"]
S12_3_12["12.3.12 Risk Alignment Logging"]
S12_3_13["12.3.13 Importance of Risk Alignment Controls"]
S12_3_2["12.3.2 Risk Alignment Evaluation Workflow"]
S12_3_3["12.3.3 Risk Profile Reference"]
S12_3_4["12.3.4 Portfolio Risk Measurement"]
S12_3_5["12.3.5 Asset Class Risk Limits"]
S12_3_6["12.3.6 Product Risk Classification"]
S12_3_7["12.3.7 Portfolio Stress Scenario Checks"]
S12_3_8["12.3.8 Concentration Risk Checks"]
S12_3_9["12.3.9 Incremental Risk Impact Analysis"]
S12_4_1["12.4.1 Purpose of the Compliance Engine"]
S12_4_10["12.4.10 Compliance Monitoring"]
S12_4_11["12.4.11 Compliance Update Mechanism"]
S12_4_12["12.4.12 Integration with AI Systems"]
S12_4_13["12.4.13 Importance of the Compliance Engine"]
S12_4_2["12.4.2 Compliance Engine Role in System Architecture"]
S12_4_3["12.4.3 Core Components of the Compliance Engine"]
S12_4_4["12.4.4 Compliance Rule Repository"]
S12_4_5["12.4.5 Rule Evaluation Engine"]
S12_4_6["12.4.6 Policy Enforcement Layer"]
S12_4_7["12.4.7 Product Compliance Validation"]
S12_4_8["12.4.8 Portfolio Compliance Validation"]
S12_4_9["12.4.9 Compliance Decision Logging"]
S12_5_1["12.5.1 Purpose of Audit Logging"]
S12_5_10["12.5.10 Log Retention Policies"]
S12_5_11["12.5.11 Log Integrity and Security"]
S12_5_12["12.5.12 Log Query and Analysis"]
S12_5_13["12.5.13 Importance of Audit Logging"]
S12_5_2["12.5.2 Scope of Audit Logging"]
S12_5_3["12.5.3 Logged Event Categories"]
S12_5_4["12.5.4 Recommendation Audit Records"]
S12_5_5["12.5.5 Compliance Validation Logs"]
S12_5_6["12.5.6 Risk Alignment Logs"]
S12_5_7["12.5.7 AI Decision Logging"]
S12_5_8["12.5.8 Document Processing Logs"]
S12_5_9["12.5.9 Log Storage Architecture"]
S12_6_1["12.6.1 Purpose of Explainability"]
S12_6_10["12.6.10 Explanation Storage and Logging"]
S12_6_11["12.6.11 Explainability for Compliance Oversight"]
S12_6_12["12.6.12 Importance of Explainability in Financial Systems"]
S12_6_2["12.6.2 Scope of Explainability"]
S12_6_3["12.6.3 Explanation Sources"]
S12_6_4["12.6.4 Recommendation-Level Explanation"]
S12_6_5["12.6.5 Portfolio-Level Explanation"]
S12_6_6["12.6.6 Model Decision Transparency"]
S12_6_7["12.6.7 Rule-Based Explanation"]
S12_6_8["12.6.8 AI-Assisted Natural Language Explanations"]
S12_6_9["12.6.9 Explanation Consistency Validation"]
S12_7_1["12.7.1 Purpose of Regulatory Reporting"]
S12_7_10["12.7.10 Report Generation Schedule"]
S12_7_11["12.7.11 Report Storage and Archival"]
S12_7_12["12.7.12 Regulatory Review and Compliance Oversight"]
S12_7_13["12.7.13 Importance of Regulatory Reporting"]
S12_7_2["12.7.2 Scope of Regulatory Reporting"]
S12_7_3["12.7.3 Recommendation Activity Reports"]
S12_7_4["12.7.4 Suitability Compliance Reports"]
S12_7_5["12.7.5 Risk Alignment Reports"]
S12_7_6["12.7.6 Product Compliance Reports"]
S12_7_7["12.7.7 AI System Oversight Reports"]
S12_7_8["12.7.8 Compliance Violation Reports"]
S12_7_9["12.7.9 Reporting Workflow"]
S12_8_1["12.8.1 Purpose of the Governance Framework"]
S12_8_10["12.8.10 Governance Reporting"]
S12_8_11["12.8.11 Governance Enforcement Mechanisms"]
S12_8_12["12.8.12 Importance of Governance in AI Financial Systems"]
S12_8_2["12.8.2 Governance Scope"]
S12_8_3["12.8.3 Governance Structure"]
S12_8_4["12.8.4 AI Model Governance"]
S12_8_5["12.8.5 Recommendation System Governance"]
S12_8_6["12.8.6 Data Governance"]
S12_8_7["12.8.7 Compliance Governance"]
S12_8_8["12.8.8 Change Management Process"]
S12_8_9["12.8.9 Governance Monitoring"]
S13_1_1["13.1.1 Purpose of the Trigger Framework"]
S13_1_10["13.1.10 Trigger Logging"]
S13_1_11["13.1.11 Trigger Failure Handling"]
S13_1_12["13.1.12 Integration with AI Platform Components"]
S13_1_13["13.1.13 Importance of the Trigger Framework"]
S13_1_2["13.1.2 Types of AI Triggers"]
S13_1_3["13.1.3 Trigger Event Sources"]
S13_1_4["13.1.4 Trigger Processing Architecture"]
S13_1_5["13.1.5 Trigger Detection Layer"]
S13_1_6["13.1.6 AI Workflow Dispatcher"]
S13_1_7["13.1.7 Supported AI Workflows"]
S13_1_8["13.1.8 Trigger Priority and Scheduling"]
S13_1_9["13.1.9 Trigger Deduplication"]
S13_2_1["13.2.1 Purpose of User Triggered Intelligence"]
S13_2_10["13.2.10 Trigger Validation"]
S13_2_11["13.2.11 Trigger Logging and Monitoring"]
S13_2_12["13.2.12 Integration with AI Modules"]
S13_2_13["13.2.13 Importance of User Triggered Intelligence"]
S13_2_2["13.2.2 Common User Trigger Events"]
S13_2_3["13.2.3 Recommendation Request Triggers"]
S13_2_4["13.2.4 Financial Profile Update Triggers"]
S13_2_5["13.2.5 Document Upload Triggers"]
S13_2_6["13.2.6 Portfolio Insight Requests"]
S13_2_7["13.2.7 Goal Planning Triggers"]
S13_2_8["13.2.8 Real-Time Insight Generation"]
S13_2_9["13.2.9 Trigger Prioritization"]
S13_3_1["13.3.1 Purpose of Data Driven Triggers"]
S13_3_10["13.3.10 Trigger Coordination"]
S13_3_11["13.3.11 Trigger Logging"]
S13_3_12["13.3.12 Integration with AI Intelligence Systems"]
S13_3_13["13.3.13 Importance of Data Driven Triggers"]
S13_3_2["13.3.2 Sources of Data Driven Triggers"]
S13_3_3["13.3.3 Transaction Data Triggers"]
S13_3_4["13.3.4 Portfolio Data Triggers"]
S13_3_5["13.3.5 Financial Profile Update Triggers"]
S13_3_6["13.3.6 Product Data Update Triggers"]
S13_3_7["13.3.7 Market Data Triggers"]
S13_3_8["13.3.8 Change Detection Mechanisms"]
S13_3_9["13.3.9 Trigger Thresholds"]
S13_4_1["13.4.1 Purpose of Market Event Triggers"]
S13_4_10["13.4.10 Market Event Thresholds"]
S13_4_11["13.4.11 Market Event Logging"]
S13_4_12["13.4.12 Integration with Financial Intelligence Systems"]
S13_4_13["13.4.13 Importance of Market Event Triggers"]
S13_4_2["13.4.2 Market Data Sources"]
S13_4_3["13.4.3 Types of Market Events"]
S13_4_4["13.4.4 Benchmark Index Movement Triggers"]
S13_4_5["13.4.5 Market Volatility Triggers"]
S13_4_6["13.4.6 Product Performance Update Triggers"]
S13_4_7["13.4.7 Economic Indicator Triggers"]
S13_4_8["13.4.8 Portfolio Impact Evaluation"]
S13_4_9["13.4.9 Strategy Reassessment Triggers"]
S13_5_1["13.5.1 Purpose of Scheduled AI Tasks"]
S13_5_10["13.5.10 Scheduling Intervals"]
S13_5_11["13.5.11 Task Execution Monitoring"]
S13_5_12["13.5.12 Scheduled Task Logging"]
S13_5_13["13.5.13 Importance of Scheduled AI Tasks"]
S13_5_2["13.5.2 Types of Scheduled Tasks"]
S13_5_3["13.5.3 Scheduling Framework"]
S13_5_4["13.5.4 Financial Data Recalculation Tasks"]
S13_5_5["13.5.5 Product Ranking Update Tasks"]
S13_5_6["13.5.6 Portfolio Monitoring Tasks"]
S13_5_7["13.5.7 Financial Health Recalculation Tasks"]
S13_5_8["13.5.8 AI Model Monitoring Tasks"]
S13_5_9["13.5.9 Data Quality Monitoring Tasks"]
S13_6_1["13.6.1 Purpose of Event Driven Architecture"]
S13_6_10["13.6.10 Event Retry and Failure Handling"]
S13_6_11["13.6.11 Event Ordering and Idempotency"]
S13_6_12["13.6.12 Integration with AI Trigger Framework"]
S13_6_13["13.6.13 Importance of Event Driven Architecture"]
S13_6_2["13.6.2 Core Architectural Principles"]
S13_6_3["13.6.3 Event Producers"]
S13_6_4["13.6.4 Event Consumers"]
S13_6_5["13.6.5 Event Bus Architecture"]
S13_6_6["13.6.6 Event Types"]
S13_6_7["13.6.7 Event Processing Workflow"]
S13_6_8["13.6.8 Event Routing"]
S13_6_9["13.6.9 Event Persistence"]
S14_1_1["14.1.1 Purpose of System Monitoring"]
S14_1_10["14.1.10 Alerting System"]
S14_1_11["14.1.11 Monitoring Dashboards"]
S14_1_12["14.1.12 Monitoring Data Storage"]
S14_1_13["14.1.13 Importance of System Monitoring"]
S14_1_2["14.1.2 Monitoring Scope"]
S14_1_3["14.1.3 Monitoring Architecture Overview"]
S14_1_4["14.1.4 Metrics Collection Layer"]
S14_1_5["14.1.5 Log Aggregation System"]
S14_1_6["14.1.6 Service Health Monitoring"]
S14_1_7["14.1.7 AI Workflow Monitoring"]
S14_1_8["14.1.8 Data Pipeline Monitoring"]
S14_1_9["14.1.9 Resource Utilization Monitoring"]
S14_2_1["14.2.1 Purpose of Model Monitoring"]
S14_2_10["14.2.10 Model Retraining Triggers"]
S14_2_11["14.2.11 Model Version Tracking"]
S14_2_12["14.2.12 Model Monitoring Dashboard"]
S14_2_13["14.2.13 Importance of Model Monitoring"]
S14_2_2["14.2.2 Scope of Model Monitoring"]
S14_2_3["14.2.3 Model Monitoring Architecture"]
S14_2_4["14.2.4 Model Performance Metrics"]
S14_2_5["14.2.5 Model Drift Detection"]
S14_2_6["14.2.6 Input Data Monitoring"]
S14_2_7["14.2.7 Output Monitoring"]
S14_2_8["14.2.8 Prediction Distribution Analysis"]
S14_2_9["14.2.9 Performance Benchmark Comparison"]
S14_3_1["14.3.1 Purpose of Recommendation Performance Tracking"]
S14_3_10["14.3.10 Recommendation Quality Metrics"]
S14_3_11["14.3.11 Performance Analysis Workflow"]
S14_3_12["14.3.12 Feedback Integration"]
S14_3_13["14.3.13 Importance of Recommendation Performance Tracking"]
S14_3_2["14.3.2 Scope of Performance Tracking"]
S14_3_3["14.3.3 Recommendation Tracking Architecture"]
S14_3_4["14.3.4 Recommendation Records"]
S14_3_5["14.3.5 Portfolio Outcome Monitoring"]
S14_3_6["14.3.6 Product-Level Performance Evaluation"]
S14_3_7["14.3.7 Benchmark Comparison"]
S14_3_8["14.3.8 Time Horizon Evaluation"]
S14_3_9["14.3.9 User Adoption Metrics"]
S14_4_1["14.4.1 Purpose of Data Pipeline Monitoring"]
S14_4_10["14.4.10 Failure Detection and Recovery"]
S14_4_11["14.4.11 Pipeline Monitoring Dashboard"]
S14_4_12["14.4.12 Pipeline Monitoring Alerts"]
S14_4_13["14.4.13 Importance of Data Pipeline Monitoring"]
S14_4_2["14.4.2 Scope of Pipeline Monitoring"]
S14_4_3["14.4.3 Data Pipeline Architecture Overview"]
S14_4_4["14.4.4 Ingestion Monitoring"]
S14_4_5["14.4.5 Processing Monitoring"]
S14_4_6["14.4.6 Data Volume Monitoring"]
S14_4_7["14.4.7 Data Freshness Monitoring"]
S14_4_8["14.4.8 Data Quality Validation"]
S14_4_9["14.4.9 Pipeline Latency Monitoring"]
S14_5_1["14.5.1 Purpose of Feedback Collection"]
S14_5_10["14.5.10 Feedback Analysis"]
S14_5_11["14.5.11 Integration with Model Improvement"]
S14_5_12["14.5.12 Privacy Considerations"]
S14_5_13["14.5.13 Importance of Feedback Collection"]
S14_5_2["14.5.2 Types of Feedback"]
S14_5_3["14.5.3 Explicit User Feedback"]
S14_5_4["14.5.4 Behavioral Feedback Signals"]
S14_5_5["14.5.5 Recommendation Adoption Tracking"]
S14_5_6["14.5.6 Portfolio Outcome Feedback"]
S14_5_7["14.5.7 Explanation Feedback"]
S14_5_8["14.5.8 Feedback Aggregation System"]
S14_5_9["14.5.9 Feedback Storage"]
S14_6_1["14.6.1 Purpose of Continuous Learning"]
S14_6_10["14.6.10 Experimentation Framework"]
S14_6_11["14.6.11 Learning Data Governance"]
S14_6_12["14.6.12 Importance of Continuous Learning"]
S14_6_2["14.6.2 Sources of Learning Signals"]
S14_6_3["14.6.3 Learning Data Pipeline"]
S14_6_4["14.6.4 Model Evaluation for Learning"]
S14_6_5["14.6.5 Learning Triggers"]
S14_6_6["14.6.6 Model Retraining Process"]
S14_6_7["14.6.7 Model Validation"]
S14_6_8["14.6.8 Controlled Model Deployment"]
S14_6_9["14.6.9 Continuous Learning Feedback Loop"]
S15_1_1["15.1.1 Infrastructure Objectives"]
S15_1_10["15.1.10 Infrastructure Security"]
S15_1_11["15.1.11 Infrastructure Monitoring"]
S15_1_12["15.1.12 Infrastructure Cost Considerations"]
S15_1_13["15.1.13 Importance of Infrastructure Design"]
S15_1_2["15.1.2 Infrastructure Components"]
S15_1_3["15.1.3 Infrastructure Layer Architecture"]
S15_1_4["15.1.4 Compute Infrastructure"]
S15_1_5["15.1.5 GPU Infrastructure"]
S15_1_6["15.1.6 Storage Infrastructure"]
S15_1_7["15.1.7 Networking Infrastructure"]
S15_1_8["15.1.8 Infrastructure Scalability"]
S15_1_9["15.1.9 Infrastructure Reliability"]
S15_2_1["15.2.1 Purpose of Compute Infrastructure"]
S15_2_10["15.2.10 Fault Tolerance"]
S15_2_11["15.2.11 Resource Allocation"]
S15_2_12["15.2.12 Compute Infrastructure Monitoring"]
S15_2_13["15.2.13 Importance of Compute Infrastructure"]
S15_2_2["15.2.2 Compute Workload Categories"]
S15_2_3["15.2.3 Compute Architecture Overview"]
S15_2_4["15.2.4 Application Service Compute Layer"]
S15_2_5["15.2.5 Data Processing Compute Layer"]
S15_2_6["15.2.6 AI Inference Compute Layer"]
S15_2_7["15.2.7 Containerized Compute Environment"]
S15_2_8["15.2.8 Horizontal Scaling Strategy"]
S15_2_9["15.2.9 Load Balancing"]
S15_3_1["15.3.1 Purpose of GPU Infrastructure"]
S15_3_10["15.3.10 GPU Monitoring"]
S15_3_11["15.3.11 GPU Cost Optimization"]
S15_3_12["15.3.12 GPU Security Considerations"]
S15_3_13["15.3.13 Importance of GPU Infrastructure"]
S15_3_2["15.3.2 GPU Workload Categories"]
S15_3_3["15.3.3 GPU Infrastructure Architecture"]
S15_3_4["15.3.4 GPU Inference Servers"]
S15_3_5["15.3.5 Model Serving Architecture"]
S15_3_6["15.3.6 GPU Resource Management"]
S15_3_7["15.3.7 Multi-Model Deployment"]
S15_3_8["15.3.8 GPU Scaling Strategy"]
S15_3_9["15.3.9 GPU Workload Isolation"]
S15_4_1["15.4.1 Purpose of Storage Infrastructure"]
S15_4_10["15.4.10 Monitoring and Log Storage"]
S15_4_11["15.4.11 Storage Scalability"]
S15_4_12["15.4.12 Storage Security"]
S15_4_13["15.4.13 Importance of Storage Infrastructure"]
S15_4_2["15.4.2 Storage Categories"]
S15_4_3["15.4.3 Storage Architecture Overview"]
S15_4_4["15.4.4 Relational Database Storage"]
S15_4_5["15.4.5 Object Storage"]
S15_4_6["15.4.6 Data Lake Storage"]
S15_4_7["15.4.7 Feature Store Storage"]
S15_4_8["15.4.8 Vector Database Storage"]
S15_4_9["15.4.9 Model Artifact Storage"]
S15_5_1["15.5.1 Purpose of Networking Architecture"]
S15_5_10["15.5.10 Network Fault Tolerance"]
S15_5_11["15.5.11 Network Scalability"]
S15_5_12["15.5.12 Security Controls"]
S15_5_13["15.5.13 Importance of Networking Architecture"]
S15_5_2["15.5.2 Networking Architecture Overview"]
S15_5_3["15.5.3 Internal Service Communication"]
S15_5_4["15.5.4 API Gateway Layer"]
S15_5_5["15.5.5 Load Balancing Layer"]
S15_5_6["15.5.6 External Data Connectivity"]
S15_5_7["15.5.7 Network Segmentation"]
S15_5_8["15.5.8 Secure Communication Protocols"]
S15_5_9["15.5.9 Network Monitoring"]
S15_6_1["15.6.1 Purpose of Containerization"]
S15_6_10["15.6.10 Resource Management"]
S15_6_11["15.6.11 Container Monitoring"]
S15_6_12["15.6.12 Security Considerations"]
S15_6_13["15.6.13 Importance of Containerization"]
S15_6_2["15.6.2 Containerization Architecture"]
S15_6_3["15.6.3 Containerized Service Types"]
S15_6_4["15.6.4 Container Image Structure"]
S15_6_5["15.6.5 Service Isolation"]
S15_6_6["15.6.6 Container Orchestration"]
S15_6_7["15.6.7 Horizontal Service Scaling"]
S15_6_8["15.6.8 Deployment Automation"]
S15_6_9["15.6.9 Container Networking"]
S15_7_1["15.7.1 Purpose of the Scaling Strategy"]
S15_7_10["15.7.10 Network Scaling"]
S15_7_11["15.7.11 Scaling Monitoring"]
S15_7_12["15.7.12 Cost Management Considerations"]
S15_7_13["15.7.13 Importance of the Scaling Strategy"]
S15_7_2["15.7.2 Scaling Dimensions"]
S15_7_3["15.7.3 Horizontal Scaling"]
S15_7_4["15.7.4 Vertical Scaling"]
S15_7_5["15.7.5 Auto-Scaling Mechanisms"]
S15_7_6["15.7.6 Compute Service Scaling"]
S15_7_7["15.7.7 AI Workload Scaling"]
S15_7_8["15.7.8 Data Pipeline Scaling"]
S15_7_9["15.7.9 Storage Scaling"]
S15_8_1["15.8.1 Purpose of Cost Optimization"]
S15_8_10["15.8.10 Infrastructure Right-Sizing"]
S15_8_11["15.8.11 Cost Monitoring Dashboard"]
S15_8_12["15.8.12 Cost Alerting"]
S15_8_13["15.8.13 Importance of Cost Optimization"]
S15_8_2["15.8.2 Infrastructure Cost Components"]
S15_8_3["15.8.3 Compute Resource Optimization"]
S15_8_4["15.8.4 GPU Utilization Optimization"]
S15_8_5["15.8.5 Model Efficiency Optimization"]
S15_8_6["15.8.6 Storage Cost Optimization"]
S15_8_7["15.8.7 Data Retention Policies"]
S15_8_8["15.8.8 Workload Scheduling Optimization"]
S15_8_9["15.8.9 Resource Monitoring for Cost Management"]
S16_1_1["16.1.1 Security Objectives"]
S16_1_10["16.1.10 Incident Response"]
S16_1_11["16.1.11 Security Governance"]
S16_1_12["16.1.12 Importance of Security Architecture"]
S16_1_2["16.1.2 Security Architecture Layers"]
S16_1_3["16.1.3 Threat Model"]
S16_1_4["16.1.4 Identity and Access Management"]
S16_1_5["16.1.5 Data Protection Principles"]
S16_1_6["16.1.6 Infrastructure Security"]
S16_1_7["16.1.7 Network Security"]
S16_1_8["16.1.8 AI System Security"]
S16_1_9["16.1.9 Monitoring and Threat Detection"]
S16_2_1["16.2.1 Purpose of Data Encryption"]
S16_2_10["16.2.10 Encryption Monitoring"]
S16_2_11["16.2.11 Regulatory Compliance"]
S16_2_12["16.2.12 Importance of Data Encryption"]
S16_2_2["16.2.2 Encryption Scope"]
S16_2_3["16.2.3 Encryption at Rest"]
S16_2_4["16.2.4 Encryption in Transit"]
S16_2_5["16.2.5 Encryption Key Management"]
S16_2_6["16.2.6 Key Rotation Policies"]
S16_2_7["16.2.7 Application-Level Encryption"]
S16_2_8["16.2.8 Database Encryption"]
S16_2_9["16.2.9 Backup Encryption"]
S16_3_1["16.3.1 Purpose of Access Control"]
S16_3_10["16.3.10 Access Logging and Auditing"]
S16_3_11["16.3.11 Access Revocation"]
S16_3_12["16.3.12 Continuous Access Monitoring"]
S16_3_13["16.3.13 Importance of Access Control"]
S16_3_2["16.3.2 Access Control Scope"]
S16_3_3["16.3.3 Identity and Authentication"]
S16_3_4["16.3.4 Role-Based Access Control (RBAC)"]
S16_3_5["16.3.5 Permission Management"]
S16_3_6["16.3.6 Service-to-Service Access Control"]
S16_3_7["16.3.7 Least Privilege Principle"]
S16_3_8["16.3.8 Administrative Access Controls"]
S16_3_9["16.3.9 API Access Control"]
S16_4_1["16.4.1 Purpose of Secure API Architecture"]
S16_4_10["16.4.10 API Logging and Monitoring"]
S16_4_11["16.4.11 API Threat Detection"]
S16_4_12["16.4.12 API Version Management"]
S16_4_13["16.4.13 Importance of Secure API Architecture"]
S16_4_2["16.4.2 API Architecture Overview"]
S16_4_3["16.4.3 API Gateway Security"]
S16_4_4["16.4.4 Authentication Mechanisms"]
S16_4_5["16.4.5 Authorization Controls"]
S16_4_6["16.4.6 API Request Validation"]
S16_4_7["16.4.7 Rate Limiting"]
S16_4_8["16.4.8 API Encryption"]
S16_4_9["16.4.9 Internal API Security"]
S16_5_1["16.5.1 Purpose of Model Security"]
S16_5_10["16.5.10 Model Input Validation"]
S16_5_11["16.5.11 Model Monitoring for Security"]
S16_5_12["16.5.12 Model Version Control"]
S16_5_13["16.5.13 Importance of Model Security"]
S16_5_2["16.5.2 Scope of Model Security"]
S16_5_3["16.5.3 Model Artifact Protection"]
S16_5_4["16.5.4 Secure Model Repository"]
S16_5_5["16.5.5 Model Access Control"]
S16_5_6["16.5.6 Secure Model Deployment"]
S16_5_7["16.5.7 Model Integrity Verification"]
S16_5_8["16.5.8 Inference Endpoint Protection"]
S16_5_9["16.5.9 Model Abuse Prevention"]
S16_6_1["16.6.1 Purpose of Secure Document Handling"]
S16_6_10["16.6.10 Secure Document Deletion"]
S16_6_11["16.6.11 Document Access Logging"]
S16_6_12["16.6.12 Monitoring and Threat Detection"]
S16_6_13["16.6.13 Importance of Secure Document Handling"]
S16_6_2["16.6.2 Document Lifecycle Overview"]
S16_6_3["16.6.3 Secure Document Upload"]
S16_6_4["16.6.4 Document Validation"]
S16_6_5["16.6.5 Secure Document Storage"]
S16_6_6["16.6.6 Document Access Control"]
S16_6_7["16.6.7 Secure Document Processing"]
S16_6_8["16.6.8 Temporary Data Handling"]
S16_6_9["16.6.9 Document Retention Policies"]
S16_7_1["16.7.1 Purpose of Data Privacy Architecture"]
S16_7_10["16.7.10 Data Retention and Deletion"]
S16_7_11["16.7.11 Privacy Monitoring"]
S16_7_12["16.7.12 Privacy Incident Handling"]
S16_7_13["16.7.13 Importance of Data Privacy Architecture"]
S16_7_2["16.7.2 Privacy Design Principles"]
S16_7_3["16.7.3 Data Minimization"]
S16_7_4["16.7.4 Data Classification"]
S16_7_5["16.7.5 Personal Data Protection"]
S16_7_6["16.7.6 Data Anonymization"]
S16_7_7["16.7.7 Pseudonymization"]
S16_7_8["16.7.8 Consent Management"]
S16_7_9["16.7.9 Data Access Transparency"]
S16_8_1["16.8.1 Purpose of Threat Mitigation"]
S16_8_10["16.8.10 Security Alerting"]
S16_8_11["16.8.11 Incident Response Coordination"]
S16_8_12["16.8.12 Continuous Security Improvement"]
S16_8_13["16.8.13 Importance of Threat Mitigation"]
S16_8_2["16.8.2 Threat Categories"]
S16_8_3["16.8.3 Threat Detection Architecture"]
S16_8_4["16.8.4 Intrusion Detection"]
S16_8_5["16.8.5 API Threat Mitigation"]
S16_8_6["16.8.6 Data Exfiltration Prevention"]
S16_8_7["16.8.7 Infrastructure Protection"]
S16_8_8["16.8.8 AI System Threat Mitigation"]
S16_8_9["16.8.9 Threat Intelligence Integration"]
S17_1_1["17.1.1 Concept of Autonomous Financial Agents"]
S17_1_10["17.1.10 Infrastructure Requirements"]
S17_1_11["17.1.11 Scalability Considerations"]
S17_1_12["17.1.12 Importance of Autonomous Financial Agents"]
S17_1_2["17.1.2 Agent Operational Model"]
S17_1_3["17.1.3 Agent Monitoring Capabilities"]
S17_1_4["17.1.4 Agent Decision Framework"]
S17_1_5["17.1.5 Agent Insight Generation"]
S17_1_6["17.1.6 Agent Interaction with Recommendation Engine"]
S17_1_7["17.1.7 User Notification Systems"]
S17_1_8["17.1.8 Agent Safety Controls"]
S17_1_9["17.1.9 Agent Learning Capabilities"]
S17_2_1["17.2.1 Concept of AI Portfolio Managers"]
S17_2_10["17.2.10 Market Awareness Integration"]
S17_2_11["17.2.11 Continuous Portfolio Intelligence"]
S17_2_12["17.2.12 Interaction with Recommendation Engine"]
S17_2_13["17.2.13 Importance of AI Portfolio Managers"]
S17_2_2["17.2.2 Portfolio Monitoring Architecture"]
S17_2_3["17.2.3 Portfolio Composition Analysis"]
S17_2_4["17.2.4 Risk Exposure Analysis"]
S17_2_5["17.2.5 Performance Monitoring"]
S17_2_6["17.2.6 Benchmark Comparison"]
S17_2_7["17.2.7 Portfolio Optimization"]
S17_2_8["17.2.8 Rebalancing Recommendations"]
S17_2_9["17.2.9 Tax-Aware Portfolio Analysis"]
S17_3_1["17.3.1 Concept of Predictive Market Intelligence"]
S17_3_10["17.3.10 Market Signal Interpretation"]
S17_3_11["17.3.11 System Safety Considerations"]
S17_3_12["17.3.12 Continuous Model Evaluation"]
S17_3_13["17.3.13 Importance of Predictive Market Intelligence"]
S17_3_2["17.3.2 Market Data Inputs"]
S17_3_3["17.3.3 Market Data Processing"]
S17_3_4["17.3.4 Predictive Modeling Framework"]
S17_3_5["17.3.5 Time-Series Forecasting"]
S17_3_6["17.3.6 Sector Trend Analysis"]
S17_3_7["17.3.7 Risk Signal Detection"]
S17_3_8["17.3.8 Integration with Portfolio Intelligence"]
S17_3_9["17.3.9 Scenario Simulation"]
S17_4_1["17.4.1 Concept of Automated Portfolio Rebalancing"]
S17_4_10["17.4.10 User Authorization for Rebalancing"]
S17_4_11["17.4.11 Continuous Portfolio Monitoring"]
S17_4_12["17.4.12 Scalability Considerations"]
S17_4_13["17.4.13 Importance of Automated Portfolio Rebalancing"]
S17_4_2["17.4.2 Portfolio Allocation Targets"]
S17_4_3["17.4.3 Portfolio Allocation Monitoring"]
S17_4_4["17.4.4 Allocation Drift Detection"]
S17_4_5["17.4.5 Rebalancing Thresholds"]
S17_4_6["17.4.6 Rebalancing Recommendation Generation"]
S17_4_7["17.4.7 Integration with Recommendation Engine"]
S17_4_8["17.4.8 Transaction Impact Evaluation"]
S17_4_9["17.4.9 Tax-Aware Rebalancing"]
S17_5_1["17.5.1 Concept of Personalized Financial Planning"]
S17_5_10["17.5.10 Adaptive Planning"]
S17_5_11["17.5.11 Integration with Platform Systems"]
S17_5_12["17.5.12 User Experience Integration"]
S17_5_13["17.5.13 Importance of Personalized Financial Planning"]
S17_5_2["17.5.2 Financial Profile Inputs"]
S17_5_3["17.5.3 Financial Goal Definition"]
S17_5_4["17.5.4 Financial Timeline Modeling"]
S17_5_5["17.5.5 Cash Flow Analysis"]
S17_5_6["17.5.6 Investment Planning Strategy"]
S17_5_7["17.5.7 Risk Management Integration"]
S17_5_8["17.5.8 Scenario Simulation"]
S17_5_9["17.5.9 Progress Monitoring"]
S17_6_1["17.6.1 Concept of Multi Agent Financial Systems"]
S17_6_10["17.6.10 Learning and Adaptation"]
S17_6_11["17.6.11 Infrastructure Requirements"]
S17_6_12["17.6.12 Scalability Considerations"]
S17_6_13["17.6.13 Importance of Multi Agent Financial Systems"]
S17_6_2["17.6.2 Agent Specialization"]
S17_6_3["17.6.3 Agent Communication Framework"]
S17_6_4["17.6.4 Shared Financial Context"]
S17_6_5["17.6.5 Agent Orchestration Layer"]
S17_6_6["17.6.6 Agent Task Execution"]
S17_6_7["17.6.7 Multi Agent Collaboration"]
S17_6_8["17.6.8 Conflict Resolution"]
S17_6_9["17.6.9 Agent Memory Systems"]
S17_7_1["17.7.1 Concept of Reinforcement Learning in Portfolio Management"]
S17_7_10["17.7.10 Risk Constraints"]
S17_7_11["17.7.11 Model Evaluation"]
S17_7_12["17.7.12 Operational Considerations"]
S17_7_13["17.7.13 Importance of Reinforcement Learning Portfolio Models"]
S17_7_2["17.7.2 Reinforcement Learning Framework"]
S17_7_3["17.7.3 Portfolio Environment Representation"]
S17_7_4["17.7.4 State Representation"]
S17_7_5["17.7.5 Action Space"]
S17_7_6["17.7.6 Reward Function Design"]
S17_7_7["17.7.7 Training Process"]
S17_7_8["17.7.8 Exploration and Exploitation"]
S17_7_9["17.7.9 Integration with Portfolio Intelligence"]
S17_8_1["17.8.1 Concept of Self Improving Financial AI"]
S17_8_10["17.8.10 Safety and Governance"]
S17_8_11["17.8.11 Infrastructure Requirements"]
S17_8_12["17.8.12 Scalability Considerations"]
S17_8_13["17.8.13 Importance of Self Improving Financial AI"]
S17_8_2["17.8.2 Feedback Driven Learning"]
S17_8_3["17.8.3 Recommendation Outcome Tracking"]
S17_8_4["17.8.4 Model Performance Monitoring"]
S17_8_5["17.8.5 Data Driven Model Updates"]
S17_8_6["17.8.6 Continuous Learning Pipeline"]
S17_8_7["17.8.7 Human Oversight"]
S17_8_8["17.8.8 Model Drift Detection"]
S17_8_9["17.8.9 Learning from User Behavior"]
S1_2_1["1.2.1 Core Objectives of the Platform"]
S1_2_2["1.2.2 Intelligence Layer within the Multiplus Platform"]
S1_2_3["1.2.3 Long-Term System Vision"]
S1_3_1["1.3.1 In-Scope Capabilities"]
S1_3_2["1.3.2 Out-of-Scope Capabilities"]
S1_3_3["1.3.3 Scope Boundary Summary"]
S1_4_1["1.4.1 Platform Architects"]
S1_4_2["1.4.2 AI Engineers"]
S1_4_3["1.4.3 Backend Engineers"]
S1_4_4["1.4.4 Data Engineers"]
S1_4_5["1.4.5 Fintech Product Teams"]
S1_4_6["1.4.6 Collaborative Use Across Teams"]
S1_5_1["1.5.1 Autonomous Financial Intelligence"]
S1_5_2["1.5.2 Automated Portfolio Insights"]
S1_5_3["1.5.3 AI-Driven Financial Advisory"]
S1_5_4["1.5.4 Scalable Recommendation Infrastructure"]
S1_5_5["1.5.5 Evolution Toward Intelligent Financial Platforms"]
S2_1_1["2.1.1 Traditional Financial Advisory Workflow"]
S2_1_2["2.1.2 Limited Scalability"]
S2_1_3["2.1.3 Heavy Dependence on Manual Processes"]
S2_1_4["2.1.4 Limited Personalization at Scale"]
S2_1_5["2.1.5 Fragmented Financial Data Sources"]
S2_1_6["2.1.6 Limited Analytical Depth"]
S2_1_7["2.1.7 Lack of Continuous Financial Intelligence"]
S2_1_8["2.1.8 Motivation for AI-Driven Financial Intelligence"]
S2_2_1["2.2.1 Growth of Financial Data"]
S2_2_2["2.2.2 Complexity of Modern Investment Products"]
S2_2_3["2.2.3 Increasing Demand for Personalization"]
S2_2_4["2.2.4 Continuous Financial Monitoring"]
S2_2_5["2.2.5 Interpretation of Unstructured Financial Data"]
S2_2_6["2.2.6 Scalable Financial Advisory Infrastructure"]
S2_2_7["2.2.7 Enhanced Analytical Depth"]
S2_2_8["2.2.8 Foundation for Intelligent Financial Platforms"]
S2_3_1["2.3.1 Unstructured Financial Documents"]
S2_3_2["2.3.2 Inconsistent Financial Data Formats"]
S2_3_3["2.3.3 Fragmented Financial Systems"]
S2_3_4["2.3.4 Data Quality and Reliability Issues"]
S2_3_5["2.3.5 Financial Entity Identification"]
S2_3_6["2.3.6 Temporal Data Challenges"]
S2_3_7["2.3.7 Need for Advanced Financial Data Infrastructure"]
S2_4_1["2.4.1 Automation in Financial Data Processing"]
S2_4_2["2.4.2 Automated Financial Analysis"]
S2_4_3["2.4.3 Continuous Portfolio Monitoring"]
S2_4_4["2.4.4 Automated Product Evaluation"]
S2_4_5["2.4.5 Automated Recommendation Generation"]
S2_4_6["2.4.6 Consistency and Standardization"]
S2_4_7["2.4.7 Scalability of Financial Intelligence"]
S2_4_8["2.4.8 Foundation for Intelligent Financial Systems"]
S3_1_1["3.1.1 User Platform"]
S3_1_2["3.1.2 Investment Services"]
S3_1_3["3.1.3 Integrations with Financial Providers"]
S3_1_4["3.1.4 Backend Platform Services"]
S3_1_5["3.1.5 Integration with the AI Financial Intelligence Platform"]
S3_1_6["3.1.6 Platform as a Financial Intelligence Ecosystem"]
S3_2_1["3.2.1 Position of the AI Platform in the System Architecture"]
S3_2_10["3.2.10 Intelligence as a Platform Service"]
S3_2_11["3.2.11 Enabling Data-Driven Financial Services"]
S3_2_2["3.2.2 Core Responsibilities of the AI Platform"]
S3_2_3["3.2.3 Financial Data Interpretation"]
S3_2_4["3.2.4 Construction of User Financial Profiles"]
S3_2_5["3.2.5 Portfolio Intelligence and Investment Analysis"]
S3_2_6["3.2.6 Financial Product Evaluation"]
S3_2_7["3.2.7 Recommendation Generation"]
S3_2_8["3.2.8 Financial Document Intelligence"]
S3_2_9["3.2.9 AI Agent-Based Reasoning Layer"]
S3_3_1["3.3.1 Conceptual Architecture Overview"]
S3_3_2["3.3.2 User Layer"]
S3_3_3["3.3.3 Platform Services Layer"]
S3_3_4["3.3.4 AI Financial Intelligence Layer"]
S3_3_5["3.3.5 Data Infrastructure Layer"]
S3_3_6["3.3.6 External Data Sources"]
S3_3_7["3.3.7 End-to-End Data and Intelligence Flow"]
S3_3_8["3.3.8 Benefits of the Layered Architecture"]
S3_4_1["3.4.1 Financial Data Processing"]
S3_4_2["3.4.2 Portfolio Intelligence"]
S3_4_3["3.4.3 Financial Product Recommendation"]
S3_4_4["3.4.4 Financial Document Understanding"]
S3_4_5["3.4.5 Integrated Financial Intelligence"]
S4_1_1["4.1.1 Architectural Design Principles"]
S4_1_2["4.1.2 High-Level Platform Architecture"]
S4_1_3["4.1.3 End-to-End System Flow"]
S4_1_4["4.1.4 User Interaction Flow"]
S4_1_5["4.1.5 Financial Data Flow"]
S4_1_6["4.1.6 AI Intelligence Processing"]
S4_1_7["4.1.7 Data Infrastructure Architecture"]
S4_1_8["4.1.8 External Integration Layer"]
S4_1_9["4.1.9 Architectural Benefits"]
S4_2_1["4.2.1 User Layer"]
S4_2_2["4.2.2 Platform Layer"]
S4_2_3["4.2.3 AI Intelligence Layer"]
S4_2_4["4.2.4 Data Infrastructure Layer"]
S4_2_5["4.2.5 External Integrations"]
S4_2_6["4.2.6 Layer Interaction Model"]
S5_1_1["5.1.1 Role of the AI Platform"]
S5_1_2["5.1.2 Position in the Multiplus Architecture"]
S5_1_3["5.1.3 Core Functional Modules"]
S5_1_4["5.1.4 Integration with AI Models"]
S5_1_5["5.1.5 Data-Driven Intelligence Workflow"]
S5_1_6["5.1.6 AI Platform as an Intelligence Service"]
S5_1_7["5.1.7 Design Goals of the AI Platform"]
S5_2_1["5.2.1 Financial Data Interpretation"]
S5_2_2["5.2.2 User Financial Profile Construction"]
S5_2_3["5.2.3 Portfolio Intelligence Generation"]
S5_2_4["5.2.4 Financial Product Evaluation"]
S5_2_5["5.2.5 Recommendation Generation"]
S5_2_6["5.2.6 Financial Document Understanding"]
S5_2_7["5.2.7 Explainability and Reasoning Support"]
S5_2_8["5.2.8 Continuous Financial Intelligence Generation"]
S5_3_1["5.3.1 Purpose of the Module"]
S5_3_2["5.3.2 Role in the AI Platform"]
S5_3_3["5.3.3 Data Inputs"]
S5_3_4["5.3.4 Data Outputs"]
S5_3_5["5.3.5 Internal Components"]
S5_3_6["5.3.6 Data Extraction Workflow"]
S5_3_7["5.3.7 Design Considerations"]
S5_3_8["5.3.8 Importance in the AI Platform"]
S5_4_1["5.4.1 Purpose of the Module"]
S5_4_2["5.4.2 Role in the AI Platform Pipeline"]
S5_4_3["5.4.3 Data Inputs"]
S5_4_4["5.4.4 Data Outputs"]
S5_4_5["5.4.5 Internal Components"]
S5_4_6["5.4.6 Data Enrichment Workflow"]
S5_4_7["5.4.7 Design Considerations"]
S5_4_8["5.4.8 Importance in the AI Platform"]
S5_5_1["5.5.1 Purpose of the Module"]
S5_5_2["5.5.2 Role in the AI Platform Pipeline"]
S5_5_3["5.5.3 Data Inputs"]
S5_5_4["5.5.4 Data Outputs"]
S5_5_5["5.5.5 Internal Components"]
S5_5_6["5.5.6 Data Ingestion Workflow"]
S5_5_7["5.5.7 Design Considerations"]
S5_5_8["5.5.8 Importance in the AI Platform"]
S5_6_1["5.6.1 Purpose of the Module"]
S5_6_2["5.6.2 Role in the AI Platform Pipeline"]
S5_6_3["5.6.3 Data Inputs"]
S5_6_4["5.6.4 Data Outputs"]
S5_6_5["5.6.5 Internal Components"]
S5_6_6["5.6.6 Data Management Workflow"]
S5_6_7["5.6.7 Design Considerations"]
S5_6_8["5.6.8 Importance in the AI Platform"]
S5_7_1["5.7.1 Purpose of the Module"]
S5_7_2["5.7.2 Role in the AI Platform Pipeline"]
S5_7_3["5.7.3 Document Inputs"]
S5_7_4["5.7.4 Data Outputs"]
S5_7_5["5.7.5 Internal Components"]
S5_7_6["5.7.6 Document Processing Workflow"]
S5_7_7["5.7.7 Design Considerations"]
S5_7_8["5.7.8 Importance in the AI Platform"]
S5_8_1["5.8.1 Purpose of the Module"]
S5_8_2["5.8.2 Role in the AI Platform Pipeline"]
S5_8_3["5.8.3 Data Inputs"]
S5_8_4["5.8.4 Data Outputs"]
S5_8_5["5.8.5 Internal Components"]
S5_8_6["5.8.6 Recommendation Workflow"]
S5_8_7["5.8.7 Design Considerations"]
S5_8_8["5.8.8 Importance in the AI Platform"]
S6_1_1["6.1.1 Categories of Financial Data Sources"]
S6_1_10["6.1.10 Importance of Diverse Financial Data Sources"]
S6_1_2["6.1.2 Banking and Transaction Data"]
S6_1_3["6.1.3 Investment Portfolio Data"]
S6_1_4["6.1.4 Financial Product Data"]
S6_1_5["6.1.5 Market Benchmark Data"]
S6_1_6["6.1.6 Financial Document Data"]
S6_1_7["6.1.7 Internally Derived Financial Data"]
S6_1_8["6.1.8 Data Source Integration Architecture"]
S6_1_9["6.1.9 Data Source Reliability Considerations"]
S6_2_1["6.2.1 Categories of Internal Platform Data"]
S6_2_10["6.2.10 Importance of Internal Data Sources"]
S6_2_2["6.2.2 User Profile Data"]
S6_2_3["6.2.3 Financial Behavior Datasets"]
S6_2_4["6.2.4 Portfolio Intelligence Datasets"]
S6_2_5["6.2.5 Financial Product Datasets"]
S6_2_6["6.2.6 Recommendation and Analytics Datasets"]
S6_2_7["6.2.7 Operational System Metadata"]
S6_2_8["6.2.8 Internal Data Relationships"]
S6_2_9["6.2.9 Data Governance for Internal Data"]
S6_3_1["6.3.1 Categories of External Financial Data Providers"]
S6_3_10["6.3.10 Importance of External Financial Data"]
S6_3_2["6.3.2 Banking and Financial Account Providers"]
S6_3_3["6.3.3 Investment and Asset Management Providers"]
S6_3_4["6.3.4 Market Data Providers"]
S6_3_5["6.3.5 Financial Data Aggregators"]
S6_3_6["6.3.6 Regulatory and Industry Data Sources"]
S6_3_7["6.3.7 Data Access Mechanisms"]
S6_3_8["6.3.8 Data Integration Architecture"]
S6_3_9["6.3.9 Data Reliability and Validation"]
S6_4_1["6.4.1 Purpose of Data Ingestion Pipelines"]
S6_4_10["6.4.10 Design Considerations"]
S6_4_11["6.4.11 Importance in the Data Architecture"]
S6_4_2["6.4.2 Role in the Data Architecture"]
S6_4_3["6.4.3 Types of Ingestion Pipelines"]
S6_4_4["6.4.4 Batch Data Ingestion"]
S6_4_5["6.4.5 Streaming Data Ingestion"]
S6_4_6["6.4.6 Event-Driven Data Ingestion"]
S6_4_7["6.4.7 Document Ingestion Pipelines"]
S6_4_8["6.4.8 Ingestion Pipeline Components"]
S6_4_9["6.4.9 Data Ingestion Workflow"]
S6_5_1["6.5.1 Purpose of Data Validation"]
S6_5_10["6.5.10 Error Handling and Recovery"]
S6_5_11["6.5.11 Data Traceability"]
S6_5_12["6.5.12 Design Considerations"]
S6_5_13["6.5.13 Importance in the Data Architecture"]
S6_5_2["6.5.2 Role in the Data Pipeline"]
S6_5_3["6.5.3 Types of Data Validation Checks"]
S6_5_4["6.5.4 Schema Validation"]
S6_5_5["6.5.5 Completeness Checks"]
S6_5_6["6.5.6 Value Validation"]
S6_5_7["6.5.7 Consistency Checks"]
S6_5_8["6.5.8 Anomaly Detection"]
S6_5_9["6.5.9 Data Quality Monitoring"]
S6_6_1["6.6.1 Objectives of the Storage Strategy"]
S6_6_10["6.6.10 Data Lifecycle Management"]
S6_6_11["6.6.11 Design Considerations"]
S6_6_12["6.6.12 Importance in the Data Architecture"]
S6_6_2["6.6.2 Storage Architecture Overview"]
S6_6_3["6.6.3 Raw Data Storage (Data Lake)"]
S6_6_4["6.6.4 Processed Financial Data Storage"]
S6_6_5["6.6.5 Time-Series Financial Data Storage"]
S6_6_6["6.6.6 Machine Learning Feature Store"]
S6_6_7["6.6.7 Vector Database Storage"]
S6_6_8["6.6.8 Document Storage"]
S6_6_9["6.6.9 Data Access Layer"]
S6_7_1["6.7.1 Purpose of the Data Lake"]
S6_7_10["6.7.10 Design Considerations"]
S6_7_11["6.7.11 Importance in the Data Architecture"]
S6_7_2["6.7.2 Role in the Data Architecture"]
S6_7_3["6.7.3 Types of Data Stored in the Data Lake"]
S6_7_4["6.7.4 Data Lake Storage Structure"]
S6_7_5["6.7.5 Data Partitioning Strategy"]
S6_7_6["6.7.6 Data Format Considerations"]
S6_7_7["6.7.7 Data Processing Integration"]
S6_7_8["6.7.8 Data Retention and Archival"]
S6_7_9["6.7.9 Security and Access Control"]
S6_8_1["6.8.1 Purpose of the Feature Store"]
S6_8_10["6.8.10 Design Considerations"]
S6_8_11["6.8.11 Importance in the Data Architecture"]
S6_8_2["6.8.2 Role in the Data Architecture"]
S6_8_3["6.8.3 Types of Features Stored"]
S6_8_4["6.8.4 Online and Offline Feature Storage"]
S6_8_5["6.8.5 Feature Generation Pipeline"]
S6_8_6["6.8.6 Feature Versioning"]
S6_8_7["6.8.7 Feature Metadata Management"]
S6_8_8["6.8.8 Feature Access Patterns"]
S6_8_9["6.8.9 Feature Consistency"]
S6_9_1["6.9.1 Purpose of the Vector Database"]
S6_9_10["6.9.10 Design Considerations"]
S6_9_11["6.9.11 Importance in the AI Platform"]
S6_9_2["6.9.2 Role in the AI Platform Architecture"]
S6_9_3["6.9.3 Types of Data Stored in the Vector Database"]
S6_9_4["6.9.4 Embedding Generation Pipeline"]
S6_9_5["6.9.5 Vector Indexing"]
S6_9_6["6.9.6 Semantic Retrieval Workflow"]
S6_9_7["6.9.7 Metadata Association"]
S6_9_8["6.9.8 Vector Database Access Patterns"]
S6_9_9["6.9.9 Security and Data Isolation"]
S7_10_1["7.10.1 Purpose of Financial Health Indicators"]
S7_10_10["7.10.10 Financial Stability Score"]
S7_10_11["7.10.11 Financial Health Data Model"]
S7_10_12["7.10.12 Continuous Financial Health Monitoring"]
S7_10_13["7.10.13 Importance in Financial Intelligence Systems"]
S7_10_2["7.10.2 Data Sources for Financial Health Indicators"]
S7_10_3["7.10.3 Financial Health Indicator Workflow"]
S7_10_4["7.10.4 Savings Rate Indicator"]
S7_10_5["7.10.5 Liquidity Ratio"]
S7_10_6["7.10.6 Debt Burden Ratio"]
S7_10_7["7.10.7 Expense Stability Indicator"]
S7_10_8["7.10.8 Net Worth Indicator"]
S7_10_9["7.10.9 Investment Capacity Indicator"]
S7_1_1["7.1.1 Purpose of Financial Data Models"]
S7_1_10["7.1.10 Relationships Between Data Models"]
S7_1_11["7.1.11 Data Model Governance"]
S7_1_12["7.1.12 Importance in Financial Data Processing"]
S7_1_2["7.1.2 Financial Entity Types"]
S7_1_3["7.1.3 User Financial Entity Model"]
S7_1_4["7.1.4 Financial Account Model"]
S7_1_5["7.1.5 Transaction Data Model"]
S7_1_6["7.1.6 Financial Asset Model"]
S7_1_7["7.1.7 Investment Portfolio Model"]
S7_1_8["7.1.8 Financial Product Model"]
S7_1_9["7.1.9 Financial Institution Model"]
S7_2_1["7.2.1 Purpose of the Financial Profile"]
S7_2_10["7.2.10 Investment Behavior Signals"]
S7_2_11["7.2.11 Financial Profile Data Model"]
S7_2_12["7.2.12 Profile Update Mechanisms"]
S7_2_13["7.2.13 Profile Storage and Access"]
S7_2_14["7.2.14 Importance in Financial Intelligence Systems"]
S7_2_2["7.2.2 Data Sources for Financial Profile Construction"]
S7_2_3["7.2.3 Financial Profile Construction Workflow"]
S7_2_4["7.2.4 Financial Profile Components"]
S7_2_5["7.2.5 Income Estimation"]
S7_2_6["7.2.6 Spending Behavior Analysis"]
S7_2_7["7.2.7 Savings and Liquidity Indicators"]
S7_2_8["7.2.8 Portfolio Characteristics"]
S7_2_9["7.2.9 Financial Stability Indicators"]
S7_3_1["7.3.1 Purpose of Portfolio Data Models"]
S7_3_10["7.3.10 Portfolio Risk Exposure Indicators"]
S7_3_11["7.3.11 Portfolio Data Processing Workflow"]
S7_3_12["7.3.12 Portfolio Data Updates"]
S7_3_13["7.3.13 Importance in Financial Intelligence Systems"]
S7_3_2["7.3.2 Portfolio Entity Hierarchy"]
S7_3_3["7.3.3 Portfolio Model Structure"]
S7_3_4["7.3.4 Portfolio Holding Model"]
S7_3_5["7.3.5 Financial Asset Classification"]
S7_3_6["7.3.6 Asset Allocation Model"]
S7_3_7["7.3.7 Portfolio Valuation Model"]
S7_3_8["7.3.8 Portfolio Performance Model"]
S7_3_9["7.3.9 Portfolio Diversification Metrics"]
S7_4_1["7.4.1 Purpose of Transaction Data Models"]
S7_4_10["7.4.10 Transaction Processing Workflow"]
S7_4_11["7.4.11 Transaction Data Quality Considerations"]
S7_4_12["7.4.12 Importance in Financial Intelligence Systems"]
S7_4_2["7.4.2 Sources of Transaction Data"]
S7_4_3["7.4.3 Transaction Entity Model"]
S7_4_4["7.4.4 Transaction Types"]
S7_4_5["7.4.5 Transaction Categorization Model"]
S7_4_6["7.4.6 Merchant and Entity Identification"]
S7_4_7["7.4.7 Recurring Transaction Detection"]
S7_4_8["7.4.8 Transaction Aggregation Models"]
S7_4_9["7.4.9 Time-Series Transaction Data"]
S7_5_1["7.5.1 Purpose of Transaction Categorization"]
S7_5_10["7.5.10 Continuous Category Learning"]
S7_5_11["7.5.11 Importance in Financial Intelligence Systems"]
S7_5_2["7.5.2 Transaction Categorization Workflow"]
S7_5_3["7.5.3 Transaction Normalization"]
S7_5_4["7.5.4 Merchant Identification"]
S7_5_5["7.5.5 Category Classification"]
S7_5_6["7.5.6 Classification Techniques"]
S7_5_7["7.5.7 Category Hierarchy Design"]
S7_5_8["7.5.8 Handling Ambiguous Transactions"]
S7_5_9["7.5.9 Transaction Category Aggregation"]
S7_6_1["7.6.1 Purpose of Income Detection"]
S7_6_10["7.6.10 Handling Irregular Income"]
S7_6_11["7.6.11 Income Detection Data Model"]
S7_6_12["7.6.12 Continuous Income Monitoring"]
S7_6_13["7.6.13 Importance in Financial Intelligence Systems"]
S7_6_2["7.6.2 Data Sources for Income Detection"]
S7_6_3["7.6.3 Income Detection Workflow"]
S7_6_4["7.6.4 Credit Transaction Filtering"]
S7_6_5["7.6.5 Recurring Deposit Detection"]
S7_6_6["7.6.6 Employer Identification"]
S7_6_7["7.6.7 Income Classification"]
S7_6_8["7.6.8 Income Estimation Models"]
S7_6_9["7.6.9 Income Stability Indicators"]
S7_7_1["7.7.1 Purpose of Expense Detection"]
S7_7_10["7.7.10 Expense Stability Indicators"]
S7_7_11["7.7.11 Expense Detection Data Model"]
S7_7_12["7.7.12 Continuous Expense Monitoring"]
S7_7_13["7.7.13 Importance in Financial Intelligence Systems"]
S7_7_2["7.7.2 Data Sources for Expense Detection"]
S7_7_3["7.7.3 Expense Detection Workflow"]
S7_7_4["7.7.4 Debit Transaction Filtering"]
S7_7_5["7.7.5 Recurring Expense Detection"]
S7_7_6["7.7.6 Expense Categorization"]
S7_7_7["7.7.7 Monthly Expense Estimation"]
S7_7_8["7.7.8 Fixed vs Variable Expense Identification"]
S7_7_9["7.7.9 Spending Behavior Indicators"]
S7_8_1["7.8.1 Purpose of Financial Behavior Analysis"]
S7_8_10["7.8.10 Behavioral Feature Data Model"]
S7_8_11["7.8.11 Continuous Behavioral Monitoring"]
S7_8_12["7.8.12 Importance in Financial Intelligence Systems"]
S7_8_2["7.8.2 Data Sources for Behavioral Analysis"]
S7_8_3["7.8.3 Behavioral Analysis Workflow"]
S7_8_4["7.8.4 Spending Pattern Analysis"]
S7_8_5["7.8.5 Savings Behavior Analysis"]
S7_8_6["7.8.6 Spending Volatility Analysis"]
S7_8_7["7.8.7 Liquidity Behavior Indicators"]
S7_8_8["7.8.8 Investment Behavior Signals"]
S7_8_9["7.8.9 Financial Stability Indicators"]
S7_9_1["7.9.1 Purpose of Asset and Liability Detection"]
S7_9_10["7.9.10 Net Worth Estimation"]
S7_9_11["7.9.11 Asset and Liability Data Model"]
S7_9_12["7.9.12 Continuous Balance Sheet Updates"]
S7_9_13["7.9.13 Importance in Financial Intelligence Systems"]
S7_9_2["7.9.2 Financial Balance Sheet Representation"]
S7_9_3["7.9.3 Data Sources for Asset Detection"]
S7_9_4["7.9.4 Asset Categories"]
S7_9_5["7.9.5 Asset Detection Workflow"]
S7_9_6["7.9.6 Asset Valuation"]
S7_9_7["7.9.7 Liability Detection"]
S7_9_8["7.9.8 Liability Detection Techniques"]
S7_9_9["7.9.9 Liability Aggregation"]
S8_1_1["8.1.1 Role of AI Models in the Platform"]
S8_1_10["8.1.10 Model Interpretability"]
S8_1_11["8.1.11 Data Privacy and Security Requirements"]
S8_1_12["8.1.12 Real-Time Inference Requirements"]
S8_1_13["8.1.13 Model Monitoring and Maintenance"]
S8_1_14["8.1.14 Scalability Requirements"]
S8_1_15["8.1.15 Importance in the AI Architecture"]
S8_1_2["8.1.2 Categories of Models Required"]
S8_1_3["8.1.3 Classification Models"]
S8_1_4["8.1.4 Regression Models"]
S8_1_5["8.1.5 Ranking Models"]
S8_1_6["8.1.6 Clustering Models"]
S8_1_7["8.1.7 Natural Language Processing Models"]
S8_1_8["8.1.8 Large Language Models"]
S8_1_9["8.1.9 Model Accuracy Requirements"]
S8_2_1["8.2.1 Structured Financial Data Processing"]
S8_2_10["8.2.10 Scalability Across Users and Data"]
S8_2_11["8.2.11 Adaptability to Financial Domain Changes"]
S8_2_12["8.2.12 Security and Privacy Awareness"]
S8_2_13["8.2.13 Importance in the AI Architecture"]
S8_2_2["8.2.2 Unstructured Financial Document Understanding"]
S8_2_3["8.2.3 Contextual Financial Reasoning"]
S8_2_4["8.2.4 Semantic Information Retrieval"]
S8_2_5["8.2.5 Financial Recommendation Generation"]
S8_2_6["8.2.6 Financial Risk Interpretation"]
S8_2_7["8.2.7 Explainable Financial Outputs"]
S8_2_8["8.2.8 Tool Integration Capabilities"]
S8_2_9["8.2.9 Multi-Step Analytical Workflows"]
S8_3_1["8.3.1 Model Selection Principles"]
S8_3_10["8.3.10 Model Lifecycle Management"]
S8_3_11["8.3.11 Importance in the AI Architecture"]
S8_3_2["8.3.2 Task-Oriented Model Selection"]
S8_3_3["8.3.3 Structured Data Model Selection"]
S8_3_4["8.3.4 Document Intelligence Model Selection"]
S8_3_5["8.3.5 Embedding Model Selection"]
S8_3_6["8.3.6 Large Language Model Selection"]
S8_3_7["8.3.7 Hybrid Model Architecture"]
S8_3_8["8.3.8 Model Evaluation Criteria"]
S8_3_9["8.3.9 Infrastructure Compatibility"]
S8_4_1["8.4.1 Role of LLMs in the Platform"]
S8_4_10["8.4.10 Deployment Architecture"]
S8_4_11["8.4.11 Infrastructure Considerations"]
S8_4_12["8.4.12 Security and Privacy Benefits"]
S8_4_13["8.4.13 Importance in the AI Architecture"]
S8_4_2["8.4.2 Selection Criteria for Open Source LLMs"]
S8_4_3["8.4.3 Model Size Considerations"]
S8_4_4["8.4.4 LLaMA Model Family"]
S8_4_5["8.4.5 Mistral Model Family"]
S8_4_6["8.4.6 Mixtral Model Architecture"]
S8_4_7["8.4.7 Smaller Instruction-Tuned Models"]
S8_4_8["8.4.8 Domain Adaptation Considerations"]
S8_4_9["8.4.9 Retrieval-Augmented Generation Integration"]
S8_5_1["8.5.1 Purpose of Model Evaluation"]
S8_5_10["8.5.10 Security and Privacy Compliance"]
S8_5_11["8.5.11 Human Review and Validation"]
S8_5_12["8.5.12 Continuous Evaluation in Production"]
S8_5_13["8.5.13 Importance in the AI Architecture"]
S8_5_2["8.5.2 Evaluation Pipeline"]
S8_5_3["8.5.3 Predictive Accuracy"]
S8_5_4["8.5.4 Ranking Performance"]
S8_5_5["8.5.5 Model Interpretability"]
S8_5_6["8.5.6 Robustness and Stability"]
S8_5_7["8.5.7 Data Drift Sensitivity"]
S8_5_8["8.5.8 Latency and Inference Performance"]
S8_5_9["8.5.9 Resource Efficiency"]
S8_6_1["8.6.1 Objectives of the Deployment Strategy"]
S8_6_10["8.6.10 Monitoring and Logging"]
S8_6_11["8.6.11 A/B Testing and Controlled Rollouts"]
S8_6_12["8.6.12 Security Considerations"]
S8_6_13["8.6.13 Importance in the AI Architecture"]
S8_6_2["8.6.2 Model Deployment Architecture"]
S8_6_3["8.6.3 Model Serving Infrastructure"]
S8_6_4["8.6.4 Real-Time Inference Services"]
S8_6_5["8.6.5 Batch Processing Models"]
S8_6_6["8.6.6 Large Language Model Deployment"]
S8_6_7["8.6.7 Containerized Model Deployment"]
S8_6_8["8.6.8 Model Versioning"]
S8_6_9["8.6.9 Model Registry"]
S8_7_1["8.7.1 Infrastructure Layers for AI Workloads"]
S8_7_10["8.7.10 Infrastructure Scaling Strategy"]
S8_7_11["8.7.11 Cost Optimization Considerations"]
S8_7_12["8.7.12 Security and Compliance Infrastructure"]
S8_7_13["8.7.13 Importance in the AI Platform"]
S8_7_2["8.7.2 Compute Requirements for Different Model Types"]
S8_7_3["8.7.3 GPU Requirements for Large Language Models"]
S8_7_4["8.7.4 GPU Utilization Strategy"]
S8_7_5["8.7.5 CPU Infrastructure"]
S8_7_6["8.7.6 Memory Requirements"]
S8_7_7["8.7.7 Storage Infrastructure"]
S8_7_8["8.7.8 Model Serving Infrastructure"]
S8_7_9["8.7.9 Distributed Processing Infrastructure"]
S8_8_1["8.8.1 Objectives of Model Optimization"]
S8_8_10["8.8.10 Parallel Processing"]
S8_8_11["8.8.11 Adaptive Model Selection"]
S8_8_12["8.8.12 Continuous Performance Monitoring"]
S8_8_13["8.8.13 Importance in the AI Architecture"]
S8_8_2["8.8.2 Inference Latency Optimization"]
S8_8_3["8.8.3 Model Compression Techniques"]
S8_8_4["8.8.4 Quantization"]
S8_8_5["8.8.5 Efficient Feature Retrieval"]
S8_8_6["8.8.6 Batch Inference Optimization"]
S8_8_7["8.8.7 GPU Utilization Optimization"]
S8_8_8["8.8.8 Caching Strategies"]
S8_8_9["8.8.9 Retrieval-Augmented Optimization"]
S9_10_1["9.10.1 Purpose of Failure Handling"]
S9_10_10["9.10.10 Partial Result Handling"]
S9_10_11["9.10.11 Structured Error Responses"]
S9_10_12["9.10.12 Logging and Diagnostics"]
S9_10_13["9.10.13 Alerting and Monitoring"]
S9_10_14["9.10.14 Importance in the Agent Architecture"]
S9_10_2["9.10.2 Types of Agent Failures"]
S9_10_3["9.10.3 Data Retrieval Failures"]
S9_10_4["9.10.4 Tool Execution Failures"]
S9_10_5["9.10.5 Model Inference Failures"]
S9_10_6["9.10.6 Context Construction Failures"]
S9_10_7["9.10.7 Error Detection Mechanisms"]
S9_10_8["9.10.8 Retry Strategies"]
S9_10_9["9.10.9 Fallback Mechanisms"]
S9_1_1["9.1.1 Definition of an AI Agent"]
S9_1_10["9.1.10 Agent Memory and Context"]
S9_1_11["9.1.11 Scalability of Agent Systems"]
S9_1_12["9.1.12 Importance in the AI Architecture"]
S9_1_2["9.1.2 Role of AI Agents in the Platform"]
S9_1_3["9.1.3 Motivation for an Agent-Based Architecture"]
S9_1_4["9.1.4 Agent Interaction with System Components"]
S9_1_5["9.1.5 Agent Reasoning Workflow"]
S9_1_6["9.1.6 Types of AI Agents in the Platform"]
S9_1_7["9.1.7 Agent Interaction with Large Language Models"]
S9_1_8["9.1.8 Tool-Based Agent Architecture"]
S9_1_9["9.1.9 Event-Driven Agent Execution"]
S9_2_1["9.2.1 Request Interpretation"]
S9_2_10["9.2.10 Logging and Audit Tracking"]
S9_2_11["9.2.11 Error Handling and Recovery"]
S9_2_12["9.2.12 Continuous Learning and Feedback"]
S9_2_13["9.2.13 Importance in the Agent Architecture"]
S9_2_2["9.2.2 Context Retrieval"]
S9_2_3["9.2.3 Tool Invocation"]
S9_2_4["9.2.4 Model Execution Coordination"]
S9_2_5["9.2.5 Multi-Step Workflow Orchestration"]
S9_2_6["9.2.6 Information Synthesis"]
S9_2_7["9.2.7 Explanation Generation"]
S9_2_8["9.2.8 Validation and Suitability Checks"]
S9_2_9["9.2.9 Output Structuring"]
S9_3_1["9.3.1 Concept of Tool-Based Agents"]
S9_3_10["9.3.10 Tool Invocation Workflow"]
S9_3_11["9.3.11 Tool Output Integration"]
S9_3_12["9.3.12 Tool Security and Access Control"]
S9_3_13["9.3.13 Advantages of Tool-Based Architecture"]
S9_3_14["9.3.14 Importance in the AI Architecture"]
S9_3_2["9.3.2 Motivation for Tool-Based Architecture"]
S9_3_3["9.3.3 Tool Categories in the Platform"]
S9_3_4["9.3.4 Financial Data Retrieval Tools"]
S9_3_5["9.3.5 Analytical Computation Tools"]
S9_3_6["9.3.6 Financial Product Analysis Tools"]
S9_3_7["9.3.7 Document Intelligence Tools"]
S9_3_8["9.3.8 Vector Retrieval Tools"]
S9_3_9["9.3.9 Tool Interface Design"]
S9_4_1["9.4.1 Purpose of the Context Builder"]
S9_4_10["9.4.10 Context Validation"]
S9_4_11["9.4.11 Context Reusability"]
S9_4_12["9.4.12 Security Considerations"]
S9_4_13["9.4.13 Importance in the Agent Architecture"]
S9_4_2["9.4.2 Role in the Agent Architecture"]
S9_4_3["9.4.3 Context Sources"]
S9_4_4["9.4.4 Types of Context Data"]
S9_4_5["9.4.5 Context Construction Workflow"]
S9_4_6["9.4.6 Context Object Structure"]
S9_4_7["9.4.7 Context Filtering and Prioritization"]
S9_4_8["9.4.8 Context Window Management"]
S9_4_9["9.4.9 Retrieval-Augmented Context"]
S9_5_1["9.5.1 Purpose of Prompt Generation"]
S9_5_10["9.5.10 Context Window Optimization"]
S9_5_11["9.5.11 Prompt Validation"]
S9_5_12["9.5.12 Prompt Version Management"]
S9_5_13["9.5.13 Security Considerations"]
S9_5_14["9.5.14 Importance in the Agent Architecture"]
S9_5_2["9.5.2 Role in the Agent Workflow"]
S9_5_3["9.5.3 Prompt Components"]
S9_5_4["9.5.4 System Instructions"]
S9_5_5["9.5.5 Task Definition"]
S9_5_6["9.5.6 Context Injection"]
S9_5_7["9.5.7 Output Format Instructions"]
S9_5_8["9.5.8 Prompt Templates"]
S9_5_9["9.5.9 Dynamic Prompt Construction"]
S9_6_1["9.6.1 Purpose of the Tool Invocation Layer"]
S9_6_10["9.6.10 Output Standardization"]
S9_6_11["9.6.11 Security and Access Control"]
S9_6_12["9.6.12 Monitoring and Logging"]
S9_6_13["9.6.13 Importance in the Agent Architecture"]
S9_6_2["9.6.2 Role in the Agent Workflow"]
S9_6_3["9.6.3 Tool Invocation Architecture"]
S9_6_4["9.6.4 Tool Registry"]
S9_6_5["9.6.5 Tool Input Validation"]
S9_6_6["9.6.6 Tool Execution Workflow"]
S9_6_7["9.6.7 Integration with Platform Services"]
S9_6_8["9.6.8 Asynchronous Tool Execution"]
S9_6_9["9.6.9 Error Handling"]
S9_7_1["9.7.1 Purpose of Output Structuring"]
S9_7_10["9.7.10 Output Validation"]
S9_7_11["9.7.11 Output Logging and Traceability"]
S9_7_12["9.7.12 Error Output Handling"]
S9_7_13["9.7.13 Importance in the Agent Architecture"]
S9_7_2["9.7.2 Role in the Agent Workflow"]
S9_7_3["9.7.3 Components of Structured Outputs"]
S9_7_4["9.7.4 Analytical Result Representation"]
S9_7_5["9.7.5 Recommendation Outputs"]
S9_7_6["9.7.6 Explanation Outputs"]
S9_7_7["9.7.7 Supporting Metrics"]
S9_7_8["9.7.8 Output Schema Design"]
S9_7_9["9.7.9 Multi-Channel Output Delivery"]
S9_8_1["9.8.1 Purpose of Agent Memory"]
S9_8_10["9.8.10 Memory Consistency and Validation"]
S9_8_11["9.8.11 Memory and Vector Databases"]
S9_8_12["9.8.12 Security and Privacy Considerations"]
S9_8_13["9.8.13 Importance in the Agent Architecture"]
S9_8_2["9.8.2 Types of Agent Memory"]
S9_8_3["9.8.3 Short-Term Execution Memory"]
S9_8_4["9.8.4 Session Memory"]
S9_8_5["9.8.5 Long-Term Contextual Memory"]
S9_8_6["9.8.6 Memory Storage Architecture"]
S9_8_7["9.8.7 Context Retrieval from Memory"]
S9_8_8["9.8.8 Memory Data Structures"]
S9_8_9["9.8.9 Memory Expiration Policies"]
S9_9_1["9.9.1 Purpose of Agent Decision Logic"]
S9_9_10["9.9.10 Decision Logging"]
S9_9_11["9.9.11 Error Handling Decisions"]
S9_9_12["9.9.12 Learning from Feedback"]
S9_9_13["9.9.13 Importance in the Agent Architecture"]
S9_9_2["9.9.2 Role in the Agent Workflow"]
S9_9_3["9.9.3 Execution Plan Generation"]
S9_9_4["9.9.4 Rule-Based Decision Components"]
S9_9_5["9.9.5 Context-Aware Decision Making"]
S9_9_6["9.9.6 Tool Selection Logic"]
S9_9_7["9.9.7 Model Selection Logic"]
S9_9_8["9.9.8 Conditional Workflow Execution"]
S9_9_9["9.9.9 Multi-Step Decision Chains"]

Root --> P1
Root --> P2
Root --> P3
Root --> P4
Root --> P5
Root --> P6
Root --> P7
Root --> P8
Root --> P9
Root --> P10
Root --> P11
Root --> P12
Root --> P13
Root --> P14
Root --> P15
Root --> P16
Root --> P17
P1 --> S1_1
P1 --> S1_2
S1_2 --> S1_2_1
S1_2 --> S1_2_2
S1_2 --> S1_2_3
P1 --> S1_3
S1_3 --> S1_3_1
S1_3 --> S1_3_2
S1_3 --> S1_3_3
P1 --> S1_4
S1_4 --> S1_4_1
S1_4 --> S1_4_2
S1_4 --> S1_4_3
S1_4 --> S1_4_4
S1_4 --> S1_4_5
S1_4 --> S1_4_6
P1 --> S1_5
S1_5 --> S1_5_1
S1_5 --> S1_5_2
S1_5 --> S1_5_3
S1_5 --> S1_5_4
S1_5 --> S1_5_5
P2 --> S2_1
S2_1 --> S2_1_1
S2_1 --> S2_1_2
S2_1 --> S2_1_3
S2_1 --> S2_1_4
S2_1 --> S2_1_5
S2_1 --> S2_1_6
S2_1 --> S2_1_7
S2_1 --> S2_1_8
P2 --> S2_2
S2_2 --> S2_2_1
S2_2 --> S2_2_2
S2_2 --> S2_2_3
S2_2 --> S2_2_4
S2_2 --> S2_2_5
S2_2 --> S2_2_6
S2_2 --> S2_2_7
S2_2 --> S2_2_8
P2 --> S2_3
S2_3 --> S2_3_1
S2_3 --> S2_3_2
S2_3 --> S2_3_3
S2_3 --> S2_3_4
S2_3 --> S2_3_5
S2_3 --> S2_3_6
S2_3 --> S2_3_7
P2 --> S2_4
S2_4 --> S2_4_1
S2_4 --> S2_4_2
S2_4 --> S2_4_3
S2_4 --> S2_4_4
S2_4 --> S2_4_5
S2_4 --> S2_4_6
S2_4 --> S2_4_7
S2_4 --> S2_4_8
P3 --> S3_1
S3_1 --> S3_1_1
S3_1 --> S3_1_2
S3_1 --> S3_1_3
S3_1 --> S3_1_4
S3_1 --> S3_1_5
S3_1 --> S3_1_6
P3 --> S3_2
S3_2 --> S3_2_1
S3_2 --> S3_2_2
S3_2 --> S3_2_3
S3_2 --> S3_2_4
S3_2 --> S3_2_5
S3_2 --> S3_2_6
S3_2 --> S3_2_7
S3_2 --> S3_2_8
S3_2 --> S3_2_9
S3_2 --> S3_2_10
S3_2 --> S3_2_11
P3 --> S3_3
S3_3 --> S3_3_1
S3_3 --> S3_3_2
S3_3 --> S3_3_3
S3_3 --> S3_3_4
S3_3 --> S3_3_5
S3_3 --> S3_3_6
S3_3 --> S3_3_7
S3_3 --> S3_3_8
P3 --> S3_4
S3_4 --> S3_4_1
S3_4 --> S3_4_2
S3_4 --> S3_4_3
S3_4 --> S3_4_4
S3_4 --> S3_4_5
P4 --> S4_1
S4_1 --> S4_1_1
S4_1 --> S4_1_2
S4_1 --> S4_1_3
S4_1 --> S4_1_4
S4_1 --> S4_1_5
S4_1 --> S4_1_6
S4_1 --> S4_1_7
S4_1 --> S4_1_8
S4_1 --> S4_1_9
P4 --> S4_2
S4_2 --> S4_2_1
S4_2 --> S4_2_2
S4_2 --> S4_2_3
S4_2 --> S4_2_4
S4_2 --> S4_2_5
S4_2 --> S4_2_6
P5 --> S5_1
S5_1 --> S5_1_1
S5_1 --> S5_1_2
S5_1 --> S5_1_3
S5_1 --> S5_1_4
S5_1 --> S5_1_5
S5_1 --> S5_1_6
S5_1 --> S5_1_7
P5 --> S5_2
S5_2 --> S5_2_1
S5_2 --> S5_2_2
S5_2 --> S5_2_3
S5_2 --> S5_2_4
S5_2 --> S5_2_5
S5_2 --> S5_2_6
S5_2 --> S5_2_7
S5_2 --> S5_2_8
P5 --> S5_3
S5_3 --> S5_3_1
S5_3 --> S5_3_2
S5_3 --> S5_3_3
S5_3 --> S5_3_4
S5_3 --> S5_3_5
S5_3 --> S5_3_6
S5_3 --> S5_3_7
S5_3 --> S5_3_8
P5 --> S5_4
S5_4 --> S5_4_1
S5_4 --> S5_4_2
S5_4 --> S5_4_3
S5_4 --> S5_4_4
S5_4 --> S5_4_5
S5_4 --> S5_4_6
S5_4 --> S5_4_7
S5_4 --> S5_4_8
P5 --> S5_5
S5_5 --> S5_5_1
S5_5 --> S5_5_2
S5_5 --> S5_5_3
S5_5 --> S5_5_4
S5_5 --> S5_5_5
S5_5 --> S5_5_6
S5_5 --> S5_5_7
S5_5 --> S5_5_8
P5 --> S5_6
S5_6 --> S5_6_1
S5_6 --> S5_6_2
S5_6 --> S5_6_3
S5_6 --> S5_6_4
S5_6 --> S5_6_5
S5_6 --> S5_6_6
S5_6 --> S5_6_7
S5_6 --> S5_6_8
P5 --> S5_7
S5_7 --> S5_7_1
S5_7 --> S5_7_2
S5_7 --> S5_7_3
S5_7 --> S5_7_4
S5_7 --> S5_7_5
S5_7 --> S5_7_6
S5_7 --> S5_7_7
S5_7 --> S5_7_8
P5 --> S5_8
S5_8 --> S5_8_1
S5_8 --> S5_8_2
S5_8 --> S5_8_3
S5_8 --> S5_8_4
S5_8 --> S5_8_5
S5_8 --> S5_8_6
S5_8 --> S5_8_7
S5_8 --> S5_8_8
P6 --> S6_1
S6_1 --> S6_1_1
S6_1 --> S6_1_2
S6_1 --> S6_1_3
S6_1 --> S6_1_4
S6_1 --> S6_1_5
S6_1 --> S6_1_6
S6_1 --> S6_1_7
S6_1 --> S6_1_8
S6_1 --> S6_1_9
S6_1 --> S6_1_10
P6 --> S6_2
S6_2 --> S6_2_1
S6_2 --> S6_2_2
S6_2 --> S6_2_3
S6_2 --> S6_2_4
S6_2 --> S6_2_5
S6_2 --> S6_2_6
S6_2 --> S6_2_7
S6_2 --> S6_2_8
S6_2 --> S6_2_9
S6_2 --> S6_2_10
P6 --> S6_3
S6_3 --> S6_3_1
S6_3 --> S6_3_2
S6_3 --> S6_3_3
S6_3 --> S6_3_4
S6_3 --> S6_3_5
S6_3 --> S6_3_6
S6_3 --> S6_3_7
S6_3 --> S6_3_8
S6_3 --> S6_3_9
S6_3 --> S6_3_10
P6 --> S6_4
S6_4 --> S6_4_1
S6_4 --> S6_4_2
S6_4 --> S6_4_3
S6_4 --> S6_4_4
S6_4 --> S6_4_5
S6_4 --> S6_4_6
S6_4 --> S6_4_7
S6_4 --> S6_4_8
S6_4 --> S6_4_9
S6_4 --> S6_4_10
S6_4 --> S6_4_11
P6 --> S6_5
S6_5 --> S6_5_1
S6_5 --> S6_5_2
S6_5 --> S6_5_3
S6_5 --> S6_5_4
S6_5 --> S6_5_5
S6_5 --> S6_5_6
S6_5 --> S6_5_7
S6_5 --> S6_5_8
S6_5 --> S6_5_9
S6_5 --> S6_5_10
S6_5 --> S6_5_11
S6_5 --> S6_5_12
S6_5 --> S6_5_13
P6 --> S6_6
S6_6 --> S6_6_1
S6_6 --> S6_6_2
S6_6 --> S6_6_3
S6_6 --> S6_6_4
S6_6 --> S6_6_5
S6_6 --> S6_6_6
S6_6 --> S6_6_7
S6_6 --> S6_6_8
S6_6 --> S6_6_9
S6_6 --> S6_6_10
S6_6 --> S6_6_11
S6_6 --> S6_6_12
P6 --> S6_7
S6_7 --> S6_7_1
S6_7 --> S6_7_2
S6_7 --> S6_7_3
S6_7 --> S6_7_4
S6_7 --> S6_7_5
S6_7 --> S6_7_6
S6_7 --> S6_7_7
S6_7 --> S6_7_8
S6_7 --> S6_7_9
S6_7 --> S6_7_10
S6_7 --> S6_7_11
P6 --> S6_8
S6_8 --> S6_8_1
S6_8 --> S6_8_2
S6_8 --> S6_8_3
S6_8 --> S6_8_4
S6_8 --> S6_8_5
S6_8 --> S6_8_6
S6_8 --> S6_8_7
S6_8 --> S6_8_8
S6_8 --> S6_8_9
S6_8 --> S6_8_10
S6_8 --> S6_8_11
P6 --> S6_9
S6_9 --> S6_9_1
S6_9 --> S6_9_2
S6_9 --> S6_9_3
S6_9 --> S6_9_4
S6_9 --> S6_9_5
S6_9 --> S6_9_6
S6_9 --> S6_9_7
S6_9 --> S6_9_8
S6_9 --> S6_9_9
S6_9 --> S6_9_10
S6_9 --> S6_9_11
P7 --> S7_1
S7_1 --> S7_1_1
S7_1 --> S7_1_2
S7_1 --> S7_1_3
S7_1 --> S7_1_4
S7_1 --> S7_1_5
S7_1 --> S7_1_6
S7_1 --> S7_1_7
S7_1 --> S7_1_8
S7_1 --> S7_1_9
S7_1 --> S7_1_10
S7_1 --> S7_1_11
S7_1 --> S7_1_12
P7 --> S7_2
S7_2 --> S7_2_1
S7_2 --> S7_2_2
S7_2 --> S7_2_3
S7_2 --> S7_2_4
S7_2 --> S7_2_5
S7_2 --> S7_2_6
S7_2 --> S7_2_7
S7_2 --> S7_2_8
S7_2 --> S7_2_9
S7_2 --> S7_2_10
S7_2 --> S7_2_11
S7_2 --> S7_2_12
S7_2 --> S7_2_13
S7_2 --> S7_2_14
P7 --> S7_3
S7_3 --> S7_3_1
S7_3 --> S7_3_2
S7_3 --> S7_3_3
S7_3 --> S7_3_4
S7_3 --> S7_3_5
S7_3 --> S7_3_6
S7_3 --> S7_3_7
S7_3 --> S7_3_8
S7_3 --> S7_3_9
S7_3 --> S7_3_10
S7_3 --> S7_3_11
S7_3 --> S7_3_12
S7_3 --> S7_3_13
P7 --> S7_4
S7_4 --> S7_4_1
S7_4 --> S7_4_2
S7_4 --> S7_4_3
S7_4 --> S7_4_4
S7_4 --> S7_4_5
S7_4 --> S7_4_6
S7_4 --> S7_4_7
S7_4 --> S7_4_8
S7_4 --> S7_4_9
S7_4 --> S7_4_10
S7_4 --> S7_4_11
S7_4 --> S7_4_12
P7 --> S7_5
S7_5 --> S7_5_1
S7_5 --> S7_5_2
S7_5 --> S7_5_3
S7_5 --> S7_5_4
S7_5 --> S7_5_5
S7_5 --> S7_5_6
S7_5 --> S7_5_7
S7_5 --> S7_5_8
S7_5 --> S7_5_9
S7_5 --> S7_5_10
S7_5 --> S7_5_11
P7 --> S7_6
S7_6 --> S7_6_1
S7_6 --> S7_6_2
S7_6 --> S7_6_3
S7_6 --> S7_6_4
S7_6 --> S7_6_5
S7_6 --> S7_6_6
S7_6 --> S7_6_7
S7_6 --> S7_6_8
S7_6 --> S7_6_9
S7_6 --> S7_6_10
S7_6 --> S7_6_11
S7_6 --> S7_6_12
S7_6 --> S7_6_13
P7 --> S7_7
S7_7 --> S7_7_1
S7_7 --> S7_7_2
S7_7 --> S7_7_3
S7_7 --> S7_7_4
S7_7 --> S7_7_5
S7_7 --> S7_7_6
S7_7 --> S7_7_7
S7_7 --> S7_7_8
S7_7 --> S7_7_9
S7_7 --> S7_7_10
S7_7 --> S7_7_11
S7_7 --> S7_7_12
S7_7 --> S7_7_13
P7 --> S7_8
S7_8 --> S7_8_1
S7_8 --> S7_8_2
S7_8 --> S7_8_3
S7_8 --> S7_8_4
S7_8 --> S7_8_5
S7_8 --> S7_8_6
S7_8 --> S7_8_7
S7_8 --> S7_8_8
S7_8 --> S7_8_9
S7_8 --> S7_8_10
S7_8 --> S7_8_11
S7_8 --> S7_8_12
P7 --> S7_9
S7_9 --> S7_9_1
S7_9 --> S7_9_2
S7_9 --> S7_9_3
S7_9 --> S7_9_4
S7_9 --> S7_9_5
S7_9 --> S7_9_6
S7_9 --> S7_9_7
S7_9 --> S7_9_8
S7_9 --> S7_9_9
S7_9 --> S7_9_10
S7_9 --> S7_9_11
S7_9 --> S7_9_12
S7_9 --> S7_9_13
P7 --> S7_10
S7_10 --> S7_10_1
S7_10 --> S7_10_2
S7_10 --> S7_10_3
S7_10 --> S7_10_4
S7_10 --> S7_10_5
S7_10 --> S7_10_6
S7_10 --> S7_10_7
S7_10 --> S7_10_8
S7_10 --> S7_10_9
S7_10 --> S7_10_10
S7_10 --> S7_10_11
S7_10 --> S7_10_12
S7_10 --> S7_10_13
P8 --> S8_1
S8_1 --> S8_1_1
S8_1 --> S8_1_2
S8_1 --> S8_1_3
S8_1 --> S8_1_4
S8_1 --> S8_1_5
S8_1 --> S8_1_6
S8_1 --> S8_1_7
S8_1 --> S8_1_8
S8_1 --> S8_1_9
S8_1 --> S8_1_10
S8_1 --> S8_1_11
S8_1 --> S8_1_12
S8_1 --> S8_1_13
S8_1 --> S8_1_14
S8_1 --> S8_1_15
P8 --> S8_2
S8_2 --> S8_2_1
S8_2 --> S8_2_2
S8_2 --> S8_2_3
S8_2 --> S8_2_4
S8_2 --> S8_2_5
S8_2 --> S8_2_6
S8_2 --> S8_2_7
S8_2 --> S8_2_8
S8_2 --> S8_2_9
S8_2 --> S8_2_10
S8_2 --> S8_2_11
S8_2 --> S8_2_12
S8_2 --> S8_2_13
P8 --> S8_3
S8_3 --> S8_3_1
S8_3 --> S8_3_2
S8_3 --> S8_3_3
S8_3 --> S8_3_4
S8_3 --> S8_3_5
S8_3 --> S8_3_6
S8_3 --> S8_3_7
S8_3 --> S8_3_8
S8_3 --> S8_3_9
S8_3 --> S8_3_10
S8_3 --> S8_3_11
P8 --> S8_4
S8_4 --> S8_4_1
S8_4 --> S8_4_2
S8_4 --> S8_4_3
S8_4 --> S8_4_4
S8_4 --> S8_4_5
S8_4 --> S8_4_6
S8_4 --> S8_4_7
S8_4 --> S8_4_8
S8_4 --> S8_4_9
S8_4 --> S8_4_10
S8_4 --> S8_4_11
S8_4 --> S8_4_12
S8_4 --> S8_4_13
P8 --> S8_5
S8_5 --> S8_5_1
S8_5 --> S8_5_2
S8_5 --> S8_5_3
S8_5 --> S8_5_4
S8_5 --> S8_5_5
S8_5 --> S8_5_6
S8_5 --> S8_5_7
S8_5 --> S8_5_8
S8_5 --> S8_5_9
S8_5 --> S8_5_10
S8_5 --> S8_5_11
S8_5 --> S8_5_12
S8_5 --> S8_5_13
P8 --> S8_6
S8_6 --> S8_6_1
S8_6 --> S8_6_2
S8_6 --> S8_6_3
S8_6 --> S8_6_4
S8_6 --> S8_6_5
S8_6 --> S8_6_6
S8_6 --> S8_6_7
S8_6 --> S8_6_8
S8_6 --> S8_6_9
S8_6 --> S8_6_10
S8_6 --> S8_6_11
S8_6 --> S8_6_12
S8_6 --> S8_6_13
P8 --> S8_7
S8_7 --> S8_7_1
S8_7 --> S8_7_2
S8_7 --> S8_7_3
S8_7 --> S8_7_4
S8_7 --> S8_7_5
S8_7 --> S8_7_6
S8_7 --> S8_7_7
S8_7 --> S8_7_8
S8_7 --> S8_7_9
S8_7 --> S8_7_10
S8_7 --> S8_7_11
S8_7 --> S8_7_12
S8_7 --> S8_7_13
P8 --> S8_8
S8_8 --> S8_8_1
S8_8 --> S8_8_2
S8_8 --> S8_8_3
S8_8 --> S8_8_4
S8_8 --> S8_8_5
S8_8 --> S8_8_6
S8_8 --> S8_8_7
S8_8 --> S8_8_8
S8_8 --> S8_8_9
S8_8 --> S8_8_10
S8_8 --> S8_8_11
S8_8 --> S8_8_12
S8_8 --> S8_8_13
P9 --> S9_1
S9_1 --> S9_1_1
S9_1 --> S9_1_2
S9_1 --> S9_1_3
S9_1 --> S9_1_4
S9_1 --> S9_1_5
S9_1 --> S9_1_6
S9_1 --> S9_1_7
S9_1 --> S9_1_8
S9_1 --> S9_1_9
S9_1 --> S9_1_10
S9_1 --> S9_1_11
S9_1 --> S9_1_12
P9 --> S9_2
S9_2 --> S9_2_1
S9_2 --> S9_2_2
S9_2 --> S9_2_3
S9_2 --> S9_2_4
S9_2 --> S9_2_5
S9_2 --> S9_2_6
S9_2 --> S9_2_7
S9_2 --> S9_2_8
S9_2 --> S9_2_9
S9_2 --> S9_2_10
S9_2 --> S9_2_11
S9_2 --> S9_2_12
S9_2 --> S9_2_13
P9 --> S9_3
S9_3 --> S9_3_1
S9_3 --> S9_3_2
S9_3 --> S9_3_3
S9_3 --> S9_3_4
S9_3 --> S9_3_5
S9_3 --> S9_3_6
S9_3 --> S9_3_7
S9_3 --> S9_3_8
S9_3 --> S9_3_9
S9_3 --> S9_3_10
S9_3 --> S9_3_11
S9_3 --> S9_3_12
S9_3 --> S9_3_13
S9_3 --> S9_3_14
P9 --> S9_4
S9_4 --> S9_4_1
S9_4 --> S9_4_2
S9_4 --> S9_4_3
S9_4 --> S9_4_4
S9_4 --> S9_4_5
S9_4 --> S9_4_6
S9_4 --> S9_4_7
S9_4 --> S9_4_8
S9_4 --> S9_4_9
S9_4 --> S9_4_10
S9_4 --> S9_4_11
S9_4 --> S9_4_12
S9_4 --> S9_4_13
P9 --> S9_5
S9_5 --> S9_5_1
S9_5 --> S9_5_2
S9_5 --> S9_5_3
S9_5 --> S9_5_4
S9_5 --> S9_5_5
S9_5 --> S9_5_6
S9_5 --> S9_5_7
S9_5 --> S9_5_8
S9_5 --> S9_5_9
S9_5 --> S9_5_10
S9_5 --> S9_5_11
S9_5 --> S9_5_12
S9_5 --> S9_5_13
S9_5 --> S9_5_14
P9 --> S9_6
S9_6 --> S9_6_1
S9_6 --> S9_6_2
S9_6 --> S9_6_3
S9_6 --> S9_6_4
S9_6 --> S9_6_5
S9_6 --> S9_6_6
S9_6 --> S9_6_7
S9_6 --> S9_6_8
S9_6 --> S9_6_9
S9_6 --> S9_6_10
S9_6 --> S9_6_11
S9_6 --> S9_6_12
S9_6 --> S9_6_13
P9 --> S9_7
S9_7 --> S9_7_1
S9_7 --> S9_7_2
S9_7 --> S9_7_3
S9_7 --> S9_7_4
S9_7 --> S9_7_5
S9_7 --> S9_7_6
S9_7 --> S9_7_7
S9_7 --> S9_7_8
S9_7 --> S9_7_9
S9_7 --> S9_7_10
S9_7 --> S9_7_11
S9_7 --> S9_7_12
S9_7 --> S9_7_13
P9 --> S9_8
S9_8 --> S9_8_1
S9_8 --> S9_8_2
S9_8 --> S9_8_3
S9_8 --> S9_8_4
S9_8 --> S9_8_5
S9_8 --> S9_8_6
S9_8 --> S9_8_7
S9_8 --> S9_8_8
S9_8 --> S9_8_9
S9_8 --> S9_8_10
S9_8 --> S9_8_11
S9_8 --> S9_8_12
S9_8 --> S9_8_13
P9 --> S9_9
S9_9 --> S9_9_1
S9_9 --> S9_9_2
S9_9 --> S9_9_3
S9_9 --> S9_9_4
S9_9 --> S9_9_5
S9_9 --> S9_9_6
S9_9 --> S9_9_7
S9_9 --> S9_9_8
S9_9 --> S9_9_9
S9_9 --> S9_9_10
S9_9 --> S9_9_11
S9_9 --> S9_9_12
S9_9 --> S9_9_13
P9 --> S9_10
S9_10 --> S9_10_1
S9_10 --> S9_10_2
S9_10 --> S9_10_3
S9_10 --> S9_10_4
S9_10 --> S9_10_5
S9_10 --> S9_10_6
S9_10 --> S9_10_7
S9_10 --> S9_10_8
S9_10 --> S9_10_9
S9_10 --> S9_10_10
S9_10 --> S9_10_11
S9_10 --> S9_10_12
S9_10 --> S9_10_13
S9_10 --> S9_10_14
P10 --> S10_1
S10_1 --> S10_1_1
S10_1 --> S10_1_2
S10_1 --> S10_1_3
S10_1 --> S10_1_4
S10_1 --> S10_1_5
S10_1 --> S10_1_6
S10_1 --> S10_1_7
S10_1 --> S10_1_8
S10_1 --> S10_1_9
S10_1 --> S10_1_10
S10_1 --> S10_1_11
S10_1 --> S10_1_12
S10_1 --> S10_1_13
S10_1 --> S10_1_14
P10 --> S10_2
S10_2 --> S10_2_1
S10_2 --> S10_2_2
S10_2 --> S10_2_3
S10_2 --> S10_2_4
S10_2 --> S10_2_5
S10_2 --> S10_2_6
S10_2 --> S10_2_7
S10_2 --> S10_2_8
S10_2 --> S10_2_9
S10_2 --> S10_2_10
S10_2 --> S10_2_11
S10_2 --> S10_2_12
S10_2 --> S10_2_13
P10 --> S10_3
S10_3 --> S10_3_1
S10_3 --> S10_3_2
S10_3 --> S10_3_3
S10_3 --> S10_3_4
S10_3 --> S10_3_5
S10_3 --> S10_3_6
S10_3 --> S10_3_7
S10_3 --> S10_3_8
S10_3 --> S10_3_9
S10_3 --> S10_3_10
S10_3 --> S10_3_11
S10_3 --> S10_3_12
S10_3 --> S10_3_13
P10 --> S10_4
S10_4 --> S10_4_1
S10_4 --> S10_4_2
S10_4 --> S10_4_3
S10_4 --> S10_4_4
S10_4 --> S10_4_5
S10_4 --> S10_4_6
S10_4 --> S10_4_7
S10_4 --> S10_4_8
S10_4 --> S10_4_9
S10_4 --> S10_4_10
S10_4 --> S10_4_11
S10_4 --> S10_4_12
S10_4 --> S10_4_13
P10 --> S10_5
S10_5 --> S10_5_1
S10_5 --> S10_5_2
S10_5 --> S10_5_3
S10_5 --> S10_5_4
S10_5 --> S10_5_5
S10_5 --> S10_5_6
S10_5 --> S10_5_7
S10_5 --> S10_5_8
S10_5 --> S10_5_9
S10_5 --> S10_5_10
S10_5 --> S10_5_11
S10_5 --> S10_5_12
S10_5 --> S10_5_13
P10 --> S10_6
S10_6 --> S10_6_1
S10_6 --> S10_6_2
S10_6 --> S10_6_3
S10_6 --> S10_6_4
S10_6 --> S10_6_5
S10_6 --> S10_6_6
S10_6 --> S10_6_7
S10_6 --> S10_6_8
S10_6 --> S10_6_9
S10_6 --> S10_6_10
S10_6 --> S10_6_11
S10_6 --> S10_6_12
S10_6 --> S10_6_13
S10_6 --> S10_6_14
P10 --> S10_7
S10_7 --> S10_7_1
S10_7 --> S10_7_2
S10_7 --> S10_7_3
S10_7 --> S10_7_4
S10_7 --> S10_7_5
S10_7 --> S10_7_6
S10_7 --> S10_7_7
S10_7 --> S10_7_8
S10_7 --> S10_7_9
S10_7 --> S10_7_10
S10_7 --> S10_7_11
S10_7 --> S10_7_12
S10_7 --> S10_7_13
P10 --> S10_8
S10_8 --> S10_8_1
S10_8 --> S10_8_2
S10_8 --> S10_8_3
S10_8 --> S10_8_4
S10_8 --> S10_8_5
S10_8 --> S10_8_6
S10_8 --> S10_8_7
S10_8 --> S10_8_8
S10_8 --> S10_8_9
S10_8 --> S10_8_10
S10_8 --> S10_8_11
S10_8 --> S10_8_12
S10_8 --> S10_8_13
P10 --> S10_9
S10_9 --> S10_9_1
S10_9 --> S10_9_2
S10_9 --> S10_9_3
S10_9 --> S10_9_4
S10_9 --> S10_9_5
S10_9 --> S10_9_6
S10_9 --> S10_9_7
S10_9 --> S10_9_8
S10_9 --> S10_9_9
S10_9 --> S10_9_10
S10_9 --> S10_9_11
S10_9 --> S10_9_12
S10_9 --> S10_9_13
P10 --> S10_10
S10_10 --> S10_10_1
S10_10 --> S10_10_2
S10_10 --> S10_10_3
S10_10 --> S10_10_4
S10_10 --> S10_10_5
S10_10 --> S10_10_6
S10_10 --> S10_10_7
S10_10 --> S10_10_8
S10_10 --> S10_10_9
S10_10 --> S10_10_10
S10_10 --> S10_10_11
S10_10 --> S10_10_12
S10_10 --> S10_10_13
S10_10 --> S10_10_14
P10 --> S10_11
S10_11 --> S10_11_1
S10_11 --> S10_11_2
S10_11 --> S10_11_3
S10_11 --> S10_11_4
S10_11 --> S10_11_5
S10_11 --> S10_11_6
S10_11 --> S10_11_7
S10_11 --> S10_11_8
S10_11 --> S10_11_9
S10_11 --> S10_11_10
S10_11 --> S10_11_11
S10_11 --> S10_11_12
S10_11 --> S10_11_13
P10 --> S10_12
S10_12 --> S10_12_1
S10_12 --> S10_12_2
S10_12 --> S10_12_3
S10_12 --> S10_12_4
S10_12 --> S10_12_5
S10_12 --> S10_12_6
S10_12 --> S10_12_7
S10_12 --> S10_12_8
S10_12 --> S10_12_9
S10_12 --> S10_12_10
S10_12 --> S10_12_11
S10_12 --> S10_12_12
S10_12 --> S10_12_13
P11 --> S11_1
S11_1 --> S11_1_1
S11_1 --> S11_1_2
S11_1 --> S11_1_3
S11_1 --> S11_1_4
S11_1 --> S11_1_5
S11_1 --> S11_1_6
S11_1 --> S11_1_7
S11_1 --> S11_1_8
S11_1 --> S11_1_9
S11_1 --> S11_1_10
S11_1 --> S11_1_11
S11_1 --> S11_1_12
S11_1 --> S11_1_13
P11 --> S11_2
S11_2 --> S11_2_1
S11_2 --> S11_2_2
S11_2 --> S11_2_3
S11_2 --> S11_2_4
S11_2 --> S11_2_5
S11_2 --> S11_2_6
S11_2 --> S11_2_7
S11_2 --> S11_2_8
S11_2 --> S11_2_9
S11_2 --> S11_2_10
S11_2 --> S11_2_11
S11_2 --> S11_2_12
S11_2 --> S11_2_13
P11 --> S11_3
S11_3 --> S11_3_1
S11_3 --> S11_3_2
S11_3 --> S11_3_3
S11_3 --> S11_3_4
S11_3 --> S11_3_5
S11_3 --> S11_3_6
S11_3 --> S11_3_7
S11_3 --> S11_3_8
S11_3 --> S11_3_9
S11_3 --> S11_3_10
S11_3 --> S11_3_11
S11_3 --> S11_3_12
S11_3 --> S11_3_13
S11_3 --> S11_3_14
P11 --> S11_4
S11_4 --> S11_4_1
S11_4 --> S11_4_2
S11_4 --> S11_4_3
S11_4 --> S11_4_4
S11_4 --> S11_4_5
S11_4 --> S11_4_6
S11_4 --> S11_4_7
S11_4 --> S11_4_8
S11_4 --> S11_4_9
S11_4 --> S11_4_10
S11_4 --> S11_4_11
S11_4 --> S11_4_12
S11_4 --> S11_4_13
P11 --> S11_5
S11_5 --> S11_5_1
S11_5 --> S11_5_2
S11_5 --> S11_5_3
S11_5 --> S11_5_4
S11_5 --> S11_5_5
S11_5 --> S11_5_6
S11_5 --> S11_5_7
S11_5 --> S11_5_8
S11_5 --> S11_5_9
S11_5 --> S11_5_10
S11_5 --> S11_5_11
S11_5 --> S11_5_12
S11_5 --> S11_5_13
P11 --> S11_6
S11_6 --> S11_6_1
S11_6 --> S11_6_2
S11_6 --> S11_6_3
S11_6 --> S11_6_4
S11_6 --> S11_6_5
S11_6 --> S11_6_6
S11_6 --> S11_6_7
S11_6 --> S11_6_8
S11_6 --> S11_6_9
S11_6 --> S11_6_10
S11_6 --> S11_6_11
S11_6 --> S11_6_12
S11_6 --> S11_6_13
S11_6 --> S11_6_14
P11 --> S11_7
S11_7 --> S11_7_1
S11_7 --> S11_7_2
S11_7 --> S11_7_3
S11_7 --> S11_7_4
S11_7 --> S11_7_5
S11_7 --> S11_7_6
S11_7 --> S11_7_7
S11_7 --> S11_7_8
S11_7 --> S11_7_9
S11_7 --> S11_7_10
S11_7 --> S11_7_11
S11_7 --> S11_7_12
S11_7 --> S11_7_13
P11 --> S11_8
S11_8 --> S11_8_1
S11_8 --> S11_8_2
S11_8 --> S11_8_3
S11_8 --> S11_8_4
S11_8 --> S11_8_5
S11_8 --> S11_8_6
S11_8 --> S11_8_7
S11_8 --> S11_8_8
S11_8 --> S11_8_9
S11_8 --> S11_8_10
S11_8 --> S11_8_11
S11_8 --> S11_8_12
S11_8 --> S11_8_13
P12 --> S12_1
S12_1 --> S12_1_1
S12_1 --> S12_1_2
S12_1 --> S12_1_3
S12_1 --> S12_1_4
S12_1 --> S12_1_5
S12_1 --> S12_1_6
S12_1 --> S12_1_7
S12_1 --> S12_1_8
S12_1 --> S12_1_9
S12_1 --> S12_1_10
S12_1 --> S12_1_11
S12_1 --> S12_1_12
P12 --> S12_2
S12_2 --> S12_2_1
S12_2 --> S12_2_2
S12_2 --> S12_2_3
S12_2 --> S12_2_4
S12_2 --> S12_2_5
S12_2 --> S12_2_6
S12_2 --> S12_2_7
S12_2 --> S12_2_8
S12_2 --> S12_2_9
S12_2 --> S12_2_10
S12_2 --> S12_2_11
S12_2 --> S12_2_12
S12_2 --> S12_2_13
P12 --> S12_3
S12_3 --> S12_3_1
S12_3 --> S12_3_2
S12_3 --> S12_3_3
S12_3 --> S12_3_4
S12_3 --> S12_3_5
S12_3 --> S12_3_6
S12_3 --> S12_3_7
S12_3 --> S12_3_8
S12_3 --> S12_3_9
S12_3 --> S12_3_10
S12_3 --> S12_3_11
S12_3 --> S12_3_12
S12_3 --> S12_3_13
P12 --> S12_4
S12_4 --> S12_4_1
S12_4 --> S12_4_2
S12_4 --> S12_4_3
S12_4 --> S12_4_4
S12_4 --> S12_4_5
S12_4 --> S12_4_6
S12_4 --> S12_4_7
S12_4 --> S12_4_8
S12_4 --> S12_4_9
S12_4 --> S12_4_10
S12_4 --> S12_4_11
S12_4 --> S12_4_12
S12_4 --> S12_4_13
P12 --> S12_5
S12_5 --> S12_5_1
S12_5 --> S12_5_2
S12_5 --> S12_5_3
S12_5 --> S12_5_4
S12_5 --> S12_5_5
S12_5 --> S12_5_6
S12_5 --> S12_5_7
S12_5 --> S12_5_8
S12_5 --> S12_5_9
S12_5 --> S12_5_10
S12_5 --> S12_5_11
S12_5 --> S12_5_12
S12_5 --> S12_5_13
P12 --> S12_6
S12_6 --> S12_6_1
S12_6 --> S12_6_2
S12_6 --> S12_6_3
S12_6 --> S12_6_4
S12_6 --> S12_6_5
S12_6 --> S12_6_6
S12_6 --> S12_6_7
S12_6 --> S12_6_8
S12_6 --> S12_6_9
S12_6 --> S12_6_10
S12_6 --> S12_6_11
S12_6 --> S12_6_12
P12 --> S12_7
S12_7 --> S12_7_1
S12_7 --> S12_7_2
S12_7 --> S12_7_3
S12_7 --> S12_7_4
S12_7 --> S12_7_5
S12_7 --> S12_7_6
S12_7 --> S12_7_7
S12_7 --> S12_7_8
S12_7 --> S12_7_9
S12_7 --> S12_7_10
S12_7 --> S12_7_11
S12_7 --> S12_7_12
S12_7 --> S12_7_13
P12 --> S12_8
S12_8 --> S12_8_1
S12_8 --> S12_8_2
S12_8 --> S12_8_3
S12_8 --> S12_8_4
S12_8 --> S12_8_5
S12_8 --> S12_8_6
S12_8 --> S12_8_7
S12_8 --> S12_8_8
S12_8 --> S12_8_9
S12_8 --> S12_8_10
S12_8 --> S12_8_11
S12_8 --> S12_8_12
P13 --> S13_1
S13_1 --> S13_1_1
S13_1 --> S13_1_2
S13_1 --> S13_1_3
S13_1 --> S13_1_4
S13_1 --> S13_1_5
S13_1 --> S13_1_6
S13_1 --> S13_1_7
S13_1 --> S13_1_8
S13_1 --> S13_1_9
S13_1 --> S13_1_10
S13_1 --> S13_1_11
S13_1 --> S13_1_12
S13_1 --> S13_1_13
P13 --> S13_2
S13_2 --> S13_2_1
S13_2 --> S13_2_2
S13_2 --> S13_2_3
S13_2 --> S13_2_4
S13_2 --> S13_2_5
S13_2 --> S13_2_6
S13_2 --> S13_2_7
S13_2 --> S13_2_8
S13_2 --> S13_2_9
S13_2 --> S13_2_10
S13_2 --> S13_2_11
S13_2 --> S13_2_12
S13_2 --> S13_2_13
P13 --> S13_3
S13_3 --> S13_3_1
S13_3 --> S13_3_2
S13_3 --> S13_3_3
S13_3 --> S13_3_4
S13_3 --> S13_3_5
S13_3 --> S13_3_6
S13_3 --> S13_3_7
S13_3 --> S13_3_8
S13_3 --> S13_3_9
S13_3 --> S13_3_10
S13_3 --> S13_3_11
S13_3 --> S13_3_12
S13_3 --> S13_3_13
P13 --> S13_4
S13_4 --> S13_4_1
S13_4 --> S13_4_2
S13_4 --> S13_4_3
S13_4 --> S13_4_4
S13_4 --> S13_4_5
S13_4 --> S13_4_6
S13_4 --> S13_4_7
S13_4 --> S13_4_8
S13_4 --> S13_4_9
S13_4 --> S13_4_10
S13_4 --> S13_4_11
S13_4 --> S13_4_12
S13_4 --> S13_4_13
P13 --> S13_5
S13_5 --> S13_5_1
S13_5 --> S13_5_2
S13_5 --> S13_5_3
S13_5 --> S13_5_4
S13_5 --> S13_5_5
S13_5 --> S13_5_6
S13_5 --> S13_5_7
S13_5 --> S13_5_8
S13_5 --> S13_5_9
S13_5 --> S13_5_10
S13_5 --> S13_5_11
S13_5 --> S13_5_12
S13_5 --> S13_5_13
P13 --> S13_6
S13_6 --> S13_6_1
S13_6 --> S13_6_2
S13_6 --> S13_6_3
S13_6 --> S13_6_4
S13_6 --> S13_6_5
S13_6 --> S13_6_6
S13_6 --> S13_6_7
S13_6 --> S13_6_8
S13_6 --> S13_6_9
S13_6 --> S13_6_10
S13_6 --> S13_6_11
S13_6 --> S13_6_12
S13_6 --> S13_6_13
P14 --> S14_1
S14_1 --> S14_1_1
S14_1 --> S14_1_2
S14_1 --> S14_1_3
S14_1 --> S14_1_4
S14_1 --> S14_1_5
S14_1 --> S14_1_6
S14_1 --> S14_1_7
S14_1 --> S14_1_8
S14_1 --> S14_1_9
S14_1 --> S14_1_10
S14_1 --> S14_1_11
S14_1 --> S14_1_12
S14_1 --> S14_1_13
P14 --> S14_2
S14_2 --> S14_2_1
S14_2 --> S14_2_2
S14_2 --> S14_2_3
S14_2 --> S14_2_4
S14_2 --> S14_2_5
S14_2 --> S14_2_6
S14_2 --> S14_2_7
S14_2 --> S14_2_8
S14_2 --> S14_2_9
S14_2 --> S14_2_10
S14_2 --> S14_2_11
S14_2 --> S14_2_12
S14_2 --> S14_2_13
P14 --> S14_3
S14_3 --> S14_3_1
S14_3 --> S14_3_2
S14_3 --> S14_3_3
S14_3 --> S14_3_4
S14_3 --> S14_3_5
S14_3 --> S14_3_6
S14_3 --> S14_3_7
S14_3 --> S14_3_8
S14_3 --> S14_3_9
S14_3 --> S14_3_10
S14_3 --> S14_3_11
S14_3 --> S14_3_12
S14_3 --> S14_3_13
P14 --> S14_4
S14_4 --> S14_4_1
S14_4 --> S14_4_2
S14_4 --> S14_4_3
S14_4 --> S14_4_4
S14_4 --> S14_4_5
S14_4 --> S14_4_6
S14_4 --> S14_4_7
S14_4 --> S14_4_8
S14_4 --> S14_4_9
S14_4 --> S14_4_10
S14_4 --> S14_4_11
S14_4 --> S14_4_12
S14_4 --> S14_4_13
P14 --> S14_5
S14_5 --> S14_5_1
S14_5 --> S14_5_2
S14_5 --> S14_5_3
S14_5 --> S14_5_4
S14_5 --> S14_5_5
S14_5 --> S14_5_6
S14_5 --> S14_5_7
S14_5 --> S14_5_8
S14_5 --> S14_5_9
S14_5 --> S14_5_10
S14_5 --> S14_5_11
S14_5 --> S14_5_12
S14_5 --> S14_5_13
P14 --> S14_6
S14_6 --> S14_6_1
S14_6 --> S14_6_2
S14_6 --> S14_6_3
S14_6 --> S14_6_4
S14_6 --> S14_6_5
S14_6 --> S14_6_6
S14_6 --> S14_6_7
S14_6 --> S14_6_8
S14_6 --> S14_6_9
S14_6 --> S14_6_10
S14_6 --> S14_6_11
S14_6 --> S14_6_12
P15 --> S15_1
S15_1 --> S15_1_1
S15_1 --> S15_1_2
S15_1 --> S15_1_3
S15_1 --> S15_1_4
S15_1 --> S15_1_5
S15_1 --> S15_1_6
S15_1 --> S15_1_7
S15_1 --> S15_1_8
S15_1 --> S15_1_9
S15_1 --> S15_1_10
S15_1 --> S15_1_11
S15_1 --> S15_1_12
S15_1 --> S15_1_13
P15 --> S15_2
S15_2 --> S15_2_1
S15_2 --> S15_2_2
S15_2 --> S15_2_3
S15_2 --> S15_2_4
S15_2 --> S15_2_5
S15_2 --> S15_2_6
S15_2 --> S15_2_7
S15_2 --> S15_2_8
S15_2 --> S15_2_9
S15_2 --> S15_2_10
S15_2 --> S15_2_11
S15_2 --> S15_2_12
S15_2 --> S15_2_13
P15 --> S15_3
S15_3 --> S15_3_1
S15_3 --> S15_3_2
S15_3 --> S15_3_3
S15_3 --> S15_3_4
S15_3 --> S15_3_5
S15_3 --> S15_3_6
S15_3 --> S15_3_7
S15_3 --> S15_3_8
S15_3 --> S15_3_9
S15_3 --> S15_3_10
S15_3 --> S15_3_11
S15_3 --> S15_3_12
S15_3 --> S15_3_13
P15 --> S15_4
S15_4 --> S15_4_1
S15_4 --> S15_4_2
S15_4 --> S15_4_3
S15_4 --> S15_4_4
S15_4 --> S15_4_5
S15_4 --> S15_4_6
S15_4 --> S15_4_7
S15_4 --> S15_4_8
S15_4 --> S15_4_9
S15_4 --> S15_4_10
S15_4 --> S15_4_11
S15_4 --> S15_4_12
S15_4 --> S15_4_13
P15 --> S15_5
S15_5 --> S15_5_1
S15_5 --> S15_5_2
S15_5 --> S15_5_3
S15_5 --> S15_5_4
S15_5 --> S15_5_5
S15_5 --> S15_5_6
S15_5 --> S15_5_7
S15_5 --> S15_5_8
S15_5 --> S15_5_9
S15_5 --> S15_5_10
S15_5 --> S15_5_11
S15_5 --> S15_5_12
S15_5 --> S15_5_13
P15 --> S15_6
S15_6 --> S15_6_1
S15_6 --> S15_6_2
S15_6 --> S15_6_3
S15_6 --> S15_6_4
S15_6 --> S15_6_5
S15_6 --> S15_6_6
S15_6 --> S15_6_7
S15_6 --> S15_6_8
S15_6 --> S15_6_9
S15_6 --> S15_6_10
S15_6 --> S15_6_11
S15_6 --> S15_6_12
S15_6 --> S15_6_13
P15 --> S15_7
S15_7 --> S15_7_1
S15_7 --> S15_7_2
S15_7 --> S15_7_3
S15_7 --> S15_7_4
S15_7 --> S15_7_5
S15_7 --> S15_7_6
S15_7 --> S15_7_7
S15_7 --> S15_7_8
S15_7 --> S15_7_9
S15_7 --> S15_7_10
S15_7 --> S15_7_11
S15_7 --> S15_7_12
S15_7 --> S15_7_13
P15 --> S15_8
S15_8 --> S15_8_1
S15_8 --> S15_8_2
S15_8 --> S15_8_3
S15_8 --> S15_8_4
S15_8 --> S15_8_5
S15_8 --> S15_8_6
S15_8 --> S15_8_7
S15_8 --> S15_8_8
S15_8 --> S15_8_9
S15_8 --> S15_8_10
S15_8 --> S15_8_11
S15_8 --> S15_8_12
S15_8 --> S15_8_13
P16 --> S16_1
S16_1 --> S16_1_1
S16_1 --> S16_1_2
S16_1 --> S16_1_3
S16_1 --> S16_1_4
S16_1 --> S16_1_5
S16_1 --> S16_1_6
S16_1 --> S16_1_7
S16_1 --> S16_1_8
S16_1 --> S16_1_9
S16_1 --> S16_1_10
S16_1 --> S16_1_11
S16_1 --> S16_1_12
P16 --> S16_2
S16_2 --> S16_2_1
S16_2 --> S16_2_2
S16_2 --> S16_2_3
S16_2 --> S16_2_4
S16_2 --> S16_2_5
S16_2 --> S16_2_6
S16_2 --> S16_2_7
S16_2 --> S16_2_8
S16_2 --> S16_2_9
S16_2 --> S16_2_10
S16_2 --> S16_2_11
S16_2 --> S16_2_12
P16 --> S16_3
S16_3 --> S16_3_1
S16_3 --> S16_3_2
S16_3 --> S16_3_3
S16_3 --> S16_3_4
S16_3 --> S16_3_5
S16_3 --> S16_3_6
S16_3 --> S16_3_7
S16_3 --> S16_3_8
S16_3 --> S16_3_9
S16_3 --> S16_3_10
S16_3 --> S16_3_11
S16_3 --> S16_3_12
S16_3 --> S16_3_13
P16 --> S16_4
S16_4 --> S16_4_1
S16_4 --> S16_4_2
S16_4 --> S16_4_3
S16_4 --> S16_4_4
S16_4 --> S16_4_5
S16_4 --> S16_4_6
S16_4 --> S16_4_7
S16_4 --> S16_4_8
S16_4 --> S16_4_9
S16_4 --> S16_4_10
S16_4 --> S16_4_11
S16_4 --> S16_4_12
S16_4 --> S16_4_13
P16 --> S16_5
S16_5 --> S16_5_1
S16_5 --> S16_5_2
S16_5 --> S16_5_3
S16_5 --> S16_5_4
S16_5 --> S16_5_5
S16_5 --> S16_5_6
S16_5 --> S16_5_7
S16_5 --> S16_5_8
S16_5 --> S16_5_9
S16_5 --> S16_5_10
S16_5 --> S16_5_11
S16_5 --> S16_5_12
S16_5 --> S16_5_13
P16 --> S16_6
S16_6 --> S16_6_1
S16_6 --> S16_6_2
S16_6 --> S16_6_3
S16_6 --> S16_6_4
S16_6 --> S16_6_5
S16_6 --> S16_6_6
S16_6 --> S16_6_7
S16_6 --> S16_6_8
S16_6 --> S16_6_9
S16_6 --> S16_6_10
S16_6 --> S16_6_11
S16_6 --> S16_6_12
S16_6 --> S16_6_13
P16 --> S16_7
S16_7 --> S16_7_1
S16_7 --> S16_7_2
S16_7 --> S16_7_3
S16_7 --> S16_7_4
S16_7 --> S16_7_5
S16_7 --> S16_7_6
S16_7 --> S16_7_7
S16_7 --> S16_7_8
S16_7 --> S16_7_9
S16_7 --> S16_7_10
S16_7 --> S16_7_11
S16_7 --> S16_7_12
S16_7 --> S16_7_13
P16 --> S16_8
S16_8 --> S16_8_1
S16_8 --> S16_8_2
S16_8 --> S16_8_3
S16_8 --> S16_8_4
S16_8 --> S16_8_5
S16_8 --> S16_8_6
S16_8 --> S16_8_7
S16_8 --> S16_8_8
S16_8 --> S16_8_9
S16_8 --> S16_8_10
S16_8 --> S16_8_11
S16_8 --> S16_8_12
S16_8 --> S16_8_13
P17 --> S17_1
S17_1 --> S17_1_1
S17_1 --> S17_1_2
S17_1 --> S17_1_3
S17_1 --> S17_1_4
S17_1 --> S17_1_5
S17_1 --> S17_1_6
S17_1 --> S17_1_7
S17_1 --> S17_1_8
S17_1 --> S17_1_9
S17_1 --> S17_1_10
S17_1 --> S17_1_11
S17_1 --> S17_1_12
P17 --> S17_2
S17_2 --> S17_2_1
S17_2 --> S17_2_2
S17_2 --> S17_2_3
S17_2 --> S17_2_4
S17_2 --> S17_2_5
S17_2 --> S17_2_6
S17_2 --> S17_2_7
S17_2 --> S17_2_8
S17_2 --> S17_2_9
S17_2 --> S17_2_10
S17_2 --> S17_2_11
S17_2 --> S17_2_12
S17_2 --> S17_2_13
P17 --> S17_3
S17_3 --> S17_3_1
S17_3 --> S17_3_2
S17_3 --> S17_3_3
S17_3 --> S17_3_4
S17_3 --> S17_3_5
S17_3 --> S17_3_6
S17_3 --> S17_3_7
S17_3 --> S17_3_8
S17_3 --> S17_3_9
S17_3 --> S17_3_10
S17_3 --> S17_3_11
S17_3 --> S17_3_12
S17_3 --> S17_3_13
P17 --> S17_4
S17_4 --> S17_4_1
S17_4 --> S17_4_2
S17_4 --> S17_4_3
S17_4 --> S17_4_4
S17_4 --> S17_4_5
S17_4 --> S17_4_6
S17_4 --> S17_4_7
S17_4 --> S17_4_8
S17_4 --> S17_4_9
S17_4 --> S17_4_10
S17_4 --> S17_4_11
S17_4 --> S17_4_12
S17_4 --> S17_4_13
P17 --> S17_5
S17_5 --> S17_5_1
S17_5 --> S17_5_2
S17_5 --> S17_5_3
S17_5 --> S17_5_4
S17_5 --> S17_5_5
S17_5 --> S17_5_6
S17_5 --> S17_5_7
S17_5 --> S17_5_8
S17_5 --> S17_5_9
S17_5 --> S17_5_10
S17_5 --> S17_5_11
S17_5 --> S17_5_12
S17_5 --> S17_5_13
P17 --> S17_6
S17_6 --> S17_6_1
S17_6 --> S17_6_2
S17_6 --> S17_6_3
S17_6 --> S17_6_4
S17_6 --> S17_6_5
S17_6 --> S17_6_6
S17_6 --> S17_6_7
S17_6 --> S17_6_8
S17_6 --> S17_6_9
S17_6 --> S17_6_10
S17_6 --> S17_6_11
S17_6 --> S17_6_12
S17_6 --> S17_6_13
P17 --> S17_7
S17_7 --> S17_7_1
S17_7 --> S17_7_2
S17_7 --> S17_7_3
S17_7 --> S17_7_4
S17_7 --> S17_7_5
S17_7 --> S17_7_6
S17_7 --> S17_7_7
S17_7 --> S17_7_8
S17_7 --> S17_7_9
S17_7 --> S17_7_10
S17_7 --> S17_7_11
S17_7 --> S17_7_12
S17_7 --> S17_7_13
P17 --> S17_8
S17_8 --> S17_8_1
S17_8 --> S17_8_2
S17_8 --> S17_8_3
S17_8 --> S17_8_4
S17_8 --> S17_8_5
S17_8 --> S17_8_6
S17_8 --> S17_8_7
S17_8 --> S17_8_8
S17_8 --> S17_8_9
S17_8 --> S17_8_10
S17_8 --> S17_8_11
S17_8 --> S17_8_12
S17_8 --> S17_8_13

class Root default
class P1 default
class P2 default
class P3 default
class P4 default
class P5 default
class P6 default
class P7 default
class P8 default
class P9 default
class P10 default
class P11 default
class P12 default
class P13 default
class P14 default
class P15 default
class P16 default
class P17 default
class S1_1,S1_2,S1_2_1,S1_2_2,S1_2_3,S1_3,S1_3_1,S1_3_2,S1_3_3,S1_4,S1_4_1,S1_4_2,S1_4_3,S1_4_4,S1_4_5,S1_4_6,S1_5,S1_5_1,S1_5_2,S1_5_3,S1_5_4,S1_5_5,S2_1,S2_1_1,S2_1_2,S2_1_3,S2_1_4,S2_1_5,S2_1_6,S2_1_7,S2_1_8,S2_2,S2_2_1,S2_2_2,S2_2_3,S2_2_4,S2_2_5,S2_2_6,S2_2_7,S2_2_8,S2_3,S2_3_1,S2_3_2,S2_3_3,S2_3_4,S2_3_5,S2_3_6,S2_3_7,S2_4,S2_4_1,S2_4_2,S2_4_3,S2_4_4,S2_4_5,S2_4_6,S2_4_7,S2_4_8,S3_1,S3_1_1,S3_1_2,S3_1_3,S3_1_4,S3_1_5,S3_1_6,S3_2,S3_2_1,S3_2_2,S3_2_3,S3_2_4,S3_2_5,S3_2_6,S3_2_7,S3_2_8,S3_2_9,S3_2_10,S3_2_11,S3_3,S3_3_1,S3_3_2,S3_3_3,S3_3_4,S3_3_5,S3_3_6,S3_3_7,S3_3_8,S3_4,S3_4_1,S3_4_2,S3_4_3,S3_4_4,S3_4_5,S4_1,S4_1_1,S4_1_2,S4_1_3,S4_1_4,S4_1_5,S4_1_6,S4_1_7,S4_1_8,S4_1_9,S4_2,S4_2_1,S4_2_2,S4_2_3,S4_2_4,S4_2_5,S4_2_6,S5_1,S5_1_1,S5_1_2,S5_1_3,S5_1_4,S5_1_5,S5_1_6,S5_1_7,S5_2,S5_2_1,S5_2_2,S5_2_3,S5_2_4,S5_2_5,S5_2_6,S5_2_7,S5_2_8,S5_3,S5_3_1,S5_3_2,S5_3_3,S5_3_4,S5_3_5,S5_3_6,S5_3_7,S5_3_8,S5_4,S5_4_1,S5_4_2,S5_4_3,S5_4_4,S5_4_5,S5_4_6,S5_4_7,S5_4_8,S5_5,S5_5_1,S5_5_2,S5_5_3,S5_5_4,S5_5_5,S5_5_6,S5_5_7,S5_5_8,S5_6,S5_6_1,S5_6_2,S5_6_3,S5_6_4,S5_6_5,S5_6_6,S5_6_7,S5_6_8,S5_7,S5_7_1,S5_7_2,S5_7_3,S5_7_4,S5_7_5,S5_7_6,S5_7_7,S5_7_8,S5_8,S5_8_1,S5_8_2,S5_8_3,S5_8_4,S5_8_5,S5_8_6,S5_8_7,S5_8_8,S6_1,S6_1_1,S6_1_2,S6_1_3,S6_1_4,S6_1_5,S6_1_6,S6_1_7,S6_1_8,S6_1_9,S6_1_10,S6_2,S6_2_1,S6_2_2,S6_2_3,S6_2_4,S6_2_5,S6_2_6,S6_2_7,S6_2_8,S6_2_9,S6_2_10,S6_3,S6_3_1,S6_3_2,S6_3_3,S6_3_4,S6_3_5,S6_3_6,S6_3_7,S6_3_8,S6_3_9,S6_3_10,S6_4,S6_4_1,S6_4_2,S6_4_3,S6_4_4,S6_4_5,S6_4_6,S6_4_7,S6_4_8,S6_4_9,S6_4_10,S6_4_11,S6_5,S6_5_1,S6_5_2,S6_5_3,S6_5_4,S6_5_5,S6_5_6,S6_5_7,S6_5_8,S6_5_9,S6_5_10,S6_5_11,S6_5_12,S6_5_13,S6_6,S6_6_1,S6_6_2,S6_6_3,S6_6_4,S6_6_5,S6_6_6,S6_6_7,S6_6_8,S6_6_9,S6_6_10,S6_6_11,S6_6_12,S6_7,S6_7_1,S6_7_2,S6_7_3,S6_7_4,S6_7_5,S6_7_6,S6_7_7,S6_7_8,S6_7_9,S6_7_10,S6_7_11,S6_8,S6_8_1,S6_8_2,S6_8_3,S6_8_4,S6_8_5,S6_8_6,S6_8_7,S6_8_8,S6_8_9,S6_8_10,S6_8_11,S6_9,S6_9_1,S6_9_2,S6_9_3,S6_9_4,S6_9_5,S6_9_6,S6_9_7,S6_9_8,S6_9_9,S6_9_10,S6_9_11,S7_1,S7_1_1,S7_1_2,S7_1_3,S7_1_4,S7_1_5,S7_1_6,S7_1_7,S7_1_8,S7_1_9,S7_1_10,S7_1_11,S7_1_12,S7_2,S7_2_1,S7_2_2,S7_2_3,S7_2_4,S7_2_5,S7_2_6,S7_2_7,S7_2_8,S7_2_9,S7_2_10,S7_2_11,S7_2_12,S7_2_13,S7_2_14,S7_3,S7_3_1,S7_3_2,S7_3_3,S7_3_4,S7_3_5,S7_3_6,S7_3_7,S7_3_8,S7_3_9,S7_3_10,S7_3_11,S7_3_12,S7_3_13,S7_4,S7_4_1,S7_4_2,S7_4_3,S7_4_4,S7_4_5,S7_4_6,S7_4_7,S7_4_8,S7_4_9,S7_4_10,S7_4_11,S7_4_12,S7_5,S7_5_1,S7_5_2,S7_5_3,S7_5_4,S7_5_5,S7_5_6,S7_5_7,S7_5_8,S7_5_9,S7_5_10,S7_5_11,S7_6,S7_6_1,S7_6_2,S7_6_3,S7_6_4,S7_6_5,S7_6_6,S7_6_7,S7_6_8,S7_6_9,S7_6_10,S7_6_11,S7_6_12,S7_6_13,S7_7,S7_7_1,S7_7_2,S7_7_3,S7_7_4,S7_7_5,S7_7_6,S7_7_7,S7_7_8,S7_7_9,S7_7_10,S7_7_11,S7_7_12,S7_7_13,S7_8,S7_8_1,S7_8_2,S7_8_3,S7_8_4,S7_8_5,S7_8_6,S7_8_7,S7_8_8,S7_8_9,S7_8_10,S7_8_11,S7_8_12,S7_9,S7_9_1,S7_9_2,S7_9_3,S7_9_4,S7_9_5,S7_9_6,S7_9_7,S7_9_8,S7_9_9,S7_9_10,S7_9_11,S7_9_12,S7_9_13,S7_10,S7_10_1,S7_10_2,S7_10_3,S7_10_4,S7_10_5,S7_10_6,S7_10_7,S7_10_8,S7_10_9,S7_10_10,S7_10_11,S7_10_12,S7_10_13,S8_1,S8_1_1,S8_1_2,S8_1_3,S8_1_4,S8_1_5,S8_1_6,S8_1_7,S8_1_8,S8_1_9,S8_1_10,S8_1_11,S8_1_12,S8_1_13,S8_1_14,S8_1_15,S8_2,S8_2_1,S8_2_2,S8_2_3,S8_2_4,S8_2_5,S8_2_6,S8_2_7,S8_2_8,S8_2_9,S8_2_10,S8_2_11,S8_2_12,S8_2_13,S8_3,S8_3_1,S8_3_2,S8_3_3,S8_3_4,S8_3_5,S8_3_6,S8_3_7,S8_3_8,S8_3_9,S8_3_10,S8_3_11,S8_4,S8_4_1,S8_4_2,S8_4_3,S8_4_4,S8_4_5,S8_4_6,S8_4_7,S8_4_8,S8_4_9,S8_4_10,S8_4_11,S8_4_12,S8_4_13,S8_5,S8_5_1,S8_5_2,S8_5_3,S8_5_4,S8_5_5,S8_5_6,S8_5_7,S8_5_8,S8_5_9,S8_5_10,S8_5_11,S8_5_12,S8_5_13,S8_6,S8_6_1,S8_6_2,S8_6_3,S8_6_4,S8_6_5,S8_6_6,S8_6_7,S8_6_8,S8_6_9,S8_6_10,S8_6_11,S8_6_12,S8_6_13,S8_7,S8_7_1,S8_7_2,S8_7_3,S8_7_4,S8_7_5,S8_7_6,S8_7_7,S8_7_8,S8_7_9,S8_7_10,S8_7_11,S8_7_12,S8_7_13,S8_8,S8_8_1,S8_8_2,S8_8_3,S8_8_4,S8_8_5,S8_8_6,S8_8_7,S8_8_8,S8_8_9,S8_8_10,S8_8_11,S8_8_12,S8_8_13,S9_1,S9_1_1,S9_1_2,S9_1_3,S9_1_4,S9_1_5,S9_1_6,S9_1_7,S9_1_8,S9_1_9,S9_1_10,S9_1_11,S9_1_12,S9_2,S9_2_1,S9_2_2,S9_2_3,S9_2_4,S9_2_5,S9_2_6,S9_2_7,S9_2_8,S9_2_9,S9_2_10,S9_2_11,S9_2_12,S9_2_13,S9_3,S9_3_1,S9_3_2,S9_3_3,S9_3_4,S9_3_5,S9_3_6,S9_3_7,S9_3_8,S9_3_9,S9_3_10,S9_3_11,S9_3_12,S9_3_13,S9_3_14,S9_4,S9_4_1,S9_4_2,S9_4_3,S9_4_4,S9_4_5,S9_4_6,S9_4_7,S9_4_8,S9_4_9,S9_4_10,S9_4_11,S9_4_12,S9_4_13,S9_5,S9_5_1,S9_5_2,S9_5_3,S9_5_4,S9_5_5,S9_5_6,S9_5_7,S9_5_8,S9_5_9,S9_5_10,S9_5_11,S9_5_12,S9_5_13,S9_5_14,S9_6,S9_6_1,S9_6_2,S9_6_3,S9_6_4,S9_6_5,S9_6_6,S9_6_7,S9_6_8,S9_6_9,S9_6_10,S9_6_11,S9_6_12,S9_6_13,S9_7,S9_7_1,S9_7_2,S9_7_3,S9_7_4,S9_7_5,S9_7_6,S9_7_7,S9_7_8,S9_7_9,S9_7_10,S9_7_11,S9_7_12,S9_7_13,S9_8,S9_8_1,S9_8_2,S9_8_3,S9_8_4,S9_8_5,S9_8_6,S9_8_7,S9_8_8,S9_8_9,S9_8_10,S9_8_11,S9_8_12,S9_8_13,S9_9,S9_9_1,S9_9_2,S9_9_3,S9_9_4,S9_9_5,S9_9_6,S9_9_7,S9_9_8,S9_9_9,S9_9_10,S9_9_11,S9_9_12,S9_9_13,S9_10,S9_10_1,S9_10_2,S9_10_3,S9_10_4,S9_10_5,S9_10_6,S9_10_7,S9_10_8,S9_10_9,S9_10_10,S9_10_11,S9_10_12,S9_10_13,S9_10_14,S10_1,S10_1_1,S10_1_2,S10_1_3,S10_1_4,S10_1_5,S10_1_6,S10_1_7,S10_1_8,S10_1_9,S10_1_10,S10_1_11,S10_1_12,S10_1_13,S10_1_14,S10_2,S10_2_1,S10_2_2,S10_2_3,S10_2_4,S10_2_5,S10_2_6,S10_2_7,S10_2_8,S10_2_9,S10_2_10,S10_2_11,S10_2_12,S10_2_13,S10_3,S10_3_1,S10_3_2,S10_3_3,S10_3_4,S10_3_5,S10_3_6,S10_3_7,S10_3_8,S10_3_9,S10_3_10,S10_3_11,S10_3_12,S10_3_13,S10_4,S10_4_1,S10_4_2,S10_4_3,S10_4_4,S10_4_5,S10_4_6,S10_4_7,S10_4_8,S10_4_9,S10_4_10,S10_4_11,S10_4_12,S10_4_13,S10_5,S10_5_1,S10_5_2,S10_5_3,S10_5_4,S10_5_5,S10_5_6,S10_5_7,S10_5_8,S10_5_9,S10_5_10,S10_5_11,S10_5_12,S10_5_13,S10_6,S10_6_1,S10_6_2,S10_6_3,S10_6_4,S10_6_5,S10_6_6,S10_6_7,S10_6_8,S10_6_9,S10_6_10,S10_6_11,S10_6_12,S10_6_13,S10_6_14,S10_7,S10_7_1,S10_7_2,S10_7_3,S10_7_4,S10_7_5,S10_7_6,S10_7_7,S10_7_8,S10_7_9,S10_7_10,S10_7_11,S10_7_12,S10_7_13,S10_8,S10_8_1,S10_8_2,S10_8_3,S10_8_4,S10_8_5,S10_8_6,S10_8_7,S10_8_8,S10_8_9,S10_8_10,S10_8_11,S10_8_12,S10_8_13,S10_9,S10_9_1,S10_9_2,S10_9_3,S10_9_4,S10_9_5,S10_9_6,S10_9_7,S10_9_8,S10_9_9,S10_9_10,S10_9_11,S10_9_12,S10_9_13,S10_10,S10_10_1,S10_10_2,S10_10_3,S10_10_4,S10_10_5,S10_10_6,S10_10_7,S10_10_8,S10_10_9,S10_10_10,S10_10_11,S10_10_12,S10_10_13,S10_10_14,S10_11,S10_11_1,S10_11_2,S10_11_3,S10_11_4,S10_11_5,S10_11_6,S10_11_7,S10_11_8,S10_11_9,S10_11_10,S10_11_11,S10_11_12,S10_11_13,S10_12,S10_12_1,S10_12_2,S10_12_3,S10_12_4,S10_12_5,S10_12_6,S10_12_7,S10_12_8,S10_12_9,S10_12_10,S10_12_11,S10_12_12,S10_12_13,S11_1,S11_1_1,S11_1_2,S11_1_3,S11_1_4,S11_1_5,S11_1_6,S11_1_7,S11_1_8,S11_1_9,S11_1_10,S11_1_11,S11_1_12,S11_1_13,S11_2,S11_2_1,S11_2_2,S11_2_3,S11_2_4,S11_2_5,S11_2_6,S11_2_7,S11_2_8,S11_2_9,S11_2_10,S11_2_11,S11_2_12,S11_2_13,S11_3,S11_3_1,S11_3_2,S11_3_3,S11_3_4,S11_3_5,S11_3_6,S11_3_7,S11_3_8,S11_3_9,S11_3_10,S11_3_11,S11_3_12,S11_3_13,S11_3_14,S11_4,S11_4_1,S11_4_2,S11_4_3,S11_4_4,S11_4_5,S11_4_6,S11_4_7,S11_4_8,S11_4_9,S11_4_10,S11_4_11,S11_4_12,S11_4_13,S11_5,S11_5_1,S11_5_2,S11_5_3,S11_5_4,S11_5_5,S11_5_6,S11_5_7,S11_5_8,S11_5_9,S11_5_10,S11_5_11,S11_5_12,S11_5_13,S11_6,S11_6_1,S11_6_2,S11_6_3,S11_6_4,S11_6_5,S11_6_6,S11_6_7,S11_6_8,S11_6_9,S11_6_10,S11_6_11,S11_6_12,S11_6_13,S11_6_14,S11_7,S11_7_1,S11_7_2,S11_7_3,S11_7_4,S11_7_5,S11_7_6,S11_7_7,S11_7_8,S11_7_9,S11_7_10,S11_7_11,S11_7_12,S11_7_13,S11_8,S11_8_1,S11_8_2,S11_8_3,S11_8_4,S11_8_5,S11_8_6,S11_8_7,S11_8_8,S11_8_9,S11_8_10,S11_8_11,S11_8_12,S11_8_13,S12_1,S12_1_1,S12_1_2,S12_1_3,S12_1_4,S12_1_5,S12_1_6,S12_1_7,S12_1_8,S12_1_9,S12_1_10,S12_1_11,S12_1_12,S12_2,S12_2_1,S12_2_2,S12_2_3,S12_2_4,S12_2_5,S12_2_6,S12_2_7,S12_2_8,S12_2_9,S12_2_10,S12_2_11,S12_2_12,S12_2_13,S12_3,S12_3_1,S12_3_2,S12_3_3,S12_3_4,S12_3_5,S12_3_6,S12_3_7,S12_3_8,S12_3_9,S12_3_10,S12_3_11,S12_3_12,S12_3_13,S12_4,S12_4_1,S12_4_2,S12_4_3,S12_4_4,S12_4_5,S12_4_6,S12_4_7,S12_4_8,S12_4_9,S12_4_10,S12_4_11,S12_4_12,S12_4_13,S12_5,S12_5_1,S12_5_2,S12_5_3,S12_5_4,S12_5_5,S12_5_6,S12_5_7,S12_5_8,S12_5_9,S12_5_10,S12_5_11,S12_5_12,S12_5_13,S12_6,S12_6_1,S12_6_2,S12_6_3,S12_6_4,S12_6_5,S12_6_6,S12_6_7,S12_6_8,S12_6_9,S12_6_10,S12_6_11,S12_6_12,S12_7,S12_7_1,S12_7_2,S12_7_3,S12_7_4,S12_7_5,S12_7_6,S12_7_7,S12_7_8,S12_7_9,S12_7_10,S12_7_11,S12_7_12,S12_7_13,S12_8,S12_8_1,S12_8_2,S12_8_3,S12_8_4,S12_8_5,S12_8_6,S12_8_7,S12_8_8,S12_8_9,S12_8_10,S12_8_11,S12_8_12,S13_1,S13_1_1,S13_1_2,S13_1_3,S13_1_4,S13_1_5,S13_1_6,S13_1_7,S13_1_8,S13_1_9,S13_1_10,S13_1_11,S13_1_12,S13_1_13,S13_2,S13_2_1,S13_2_2,S13_2_3,S13_2_4,S13_2_5,S13_2_6,S13_2_7,S13_2_8,S13_2_9,S13_2_10,S13_2_11,S13_2_12,S13_2_13,S13_3,S13_3_1,S13_3_2,S13_3_3,S13_3_4,S13_3_5,S13_3_6,S13_3_7,S13_3_8,S13_3_9,S13_3_10,S13_3_11,S13_3_12,S13_3_13,S13_4,S13_4_1,S13_4_2,S13_4_3,S13_4_4,S13_4_5,S13_4_6,S13_4_7,S13_4_8,S13_4_9,S13_4_10,S13_4_11,S13_4_12,S13_4_13,S13_5,S13_5_1,S13_5_2,S13_5_3,S13_5_4,S13_5_5,S13_5_6,S13_5_7,S13_5_8,S13_5_9,S13_5_10,S13_5_11,S13_5_12,S13_5_13,S13_6,S13_6_1,S13_6_2,S13_6_3,S13_6_4,S13_6_5,S13_6_6,S13_6_7,S13_6_8,S13_6_9,S13_6_10,S13_6_11,S13_6_12,S13_6_13,S14_1,S14_1_1,S14_1_2,S14_1_3,S14_1_4,S14_1_5,S14_1_6,S14_1_7,S14_1_8,S14_1_9,S14_1_10,S14_1_11,S14_1_12,S14_1_13,S14_2,S14_2_1,S14_2_2,S14_2_3,S14_2_4,S14_2_5,S14_2_6,S14_2_7,S14_2_8,S14_2_9,S14_2_10,S14_2_11,S14_2_12,S14_2_13,S14_3,S14_3_1,S14_3_2,S14_3_3,S14_3_4,S14_3_5,S14_3_6,S14_3_7,S14_3_8,S14_3_9,S14_3_10,S14_3_11,S14_3_12,S14_3_13,S14_4,S14_4_1,S14_4_2,S14_4_3,S14_4_4,S14_4_5,S14_4_6,S14_4_7,S14_4_8,S14_4_9,S14_4_10,S14_4_11,S14_4_12,S14_4_13,S14_5,S14_5_1,S14_5_2,S14_5_3,S14_5_4,S14_5_5,S14_5_6,S14_5_7,S14_5_8,S14_5_9,S14_5_10,S14_5_11,S14_5_12,S14_5_13,S14_6,S14_6_1,S14_6_2,S14_6_3,S14_6_4,S14_6_5,S14_6_6,S14_6_7,S14_6_8,S14_6_9,S14_6_10,S14_6_11,S14_6_12,S15_1,S15_1_1,S15_1_2,S15_1_3,S15_1_4,S15_1_5,S15_1_6,S15_1_7,S15_1_8,S15_1_9,S15_1_10,S15_1_11,S15_1_12,S15_1_13,S15_2,S15_2_1,S15_2_2,S15_2_3,S15_2_4,S15_2_5,S15_2_6,S15_2_7,S15_2_8,S15_2_9,S15_2_10,S15_2_11,S15_2_12,S15_2_13,S15_3,S15_3_1,S15_3_2,S15_3_3,S15_3_4,S15_3_5,S15_3_6,S15_3_7,S15_3_8,S15_3_9,S15_3_10,S15_3_11,S15_3_12,S15_3_13,S15_4,S15_4_1,S15_4_2,S15_4_3,S15_4_4,S15_4_5,S15_4_6,S15_4_7,S15_4_8,S15_4_9,S15_4_10,S15_4_11,S15_4_12,S15_4_13,S15_5,S15_5_1,S15_5_2,S15_5_3,S15_5_4,S15_5_5,S15_5_6,S15_5_7,S15_5_8,S15_5_9,S15_5_10,S15_5_11,S15_5_12,S15_5_13,S15_6,S15_6_1,S15_6_2,S15_6_3,S15_6_4,S15_6_5,S15_6_6,S15_6_7,S15_6_8,S15_6_9,S15_6_10,S15_6_11,S15_6_12,S15_6_13,S15_7,S15_7_1,S15_7_2,S15_7_3,S15_7_4,S15_7_5,S15_7_6,S15_7_7,S15_7_8,S15_7_9,S15_7_10,S15_7_11,S15_7_12,S15_7_13,S15_8,S15_8_1,S15_8_2,S15_8_3,S15_8_4,S15_8_5,S15_8_6,S15_8_7,S15_8_8,S15_8_9,S15_8_10,S15_8_11,S15_8_12,S15_8_13,S16_1,S16_1_1,S16_1_2,S16_1_3,S16_1_4,S16_1_5,S16_1_6,S16_1_7,S16_1_8,S16_1_9,S16_1_10,S16_1_11,S16_1_12,S16_2,S16_2_1,S16_2_2,S16_2_3,S16_2_4,S16_2_5,S16_2_6,S16_2_7,S16_2_8,S16_2_9,S16_2_10,S16_2_11,S16_2_12,S16_3,S16_3_1,S16_3_2,S16_3_3,S16_3_4,S16_3_5,S16_3_6,S16_3_7,S16_3_8,S16_3_9,S16_3_10,S16_3_11,S16_3_12,S16_3_13,S16_4,S16_4_1,S16_4_2,S16_4_3,S16_4_4,S16_4_5,S16_4_6,S16_4_7,S16_4_8,S16_4_9,S16_4_10,S16_4_11,S16_4_12,S16_4_13,S16_5,S16_5_1,S16_5_2,S16_5_3,S16_5_4,S16_5_5,S16_5_6,S16_5_7,S16_5_8,S16_5_9,S16_5_10,S16_5_11,S16_5_12,S16_5_13,S16_6,S16_6_1,S16_6_2,S16_6_3,S16_6_4,S16_6_5,S16_6_6,S16_6_7,S16_6_8,S16_6_9,S16_6_10,S16_6_11,S16_6_12,S16_6_13,S16_7,S16_7_1,S16_7_2,S16_7_3,S16_7_4,S16_7_5,S16_7_6,S16_7_7,S16_7_8,S16_7_9,S16_7_10,S16_7_11,S16_7_12,S16_7_13,S16_8,S16_8_1,S16_8_2,S16_8_3,S16_8_4,S16_8_5,S16_8_6,S16_8_7,S16_8_8,S16_8_9,S16_8_10,S16_8_11,S16_8_12,S16_8_13,S17_1,S17_1_1,S17_1_2,S17_1_3,S17_1_4,S17_1_5,S17_1_6,S17_1_7,S17_1_8,S17_1_9,S17_1_10,S17_1_11,S17_1_12,S17_2,S17_2_1,S17_2_2,S17_2_3,S17_2_4,S17_2_5,S17_2_6,S17_2_7,S17_2_8,S17_2_9,S17_2_10,S17_2_11,S17_2_12,S17_2_13,S17_3,S17_3_1,S17_3_2,S17_3_3,S17_3_4,S17_3_5,S17_3_6,S17_3_7,S17_3_8,S17_3_9,S17_3_10,S17_3_11,S17_3_12,S17_3_13,S17_4,S17_4_1,S17_4_2,S17_4_3,S17_4_4,S17_4_5,S17_4_6,S17_4_7,S17_4_8,S17_4_9,S17_4_10,S17_4_11,S17_4_12,S17_4_13,S17_5,S17_5_1,S17_5_2,S17_5_3,S17_5_4,S17_5_5,S17_5_6,S17_5_7,S17_5_8,S17_5_9,S17_5_10,S17_5_11,S17_5_12,S17_5_13,S17_6,S17_6_1,S17_6_2,S17_6_3,S17_6_4,S17_6_5,S17_6_6,S17_6_7,S17_6_8,S17_6_9,S17_6_10,S17_6_11,S17_6_12,S17_6_13,S17_7,S17_7_1,S17_7_2,S17_7_3,S17_7_4,S17_7_5,S17_7_6,S17_7_7,S17_7_8,S17_7_9,S17_7_10,S17_7_11,S17_7_12,S17_7_13,S17_8,S17_8_1,S17_8_2,S17_8_3,S17_8_4,S17_8_5,S17_8_6,S17_8_7,S17_8_8,S17_8_9,S17_8_10,S17_8_11,S17_8_12,S17_8_13 default