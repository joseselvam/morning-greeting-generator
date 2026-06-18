import {
  Star, UserCheck, ClipboardList, Trophy, BookMarked, Megaphone, CalendarDays,
  CreditCard, AlertCircle, CheckCircle2, Calendar as CalendarIcon, ArrowRight,
} from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar, StatusBadge, BrandButton } from "./primitives";
import { STUDENT_MARKS, STUDENT_ASSIGNMENTS, STUDENT_HOMEWORK, ANNOUNCEMENTS, EVENTS, SUBJECT_COLORS, ROLE_USERS } from "@/lib/mock-data";

export function StudentHome() {
  const user = ROLE_USERS.student;
  const greeting = greetingFor();

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          {greeting}, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Here's your academic snapshot for today.</p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
        <OverviewCard icon={Star} value="8.7 / 10" label="Current GPA" sub="vs last term" color="warning" trend={{ dir: "up", text: "+0.3", positive: true }} progress={87} delay={0} />
        <OverviewCard icon={UserCheck} value="91.4%" label="Attendance Rate" sub="vs last month" color="success" trend={{ dir: "down", text: "-1.2%", positive: false }} progress={91} delay={80} />
        <OverviewCard icon={ClipboardList} value="3" label="Pending Assignments" sub="2 due this week" color="danger" pulse delay={160} />
        <OverviewCard icon={Trophy} value="#4" label="Class Rank" sub="Out of 62 students" color="brand" trend={{ dir: "up", text: "+2", positive: true }} delay={240} />
      </div>

      {/* Marks + Calendar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Panel>
            <SectionHeader title="Recent Marks & Performance" subtitle="Subject-wise breakdown — Mid-term" />
            <div className="space-y-4">
              {STUDENT_MARKS.map((m) => {
                const color =
                  m.score >= 90 ? "#10B981" : m.score >= 75 ? "#191BDF" : m.score >= 50 ? "#F59E0B" : "#EF4444";
                return (
                  <div key={m.subject}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{m.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{m.score}/{m.max}</span>
                        <StatusBadge status={m.score >= 50 ? "Pass" : "Fail"} />
                      </div>
                    </div>
                    <ProgressBar value={(m.score / m.max) * 100} color={color} />
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-2">
          <Panel>
            <SectionHeader title="Attendance" subtitle="March 2026" />
            <MiniCalendar />
            <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              <Legend color="#191BDF" label="Present" />
              <Legend color="#EF4444" label="Absent" />
              <Legend color="#F59E0B" label="Holiday" />
            </div>
            <button className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline">
              View Full Calendar <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Panel>
        </div>
      </div>

      {/* Assignments + Homework */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <SectionHeader title="Upcoming Assignments" />
          <div className="space-y-2">
            {STUDENT_ASSIGNMENTS.map((a) => (
              <div
                key={a.title}
                className="group flex cursor-pointer items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:translate-x-1 hover:border-brand-light hover:bg-brand-light/30"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: a.status === "overdue" ? "#EF4444" : a.status === "pending" ? "#F59E0B" : "#10B981" }}
                />
                <span
                  className="rounded-full px-2 py-0.5 font-[family-name:var(--font-dm)] text-[10px] font-bold text-white"
                  style={{ background: SUBJECT_COLORS[a.subject] ?? "#191BDF" }}
                >
                  {a.subject}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-semibold text-ink">{a.title}</div>
                  <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    {a.due}
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
          <div className="mt-4"><BrandButton variant="ghost">View All Assignments</BrandButton></div>
        </Panel>

        <Panel>
          <SectionHeader title="Today's Homework" subtitle="Don't forget to mark these complete" />
          <div className="space-y-3">
            {STUDENT_HOMEWORK.map((h) => (
              <div key={h.task} className="flex items-start gap-3 rounded-xl border-l-[3px] bg-bg/60 p-3" style={{ borderLeftColor: SUBJECT_COLORS[h.subject] ?? "#191BDF" }}>
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 cursor-pointer rounded border-border accent-[#191BDF]"
                />
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wide text-brand">{h.subject}</div>
                  <div className="text-[13px] text-ink">{h.task}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">Due: {h.due}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel>
          <SectionHeader title="Announcements" />
          <div className="space-y-3">
            {ANNOUNCEMENTS.map((a) => (
              <div key={a.title} className="flex gap-3 rounded-xl p-2 transition-colors hover:bg-brand-light/30">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light">
                  <Megaphone className="h-4 w-4 text-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{a.title}</div>
                  </div>
                  <p className="line-clamp-2 text-[12px] text-muted-foreground">{a.preview}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{a.date}</span>
                    <StatusBadge status={a.priority} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader title="Upcoming Events" />
          <div className="space-y-3">
            {EVENTS.map((e) => (
              <div key={e.name} className="flex items-center gap-3">
                <div
                  className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-bg shadow-[var(--shadow-neumorphic-sm)]"
                >
                  <div className="text-[20px] font-extrabold leading-none text-brand" style={{ fontFamily: "var(--font-display)" }}>{e.day}</div>
                  <div className="font-[family-name:var(--font-dm)] text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{e.month}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-[family-name:var(--font-dm)] text-[14px] font-semibold text-ink">{e.name}</div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <StatusBadge status={e.type === "Holiday" ? "Active" : e.type === "Exam" ? "high" : "pending"} />
                    <span className="text-[11px] text-muted-foreground">{e.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionHeader title="Fee Status" />
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(245,158,11,0.15)" }}>
              <AlertCircle className="h-8 w-8" style={{ color: "#F59E0B" }} />
            </div>
            <div className="mt-3 text-[18px] font-bold" style={{ fontFamily: "var(--font-display)", color: "#B45309" }}>
              Fee Pending
            </div>
            <div className="mt-2 text-[32px] font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>
              ₹12,500
            </div>
            <div className="text-[12px] text-muted-foreground">Due by April 5, 2026</div>
            <div className="mt-4"><BrandButton icon={CreditCard}>Pay Now</BrandButton></div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function greetingFor() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

function MiniCalendar() {
  const today = 19;
  const present = new Set([1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19]);
  const absent = new Set([7, 14]);
  const holiday = new Set([6, 13, 20, 21, 27, 28]);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* offset for first day */}
        {Array.from({ length: 0 }).map((_, i) => <div key={`o${i}`} />)}
        {days.map((d) => {
          const isToday = d === today;
          const isP = present.has(d);
          const isA = absent.has(d);
          const isH = holiday.has(d);
          const bg = isP ? "#191BDF" : isA ? "#EF4444" : "transparent";
          const color = isP || isA ? "#fff" : isH ? "#B45309" : "#1A1C24";
          return (
            <div
              key={d}
              className={`flex aspect-square items-center justify-center rounded-full text-[11px] font-semibold ${isToday ? "ring-2 ring-brand ring-offset-1 ring-offset-bg" : ""}`}
              style={{
                background: bg,
                color,
                fontFamily: "Inter",
                boxShadow: isP ? "0 2px 6px rgba(25,27,223,0.3)" : undefined,
                border: isH ? "1px dashed rgba(245,158,11,0.6)" : undefined,
              }}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
