import { Target, TrendingUp, Users, UserCheck, AlertCircle, BarChart3, CalendarRange } from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar } from "../primitives";

export function PrincipalKpisPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="School KPIs" subtitle="Core indicators tracked vs targets" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={Target} value="87.3%" label="Avg. Attendance" sub="Target 90%" color="success" progress={87.3} delay={0} />
        <OverviewCard icon={TrendingUp} value="84%" label="Academic Avg." sub="Target 80%" color="brand" progress={84} delay={80} />
        <OverviewCard icon={UserCheck} value="91%" label="Faculty Presence" sub="Target 95%" color="warning" progress={91} delay={160} />
        <OverviewCard icon={AlertCircle} value="6" label="Discipline Cases" sub="vs 14 last term" color="success" trend={{ dir: "down", text: "-57%", positive: true }} delay={240} />
      </div>
      <Panel>
        <SectionHeader title="Target Tracking" subtitle="Year-to-date progress" />
        <div className="space-y-4">
          {KPIS.map((k) => (
            <div key={k.name}>
              <div className="mb-1 flex items-center justify-between">
                <div>
                  <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{k.name}</div>
                  <div className="text-[11px] text-muted-foreground">Target {k.target}</div>
                </div>
                <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand">{k.current}</span>
              </div>
              <ProgressBar value={k.pct} color={k.pct >= 90 ? "#10B981" : k.pct >= 70 ? "#191BDF" : "#F59E0B"} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
const KPIS = [
  { name: "Board Pass Rate", target: "98%", current: "96.4%", pct: 98 },
  { name: "Sports Participation", target: "60%", current: "54%", pct: 90 },
  { name: "Library Engagement", target: "70%", current: "62%", pct: 88 },
  { name: "Parent Satisfaction", target: "4.5/5", current: "4.3/5", pct: 95 },
];

export function PrincipalAnalyticsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="School Analytics" subtitle="Trends across departments" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={BarChart3} value="1,248" label="Total Students" color="brand" delay={0} />
        <OverviewCard icon={Users} value="68" label="Total Faculty" color="success" delay={80} />
        <OverviewCard icon={TrendingUp} value="84%" label="Pass Rate" color="brand" progress={84} delay={160} />
        <OverviewCard icon={UserCheck} value="87%" label="Attendance" color="success" progress={87} delay={240} />
      </div>
      <Panel>
        <SectionHeader title="Class-wise Averages" />
        <div className="space-y-3">
          {[{ c: "Class 12", v: 89 }, { c: "Class 11", v: 86 }, { c: "Class 10", v: 82 }, { c: "Class 9", v: 78 }, { c: "Class 8", v: 75 }].map((x) => (
            <div key={x.c}>
              <div className="mb-1 flex justify-between text-[13px]">
                <span className="font-semibold text-ink">{x.c}</span>
                <span className="font-bold text-brand">{x.v}%</span>
              </div>
              <ProgressBar value={x.v} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function AcademicPerformancePage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Academic Performance" subtitle="Term-on-term subject mastery" />
      <Panel>
        <div className="space-y-3">
          {[
            { sub: "Mathematics", v: 88 }, { sub: "Physics", v: 82 }, { sub: "Chemistry", v: 85 },
            { sub: "Biology", v: 81 }, { sub: "English", v: 79 }, { sub: "Computer Science", v: 91 },
          ].map((s) => (
            <div key={s.sub}>
              <div className="mb-1 flex justify-between text-[13px]">
                <span className="font-semibold text-ink">{s.sub}</span>
                <span className="font-bold text-brand">{s.v}%</span>
              </div>
              <ProgressBar value={s.v} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function FacultyPerformancePrincipalPage() {
  const list = [
    { name: "Dr. Priya Venkatesan", dept: "Sciences (HOF)", score: 96 },
    { name: "Mr. Rajesh Iyer", dept: "Mathematics", score: 92 },
    { name: "Mrs. Priya Sharma", dept: "Physics", score: 89 },
    { name: "Mr. Vikram Joshi", dept: "English", score: 85 },
    { name: "Mrs. Lalitha Menon", dept: "Chemistry", score: 88 },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader title="Faculty Performance" subtitle="Composite review scores" />
      <Panel>
        <div className="space-y-3">
          {list.map((f) => (
            <div key={f.name} className="flex items-center gap-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-neumorphic-sm)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">{f.name.split(" ").slice(-2).map((s) => s[0]).join("")}</div>
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{f.name}</div>
                <div className="text-[11px] text-muted-foreground">{f.dept}</div>
              </div>
              <div className="w-36"><ProgressBar value={f.score} color={f.score >= 90 ? "#10B981" : "#191BDF"} /></div>
              <span className="w-12 text-right font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand">{f.score}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function StudentDisciplinePage() {
  const cases = [
    { student: "Rohit Menon", class: "Class 11-A", issue: "Repeated late arrival", date: "Today", severity: "high" },
    { student: "Karan Pillai", class: "Class 10-B", issue: "Disruptive in class", date: "Yesterday", severity: "normal" },
    { student: "Akash Kumar", class: "Class 9-C", issue: "Uniform violation", date: "2 days ago", severity: "normal" },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader title="Student Discipline" subtitle="Active cases requiring follow-up" />
      <Panel>
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.student + c.date} className="flex items-center gap-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-neumorphic-sm)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: c.severity === "high" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)", color: c.severity === "high" ? "#EF4444" : "#F59E0B" }}>
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{c.student} · {c.class}</div>
                <div className="truncate text-[11px] text-muted-foreground">{c.issue}</div>
              </div>
              <div className="shrink-0 text-[11px] text-muted-foreground">{c.date}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function AttendanceTrendsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Attendance Trends" subtitle="Last 12 weeks" />
      <Panel>
        <div className="h-40 w-full">
          <svg viewBox="0 0 240 100" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#191BDF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#191BDF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const pts = [82, 85, 88, 86, 90, 87, 89, 91, 88, 90, 87, 92];
              const poly = pts.map((v, i) => `${(i / (pts.length - 1)) * 240},${100 - v * 0.9}`).join(" ");
              return (
                <>
                  <polyline fill="url(#ag)" stroke="none" points={`0,100 ${poly} 240,100`} />
                  <polyline fill="none" stroke="#191BDF" strokeWidth="2" strokeLinejoin="round" points={poly} />
                </>
              );
            })()}
          </svg>
        </div>
      </Panel>
    </div>
  );
}

export function PrincipalReportsPage() {
  const reports = [
    { name: "Term Performance Report", icon: BarChart3 },
    { name: "Faculty Evaluation Summary", icon: Users },
    { name: "Attendance Monthly Roll-up", icon: UserCheck },
    { name: "Discipline & Conduct Log", icon: AlertCircle },
    { name: "Academic Calendar Compliance", icon: CalendarRange },
    { name: "Board Exam Readiness", icon: Target },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader title="Reports" subtitle="Executive reports for board review" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r, i) => (
          <div key={r.name} className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-neumorphic)] transition-all hover:-translate-y-1" style={{ animation: "var(--animate-stagger-in)", animationDelay: `${i * 50}ms` }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand"><r.icon className="h-5 w-5" /></div>
            <div className="mt-3 font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{r.name}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Generated weekly</div>
          </div>
        ))}
      </div>
    </div>
  );
}
