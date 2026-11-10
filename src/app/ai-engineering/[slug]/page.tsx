import type { Metadata } from "next";
import { getLegacyRedirectMetadata, LegacyRedirect } from "@/components/legacy-redirect";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "ai-powered-sql-agent" }];
}

export function generateMetadata(): Metadata {
  return getLegacyRedirectMetadata("/roles/ai-engineer/");
}

export default async function LegacyAiEngineeringProjectRoute({ params }: Props) {
  await params;
  return <LegacyRedirect destination="/roles/ai-engineer/" />;
}
