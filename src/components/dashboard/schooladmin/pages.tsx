import {
  GraduationCap, UserPlus, BookUser, KeyRound, CreditCard, FileText, Clock, BarChart3,
  LogIn, Search, Filter, Copy, RefreshCw, Download, Eye, Pencil,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SectionHeader, Panel, BrandButton, StatusBadge, OverviewCard } from "../primitives";

/* ---------- Students ---------- */
const STUDENTS = [
  { id: "BA2024/0118", name: "Arjun Krishnamurthy", class: "Class 11 — A", fee: "Paid", attn: "94%" },
  { id: "BA2024/0119", name: "Meera Pillai", class: "Class 11 — A", fee: "Pending", attn: "89%" },
  { id: "BA2024/0212", name: "Karthik Rao", class: "Class 10 — B", fee: "Paid", attn: "92%" },
  { id: "BA2024/0276", name: "Anika Sharma", class: "Class 9 — C", fee: "Paid", attn: "88%" },
  { id: "BA2024/0341", name: "Rohit Menon", class: "Class 8 — A", fee: "Overdue", attn: "71%" },
];
export function StudentManagementPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Student Management" subtitle="1,248 active students" action={
        <BrandButton icon={UserPlus} onClick={() => toast("Adding student")}>Add Student</BrandButton>
      } />
      <SearchFilterRow />
      <Panel className="!p-0 overflow-hidden">
        <DataTable
          headers={["Register No.", "Name", "Class", "Fee Status", "Attendance", "Actions"]}
          rows={STUDENTS.map((s) => [
            s.id, s.name, s.class,
            <StatusBadge key="fs" status={s.fee.toLowerCase() === "paid" ? "completed" : s.fee.toLowerCase() === "overdue" ? "overdue" : "pending"} />,
            s.attn,
            <RowActions key="a" />,
          ])}
        />
      </Panel>
    </div>
  );
}

/* ---------- Admissions ---------- */
const APPS = [
  { name: "Karthik Rao", class: "Class 9", phone: "+91 98765 11122", date: "2h ago", status: "pending" },
  { name: "Meera Pillai", class: "Class 6", phone: "+91 98765 33344", date: "5h ago", status: "pending" },
  { name: "Arnav Sharma", class: "Class 11 — Science", phone: "+91 98765 55566", date: "Yesterday", status: "ongoing" },
  { name: "Riya Iyer", class: "Class 8", phone: "+91 98765 77788", date: "2 days ago", status: "completed" },
];
export function AdmissionManagementPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Admission Management" subtitle="14 pending applications" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={UserPlus} value="14" label="Pending Review" color="warning" delay={0} />
        <OverviewCard icon={UserPlus} value="32" label="Approved This Month" color="success" delay={80} />
        <OverviewCard icon={UserPlus} value="6" label="Rejected" color="danger" delay={160} />
        <OverviewCard icon={UserPlus} value="124" label="Total Applications" color="brand" delay={240} />
      </div>
      <Panel className="!p-0 overflow-hidden">
        <DataTable
          headers={["Applicant", "Class", "Phone", "Applied", "Status", "Actions"]}
          rows={APPS.map((a) => [a.name, a.class, a.phone, a.date, <StatusBadge key="s" status={a.status} />, <RowActions key="r" />])}
        />
      </Panel>
    </div>
  );
}

/* ---------- Teachers ---------- */
const TEACHERS = [
  { id: "EMP/01", name: "Mr. Rajesh Iyer", dept: "Mathematics", classes: 6, exp: "12 yrs" },
  { id: "EMP/02", name: "Mrs. Priya Sharma", dept: "Physics", classes: 5, exp: "9 yrs" },
  { id: "EMP/03", name: "Dr. Priya Venkatesan", dept: "Sciences (HOF)", classes: 4, exp: "18 yrs" },
  { id: "EMP/04", name: "Mr. Vikram Joshi", dept: "English", classes: 7, exp: "6 yrs" },
];
export function TeacherManagementPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Teacher Management" subtitle="68 active teachers" action={
        <BrandButton icon={UserPlus}>Add Teacher</BrandButton>
      } />
      <SearchFilterRow />
      <Panel className="!p-0 overflow-hidden">
        <DataTable
          headers={["Employee ID", "Name", "Department", "Classes", "Experience", "Actions"]}
          rows={TEACHERS.map((t) => [t.id, t.name, t.dept, String(t.classes), t.exp, <RowActions key="r" />])}
        />
      </Panel>
    </div>
  );
}

/* ---------- User Accounts (Credentials Quick View) ---------- */
const ACCOUNTS = [
  { user: "samuel.devanand", role: "Principal", last: "10 min ago", state: "active" },
  { user: "priya.venkatesan", role: "HOF", last: "1h ago", state: "active" },
  { user: "rajesh.iyer", role: "Faculty", last: "3h ago", state: "active" },
  { user: "arjun.krishnamurthy", role: "Student", last: "Yesterday", state: "active" },
  { user: "vikram.joshi", role: "Faculty", last: "5 days ago", state: "disabled" },
];
export function UserAccountsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="User Accounts" subtitle="Manage all logins" />
      <Panel className="!p-0 overflow-hidden">
        <DataTable
          headers={["Username", "Role", "Last Login", "Status", "Actions"]}
          rows={ACCOUNTS.map((a) => [
            <span key="u" className="font-mono text-[12px]">{a.user}</span>,
            <span key="r" className="rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-brand">{a.role}</span>,
            a.last,
            <StatusBadge key="s" status={a.state} />,
            <RowActions key="ac" />,
          ])}
        />
      </Panel>
    </div>
  );
}

/* ---------- Fee Management ---------- */
const FEES = [
  { class: "Class 12", collected: "₹4.2L", pending: "₹38K", percent: 92 },
  { class: "Class 11", collected: "₹3.9L", pending: "₹52K", percent: 88 },
  { class: "Class 10", collected: "₹3.4L", pending: "₹65K", percent: 84 },
  { class: "Class 9", collected: "₹2.9L", pending: "₹78K", percent: 79 },
];
export function FeeManagementPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Fee Management" subtitle="Term 2 · 2025-26" action={
        <BrandButton icon={CreditCard}>Record Payment</BrandButton>
      } />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={CreditCard} value="₹14.4L" label="Total Collected" color="success" trend={{ dir: "up", text: "+12%", positive: true }} delay={0} />
        <OverviewCard icon={CreditCard} value="₹2.33L" label="Outstanding" color="danger" delay={80} />
        <OverviewCard icon={CreditCard} value="₹2.4L" label="Today" color="brand" delay={160} />
        <OverviewCard icon={CreditCard} value="86%" label="Collection Rate" color="success" progress={86} delay={240} />
      </div>
      <Panel className="!p-0 overflow-hidden">
        <DataTable
          headers={["Class", "Collected", "Pending", "Rate", "Actions"]}
          rows={FEES.map((f) => [f.class, f.collected, f.pending, `${f.percent}%`, <RowActions key="r" />])}
        />
      </Panel>
    </div>
  );
}

/* ---------- Certificates ---------- */
const CERTS = [
  { type: "Bonafide Certificate", icon: FileText, count: 8 },
  { type: "Transfer Certificate", icon: FileText, count: 3 },
  { type: "Conduct Certificate", icon: FileText, count: 1 },
  { type: "Mark Sheet", icon: FileText, count: 12 },
];
export function CertificateGeneratorPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Certificate Generator" subtitle="Issue official documents" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CERTS.map((c, i) => (
          <div key={c.type} className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-neumorphic)] transition-all hover:-translate-y-1" style={{ animation: "var(--animate-stagger-in)", animationDelay: `${i * 60}ms` }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand">
              <c.icon className="h-6 w-6" />
            </div>
            <div className="mt-3 text-[14px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{c.type}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{c.count} pending requests</div>
            <BrandButton variant="ghost" className="mt-3 w-full">Generate</BrandButton>
          </div>
        ))}
      </div>
      <Panel>
        <SectionHeader title="Recent Requests" />
        <DataTable
          headers={["Student", "Type", "Requested", "Status"]}
          rows={[
            ["Arjun Krishnamurthy", "Bonafide", "2 hours ago", <StatusBadge key="a" status="pending" />],
            ["Meera Pillai", "Mark Sheet", "Yesterday", <StatusBadge key="b" status="completed" />],
            ["Karthik Rao", "Transfer", "2 days ago", <StatusBadge key="c" status="ongoing" />],
          ]}
        />
      </Panel>
    </div>
  );
}

/* ---------- Timetable Publishing ---------- */
export function TimetablePublishingPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Timetable Publishing" subtitle="Review and publish to students & faculty" action={
        <BrandButton icon={Clock}>Publish Now</BrandButton>
      } />
      <Panel>
        <SectionHeader title="Pending Drafts" />
        <div className="space-y-3">
          {[
            { name: "Term 2 · Class 11-A", by: "Dr. Priya Venkatesan", date: "Updated 2h ago", status: "pending" },
            { name: "Term 2 · Class 12-B", by: "Dr. Priya Venkatesan", date: "Updated 5h ago", status: "ongoing" },
            { name: "Term 2 · Class 10-A", by: "Mrs. Lalitha Menon", date: "Updated yesterday", status: "completed" },
          ].map((d) => (
            <div key={d.name} className="flex items-center gap-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-neumorphic-sm)]">
              <Clock className="h-5 w-5 text-brand" />
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{d.name}</div>
                <div className="text-[11px] text-muted-foreground">{d.by} · {d.date}</div>
              </div>
              <StatusBadge status={d.status} />
              <BrandButton variant="ghost">Review</BrandButton>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ---------- Reports ---------- */
export function ReportsPage() {
  const reports = [
    { title: "Student Attendance Report", icon: BarChart3, desc: "Class-wise daily attendance summary" },
    { title: "Fee Collection Report", icon: CreditCard, desc: "Monthly collection by class" },
    { title: "Faculty Attendance Report", icon: BookUser, desc: "Staff working day summary" },
    { title: "Admission Funnel Report", icon: UserPlus, desc: "Inquiry to enrolment metrics" },
    { title: "Academic Performance Report", icon: BarChart3, desc: "Exam-wise mark distribution" },
    { title: "Certificate Issuance Report", icon: FileText, desc: "Issued certificates this term" },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader title="Reports" subtitle="Generate and download operational reports" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r, i) => (
          <div key={r.title} className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-neumorphic)] transition-all hover:-translate-y-1" style={{ animation: "var(--animate-stagger-in)", animationDelay: `${i * 50}ms` }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
              <r.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{r.title}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{r.desc}</div>
            <div className="mt-3 flex gap-2">
              <BrandButton variant="ghost" icon={Eye} className="flex-1">Preview</BrandButton>
              <BrandButton variant="ghost" icon={Download} className="flex-1">Export</BrandButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Credentials Center ---------- */
export function CredentialCenterPage() {
  const [pwd, setPwd] = useState("");
  return (
    <div className="space-y-5">
      <SectionHeader title="Login Credential Center" subtitle="Issue and reset user credentials" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel>
          <SectionHeader title="Generate Credentials" subtitle="Create login for a new user" />
          <div className="space-y-3">
            <select className="w-full rounded-xl bg-bg px-4 py-3 text-[13px] focus:outline-none" style={{ boxShadow: "var(--shadow-neumorphic-inset)" }}>
              <option>Select Role</option>
              <option>Faculty</option><option>HOF</option><option>Principal</option>
            </select>
            <input placeholder="Full name" className="w-full rounded-xl bg-bg px-4 py-3 text-[13px] focus:outline-none" style={{ boxShadow: "var(--shadow-neumorphic-inset)" }} />
            <input placeholder="Email" className="w-full rounded-xl bg-bg px-4 py-3 text-[13px] focus:outline-none" style={{ boxShadow: "var(--shadow-neumorphic-inset)" }} />
            <button onClick={() => { setPwd(Math.random().toString(36).slice(2, 12).toUpperCase()); toast.success("Password generated"); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-bg px-4 py-3 text-[13px] font-bold shadow-[var(--shadow-neumorphic-sm)] hover:text-brand">
              <RefreshCw className="h-4 w-4" /> Generate Password
            </button>
            {pwd && (
              <div className="flex items-center gap-2 rounded-xl bg-bg px-4 py-3 font-mono text-[13px] shadow-[var(--shadow-neumorphic-inset)]">
                <span className="flex-1">{pwd}</span>
                <button onClick={() => { navigator.clipboard?.writeText(pwd); toast.success("Copied"); }} className="text-muted-foreground hover:text-brand"><Copy className="h-4 w-4" /></button>
              </div>
            )}
            <BrandButton icon={LogIn}>Issue Credentials</BrandButton>
          </div>
        </Panel>
        <Panel>
          <SectionHeader title="Recently Issued" />
          <div className="space-y-2">
            {[
              { user: "rajesh.iyer", role: "Faculty", when: "Today, 10:42 AM" },
              { user: "lalitha.menon", role: "School Admin", when: "Yesterday" },
              { user: "anika.sharma", role: "Student", when: "2 days ago" },
            ].map((r) => (
              <div key={r.user} className="flex items-center gap-3 rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-sm)]">
                <KeyRound className="h-4 w-4 text-brand" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-[12px] font-bold text-ink">{r.user}</div>
                  <div className="text-[11px] text-muted-foreground">{r.role}</div>
                </div>
                <div className="shrink-0 text-[11px] text-muted-foreground">{r.when}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ---------- Shared bits ---------- */
function SearchFilterRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#F8F7F4", boxShadow: "var(--shadow-neumorphic-inset)" }}>
        <Search className="h-4 w-4 text-muted-foreground" />
        <input className="flex-1 bg-transparent text-[13px] focus:outline-none" placeholder="Search by name, register no..." />
      </div>
      <button className="flex items-center gap-2 rounded-full bg-bg px-4 py-2.5 text-[13px] font-bold shadow-[var(--shadow-neumorphic-sm)]">
        <Filter className="h-4 w-4" /> Filter
      </button>
    </div>
  );
}
function RowActions() {
  return (
    <div className="flex gap-1">
      <button onClick={() => toast("View")} className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"><Eye className="h-4 w-4" /></button>
      <button onClick={() => toast("Edit")} className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"><Pencil className="h-4 w-4" /></button>
    </div>
  );
}
function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-bg/60">
          <tr className="text-left">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border hover:bg-brand-light/30">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 text-[12px] text-ink">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
