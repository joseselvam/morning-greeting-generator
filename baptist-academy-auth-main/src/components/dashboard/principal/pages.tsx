import { useState } from "react";
import {
  GraduationCap, Users, UserPlus, BarChart3, CalendarDays, FileText,
  CreditCard, Receipt, AlertCircle, RefreshCw, FileCheck, AlertTriangle,
  Megaphone, MessageSquare, Newspaper, Building2, Settings, Plus, Search,
  Download, Check, X, Clock, Send, ChevronRight, TrendingUp, IndianRupee,
  Phone, Mail, Trash2,
} from "lucide-react";
import { PageWrap, PageHeader, SubHeader, Card, Chip, Avatar, GhostBtn, BrandBtn } from "../student/_shared";
import { StatusBadge, OverviewCard, ProgressBar } from "../primitives";

/* ───────────── Student Management ───────────── */
const STUDENTS = [
  { name: "Aarav Sharma", grade: "11-A", roll: "1101", gpa: 9.2 },
  { name: "Diya Patel", grade: "11-A", roll: "1102", gpa: 9.5 },
  { name: "Rohan Iyer", grade: "10-B", roll: "1015", gpa: 7.8 },
  { name: "Sneha Kumar", grade: "12-A", roll: "1201", gpa: 8.9 },
  { name: "Vikrant Reddy", grade: "9-C", roll: "9028", gpa: 7.4 },
  { name: "Ananya Singh", grade: "11-A", roll: "1104", gpa: 8.6 },
  { name: "Karthik Nair", grade: "10-A", roll: "1003", gpa: 9.0 },
  { name: "Meera Joshi", grade: "12-B", roll: "1218", gpa: 8.4 },
];
export function StudentManagementPage() {
  const [q, setQ] = useState("");
  const list = STUDENTS.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()) || s.grade.includes(q));
  return (
    <PageWrap>
      <PageHeader title="Student Management" subtitle="1,284 students enrolled across all classes"
        right={<BrandBtn icon={Plus}>Enroll Student</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={GraduationCap} value="1,284" label="Total Students" color="brand" />
        <OverviewCard icon={Users} value="38" label="Sections" color="info" />
        <OverviewCard icon={TrendingUp} value="+47" label="New this term" color="success" trend={{dir:"up",text:"+3.6%",positive:true}} />
        <OverviewCard icon={AlertCircle} value="12" label="At-risk" color="danger" pulse />
      </div>
      <Card padded={false}>
        <div className="flex items-center gap-2 border-b border-border p-3">
          <Search className="h-4 w-4 text-muted-foreground"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name, class, roll..." className="flex-1 bg-transparent text-sm focus:outline-none"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Student</th><th className="px-4 py-3 text-left">Class</th><th className="px-4 py-3 text-left">Roll No.</th><th className="px-4 py-3 text-center">GPA</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.roll} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar name={s.name} size={32}/><span className="font-semibold text-ink">{s.name}</span></div></td>
                  <td className="px-4 py-3 text-muted-foreground">Class {s.grade}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3 text-center"><Chip color={s.gpa>=9?"#10B981":s.gpa>=8?"#191BDF":"#F59E0B"} size="sm">{s.gpa}</Chip></td>
                  <td className="px-4 py-3 text-right"><ChevronRight className="inline h-4 w-4 text-muted-foreground"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Faculty Management ───────────── */
const STAFF = [
  { name: "Dr. Priya Venkatesan", role: "HOF — Sciences", subj: "Physics", years: 12 },
  { name: "Ms. Deepa Krishnan", role: "Senior Faculty", subj: "Mathematics", years: 8 },
  { name: "Mr. Rajesh Iyer", role: "Faculty", subj: "Mathematics", years: 6 },
  { name: "Mr. Anand Pillai", role: "Faculty", subj: "English", years: 4 },
  { name: "Dr. Sanjana Murthy", role: "Faculty", subj: "Chemistry", years: 7 },
];
export function PrincipalFacultyManagementPage() {
  return (
    <PageWrap>
      <PageHeader title="Faculty Management" subtitle="84 faculty members across departments"
        right={<BrandBtn icon={Plus}>Hire Faculty</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={Users} value="84" label="Total Faculty" color="brand" />
        <OverviewCard icon={Check} value="78" label="Present today" color="success" progress={92} />
        <OverviewCard icon={FileCheck} value="8" label="On Leave" color="warning" />
        <OverviewCard icon={UserPlus} value="3" label="New hires" color="info" />
      </div>
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Faculty</th><th className="px-4 py-3 text-left">Role</th><th className="px-4 py-3 text-left">Subject</th><th className="px-4 py-3 text-center">Tenure</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody>
              {STAFF.map((s) => (
                <tr key={s.name} className="border-t border-border">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar name={s.name} size={32}/><span className="font-semibold text-ink">{s.name}</span></div></td>
                  <td className="px-4 py-3"><Chip color="#191BDF" size="sm">{s.role}</Chip></td>
                  <td className="px-4 py-3 text-muted-foreground">{s.subj}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{s.years}y</td>
                  <td className="px-4 py-3 text-right"><GhostBtn>View Profile</GhostBtn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Admissions ───────────── */
export function AdmissionsPage() {
  const funnel = [
    { stage: "Applied", count: 248, color: "#191BDF" },
    { stage: "Doc Review", count: 186, color: "#3B82F6" },
    { stage: "Interview", count: 94, color: "#F59E0B" },
    { stage: "Admitted", count: 47, color: "#10B981" },
    { stage: "Enrolled", count: 32, color: "#059669" },
  ];
  const max = funnel[0].count;
  return (
    <PageWrap>
      <PageHeader title="Admissions" subtitle="2026 admission cycle" right={<BrandBtn icon={Plus}>New Application</BrandBtn>} />
      <Card>
        <SubHeader title="Admissions Funnel" />
        <div className="space-y-3">
          {funnel.map((f) => {
            const w = (f.count/max)*100;
            return (
              <div key={f.stage} className="flex items-center gap-3">
                <div className="w-28 text-sm font-bold text-ink">{f.stage}</div>
                <div className="relative flex-1 h-9 rounded-xl bg-bg overflow-hidden">
                  <div className="h-full rounded-xl flex items-center justify-end px-3 text-xs font-bold text-white" style={{width:`${w}%`,background:f.color}}>{f.count}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        <SubHeader title="Recent Applications" />
        <div className="space-y-2">
          {[
            { name: "Anaya Kapoor", class: "Class 9", date: "Today", stage: "Doc Review" },
            { name: "Ishaan Mehta", class: "Class 6", date: "Yesterday", stage: "Interview" },
            { name: "Aditi Nair", class: "Class 11", date: "2d ago", stage: "Admitted" },
            { name: "Yash Khanna", class: "Class 8", date: "3d ago", stage: "Applied" },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <Avatar name={a.name}/>
              <div className="flex-1"><div className="font-semibold text-ink">{a.name}</div><div className="text-xs text-muted-foreground">{a.class} · {a.date}</div></div>
              <Chip color="#191BDF" size="sm">{a.stage}</Chip>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Academic Reports ───────────── */
export function AcademicReportsPage() {
  return (
    <PageWrap>
      <PageHeader title="Academic Reports" subtitle="School-wide performance metrics" right={<GhostBtn icon={Download}>Export All</GhostBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={BarChart3} value="84.2%" label="Avg Score" color="brand" progress={84} />
        <OverviewCard icon={GraduationCap} value="96%" label="Pass Rate" color="success" progress={96} />
        <OverviewCard icon={TrendingUp} value="+4.2%" label="YoY Growth" color="info" trend={{dir:"up",text:"+4.2%",positive:true}}/>
        <OverviewCard icon={AlertCircle} value="2.3%" label="At-risk students" color="warning" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <SubHeader title="Performance by Grade" />
          <div className="space-y-3">
            {[
              { g: "Class 6", v: 86 },{ g: "Class 7", v: 84 },{ g: "Class 8", v: 78 },
              { g: "Class 9", v: 82 },{ g: "Class 10", v: 85 },{ g: "Class 11", v: 79 },{ g: "Class 12", v: 88 },
            ].map((c) => (
              <div key={c.g}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-ink">{c.g}</span><span className="font-bold text-brand">{c.v}%</span></div>
                <ProgressBar value={c.v} color={c.v>=85?"#10B981":c.v>=80?"#191BDF":"#F59E0B"} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SubHeader title="Performance by Subject" />
          <div className="space-y-3">
            {[
              { s: "Mathematics", v: 81 },{ s: "Physics", v: 79 },{ s: "Chemistry", v: 84 },
              { s: "Biology", v: 86 },{ s: "English", v: 88 },{ s: "Computer Science", v: 91 },
            ].map((c) => (
              <div key={c.s}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-ink">{c.s}</span><span className="font-bold text-brand">{c.v}%</span></div>
                <ProgressBar value={c.v} color={c.v>=85?"#10B981":c.v>=80?"#191BDF":"#F59E0B"} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrap>
  );
}

/* ───────────── Academic Calendar ───────────── */
type AcademicEvent = { d: number; m: number; y: number; t: string; k: "PTM" | "Exam" | "Holiday" | "Event" | "Result" | "Term" };

const ACADEMIC_EVENTS: AcademicEvent[] = [
  { d: 10, m: 5, y: 2025, t: "Academic Year 2025–26 Begins", k: "Term" },
  { d: 15, m: 7, y: 2025, t: "Independence Day", k: "Holiday" },
  { d: 27, m: 7, y: 2025, t: "First Unit Test Begins", k: "Exam" },
  { d: 5,  m: 8, y: 2025, t: "Teachers' Day Celebration", k: "Event" },
  { d: 12, m: 9, y: 2025, t: "Parent-Teacher Meeting", k: "PTM" },
  { d: 2,  m: 10, y: 2025, t: "Gandhi Jayanti", k: "Holiday" },
  { d: 15, m: 10, y: 2025, t: "Mid-term Examinations", k: "Exam" },
  { d: 1,  m: 11, y: 2025, t: "Diwali Holidays", k: "Holiday" },
  { d: 20, m: 11, y: 2025, t: "Mid-term Results Declared", k: "Result" },
  { d: 25, m: 12, y: 2025, t: "Christmas Holidays Begin", k: "Holiday" },
  { d: 26, m: 1, y: 2026, t: "Republic Day", k: "Holiday" },
  { d: 5,  m: 2, y: 2026, t: "Annual Sports Day", k: "Event" },
  { d: 14, m: 2, y: 2026, t: "Second PTM", k: "PTM" },
  { d: 28, m: 3, y: 2026, t: "Parent-Teacher Meeting", k: "PTM" },
  { d: 2,  m: 4, y: 2026, t: "Mid-term Begins", k: "Exam" },
  { d: 14, m: 4, y: 2026, t: "Tamil New Year Holiday", k: "Holiday" },
  { d: 22, m: 4, y: 2026, t: "Annual Sports Day", k: "Event" },
  { d: 5,  m: 5, y: 2026, t: "Final Result Declaration", k: "Result" },
  { d: 15, m: 5, y: 2026, t: "Summer Vacation Begins", k: "Holiday" },
];

const KIND_STYLE: Record<AcademicEvent["k"], { fg: string; bg: string; dot: string }> = {
  PTM:     { fg: "#191BDF", bg: "rgba(25,27,223,0.10)",  dot: "#191BDF" },
  Exam:    { fg: "#B91C1C", bg: "rgba(239,68,68,0.12)",  dot: "#EF4444" },
  Holiday: { fg: "#047857", bg: "rgba(16,185,129,0.12)", dot: "#10B981" },
  Event:   { fg: "#B45309", bg: "rgba(245,158,11,0.14)", dot: "#F59E0B" },
  Result:  { fg: "#1D4ED8", bg: "rgba(59,130,246,0.12)", dot: "#3B82F6" },
  Term:    { fg: "#4B5563", bg: "rgba(107,114,128,0.12)", dot: "#6B7280" },
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const YEAR_MONTHS: { m: number; y: number; label: string }[] = [
  { m: 5, y: 2025, label: "Jun 2025" }, { m: 6, y: 2025, label: "Jul 2025" },
  { m: 7, y: 2025, label: "Aug 2025" }, { m: 8, y: 2025, label: "Sep 2025" },
  { m: 9, y: 2025, label: "Oct 2025" }, { m: 10, y: 2025, label: "Nov 2025" },
  { m: 11, y: 2025, label: "Dec 2025" }, { m: 0, y: 2026, label: "Jan 2026" },
  { m: 1, y: 2026, label: "Feb 2026" }, { m: 2, y: 2026, label: "Mar 2026" },
  { m: 3, y: 2026, label: "Apr 2026" }, { m: 4, y: 2026, label: "May 2026" },
];

export function AcademicCalendarPage() {
  const [filter, setFilter] = useState<AcademicEvent["k"] | "all">("all");
  const filtered = filter === "all" ? ACADEMIC_EVENTS : ACADEMIC_EVENTS.filter((e) => e.k === filter);
  const filters: (AcademicEvent["k"] | "all")[] = ["all", "Exam", "PTM", "Holiday", "Event", "Result", "Term"];

  const eventsFor = (m: number, y: number) =>
    filtered.filter((e) => e.m === m && e.y === y).sort((a, b) => a.d - b.d);

  return (
    <PageWrap>
      <PageHeader
        title="Academic Calendar"
        subtitle="School year 2025 – 2026 · 12 month overview"
        right={
          <div className="flex flex-wrap gap-2">
            <GhostBtn icon={Download}>Export</GhostBtn>
            <BrandBtn icon={Plus}>Add Event</BrandBtn>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={CalendarDays} value={String(ACADEMIC_EVENTS.length)} label="Total Events" color="brand" />
        <OverviewCard icon={FileText} value={String(ACADEMIC_EVENTS.filter((e) => e.k === "Exam").length)} label="Examinations" color="danger" />
        <OverviewCard icon={Megaphone} value={String(ACADEMIC_EVENTS.filter((e) => e.k === "PTM").length)} label="PTM Meetings" color="info" />
        <OverviewCard icon={Check} value={String(ACADEMIC_EVENTS.filter((e) => e.k === "Holiday").length)} label="Holidays" color="success" />
      </div>

      {/* Filter chips */}
      <Card padded={false} className="!shadow-none">
        <div className="-mx-1 flex gap-2 overflow-x-auto p-3">
          {filters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold capitalize transition-all ${
                  isActive
                    ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]"
                    : "border border-border bg-bg text-ink hover:border-brand-light hover:text-brand"
                }`}
              >
                {f === "all" ? "All Events" : f}
              </button>
            );
          })}
        </div>
      </Card>

      {/* 12-month grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {YEAR_MONTHS.map(({ m, y, label }) => {
          const events = eventsFor(m, y);
          return (
            <Card key={label}>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-base font-extrabold text-ink">
                    {label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {events.length} event{events.length === 1 ? "" : "s"}
                  </div>
                </div>
                <Chip color="#191BDF" size="sm">{MONTH_NAMES[m]}</Chip>
              </div>
              {events.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-bg p-6 text-center text-xs text-muted-foreground">
                  No events
                </div>
              ) : (
                <ul className="space-y-2">
                  {events.map((e, i) => {
                    const s = KIND_STYLE[e.k];
                    return (
                      <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-2.5">
                        <div
                          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg font-[family-name:var(--font-display)] text-sm font-extrabold"
                          style={{ background: s.bg, color: s.fg }}
                        >
                          {String(e.d).padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-ink">{e.t}</div>
                          <span
                            className="mt-0.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-[family-name:var(--font-dm)] text-[10px] font-bold"
                            style={{ background: s.bg, color: s.fg }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
                            {e.k}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          );
        })}
      </div>
    </PageWrap>
  );
}


/* ───────────── Exam Overview ───────────── */
export function ExamOverviewPage() {
  return (
    <PageWrap>
      <PageHeader title="Exam Overview" subtitle="School-wide examination snapshot" right={<GhostBtn icon={Download}>Export</GhostBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={FileText} value="42" label="Active Exams" color="brand" />
        <OverviewCard icon={Check} value="38" label="Completed" color="success" />
        <OverviewCard icon={Clock} value="6" label="Upcoming" color="warning" />
        <OverviewCard icon={BarChart3} value="83%" label="Avg Result" color="info" progress={83} />
      </div>
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Exam</th><th className="px-4 py-3 text-left">Grade</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-center">Students</th><th className="px-4 py-3 text-center">Status</th></tr>
            </thead>
            <tbody>
              {[
                { n:"Mid-term Mathematics", g:"Class 11", d:"Apr 02", s:184, st:"upcoming" },
                { n:"Mid-term Physics", g:"Class 11", d:"Apr 03", s:184, st:"upcoming" },
                { n:"Unit Test 3 — English", g:"Class 10", d:"Mar 25", s:212, st:"completed" },
                { n:"Mock Board Exam", g:"Class 12", d:"Mar 20", s:168, st:"completed" },
              ].map((e) => (
                <tr key={e.n} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-ink">{e.n}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.g}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.d}</td>
                  <td className="px-4 py-3 text-center">{e.s}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={e.st}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Financial Dashboard ───────────── */
export function FinancialDashboardPage() {
  return (
    <PageWrap>
      <PageHeader title="Financial Dashboard" subtitle="Real-time financial overview" right={<GhostBtn icon={Download}>Export Statement</GhostBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={IndianRupee} value="₹1.24 Cr" label="Collected (FY)" color="success" trend={{dir:"up",text:"+12%",positive:true}}/>
        <OverviewCard icon={AlertCircle} value="₹18.4 L" label="Outstanding" color="danger" />
        <OverviewCard icon={Receipt} value="₹86.2 L" label="Expenses" color="warning" />
        <OverviewCard icon={TrendingUp} value="₹38.0 L" label="Net Surplus" color="brand" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <SubHeader title="Income vs Expenses (last 6 months)" />
          <div className="flex items-end gap-3 h-48">
            {[
              { m:"Oct", i:80, e:62 },{ m:"Nov", i:88, e:64 },{ m:"Dec", i:74, e:60 },
              { m:"Jan", i:92, e:70 },{ m:"Feb", i:96, e:72 },{ m:"Mar", i:104, e:78 },
            ].map((d) => (
              <div key={d.m} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-1 h-40 w-full justify-center">
                  <div className="w-3 rounded-t bg-brand" style={{height:`${d.i}%`}}/>
                  <div className="w-3 rounded-t bg-[#F59E0B]" style={{height:`${d.e}%`}}/>
                </div>
                <div className="text-[11px] font-bold text-muted-foreground">{d.m}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand"/>Income</span><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#F59E0B]"/>Expenses</span></div>
        </Card>
        <Card>
          <SubHeader title="Expense Breakdown" />
          <div className="space-y-3">
            {[
              { c:"Faculty Salaries", v:62, color:"#191BDF" },
              { c:"Infrastructure", v:18, color:"#3B82F6" },
              { c:"Operations", v:12, color:"#F59E0B" },
              { c:"Events & Activities", v:8, color:"#10B981" },
            ].map((c) => (
              <div key={c.c}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-ink">{c.c}</span><span className="font-bold text-ink">{c.v}%</span></div>
                <ProgressBar value={c.v} color={c.color}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrap>
  );
}

/* ───────────── Fee Collection ───────────── */
export function FeeCollectionPage() {
  return (
    <PageWrap>
      <PageHeader title="Fee Collection" subtitle="Term 4 collection progress" right={<BrandBtn icon={Send}>Send Reminders</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={IndianRupee} value="₹84.2 L" label="Collected" color="success" progress={82} />
        <OverviewCard icon={Clock} value="₹18.4 L" label="Pending" color="warning" />
        <OverviewCard icon={Users} value="1,109" label="Paid" color="brand" />
        <OverviewCard icon={AlertCircle} value="175" label="Pending students" color="danger" />
      </div>
      <Card>
        <SubHeader title="Collection by Class" />
        <div className="space-y-3">
          {[
            { c:"Class 12", v:92 },{ c:"Class 11", v:88 },{ c:"Class 10", v:84 },
            { c:"Class 9", v:79 },{ c:"Class 8", v:81 },{ c:"Class 7", v:76 },{ c:"Class 6", v:72 },
          ].map((r) => (
            <div key={r.c}>
              <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold text-ink">{r.c}</span><span className="font-bold text-brand">{r.v}%</span></div>
              <ProgressBar value={r.v} color={r.v>=85?"#10B981":r.v>=75?"#191BDF":"#F59E0B"}/>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Fee Defaulters ───────────── */
export function FeeDefaultersPage() {
  return (
    <PageWrap>
      <PageHeader title="Fee Defaulters" subtitle="47 students with overdue payments"
        right={<div className="flex gap-2"><GhostBtn icon={Download}>Export</GhostBtn><BrandBtn icon={Send}>Bulk Reminder</BrandBtn></div>} />
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Student</th><th className="px-4 py-3 text-left">Class</th><th className="px-4 py-3 text-right">Amount Due</th><th className="px-4 py-3 text-center">Overdue (days)</th><th className="px-4 py-3 text-center">Action</th></tr>
            </thead>
            <tbody>
              {[
                { n:"Rohan Mehta", c:"10-B", a:28500, o:22 },
                { n:"Aditya Kapoor", c:"9-A", a:24000, o:18 },
                { n:"Sneha Reddy", c:"11-C", a:31200, o:14 },
                { n:"Vikrant Singh", c:"8-A", a:19800, o:9 },
                { n:"Pooja Saxena", c:"7-B", a:17500, o:6 },
                { n:"Rahul Verma", c:"12-A", a:34000, o:4 },
              ].map((d) => (
                <tr key={d.n} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar name={d.n} size={32}/><span className="font-semibold text-ink">{d.n}</span></div></td>
                  <td className="px-4 py-3 text-muted-foreground">Class {d.c}</td>
                  <td className="px-4 py-3 text-right font-bold text-ink">₹{d.a.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-center"><Chip color={d.o>=14?"#EF4444":"#F59E0B"} size="sm">{d.o}d</Chip></td>
                  <td className="px-4 py-3 text-center"><GhostBtn icon={Phone}>Contact</GhostBtn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Substitute Management ───────────── */
export function SubstituteManagementPage() {
  return (
    <PageWrap>
      <PageHeader title="Substitute Management" subtitle="School-wide substitute coverage today" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={RefreshCw} value="12" label="Substitutes today" color="brand" />
        <OverviewCard icon={Check} value="9" label="Confirmed" color="success" />
        <OverviewCard icon={Clock} value="3" label="Pending" color="warning" />
        <OverviewCard icon={AlertCircle} value="2" label="Conflicts" color="danger" />
      </div>
      <Card>
        <SubHeader title="Today's Substitutes" />
        <div className="space-y-2">
          {[
            { a:"Ms. Lakshmi Narayan", s:"Ms. Anjali Rao", c:"Physics · 11-A", st:"Confirmed" },
            { a:"Mr. Vikram Sundar", s:"Dr. Sanjana Murthy", c:"Chemistry · 10-A", st:"Confirmed" },
            { a:"Mr. Karthik Menon", s:"—", c:"Biology · 10-B", st:"Pending" },
          ].map((r) => (
            <div key={r.a+r.c} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <RefreshCw className="h-5 w-5 text-brand"/>
              <div className="flex-1"><div className="font-semibold text-ink">{r.a} → {r.s}</div><div className="text-xs text-muted-foreground">{r.c}</div></div>
              <StatusBadge status={r.st}/>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Staff Leave Approval ───────────── */
export function StaffLeaveApprovalPage() {
  const reqs = [
    { n:"Ms. Deepa Krishnan", r:"HOF (Math)", d:"Mar 25 – Mar 27", t:"Casual" },
    { n:"Mr. Anand Pillai", r:"Faculty (English)", d:"Apr 02", t:"Sick" },
    { n:"Dr. Sanjana Murthy", r:"Faculty (Chemistry)", d:"Apr 05 – Apr 06", t:"Earned" },
    { n:"Mr. Suresh Babu", r:"Lab Asst", d:"Apr 10", t:"Casual" },
  ];
  return (
    <PageWrap>
      <PageHeader title="Staff Leave Approval" subtitle={`${reqs.length} pending leave requests`} />
      <Card>
        <div className="space-y-3">
          {reqs.map((r) => (
            <div key={r.n+r.d} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-bg p-4">
              <Avatar name={r.n} size={44}/>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-ink">{r.n}</div>
                <div className="text-xs text-muted-foreground">{r.r} · {r.d}</div>
              </div>
              <Chip color="#191BDF" size="sm">{r.t}</Chip>
              <div className="flex gap-2">
                <button className="rounded-xl bg-[#EF4444] px-3 py-1.5 text-xs font-bold text-white"><X className="mr-1 inline h-3 w-3"/>Reject</button>
                <button className="rounded-xl bg-[#10B981] px-3 py-1.5 text-xs font-bold text-white"><Check className="mr-1 inline h-3 w-3"/>Approve</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Conduct & Discipline ───────────── */
export function ConductPage() {
  return (
    <PageWrap>
      <PageHeader title="Conduct & Discipline" subtitle="Disciplinary cases requiring principal review" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={AlertTriangle} value="4" label="Active Cases" color="danger" pulse />
        <OverviewCard icon={Clock} value="3" label="Under Review" color="warning" />
        <OverviewCard icon={Check} value="28" label="Resolved this term" color="success" />
        <OverviewCard icon={TrendingUp} value="-15%" label="vs last term" color="info" trend={{dir:"down",text:"-15%",positive:true}}/>
      </div>
      <Card>
        <SubHeader title="Active Cases"/>
        <div className="space-y-2">
          {[
            { s:"Ananya Singh (11-A)", i:"Repeated class disruption", sev:"High", esc:"HOF Sciences" },
            { s:"Vikrant Reddy (9-C)", i:"Plagiarism in assignment", sev:"High", esc:"HOF English" },
            { s:"Rohan Iyer (10-B)", i:"Absenteeism", sev:"Medium", esc:"Class Teacher" },
          ].map((c) => (
            <div key={c.s} className="rounded-xl border border-border bg-bg p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div><div className="font-bold text-ink">{c.s}</div><div className="text-xs text-muted-foreground">Escalated by {c.esc}</div><div className="mt-1 text-sm text-ink">"{c.i}"</div></div>
                <Chip color={c.sev==="High"?"#EF4444":"#F59E0B"} size="sm">{c.sev}</Chip>
              </div>
              <div className="mt-2 flex gap-2"><GhostBtn>Schedule Meeting</GhostBtn><BrandBtn>Take Action</BrandBtn></div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Announcements (Principal) ───────────── */
export function PrincipalAnnouncementsPage() {
  return (
    <PageWrap>
      <PageHeader title="Announcements" subtitle="School-wide communications" right={<BrandBtn icon={Plus}>New</BrandBtn>} />
      <Card>
        <SubHeader title="Compose Announcement" />
        <input className={inputCls} placeholder="Headline" />
        <textarea rows={5} className={`${inputCls} mt-3`} placeholder="Message body..." />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <select className={inputCls}><option>Entire school</option><option>Faculty only</option><option>Students only</option><option>Parents</option></select>
          <select className={inputCls}><option>Normal</option><option>High priority</option><option>Critical</option></select>
          <input type="date" className={inputCls} />
        </div>
        <div className="mt-3 flex justify-end gap-2"><GhostBtn>Save Draft</GhostBtn><BrandBtn icon={Send}>Publish School-wide</BrandBtn></div>
      </Card>
      <Card>
        <SubHeader title="Recently Published" />
        <div className="space-y-2">
          {["Annual Sports Day on April 22","Mid-term exam timetable published","Summer vacation schedule"].map((a) => (
            <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <Megaphone className="h-5 w-5 text-brand"/><div className="flex-1 font-semibold text-ink">{a}</div><Chip color="#10B981" size="sm">Live</Chip>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Parent Communication ───────────── */
export function ParentCommunicationPage() {
  return (
    <PageWrap>
      <PageHeader title="Parent Communication" subtitle="Messages and engagement with parents" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={MessageSquare} value="248" label="Active Threads" color="brand" />
        <OverviewCard icon={Mail} value="86" label="Unread Replies" color="warning" />
        <OverviewCard icon={Check} value="92%" label="Response Rate" color="success" progress={92}/>
        <OverviewCard icon={Clock} value="4h" label="Avg Reply Time" color="info" />
      </div>
      <Card>
        <SubHeader title="Recent Threads"/>
        <div className="space-y-2">
          {[
            { p:"Mr. Sharma", s:"Aarav (11-A)", m:"Concern about increased homework load", t:"2h" },
            { p:"Mrs. Patel", s:"Diya (11-A)", m:"Request for career counseling", t:"5h" },
            { p:"Mr. Iyer", s:"Rohan (10-B)", m:"Feedback on parent meeting", t:"Yesterday" },
            { p:"Mrs. Kumar", s:"Sneha (12-A)", m:"Permission for inter-school event", t:"2d" },
          ].map((t) => (
            <div key={t.p+t.t} className="flex items-start gap-3 rounded-xl border border-border bg-bg p-3">
              <Avatar name={t.p}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><span className="font-bold text-ink">{t.p}</span><span className="text-xs text-muted-foreground">· {t.s}</span></div>
                <div className="truncate text-sm text-ink">"{t.m}"</div>
              </div>
              <div className="text-xs text-muted-foreground">{t.t}</div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Noticeboard ───────────── */
export function NoticeboardPage() {
  return (
    <PageWrap>
      <PageHeader title="Noticeboard" subtitle="Official notices archive" right={<BrandBtn icon={Plus}>New Notice</BrandBtn>} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t:"Circular No. 24/2026", s:"Mid-term Examination Schedule", d:"Mar 22" },
          { t:"Circular No. 23/2026", s:"Annual Sports Day Notice", d:"Mar 18" },
          { t:"Circular No. 22/2026", s:"Library Timing Extension", d:"Mar 15" },
          { t:"Circular No. 21/2026", s:"Holiday List 2026", d:"Mar 10" },
          { t:"Circular No. 20/2026", s:"Fee Payment Reminder", d:"Mar 5" },
          { t:"Circular No. 19/2026", s:"Bus Route Update", d:"Mar 2" },
        ].map((n) => (
          <Card key={n.t}>
            <Newspaper className="h-7 w-7 text-brand"/>
            <div className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{n.t}</div>
            <div className="mt-1 font-bold text-ink">{n.s}</div>
            <div className="mt-2 text-xs text-muted-foreground">Published {n.d}, 2026</div>
            <div className="mt-3 flex gap-2"><GhostBtn icon={Download}>PDF</GhostBtn><GhostBtn>View</GhostBtn></div>
          </Card>
        ))}
      </div>
    </PageWrap>
  );
}

/* ───────────── Infrastructure Alerts ───────────── */
export function InfrastructurePage() {
  return (
    <PageWrap>
      <PageHeader title="Infrastructure Alerts" subtitle="Facility issues across campus" right={<BrandBtn icon={Plus}>Log Issue</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={Building2} value="3" label="Active Alerts" color="danger" pulse />
        <OverviewCard icon={Clock} value="5" label="In Progress" color="warning" />
        <OverviewCard icon={Check} value="42" label="Resolved (M)" color="success" />
        <OverviewCard icon={TrendingUp} value="98%" label="Uptime" color="brand" progress={98} />
      </div>
      <Card>
        <SubHeader title="Open Tickets"/>
        <div className="space-y-2">
          {[
            { t:"Block A — Water leakage", l:"3rd floor corridor", sev:"High", age:"2h" },
            { t:"Classroom 204 projector failure", l:"Block B", sev:"Medium", age:"5h" },
            { t:"Playground floodlight out", l:"Sports field", sev:"Low", age:"1d" },
            { t:"Wi-Fi outage", l:"Library wing", sev:"Medium", age:"3h" },
          ].map((t) => (
            <div key={t.t} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <Building2 className="h-5 w-5 text-brand"/>
              <div className="flex-1">
                <div className="font-bold text-ink">{t.t}</div>
                <div className="text-xs text-muted-foreground">{t.l} · opened {t.age} ago</div>
              </div>
              <Chip color={t.sev==="High"?"#EF4444":t.sev==="Medium"?"#F59E0B":"#10B981"} size="sm">{t.sev}</Chip>
              <GhostBtn>Assign</GhostBtn>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── School Settings ───────────── */
export function SchoolSettingsPage() {
  return (
    <PageWrap>
      <PageHeader title="School Settings" subtitle="System & institutional configuration" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <SubHeader title="Institution"/>
          <div className="space-y-3">
            <Field label="School Name"><input defaultValue="Baptist Academy" className={inputCls}/></Field>
            <Field label="Affiliation Board"><select className={inputCls}><option>CBSE</option><option>ICSE</option><option>State Board</option></select></Field>
            <Field label="Academic Year"><input defaultValue="2025 – 2026" className={inputCls}/></Field>
            <Field label="Principal Contact"><input defaultValue="principal@baptist.edu.in" className={inputCls}/></Field>
          </div>
        </Card>
        <Card>
          <SubHeader title="System Preferences"/>
          <div className="space-y-3">
            <Toggle label="Enable parent SMS notifications" defaultOn />
            <Toggle label="Auto-publish marks to portal" />
            <Toggle label="Require principal approval for leave > 3 days" defaultOn />
            <Toggle label="Public website maintenance mode" />
            <Toggle label="Two-factor authentication for staff" defaultOn />
          </div>
        </Card>
        <Card>
          <SubHeader title="Fee Structure"/>
          <div className="space-y-3">
            <Field label="Term Fee (₹)"><input defaultValue={45000} className={inputCls}/></Field>
            <Field label="Late Fee Penalty (%)"><input defaultValue={5} className={inputCls}/></Field>
            <Field label="Grace Period (days)"><input defaultValue={7} className={inputCls}/></Field>
          </div>
        </Card>
        <Card>
          <SubHeader title="Danger Zone"/>
          <div className="space-y-2">
            <button className="flex w-full items-center justify-between rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-3 text-left text-sm font-bold text-[#DC2626] hover:bg-[#EF4444]/10">
              <span>Reset all dashboards</span><RefreshCw className="h-4 w-4"/>
            </button>
            <button className="flex w-full items-center justify-between rounded-xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-3 text-left text-sm font-bold text-[#DC2626] hover:bg-[#EF4444]/10">
              <span>Archive last academic year</span><Trash2 className="h-4 w-4"/>
            </button>
          </div>
        </Card>
      </div>
      <div className="flex justify-end"><BrandBtn icon={Check}>Save Changes</BrandBtn></div>
    </PageWrap>
  );
}

/* helpers */
const inputCls = "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-bg p-3">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <button onClick={()=>setOn(!on)} className={`relative h-6 w-11 rounded-full transition-all ${on?"bg-brand":"bg-border"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on?"left-5":"left-0.5"}`}/>
      </button>
    </div>
  );
}
