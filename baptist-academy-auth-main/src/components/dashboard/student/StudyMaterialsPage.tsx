import { useMemo, useState } from "react";
import {
  Search, LayoutGrid, List, Clock, FileText, Presentation, Image as ImageIcon,
  Video, Archive, Eye, Download,
} from "lucide-react";
import { Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { STUDY_FILES, SUBJECTS, subjectByKey, type FileType, type SubjectKey } from "@/lib/student-mock";

const FT_META: Record<FileType, { color: string; bg: string; icon: typeof FileText }> = {
  PDF: { color: "#EF4444", bg: "rgba(239,68,68,0.10)", icon: FileText },
  DOC: { color: "#3B82F6", bg: "rgba(59,130,246,0.10)", icon: FileText },
  PPT: { color: "#F59E0B", bg: "rgba(245,158,11,0.10)", icon: Presentation },
  IMG: { color: "#10B981", bg: "rgba(16,185,129,0.10)", icon: ImageIcon },
  VID: { color: "#8B5CF6", bg: "rgba(139,92,246,0.10)", icon: Video },
  ZIP: { color: "#6B7280", bg: "rgba(107,114,128,0.10)", icon: Archive },
};

export function StudyMaterialsPage() {
  const [filter, setFilter] = useState<"all" | SubjectKey>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => STUDY_FILES.filter((f) => {
    if (filter !== "all" && f.subject !== filter) return false;
    if (q && !f.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [filter, q]);

  const recent = STUDY_FILES.filter((f) => f.isNew);

  return (
    <PageWrap>
      <PageHeader
        title="Study Materials"
        subtitle="Notes and resources uploaded by your teachers"
        right={
          <div className="inline-flex items-center gap-2 rounded-full bg-bg px-3 py-2 shadow-[var(--shadow-neumorphic-sm)] sm:w-[260px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search materials..." className="w-full bg-transparent text-[13px] focus:outline-none" />
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-bg p-1 shadow-[var(--shadow-neumorphic-sm)]">
          {(["all", ...SUBJECTS.map((s) => s.key)] as Array<"all" | SubjectKey>).map((k) => {
            const active = filter === k;
            const label = k === "all" ? "All" : subjectByKey(k as SubjectKey).name;
            return (
              <button key={k} onClick={() => setFilter(k)} className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-[12px] font-bold transition-all ${active ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground"}`}>{label}</button>
            );
          })}
        </div>
        <div className="inline-flex rounded-xl bg-bg p-1 shadow-[var(--shadow-neumorphic-sm)]">
          <button onClick={() => setView("grid")} className={`flex h-8 w-8 items-center justify-center rounded-lg ${view === "grid" ? "bg-brand text-white" : "text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setView("list")} className={`flex h-8 w-8 items-center justify-center rounded-lg ${view === "list" ? "bg-brand text-white" : "text-muted-foreground"}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {recent.length > 0 && (
        <div>
          <SubHeader title="Recently Added" right={<span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground"><Clock className="h-3.5 w-3.5" /> last 7 days</span>} />
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {recent.map((f) => <FileCard key={f.id} f={f} highlight />)}
          </div>
        </div>
      )}

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((f) => <FileCard key={f.id} f={f} />)}
        </div>
      ) : (
        <Card padded={false}>
          <div className="divide-y divide-border">
            {filtered.map((f) => {
              const sub = subjectByKey(f.subject);
              const ft = FT_META[f.type];
              return (
                <div key={f.id} className="flex items-center gap-3 p-4 hover:bg-brand-light/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: ft.bg }}><ft.icon className="h-5 w-5" style={{ color: ft.color }} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-ink">{f.name}</div>
                    <div className="text-[11px] text-muted-foreground">{sub.name} · {f.uploadedBy} · {f.date}</div>
                  </div>
                  <Chip color={ft.color} bg={ft.bg} size="sm">{f.type}</Chip>
                  <span className="hidden text-[11px] text-muted-foreground sm:inline">{f.size}</span>
                  <GhostBtn icon={Download}>Download</GhostBtn>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </PageWrap>
  );
}

function FileCard({ f, highlight }: { f: typeof STUDY_FILES[number]; highlight?: boolean }) {
  const sub = subjectByKey(f.subject);
  const ft = FT_META[f.type];
  return (
    <div className={`relative w-full min-w-[240px] shrink-0 rounded-2xl border bg-surface p-5 shadow-[var(--shadow-neumorphic-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${highlight ? "border-brand-light" : "border-[rgba(229,228,224,0.4)]"}`}>
      {f.isNew && <span className="absolute right-3 top-3 rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold uppercase text-white">New</span>}
      <div className="absolute right-3 top-12"><Chip color={sub.color} bg={sub.bg} size="sm" className="!uppercase">{sub.name.split(" ")[0]}</Chip></div>
      <div className="flex h-20 items-center justify-center rounded-xl" style={{ background: ft.bg }}><ft.icon className="h-10 w-10" style={{ color: ft.color }} /></div>
      <div className="mt-3 line-clamp-2 font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{f.name}</div>
      <div className="mt-1 text-[11px] text-muted-foreground">{f.uploadedBy} · {f.date}</div>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-bg px-2 py-0.5 font-[family-name:var(--font-dm)] text-[10px] font-bold text-muted-foreground shadow-[var(--shadow-neumorphic-sm)]">{f.size}</span>
        <Chip color={ft.color} bg={ft.bg} size="sm">{f.type}</Chip>
      </div>
      <div className="mt-3 flex gap-2">
        <GhostBtn icon={Eye} className="flex-1">Preview</GhostBtn>
        <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-3 py-2 text-[12px] font-bold text-white shadow-[var(--shadow-brand-glow)]"><Download className="h-4 w-4" /> Download</button>
      </div>
    </div>
  );
}
