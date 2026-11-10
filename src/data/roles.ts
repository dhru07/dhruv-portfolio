import { aiEngineeringDevelopmentAreas, dataScienceDevelopmentAreas, plannedAiProject } from "@/data/future";

export const roles = [
  {
    slug: "data-analyst",
    title: "Data Analyst",
    summary: "Analytics across customer, campaign, e-commerce, and market data.",
    emerging: false,
    resumeLabel: "Data Analyst",
    projectSlugs: [
      "marketing-campaign-intelligence-customer-analytics",
      "e-commerce-sales-customer-analytics",
      "crypto-market-analytics",
      "customer-churn-prediction-retention-intelligence",
    ],
    metricLabels: {
      "marketing-campaign-intelligence-customer-analytics": "Total revenue",
      "e-commerce-sales-customer-analytics": "Revenue",
      "crypto-market-analytics": "Assets retrieved per snapshot",
      "customer-churn-prediction-retention-intelligence": "ROC-AUC",
    },
    skillCategories: ["Programming and Querying", "Analytics and BI"],
    developmentAreas: [],
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    summary: "ETL, lakehouse, streaming, and data warehouse systems.",
    emerging: false,
    resumeLabel: "Data Engineering",
    projectSlugs: [
      "weather-data-engineering-pipeline",
      "olist-brazilian-e-commerce-lakehouse",
      "real-time-clickstream-analytics-pipeline",
      "nexusflow-b2b-saas-analytics-data-warehouse",
    ],
    metricLabels: {
      "weather-data-engineering-pipeline": "Daily forecast records at final validation",
      "olist-brazilian-e-commerce-lakehouse": "Delta tables",
      "real-time-clickstream-analytics-pipeline": "Benchmark batch",
      "nexusflow-b2b-saas-analytics-data-warehouse": "Bytes-scanned reduction",
    },
    skillCategories: ["Programming and Querying", "Data Engineering", "Big Data and Streaming", "Cloud", "Orchestration and Transformation", "DevOps and Development"],
    developmentAreas: [],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    summary: "Predictive analytics alongside developing statistical and machine-learning skills.",
    emerging: true,
    resumeLabel: "Data Analyst",
    projectSlugs: ["customer-churn-prediction-retention-intelligence"],
    metricLabels: { "customer-churn-prediction-retention-intelligence": "ROC-AUC" },
    skillCategories: ["Programming and Querying", "Analytics and BI", "Machine Learning"],
    developmentAreas: dataScienceDevelopmentAreas,
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    summary: "Developing toward LLM applications, RAG, agents, and intelligent automation.",
    emerging: true,
    resumeLabel: null,
    projectSlugs: [],
    metricLabels: {},
    skillCategories: ["Programming and Querying", "Data Engineering", "DevOps and Development"],
    developmentAreas: aiEngineeringDevelopmentAreas,
  },
] as const;

export { plannedAiProject };
