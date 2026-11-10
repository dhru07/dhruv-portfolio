import { getLegacyRedirectMetadata, LegacyRedirect } from "@/components/legacy-redirect";

export const metadata = getLegacyRedirectMetadata("/roles/data-scientist/");

export default function LegacyDataScienceRoute() {
  return <LegacyRedirect destination="/roles/data-scientist/" />;
}
