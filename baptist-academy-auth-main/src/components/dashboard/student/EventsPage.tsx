import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, CalendarPlus } from "lucide-react";
import { Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { EVENTS, EVENT_META, type EventType } from "@/lib/student-mock";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function EventsPage() {
  const [view, setView] = useState<"month" | "list">("month");
  const [active, setActive] = useState<Record<EventType, boolean>>({ exam: true, holiday: true, school: true, ptm: true, sports: true, cultural: true });

  const visible = EVENTS.filter((e) => active[e.type]);

  return (
    <PageWrap>
      <PageHeader
        title="Events & Calendar"
        subtitle="Exam schedule, school events, and holidays"
        right={
          <div className="inline-flex rounded-2xl bg-bg p-1 shadow-[var(--shadow-neumorphic-sm)]">
            {(["month", "list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`rounded-xl px-3 py-1.5 text-[12px] font-bold capitalize ${view === v ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground"}`}>{v}</button>
            ))}
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        {(Object.keys(EVENT_META) as EventType[]).map((t) => {
          const m = EVENT_META[t]; const on = active[t];
          return (
            <button key={t} onClick={() => setActive({ ...active, [t]: !on })}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all ${on ? "border-transparent" : "border-border bg-bg text-muted-foreground"}`}
              style={on ? { background: m.bg, color: m.color, borderColor: `${m.color}55` } : undefined}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: m.color }} /> {m.label}
            </button>
          );
        })}
      </div>

      {view === "month" ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          <Card className="rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>March 2025</h3>
              <div className="flex items-center gap-2">
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)]"><ChevronLeft className="h-4 w-4" /></button>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)]"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {DAY_LABELS.map((d) => (<div key={d} className="pb-2 text-center font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase text-muted-foreground">{d}</div>))}
              {Array(6).fill(0).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const dayEvents = visible.filter((e) => e.day === d && e.month === "Mar");
                const isToday = d === 15;
                return (
                  <div key={d} className={`min-h-[60px] rounded-xl border p-1 text-[11px] sm:min-h-[80px] sm:p-1.5 ${isToday ? "border-brand bg-brand-light/40 ring-1 ring-brand" : "border-border bg-surface"}`}>
                    <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold text-ink">{d}</div>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map((e) => (
                        <div key={e.id} className="truncate rounded px-1 py-0.5 text-[9px] font-bold" style={{ background: EVENT_META[e.type].bg, color: EVENT_META[e.type].color }}>{e.title}</div>
                      ))}
                      {dayEvents.length > 2 && <div className="text-[9px] text-muted-foreground">+{dayEvents.length - 2}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div>
            <SubHeader title="Upcoming" subtitle="Next 30 days" />
            <div className="space-y-2">
              {visible.slice(0, 6).map((e) => {
                const m = EVENT_META[e.type];
                return (
                  <Card key={e.id} className="!p-3" style={{ borderLeft: `4px solid ${m.color}` }}>
                    <div className="text-[13px] font-bold text-ink">{e.title}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{e.date} {e.time && `· ${e.time}`}</div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <Chip color={m.color} bg={m.bg} size="sm">{m.label}</Chip>
                      <span className="font-[family-name:var(--font-dm)] text-[10px] font-bold" style={{ color: m.color }}>in {e.day - 15} days</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {["March 2025", "April 2025"].map((mo) => (
            <div key={mo}>
              <h3 className="mb-3 text-[16px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{mo}</h3>
              <div className="space-y-2">
                {visible.filter((e) => e.month === mo.split(" ")[0].slice(0, 3)).map((e) => {
                  const m = EVENT_META[e.type];
                  return (
                    <Card key={e.id} className="flex items-center gap-4">
                      <div className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-bg shadow-[var(--shadow-neumorphic-inset)]">
                        <span className="text-[22px] font-extrabold leading-none" style={{ fontFamily: "var(--font-display)", color: m.color }}>{e.day}</span>
                        <span className="font-[family-name:var(--font-dm)] text-[9px] font-bold uppercase text-muted-foreground">{e.month}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{e.title}</div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                          <Chip color={m.color} bg={m.bg} size="sm">{m.label}</Chip>
                          {e.time && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>}
                          {e.venue && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.venue}</span>}
                        </div>
                      </div>
                      <GhostBtn icon={CalendarPlus}>Add</GhostBtn>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <Card padded={false}>
        <div className="p-5"><SubHeader title="Exam Schedule" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left">
            <thead><tr className="border-b-2 border-border bg-bg">
              {["Subject", "Date", "Day", "Time", "Duration", "Hall", "Invigilator"].map((h) => (<th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase text-muted-foreground">{h}</th>))}
            </tr></thead>
            <tbody>
              {EVENTS.filter((e) => e.type === "exam").map((e, i) => (
                <tr key={e.id} className="border-b border-[rgba(229,228,224,0.4)]" style={{ background: i === 0 ? "var(--color-brand-light)" : undefined, borderLeft: i === 0 ? "3px solid #191BDF" : undefined }}>
                  <td className="px-4 py-3 text-[13px] font-semibold text-ink">{e.title.replace("Unit Test II — ", "")}</td>
                  <td className="px-4 py-3 text-[13px] text-ink">{e.date}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground">{["Tue", "Wed", "Fri", "Mon"][i % 4]}</td>
                  <td className="px-4 py-3 text-[13px] text-ink">{e.time}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground">2 hr</td>
                  <td className="px-4 py-3 text-[13px] text-ink">{e.venue}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground">Mr. Iyer</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}
