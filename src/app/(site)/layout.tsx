import { SiteDocument, siteMetadata, siteViewport } from "@/components/layout/SiteDocument";
import { SiteFrame } from "@/components/layout/SiteFrame";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/** Root layout for every public page. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SiteDocument>
      <SiteFrame withFooter>{children}</SiteFrame>
    </SiteDocument>
  );
}
