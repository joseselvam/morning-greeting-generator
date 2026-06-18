import { useState } from "react";
import {
  CalendarPlus, UserCheck, UserX, CalendarOff, BarChart2, AlertTriangle,
  ChevronLeft, ChevronRight, X, Upload,
} from "lucide-react";
import { BrandBtn, Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { MARCH_2025, MONTHLY_TREND, SUBJECTS } from "@/lib/student-mock";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AttendancePage() {
  const [openLeave, setOpenLeave] = useState(false);
  const stats = [
    { icon: UserCheck,  value: "87",    label: "Days Present", sub: "Out of 96 working days", color: "#10B981", bg: "rgba(16,185,129,0.12)", prog: 90.6 },
    { icon: UserX,      value: "6",     label: "Days Absent",  sub: "2 medical leave",         color: "#EF4444", bg: "rgba(239,68,68,0.12)",  prog: 6.25 },
    { icon: CalendarOff, value: "3",    label: "Leave Applied", sub: "All approved",          color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
    { icon: BarChart2,  value: "90.6%", label: "Attendance Rate", sub: "Minimum required: 75%", color: "#191BDF", bg: "rgba(25,27,223,0.10)", prog: 90.6 },
  ];

  return (
    <PageWrap>
      <PageHeader
        title="Attendance"
        subtitle="Your attendance record and monthly summary"
        right={<BrandBtn icon={CalendarPlus} onClick={() => setOpenLeave(true)}>Apply for Leave</BrandBtn>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
        {stats.map((s, i) => (
          <Card key={s.label} style={{ animation: "var(--animate-stagger-in)", animationDelay: `${i * 80}ms` }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: s.bg }}>
              <s.icon className="h-5 w-5" style={{ color: s.color }} />
            </div>
            <div className="mt-3 text-[28px] font-extrabold leading-none text-ink sm:text-[32px]" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
            <div className="mt-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-ink">{s.label}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{s.sub}</div>
            {s.prog !== undefined && (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#EEEDE8" }}>
                <div className="h-full rounded-full" style={{ width: `${s.prog}%`, background: s.color }} />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Calendar */}
      <Card className="rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>March 2025</h3>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)] hover:border-brand-light"><ChevronLeft className="h-4 w-4 text-ink" /></button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)] hover:border-brand-light"><ChevronRight className="h-4 w-4 text-ink" /></button>
            <GhostBtn>Today</GhostBtn>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {DAY_LABELS.map((d) => (
            <div key={d} className="pb-2 text-center font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase text-muted-foreground">{d}</div>
          ))}
          {MARCH_2025.map((d, i) => {
            if (d.state === "empty") return <div key={i} className="aspect-square" />;
            const map: Record<string, { bg: string; color: string; shadow?: string; border?: string }> = {
              present: { bg: "#191BDF", color: "#fff", shadow: "0 4px 12px rgba(25,27,223,0.35)" },
              absent:  { bg: "#EF4444", color: "#fff", shadow: "0 4px 12px rgba(239,68,68,0.30)" },
              leave:   { bg: "#F59E0B", color: "#fff", shadow: "0 4px 12px rgba(245,158,11,0.30)" },
              holiday: { bg: "rgba(229,228,224,0.4)", color: "#9CA3AF", border: "1px dashed #E5E4E0" },
              future:  { bg: "transparent", color: "#D1D5DB", border: "1px solid rgba(229,228,224,0.4)" },
            };
            const st = map[d.state]!;
            return (
              <button
                key={i}
                className="group relative aspect-square rounded-xl font-[family-name:var(--font-dm)] text-[13px] font-bold transition-all hover:scale-110 sm:rounded-2xl"
                style={{ background: st.bg, color: st.color, boxShadow: st.shadow, border: st.border }}
              >
                {d.date}
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold">
          {[
            { c: "#191BDF", l: "Present" },
            { c: "#EF4444", l: "Absent" },
            { c: "#F59E0B", l: "Leave" },
            { c: "#9CA3AF", l: "Holiday" },
          ].map((x) => (
            <span key={x.l} className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span className="h-3 w-3 rounded-full" style={{ background: x.c }} />{x.l}
            </span>
          ))}
        </div>
      </Card>

      {/* Trend */}
      <Card>
        <SubHeader title="Monthly Attendance Trend" />
        <TrendChart />
      </Card>

      {/* Subject-wise table */}
      <Card padded={false}>
        <div className="p-5"><SubHeader title="Subject-wise Attendance" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left">
            <thead>
              <tr className="bg-bg border-b-2 border-border">
                {["Subject", "Total", "Attended", "Absent", "Percentage", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBJECTS.map((s, i) => {
                const total = 60;
                const att = [58, 54, 49, 56, 52, 55][i];
                const pct = +((att / total) * 100).toFixed(1);
                const color = pct >= 90 ? "#10B981" : pct >= 75 ? "#F59E0B" : "#EF4444";
                const label = pct >= 90 ? "Excellent" : pct >= 75 ? "Satisfactory" : "Low — Risk";
                return (
                  <tr key={s.key} className="border-b border-[rgba(229,228,224,0.4)]">
                    <td className="px-4 py-3"><div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: s.bg }}><s.icon className="h-3.5 w-3.5" style={{ color: s.color }} /></span>
                      <span className="text-[13px] font-semibold text-ink">{s.name}</span>
                    </div></td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground">{total}</td>
                    <td className="px-4 py-3 text-[13px] font-semibold text-ink">{att}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground">{total - att}</td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-bold" style={{ color }}>{pct}%</div>
                      <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full" style={{ background: "#EEEDE8" }}>
                        <div className="h-full" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </td>
                    <td className="px-4 py-3"><Chip color={color} size="sm">{label}</Chip></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {openLeave && <LeaveModal onClose={() => setOpenLeave(false)} />}
    </PageWrap>
  );
}

function TrendChart() {
  const w = 720, h = 220, pad = 32;
  const data = MONTHLY_TREND;
  const stepX = (w - pad * 2) / (data.length - 1);
  const y = (v: number) => h - pad - ((v - 70) / 30) * (h - pad * 2);
  const points = data.map((d, i) => [pad + i * stepX, y(d.v)] as [number, number]);
  const path = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  const area = `${path} L ${pad + (data.length - 1) * stepX} ${h - pad} L ${pad} ${h - pad} Z`;
  const refY = y(75);
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[200px] w-full min-w-[560px] sm:h-[240px]">
        <defs>
          <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#191BDF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#191BDF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[70, 80, 90, 100].map((v) => (
          <line key={v} x1={pad} x2={w - pad} y1={y(v)} y2={y(v)} stroke="#E5E4E0" strokeDasharray="3 4" />
        ))}
        <path d={area} fill="url(#att)" />
        <path d={path} fill="none" stroke="#191BDF" strokeWidth="2.5" />
        <line x1={pad} x2={w - pad} y1={refY} y2={refY} stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1" />
        <text x={w - pad} y={refY - 4} textAnchor="end" fontSize="10" fill="#EF4444" fontWeight="700">Min 75%</text>
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="5" fill="#fff" stroke="#191BDF" strokeWidth="2" />
            <text x={p[0]} y={h - 8} textAnchor="middle" fontSize="11" fill="#6B7280">{data[i].m}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LeaveModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        className="w-full max-w-[520px] rounded-t-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "var(--animate-fade-up)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[20px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>Apply for Leave</h3>
            <p className="mt-0.5 text-[12px] text-muted-foreground">Submit your leave request for approval</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)]"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Leave Type">
            <select className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-[13px] shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none">
              <option>Medical Leave</option><option>Personal Leave</option><option>Family Emergency</option><option>Other</option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="From"><input type="date" className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-[13px] shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none" /></Field>
            <Field label="To"><input type="date" className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-[13px] shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none" /></Field>
          </div>
          <div className="inline-flex rounded-full bg-brand-light px-3 py-1 text-[13px] font-bold text-brand">3 Days</div>
          <Field label="Reason"><textarea rows={3} placeholder="Briefly describe your reason..." className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-[13px] shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none" /></Field>
          <div className="rounded-xl border-2 border-dashed border-border bg-bg p-5 text-center">
            <Upload className="mx-auto h-7 w-7 text-muted-foreground" />
            <div className="mt-2 text-[12px] text-muted-foreground">Drag &amp; drop or click to upload</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <GhostBtn className="flex-1 !py-3" onClick={onClose}>Cancel</GhostBtn>
          <BrandBtn className="flex-1 !py-3" icon={AlertTriangle} onClick={onClose}>Submit Request</BrandBtn>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
