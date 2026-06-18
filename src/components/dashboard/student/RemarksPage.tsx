import { CheckCircle2, AlertTriangle, ThumbsUp, Info, Heart, CalendarDays } from "lucide-react";
import { Avatar, Card, Chip, PageHeader, PageWrap, SubHeader } from "./_shared";
import { REMARKS, type RemarkType } from "@/lib/student-mock";

const TYPE_META: Record<RemarkType, { color: string; bg: string; icon: typeof Info; label: string }> = {
  warning:     { color: "#EF4444", bg: "rgba(239,68,68,0.12)",  icon: AlertTriangle, label: "Warning" },
  positive:    { color: "#10B981", bg: "rgba(16,185,129,0.12)", icon: ThumbsUp,      label: "Positive" },
  info:        { color: "#3B82F6", bg: "rgba(59,130,246,0.12)", icon: Info,          label: "Informational" },
  counselling: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)", icon: Heart,         label: "Counselling" },
};

export function RemarksPage() {
  const score = 84;
  const status = score >= 80 ? { label: "Excellent Conduct", color: "#10B981", icon: CheckCircle2 } : score >= 60 ? { label: "Needs Improvement", color: "#F59E0B", icon: AlertTriangle } : { label: "Poor Conduct", color: "#EF4444", icon: AlertTriangle };

  const counts = {
    total: REMARKS.length,
    warnings: REMARKS.filter((r) => r.type === "warning").length,
    positive: REMARKS.filter((r) => r.type === "positive").length,
    resolved: REMARKS.filter((r) => r.status === "Resolved").length,
  };

  return (
    <PageWrap>
      <PageHeader title="Remarks & Conduct" subtitle="Your conduct record and teacher feedback" />

      <Card className="rounded-3xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center">
          <div>
            <div className="font-[family-name:var(--font-dm)] text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Conduct Score</div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-[48px] font-extrabold leading-none" style={{ fontFamily: "var(--font-display)", color: status.color }}>{score}</span>
              <span className="pb-2 text-[20px] text-muted-foreground">/100</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-[family-name:var(--font-dm)] text-[12px] font-bold" style={{ background: `${status.color}1F`, color: status.color }}>
              <status.icon className="h-4 w-4" /> {status.label}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: "Total", v: counts.total, c: "#191BDF" },
              { l: "Warnings", v: counts.warnings, c: "#EF4444" },
              { l: "Positive", v: counts.positive, c: "#10B981" },
              { l: "Resolved", v: counts.resolved, c: "#3B82F6" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-bg p-4 text-center shadow-[var(--shadow-neumorphic-inset)]">
                <div className="text-[24px] font-extrabold" style={{ fontFamily: "var(--font-display)", color: s.c }}>{s.v}</div>
                <div className="mt-1 font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl bg-bg p-1.5 shadow-[var(--shadow-neumorphic-sm)]">
        {["All", "Warnings", "Positive", "Informational", "Resolved"].map((t, i) => (
          <button key={t} className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-[12px] font-bold ${i === 0 ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      <div>
        <SubHeader title="Remarks Timeline" />
        <div className="relative pl-8">
          <span className="absolute left-3 top-2 bottom-2 w-px border-l-2 border-dashed" style={{ borderColor: "var(--color-brand-light)" }} />
          {REMARKS.map((r) => {
            const m = TYPE_META[r.type];
            return (
              <div key={r.id} className="relative mb-4 last:mb-0">
                <span className="absolute -left-6 top-5 flex h-5 w-5 items-center justify-center rounded-full ring-4" style={{ background: m.color, boxShadow: `0 0 0 6px ${m.bg}` , color: "#fff" }}>
                  <m.icon className="h-2.5 w-2.5" />
                </span>
                <Card className="ml-1" style={{ borderLeft: `4px solid ${m.color}` }}>
                  <div className="flex items-center justify-between gap-2">
                    <Chip color={m.color} bg={m.bg}><m.icon className="h-3 w-3" /> {m.label}</Chip>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><CalendarDays className="h-3 w-3" /> {r.date}</span>
                  </div>
                  <p className="mt-2 text-[14px] leading-6 text-ink">{r.text}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name={r.teacher} size={28} />
                      <span className="text-[12px] font-semibold text-ink">{r.teacher} <span className="font-normal text-muted-foreground">· {r.subject}</span></span>
                    </div>
                    <Chip color={r.status === "Resolved" ? "#059669" : r.status === "Acknowledged" ? "#191BDF" : "#B45309"} bg={r.status === "Resolved" ? "rgba(16,185,129,0.18)" : r.status === "Acknowledged" ? "rgba(25,27,223,0.18)" : "rgba(245,158,11,0.18)"} size="sm">{r.status}</Chip>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrap>
  );
}
