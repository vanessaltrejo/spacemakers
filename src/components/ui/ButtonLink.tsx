import type { ReactNode } from "react";

type ButtonVariant = "cobalt" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** Shows the trailing arrow. */
  withArrow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  cobalt: "bg-cobalt text-white hover:bg-[#1426c8]",
  ghost: "border border-line-strong text-starlight hover:border-gold hover:text-gold",
};

/** Anchor styled as a button. */
export function ButtonLink({ href, children, variant = "cobalt", className = "", withArrow = false }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`group/button inline-flex h-10 items-center justify-center gap-2 px-5 text-caption font-medium transition-colors duration-300 ${variantClasses[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <span aria-hidden="true" className="transition-transform duration-300 group-hover/button:translate-x-1">
          →
        </span>
      )}
    </a>
  );
}
