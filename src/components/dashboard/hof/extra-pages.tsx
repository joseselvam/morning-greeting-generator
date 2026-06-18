import { GitBranch, Gauge, BookMarked, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { SectionHeader, Panel, BrandButton, StatusBadge, ProgressBar, OverviewCard } from "../primitives";
import { toast } from "sonner";

/* Timetable Drafts */
const DRAFTS = [
  { name: "Class 11-A · Term 2", updated: "2h ago", status: "pending" },
  { name: "Class 12-B · Term 2", updated: "5h ago", status: "ongoing" },
  { name: "Class 10-A · Term 2", updated: "Yesterday", status: "completed" },
  { name: "Class 9-C · Term 2", updated: "2 days ago", status: "pending" },
];
export function TimetableDraftsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Timetable Drafts" subtitle="Work-in-progress timetables awaiting publish" action={
        <BrandButton icon={Plus} onClick={() => toast("New draft")}>New Draft</BrandButton>
      } />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={GitBranch} value="4" label="Active Drafts" color="brand" delay={0} />
        <OverviewCard icon={CheckCircle2} value="12" label="Published This Term" color="success" delay={80} />
        <OverviewCard icon={AlertCircle} value="2" label="Conflicts Detected" color="danger" delay={160} />
        <OverviewCard icon={GitBranch} value="3" label="Awaiting Approval" color="warning" delay={240} />
      </div>
      <Panel>
        <div className="space-y-3">
          {DRAFTS.map((d) => (
            <div key={d.name} className="flex items-center gap-4 rounded-xl bg-bg p-4 shadow-[var(--shadow-neumorphic-sm)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand">
                <GitBranch className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{d.name}</div>
                <div className="text-[11px] text-muted-foreground">Updated {d.updated}</div>
              </div>
              <StatusBadge status={d.status} />
              <BrandButton variant="ghost" onClick={() => toast("Opening editor")}>Edit</BrandButton>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* Faculty Workload */
const WORKLOAD = [
  { name: "Mr. Rajesh Iyer", subject: "Mathematics", classes: 28, max: 32 },
  { name: "Mrs. Priya Sharma", subject: "Physics", classes: 24, max: 32 },
  { name: "Mr. Vikram Joshi", subject: "English", classes: 30, max: 32 },
  { name: "Mrs. Lalitha Menon", subject: "Chemistry", classes: 22, max: 32 },
  { name: "Dr. Arul Selvan", subject: "Biology", classes: 18, max: 32 },
  { name: "Mr. Ranjit Das", subject: "Comp. Science", classes: 26, max: 32 },
];
export function FacultyWorkloadPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Faculty Workload" subtitle="Weekly periods per teacher" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={Gauge} value="74%" label="Avg. Utilization" color="brand" progress={74} delay={0} />
        <OverviewCard icon={Gauge} value="32" label="Max Periods / Week" color="info" delay={80} />
        <OverviewCard icon={AlertCircle} value="1" label="Overloaded" color="danger" delay={160} />
        <OverviewCard icon={Gauge} value="3" label="Under-utilized" color="warning" delay={240} />
      </div>
      <Panel>
        <div className="space-y-4">
          {WORKLOAD.map((w) => {
            const pct = Math.round((w.classes / w.max) * 100);
            return (
              <div key={w.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div>
                    <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{w.name}</div>
                    <div className="text-[11px] text-muted-foreground">{w.subject}</div>
                  </div>
                  <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold" style={{ color: pct >= 90 ? "#EF4444" : pct >= 70 ? "#191BDF" : "#F59E0B" }}>{w.classes}/{w.max} periods</span>
                </div>
                <ProgressBar value={pct} color={pct >= 90 ? "#EF4444" : pct >= 70 ? "#191BDF" : "#F59E0B"} />
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/* Subject Allocation */
const ALLOC = [
  { subject: "Mathematics", teachers: ["Mr. Rajesh Iyer", "Mrs. Anjali R."], classes: "9, 10, 11, 12" },
  { subject: "Physics", teachers: ["Mrs. Priya Sharma"], classes: "11, 12" },
  { subject: "Chemistry", teachers: ["Mrs. Lalitha Menon"], classes: "11, 12" },
  { subject: "Biology", teachers: ["Dr. Arul Selvan"], classes: "9, 10, 11, 12" },
  { subject: "English", teachers: ["Mr. Vikram Joshi", "Mrs. Helena P."], classes: "6 – 12" },
  { subject: "Computer Science", teachers: ["Mr. Ranjit Das"], classes: "8 – 12" },
];
export function SubjectAllocationPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Subject Allocation" subtitle="Teachers assigned per subject & class group" action={
        <BrandButton icon={Plus} onClick={() => toast("New allocation")}>Add Allocation</BrandButton>
      } />
      <Panel className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg/60">
              <tr className="text-left">
                {["Subject", "Allocated Teachers", "Classes", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALLOC.map((a) => (
                <tr key={a.subject} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><BookMarked className="h-4 w-4 text-brand" /><span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{a.subject}</span></div></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {a.teachers.map((t) => (
                        <span key={t} className="rounded-full bg-brand-light px-2.5 py-0.5 text-[11px] font-semibold text-brand">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{a.classes}</td>
                  <td className="px-4 py-3">
                    <BrandButton variant="ghost" onClick={() => toast("Edit allocation")}>Edit</BrandButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
