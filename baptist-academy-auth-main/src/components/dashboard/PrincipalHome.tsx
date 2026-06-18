import {
  GraduationCap, Users, CreditCard, UserCheck, UserPlus, AlertCircle, FileCheck,
  Building2, Megaphone, RefreshCw, Newspaper, Mail,
} from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar, BrandButton, StatusBadge } from "./primitives";
import { FEE_DEFAULTERS, ADMISSIONS_FUNNEL, CLASS_PERFORMANCE, ROLE_USERS } from "@/lib/mock-data";
import { toast } from "sonner";

export function PrincipalHome() {
  const user = ROLE_USERS.principal;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Good Morning, {user.name.replace("Dr. ", "")}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Here's the complete school overview for {today}.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
        <OverviewCard icon={GraduationCap} value="1,248" label="Total Students" sub="Across 42 sections" color="brand" trend={{ dir: "up", text: "+12", positive: true }} delay={0} />
        <OverviewCard icon={Users} value="64" label="Total Faculty" sub="58 present today" color="success" progress={90.6} delay={80} />
        <OverviewCard icon={CreditCard} value="₹2.4L" label="Today's Collection" sub="18 payments today" color="success" trend={{ dir: "up", text: "+8%", positive: true }} delay={160} />
        <OverviewCard icon={UserCheck} value="87.3%" label="Overall Attendance" sub="Students + Faculty" color="brand" progress={87.3} delay={240} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <MiniStat icon={UserPlus} value="14" label="New Admissions" color="#191BDF" />
        <MiniStat icon={AlertCircle} value="47" label="Fee Defaulters" color="#EF4444" />
        <MiniStat icon={FileCheck} value="8" label="Leave Approvals" color="#F59E0B" />
        <MiniStat icon={Building2} value="3" label="Infra Alerts" color="#EF4444" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        <div className="lg:col-span-4">
          <Panel>
            <SectionHeader title="Financial Overview" subtitle="Monthly fee collection trend" />
            <RevenueChart />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <SummaryPill label="Collected" value="₹2.4L" color="#10B981" />
              <SummaryPill label="Pending" value="₹85K" color="#EF4444" />
              <SummaryPill label="Rate" value="87%" color="#191BDF" />
            </div>
            <div className="mt-5">
              <div className="mb-2 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Top Defaulters</div>
              <div className="space-y-2">
                {FEE_DEFAULTERS.slice(0, 3).map((d) => (
                  <div key={d.name} className="flex items-center justify-between rounded-lg bg-bg/50 p-2">
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold text-ink">{d.name}</div>
                      <div className="text-[11px] text-muted-foreground">{d.class} · {d.overdue}d overdue</div>
                    </div>
                    <button onClick={() => toast.success(`Reminder sent to ${d.name}`)} className="rounded-full bg-brand-light p-1.5 text-brand transition-colors hover:bg-brand hover:text-white" aria-label="Notify">
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-3">
          <Panel>
            <SectionHeader title="Live Attendance" subtitle="Updated 2m ago" />
            <Donut percent={87.3} label="Students" present={1089} absent={159} />
            <div className="mt-4">
              <Donut percent={90.6} label="Faculty" present={58} absent={6} color="#10B981" />
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-3">
          <Panel>
            <SectionHeader title="Principal Actions" />
            <div className="space-y-2">
              {[
                { icon: Megaphone, label: "Broadcast Announcement" },
                { icon: UserPlus, label: "Approve Admission" },
                { icon: FileCheck, label: "Review Leave Requests" },
                { icon: RefreshCw, label: "Override Substitute" },
                { icon: Newspaper, label: "Update Noticeboard" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => toast(a.label)}
                  className="group flex w-full items-center gap-3 rounded-full bg-bg px-4 py-3 font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink shadow-[var(--shadow-neumorphic-sm)] transition-all hover:bg-brand hover:text-white hover:shadow-[var(--shadow-brand-glow)]"
                >
                  <a.icon className="h-4 w-4 text-brand transition-colors group-hover:text-white" />
                  {a.label}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <SectionHeader title="School Performance" subtitle="Class-wise average marks" />
          <div className="space-y-4">
            {CLASS_PERFORMANCE.map((c) => (
              <div key={c.class}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{c.class}</span>
                  <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand">{c.avg}%</span>
                </div>
                <ProgressBar value={c.avg} color={c.avg >= 85 ? "#10B981" : c.avg >= 75 ? "#191BDF" : "#F59E0B"} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader title="Admissions Pipeline" subtitle="Current intake funnel" />
          <div className="space-y-3">
            {ADMISSIONS_FUNNEL.map((s, i) => {
              const pct = (s.count / ADMISSIONS_FUNNEL[0].count) * 100;
              return (
                <div key={s.stage}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{s.stage}</span>
                    <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{s.count}</span>
                  </div>
                  <div className="h-7 w-full overflow-hidden rounded-lg" style={{ background: "#EEEDE8", boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.06)" }}>
                    <div
                      className="flex h-full items-center justify-end rounded-lg pr-2 font-[family-name:var(--font-dm)] text-[10px] font-bold text-white transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, #191BDF ${i * 15}%, #4A4DFF)`,
                        boxShadow: "0 0 8px rgba(25,27,223,0.3)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, value, label, color }: { icon: typeof Users; value: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[rgba(229,228,224,0.5)] bg-surface p-4 shadow-[var(--shadow-neumorphic-sm)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${color}1A`, color }}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[20px] font-extrabold text-ink leading-none" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
        <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function SummaryPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: `${color}12` }}>
      <div className="text-[16px] font-extrabold" style={{ color, fontFamily: "var(--font-display)" }}>{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function RevenueChart() {
  const data = [60, 72, 85, 78, 90, 88, 95, 82, 91, 87, 93, 96];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const max = 100;
  return (
    <div className="h-32 w-full">
      <svg viewBox="0 0 240 100" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#191BDF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#191BDF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="url(#grad)"
          stroke="none"
          points={`0,100 ${data.map((v, i) => `${(i / (data.length - 1)) * 240},${100 - (v / max) * 90}`).join(" ")} 240,100`}
        />
        <polyline
          fill="none"
          stroke="#191BDF"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={data.map((v, i) => `${(i / (data.length - 1)) * 240},${100 - (v / max) * 90}`).join(" ")}
        />
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-muted-foreground">
        {months.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  );
}

function Donut({ percent, label, present, absent, color = "#191BDF" }: { percent: number; label: string; present: number; absent: number; color?: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const off = c - (percent / 100) * c;
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#EEEDE8" strokeWidth="10" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset 1s ease-out", filter: `drop-shadow(0 0 4px ${color}88)` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[16px] font-extrabold text-ink leading-none" style={{ fontFamily: "var(--font-display)" }}>{percent.toFixed(0)}%</div>
          </div>
        </div>
      </div>
      <div>
        <div className="font-[family-name:var(--font-dm)] text-[12px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 text-[13px] text-ink"><span className="font-bold" style={{ color }}>{present}</span> present</div>
        <div className="text-[12px] text-muted-foreground">{absent} absent</div>
      </div>
    </div>
  );
}
