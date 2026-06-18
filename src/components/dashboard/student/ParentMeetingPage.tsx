import { useState } from "react";
import { CalendarClock, CheckCircle2, XCircle, MapPin, Video, Bell, ExternalLink, X } from "lucide-react";
import { Avatar, BrandBtn, Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { MEETINGS, type Meeting, type MeetStatus } from "@/lib/student-mock";

const STATUS_META: Record<MeetStatus, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Upcoming:  { color: "#191BDF", bg: "rgba(25,27,223,0.12)",  icon: CalendarClock },
  Completed: { color: "#10B981", bg: "rgba(16,185,129,0.18)", icon: CheckCircle2 },
  Cancelled: { color: "#EF4444", bg: "rgba(239,68,68,0.18)",  icon: XCircle },
};

export function ParentMeetingPage() {
  const [filter, setFilter] = useState<"All" | MeetStatus>("All");
  const [active, setActive] = useState<Meeting | null>(null);

  const next = MEETINGS.find((m) => m.status === "Upcoming");
  const visible = filter === "All" ? MEETINGS : MEETINGS.filter((m) => m.status === filter);

  return (
    <PageWrap>
      <PageHeader title="Parent Meetings" subtitle="Scheduled parent-teacher meeting notifications" />

      {next && (
        <div className="rounded-3xl p-6 text-white shadow-[var(--shadow-brand-glow-strong)] sm:p-8" style={{ background: "linear-gradient(135deg, #191BDF, #1316B0)" }}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider opacity-70">Next Meeting</div>
              <div className="mt-1 text-[24px] font-bold sm:text-[28px]" style={{ fontFamily: "var(--font-display)" }}>{next.date}</div>
              <div className="mt-0.5 text-[14px] opacity-80">{next.time}</div>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={next.teacher} size={44} bg="rgba(255,255,255,0.18)" fg="#fff" />
                <div>
                  <div className="text-[14px] font-semibold">{next.teacher}</div>
                  <div className="text-[12px] opacity-70">{next.subject}</div>
                </div>
              </div>
              <Chip className="mt-4" color="#fff" bg="rgba(255,255,255,0.18)">
                {next.mode === "online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />} {next.location}
              </Chip>
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase opacity-70">Meeting in</div>
                <div className="mt-1 text-[22px] font-bold" style={{ fontFamily: "var(--font-display)" }}>2 Days 4 Hours</div>
                <div className="text-[12px] opacity-60">{next.date} · {next.time}</div>
              </div>
              <button onClick={() => setActive(next)} className="rounded-xl bg-white px-4 py-2.5 font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand hover:scale-[1.02]">View Details</button>
              <button className="rounded-xl border border-white/40 px-4 py-2.5 font-[family-name:var(--font-dm)] text-[13px] font-bold text-white">{next.mode === "online" ? "Join Link" : "Get Directions"}</button>
            </div>
          </div>
        </div>
      )}

      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl bg-bg p-1.5 shadow-[var(--shadow-neumorphic-sm)]">
        {(["All", "Upcoming", "Completed", "Cancelled"] as const).map((t) => (
          <button key={t} onClick={() => setFilter(t)} className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-[12px] font-bold ${filter === t ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((m) => {
          const sm = STATUS_META[m.status];
          return (
            <Card key={m.id} className="transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-neumorphic)]">
              <div className="flex items-center justify-between">
                <Chip color={sm.color} bg={sm.bg}><sm.icon className="h-3 w-3" /> {m.status}</Chip>
                <span className="inline-flex items-center gap-1 text-[12px] text-muted-foreground">
                  {m.mode === "online" ? <Video className="h-3.5 w-3.5 text-brand" /> : <MapPin className="h-3.5 w-3.5" />} {m.mode === "online" ? "Online" : "In-Person"}
                </span>
              </div>
              <div className="mt-3 rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-inset)]">
                <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{m.date}</div>
                <div className="mt-0.5 text-[13px] text-muted-foreground">{m.time}</div>
              </div>
              <div className="mt-3 font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">With</div>
              <div className="mt-1 flex items-center gap-3">
                <Avatar name={m.teacher} />
                <div>
                  <div className="text-[14px] font-semibold text-ink">{m.teacher}</div>
                  <div className="text-[12px] text-muted-foreground">{m.subject}</div>
                </div>
              </div>
              <div className="mt-3 font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Agenda</div>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[12px] text-ink">
                {m.agenda.slice(0, 2).map((a, i) => <li key={i}>{a}</li>)}
                {m.agenda.length > 2 && <li className="text-muted-foreground">+{m.agenda.length - 2} more...</li>}
              </ul>
              {m.summary && <div className="mt-3 rounded-xl border-l-4 border-brand bg-bg p-3 text-[12px] text-ink shadow-[var(--shadow-neumorphic-inset)]">{m.summary}</div>}
              {m.cancelReason && <div className="mt-3 text-[11px] text-red-600">{m.cancelReason}</div>}
              <div className="mt-4 flex gap-2">
                <GhostBtn className="flex-1" onClick={() => setActive(m)}>View Details</GhostBtn>
                {m.status === "Upcoming" && <BrandBtn className="flex-1" icon={Bell} size="sm">Notify Parent</BrandBtn>}
              </div>
            </Card>
          );
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center" onClick={() => setActive(null)}>
          <div className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <Chip color={STATUS_META[active.status].color} bg={STATUS_META[active.status].bg}>{active.status}</Chip>
              <button onClick={() => setActive(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)]"><X className="h-4 w-4" /></button>
            </div>
            <h2 className="mt-3 text-[20px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>Parent-Teacher Meeting</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Meta label="Date" value={active.date} />
              <Meta label="Time" value={active.time} />
              <Meta label="Mode" value={active.mode === "online" ? "Online" : "In-Person"} />
              <Meta label="Teacher" value={active.teacher} />
            </div>
            {active.mode === "online" ? (
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-[family-name:var(--font-dm)] text-[14px] font-bold text-white shadow-[var(--shadow-brand-glow)]"><ExternalLink className="h-4 w-4" /> Join Google Meet</button>
            ) : (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-inset)]">
                <span className="inline-flex items-center gap-2 text-[13px] text-ink"><MapPin className="h-4 w-4 text-brand" /> {active.location}</span>
                <GhostBtn>Get Directions</GhostBtn>
              </div>
            )}
            <div className="mt-5">
              <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Agenda</div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-[14px] text-ink">
                {active.agenda.map((a, i) => <li key={i}>{a}</li>)}
              </ol>
            </div>
            {active.summary && (
              <div className="mt-5">
                <div className="font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Meeting Notes</div>
                <div className="mt-2 rounded-xl border-l-4 border-brand bg-bg p-4 text-[14px] italic text-ink shadow-[var(--shadow-neumorphic-inset)]">
                  “{active.summary}”
                  <div className="mt-2 not-italic font-[family-name:var(--font-dm)] text-[11px] font-bold text-muted-foreground">— {active.teacher}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrap>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-inset)]">
      <div className="font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-[13px] font-semibold text-ink">{value}</div>
    </div>
  );
}
