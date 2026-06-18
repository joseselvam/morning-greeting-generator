import { useMemo, useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, Info, Sparkles, Search, Trash2, CheckCheck, Filter } from "lucide-react";
import { toast } from "sonner";
import { PageWrap, PageHeader, Card, Chip, BrandBtn, GhostBtn } from "./student/_shared";
import { NOTIFICATIONS } from "@/lib/mock-data";

type Color = "brand" | "success" | "warning" | "info";
const COLOR_HEX: Record<Color, string> = { brand: "#191BDF", success: "#10B981", warning: "#F59E0B", info: "#3B82F6" };
const ICONS: Record<Color, any> = { brand: Sparkles, success: CheckCircle2, warning: AlertTriangle, info: Info };
const LABELS: Record<Color, string> = { brand: "Updates", success: "Success", warning: "Action Needed", info: "Info" };

const EXTRA = [
  { title: "Timetable updated", subtitle: "Period 5 moved to Lab 2", time: "3d", unread: false, color: "info" as const },
  { title: "Exam results published", subtitle: "Mid-term · Class 11-A", time: "4d", unread: false, color: "brand" as const },
  { title: "Attendance below 75%", subtitle: "Rohan Mehta · Class 9-B", time: "5d", unread: false, color: "warning" as const },
  { title: "Library book overdue", subtitle: "Return by Friday", time: "1w", unread: true, color: "warning" as const },
  { title: "School holiday confirmed", subtitle: "Tamil New Year · 14 Apr", time: "1w", unread: false, color: "success" as const },
];

export function NotificationsCenterPage() {
  const [items, setItems] = useState([...NOTIFICATIONS, ...EXTRA]);
  const [filter, setFilter] = useState<"all" | "unread" | Color>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return items.filter((n) => {
      if (filter === "unread" && !n.unread) return false;
      if (filter !== "all" && filter !== "unread" && n.color !== filter) return false;
      if (q && !(`${n.title} ${n.subtitle}`.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [items, filter, q]);

  const unread = items.filter((n) => n.unread).length;

  const markAll = () => { setItems((p) => p.map((n) => ({ ...n, unread: false }))); toast.success("All marked as read"); };
  const clearAll = () => { setItems([]); toast("All notifications cleared"); };
  const toggleRead = (i: number) => setItems((p) => p.map((n, idx) => idx === i ? { ...n, unread: !n.unread } : n));

  const tabs: { id: typeof filter; label: string }[] = [
    { id: "all", label: `All (${items.length})` },
    { id: "unread", label: `Unread (${unread})` },
    { id: "brand", label: "Updates" },
    { id: "success", label: "Success" },
    { id: "warning", label: "Action" },
    { id: "info", label: "Info" },
  ];

  return (
    <PageWrap>
      <PageHeader
        title="Notifications"
        subtitle={`You have ${unread} unread notification${unread === 1 ? "" : "s"}`}
        right={
          <div className="flex gap-2">
            <GhostBtn icon={CheckCheck} onClick={markAll}>Mark all read</GhostBtn>
            <BrandBtn icon={Trash2} onClick={clearAll}>Clear all</BrandBtn>
          </div>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search notifications..."
              className="w-full rounded-xl border border-border bg-bg py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Filter
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                filter === t.id ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Card>

      <Card padded={false}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-brand">
              <Bell className="h-8 w-8" />
            </div>
            <div className="text-lg font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>You're all caught up</div>
            <p className="max-w-sm text-sm text-muted-foreground">No notifications match the current filter. Try a different category.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((n, i) => {
              const c = n.color as Color;
              const Icon = ICONS[c];
              return (
                <li
                  key={i}
                  onClick={() => toggleRead(items.indexOf(n))}
                  className={`group flex cursor-pointer items-start gap-3 px-4 py-4 transition-colors hover:bg-brand-light/30 sm:gap-4 sm:px-6 ${n.unread ? "bg-brand-light/10" : ""}`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${COLOR_HEX[c]}1A`, color: COLOR_HEX[c] }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-bold text-ink">{n.title}</div>
                      <Chip color={COLOR_HEX[c]} size="sm">{LABELS[c]}</Chip>
                      {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">{n.subtitle}</div>
                  </div>
                  <div className="shrink-0 text-[11px] text-muted-foreground sm:text-xs">{n.time}</div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </PageWrap>
  );
}
