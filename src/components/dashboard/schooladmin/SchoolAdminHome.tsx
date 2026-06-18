import {
  GraduationCap, Users, CreditCard, UserPlus, BookUser, FileText, Clock, BarChart3,
  TrendingUp, AlertCircle,
} from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar, BrandButton, StatusBadge } from "./primitives";
import { toast } from "sonner";

export function SchoolAdminHome() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Good Morning, Anitha
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">School operations snapshot for {today}.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={GraduationCap} value="1,248" label="Total Students" sub="42 sections" color="brand" trend={{ dir: "up", text: "+12", positive: true }} delay={0} />
        <OverviewCard icon={UserPlus} value="14" label="New Admissions" sub="This month" color="info" trend={{ dir: "up", text: "+4", positive: true }} delay={80} />
        <OverviewCard icon={BookUser} value="68" label="Teachers" sub="61 present today" color="success" progress={89.7} delay={160} />
        <OverviewCard icon={CreditCard} value="₹2.4L" label="Today's Collection" sub="18 payments" color="success" trend={{ dir: "up", text: "+8%", positive: true }} delay={240} />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <SectionHeader title="Operations Pulse" subtitle="What needs your attention" />
          <div className="space-y-3">
            {OPS.map((o) => (
              <div key={o.label} className="flex items-center gap-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-neumorphic-sm)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${o.color}1A`, color: o.color }}>
                  <o.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{o.label}</div>
                  <div className="text-[11px] text-muted-foreground">{o.sub}</div>
                </div>
                <div className="font-[family-name:var(--font-dm)] text-[16px] font-extrabold" style={{ color: o.color }}>{o.value}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionHeader title="Quick Actions" />
          <div className="space-y-2">
            {[
              { icon: UserPlus, label: "New Admission" },
              { icon: FileText, label: "Generate Certificate" },
              { icon: Clock, label: "Publish Timetable" },
              { icon: CreditCard, label: "Record Payment" },
              { icon: BarChart3, label: "Run Report" },
            ].map((a) => (
              <button key={a.label} onClick={() => toast(a.label)} className="group flex w-full items-center gap-3 rounded-full bg-bg px-4 py-3 font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink shadow-[var(--shadow-neumorphic-sm)] transition-all hover:bg-brand hover:text-white hover:shadow-[var(--shadow-brand-glow)]">
                <a.icon className="h-4 w-4 text-brand transition-colors group-hover:text-white" /> {a.label}
              </button>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel>
          <SectionHeader title="Fee Collection This Month" subtitle="Class-wise" />
          <div className="space-y-4">
            {FEE_ROWS.map((c) => (
              <div key={c.class}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{c.class}</span>
                  <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand">{c.percent}%</span>
                </div>
                <ProgressBar value={c.percent} color={c.percent >= 85 ? "#10B981" : c.percent >= 70 ? "#191BDF" : "#F59E0B"} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionHeader title="Pending Admissions" subtitle="14 awaiting review" action={<BrandButton variant="ghost">View All</BrandButton>} />
          <div className="space-y-2">
            {ADMISSIONS.map((a) => (
              <div key={a.name} className="flex items-center gap-3 rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-sm)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-[12px] font-bold text-brand">{a.name.split(" ").map((s) => s[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground">{a.class} · {a.date}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

const OPS = [
  { icon: AlertCircle, color: "#EF4444", label: "Fee Defaulters", sub: "47 students overdue", value: "47" },
  { icon: UserPlus, color: "#191BDF", label: "Pending Admissions", sub: "Need review", value: "14" },
  { icon: FileText, color: "#F59E0B", label: "Certificate Requests", sub: "Bonafide, Transfer, Conduct", value: "12" },
  { icon: TrendingUp, color: "#10B981", label: "Reports Generated", sub: "This week", value: "23" },
];
const FEE_ROWS = [
  { class: "Class 12", percent: 92 }, { class: "Class 11", percent: 88 }, { class: "Class 10", percent: 84 },
  { class: "Class 9", percent: 79 }, { class: "Class 8", percent: 76 }, { class: "Class 7", percent: 71 },
];
const ADMISSIONS = [
  { name: "Karthik Rao", class: "Class 9", date: "2 hours ago", status: "pending" },
  { name: "Meera Pillai", class: "Class 6", date: "5 hours ago", status: "pending" },
  { name: "Arnav Sharma", class: "Class 11 — Science", date: "Yesterday", status: "pending" },
];
