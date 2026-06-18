import { Download, FileText, FileBadge, Award, Receipt, FileCheck2, ScrollText } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader, Panel } from "../primitives";

const DOCS = [
  { icon: FileBadge, name: "Bonafide Certificate", date: "Issued · Jun 2025", size: "112 KB", color: "#191BDF" },
  { icon: Award, name: "Term 1 Mark Sheet", date: "Issued · Nov 2024", size: "248 KB", color: "#10B981" },
  { icon: Receipt, name: "Fee Receipt — Term 2", date: "Issued · Jan 2025", size: "84 KB", color: "#F59E0B" },
  { icon: FileCheck2, name: "Identity Card", date: "Issued · Jun 2024", size: "320 KB", color: "#8B5CF6" },
  { icon: ScrollText, name: "Conduct Certificate", date: "Issued · May 2024", size: "96 KB", color: "#06B6D4" },
  { icon: FileText, name: "Annual Report Card 2023-24", date: "Issued · Apr 2024", size: "412 KB", color: "#EF4444" },
];

export function DocumentsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="My Documents" subtitle="Download official certificates and records" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOCS.map((d, i) => (
          <div
            key={d.name}
            className="rounded-2xl border border-[rgba(229,228,224,0.5)] bg-surface p-5 shadow-[var(--shadow-neumorphic)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            style={{ animation: "var(--animate-stagger-in)", animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `${d.color}1A`, color: d.color }}>
                <d.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-ink">{d.name}</div>
                <div className="text-[11px] text-muted-foreground">{d.date} · {d.size}</div>
              </div>
            </div>
            <button
              onClick={() => toast.success(`Downloading ${d.name}`)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-bg px-4 py-2.5 font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink shadow-[var(--shadow-neumorphic-sm)] transition-all hover:bg-brand hover:text-white hover:shadow-[var(--shadow-brand-glow)]"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        ))}
      </div>
      <Panel>
        <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
          <FileText className="h-4 w-4 text-brand" />
          Need another certificate? Request one from the <span className="font-bold text-ink">School Admin office</span>.
        </div>
      </Panel>
    </div>
  );
}
