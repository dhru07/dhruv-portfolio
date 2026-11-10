import type { SkillCategory } from "@/types/portfolio";

export const skills: SkillCategory[] = [
  {
    name: "Programming and Querying",
    skills: ["Python", "SQL", "MySQL", "PostgreSQL", "SQL Server", "BigQuery SQL", "VBA", "JSON", "JavaScript fundamentals"],
  },
  {
    name: "Analytics and BI",
    skills: ["Power BI", "DAX", "Tableau", "Excel", "Power Query", "Zoho Analytics", "Pandas", "NumPy", "KPI reporting", "Data visualization", "Exploratory data analysis", "Hypothesis testing", "RFM segmentation", "Feature engineering"],
  },
  {
    name: "Data Engineering",
    skills: ["ETL / ELT", "API ingestion", "Batch processing", "Incremental processing", "Data validation", "Data quality", "Data reconciliation", "Idempotency", "Data warehousing", "Dimensional modeling", "SCD Type 2"],
  },
  {
    name: "Big Data and Streaming",
    skills: ["Apache Spark", "PySpark", "Spark Structured Streaming", "Apache Kafka", "Kafka KRaft", "Hive", "Event streaming", "Dead Letter Queues", "Event-time windows", "Watermarks", "Deduplication"],
  },
  {
    name: "Cloud",
    skills: ["Google Cloud Platform", "BigQuery", "Microsoft Azure", "Azure Databricks", "Unity Catalog", "Delta Lake", "AWS fundamentals"],
  },
  {
    name: "Orchestration and Transformation",
    skills: ["Apache Airflow", "Airflow DAGs", "XCom", "dbt Core", "dbt-bigquery", "SQL transformations"],
  },
  {
    name: "Machine Learning",
    skills: ["Scikit-learn", "Logistic Regression", "Random Forest", "XGBoost", "SHAP", "StandardScaler", "OneHotEncoder", "Classification metrics", "Model evaluation", "Model explainability"],
  },
  {
    name: "DevOps and Development",
    skills: ["Docker", "Docker Compose", "Git", "GitHub", "GitHub Actions", "Pytest", "Postman", "Jupyter", "Google Colab", "VS Code"],
  },
];
