import { useState } from "react";
import {
  FileDown, FileText, Percent, Star, Trophy, UserCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import {
  EXAM_TYPES, MARKS, SUBJECTS, gradeStyle, pctToGrade, type ExamType,
} from "@/lib/student-mock";

export function MarksPage() {
  const [exam, setExam] = useState<ExamType>("Half Yearly");
  const marks = MARKS[exam];
  const total = SUBJECTS.reduce((s, sub) => s + marks[sub.key], 0);
  const max = SUBJECTS.length * 100;
  const pct = +(total / max * 100).toFixed(1);

  return (
    <PageWrap>
      <PageHeader
        title="Marks & Grades"
        subtitle="Track your academic performance across all subjects"
        right={<GhostBtn icon={FileDown}>Download Report</GhostBtn>}
      />

      {/* Exam type selector */}
      <div
        className="no-scrollbar flex w-full gap-1 overflow-x-auto rounded-2xl bg-bg p-1.5 shadow-[var(--shadow-neumorphic)] sm:w-fit"
      >
        {EXAM_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setExam(t)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all duration-[250ms] ease-[var(--ease-premium)] sm:text-[13px] ${
              exam === t
                ? "scale-[1.02] bg-brand text-white shadow-[0_4px_16px_rgba(25,27,223,0.35)]"
                : "text-muted-foreground hover:bg-brand-light hover:text-brand"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[
          { icon: FileText, value: `${total} / ${max}`, label: "Total Marks",        color: "#191BDF", bg: "rgba(25,27,223,0.10)" },
          { icon: Percent,  value: `${pct}%`,           label: "Overall Percentage", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
          { icon: Star,     value: pctToGrade(pct),     label: "Overall Grade",      color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
          { icon: Trophy,   value: "#4",                label: "Class Rank",          color: "#191BDF", bg: "rgba(25,27,223,0.10)" },
        ].map((s, i) => (
          <Card
            key={s.label}
            className="transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            style={{ animation: "var(--animate-stagger-in)", animationDelay: `${i * 80}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: s.bg }}>
              <s.icon className="h-5 w-5" style={{ color: s.color }} />
            </div>
            <div className="mt-3 text-[20px] font-extrabold leading-none sm:text-[24px]" style={{ fontFamily: "var(--font-display)", color: s.color }}>
              {s.value}
            </div>
            <div className="mt-2 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Subject cards */}
      <div>
        <SubHeader title="Subject Performance" subtitle={`Results for ${exam}`} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SUBJECTS.map((sub, idx) => {
            const m = marks[sub.key];
            const p = m;
            const grade = pctToGrade(p);
            const gs = gradeStyle(grade);
            return (
              <Card
                key={sub.key}
                className="min-h-[180px] transition-all duration-300 hover:-translate-y-1 hover:border-brand-light hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                style={{ animation: "var(--animate-stagger-in)", animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: sub.bg }}>
                      <sub.icon className="h-5 w-5" style={{ color: sub.color }} />
                    </div>
                    <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{sub.name}</div>
                  </div>
                  <Chip color={gs.fg} bg={gs.bg}>{grade}</Chip>
                </div>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-[36px] font-extrabold leading-none text-ink" style={{ fontFamily: "var(--font-display)" }}>
                    {m}
                  </span>
                  <span className="pb-1 text-[15px] text-muted-foreground">/ 100</span>
                </div>
                <div className="mt-1 text-[13px] text-muted-foreground">{p}% obtained</div>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full" style={{ background: "#F8F7F4", boxShadow: "inset 2px 2px 4px #dddcd9, inset -2px -2px 4px #ffffff" }}>
                  <div
                    className="h-full rounded-full transition-all duration-[800ms] ease-out"
                    style={{ width: `${p}%`, background: `linear-gradient(180deg, ${sub.color}cc, ${sub.color})`, animationDelay: "200ms" }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <UserCircle className="h-3.5 w-3.5" />
                    {sub.teacher}
                  </span>
                  <span className="font-[family-name:var(--font-dm)] font-bold text-muted-foreground">Max: 100</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <SubHeader title="Subject-wise Scores" />
          <div className="space-y-3">
            {SUBJECTS.map((sub) => {
              const m = marks[sub.key];
              const grade = pctToGrade(m);
              const gs = gradeStyle(grade);
              return (
                <div key={sub.key} className="flex items-center gap-3">
                  <span className="w-24 truncate font-[family-name:var(--font-dm)] text-[12px] font-semibold text-ink sm:w-28">{sub.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full" style={{ background: "#F8F7F4", boxShadow: "inset 2px 2px 4px #dddcd9, inset -2px -2px 4px #ffffff" }}>
                    <div className="h-full rounded-full" style={{ width: `${m}%`, background: sub.color }} />
                  </div>
                  <span className="w-10 text-right font-[family-name:var(--font-dm)] text-[12px] font-bold text-ink">{m}</span>
                  <span className="inline-flex h-5 w-8 items-center justify-center rounded-md text-[10px] font-bold" style={{ background: gs.bg, color: gs.fg }}>{grade}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SubHeader title="Grade Distribution" />
          <DonutChart marks={marks} />
        </Card>
      </div>

      {/* Exam history */}
      <Card padded={false}>
        <div className="flex items-center justify-between p-5">
          <SubHeader title="Exam History" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="bg-bg border-b-2 border-border">
                {["Exam Type", "Subject", "Date", "Max", "Obtained", "%", "Grade", "Rank"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:px-5 sm:py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyRows().map((r, i) => {
                const gs = gradeStyle(r.grade);
                return (
                  <tr key={i} className="border-b border-[rgba(229,228,224,0.4)] transition-colors hover:bg-brand-light/40" style={{ background: i % 2 ? "rgba(248,247,244,0.6)" : "#fff" }}>
                    <td className="px-4 py-3 text-[13px] text-ink sm:px-5">{r.exam}</td>
                    <td className="px-4 py-3 text-[13px] text-ink sm:px-5">{r.subject}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground sm:px-5">{r.date}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground sm:px-5">{r.max}</td>
                    <td className="px-4 py-3 text-[13px] font-semibold text-ink sm:px-5">{r.obt}</td>
                    <td className="px-4 py-3 text-[13px] text-ink sm:px-5">{r.pct}%</td>
                    <td className="px-4 py-3 sm:px-5"><Chip color={gs.fg} bg={gs.bg} size="sm">{r.grade}</Chip></td>
                    <td className="px-4 py-3 text-[13px] sm:px-5">
                      {r.rank <= 3 ? (
                        <span className="inline-flex items-center gap-1 font-bold text-brand">
                          <Trophy className="h-3.5 w-3.5" style={{ color: r.rank === 1 ? "#F59E0B" : r.rank === 2 ? "#9CA3AF" : "#CD7C2F" }} />
                          #{r.rank}
                        </span>
                      ) : (
                        <span className="font-[family-name:var(--font-dm)] font-bold text-brand">#{r.rank}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <span className="text-[12px] text-muted-foreground">Showing 1–10 of 32 results</span>
          <div className="flex items-center gap-2">
            <GhostBtn icon={ChevronLeft}>Prev</GhostBtn>
            <span className="text-[12px] text-muted-foreground">Page 1 of 4</span>
            <GhostBtn icon={ChevronRight}>Next</GhostBtn>
          </div>
        </div>
      </Card>
    </PageWrap>
  );
}

function DonutChart({ marks }: { marks: Record<string, number> }) {
  const grades = SUBJECTS.map((s) => pctToGrade(marks[s.key]));
  const buckets: Record<string, number> = {};
  grades.forEach((g) => { buckets[g] = (buckets[g] ?? 0) + 1; });
  const order: Array<{ g: ReturnType<typeof pctToGrade>; color: string }> = [
    { g: "A+", color: "#10B981" }, { g: "A", color: "#191BDF" },
    { g: "B+", color: "#3B82F6" }, { g: "B", color: "#F59E0B" },
    { g: "C", color: "#F97316" }, { g: "F", color: "#EF4444" },
  ];
  const total = SUBJECTS.length;
  const R = 70; const CIRC = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-around">
      <div className="relative h-[180px] w-[180px]">
        <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
          <circle cx="90" cy="90" r={R} fill="none" stroke="#EFEEEA" strokeWidth="28" />
          {order.map(({ g, color }) => {
            const count = buckets[g] ?? 0;
            if (!count) return null;
            const len = (count / total) * CIRC;
            const dash = `${len - 3} ${CIRC - len + 3}`;
            const el = (
              <circle key={g} cx="90" cy="90" r={R} fill="none" stroke={color}
                strokeWidth="28" strokeDasharray={dash} strokeDashoffset={-offset} strokeLinecap="butt" />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[28px] font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>{total}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subjects</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {order.map(({ g, color }) => (
          <div key={g} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            <span className="font-[family-name:var(--font-dm)] text-[12px] font-semibold text-ink">{g}</span>
            <span className="text-[12px] text-muted-foreground">· {buckets[g] ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function historyRows() {
  const rows: { exam: string; subject: string; date: string; max: number; obt: number; pct: number; grade: ReturnType<typeof pctToGrade>; rank: number }[] = [];
  const dates = ["02 Mar 2025", "28 Feb 2025", "15 Feb 2025", "10 Feb 2025", "02 Feb 2025", "28 Jan 2025", "20 Jan 2025", "12 Jan 2025", "04 Jan 2025", "20 Dec 2024"];
  EXAM_TYPES.slice(0, 5).forEach((e, ei) => {
    SUBJECTS.slice(0, 2).forEach((s, si) => {
      const obt = MARKS[e][s.key];
      rows.push({ exam: e, subject: s.name, date: dates[(ei * 2 + si) % dates.length], max: 100, obt, pct: obt, grade: pctToGrade(obt), rank: ((ei + si) % 6) + 1 });
    });
  });
  return rows.slice(0, 10);
}
