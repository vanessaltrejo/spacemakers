import { SiteDocument, siteMetadata, siteViewport } from "@/components/layout/SiteDocument";
import { SiteFrame } from "@/components/layout/SiteFrame";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/** Root layout for the auth pages: same frame as the site, without the footer. */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <SiteDocument>
      <SiteFrame>{children}</SiteFrame>
    </SiteDocument>
  );
}
