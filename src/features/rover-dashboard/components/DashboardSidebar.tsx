import { Globe, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/actions/auth";
import { Logo } from "@/components/ui/Logo";

interface DashboardSidebarProps {
  /** Signed-in username, or null when there is no session. */
  username: string | null;
}

interface SidebarItemContentProps {
  icon: ReactNode;
  label: string;
}

const itemClasses =
  "flex h-10 w-full items-center gap-3 rounded-full border border-transparent px-3 text-starlight/70 transition-colors hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold";

/** Icon + label. The label hides on narrow screens, where the sidebar collapses to icons only. */
function SidebarItemContent({ icon, label }: SidebarItemContentProps) {
  return (
    <>
      <span className="flex size-[18px] shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
      <span className="hidden truncate md:inline">{label}</span>
    </>
  );
}

/** Fixed sidebar on the left: navigation on top, session controls at the bottom. */
export function DashboardSidebar({ username }: DashboardSidebarProps) {
  return (
    <aside
      aria-label="Barra lateral"
      className="fixed inset-y-0 left-0 z-30 flex w-16 flex-col border-r border-line bg-void px-3 pb-4 text-base md:w-56"
    >
      {/* Same height as the page header, so the logo sits level with it. */}
      <div className="hidden h-20 shrink-0 items-center px-3 md:flex">
        <Link href="/dashboard" aria-label="SpaceMakers, Control de rover" className="text-white">
          <Logo className="h-6 w-auto" />
        </Link>
      </div>

      <nav aria-label="Dashboard" className="flex flex-col gap-1 max-md:pt-20">
        <Link
          href="/dashboard"
          aria-label="Control de rover"
          aria-current="page"
          className={`${itemClasses} border-line-strong text-gold`}
        >
          <SidebarItemContent icon={<LayoutDashboard className="size-[18px]" />} label="Control de rover" />
        </Link>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sitio público (se abre en una pestaña nueva)"
          className={itemClasses}
        >
          <SidebarItemContent icon={<Globe className="size-[18px]" />} label="Sitio público" />
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        {username ? (
          <>
            {/* Avatar is centered on the same axis as the 18px icons above and below it. */}
            <div className="flex h-12 items-center gap-3 pl-[5px]" title={username}>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-hull-soft text-sm font-normal text-cream"
              >
                {username.charAt(0).toLocaleUpperCase("es-MX")}
              </span>
              <span className="hidden truncate font-normal text-cream md:inline">{username}</span>
              <span className="sr-only">Sesión iniciada como {username}</span>
            </div>
            <form action={logout}>
              <button type="submit" aria-label="Cerrar sesión" className={`${itemClasses} cursor-pointer`}>
                <SidebarItemContent icon={<LogOut className="size-[18px]" />} label="Cerrar sesión" />
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" aria-label="Iniciar sesión" className={itemClasses}>
            <SidebarItemContent icon={<LogIn className="size-[18px]" />} label="Iniciar sesión" />
          </Link>
        )}
      </div>
    </aside>
  );
}
