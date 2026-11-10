import { getLegacyRedirectMetadata, LegacyRedirect } from "@/components/legacy-redirect";

export const metadata = getLegacyRedirectMetadata("/roles/ai-engineer/");

export default function LegacyAiEngineeringRoute() {
  return <LegacyRedirect destination="/roles/ai-engineer/" />;
}
