import { CheckCircle2, AlertCircle, CreditCard, FileDown, Clock, Download } from "lucide-react";
import { Card, Chip, GhostBtn, PageHeader, PageWrap, SubHeader } from "./_shared";
import { FEE } from "@/lib/student-mock";

export function FeeStatusPage() {
  const paidPct = Math.round((FEE.paid / FEE.total) * 100);
  return (
    <PageWrap>
      <PageHeader
        title="Fee Status"
        subtitle="Your fee payment summary and history"
        right={<GhostBtn icon={FileDown}>Download Statement</GhostBtn>}
      />

      <div className="rounded-3xl p-6 text-white shadow-[var(--shadow-brand-glow-strong)] sm:p-8" style={{ background: "linear-gradient(135deg, #191BDF, #1316B0)" }}>
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
          <div>
            <div className="font-[family-name:var(--font-dm)] text-[12px] font-bold uppercase tracking-wider opacity-70">Total Annual Fee</div>
            <div className="mt-1 text-[36px] font-extrabold leading-none sm:text-[48px]" style={{ fontFamily: "var(--font-display)" }}>₹{FEE.total.toLocaleString("en-IN")}</div>
            <div className="mt-4 space-y-2 text-[14px]">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> Paid: ₹{FEE.paid.toLocaleString("en-IN")}</div>
              <div className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-amber-300" /> Pending: ₹{FEE.pending.toLocaleString("en-IN")}</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <PaidRing pct={paidPct} />
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-[family-name:var(--font-dm)] text-[14px] font-bold text-brand shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-[1.02] sm:w-auto">
              <CreditCard className="h-4 w-4" /> Pay Now
            </button>
          </div>
        </div>
      </div>

      {FEE.pending > 0 && (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-red-200 border-l-4 border-l-red-500 bg-red-50/60 p-4 sm:flex-row sm:items-center sm:p-5">
          <AlertCircle className="h-6 w-6 shrink-0 text-red-500" />
          <div className="flex-1">
            <div className="font-[family-name:var(--font-dm)] text-[14px] font-bold text-red-600">Payment Due</div>
            <div className="text-[13px] text-ink">₹{FEE.pending.toLocaleString("en-IN")} pending — Due by 31 March 2025</div>
            <div className="text-[12px] text-muted-foreground">Late fee of ₹500/month will be applied after due date</div>
          </div>
          <button className="rounded-xl bg-brand px-4 py-2 text-[12px] font-bold text-white shadow-[var(--shadow-brand-glow)]">Pay Now</button>
        </div>
      )}

      <div>
        <SubHeader title="Fee Breakdown" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {FEE.categories.map((c) => {
            const meta = { paid: { c: "#10B981", bg: "rgba(16,185,129,0.18)", label: "Paid" }, pending: { c: "#EF4444", bg: "rgba(239,68,68,0.18)", label: "Pending" }, partial: { c: "#F59E0B", bg: "rgba(245,158,11,0.18)", label: "Partial" } }[c.status];
            return (
              <Card key={c.name}>
                <div className="flex items-start justify-between">
                  <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{c.name}</div>
                  <Chip color={meta.c} bg={meta.bg} size="sm">{meta.label}</Chip>
                </div>
                <div className="mt-2 text-[20px] font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>₹{c.amount.toLocaleString("en-IN")}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  {c.status === "paid" ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Clock className="h-3.5 w-3.5 text-amber-600" />}
                  {c.status === "paid" ? `Paid on ${c.date}` : `Due ${c.date}`}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Card padded={false}>
        <div className="p-5"><SubHeader title="Payment History" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead><tr className="border-b-2 border-border bg-bg">
              {["Receipt", "Date", "Type", "Amount", "Mode", "Status", "Receipt"].map((h) => (<th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase text-muted-foreground sm:px-5">{h}</th>))}
            </tr></thead>
            <tbody>
              {FEE.history.map((p, i) => (
                <tr key={p.receipt} className="border-b border-[rgba(229,228,224,0.4)]" style={{ background: i % 2 ? "rgba(248,247,244,0.6)" : undefined }}>
                  <td className="px-4 py-3 font-[family-name:var(--font-dm)] text-[12px] font-bold text-brand sm:px-5">{p.receipt}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground sm:px-5">{p.date}</td>
                  <td className="px-4 py-3 text-[13px] text-ink sm:px-5">{p.type}</td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-ink sm:px-5">₹{p.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 sm:px-5"><Chip color="#1A1C24" bg="#EFEEEA" size="sm">{p.mode}</Chip></td>
                  <td className="px-4 py-3 sm:px-5"><Chip color={p.status === "Successful" ? "#059669" : "#DC2626"} bg={p.status === "Successful" ? "rgba(16,185,129,0.18)" : "rgba(239,68,68,0.18)"} size="sm">{p.status}</Chip></td>
                  <td className="px-4 py-3 sm:px-5">
                    {p.status === "Successful" ? (
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg text-brand shadow-[var(--shadow-neumorphic-sm)] hover:border-brand-light"><Download className="h-4 w-4" /></button>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}

function PaidRing({ pct }: { pct: number }) {
  const R = 60; const CIRC = 2 * Math.PI * R;
  return (
    <div className="relative h-[140px] w-[140px]">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={R} stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
        <circle cx="70" cy="70" r={R} stroke="#fff" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={`${(pct / 100) * CIRC} ${CIRC}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{pct}%</span>
        <span className="text-[10px] font-bold uppercase opacity-70">Paid</span>
      </div>
    </div>
  );
}
