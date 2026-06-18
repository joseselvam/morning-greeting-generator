import { useState } from "react";
import {
  BookMarked, Clock, CheckCircle2, ChevronLeft, ChevronRight, Check, ChevronDown,
} from "lucide-react";
import { Card, Chip, PageHeader, PageWrap, SubHeader } from "./_shared";
import { SUBJECTS, TODAYS_HOMEWORK, subjectByKey, type Homework, type SubjectKey } from "@/lib/student-mock";

export function HomeworkPage() {
  const [items, setItems] = useState<Homework[]>(TODAYS_HOMEWORK);
  const [filter, setFilter] = useState<"all" | SubjectKey>("all");
  const [expanded, setExpanded] = useState<string | null>("14 March 2025");

  const visible = filter === "all" ? items : items.filter((i) => i.subject === filter);

  return (
    <PageWrap>
      <PageHeader
        title="Homework"
        subtitle="Daily homework log organized by subject"
        right={
          <div className="inline-flex items-center gap-2 rounded-full bg-bg px-2 py-1 shadow-[var(--shadow-neumorphic-sm)]">
            <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-brand-light"><ChevronLeft className="h-4 w-4" /></button>
            <span className="font-[family-name:var(--font-display)] text-[14px] font-bold text-ink">Today, 15 Mar</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-brand-light"><ChevronRight className="h-4 w-4" /></button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Pill icon={BookMarked} color="#191BDF" bg="rgba(25,27,223,0.12)" label="4 Today" />
        <Pill icon={Clock}      color="#B45309" bg="rgba(245,158,11,0.18)" label="2 Pending" />
        <Pill icon={CheckCircle2} color="#059669" bg="rgba(16,185,129,0.18)" label="12 Done This Week" />
      </div>

      {/* Subject filter */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto rounded-2xl bg-bg p-1.5 shadow-[var(--shadow-neumorphic-sm)]">
        {(["all", ...SUBJECTS.map((s) => s.key)] as Array<"all" | SubjectKey>).map((k) => {
          const active = filter === k;
          const label = k === "all" ? "All" : subjectByKey(k as SubjectKey).name;
          return (
            <button key={k} onClick={() => setFilter(k)}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all ${active ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground hover:text-brand"}`}
            >{label}</button>
          );
        })}
      </div>

      <div>
        <SubHeader title="Today's Homework" subtitle="15 March 2025" />
        <div className="space-y-3">
          {visible.map((h) => {
            const sub = subjectByKey(h.subject);
            return (
              <Card key={h.id} className="flex items-start gap-4 transition-all hover:translate-x-1" style={{ borderLeft: `4px solid ${sub.color}`, background: h.done ? "rgba(16,185,129,0.05)" : undefined, opacity: h.done ? 0.85 : 1 }}>
                <button
                  onClick={() => setItems(items.map((x) => x.id === h.id ? { ...x, done: !x.done } : x))}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all"
                  style={{ boxShadow: h.done ? "var(--shadow-neumorphic-inset)" : "var(--shadow-neumorphic-sm)", background: h.done ? "var(--color-brand-light)" : "#fff" }}
                >
                  {h.done && <Check className="h-3.5 w-3.5 text-brand" />}
                </button>
                <div className="flex-1">
                  <Chip color={sub.color} bg={sub.bg} size="sm" className="!uppercase">{sub.name}</Chip>
                  <div className={`mt-1.5 text-[14px] font-medium text-ink ${h.done ? "line-through text-muted-foreground" : ""}`}>{h.text}</div>
                  <div className="mt-1 font-[family-name:var(--font-dm)] text-[11px] text-muted-foreground">{sub.teacher}</div>
                </div>
                <div className="shrink-0 text-right text-[11px] text-muted-foreground">{h.due}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div>
        <SubHeader title="Previous Days" />
        <div className="space-y-2">
          {["14 March 2025", "13 March 2025", "12 March 2025"].map((d, i) => {
            const open = expanded === d;
            return (
              <Card key={d} padded={false} className="overflow-hidden">
                <button onClick={() => setExpanded(open ? null : d)} className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left">
                  <span className="flex items-center gap-2">
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                    <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-muted-foreground">{d} ({["Thursday", "Wednesday", "Tuesday"][i]})</span>
                  </span>
                  <Chip color="#059669" bg="rgba(16,185,129,0.18)" size="sm">{4 - i}/4 Done</Chip>
                </button>
                {open && (
                  <div className="space-y-2 px-5 pb-4">
                    {TODAYS_HOMEWORK.slice(0, 4 - i).map((h) => {
                      const sub = subjectByKey(h.subject);
                      return (
                        <div key={h.id} className="flex items-center gap-3 rounded-xl border border-border bg-bg px-3 py-2 text-[12px]" style={{ borderLeft: `3px solid ${sub.color}` }}>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <Chip color={sub.color} bg={sub.bg} size="sm">{sub.name}</Chip>
                          <span className="flex-1 truncate text-ink">{h.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Weekly tracker */}
      <Card>
        <SubHeader title="This Week's Completion" />
        <div className="grid grid-cols-7 gap-2">
          {[["Mon", 4, 4], ["Tue", 3, 3], ["Wed", 4, 4], ["Thu", 4, 4], ["Fri", 2, 3], ["Sat", 2, 2], ["Sun", 0, 0]].map(([d, done, total], i) => {
            const pct = (total as number) ? ((done as number) / (total as number)) * 100 : 0;
            const color = pct === 100 ? "#10B981" : pct >= 50 ? "#F59E0B" : pct > 0 ? "#EF4444" : "#9CA3AF";
            const R = 18; const CIRC = 2 * Math.PI * R;
            const today = i === 4;
            return (
              <div key={d as string} className="flex flex-col items-center gap-2">
                <span className="font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase text-muted-foreground">{d as string}</span>
                <div className="relative h-12 w-12">
                  {today && <span className="absolute inset-0 -m-0.5 rounded-full border-2 border-brand" />}
                  <svg viewBox="0 0 48 48" className="h-12 w-12 -rotate-90">
                    <circle cx="24" cy="24" r={R} fill="none" stroke="#EFEEEA" strokeWidth="5" />
                    <circle cx="24" cy="24" r={R} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${(pct / 100) * CIRC} ${CIRC}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-dm)] text-[10px] font-bold text-ink">{done}/{total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageWrap>
  );
}

function Pill({ icon: Icon, color, bg, label }: { icon: typeof Clock; color: string; bg: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-[family-name:var(--font-dm)] text-[12px] font-bold shadow-[var(--shadow-neumorphic-sm)]" style={{ color, background: bg }}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </span>
  );
}
