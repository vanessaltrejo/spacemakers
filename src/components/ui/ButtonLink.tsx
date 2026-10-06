import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "cobalt";
type ButtonSize = "sm" | "md";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Shows the animated trailing arrow. */
  withArrow?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gold text-void hover:bg-cream",
  ghost: "border border-line-strong text-starlight hover:border-gold hover:text-gold",
  cobalt: "bg-cobalt text-white hover:bg-[#1426c8]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-xs",
  md: "h-11 px-5 text-sm",
};

/** Anchor styled as a button. Used for in-page anchors and mailto links. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
  onClick,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group/button inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/button:translate-x-1"
        >
          →
        </span>
      )}
    </a>
  );
}
