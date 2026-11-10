import { readdirSync } from "node:fs";
import path from "node:path";

export interface ResumeDownload {
  label: "Data Analyst" | "Data Engineering";
  fileName?: string;
}

export function getResumeDownloads(): ResumeDownload[] {
  const resumeDirectory = path.join(process.cwd(), "public", "resume");
  let files: string[] = [];
  try {
    files = readdirSync(resumeDirectory)
      .filter((fileName) => fileName.toLowerCase().endsWith(".pdf"))
      .sort((left, right) => left.localeCompare(right));
  } catch { /* An empty list keeps the resume buttons in their coming-soon state. */ }

  const analystResume = files.find((fileName) => /(?:^|[^a-z0-9])(?:da|data[ _-]*analyst)(?:[^a-z0-9]|$)/i.test(fileName));
  const engineeringResume = files.find((fileName) => /(?:^|[^a-z0-9])(?:de|data[ _-]*engineering)(?:[^a-z0-9]|$)/i.test(fileName));

  return [
    { label: "Data Analyst", fileName: analystResume },
    { label: "Data Engineering", fileName: engineeringResume },
  ];
}
