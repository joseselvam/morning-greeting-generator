import { useState } from "react";
import {
  ClipboardCheck, UserCheck, BookMarked, FileStack, CalendarDays, Trophy,
  BarChart3, BookOpen, Megaphone, CalendarClock, MessageSquare, FileCheck,
  CalendarRange, Search, Filter, Plus, Upload, Download, Send, Check, X,
  Clock, Users, GraduationCap, FileText, ChevronRight, Star, Edit3,
} from "lucide-react";
import { PageWrap, PageHeader, SubHeader, Card, Chip, Avatar, GhostBtn, BrandBtn } from "./../student/_shared";
import { StatusBadge, OverviewCard, ProgressBar } from "../primitives";

/* ───────────── Mark Entry ───────────── */
const SAMPLE_STUDENTS = [
  "Aarav Sharma","Diya Patel","Rohan Iyer","Sneha Kumar","Vikrant Reddy",
  "Ananya Singh","Karthik Nair","Meera Joshi","Aditya Rao","Pooja Verma",
  "Rahul Menon","Ishita Das","Nikhil Bose","Tara Khanna","Yash Gupta",
];
export function MarkEntryPage() {
  const [marks, setMarks] = useState<Record<string, string>>({});
  return (
    <PageWrap>
      <PageHeader
        title="Mark Entry"
        subtitle="Class 11 — A · Mathematics · Unit Test 3"
        right={
          <div className="flex gap-2">
            <GhostBtn icon={Upload}>Import CSV</GhostBtn>
            <BrandBtn icon={Check} onClick={() => alert("Marks submitted")}>Submit Marks</BrandBtn>
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Class & Section</div>
          <select className="mt-2 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm font-semibold">
            <option>Class 11 — A</option><option>Class 11 — B</option><option>Class 12 — A</option>
          </select>
        </Card>
        <Card>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Exam Type</div>
          <select className="mt-2 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm font-semibold">
            <option>Unit Test 3</option><option>Mid-Term</option><option>Final</option>
          </select>
        </Card>
        <Card>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Marks</div>
          <input defaultValue={50} className="mt-2 w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm font-semibold" />
        </Card>
      </div>
      <Card>
        <SubHeader title="Students" subtitle={`${SAMPLE_STUDENTS.length} students · auto-saved as draft`} />
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-3 py-2 text-left">Roll</th><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-center">Marks / 50</th><th className="px-3 py-2 text-center">Grade</th></tr>
            </thead>
            <tbody>
              {SAMPLE_STUDENTS.map((s, i) => {
                const v = marks[s] ?? "";
                const n = parseInt(v) || 0;
                const grade = n >= 45 ? "A+" : n >= 40 ? "A" : n >= 35 ? "B" : n >= 25 ? "C" : v ? "F" : "—";
                return (
                  <tr key={s} className="border-t border-border">
                    <td className="px-3 py-2 text-muted-foreground">{(i+1).toString().padStart(2,"0")}</td>
                    <td className="px-3 py-2 font-semibold text-ink">{s}</td>
                    <td className="px-3 py-2 text-center">
                      <input
                        value={v} onChange={(e) => setMarks({ ...marks, [s]: e.target.value })}
                        className="w-20 rounded-lg border border-border bg-bg px-2 py-1 text-center font-bold focus:border-brand focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-2 text-center"><Chip color="#191BDF" size="sm">{grade}</Chip></td>
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

/* ───────────── Attendance Management ───────────── */
export function FacultyAttendancePage() {
  const [status, setStatus] = useState<Record<string, "P" | "A" | "L">>({});
  return (
    <PageWrap>
      <PageHeader
        title="Attendance Management"
        subtitle="Class 11 — A · Period 3 · Today"
        right={<BrandBtn icon={Check}>Submit Attendance</BrandBtn>}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={Users} value="40" label="Total" color="brand" />
        <OverviewCard icon={Check} value={String(Object.values(status).filter(v=>v==="P").length)} label="Present" color="success" />
        <OverviewCard icon={X} value={String(Object.values(status).filter(v=>v==="A").length)} label="Absent" color="danger" />
        <OverviewCard icon={Clock} value={String(Object.values(status).filter(v=>v==="L").length)} label="Late" color="warning" />
      </div>
      <Card>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_STUDENTS.map((s) => {
            const st = status[s];
            return (
              <div key={s} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
                <Avatar name={s} size={36} />
                <div className="flex-1 font-semibold text-ink">{s}</div>
                <div className="flex gap-1">
                  {(["P","A","L"] as const).map((k) => {
                    const active = st === k;
                    const colors = { P: "#10B981", A: "#EF4444", L: "#F59E0B" };
                    return (
                      <button key={k} onClick={() => setStatus({ ...status, [s]: k })}
                        className="h-8 w-8 rounded-lg text-xs font-bold transition-all"
                        style={{ background: active ? colors[k] : "transparent", color: active ? "white" : colors[k], border: `1.5px solid ${colors[k]}` }}>
                        {k}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Homework Allocation ───────────── */
export function FacultyHomeworkPage() {
  return (
    <PageWrap>
      <PageHeader title="Homework Allocation" subtitle="Create and assign homework to your classes"
        right={<BrandBtn icon={Plus}>New Homework</BrandBtn>} />
      <Card>
        <SubHeader title="Create Homework" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title"><input className={inputCls} placeholder="e.g. Trigonometry Ex. 5.1 – 5.4" /></Field>
          <Field label="Class & Section">
            <select className={inputCls}><option>Class 11 — A</option><option>Class 10 — B</option></select>
          </Field>
          <Field label="Subject"><input defaultValue="Mathematics" className={inputCls} /></Field>
          <Field label="Due Date"><input type="date" className={inputCls} /></Field>
          <div className="sm:col-span-2">
            <Field label="Instructions"><textarea rows={4} className={inputCls} placeholder="Add detailed instructions..." /></Field>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <GhostBtn>Save Draft</GhostBtn>
          <BrandBtn icon={Send}>Publish to Students</BrandBtn>
        </div>
      </Card>
      <Card>
        <SubHeader title="Recent Homework Assigned" />
        <div className="space-y-2">
          {[
            { t: "Calculus Practice Set 4", c: "Class 12 — A", d: "Apr 02", views: 38 },
            { t: "Trigonometry Worksheet 3", c: "Class 11 — A", d: "Mar 28", views: 40 },
            { t: "Algebra Revision", c: "Class 10 — B", d: "Mar 25", views: 36 },
          ].map((h) => (
            <div key={h.t} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <BookMarked className="h-5 w-5 text-brand" />
              <div className="flex-1">
                <div className="font-semibold text-ink">{h.t}</div>
                <div className="text-xs text-muted-foreground">{h.c} · Due {h.d}</div>
              </div>
              <Chip color="#10B981" size="sm">{h.views} viewed</Chip>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Assignment Manager ───────────── */
export function FacultyAssignmentsPage() {
  const tabs = ["All","To Grade","Graded","Drafts"] as const;
  const [tab, setTab] = useState<typeof tabs[number]>("To Grade");
  const data = [
    { title: "Quadratic Equations Worksheet", section: "Class 10 — A", submitted: 34, total: 40, due: "Mar 25", status: "pending" },
    { title: "Trigonometry Problem Set 3", section: "Class 11 — A", submitted: 28, total: 32, due: "Mar 23", status: "pending" },
    { title: "Calculus Take-Home Test", section: "Class 12 — A", submitted: 38, total: 38, due: "Mar 20", status: "submitted" },
    { title: "Algebra Practice Mid-Term", section: "Class 10 — B", submitted: 30, total: 36, due: "Mar 18", status: "submitted" },
  ];
  return (
    <PageWrap>
      <PageHeader title="Assignment Manager" subtitle="Track submissions and grade student work"
        right={<BrandBtn icon={Plus}>Create Assignment</BrandBtn>} />
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${tab===t?"bg-brand text-white shadow-[var(--shadow-brand-glow)]":"bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.map((a) => {
          const pct = Math.round((a.submitted / a.total) * 100);
          return (
            <Card key={a.title}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-ink">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{a.section} · Due {a.due}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">Submissions</span><span className="font-bold text-ink">{a.submitted}/{a.total}</span></div>
                <ProgressBar value={pct} />
              </div>
              <div className="mt-4 flex gap-2">
                <GhostBtn icon={Edit3}>Edit</GhostBtn>
                <BrandBtn icon={ClipboardCheck}>Grade Submissions</BrandBtn>
              </div>
            </Card>
          );
        })}
      </div>
    </PageWrap>
  );
}

/* ───────────── Faculty Timetable ───────────── */
export function FacultyTimetablePage() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat"];
  const periods = ["08:30","09:30","10:30","11:30","13:00","14:00","15:00"];
  const cell = (d: number, p: number) => {
    const list = ["11-A","10-B","12-A","9-C","11-B","10-A"];
    return (d + p) % 3 === 0 ? null : list[(d + p) % list.length];
  };
  return (
    <PageWrap>
      <PageHeader title="My Timetable" subtitle="Week starting 24 March 2026" right={<GhostBtn icon={Download}>Export PDF</GhostBtn>} />
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-bg">
                <th className="p-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Time</th>
                {days.map((d) => <th key={d} className="p-3 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {periods.map((t, pi) => (
                <tr key={t} className="border-t border-border">
                  <td className="p-2 text-xs font-bold text-muted-foreground">{t}</td>
                  {days.map((_, di) => {
                    const c = cell(di, pi);
                    return (
                      <td key={di} className="p-2">
                        {c ? (
                          <div className="rounded-lg bg-brand-light/60 px-2 py-2 text-center">
                            <div className="text-xs font-bold text-brand">{c}</div>
                            <div className="text-[10px] text-muted-foreground">Math</div>
                          </div>
                        ) : <div className="rounded-lg bg-bg/40 px-2 py-2 text-center text-[10px] text-muted-foreground">Free</div>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Rank Computation ───────────── */
export function RankComputationPage() {
  const ranks = SAMPLE_STUDENTS.slice(0, 10).map((n, i) => ({ name: n, total: 480 - i * 12, percent: ((480 - i*12)/500*100).toFixed(1), rank: i+1 }));
  return (
    <PageWrap>
      <PageHeader title="Rank Computation" subtitle="Class 11 — A · Term 1 Cumulative"
        right={<div className="flex gap-2"><GhostBtn icon={Download}>Export</GhostBtn><BrandBtn icon={Check}>Publish Ranks</BrandBtn></div>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card><div className="text-xs text-muted-foreground">Class Average</div><div className="mt-1 text-3xl font-extrabold text-brand">82.4%</div></Card>
        <Card><div className="text-xs text-muted-foreground">Highest Score</div><div className="mt-1 text-3xl font-extrabold text-[#10B981]">96.0%</div></Card>
        <Card><div className="text-xs text-muted-foreground">Pass %</div><div className="mt-1 text-3xl font-extrabold text-ink">98.2%</div></Card>
      </div>
      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left">Rank</th><th className="px-4 py-3 text-left">Student</th><th className="px-4 py-3 text-right">Total /500</th><th className="px-4 py-3 text-right">Percent</th><th className="px-4 py-3 text-center">Trend</th></tr>
            </thead>
            <tbody>
              {ranks.map((r) => (
                <tr key={r.name} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${r.rank<=3?"bg-brand text-white":"bg-bg text-ink"}`}>{r.rank}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink">{r.name}</td>
                  <td className="px-4 py-3 text-right font-bold">{r.total}</td>
                  <td className="px-4 py-3 text-right text-brand font-bold">{r.percent}%</td>
                  <td className="px-4 py-3 text-center"><Chip color={r.rank<=5?"#10B981":"#F59E0B"} size="sm">{r.rank<=5?"↑ up":"→ steady"}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Class Reports ───────────── */
export function FacultyReportsPage() {
  const reports = [
    { name: "Class 11-A Term 1 Performance", date: "Mar 28, 2026", type: "PDF", size: "2.4 MB" },
    { name: "Class 10-B Attendance Summary", date: "Mar 22, 2026", type: "XLSX", size: "1.1 MB" },
    { name: "Mathematics Topic-wise Analysis", date: "Mar 18, 2026", type: "PDF", size: "3.8 MB" },
    { name: "Class 12-A Mock Exam Results", date: "Mar 15, 2026", type: "PDF", size: "2.0 MB" },
  ];
  return (
    <PageWrap>
      <PageHeader title="Class Reports" subtitle="Generate and download class performance reports"
        right={<BrandBtn icon={Plus}>Generate Report</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={GraduationCap} value="4" label="Sections" color="brand" />
        <OverviewCard icon={Users} value="186" label="Students" color="info" />
        <OverviewCard icon={BarChart3} value="83%" label="Avg Score" color="success" progress={83} />
        <OverviewCard icon={UserCheck} value="94%" label="Avg Attendance" color="warning" progress={94} />
      </div>
      <Card>
        <SubHeader title="Generated Reports" />
        <div className="space-y-2">
          {reports.map((r) => (
            <div key={r.name} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand"><FileText className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-semibold text-ink">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date} · {r.type} · {r.size}</div>
              </div>
              <GhostBtn icon={Download}>Download</GhostBtn>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Study Material Upload ───────────── */
export function FacultyStudyMaterialsPage() {
  return (
    <PageWrap>
      <PageHeader title="Study Material Upload" subtitle="Share resources with your classes"
        right={<BrandBtn icon={Upload}>Upload Material</BrandBtn>} />
      <Card>
        <div className="rounded-2xl border-2 border-dashed border-brand-light bg-brand-light/20 p-8 text-center">
          <Upload className="mx-auto h-10 w-10 text-brand" />
          <div className="mt-3 font-bold text-ink">Drag & drop files here</div>
          <div className="text-xs text-muted-foreground">PDF, DOCX, PPTX, MP4 up to 50 MB</div>
          <BrandBtn className="mt-4">Browse Files</BrandBtn>
        </div>
      </Card>
      <Card>
        <SubHeader title="Recent Uploads" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Trigonometry Notes", s: "PDF · 1.8 MB", d: "Today" },
            { t: "Calculus Video Lecture", s: "MP4 · 42 MB", d: "Yesterday" },
            { t: "Algebra Practice Sheet", s: "PDF · 600 KB", d: "2d ago" },
            { t: "Probability Slides", s: "PPTX · 3.2 MB", d: "3d ago" },
            { t: "Mock Test 2", s: "PDF · 2.1 MB", d: "Last week" },
            { t: "Formula Cheat Sheet", s: "PDF · 480 KB", d: "Last week" },
          ].map((m) => (
            <div key={m.t} className="rounded-xl border border-border bg-bg p-3">
              <FileText className="h-7 w-7 text-brand" />
              <div className="mt-2 font-semibold text-ink">{m.t}</div>
              <div className="text-xs text-muted-foreground">{m.s} · {m.d}</div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Announcements (Faculty) ───────────── */
export function FacultyAnnouncementsPage() {
  return (
    <PageWrap>
      <PageHeader title="Announcements" subtitle="Send updates to your classes" right={<BrandBtn icon={Plus}>New Announcement</BrandBtn>} />
      <Card>
        <SubHeader title="Compose" />
        <div className="space-y-3">
          <input className={inputCls} placeholder="Headline" />
          <textarea rows={4} className={inputCls} placeholder="Write your message..." />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select className={inputCls}><option>All my classes</option><option>Class 11 — A</option></select>
            <select className={inputCls}><option>Normal priority</option><option>High priority</option></select>
          </div>
          <div className="flex justify-end gap-2"><GhostBtn>Save Draft</GhostBtn><BrandBtn icon={Send}>Publish</BrandBtn></div>
        </div>
      </Card>
      <Card>
        <SubHeader title="Sent Announcements" />
        <div className="space-y-2">
          {[
            { t: "Reschedule of Math test", d: "1h ago", to: "Class 11 — A" },
            { t: "Homework submission extended", d: "Yesterday", to: "Class 10 — B" },
            { t: "Extra revision class on Saturday", d: "3d ago", to: "Class 12 — A" },
          ].map((a) => (
            <div key={a.t} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <Megaphone className="h-5 w-5 text-brand" />
              <div className="flex-1"><div className="font-semibold text-ink">{a.t}</div><div className="text-xs text-muted-foreground">To {a.to} · {a.d}</div></div>
              <Chip color="#10B981" size="sm">Delivered</Chip>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Parent Meeting (Faculty) ───────────── */
export function FacultyParentMeetingPage() {
  return (
    <PageWrap>
      <PageHeader title="Parent Meeting" subtitle="Schedule and manage parent interactions" right={<BrandBtn icon={Plus}>Schedule Meeting</BrandBtn>} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card><div className="flex items-center gap-3"><CalendarClock className="h-8 w-8 text-brand" /><div><div className="text-xs text-muted-foreground">Upcoming</div><div className="text-2xl font-extrabold text-ink">4</div></div></div></Card>
        <Card><div className="flex items-center gap-3"><Check className="h-8 w-8 text-[#10B981]" /><div><div className="text-xs text-muted-foreground">Completed</div><div className="text-2xl font-extrabold text-ink">12</div></div></div></Card>
        <Card><div className="flex items-center gap-3"><Clock className="h-8 w-8 text-[#F59E0B]" /><div><div className="text-xs text-muted-foreground">Pending requests</div><div className="text-2xl font-extrabold text-ink">3</div></div></div></Card>
      </div>
      <Card>
        <SubHeader title="Scheduled Meetings" />
        <div className="space-y-2">
          {[
            { p: "Mr. & Mrs. Sharma", s: "Aarav (11-A)", date: "Mar 28, 10:30 AM", note: "Discuss recent dip in mathematics" },
            { p: "Mrs. Patel", s: "Diya (11-A)", date: "Mar 29, 9:00 AM", note: "Career counseling" },
            { p: "Mr. Iyer", s: "Rohan (10-B)", date: "Mar 30, 11:00 AM", note: "Behavioral concern" },
          ].map((m) => (
            <div key={m.s} className="flex items-start gap-3 rounded-xl border border-border bg-bg p-3">
              <Avatar name={m.p} />
              <div className="flex-1">
                <div className="font-semibold text-ink">{m.p}</div>
                <div className="text-xs text-muted-foreground">{m.s} · {m.date}</div>
                <div className="mt-1 text-xs text-ink">"{m.note}"</div>
              </div>
              <GhostBtn>Reschedule</GhostBtn>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Remarks & Conduct (Faculty) ───────────── */
export function FacultyRemarksPage() {
  return (
    <PageWrap>
      <PageHeader title="Remarks & Conduct" subtitle="Add behavioral notes for students" right={<BrandBtn icon={Plus}>Add Remark</BrandBtn>} />
      <Card>
        <SubHeader title="Compose Remark" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Student"><select className={inputCls}>{SAMPLE_STUDENTS.slice(0,8).map(s=><option key={s}>{s}</option>)}</select></Field>
          <Field label="Category"><select className={inputCls}><option>Appreciation</option><option>Improvement Needed</option><option>Disciplinary</option></select></Field>
          <div className="sm:col-span-2"><Field label="Remark"><textarea rows={3} className={inputCls} placeholder="Detailed feedback..." /></Field></div>
        </div>
        <div className="mt-3 flex justify-end"><BrandBtn icon={Send}>Submit Remark</BrandBtn></div>
      </Card>
      <Card>
        <SubHeader title="Recent Remarks" />
        <div className="space-y-2">
          {[
            { s: "Aarav Sharma", c: "Appreciation", n: "Outstanding performance in surprise test.", d: "Today" },
            { s: "Rohan Iyer", c: "Improvement Needed", n: "Frequently late submissions.", d: "Yesterday" },
            { s: "Diya Patel", c: "Appreciation", n: "Excellent leadership in group project.", d: "3d ago" },
          ].map((r) => (
            <div key={r.s+r.d} className="rounded-xl border border-border bg-bg p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-ink">{r.s}</div>
                <Chip color={r.c==="Appreciation"?"#10B981":"#F59E0B"} size="sm">{r.c}</Chip>
              </div>
              <div className="mt-1 text-sm text-ink">{r.n}</div>
              <div className="mt-1 text-xs text-muted-foreground">{r.d}</div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Leave Requests (Faculty) ───────────── */
export function FacultyLeaveRequestsPage() {
  return (
    <PageWrap>
      <PageHeader title="Leave Requests" subtitle="Apply and track your leave applications" right={<BrandBtn icon={Plus}>Apply Leave</BrandBtn>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewCard icon={FileCheck} value="18" label="Total Leave Balance" color="brand" />
        <OverviewCard icon={Check} value="12" label="Approved" color="success" />
        <OverviewCard icon={Clock} value="2" label="Pending" color="warning" />
        <OverviewCard icon={X} value="1" label="Rejected" color="danger" />
      </div>
      <Card>
        <SubHeader title="Apply for Leave" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Leave Type"><select className={inputCls}><option>Casual</option><option>Sick</option><option>Earned</option></select></Field>
          <Field label="Number of Days"><input type="number" className={inputCls} defaultValue={1} /></Field>
          <Field label="From"><input type="date" className={inputCls} /></Field>
          <Field label="To"><input type="date" className={inputCls} /></Field>
          <div className="sm:col-span-2"><Field label="Reason"><textarea rows={3} className={inputCls} /></Field></div>
        </div>
        <div className="mt-3 flex justify-end"><BrandBtn icon={Send}>Submit Request</BrandBtn></div>
      </Card>
      <Card>
        <SubHeader title="Recent Requests" />
        <div className="space-y-2">
          {[
            { t: "Casual Leave", d: "Mar 28", days: 1, status: "pending" },
            { t: "Sick Leave", d: "Mar 14 – 15", days: 2, status: "active" },
            { t: "Earned Leave", d: "Feb 22 – 24", days: 3, status: "completed" },
          ].map((l) => (
            <div key={l.t+l.d} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
              <FileCheck className="h-5 w-5 text-brand" />
              <div className="flex-1"><div className="font-semibold text-ink">{l.t}</div><div className="text-xs text-muted-foreground">{l.d} · {l.days} day(s)</div></div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>
      </Card>
    </PageWrap>
  );
}

/* ───────────── Events (Faculty) ───────────── */
export function FacultyEventsPage() {
  const events = [
    { d: "28", m: "MAR", t: "Parent-Teacher Meeting", time: "9:00 AM", role: "Mandatory" },
    { d: "02", m: "APR", t: "Math Department Meeting", time: "3:30 PM", role: "Mandatory" },
    { d: "10", m: "APR", t: "Inter-School Olympiad", time: "9:00 AM", role: "Volunteer" },
    { d: "14", m: "APR", t: "Tamil New Year — Holiday", time: "—", role: "Holiday" },
    { d: "18", m: "APR", t: "Annual Day Practice", time: "4:00 PM", role: "Optional" },
  ];
  return (
    <PageWrap>
      <PageHeader title="Events" subtitle="Upcoming school events and your role" right={<GhostBtn icon={CalendarRange}>Calendar View</GhostBtn>} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <Card key={e.t}>
            <div className="flex gap-4">
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-brand text-white shadow-[var(--shadow-brand-glow)]">
                <div className="text-xl font-extrabold leading-none">{e.d}</div>
                <div className="text-[10px] font-bold tracking-widest">{e.m}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-ink">{e.t}</div>
                <div className="text-xs text-muted-foreground">{e.time}</div>
                <Chip color={e.role==="Mandatory"?"#EF4444":e.role==="Holiday"?"#10B981":"#191BDF"} size="sm" className="mt-2">{e.role}</Chip>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageWrap>
  );
}

/* ─── helpers ─── */
const inputCls = "w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
