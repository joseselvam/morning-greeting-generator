import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Search, ArrowRight, FileText, Users, Calendar, BookOpen, Bell, GraduationCap } from "lucide-react";
import { PageWrap, PageHeader, Card, SubHeader, Chip } from "./student/_shared";
import type { RoleId } from "@/lib/roles";

type Result = { title: string; subtitle: string; section: string; icon: any; color: string };

const ALL: Result[] = [
  { title: "Mathematics — Mid-term Marks", subtitle: "View your subject scores and ranks", section: "marks", icon: FileText, color: "#191BDF" },
  { title: "Attendance Calendar", subtitle: "Monthly attendance and leave history", section: "attendance", icon: Calendar, color: "#10B981" },
  { title: "Assignments — Pending", subtitle: "3 active assignments due this week", section: "assignments", icon: BookOpen, color: "#F59E0B" },
  { title: "Today's Homework", subtitle: "Tasks to complete by tomorrow", section: "homework", icon: BookOpen, color: "#3B82F6" },
  { title: "Class Rank Holders", subtitle: "Top 10 leaderboard", section: "rank-holders", icon: GraduationCap, color: "#8B5CF6" },
  { title: "Academic Progress", subtitle: "GPA, skills, term progress charts", section: "progress", icon: FileText, color: "#06B6D4" },
  { title: "Study Materials", subtitle: "Notes, PDFs and resource library", section: "study-materials", icon: BookOpen, color: "#EC4899" },
  { title: "Fee Status & Payments", subtitle: "Balance, dues and payment history", section: "fee-status", icon: FileText, color: "#10B981" },
  { title: "Teacher Remarks", subtitle: "Conduct and feedback timeline", section: "remarks", icon: Users, color: "#F59E0B" },
  { title: "Upcoming Events", subtitle: "School calendar and exams", section: "events", icon: Calendar, color: "#3B82F6" },
  { title: "Announcements", subtitle: "Pinned notices and circulars", section: "announcements", icon: Bell, color: "#191BDF" },
  { title: "Parent-Teacher Meeting", subtitle: "Next PTM and agenda", section: "parent-meeting", icon: Users, color: "#8B5CF6" },
  { title: "My Profile", subtitle: "Personal details and account info", section: "profile", icon: Users, color: "#191BDF" },
  { title: "Account Settings", subtitle: "Security, notifications, preferences", section: "account-settings", icon: Users, color: "#06B6D4" },
];

const CATEGORIES: { id: string; label: string; sections: string[] }[] = [
  { id: "Academics", label: "Academics", sections: ["marks", "progress", "rank-holders", "study-materials"] },
  { id: "Tasks", label: "Tasks & Homework", sections: ["assignments", "homework"] },
  { id: "School Life", label: "School Life", sections: ["attendance", "events", "announcements", "parent-meeting", "remarks"] },
  { id: "Account", label: "Account & Finance", sections: ["fee-status", "profile", "account-settings"] },
];

export function SearchResultsPage() {
  const { role } = useParams({ strict: false }) as { role?: RoleId };
  const r: RoleId = role ?? "student";
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { q?: string };
  const [q, setQ] = useState(search.q ?? "");

  useEffect(() => { setQ(search.q ?? ""); }, [search.q]);

  const grouped = useMemo(() => {
    const term = q.trim().toLowerCase();
    const matched = term
      ? ALL.filter((r) => `${r.title} ${r.subtitle} ${r.section}`.toLowerCase().includes(term))
      : ALL;
    return CATEGORIES.map((c) => ({ ...c, items: matched.filter((m) => c.sections.includes(m.section)) }))
      .filter((c) => c.items.length > 0);
  }, [q]);

  const total = grouped.reduce((s, c) => s + c.items.length, 0);

  return (
    <PageWrap>
      <PageHeader title="Search" subtitle={q ? `${total} result${total === 1 ? "" : "s"} for "${q}"` : "Find anything across your portal"} />

      <Card>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, sections, settings..."
            className="w-full rounded-2xl border border-border bg-bg py-3.5 pl-12 pr-4 text-base text-ink placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full bg-bg px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] transition-colors hover:text-brand">
              {c.label}
            </a>
          ))}
        </div>
      </Card>

      {grouped.length === 0 ? (
        <Card>
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-brand">
              <Search className="h-8 w-8" />
            </div>
            <div className="text-lg font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>No results found</div>
            <p className="max-w-sm text-sm text-muted-foreground">Try different keywords or browse from the sidebar.</p>
          </div>
        </Card>
      ) : (
        grouped.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <Card>
              <SubHeader title={cat.label} subtitle={`${cat.items.length} item${cat.items.length === 1 ? "" : "s"}`} />
              <ul className="space-y-2">
                {cat.items.map((it) => (
                  <li key={it.section}>
                    <button
                      onClick={() => navigate({ to: "/dashboard/$role/$section", params: { role: r, section: it.section } })}
                      className="group flex w-full items-center gap-3 rounded-xl border border-border bg-bg p-3 text-left transition-all hover:-translate-y-px hover:border-brand-light hover:shadow-[var(--shadow-neumorphic-sm)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${it.color}1A`, color: it.color }}>
                        <it.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold text-ink">{it.title}</span>
                          <Chip color={it.color} size="sm">{cat.label}</Chip>
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{it.subtitle}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))
      )}
    </PageWrap>
  );
}
