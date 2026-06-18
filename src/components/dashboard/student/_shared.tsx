import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

/* Page wrapper applying the global student page rules */
export function PageWrap({ children }: { children: ReactNode }) {
  return (
    <div
      className="space-y-6 sm:space-y-8 pb-20 md:pb-6"
      style={{ animation: "var(--animate-fade-up)" }}
    >
      {children}
    </div>
  );
}

/* Page header with brand accent + optional right action */
export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 block h-6 w-1 rounded-full bg-brand sm:mt-1.5 sm:h-7" />
        <div>
          <h1
            className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[34px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
          )}
        </div>
      </div>
      {right && <div className="w-full shrink-0 sm:w-auto">{right}</div>}
    </div>
  );
}

/* Inline section header (smaller, for sub-sections within a page) */
export function SubHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:mb-5 sm:flex-row sm:items-end">
      <div className="flex items-start gap-2.5">
        <span className="mt-1 block h-5 w-1 rounded-full bg-brand sm:h-6" />
        <div>
          <h2
            className="text-lg font-extrabold tracking-tight text-ink sm:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

/* Neumorphic card */
export function Card({
  children,
  className = "",
  padded = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(229,228,224,0.5)] bg-surface ${padded ? "p-4 sm:p-5 lg:p-6" : ""} shadow-[var(--shadow-neumorphic-sm)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* Neumorphic small button (outlined) */
export function GhostBtn({
  icon: Icon,
  children,
  onClick,
  className = "",
}: {
  icon?: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-bg px-3.5 py-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-brand shadow-[var(--shadow-neumorphic-sm)] transition-all duration-200 hover:-translate-y-px hover:border-brand-light sm:text-[13px] ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />} {children}
    </button>
  );
}

export function BrandBtn({
  icon: Icon,
  children,
  onClick,
  className = "",
  size = "md",
}: {
  icon?: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "px-3 py-1.5 text-[12px]" : "px-4 py-2 text-[13px]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand font-[family-name:var(--font-dm)] font-bold text-white shadow-[var(--shadow-brand-glow)] transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark hover:shadow-[var(--shadow-brand-glow-strong)] ${pad} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />} {children}
    </button>
  );
}

/* Generic colored badge */
export function Chip({
  color = "#191BDF",
  bg,
  children,
  size = "md",
  className = "",
}: {
  color?: string;
  bg?: string;
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-[family-name:var(--font-dm)] font-bold ${pad} ${className}`}
      style={{ color, background: bg ?? `${color}1F` }}
    >
      {children}
    </span>
  );
}

/* Avatar with initials */
export function Avatar({
  name,
  size = 36,
  bg = "rgba(25,27,223,0.10)",
  fg = "#191BDF",
}: {
  name: string;
  size?: number;
  bg?: string;
  fg?: string;
}) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-dm)] font-bold"
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize: Math.round(size * 0.38),
      }}
    >
      {initials}
    </span>
  );
}
