"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { toneStyles } from "@/components/pillars/toneStyles";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/types/content";

const SIDEBAR_STORAGE_KEY = "sm-sidebar-open";
const SIDEBAR_CHANGE_EVENT = "sm-sidebar-change";

/** The saved "sidebar open" preference. Reads and writes fail silently when storage is unavailable. */
const sidebarPreference = {
  subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(SIDEBAR_CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(SIDEBAR_CHANGE_EVENT, onChange);
    };
  },
  read(): boolean {
    try {
      return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  },
  write(isOpen: boolean) {
    try {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, isOpen ? "1" : "0");
    } catch {
      // Storage is blocked: the preference simply is not remembered.
    }
    window.dispatchEvent(new Event(SIDEBAR_CHANGE_EVENT));
  },
};

const isCurrent = (item: NavItem, pathname: string) =>
  item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

function MenuIcon() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-1">
      <span className="block h-px w-4 bg-current" />
      <span className="block h-px w-4 bg-current" />
      <span className="block h-px w-4 bg-current" />
    </span>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

interface NavListProps {
  navigation: NavItem[];
  pathname: string;
  /** Larger touch targets, used in the mobile panel. */
  large?: boolean;
  onNavigate?: () => void;
}

function NavList({ navigation, pathname, large = false, onNavigate }: NavListProps) {
  return (
    <ul className="space-y-0.5">
      {navigation.map((item) => {
        const current = isCurrent(item, pathname);
        return (
          <li key={item.href} className={item.gapBefore ? "pt-4" : undefined}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={`flex items-center gap-3 transition-colors ${large ? "py-3 text-h2" : "py-2 text-body"} ${
                current ? "text-gold" : "text-mist hover:text-starlight"
              }`}
            >
              {item.tone && <span aria-hidden="true" className={`size-1.5 shrink-0 ${toneStyles[item.tone].background}`} />}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

interface MobileMenuProps {
  navigation: NavItem[];
  pathname: string;
  onClose: () => void;
}

/** Full-screen navigation panel for small screens. Esc closes it and the page behind does not scroll. */
function MobileMenu({ navigation, pathname, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menú" className="fixed inset-0 z-[60] overflow-y-auto bg-void md:hidden">
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
        className="absolute top-2 right-2 flex size-11 items-center justify-center text-2xl leading-none text-starlight"
      >
        <span aria-hidden="true">×</span>
      </button>
      <nav aria-label="Principal" className="px-4 pt-16 pb-8">
        <NavList navigation={navigation} pathname={pathname} onNavigate={onClose} large />
        <Link href="/login" onClick={onClose} className="mt-6 flex items-center gap-3 border-t border-line pt-5 text-body text-mist">
          <UserIcon />
          Acceso para miembros
        </Link>
      </nav>
    </div>
  );
}

interface SiteShellProps {
  navigation: NavItem[];
  children: ReactNode;
}

/**
 * Public site frame: a left sidebar that holds the logo and the navigation, next to the content.
 * On desktop the sidebar is a rail that pushes the content when opened. Its state is remembered,
 * except on the home page, which always starts closed. On mobile it is a top bar plus an overlay panel.
 */
export function SiteShell({ navigation, children }: SiteShellProps) {
  const pathname = usePathname();
  const savedOpen = useSyncExternalStore(sidebarPreference.subscribe, sidebarPreference.read, () => false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  const isHome = pathname === "/";
  const isOpen = isHome ? homeOpen : savedOpen;

  const toggleSidebar = () => {
    if (isHome) setHomeOpen(!homeOpen);
    else sidebarPreference.write(!savedOpen);
  };

  return (
    <div className="md:grid md:grid-cols-[auto_minmax(0,1fr)]">
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-void/90 pr-1 pl-4 backdrop-blur md:hidden">
        <Link href="/" aria-label="Space Makers, ir al inicio" className="text-white">
          <Logo className="h-7 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          aria-label="Abrir menú"
          className="flex size-11 items-center justify-center text-starlight"
        >
          <MenuIcon />
        </button>
      </div>

      <aside
        aria-label="Navegación principal"
        className={`sticky top-0 ml-3 hidden h-svh flex-col self-start border-r border-line/60 bg-void md:flex ${isOpen ? "w-max" : "w-11"}`}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          aria-controls="sidebar-nav"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex size-12 shrink-0 items-center justify-center text-mist transition-colors hover:text-starlight"
        >
          <MenuIcon />
        </button>
        {isOpen && (
          <>
            <Link href="/" aria-label="Space Makers, ir al inicio" className="mt-2 block px-6 text-white">
              <Logo className="h-7 w-auto" />
            </Link>
            <nav id="sidebar-nav" aria-label="Principal" className="overflow-y-auto px-6 pt-7">
              <NavList navigation={navigation} pathname={pathname} />
            </nav>
          </>
        )}
        <Link
          href="/login"
          aria-label="Acceso para miembros"
          aria-current={pathname === "/login" ? "page" : undefined}
          className={`mt-auto transition-colors hover:text-gold ${
            isOpen ? "flex items-center gap-3 border-t border-line px-6 py-4 text-caption" : "flex size-11 items-center justify-center"
          } ${pathname === "/login" ? "text-gold" : "text-mist"}`}
        >
          <UserIcon />
          {isOpen && "Acceso miembros"}
        </Link>
      </aside>

      <div className="min-w-0">{children}</div>

      {isMobileOpen && <MobileMenu navigation={navigation} pathname={pathname} onClose={closeMobileMenu} />}
    </div>
  );
}
