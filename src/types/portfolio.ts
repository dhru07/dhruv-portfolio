export type ProjectStatus = "completed" | "in-progress" | "planned";

export type ProjectCategory =
  | "analytics"
  | "engineering"
  | "data-science"
  | "ai-engineering";

export interface DatasetInfo {
  name: string;
  description?: string;
  recordCount?: number;
  sourceUrl?: string;
}

export interface ArchitectureStep {
  name: string;
  description?: string;
}

export interface ImplementationSection {
  title: string;
  content: string;
  bullets?: string[];
}

export interface Metric {
  label: string;
  value: string;
  context?: string;
}

export interface Finding {
  title: string;
  description: string;
}

export interface ProjectAsset {
  src: string;
  alt: string;
  caption?: string;
}

export interface DocumentationLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory[];
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  description: string;
  businessProblem: string;
  objectives: string[];
  technologies: string[];
  tags?: string[];
  dataset?: DatasetInfo;
  architecture?: ArchitectureStep[];
  implementation: ImplementationSection[];
  metrics: Metric[];
  findings?: Finding[];
  limitations?: string[];
  screenshots?: ProjectAsset[];
  diagrams?: ProjectAsset[];
  githubUrl?: string;
  liveUrl?: string;
  documentationUrls?: DocumentationLink[];
  displayOrder: number;
}

export interface ExperienceEntry {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  businessContext?: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  field: string;
  startDate?: string;
  completionDate?: string;
  grade?: string;
}

export interface Certification {
  name: string;
  issuer?: string;
  date?: string;
  url?: string;
}

export interface Profile {
  name: string;
  professionalIdentity?: string;
  location?: string;
  introduction?: string;
  philosophy?: string;
  interests?: string[];
  email?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  phone?: string;
}
