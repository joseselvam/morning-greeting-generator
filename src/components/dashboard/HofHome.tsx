import { Users, UserCheck, UserX, CheckCircle2, XCircle } from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar, StatusBadge, BrandButton } from "./primitives";
import { ABSENT_FACULTY, LEAVE_REQUESTS, CURRICULUM_PROGRESS, ROLE_USERS } from "@/lib/mock-data";
import { toast } from "sonner";

export function HofHome() {
  const user = ROLE_USERS.hof;
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekData = [
    { p: 22, a: 2 }, { p: 21, a: 3 }, { p: 23, a: 1 }, { p: 20, a: 4 }, { p: 22, a: 2 }, { p: 21, a: 3 },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Good Morning, {user.name}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">21 faculty present today. 4 classes need substitute coverage.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
        <OverviewCard icon={Users} value="24" label="Total Faculty" sub="Across 6 departments" color="brand" delay={0} />
        <OverviewCard icon={UserCheck} value="21" label="Present Today" sub="87.5% attendance rate" color="success" progress={87.5} delay={80} />
        <OverviewCard icon={UserX} value="3" label="Absent Today" sub="1 substitute needed" color="danger" pulse delay={160} />
        <OverviewCard icon={CheckCircle2} value="38 / 42" label="Classes Covered" sub="4 unassigned" color="success" progress={90.5} delay={240} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Panel>
            <SectionHeader title="Absent Faculty & Substitute Status" />
            <div className="space-y-3">
              {ABSENT_FACULTY.map((f) => (
                <div key={f.name} className="flex items-center gap-4 rounded-xl border border-border bg-bg/40 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{f.name}</div>
                    <div className="text-[12px] text-muted-foreground">{f.subject} · {f.classes} classes affected</div>
                  </div>
                  {f.substitute ? (
                    <span className="rounded-full px-3 py-1 font-[family-name:var(--font-dm)] text-[11px] font-bold" style={{ background: "rgba(16,185,129,0.15)", color: "#059669" }}>
                      ✓ {f.substitute}
                    </span>
                  ) : (
                    <BrandButton onClick={() => toast.success("Substitute assignment opened")} className="!px-3 !py-1.5 !text-[11px]">
                      Assign Substitute
                    </BrandButton>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-2">
          <Panel>
            <SectionHeader title="Faculty Attendance" subtitle="This week" />
            <div className="flex h-44 items-end justify-between gap-2">
              {weekDays.map((d, i) => {
                const total = weekData[i].p + weekData[i].a;
                const presentH = (weekData[i].p / 24) * 100;
                const absentH = (weekData[i].a / 24) * 100;
                return (
                  <div key={d} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 w-full flex-col justify-end gap-0.5">
                      <div className="rounded-t" style={{ height: `${absentH}%`, background: "#EF4444", boxShadow: "0 0 8px rgba(239,68,68,0.4)" }} />
                      <div className="rounded-b" style={{ height: `${presentH}%`, background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.4)" }} />
                    </div>
                    <span className="font-[family-name:var(--font-dm)] text-[11px] font-semibold text-muted-foreground">{d}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />Present</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />Absent</span>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <SectionHeader title="Leave Requests Pending" subtitle="Awaiting your approval" />
          <div className="space-y-3">
            {LEAVE_REQUESTS.map((r) => (
              <div key={r.name} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{r.name}</div>
                    <div className="text-[12px] text-muted-foreground">{r.subject}</div>
                    <div className="mt-1.5 text-[12px] text-ink">{r.dates} <span className="text-muted-foreground">({r.days} days)</span></div>
                    <div className="text-[11px] italic text-muted-foreground">"{r.reason}"</div>
                  </div>
                  <StatusBadge status="Pending" />
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => toast.success(`Approved leave for ${r.name}`)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[rgba(16,185,129,0.12)] py-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-[#059669] transition-colors hover:bg-[rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button onClick={() => toast.error(`Rejected leave for ${r.name}`)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[rgba(239,68,68,0.12)] py-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-[#DC2626] transition-colors hover:bg-[rgba(239,68,68,0.2)]">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader title="Curriculum Progress Tracker" subtitle="Syllabus completion across subjects" />
          <div className="space-y-4">
            {CURRICULUM_PROGRESS.map((c) => {
              const pct = (c.covered / c.total) * 100;
              const color = c.status === "ahead" ? "#191BDF" : c.status === "behind" ? "#F59E0B" : "#10B981";
              return (
                <div key={c.subject}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">
                      {c.subject} <span className="text-muted-foreground">· {c.grade}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-muted-foreground">{c.covered}/{c.total} chapters</span>
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                  <ProgressBar value={pct} color={color} />
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
