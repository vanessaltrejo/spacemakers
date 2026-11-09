'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';

interface DashboardShellProps {
  /** The sidebar (server-rendered), passed in so it can slide in as a drawer on small screens. */
  sidebar: ReactNode;
  children: ReactNode;
}

/**
 * Sidebar + content offset. From 1024px up the sidebar is always visible. Below that it becomes a drawer
 * opened from a slim top bar. Lives in the feature folder so its classes are in the dashboard's Tailwind build.
 */
export function DashboardShell({ sidebar, children }: DashboardShellProps) {
  const pathname = usePathname();
  // The drawer is "open for this path": navigating anywhere closes it without an extra effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedAt(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div data-open={isOpen} className="group/shell">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-line bg-void px-2 lg:hidden">
        <button
          type="button"
          onClick={() => setOpenedAt(isOpen ? null : pathname)}
          aria-expanded={isOpen}
          aria-controls="dashboard-sidebar"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full text-starlight transition-colors hover:text-gold"
        >
          {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
        <Link href="/dashboard" aria-label="SpaceMakers, Control de rover" className="text-white">
          <Logo className="h-5 w-auto" />
        </Link>
      </header>

      {isOpen ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Cerrar menú"
          onClick={() => setOpenedAt(null)}
          className="fixed inset-0 top-14 z-20 cursor-default bg-void/70 lg:hidden"
        />
      ) : null}

      <div id="dashboard-sidebar">{sidebar}</div>
      <div className="lg:pl-52">{children}</div>
    </div>
  );
}
