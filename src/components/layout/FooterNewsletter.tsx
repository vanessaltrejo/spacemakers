"use client";

import { usePathname } from "next/navigation";
import { SubscribeForm } from "@/components/news/SubscribeForm";

/** Footer subscription. Hidden on /newsletter, which already has the full form. */
export function FooterNewsletter() {
  const pathname = usePathname();
  if (pathname === "/newsletter") return null;

  return (
    <section aria-labelledby="footer-newsletter">
      <h2 id="footer-newsletter" className="label-mono text-gold">
        Newsletter
      </h2>
      <div className="mt-3">
        <SubscribeForm compact />
      </div>
    </section>
  );
}
