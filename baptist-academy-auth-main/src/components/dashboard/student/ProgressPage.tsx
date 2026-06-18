import { FileDown, TrendingUp, ArrowRight, ThumbsUp, Target, CheckCircle2, AlertCircle, TrendingDown } from "lucide-react";
import { Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { EXAM_TYPES, MARKS, SUBJECTS } from "@/lib/student-mock";

export function ProgressPage() {
  return (
    <PageWrap>
      <PageHeader
        title="Progress Report"
        subtitle="Your academic journey across all terms"
        right={<GhostBtn icon={FileDown}>Download Full Report</GhostBtn>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-5">
          <GpaRing value={8.7} />
          <div>
            <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Current GPA</div>
            <div className="mt-1 text-[14px] font-semibold text-ink">Term 3 — 2024–25</div>
            <Chip color="#059669" bg="rgba(16,185,129,0.18)" className="mt-2"><TrendingUp className="h-3 w-3" /> Improving</Chip>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100"><TrendingUp className="h-7 w-7 text-emerald-600" /></div>
          <div>
            <div className="text-[28px] font-extrabold text-emerald-600" style={{ fontFamily: "var(--font-display)" }}>+0.8 GPA</div>
            <div className="text-[12px] text-muted-foreground">Improvement since Term 1</div>
          </div>
        </Card>
        <Card>
          <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Rank Progression</div>
          <div className="mt-3 flex items-center justify-around text-[20px] font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>
            <span>#4</span><ArrowRight className="h-4 w-4 text-muted-foreground" /><span>#6</span><ArrowRight className="h-4 w-4 text-muted-foreground" /><span className="text-brand">#4</span>
          </div>
          <div className="mt-2 text-center text-[12px] text-muted-foreground">Term 1 → Term 2 → Term 3</div>
        </Card>
      </div>

      <Card>
        <SubHeader title="Subject-wise Performance Across Terms" />
        <MultiLineChart />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SUBJECTS.map((s) => (
            <div key={s.key} className="flex items-center gap-2 text-[12px] font-semibold text-ink">
              <span className="block h-1 w-5 rounded-full" style={{ background: s.color }} />
              {s.name}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <SubHeader title="Skill Radar — Subject Strengths" />
          <Radar />
        </Card>
        <Card>
          <SubHeader title="Strengths &amp; Improvements" />
          <div>
            <div className="mb-2 inline-flex items-center gap-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-emerald-600"><ThumbsUp className="h-4 w-4" /> Strengths</div>
            <div className="space-y-2">
              {SUBJECTS.slice().sort((a, b) => MARKS["Annual"][b.key] - MARKS["Annual"][a.key]).slice(0, 3).map((s) => (
                <div key={s.key} className="flex items-center justify-between rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-inset)]">
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> {s.name}</span>
                  <Chip color="#059669" bg="rgba(16,185,129,0.18)" size="sm">{MARKS["Annual"][s.key]}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 inline-flex items-center gap-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-amber-600"><Target className="h-4 w-4" /> Areas to Improve</div>
            <div className="space-y-2">
              {SUBJECTS.slice().sort((a, b) => MARKS["Annual"][a.key] - MARKS["Annual"][b.key]).slice(0, 2).map((s) => (
                <div key={s.key} className="flex items-center justify-between rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-inset)]">
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink"><AlertCircle className="h-4 w-4 text-amber-600" /> {s.name}</span>
                  <Chip color="#B45309" bg="rgba(245,158,11,0.18)" size="sm">{MARKS["Annual"][s.key]}</Chip>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Consistent Performer", "Math Topper", "Improving in Physics", "Strong in English"].map((t, i) => (
              <Chip key={t} color={["#191BDF", "#059669", "#B45309", "#7C3AED"][i]} bg={["rgba(25,27,223,0.12)", "rgba(16,185,129,0.18)", "rgba(245,158,11,0.18)", "rgba(124,58,237,0.18)"][i]}>{t}</Chip>
            ))}
          </div>
        </Card>
      </div>

      <Card padded={false}>
        <div className="p-5"><SubHeader title="Term-by-Term Comparison" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead><tr className="border-b-2 border-border bg-bg">
              {["Subject", "Term 1", "Term 2", "Term 3", "Change", "Trend"].map((h) => (<th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:px-5">{h}</th>))}
            </tr></thead>
            <tbody>
              {SUBJECTS.map((s) => {
                const t1 = MARKS["Unit Test I"][s.key]; const t2 = MARKS["Mid Term"][s.key]; const t3 = MARKS["Annual"][s.key];
                const diff = t3 - t1;
                const trend = diff >= 0 ? "#10B981" : "#EF4444";
                return (
                  <tr key={s.key} className="border-b border-[rgba(229,228,224,0.4)]">
                    <td className="px-4 py-3 text-[13px] font-semibold text-ink sm:px-5">{s.name}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground sm:px-5">{t1}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground sm:px-5">{t2}</td>
                    <td className="px-4 py-3 text-[13px] font-bold text-ink sm:px-5">{t3}</td>
                    <td className="px-4 py-3 sm:px-5">
                      <span className="inline-flex items-center gap-1 font-bold" style={{ color: trend }}>
                        {diff >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                        {diff >= 0 ? "+" : ""}{diff}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <Sparkline values={[t1, t2, t3]} color={trend} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

function GpaRing({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  const R = 42; const CIRC = 2 * Math.PI * R;
  return (
    <div className="relative h-[100px] w-[100px]">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={R} stroke="#E5E4E0" strokeWidth="10" fill="none" />
        <circle cx="50" cy="50" r={R} stroke="#191BDF" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${(pct / 100) * CIRC} ${CIRC}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-extrabold text-brand" style={{ fontFamily: "var(--font-display)" }}>{value}</span>
        <span className="text-[10px] font-bold uppercase text-muted-foreground">GPA</span>
      </div>
    </div>
  );
}

function MultiLineChart() {
  const w = 720, h = 280, pad = 40;
  const xs = EXAM_TYPES.length;
  const stepX = (w - pad * 2) / (xs - 1);
  const y = (v: number) => h - pad - ((v - 60) / 40) * (h - pad * 2);
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[260px] w-full min-w-[640px] sm:h-[300px]">
        {[60, 70, 80, 90, 100].map((v) => (
          <g key={v}>
            <line x1={pad} x2={w - pad} y1={y(v)} y2={y(v)} stroke="#E5E4E0" strokeDasharray="3 4" />
            <text x={10} y={y(v) + 4} fontSize="10" fill="#9CA3AF">{v}</text>
          </g>
        ))}
        {EXAM_TYPES.map((e, i) => (
          <text key={e} x={pad + i * stepX} y={h - 12} fontSize="10" fill="#6B7280" textAnchor="middle">{e}</text>
        ))}
        {SUBJECTS.map((s) => {
          const pts = EXAM_TYPES.map((e, i) => [pad + i * stepX, y(MARKS[e][s.key])] as [number, number]);
          const d = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
          return (
            <g key={s.key}>
              <path d={d} stroke={s.color} strokeWidth="2.5" fill="none" />
              {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#fff" stroke={s.color} strokeWidth="2" />)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Radar() {
  const size = 260; const cx = size / 2; const cy = size / 2; const R = 100;
  const axes = SUBJECTS.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / axes;
  const polygon = (vals: number[]) =>
    vals.map((v, i) => {
      const r = (v / 100) * R;
      return `${cx + r * Math.cos(angle(i))},${cy + r * Math.sin(angle(i))}`;
    }).join(" ");
  const current = SUBJECTS.map((s) => MARKS["Annual"][s.key]);
  const prev = SUBJECTS.map((s) => MARKS["Mid Term"][s.key]);
  return (
    <div className="flex justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-[240px] w-[240px] sm:h-[260px] sm:w-[260px]">
        {[0.25, 0.5, 0.75, 1].map((m) => (
          <polygon key={m} points={polygon(Array(axes).fill(100 * m))} fill="none" stroke="rgba(229,228,224,0.7)" />
        ))}
        {SUBJECTS.map((s, i) => {
          const x = cx + (R + 14) * Math.cos(angle(i));
          const y = cy + (R + 14) * Math.sin(angle(i));
          return <text key={s.key} x={x} y={y} fontSize="10" fill="#6B7280" textAnchor="middle" dominantBaseline="middle" fontWeight="700">{s.name.split(" ")[0]}</text>;
        })}
        <polygon points={polygon(prev)} fill="rgba(107,114,128,0.10)" stroke="#9CA3AF" strokeDasharray="4 3" />
        <polygon points={polygon(current)} fill="rgba(25,27,223,0.15)" stroke="#191BDF" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 80, h = 24;
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / range) * h]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-6 w-20"><path d={d} stroke={color} strokeWidth="2" fill="none" /></svg>
  );
}
