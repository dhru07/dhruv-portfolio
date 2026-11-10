import { getLegacyRedirectMetadata, LegacyRedirect } from "@/components/legacy-redirect";

export const metadata = getLegacyRedirectMetadata("/roles/data-engineer/");

export default function LegacyEngineeringRoute() {
  return <LegacyRedirect destination="/roles/data-engineer/" />;
}
