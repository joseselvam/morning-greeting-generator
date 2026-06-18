import { type ReactNode } from "react";

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export const PERIODS = [
  { n: 1, t: "08:00 – 08:45" },
  { n: 2, t: "08:45 – 09:30" },
  { n: 3, t: "09:45 – 10:30" },
  { n: 4, t: "10:30 – 11:15" },
  { n: 5, t: "11:30 – 12:15" },
  { n: 6, t: "13:00 – 13:45" },
  { n: 7, t: "13:45 – 14:30" },
  { n: 8, t: "14:45 – 15:30" },
] as const;

export type Slot = {
  subject: string;
  room?: string;
  teacher?: string;
  tone?: "brand" | "info" | "success" | "warning" | "danger" | "muted";
} | null;

const TONES: Record<NonNullable<Slot>["tone"] & string, { bg: string; fg: string; bd: string }> = {
  brand:   { bg: "rgba(25,27,223,0.10)",  fg: "#191BDF", bd: "rgba(25,27,223,0.25)" },
  info:    { bg: "rgba(59,130,246,0.12)", fg: "#1D4ED8", bd: "rgba(59,130,246,0.30)" },
  success: { bg: "rgba(16,185,129,0.12)", fg: "#047857", bd: "rgba(16,185,129,0.30)" },
  warning: { bg: "rgba(245,158,11,0.14)", fg: "#B45309", bd: "rgba(245,158,11,0.35)" },
  danger:  { bg: "rgba(239,68,68,0.12)",  fg: "#B91C1C", bd: "rgba(239,68,68,0.30)" },
  muted:   { bg: "rgba(107,114,128,0.10)", fg: "#4B5563", bd: "rgba(107,114,128,0.25)" },
};

export function TimetableGrid({
  grid,
  onCellClick,
  legend,
}: {
  /** grid[dayIndex][periodIndex] */
  grid: Slot[][];
  onCellClick?: (day: number, period: number) => void;
  legend?: ReactNode;
}) {
  return (
    <div>
      <div className="overflow-x-auto">
        <div
          className="min-w-[720px] grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: `120px repeat(${DAYS.length}, minmax(0,1fr))` }}
        >
          {/* header row */}
          <div />
          {DAYS.map((d) => (
            <div
              key={d}
              className="rounded-xl bg-bg p-2 text-center font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs"
            >
              {d}
            </div>
          ))}

          {/* period rows */}
          {PERIODS.map((p, pi) => (
            <PeriodRow
              key={p.n}
              periodIndex={pi}
              periodLabel={`P${p.n}`}
              periodTime={p.t}
              cells={DAYS.map((_, di) => grid[di]?.[pi] ?? null)}
              onCellClick={onCellClick}
            />
          ))}
        </div>
      </div>
      {legend && <div className="mt-4">{legend}</div>}
    </div>
  );
}

function PeriodRow({
  periodIndex,
  periodLabel,
  periodTime,
  cells,
  onCellClick,
}: {
  periodIndex: number;
  periodLabel: string;
  periodTime: string;
  cells: Slot[];
  onCellClick?: (day: number, period: number) => void;
}) {
  return (
    <>
      <div className="flex flex-col justify-center rounded-xl bg-bg p-2 text-left">
        <div className="font-[family-name:var(--font-display)] text-sm font-extrabold text-ink">
          {periodLabel}
        </div>
        <div className="text-[10px] text-muted-foreground sm:text-[11px]">{periodTime}</div>
      </div>
      {cells.map((slot, di) => (
        <Cell key={di} slot={slot} onClick={onCellClick ? () => onCellClick(di, periodIndex) : undefined} />
      ))}
    </>
  );
}

function Cell({ slot, onClick }: { slot: Slot; onClick?: () => void }) {
  if (!slot) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        className="min-h-[62px] rounded-xl border border-dashed border-border bg-bg/50 text-[11px] text-muted-foreground transition-colors hover:border-brand-light hover:text-brand disabled:cursor-default disabled:hover:border-border disabled:hover:text-muted-foreground"
        aria-label="Free period"
      >
        Free
      </button>
    );
  }
  const t = TONES[slot.tone ?? "brand"];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="min-h-[62px] rounded-xl border p-2 text-left transition-all hover:-translate-y-px disabled:cursor-default disabled:hover:translate-y-0"
      style={{ background: t.bg, borderColor: t.bd, color: t.fg }}
    >
      <div className="font-[family-name:var(--font-dm)] text-[12px] font-extrabold leading-tight sm:text-[13px]">
        {slot.subject}
      </div>
      {slot.teacher && (
        <div className="mt-0.5 truncate text-[10px] opacity-80 sm:text-[11px]">{slot.teacher}</div>
      )}
      {slot.room && (
        <div className="mt-0.5 text-[10px] font-bold opacity-70">{slot.room}</div>
      )}
    </button>
  );
}

export function TimetableLegend({ items }: { items: { label: string; tone: NonNullable<Slot>["tone"] }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((i) => {
        const t = TONES[i.tone ?? "brand"];
        return (
          <span
            key={i.label}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-[family-name:var(--font-dm)] text-[11px] font-bold"
            style={{ background: t.bg, color: t.fg }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: t.fg }} />
            {i.label}
          </span>
        );
      })}
    </div>
  );
}
