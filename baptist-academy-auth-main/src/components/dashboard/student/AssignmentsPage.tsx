import { useMemo, useState } from "react";
import {
  LayoutGrid, List, CalendarClock, User, ChevronDown, X, Upload, CheckCircle2,
} from "lucide-react";
import { BrandBtn, Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { ASSIGNMENTS, SUBJECTS, subjectByKey, type Assignment, type AssignmentStatus } from "@/lib/student-mock";

const STATUS_META: Record<AssignmentStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "#F59E0B" },
  submitted: { label: "Submitted", color: "#10B981" },
  overdue: { label: "Overdue", color: "#EF4444" },
};

export function AssignmentsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [active, setActive] = useState<Assignment | null>(null);

  const filtered = useMemo(
    () => (subjectFilter === "all" ? ASSIGNMENTS : ASSIGNMENTS.filter((a) => a.subject === subjectFilter)),
    [subjectFilter]
  );
  const counts = {
    pending: ASSIGNMENTS.filter((a) => a.status === "pending").length,
    submitted: ASSIGNMENTS.filter((a) => a.status === "submitted").length,
    overdue: ASSIGNMENTS.filter((a) => a.status === "overdue").length,
  };

  return (
    <PageWrap>
      <PageHeader
        title="Assignments"
        subtitle="Manage and track all your assignments"
        right={
          <div className="flex flex-wrap gap-2">
            <Chip color="#B45309" bg="rgba(245,158,11,0.18)">{counts.pending} Pending</Chip>
            <Chip color="#059669" bg="rgba(16,185,129,0.18)">{counts.submitted} Submitted</Chip>
            <Chip color="#DC2626" bg="rgba(239,68,68,0.18)">{counts.overdue} Overdue</Chip>
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl bg-bg p-1 shadow-[var(--shadow-neumorphic-sm)]">
          <button onClick={() => setView("kanban")} className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12px] font-bold transition-all ${view === "kanban" ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground"}`}><LayoutGrid className="h-4 w-4" /> Kanban</button>
          <button onClick={() => setView("list")} className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[12px] font-bold transition-all ${view === "list" ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "text-muted-foreground"}`}><List className="h-4 w-4" /> List</button>
        </div>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-xl border border-border bg-bg px-3 py-2 text-[12px] font-semibold shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none"
        >
          <option value="all">All Subjects</option>
          {SUBJECTS.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
        </select>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          {(["pending", "submitted", "overdue"] as AssignmentStatus[]).map((st) => {
            const list = filtered.filter((a) => a.status === st);
            const meta = STATUS_META[st];
            return (
              <div key={st} className="min-h-[400px] rounded-2xl border border-[rgba(229,228,224,0.6)] p-4" style={{ background: "rgba(248,247,244,0.7)", borderLeft: `4px solid ${meta.color}` }}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color, boxShadow: st === "overdue" ? `0 0 0 4px ${meta.color}33` : "none" }} />
                    <h3 className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{meta.label}</h3>
                  </div>
                  <span className="rounded-full bg-surface px-2.5 py-0.5 font-[family-name:var(--font-dm)] text-[11px] font-bold text-ink shadow-[var(--shadow-neumorphic-sm)]">{list.length}</span>
                </div>
                <div className="space-y-3">
                  {list.map((a) => <KanbanCard key={a.id} a={a} onOpen={() => setActive(a)} />)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => {
            const sub = subjectByKey(a.subject);
            const meta = STATUS_META[a.status];
            return (
              <Card key={a.id} className="transition-all hover:translate-x-1 hover:bg-brand-light/30" style={{ borderLeft: `4px solid ${meta.color}` }}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Chip color={sub.color} bg={sub.bg} size="sm" className="!uppercase">{sub.name}</Chip>
                  <div className="flex-1">
                    <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{a.title}</div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground line-clamp-1">{a.description}</div>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {a.due}</span>
                    <Chip color={meta.color} size="sm">{meta.label}</Chip>
                    <GhostBtn onClick={() => setActive(a)}>View</GhostBtn>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {active && <DetailModal a={active} onClose={() => setActive(null)} />}
    </PageWrap>
  );
}

function KanbanCard({ a, onOpen }: { a: Assignment; onOpen: () => void }) {
  const sub = subjectByKey(a.subject);
  const meta = STATUS_META[a.status];
  const priorityColor = a.priority === "high" ? "#EF4444" : a.priority === "medium" ? "#F59E0B" : "#9CA3AF";
  return (
    <div className="rounded-2xl border border-[rgba(229,228,224,0.4)] bg-surface p-4 shadow-[var(--shadow-neumorphic-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-neumorphic)]">
      <div className="flex items-center justify-between">
        <Chip color={sub.color} bg={sub.bg} size="sm" className="!uppercase">{sub.name}</Chip>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: priorityColor, boxShadow: a.status === "overdue" ? `0 0 0 4px ${priorityColor}33` : undefined }} />
      </div>
      <h4 className="mt-2.5 line-clamp-2 font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{a.title}</h4>
      <p className="mt-1 line-clamp-2 text-[12px] text-muted-foreground">{a.description}</p>

      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <CalendarClock className="h-3.5 w-3.5" /> Due: {a.due}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <User className="h-3 w-3" /> {sub.teacher}
      </div>

      <div className="mt-3 flex gap-2">
        {a.status === "pending" && (<><GhostBtn className="flex-1 !text-[11px]" onClick={onOpen}>View</GhostBtn><button className="flex-1 rounded-xl bg-brand px-3 py-1.5 text-[11px] font-bold text-white shadow-[var(--shadow-brand-glow)]">Submit</button></>)}
        {a.status === "submitted" && (<><GhostBtn className="flex-1 !text-[11px]" onClick={onOpen}>View Submission</GhostBtn></>)}
        {a.status === "overdue" && (<><button className="flex-1 rounded-xl bg-danger px-3 py-1.5 text-[11px] font-bold text-white" style={{ background: "#EF4444" }}>Submit Now</button><GhostBtn className="flex-1 !text-[11px]" onClick={onOpen}>Details</GhostBtn></>)}
      </div>
      {a.status === "submitted" && a.marks !== undefined && (
        <div className="mt-2 text-[11px] font-bold text-emerald-600">Scored {a.marks}/{a.max}</div>
      )}
    </div>
  );
}

function DetailModal({ a, onClose }: { a: Assignment; onClose: () => void }) {
  const sub = subjectByKey(a.subject);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Chip color={sub.color} bg={sub.bg} className="!uppercase">{sub.name}</Chip>
            <Chip color="#6B7280">Priority: {a.priority}</Chip>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg shadow-[var(--shadow-neumorphic-sm)]"><X className="h-4 w-4" /></button>
        </div>
        <h2 className="mt-3 text-[22px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{a.title}</h2>

        <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
          <Meta label="Posted by" value={sub.teacher} />
          <Meta label="Posted on" value="01 Mar 2025" />
          <Meta label="Due date" value={a.due} />
          <Meta label="Max marks" value={a.max ? `${a.max}` : "—"} />
        </div>

        <p className="mt-4 text-[14px] leading-7 text-ink">{a.description}</p>

        {a.status !== "submitted" && (
          <div className="mt-5 space-y-3">
            <textarea rows={4} placeholder="Write your answer or notes..." className="w-full rounded-xl border border-border bg-bg p-3 text-[13px] shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:outline-none" />
            <div className="rounded-xl border-2 border-dashed border-border bg-bg p-5 text-center">
              <Upload className="mx-auto h-7 w-7 text-muted-foreground" />
              <div className="mt-2 text-[12px] text-muted-foreground">Drag &amp; drop or click to upload</div>
            </div>
            <BrandBtn className="w-full !py-3">Submit Assignment</BrandBtn>
          </div>
        )}

        {a.status === "submitted" && a.marks !== undefined && (
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Submitted on {a.submittedOn}
            </div>
            <div className="flex items-end gap-3">
              <span className="text-[32px] font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>{a.marks}/{a.max}</span>
              <Chip color="#059669" bg="rgba(16,185,129,0.18)">{Math.round((a.marks / (a.max ?? 1)) * 100)}%</Chip>
            </div>
            <div className="rounded-xl border-l-4 border-brand bg-bg p-4 text-[13px] text-ink shadow-[var(--shadow-neumorphic-inset)]">
              “Well-structured submission with clear reasoning. Watch the calculation on Q12 — minor slip.” — {sub.teacher}
            </div>
          </div>
        )}
      </div>
    </div>
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
