import { useState } from "react";
import { CalendarDays, Download, Printer, MapPin, Clock } from "lucide-react";
import { PageWrap, PageHeader, Card, SubHeader, Chip, GhostBtn } from "./_shared";
import { TimetableGrid, TimetableLegend, DAYS, PERIODS, type Slot } from "../shared/TimetableGrid";

/* Student class timetable — Class 11-A */
const STUDENT_GRID: Slot[][] = [
  // Mon
  [
    { subject: "Mathematics", teacher: "Ms. Deepa K.", room: "R-201", tone: "brand" },
    { subject: "Physics", teacher: "Dr. Priya V.", room: "R-204", tone: "info" },
    { subject: "English", teacher: "Mr. Anand P.", room: "R-110", tone: "success" },
    { subject: "Chemistry", teacher: "Mr. Vikram S.", room: "Lab-1", tone: "warning" },
    null,
    { subject: "Biology", teacher: "Mr. Karthik M.", room: "Lab-2", tone: "info" },
    { subject: "Computer Sci.", teacher: "Mr. Rajan", room: "Lab-3", tone: "brand" },
    { subject: "Sports", teacher: "Coach Arun", room: "Field", tone: "success" },
  ],
  // Tue
  [
    { subject: "Physics", teacher: "Dr. Priya V.", room: "R-204", tone: "info" },
    { subject: "Mathematics", teacher: "Ms. Deepa K.", room: "R-201", tone: "brand" },
    { subject: "Tamil", teacher: "Ms. Lakshmi", room: "R-105", tone: "muted" },
    { subject: "English", teacher: "Mr. Anand P.", room: "R-110", tone: "success" },
    null,
    { subject: "Chemistry Lab", teacher: "Mr. Vikram S.", room: "Lab-1", tone: "warning" },
    { subject: "Chemistry Lab", teacher: "Mr. Vikram S.", room: "Lab-1", tone: "warning" },
    { subject: "Library", teacher: "—", room: "Library", tone: "muted" },
  ],
  // Wed
  [
    { subject: "Biology", teacher: "Mr. Karthik M.", room: "Lab-2", tone: "info" },
    { subject: "Chemistry", teacher: "Mr. Vikram S.", room: "Lab-1", tone: "warning" },
    { subject: "Mathematics", teacher: "Ms. Deepa K.", room: "R-201", tone: "brand" },
    { subject: "Physics Lab", teacher: "Dr. Priya V.", room: "Lab-P", tone: "info" },
    null,
    { subject: "English", teacher: "Mr. Anand P.", room: "R-110", tone: "success" },
    { subject: "Tamil", teacher: "Ms. Lakshmi", room: "R-105", tone: "muted" },
    { subject: "Art", teacher: "Ms. Reema", room: "Studio", tone: "success" },
  ],
  // Thu
  [
    { subject: "Mathematics", teacher: "Ms. Deepa K.", room: "R-201", tone: "brand" },
    { subject: "Computer Sci.", teacher: "Mr. Rajan", room: "Lab-3", tone: "brand" },
    { subject: "Physics", teacher: "Dr. Priya V.", room: "R-204", tone: "info" },
    { subject: "Chemistry", teacher: "Mr. Vikram S.", room: "Lab-1", tone: "warning" },
    null,
    { subject: "Biology Lab", teacher: "Mr. Karthik M.", room: "Lab-2", tone: "info" },
    { subject: "Biology Lab", teacher: "Mr. Karthik M.", room: "Lab-2", tone: "info" },
    { subject: "Sports", teacher: "Coach Arun", room: "Field", tone: "success" },
  ],
  // Fri
  [
    { subject: "English", teacher: "Mr. Anand P.", room: "R-110", tone: "success" },
    { subject: "Physics", teacher: "Dr. Priya V.", room: "R-204", tone: "info" },
    { subject: "Mathematics", teacher: "Ms. Deepa K.", room: "R-201", tone: "brand" },
    { subject: "Tamil", teacher: "Ms. Lakshmi", room: "R-105", tone: "muted" },
    null,
    { subject: "Chemistry", teacher: "Mr. Vikram S.", room: "Lab-1", tone: "warning" },
    { subject: "Biology", teacher: "Mr. Karthik M.", room: "Lab-2", tone: "info" },
    { subject: "Counselling", teacher: "Ms. Anjali", room: "R-300", tone: "muted" },
  ],
  // Sat
  [
    { subject: "Sports", teacher: "Coach Arun", room: "Field", tone: "success" },
    { subject: "Mathematics", teacher: "Ms. Deepa K.", room: "R-201", tone: "brand" },
    { subject: "Physics", teacher: "Dr. Priya V.", room: "R-204", tone: "info" },
    { subject: "Club Activity", teacher: "—", room: "Auditorium", tone: "brand" },
    null,
    null,
    null,
    null,
  ],
];

export function StudentTimetablePage() {
  const today = new Date().getDay(); // 0 Sun – 6 Sat
  const todayIdx = today === 0 ? 0 : today - 1; // map to Mon-first
  const [activeDay, setActiveDay] = useState(Math.min(Math.max(todayIdx, 0), 5));

  const todaysSlots = STUDENT_GRID[activeDay]
    .map((s, i) => (s ? { ...s, period: PERIODS[i] } : null))
    .filter(Boolean) as Array<NonNullable<Slot> & { period: typeof PERIODS[number] }>;

  return (
    <PageWrap>
      <PageHeader
        title="My Timetable"
        subtitle="Class 11-A · Academic Year 2025 – 2026"
        right={
          <div className="flex flex-wrap gap-2">
            <GhostBtn icon={Printer}>Print</GhostBtn>
            <GhostBtn icon={Download}>Download PDF</GhostBtn>
          </div>
        }
      />

      {/* Today's classes — mobile-friendly daily view */}
      <Card>
        <SubHeader
          title="Today's Classes"
          subtitle={DAYS[activeDay] === DAYS[todayIdx] ? "Live schedule for today" : "Viewing another day"}
        />
        <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {DAYS.map((d, i) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDay(i)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all ${
                activeDay === i
                  ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]"
                  : "border border-border bg-bg text-ink hover:border-brand-light hover:text-brand"
              }`}
              aria-pressed={activeDay === i}
            >
              {d}
              {i === todayIdx && (
                <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              )}
            </button>
          ))}
        </div>
        {todaysSlots.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-bg p-8 text-center text-sm text-muted-foreground">
            No classes scheduled for {DAYS[activeDay]}. Enjoy the break! 🎉
          </div>
        ) : (
          <ul className="space-y-2">
            {todaysSlots.map((s, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3 transition-all hover:-translate-y-px hover:border-brand-light"
              >
                <div className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand text-white shadow-[var(--shadow-brand-glow)]">
                  <span className="text-[10px] font-bold opacity-80">PERIOD</span>
                  <span className="font-[family-name:var(--font-display)] text-base font-extrabold leading-none">
                    {s.period.n}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-[family-name:var(--font-dm)] text-sm font-bold text-ink">
                    {s.subject}
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {s.period.t}
                    </span>
                    {s.room && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {s.room}
                      </span>
                    )}
                    {s.teacher && <span>· {s.teacher}</span>}
                  </div>
                </div>
                <Chip color="#191BDF" size="sm" className="hidden sm:inline-flex">
                  45 min
                </Chip>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Weekly grid */}
      <Card>
        <SubHeader
          title="Weekly Overview"
          subtitle="Full week at a glance — scroll horizontally on mobile"
          right={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-2.5 py-1 font-[family-name:var(--font-dm)] text-[11px] font-bold text-brand">
              <CalendarDays className="h-3 w-3" /> Week of Mar 24
            </span>
          }
        />
        <TimetableGrid
          grid={STUDENT_GRID}
          legend={
            <TimetableLegend
              items={[
                { label: "Core", tone: "brand" },
                { label: "Science", tone: "info" },
                { label: "Lab Work", tone: "warning" },
                { label: "Language / Arts", tone: "success" },
                { label: "Other", tone: "muted" },
              ]}
            />
          }
        />
      </Card>
    </PageWrap>
  );
}
