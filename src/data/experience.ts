import type { ExperienceEntry } from "@/types/portfolio";

export const experience: ExperienceEntry[] = [
  {
    company: "Certa",
    position: "Technical Solutions Consultant",
    startDate: "November 2025",
    endDate: "August 2026",
    businessContext: "B2B SaaS / Third-party risk management / Workflow automation.",
    responsibilities: [
      "Translated client business requirements into configurable SaaS workflows and event-condition-action (ECA) rules.",
      "Worked on vendor onboarding, ESG, and Third-Party Risk Management (TPRM) workflows.",
      "Built and delivered custom pre-sales demos and proof-of-concepts, including customer work involving a global asset manager.",
      "Contributed to RFI/RFP responses covering solution approaches, workflow design, and integrations.",
      "Configured ECA-based automation across parent and child workflows; configured JSON workflows and tested REST API integrations using Postman.",
      "Collaborated with Product and Engineering to resolve implementation issues.",
      "Participated in testing Certa's Design Agent (AI workflow builder) and helped set up the Contracts Agent for vendor contract and document analysis.",
    ],
    technologies: ["SaaS", "JSON", "REST APIs", "Postman", "ECA", "Workflow automation", "Integrations", "Client demonstrations", "Technical solution design", "Cross-functional collaboration"],
    achievements: [
      "Translated requirements into 18+ configurable workflows and ECA rules.",
      "Delivered 10+ custom pre-sales demos and proof-of-concepts.",
      "Contributed to multiple closed deals; served as lead demo builder on two.",
      "Contributed to 5+ RFI/RFP responses.",
      "Delivered integrations involving ID-Pal (identity verification) and RapidRatings (financial health ratings).",
    ],
  },
  {
    company: "Galytix",
    position: "Data Analyst Intern",
    startDate: "April 2025",
    endDate: "October 2025",
    businessContext: "Teams: GAWA and QUAL. Project/workstream: CREDITX Structured Lending Model.",
    responsibilities: [
      "Cleaned and standardized financial data from annual and quarterly filings.",
      "Prepared consistent structured inputs for downstream quantitative analysis and modeling.",
      "Developed Excel VBA macros and Power Query workflows to automate recurring data preparation.",
      "Validated datasets in collaboration with the Quant team and corrected data inconsistencies and quality issues before downstream analysis.",
    ],
    technologies: ["Excel", "VBA", "Power Query", "Financial data processing", "Data validation"],
    achievements: [
      "Reduced a recurring per-file preparation task from three hours to 40 minutes.",
      "Enabled processing of approximately 6–8 financial reports per day, depending on file size.",
    ],
  },
  {
    company: "RegisterKaro",
    position: "Data Analyst Intern",
    startDate: "February 2025",
    endDate: "March 2025",
    businessContext: "Worked directly with the co-founder in the founder's office.",
    responsibilities: [
      "Helped centralize scattered and unstructured business data into a structured reporting workflow.",
      "Used SQL to analyze customer, order, and marketing records.",
      "Prepared datasets supporting Zoho Analytics dashboards covering operational turnaround, campaign performance, advertising revenue, advertising cost and ROAS, and HR performance.",
      "Automated recurring reporting through Zoho Flow.",
    ],
    technologies: ["SQL", "Zoho Analytics", "Zoho Flow", "Excel", "Data preparation", "Reporting automation"],
    achievements: [
      "Analyzed 857K customer, order, and marketing records.",
      "Prepared datasets supporting four Zoho Analytics dashboards.",
      "Improved operational efficiency by approximately 25% and reduced hours of manual data cleaning and reporting work.",
    ],
  },
];
