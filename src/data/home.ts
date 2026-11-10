export const homeContent = {
  headline: "Turning Data Into Decisions. Engineering Systems That Scale.",
  disciplines: ["Data Analytics", "Data Engineering", "Data Science", "AI Engineering"],
  hero: {
    headlineLead: "Turning data into",
    headlineHighlight: "decisions.",
    headlineSecondLine: "Engineering the systems behind them.",
    capabilityLines: [
      { labels: ["Data Analytics", "Data Engineering"] },
      { status: "Emerging", labels: ["Data Science", "AI Engineering"] },
    ] satisfies Array<{ labels: string[]; status?: string }>,
  },
  roles: [
    {
      title: "Data Analyst",
      summary: "Analytics across customer, campaign, e-commerce, and market data.",
      href: "/roles/data-analyst",
    },
    {
      title: "Data Engineer",
      summary: "ETL, lakehouse, streaming, and data warehouse systems.",
      href: "/roles/data-engineer",
    },
    {
      title: "Data Scientist",
      status: "Emerging",
      summary: "Predictive analytics alongside developing statistical and machine-learning skills.",
      href: "/roles/data-scientist",
    },
    {
      title: "AI Engineer",
      status: "Emerging",
      summary: "Developing toward LLM applications, RAG, agents, and intelligent automation.",
      href: "/roles/ai-engineer",
    },
  ] satisfies Array<{ title: string; summary: string; href: string; status?: string }>,
  stats: [
    { key: "analytics", label: "Analytics projects" },
    { key: "engineering", label: "Engineering projects" },
    { key: "experience", label: "Experience entries" },
    { key: "projects", label: "Flagship projects" },
  ] as const,
};
