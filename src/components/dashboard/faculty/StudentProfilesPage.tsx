import { useState } from "react";
import { Search, Mail, Phone, BookOpen, TrendingUp, UserCheck, AlertCircle } from "lucide-react";
import { SectionHeader, Panel, ProgressBar } from "../primitives";

const STUDENTS = [
  { id: "BA2024/0118", name: "Arjun Krishnamurthy", class: "Class 11-A", roll: "12", attn: 94, marks: 89, email: "arjun@ba.edu", phone: "+91 98765 43210" },
  { id: "BA2024/0119", name: "Meera Pillai", class: "Class 11-A", roll: "13", attn: 96, marks: 92, email: "meera@ba.edu", phone: "+91 98765 11122" },
  { id: "BA2024/0120", name: "Karthik Rao", class: "Class 11-A", roll: "14", attn: 88, marks: 78, email: "karthik@ba.edu", phone: "+91 98765 33344" },
  { id: "BA2024/0121", name: "Anika Sharma", class: "Class 11-A", roll: "15", attn: 91, marks: 85, email: "anika@ba.edu", phone: "+91 98765 55566" },
  { id: "BA2024/0122", name: "Rohit Menon", class: "Class 11-A", roll: "16", attn: 71, marks: 64, email: "rohit@ba.edu", phone: "+91 98765 77788" },
];

export function StudentProfilesPage() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(STUDENTS[0]);
  const filtered = STUDENTS.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-5">
      <SectionHeader title="Student Profiles" subtitle="View complete academic profiles of your students" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        <Panel className="!p-3">
          <div className="mb-3 flex items-center gap-2 rounded-full px-3 py-2" style={{ background: "#F8F7F4", boxShadow: "var(--shadow-neumorphic-inset)" }}>
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 bg-transparent text-[13px] focus:outline-none" placeholder="Search student..." />
          </div>
          <div className="max-h-[480px] space-y-1.5 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="rounded-xl bg-bg p-6 text-center text-[12px] text-muted-foreground">No students match your search.</div>
            ) : filtered.map((s) => {
              const active = sel.id === s.id;
              return (
                <button key={s.id} onClick={() => setSel(s)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${active ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "bg-bg shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"}`}>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold ${active ? "bg-white/25 text-white" : "bg-brand text-white"}`}>{s.name.split(" ").map((p) => p[0]).join("")}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-[family-name:var(--font-dm)] text-[13px] font-bold">{s.name}</div>
                    <div className={`truncate text-[11px] ${active ? "text-white/80" : "text-muted-foreground"}`}>{s.id}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-start gap-4 border-b border-border pb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-[20px] font-bold text-white shadow-[var(--shadow-brand-glow)]">{sel.name.split(" ").map((p) => p[0]).join("")}</div>
            <div className="flex-1">
              <h3 className="text-[20px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>{sel.name}</h3>
              <div className="text-[12px] text-muted-foreground">{sel.id} · {sel.class} · Roll {sel.roll}</div>
              <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {sel.email}</span>
                <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {sel.phone}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat icon={UserCheck} label="Attendance" value={`${sel.attn}%`} color={sel.attn >= 90 ? "#10B981" : sel.attn >= 75 ? "#191BDF" : "#EF4444"} />
            <Stat icon={TrendingUp} label="Avg. Marks" value={`${sel.marks}%`} color="#191BDF" />
            <Stat icon={AlertCircle} label="Conduct" value={sel.attn < 75 ? "Watch" : "Good"} color={sel.attn < 75 ? "#F59E0B" : "#10B981"} />
          </div>

          <div className="mt-5">
            <div className="mb-2 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Subject-wise Performance</div>
            <div className="space-y-3">
              {[
                { sub: "Mathematics", v: sel.marks + 5 },
                { sub: "Physics", v: sel.marks },
                { sub: "Chemistry", v: sel.marks - 4 },
                { sub: "English", v: sel.marks - 8 },
              ].map((row) => (
                <div key={row.sub}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] text-ink"><BookOpen className="h-3.5 w-3.5 text-brand" /> {row.sub}</span>
                    <span className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-brand">{row.v}%</span>
                  </div>
                  <ProgressBar value={Math.max(0, Math.min(100, row.v))} />
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color }: { icon: typeof Mail; label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-bg p-3 text-center shadow-[var(--shadow-neumorphic-sm)]">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${color}1A`, color }}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-2 text-[18px] font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
