import { useState } from "react";
import {
  Users, UserCheck, RefreshCw, Star, FileCheck, CalendarDays, BookOpen,
  ClipboardList, BarChart3, Megaphone, CalendarClock, AlertTriangle,
  Plus, Search, Check, X, Clock, Send, Phone, Mail, ChevronRight,
  TrendingUp, Award, Download,
} from "lucide-react";
import { PageWrap, PageHeader, SubHeader, Card, Chip, Avatar, GhostBtn, BrandBtn } from "../student/_shared";
import { StatusBadge, OverviewCard, ProgressBar } from "../primitives";
import { TimetableGrid, TimetableLegend } from "../shared/TimetableGrid";

const FACULTY = [
  { name: "Dr. Priya Venkatesan", subj: "Physics", classes: 5, rating: 4.8, status: "Present" },
  { name: "Ms. Lakshmi Narayan", subj: "Physics", classes: 4, rating: 4.5, status: "Absent" },
  { name: "Mr. Vikram Sundar", subj: "Chemistry", classes: 4, rating: 4.6, status: "Leave" },
  { name: "Mr. Karthik Menon", subj: "Biology", classes: 5, rating: 4.7, status: "Absent" },
  { name: "Ms. Deepa Krishnan", subj: "Mathematics", classes: 6, rating: 4.9, status: "Present" },
  { name: "Mr. Anand Pillai", subj: "English", classes: 4, rating: 4.4, status: "Present" },
  { name: "Dr. Sanjana Murthy", subj: "Chemistry", classes: 5, rating: 4.7, status: "Present" },
  { name: "Ms. Anjali Rao", subj: "Physics", classes: 3, rating: 4.6, status: "Present" },
];

/* ───────────── Faculty Directory ───────────── */
export function FacultyDirectoryPage() {
  const [q, setQ] = useState("");
  const list = FACULTY.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()) || f.subj.toLowerCase().includes(q.toLowerCase()));
  return (
    <PageWrap>
      <PageHeader title="Faculty Directory" subtitle={`${FACULTY.length} faculty members in the Sciences department`}
        right={<BrandBtn icon={Plus}>Add Faculty</BrandBtn>} />
      <Card padded={false}>
        <div className="flex items-center gap-2 border-b border-border p-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by name, subject..." className="flex-1 bg-transparent text-sm focus:outline-none" />
        </div>
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => (
            <div key={f.name} className="rounded-2xl border border-border bg-bg p-4 transition-all hover:-translate-y-0.5 hover:border-brand-light">
              <div className="flex items-center gap-3">
                <Avatar name={f.name} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold text-ink">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.subj}</div>
                </div>
                <StatusBadge status={f.status} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-surface p-2"><div className="text-muted-foreground">Classes</div><div className="font-bold text-ink">{f.classes}/wk</div></div>
                <div className="rounded-lg bg-surface p-2"><div className="text-muted-foreground">Rating</div><div className="font-bold text-brand">★ {f.rating}</div></div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-lg border border-border bg-surface py-1.5 text-xs font-bold text-ink hover:text-brand"><Phone className="mr-1 inline h-3 w-3"/>Call</button>
                <button className="flex-1 rounded-lg border border-border bg-surface py-1.5 text-xs font-bold text-ink hover:text-brand"><Mail className="mr-1 inline h-3 w-3"/>Email</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Faculty Attendance ───────────── */
export function FacultyAttendanceOverviewPage() {
  const present = FACULTY.filter(f=>f.status==="Present").length;
  return (
    <PageWrap>
      <PageHeader title="Faculty Attendance" subtitle="Today's faculty presence at a glance" right={<GhostBtn icon={Download}>Export</GhostBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={Users} value={String(FACULTY.length)} label="Total Faculty" color="brand" />
        <OverviewCard icon={Check} value={String(present)} label="Present Today" color="success" progress={(present/FACULTY.length)*100} />
        <OverviewCard icon={X} value={String(FACULTY.filter(f=>f.status==="Absent").length)} label="Absent" color="danger" />
        <OverviewCard icon={FileCheck} value={String(FACULTY.filter(f=>f.status==="Leave").length)} label="On Leave" color="warning" />
      </div>
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Faculty</th><th className="px-4 py-3 text-left">Subject</th><th className="px-4 py-3 text-center">Check-in</th><th className="px-4 py-3 text-center">Classes</th><th className="px-4 py-3 text-center">Status</th></tr>
            </thead>
            <tbody>
              {FACULTY.map((f) => (
                <tr key={f.name} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar name={f.name} size={32}/><span className="font-semibold text-ink">{f.name}</span></div></td>
                  <td className="px-4 py-3 text-muted-foreground">{f.subj}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{f.status==="Present"?"8:42 AM":"—"}</td>
                  <td className="px-4 py-3 text-center">{f.classes}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={f.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Substitute Allocation ───────────── */
export function SubstituteAllocationPage() {
  return (
    <PageWrap>
      <PageHeader title="Substitute Allocation" subtitle="Cover absent faculty classes for today"
        right={<BrandBtn icon={RefreshCw}>Auto-allocate</BrandBtn>} />
      <Card>
        <SubHeader title="Pending Allocations" subtitle="3 classes need substitutes" />
        <div className="space-y-3">
          {[
            { absent: "Ms. Lakshmi Narayan", subj: "Physics", class: "Class 11 — A", period: "Period 3 · 10:30 AM" },
            { absent: "Mr. Karthik Menon", subj: "Biology", class: "Class 10 — B", period: "Period 4 · 11:30 AM" },
            { absent: "Mr. Karthik Menon", subj: "Biology", class: "Class 9 — C", period: "Period 6 · 1:30 PM" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-bg p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={s.absent} />
                  <div>
                    <div className="font-bold text-ink">{s.absent}</div>
                    <div className="text-xs text-muted-foreground">{s.subj} · {s.class} · {s.period}</div>
                  </div>
                </div>
                <Chip color="#EF4444" size="sm">Unassigned</Chip>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {["Ms. Anjali Rao","Dr. Sanjana Murthy","Mr. Anand Pillai"].map((cand) => (
                  <button key={cand} className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 text-left text-sm hover:border-brand-light hover:bg-brand-light/30">
                    <span className="font-semibold text-ink">{cand}</span>
                    <ChevronRight className="h-4 w-4 text-brand" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SubHeader title="Recently Allocated" />
        <div className="space-y-2">
          {[
            { c: "Mr. Vikram Sundar → Ms. Anjali Rao", d: "Chemistry · Class 11 — A · 9:30 AM" },
            { c: "Mr. Vikram Sundar → Dr. Sanjana Murthy", d: "Chemistry · Class 10 — A · 11:30 AM" },
          ].map((r) => (
            <div key={r.c} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <Check className="h-5 w-5 text-[#10B981]" />
              <div className="flex-1"><div className="font-semibold text-ink">{r.c}</div><div className="text-xs text-muted-foreground">{r.d}</div></div>
              <Chip color="#10B981" size="sm">Confirmed</Chip>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Faculty Performance ───────────── */
export function FacultyPerformancePage() {
  return (
    <PageWrap>
      <PageHeader title="Faculty Performance" subtitle="Quarterly evaluation across the department"
        right={<GhostBtn icon={Download}>Export Report</GhostBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={Star} value="4.7" label="Avg Rating" color="brand" />
        <OverviewCard icon={Award} value="3" label="Top Performers" color="success" />
        <OverviewCard icon={TrendingUp} value="+8%" label="Improvement" color="info" trend={{dir:"up",text:"+8%",positive:true}} />
        <OverviewCard icon={Users} value="92%" label="Class Coverage" color="warning" progress={92} />
      </div>
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Faculty</th><th className="px-4 py-3 text-left">Subject</th><th className="px-4 py-3 text-center">Rating</th><th className="px-4 py-3 text-left">Score Trend</th><th className="px-4 py-3 text-center">Result</th></tr>
            </thead>
            <tbody>
              {FACULTY.map((f) => (
                <tr key={f.name} className="border-t border-border">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Avatar name={f.name} size={32}/><span className="font-semibold text-ink">{f.name}</span></div></td>
                  <td className="px-4 py-3 text-muted-foreground">{f.subj}</td>
                  <td className="px-4 py-3 text-center font-bold text-brand">★ {f.rating}</td>
                  <td className="px-4 py-3 w-[200px]"><ProgressBar value={f.rating*20} color={f.rating>=4.7?"#10B981":"#191BDF"} /></td>
                  <td className="px-4 py-3 text-center"><Chip color={f.rating>=4.7?"#10B981":"#191BDF"} size="sm">{f.rating>=4.7?"Excellent":"Good"}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Leave Management ───────────── */
export function LeaveManagementPage() {
  const requests = [
    { name: "Ms. Deepa Krishnan", subj: "Mathematics", dates: "Mar 25 – Mar 27", days: 3, reason: "Family function", type: "Casual" },
    { name: "Mr. Anand Pillai", subj: "English", dates: "Apr 02", days: 1, reason: "Medical appointment", type: "Sick" },
    { name: "Dr. Sanjana Murthy", subj: "Chemistry", dates: "Apr 05 – Apr 06", days: 2, reason: "Conference", type: "Earned" },
  ];
  return (
    <PageWrap>
      <PageHeader title="Leave Management" subtitle={`${requests.length} pending requests need your approval`} />
      <Card>
        <SubHeader title="Pending Requests" />
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.name+r.dates} className="rounded-2xl border border-border bg-bg p-4">
              <div className="flex flex-wrap items-start gap-3">
                <Avatar name={r.name} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><span className="font-bold text-ink">{r.name}</span><Chip color="#191BDF" size="sm">{r.type}</Chip></div>
                  <div className="text-xs text-muted-foreground">{r.subj} · {r.dates} · {r.days} day(s)</div>
                  <div className="mt-2 rounded-lg bg-surface p-2 text-sm text-ink">"{r.reason}"</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl bg-[#EF4444] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#DC2626]"><X className="mr-1 inline h-3 w-3"/>Reject</button>
                  <button className="rounded-xl bg-[#10B981] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#059669]"><Check className="mr-1 inline h-3 w-3"/>Approve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Timetable Management ───────────── */
const HOF_FACULTY_GRIDS: Record<string, import("../shared/TimetableGrid").Slot[][]> = {
  "Dr. Priya Venkatesan": [
    [{subject:"Physics",room:"11-A",tone:"info"},null,{subject:"Physics",room:"12-A",tone:"info"},{subject:"Physics Lab",room:"Lab-P",tone:"warning"},null,null,{subject:"Physics",room:"11-B",tone:"info"},null],
    [null,{subject:"Physics",room:"11-A",tone:"info"},null,{subject:"Physics",room:"12-B",tone:"info"},null,{subject:"Physics Lab",room:"Lab-P",tone:"warning"},null,null],
    [{subject:"Physics",room:"12-A",tone:"info"},null,null,{subject:"Physics",room:"11-A",tone:"info"},null,null,{subject:"Physics",room:"11-B",tone:"info"},null],
    [null,{subject:"Physics",room:"11-B",tone:"info"},{subject:"Physics",room:"12-A",tone:"info"},null,null,{subject:"Physics Lab",room:"Lab-P",tone:"warning"},null,null],
    [{subject:"Physics",room:"11-A",tone:"info"},null,{subject:"Physics",room:"12-B",tone:"info"},null,null,null,{subject:"Physics",room:"11-B",tone:"info"},null],
    [null,{subject:"Physics",room:"11-A",tone:"info"},null,null,null,null,null,null],
  ],
  "Ms. Deepa Krishnan": [
    [{subject:"Math",room:"11-A",tone:"brand"},{subject:"Math",room:"10-A",tone:"brand"},null,{subject:"Math",room:"12-A",tone:"brand"},null,{subject:"Math",room:"11-B",tone:"brand"},null,null],
    [{subject:"Math",room:"11-A",tone:"brand"},null,{subject:"Math",room:"10-B",tone:"brand"},null,null,{subject:"Math",room:"12-B",tone:"brand"},{subject:"Math",room:"11-B",tone:"brand"},null],
    [null,{subject:"Math",room:"11-A",tone:"brand"},{subject:"Math",room:"10-A",tone:"brand"},null,null,{subject:"Math",room:"12-A",tone:"brand"},null,null],
    [{subject:"Math",room:"11-A",tone:"brand"},null,null,{subject:"Math",room:"10-B",tone:"brand"},null,null,{subject:"Math",room:"11-B",tone:"brand"},null],
    [null,{subject:"Math",room:"11-A",tone:"brand"},{subject:"Math",room:"12-A",tone:"brand"},null,null,{subject:"Math",room:"10-A",tone:"brand"},null,null],
    [{subject:"Math",room:"11-A",tone:"brand"},null,null,null,null,null,null,null],
  ],
  "Mr. Vikram Sundar": [
    [null,{subject:"Chemistry",room:"11-A",tone:"warning"},null,{subject:"Chem Lab",room:"Lab-1",tone:"warning"},null,{subject:"Chemistry",room:"12-A",tone:"warning"},null,null],
    [{subject:"Chemistry",room:"12-A",tone:"warning"},null,{subject:"Chem Lab",room:"Lab-1",tone:"warning"},null,null,null,{subject:"Chemistry",room:"11-B",tone:"warning"},null],
    [null,{subject:"Chemistry",room:"11-A",tone:"warning"},{subject:"Chemistry",room:"12-B",tone:"warning"},null,null,{subject:"Chem Lab",room:"Lab-1",tone:"warning"},null,null],
    [{subject:"Chemistry",room:"11-A",tone:"warning"},null,null,{subject:"Chemistry",room:"12-A",tone:"warning"},null,null,null,null],
    [null,{subject:"Chemistry",room:"12-A",tone:"warning"},null,{subject:"Chemistry",room:"11-B",tone:"warning"},null,{subject:"Chem Lab",room:"Lab-1",tone:"warning"},null,null],
    [null,null,{subject:"Chemistry",room:"11-A",tone:"warning"},null,null,null,null,null],
  ],
};

export function TimetableManagementPage() {
  const facultyNames = Object.keys(HOF_FACULTY_GRIDS);
  const [active, setActive] = useState(facultyNames[0]);
  return (
    <PageWrap>
      <PageHeader
        title="Timetable Management"
        subtitle="Department-wide schedule, conflicts & utilization"
        right={
          <div className="flex flex-wrap gap-2">
            <GhostBtn icon={Download}>Export</GhostBtn>
            <BrandBtn icon={Plus}>New Period</BrandBtn>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={CalendarDays} value="284" label="Total Periods/wk" color="brand" />
        <OverviewCard icon={Users} value="14" label="Active Faculty" color="info" />
        <OverviewCard icon={AlertTriangle} value="3" label="Conflicts" color="danger" pulse />
        <OverviewCard icon={TrendingUp} value="87%" label="Utilization" color="success" progress={87} />
      </div>

      <Card>
        <SubHeader title="Conflicts & Gaps" subtitle="Resolve before publishing the schedule" />
        <div className="space-y-2">
          {[
            { msg: "Ms. Lakshmi Narayan has overlap on Wed P3 (Room R-105)", sev: "danger" },
            { msg: "Class 11-B has 2 free periods on Friday afternoon", sev: "warning" },
            { msg: "Chemistry Lab unbooked Thursday P6–P7", sev: "warning" },
          ].map((c, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl border border-border bg-bg p-3 sm:flex-row sm:items-center">
              <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: c.sev === "danger" ? "#EF4444" : "#F59E0B" }} />
              <div className="flex-1 text-sm text-ink">{c.msg}</div>
              <GhostBtn>Resolve</GhostBtn>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SubHeader title="Faculty Schedule" subtitle="Switch faculty to view their weekly plan" />
        <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {facultyNames.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setActive(n)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all ${
                active === n
                  ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]"
                  : "border border-border bg-bg text-ink hover:border-brand-light hover:text-brand"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <TimetableGrid
          grid={HOF_FACULTY_GRIDS[active]}
          legend={
            <TimetableLegend
              items={[
                { label: "Mathematics", tone: "brand" },
                { label: "Physics", tone: "info" },
                { label: "Chemistry / Lab", tone: "warning" },
              ]}
            />
          }
        />
      </Card>
    </PageWrap>
  );
}

/* ───────────── Curriculum Tracker ───────────── */

export function CurriculumTrackerPage() {
  const data = [
    { subj: "Mathematics", grade: "Class 11", covered: 14, total: 16, status: "ontrack" },
    { subj: "Physics", grade: "Class 11", covered: 11, total: 15, status: "behind" },
    { subj: "Chemistry", grade: "Class 11", covered: 13, total: 14, status: "ahead" },
    { subj: "Biology", grade: "Class 11", covered: 12, total: 15, status: "ontrack" },
    { subj: "English", grade: "Class 11", covered: 9, total: 13, status: "behind" },
    { subj: "Mathematics", grade: "Class 12", covered: 10, total: 14, status: "ontrack" },
  ];
  return (
    <PageWrap>
      <PageHeader title="Curriculum Tracker" subtitle="Topics covered vs planned per subject" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => {
          const pct = Math.round((d.covered/d.total)*100);
          return (
            <Card key={d.subj+d.grade}>
              <div className="flex items-start justify-between">
                <div><div className="font-bold text-ink">{d.subj}</div><div className="text-xs text-muted-foreground">{d.grade}</div></div>
                <StatusBadge status={d.status} />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-brand">{d.covered}</span>
                <span className="text-sm text-muted-foreground">/ {d.total} units</span>
              </div>
              <ProgressBar value={pct} color={d.status==="behind"?"#F59E0B":d.status==="ahead"?"#10B981":"#191BDF"} />
              <div className="mt-2 text-xs text-muted-foreground">{pct}% complete</div>
            </Card>
          );
        })}
      </div>
    </PageWrap>
  );
}

/* ───────────── Exam Schedule ───────────── */
type ExamRow = { date: string; subj: string; grade: string; time: string; room: string; duration: string };
const SEED_EXAMS: ExamRow[] = [
  { date: "Apr 02", subj: "Mathematics", grade: "Class 11", time: "09:00", room: "Hall A", duration: "3h" },
  { date: "Apr 03", subj: "Physics",     grade: "Class 11", time: "09:00", room: "Hall A", duration: "3h" },
  { date: "Apr 04", subj: "Chemistry",   grade: "Class 11", time: "09:00", room: "Hall B", duration: "3h" },
  { date: "Apr 05", subj: "Biology",     grade: "Class 11", time: "09:00", room: "Hall B", duration: "3h" },
  { date: "Apr 06", subj: "English",     grade: "Class 11", time: "09:00", room: "Hall A", duration: "2.5h" },
  { date: "Apr 08", subj: "Computer Sci.", grade: "Class 11", time: "09:00", room: "Lab-3", duration: "3h" },
];

export function ExamSchedulePage() {
  const [exams, setExams] = useState<ExamRow[]>(SEED_EXAMS);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ExamRow>({ date: "Apr 10", subj: "", grade: "Class 11", time: "09:00", room: "Hall A", duration: "3h" });

  const create = () => {
    if (!draft.subj.trim()) return;
    setExams((rows) => [...rows, draft].sort((a, b) => a.date.localeCompare(b.date)));
    setDraft({ ...draft, subj: "" });
    setOpen(false);
  };

  // group by month for calendar-style view
  const byMonth = exams.reduce<Record<string, ExamRow[]>>((acc, e) => {
    const m = e.date.split(" ")[0];
    (acc[m] ||= []).push(e);
    return acc;
  }, {});

  return (
    <PageWrap>
      <PageHeader
        title="Exam Schedule"
        subtitle={`${exams.length} examinations scheduled · Mid-term 2026`}
        right={
          <div className="flex flex-wrap gap-2">
            <GhostBtn icon={Download}>Export PDF</GhostBtn>
            <BrandBtn icon={Plus} onClick={() => setOpen((v) => !v)}>
              {open ? "Close Form" : "Schedule Exam"}
            </BrandBtn>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={ClipboardList} value={String(exams.length)} label="Total Exams" color="brand" />
        <OverviewCard icon={CalendarDays} value={String(Object.keys(byMonth).length)} label="Active Months" color="info" />
        <OverviewCard icon={BookOpen} value={String(new Set(exams.map((e) => e.subj)).size)} label="Subjects" color="success" />
        <OverviewCard icon={AlertTriangle} value="0" label="Clashes" color="warning" />
      </div>

      {open && (
        <Card>
          <SubHeader title="Schedule New Exam" subtitle="Fill in details below" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Subject">
              <input
                value={draft.subj}
                onChange={(e) => setDraft({ ...draft, subj: e.target.value })}
                placeholder="e.g. Mathematics"
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
              />
            </Field>
            <Field label="Grade">
              <select
                value={draft.grade}
                onChange={(e) => setDraft({ ...draft, grade: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
              >
                {["Class 9", "Class 10", "Class 11", "Class 12"].map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Date">
              <input
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                placeholder="e.g. Apr 10"
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
              />
            </Field>
            <Field label="Start Time">
              <input
                type="time"
                value={draft.time}
                onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
              />
            </Field>
            <Field label="Duration">
              <select
                value={draft.duration}
                onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
              >
                {["1h", "1.5h", "2h", "2.5h", "3h"].map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Examination Hall">
              <select
                value={draft.room}
                onChange={(e) => setDraft({ ...draft, room: e.target.value })}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-light"
              >
                {["Hall A", "Hall B", "Hall C", "Lab-1", "Lab-3"].map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <GhostBtn onClick={() => setOpen(false)}>Cancel</GhostBtn>
            <BrandBtn icon={Check} onClick={create}>Add to Schedule</BrandBtn>
          </div>
        </Card>
      )}

      {/* Calendar-style monthly groups */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Object.entries(byMonth).map(([month, rows]) => (
          <Card key={month}>
            <SubHeader title={`${month} 2026`} subtitle={`${rows.length} exam${rows.length > 1 ? "s" : ""}`} />
            <ul className="space-y-2">
              {rows.map((e, i) => (
                <li
                  key={e.date + e.subj + i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3 transition-all hover:-translate-y-px hover:border-brand-light"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand text-white shadow-[var(--shadow-brand-glow)]">
                    <span className="text-[10px] font-bold tracking-widest opacity-80">{e.date.split(" ")[0].toUpperCase()}</span>
                    <span className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-none">
                      {e.date.split(" ")[1]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-ink">{e.subj}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time} · {e.duration}</span>
                      <span>· {e.grade}</span>
                      <span>· {e.room}</span>
                    </div>
                  </div>
                  <Chip color="#191BDF" size="sm" className="hidden sm:inline-flex">Scheduled</Chip>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </PageWrap>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}


/* ───────────── Department Reports ───────────── */
export function DepartmentReportsPage() {
  return (
    <PageWrap>
      <PageHeader title="Department Reports" subtitle="Sciences department · Quarter 1" right={<BrandBtn icon={Plus}>Generate</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={Users} value="8" label="Faculty" color="brand" />
        <OverviewCard icon={BookOpen} value="42" label="Topics Covered" color="success" />
        <OverviewCard icon={BarChart3} value="84%" label="Avg Score" color="info" progress={84} />
        <OverviewCard icon={Award} value="96%" label="Pass Rate" color="warning" progress={96} />
      </div>
      <Card>
        <SubHeader title="Recent Reports" />
        <div className="space-y-2">
          {["Q1 Faculty Performance","Class 11 Overall Analysis","Curriculum Completion Report","Attendance Trends Q1"].map((r) => (
            <div key={r} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <BarChart3 className="h-5 w-5 text-brand" />
              <div className="flex-1 font-semibold text-ink">{r}</div>
              <Chip color="#191BDF" size="sm">PDF</Chip>
              <GhostBtn icon={Download}>Download</GhostBtn>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Announcements (HOF) ───────────── */
export function HofAnnouncementsPage() {
  return (
    <PageWrap>
      <PageHeader title="Announcements" subtitle="Department-wide communications" right={<BrandBtn icon={Plus}>New</BrandBtn>} />
      <Card>
        <SubHeader title="Compose" />
        <input className={inputCls} placeholder="Headline" />
        <textarea rows={4} className={`${inputCls} mt-3`} placeholder="Message..." />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <select className={inputCls}><option>All faculty in department</option><option>Physics teachers</option></select>
          <select className={inputCls}><option>Normal</option><option>High priority</option></select>
        </div>
        <div className="mt-3 flex justify-end"><BrandBtn icon={Send}>Publish</BrandBtn></div>
      </Card>
      <Card>
        <SubHeader title="Recent" />
        <div className="space-y-2">
          {["Department meeting Friday 4 PM","Curriculum review timeline","New lab equipment arrived"].map((a) => (
            <div key={a} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <Megaphone className="h-5 w-5 text-brand"/><div className="flex-1 font-semibold text-ink">{a}</div><Chip color="#10B981" size="sm">Sent</Chip>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Meeting Scheduler ───────────── */
export function MeetingSchedulerPage() {
  return (
    <PageWrap>
      <PageHeader title="Meeting Scheduler" subtitle="Coordinate department meetings" right={<BrandBtn icon={Plus}>Schedule Meeting</BrandBtn>} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <SubHeader title="Upcoming Meetings" />
          <div className="space-y-2">
            {[
              { t: "Q1 Review", d: "Mar 28 · 4:00 PM", attend: 8, total: 8 },
              { t: "Curriculum Planning", d: "Apr 02 · 3:30 PM", attend: 6, total: 8 },
              { t: "Lab Safety Review", d: "Apr 05 · 11:00 AM", attend: 4, total: 8 },
            ].map((m) => (
              <div key={m.t} className="rounded-xl border border-border bg-bg p-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-ink">{m.t}</div>
                  <Chip color="#191BDF" size="sm">{m.attend}/{m.total} RSVP</Chip>
                </div>
                <div className="mt-1 text-xs text-muted-foreground"><Clock className="mr-1 inline h-3 w-3"/>{m.d}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SubHeader title="Quick Schedule" />
          <div className="space-y-3">
            <input className={inputCls} placeholder="Meeting title" />
            <textarea rows={3} className={inputCls} placeholder="Agenda..." />
            <div className="grid grid-cols-2 gap-3"><input type="date" className={inputCls}/><input type="time" className={inputCls}/></div>
            <BrandBtn icon={Send} className="w-full">Send Invitations</BrandBtn>
          </div>
        </Card>
      </div>
    </PageWrap>
  );
}

/* ───────────── Student Escalations ───────────── */
export function StudentEscalationsPage() {
  return (
    <PageWrap>
      <PageHeader title="Student Escalations" subtitle="Issues escalated by faculty for HOF review" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={AlertTriangle} value="6" label="Active" color="danger" pulse />
        <OverviewCard icon={Clock} value="2" label="In Review" color="warning" />
        <OverviewCard icon={Check} value="18" label="Resolved this month" color="success" />
        <OverviewCard icon={TrendingUp} value="-12%" label="Trend" color="info" trend={{dir:"down",text:"-12%",positive:true}} />
      </div>
      <Card>
        <SubHeader title="Active Escalations" />
        <div className="space-y-2">
          {[
            { s: "Rohan Iyer (10-B)", by: "Ms. Deepa Krishnan", issue: "Repeated late submissions", sev: "Medium" },
            { s: "Ananya Singh (11-A)", by: "Mr. Anand Pillai", issue: "Disruption in class", sev: "High" },
            { s: "Vikrant Reddy (9-C)", by: "Mr. Karthik Menon", issue: "Plagiarism in assignment", sev: "High" },
          ].map((e) => (
            <div key={e.s} className="rounded-xl border border-border bg-bg p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-ink">{e.s}</div>
                  <div className="text-xs text-muted-foreground">Reported by {e.by}</div>
                  <div className="mt-1 text-sm text-ink">"{e.issue}"</div>
                </div>
                <Chip color={e.sev==="High"?"#EF4444":"#F59E0B"} size="sm">{e.sev}</Chip>
              </div>
              <div className="mt-3 flex gap-2"><GhostBtn>View Details</GhostBtn><BrandBtn>Take Action</BrandBtn></div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
