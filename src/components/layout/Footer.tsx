import Link from "next/link";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { SiteInfo } from "@/types/content";

interface FooterProps {
  site: SiteInfo;
}

/** Brand, newsletter and contact in one compact band. Navigation lives in the sidebar. */
export function Footer({ site }: FooterProps) {
  const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="border-t border-line">
      <div className="container-page">
        <div className="grid max-w-[1560px] gap-8 py-6 lg:grid-cols-[minmax(0,25fr)_minmax(0,28fr)_minmax(0,31fr)] 2xl:grid-cols-[minmax(0,25rem)_minmax(0,28rem)_minmax(0,31rem)] lg:justify-between lg:gap-x-12">
          <div>
            <Link href="/" className="inline-block text-white" aria-label="Space Makers, ir al inicio">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="mt-3 max-w-sm text-caption text-mist">{site.description}</p>
          </div>

          <FooterNewsletter />

          <section aria-labelledby="footer-contact">
            <div className="flex items-center gap-5">
              <h2 id="footer-contact" className="label-mono text-gold">
                Contacto
              </h2>
              <ul className="flex items-center gap-3">
                {site.socials.map((social) => (
                  <li key={social.network}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="block opacity-90 transition-opacity hover:opacity-100"
                    >
                      <SocialIcon network={social.network} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <address className="mt-3 space-y-1 text-caption not-italic text-starlight/80">
              <p className="flex flex-wrap items-center gap-x-2">
                <a href={phoneHref} className="whitespace-nowrap transition-colors hover:text-gold">
                  {site.phone}
                </a>
                <span aria-hidden="true" className="text-mist">
                  ·
                </span>
                <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-gold">
                  {site.email}
                </a>
              </p>
              <p className="text-mist">{site.addressLines.join(" ")}</p>
            </address>
          </section>
        </div>

      </div>
    </footer>
  );
}
