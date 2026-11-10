import { getLegacyRedirectMetadata, LegacyRedirect } from "@/components/legacy-redirect";

export const metadata = getLegacyRedirectMetadata("/roles/data-analyst/");

export default function LegacyAnalyticsRoute() {
  return <LegacyRedirect destination="/roles/data-analyst/" />;
}
