import { Globe, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { Logo } from "@/components/ui/Logo";
import { SidebarItemContent, sidebarItemClassName } from "@/features/rover-dashboard/components/SidebarItem";
import { SidebarNav } from "@/features/rover-dashboard/components/SidebarNav";

interface DashboardSidebarProps {
  /** Signed-in username, or null when there is no session. */
  username: string | null;
}

/** Fixed sidebar on the left: navigation on top, session controls at the bottom. */
export function DashboardSidebar({ username }: DashboardSidebarProps) {
  return (
    <aside
      aria-label="Barra lateral"
      className="fixed bottom-0 left-0 top-14 z-30 flex w-64 flex-col border-r border-line bg-void px-3 py-4 text-sm transition-[transform,visibility] duration-200 max-lg:invisible max-lg:-translate-x-full max-lg:group-data-[open=true]/shell:visible max-lg:group-data-[open=true]/shell:translate-x-0 lg:inset-y-0 lg:w-52 lg:py-0 lg:pb-4"
    >
      {/* Same height as the page header, so the logo sits level with it. */}
      <div className="hidden h-[4.25rem] shrink-0 items-center px-3 lg:flex">
        <Link href="/dashboard" aria-label="SpaceMakers, Control de rover" className="text-white">
          <Logo className="h-5 w-auto" />
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        <SidebarNav />
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sitio público (se abre en una pestaña nueva)"
          className={sidebarItemClassName()}
        >
          <SidebarItemContent icon={<Globe className="size-4" />} label="Sitio público" />
        </Link>
      </div>

      <div className="mt-auto flex flex-col gap-1">
        {username ? (
          <>
            {/* Avatar is centered on the same axis as the 18px icons above and below it. */}
            <div className="flex h-11 items-center gap-2.5 pl-[6px]" title={username}>
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-hull-soft text-xs font-normal text-cream"
              >
                {username.charAt(0).toLocaleUpperCase("es-MX")}
              </span>
              <span className="truncate font-normal text-cream">{username}</span>
              <span className="sr-only">Sesión iniciada como {username}</span>
            </div>
            <form action={logout}>
              <button type="submit" aria-label="Cerrar sesión" className={sidebarItemClassName(false, "cursor-pointer")}>
                <SidebarItemContent icon={<LogOut className="size-4" />} label="Cerrar sesión" />
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" aria-label="Iniciar sesión" className={sidebarItemClassName()}>
            <SidebarItemContent icon={<LogIn className="size-4" />} label="Iniciar sesión" />
          </Link>
        )}
      </div>
    </aside>
  );
}
