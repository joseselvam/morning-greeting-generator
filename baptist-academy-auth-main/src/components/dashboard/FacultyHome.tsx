import {
  CalendarDays, Users, ClipboardList, CheckCircle2, UserCheck, Plus, BookMarked,
  Megaphone, DoorClosed,
} from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar, StatusBadge, BrandButton } from "./primitives";
import { FACULTY_CLASSES_TODAY, FACULTY_ASSIGNMENTS, ROLE_USERS, CLASS_PERFORMANCE } from "@/lib/mock-data";

export function FacultyHome() {
  const user = ROLE_USERS.faculty;
  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Good Morning, {user.name}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">You have 5 classes today. 28 students yet to be marked.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
        <OverviewCard icon={CalendarDays} value="5 Classes" label="Classes Today" sub="3 completed, 2 remaining" color="brand" progress={60} delay={0} />
        <OverviewCard icon={Users} value="186" label="Students Assigned" sub="Across 4 sections" color="success" delay={80} />
        <OverviewCard icon={ClipboardList} value="12" label="Pending Corrections" sub="Assignments to grade" color="warning" pulse delay={160} />
        <OverviewCard icon={CheckCircle2} value="3 / 5" label="Attendance Marked" sub="Today's classes" color="success" progress={60} delay={240} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Panel>
            <SectionHeader title="Today's Class Schedule" subtitle="Tap a class to take quick actions" />
            <div className="space-y-3">
              {FACULTY_CLASSES_TODAY.map((c, i) => {
                const ongoing = c.status === "ongoing";
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 rounded-xl border p-3 transition-all ${
                      ongoing
                        ? "border-brand-light bg-brand-light/40 shadow-[var(--shadow-brand-glow)]"
                        : "border-border bg-bg/40 hover:border-brand-light/60"
                    }`}
                    style={ongoing ? { borderLeft: "3px solid #191BDF" } : undefined}
                  >
                    <div
                      className="flex h-12 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-bg font-[family-name:var(--font-dm)] text-[12px] font-bold text-ink shadow-[var(--shadow-neumorphic-sm)]"
                    >
                      {c.time}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{c.subject}</div>
                      <div className="text-[12px] text-muted-foreground">{c.section}</div>
                    </div>
                    <div className="hidden items-center gap-1.5 text-[12px] text-muted-foreground sm:flex">
                      <DoorClosed className="h-3.5 w-3.5" /> {c.room}
                    </div>
                    <StatusBadge status={c.status} />
                    {ongoing && <BrandButton icon={UserCheck} className="!px-3 !py-1.5 !text-[11px]">Mark</BrandButton>}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-2">
          <Panel>
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: UserCheck, label: "Mark Attendance" },
                { icon: Plus, label: "Add Marks" },
                { icon: BookMarked, label: "Assign Homework" },
                { icon: Megaphone, label: "Post Announcement" },
              ].map((q) => (
                <button
                  key={q.label}
                  className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-bg p-5 text-center shadow-[var(--shadow-neumorphic-sm)] transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-[var(--shadow-brand-glow)]"
                >
                  <q.icon className="h-7 w-7 text-brand transition-colors group-hover:text-white" strokeWidth={2.2} />
                  <span className="font-[family-name:var(--font-dm)] text-[12px] font-bold text-ink transition-colors group-hover:text-white">
                    {q.label}
                  </span>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <SectionHeader title="Recent Assignments" />
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-bg">
                  {["Assignment", "Class", "Submitted", "Due", "Action"].map((h) => (
                    <th key={h} className="px-3 py-2 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FACULTY_ASSIGNMENTS.map((a, i) => (
                  <tr key={a.title} className={`border-t border-border transition-colors hover:bg-brand-light/30 ${i % 2 ? "bg-bg/40" : "bg-surface"}`}>
                    <td className="px-3 py-3 font-medium text-ink">{a.title}</td>
                    <td className="px-3 py-3 text-muted-foreground">{a.section}</td>
                    <td className="px-3 py-3 text-muted-foreground">{a.submitted}/{a.total}</td>
                    <td className="px-3 py-3 text-muted-foreground">{a.due}</td>
                    <td className="px-3 py-3"><BrandButton variant="ghost" className="!px-3 !py-1.5 !text-[11px]">Grade</BrandButton></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <SectionHeader title="Class Performance Snapshot" subtitle="Average marks across sections" />
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
      </div>
    </div>
  );
}
