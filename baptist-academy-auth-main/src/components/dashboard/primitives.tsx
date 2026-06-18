import { type ReactNode } from "react";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

/* ============ SectionHeader ============ */
export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:mb-5 sm:flex-row sm:items-end sm:gap-4">
      <div className="flex items-start gap-2 sm:gap-3">
        <span className="mt-1 block h-5 w-[3px] rounded-sm bg-brand sm:mt-1.5 sm:h-7 sm:w-1" />
        <div>
          <h2
            className="text-lg font-extrabold leading-tight tracking-tight text-ink sm:text-xl lg:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground sm:text-[13px]">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}

/* ============ OverviewCard ============ */
const colorMap = {
  brand: { bg: "rgba(25,27,223,0.10)", fg: "#191BDF" },
  success: { bg: "rgba(16,185,129,0.12)", fg: "#10B981" },
  warning: { bg: "rgba(245,158,11,0.12)", fg: "#F59E0B" },
  danger: { bg: "rgba(239,68,68,0.12)", fg: "#EF4444" },
  info: { bg: "rgba(59,130,246,0.12)", fg: "#3B82F6" },
} as const;
export type StatColor = keyof typeof colorMap;

export function OverviewCard({
  icon: Icon, value, label, sub, color = "brand", trend, progress, delay = 0, pulse,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  sub?: string;
  color?: StatColor;
  trend?: { dir: "up" | "down"; text: string; positive?: boolean };
  progress?: number;
  delay?: number;
  pulse?: boolean;
}) {
  const c = colorMap[color];
  const trendColor = trend?.positive ?? trend?.dir === "up" ? "#10B981" : "#EF4444";
  return (
    <div
      className="group relative rounded-2xl border border-[rgba(229,228,224,0.5)] bg-surface p-4 shadow-[var(--shadow-neumorphic)] transition-all duration-[300ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand-light hover:shadow-[var(--shadow-elevated,0_20px_60px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04))] sm:p-5 lg:rounded-[20px] lg:p-6"
      style={{ animation: "var(--animate-stagger-in)", animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="relative flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px] lg:rounded-[14px]"
          style={{ background: c.bg, boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.04)" }}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" style={{ color: c.fg }} strokeWidth={2.2} />
          {pulse && (
            <span
              className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full"
              style={{ background: c.fg, boxShadow: `0 0 0 4px ${c.bg}` }}
            >
              <span
                className="absolute inset-0 animate-ping rounded-full opacity-75"
                style={{ background: c.fg }}
              />
            </span>
          )}
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 rounded-full px-2 py-0.5 font-[family-name:var(--font-dm)] text-[11px] font-bold sm:text-xs"
            style={{ background: `${trendColor}1A`, color: trendColor }}
          >
            {trend.dir === "up" ? <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
            {trend.text}
          </div>
        )}
      </div>
      <div className="mt-3 sm:mt-4">
        <div className="text-2xl font-extrabold leading-none text-ink sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          {value}
        </div>
        <div className="mt-2 font-[family-name:var(--font-dm)] text-xs font-semibold text-muted-foreground sm:mt-3 sm:text-[13px]">
          {label}
        </div>
        {sub && <div className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{sub}</div>}
      </div>
      {progress !== undefined && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#EEEDE8", boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-[800ms] ease-out"
            style={{
              width: `${progress}%`,
              background: c.fg,
              boxShadow: `0 0 8px ${c.fg}80`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ============ StatusBadge ============ */
export function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const styles: Record<string, { bg: string; fg: string }> = {
    present: { bg: "rgba(16,185,129,0.15)", fg: "#059669" },
    submitted: { bg: "rgba(25,27,223,0.15)", fg: "#191BDF" },
    completed: { bg: "rgba(16,185,129,0.15)", fg: "#059669" },
    active: { bg: "rgba(16,185,129,0.15)", fg: "#059669" },
    ongoing: { bg: "rgba(25,27,223,0.15)", fg: "#191BDF" },
    upcoming: { bg: "rgba(107,114,128,0.15)", fg: "#4B5563" },
    pending: { bg: "rgba(245,158,11,0.15)", fg: "#B45309" },
    "due soon": { bg: "rgba(245,158,11,0.15)", fg: "#B45309" },
    absent: { bg: "rgba(239,68,68,0.15)", fg: "#DC2626" },
    overdue: { bg: "rgba(239,68,68,0.15)", fg: "#DC2626" },
    behind: { bg: "rgba(245,158,11,0.15)", fg: "#B45309" },
    ontrack: { bg: "rgba(16,185,129,0.15)", fg: "#059669" },
    ahead: { bg: "rgba(25,27,223,0.15)", fg: "#191BDF" },
    high: { bg: "rgba(239,68,68,0.15)", fg: "#DC2626" },
    normal: { bg: "rgba(16,185,129,0.15)", fg: "#059669" },
  };
  const st = styles[s] ?? { bg: "rgba(107,114,128,0.15)", fg: "#4B5563" };
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 font-[family-name:var(--font-dm)] text-[11px] font-bold capitalize"
      style={{ background: st.bg, color: st.fg }}
    >
      {status === "ontrack" ? "On Track" : status}
    </span>
  );
}

/* ============ Card wrapper ============ */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(229,228,224,0.5)] bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-5 lg:rounded-[20px] lg:p-6 ${className}`}
      style={{ animation: "var(--animate-fade-up)" }}
    >
      {children}
    </div>
  );
}

/* ============ Progress bar ============ */
export function ProgressBar({ value, color = "#191BDF", height = 8 }: { value: number; color?: string; height?: number }) {
  return (
    <div
      className="w-full overflow-hidden rounded-full"
      style={{ height, background: "#EEEDE8", boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06)" }}
    >
      <div
        className="h-full rounded-full transition-all duration-[800ms] ease-out"
        style={{ width: `${Math.min(100, value)}%`, background: color, boxShadow: `0 0 6px ${color}66` }}
      />
    </div>
  );
}

/* ============ Brand CTA Button ============ */
export function BrandButton({
  children, icon: Icon, onClick, variant = "primary", className = "", type = "button",
}: {
  children: ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[12px] px-5 py-2.5 font-[family-name:var(--font-dm)] text-[13px] font-bold transition-all duration-[250ms] ease-[var(--ease-premium)] active:scale-[0.98]";
  if (variant === "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} bg-brand text-white shadow-[var(--shadow-brand-glow)] hover:-translate-y-px hover:bg-brand-dark hover:shadow-[var(--shadow-brand-glow-strong)] ${className}`}
      >
        {Icon && <Icon className="h-4 w-4" />} {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} border border-border bg-bg text-ink shadow-[var(--shadow-neumorphic-sm)] hover:border-brand-light hover:text-brand ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />} {children}
    </button>
  );
}
