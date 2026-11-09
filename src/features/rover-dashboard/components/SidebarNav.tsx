"use client";

import { Building2, LayoutDashboard, Satellite } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SidebarItemContent, sidebarItemClassName } from "@/features/rover-dashboard/components/SidebarItem";

interface SidebarNavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const navItems: SidebarNavItem[] = [
  { href: "/dashboard", label: "Control de rover", icon: <LayoutDashboard className="size-4" /> },
  { href: "/dashboard/satelites", label: "Control de satélite", icon: <Satellite className="size-4" /> },
  { href: "/dashboard/kyutech", label: "Control de Kyutech", icon: <Building2 className="size-4" /> },
];

/** Dashboard sections. A client component only so it can highlight the current page. */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={sidebarItemClassName(isActive)}
          >
            <SidebarItemContent icon={item.icon} label={item.label} />
          </Link>
        );
      })}
    </nav>
  );
}
