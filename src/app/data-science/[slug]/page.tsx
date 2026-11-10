import type { Metadata } from "next";
import { getLegacyRedirectMetadata, LegacyRedirect } from "@/components/legacy-redirect";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((project) => project.slug === "customer-churn-prediction-retention-intelligence").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getLegacyRedirectMetadata(`/projects/${slug}/`);
}

export default async function LegacyDataScienceProjectRoute({ params }: Props) {
  const { slug } = await params;
  return <LegacyRedirect destination={`/projects/${slug}/`} />;
}
