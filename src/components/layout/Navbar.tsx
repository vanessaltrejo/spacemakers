"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/types/content";

interface NavbarProps {
  navigation: NavItem[];
  joinCta: NavItem;
}

export function Navbar({ navigation, joinCta }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/70 backdrop-blur-xl">
      <nav aria-label="Principal" className="container-page grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <Link href="/" onClick={closeMenu} className="justify-self-start text-white" aria-label="SpaceMakers, ir al inicio">
          <Logo className="h-5 w-auto sm:h-6" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isActive ? "text-gold" : "text-starlight/70 hover:text-starlight"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-self-end gap-3">
          <Link
            href={joinCta.href}
            className="hidden h-8 items-center rounded-full bg-cobalt px-3.5 text-xs font-medium tracking-tight text-white transition-colors hover:bg-[#1426c8] sm:inline-flex"
          >
            {joinCta.label}
          </Link>
          <Link
            href="/login"
            aria-label="Iniciar sesión"
            aria-current={pathname === "/login" ? "page" : undefined}
            className={`flex size-8 items-center justify-center rounded-full border transition-colors hover:border-gold hover:text-gold ${
              pathname === "/login" ? "border-gold text-gold" : "border-line-strong text-starlight/70"
            }`}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" strokeLinecap="round" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex size-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-5 bg-white transition-transform ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-white transition-transform ${isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block py-4 text-2xl font-light tracking-tight ${
                      pathname === item.href ? "text-gold" : "text-starlight"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <Link
                  href={joinCta.href}
                  onClick={closeMenu}
                  className="flex h-11 items-center justify-center rounded-full bg-cobalt text-sm font-medium text-white"
                >
                  {joinCta.label}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
