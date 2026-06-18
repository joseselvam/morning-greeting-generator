import { useMemo, useState } from "react";
import { Search, Pin, CalendarDays, Eye, X, CheckCircle2 } from "lucide-react";
import { Avatar, Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { ANNOUNCEMENTS, ANN_META, type Announcement, type AnnType } from "@/lib/student-mock";

export function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [filter, setFilter] = useState<"all" | AnnType>("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Announcement | null>(null);

  const visible = useMemo(() => items.filter((a) => {
    if (filter !== "all" && a.type !== filter) return false;
    if (q && !(a.title + a.preview).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [items, filter, q]);

  const pinned = items.filter((a) => a.pinned);
  const feed = visible.filter((a) => !a.pinned);
  const unread = items.filter((a) => a.unread).length;

  return (
    <PageWrap>
      <PageHeader
        title="Announcements"
        subtitle="Stay updated with school notices and circulars"
        right={
          <div className="flex items-center gap-3">
            {unread > 0 && <Chip color="#DC2626" bg="rgba(239,68,68,0.18)">{unread} unread</Chip>}
            <button onClick={() => setItems(items.map((a) => ({ ...a, unread: false })))} className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand hover:underline">Mark all as read</button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-bg p-1 shadow-[var(--shadow-neumorphic-sm)]">
          {(["all", ...(Object.keys(ANN_META) as AnnType[])] as Array<"all" | AnnType>).map((k) => {
            const meta = k === "all" ? null : ANN_META[k as AnnType];
            const active = filter === k;
            return (
              <button key={k} onClick={() => setFilter(k)} className="whitespace-nowrap rounded-xl px-3 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all"
                style={active ? (meta ? { background: meta.color, color: "#fff", boxShadow: `0 4px 16px ${meta.color}55` } : { background: "#191BDF", color: "#fff", boxShadow: "var(--shadow-brand-glow)" }) : { color: "#6B7280" }}
              >{k === "all" ? "All" : ANN_META[k as AnnType].label}</button>
            );
          })}
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-bg px-3 py-2 shadow-[var(--shadow-neumorphic-sm)] sm:w-[240px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search announcements..." className="w-full bg-transparent text-[13px] focus:outline-none" />
        </div>
      </div>

      {pinned.length > 0 && (
        <div>
          <SubHeader title="Pinned" right={<Pin className="h-4 w-4 text-brand" />} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pinned.map((a) => (
              <div key={a.id} className="rounded-2xl p-5 text-white shadow-[var(--shadow-brand-glow)]" style={{ background: "linear-gradient(135deg, #191BDF, #1316B0)" }}>
                <div className="flex items-center justify-between">
                  <Pin className="h-3.5 w-3.5 opacity-70" />
                  <Chip color="#fff" bg="rgba(255,255,255,0.18)" size="sm">{ANN_META[a.type].label}</Chip>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-dm)] text-[15px] font-bold">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-[12px] opacity-80">{a.preview}</p>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="opacity-60">{a.date}</span>
                  <button onClick={() => setActive(a)} className="underline">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <SubHeader title="All Announcements" />
        <div className="space-y-3">
          {feed.map((a) => {
            const m = ANN_META[a.type];
            return (
              <Card key={a.id} className={`relative transition-all hover:translate-x-1 ${a.unread ? "!bg-[rgba(25,27,223,0.025)]" : ""}`} style={{ borderLeft: `4px solid ${m.color}` }}>
                {a.unread && <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand" />}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip color={m.color} bg={m.bg} size="sm">{m.label}</Chip>
                    {a.type === "urgent" && <Chip color="#DC2626" bg="rgba(239,68,68,0.25)" size="sm">URGENT</Chip>}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground"><CalendarDays className="h-3 w-3" /> {a.date}</span>
                </div>
                <h4 className={`mt-2 text-[15px] text-ink ${a.unread ? "font-bold" : "font-semibold"}`} style={{ fontFamily: "var(--font-dm)" }}>{a.title}</h4>
                <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{a.preview}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name={a.postedBy} size={24} />
                    <span className="text-[12px] text-ink">{a.postedBy}</span>
                    {a.readBy && <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex"><Eye className="h-3 w-3" /> {a.readBy}</span>}
                  </div>
                  <button onClick={() => setActive(a)} className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-brand hover:underline">Read More</button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center" onClick={() => setActive(null)}>
          <div className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Chip color={ANN_META[active.type].color} bg={ANN_META[active.type].bg}>{ANN_META[active.type].label}</Chip>
                {active.type === "urgent" && <Chip color="#DC2626" bg="rgba(239,68,68,0.25)">URGENT</Chip>}
              </div>
              <button onClick={() => setActive(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)]"><X className="h-4 w-4" /></button>
            </div>
            <h2 className="mt-3 text-[24px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{active.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Avatar name={active.postedBy} size={28} /> {active.postedBy}</span>
              <span>· {active.date}</span>
              <Chip color="#191BDF" bg="var(--color-brand-light)" size="sm">All Students</Chip>
            </div>
            <hr className="my-4 border-border" />
            <p className="text-[14px] leading-7 text-ink">{active.body}</p>
            {active.unread && (
              <div className="mt-5">
                <button onClick={() => { setItems(items.map((a) => a.id === active.id ? { ...a, unread: false } : a)); setActive({ ...active, unread: false }); }}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-[13px] font-bold text-emerald-700 shadow-[var(--shadow-neumorphic-sm)]">
                  <CheckCircle2 className="h-4 w-4" /> Mark as Read
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrap>
  );
}
