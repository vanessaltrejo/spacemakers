"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { NavItem } from "@/types/content";

interface NavbarProps {
  navigation: NavItem[];
  joinCta: NavItem;
}

const toSectionId = (href: string): string => href.replace("#", "");

export function Navbar({ navigation, joinCta }: NavbarProps) {
  const activeSection = useActiveSection(navigation.map((item) => toSectionId(item.href)));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled || isMenuOpen ? "bg-panel/90 backdrop-blur-md" : "bg-panel"
      }`}
    >
      <nav
        aria-label="Principal"
        className="container-page flex h-14 items-center justify-between gap-4"
      >
        <a href="#inicio" onClick={closeMenu} className="text-white" aria-label="SpaceMakers, ir al inicio">
          <Logo className="h-8 w-auto sm:h-9" />
        </a>

        <ul className="hidden h-full items-stretch md:flex">
          {navigation.map((item) => {
            const isActive = activeSection === toSectionId(item.href);
            return (
              <li key={item.href} className="relative flex">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 border-x border-b border-cobalt/80 bg-cobalt/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center px-6 font-display text-sm transition-colors lg:px-8 ${
                    isActive ? "text-white" : "text-starlight/75 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={joinCta.href}
            className="hidden rounded-sm bg-cobalt px-4 py-1.5 font-display text-sm text-white shadow-[0_0_0_rgba(11,26,160,0)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(60,80,255,0.45)] sm:inline-block"
          >
            {joinCta.label}
          </a>
          <button
            type="button"
            disabled
            title="Portal de miembros (próximamente)"
            aria-label="Portal de miembros (próximamente)"
            className="hidden size-8 items-center justify-center rounded-full bg-white text-panel sm:flex"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-6 bg-white transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {[...navigation, joinCta].map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={`block rounded-sm px-3 py-3 font-display text-lg ${
                      item.href === joinCta.href ? "mt-2 bg-cobalt text-white" : "text-starlight"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
