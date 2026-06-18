import { useState } from "react";
import {
  UserPlus, KeyRound, ToggleRight, Pencil, Search, Cpu, MemoryStick, HardDrive, Wifi,
  Database, Download, RotateCcw, ScrollText, Filter, RefreshCw, Shield, Loader2, CheckCircle2, Copy,
} from "lucide-react";
import { toast } from "sonner";
import { OverviewCard, SectionHeader, Panel, BrandButton, StatusBadge, ProgressBar } from "../primitives";

/* ============== SA2: School Admin Management ============== */
const ADMINS = [
  { name: "Mrs. Anitha Reddy", email: "anitha@baptistacademy.edu", phone: "+91 98765 43210", created: "01 Feb 2024", last: "2 days ago", status: "active" },
  { name: "Mr. Suresh Babu", email: "suresh@baptistacademy.edu", phone: "+91 98654 32109", created: "12 Mar 2024", last: "5 hours ago", status: "active" },
  { name: "Mrs. Lalitha Menon", email: "lalitha@baptistacademy.edu", phone: "+91 97654 10987", created: "20 May 2024", last: "1 month ago", status: "disabled" },
];

function genPassword() {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const num = "23456789";
  const sym = "@#$%&*";
  const pool = upper + lower + num + sym;
  const pick = (s: string) => s[Math.floor(Math.random() * s.length)];
  let out = pick(upper) + pick(lower) + pick(num) + pick(sym);
  for (let i = 0; i < 6; i++) out += pick(pool);
  return out.split("").sort(() => Math.random() - 0.5).join("");
}

export function SchoolManagementPage() {
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState<{ user: string; pass: string } | null>(null);
  const [pass, setPass] = useState("");

  return (
    <div className="space-y-5">
      <SectionHeader
        title="School Admin Management"
        subtitle="Create and manage administrative accounts"
        action={<BrandButton icon={UserPlus} onClick={() => { setOpen(true); setPass(""); setCreated(null); }}>Create School Admin</BrandButton>}
      />

      <Panel className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg/60">
              <tr className="text-left">
                {["Name", "Email", "Phone", "Created", "Last Login", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADMINS.map((a) => (
                <tr key={a.email} className="border-t border-border transition-colors hover:bg-brand-light/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white shadow-[var(--shadow-neumorphic-sm)]">
                        {a.name.split(" ").slice(-2).map((s) => s[0]).join("")}
                      </div>
                      <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{a.email}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{a.phone}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{a.created}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{a.last}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <IconBtn icon={Pencil} onClick={() => toast(`Editing ${a.name}`)} />
                      <IconBtn icon={KeyRound} onClick={() => toast.success("Password reset link sent")} />
                      <IconBtn icon={ToggleRight} onClick={() => toast(`Toggled ${a.name}`)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          {!created ? (
            <>
              <h3 className="text-[18px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>Create School Admin Account</h3>
              <p className="mt-1 text-[12px] text-muted-foreground">Admin will receive login credentials</p>
              <div className="mt-5 space-y-3">
                <Input label="Full Name" placeholder="Enter full name" />
                <Input label="Email Address" placeholder="admin@school.edu" />
                <Input label="Phone Number" placeholder="+91 98765 43210" />
                <Input label="Username" placeholder="Auto-generated or custom" helper="Used for login" />
              </div>
              <div className="mt-5">
                <div className="mb-2 font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Login Credentials</div>
                <button
                  type="button"
                  onClick={() => setPass(genPassword())}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-bg px-4 py-3 font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink shadow-[var(--shadow-neumorphic-sm)] transition-all hover:text-brand"
                >
                  <RefreshCw className="h-4 w-4" /> Generate Secure Password
                </button>
                {pass && (
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-bg px-4 py-3 font-mono text-[13px] text-ink shadow-[var(--shadow-neumorphic-inset)]">
                    <span className="flex-1">{pass}</span>
                    <button onClick={() => { navigator.clipboard?.writeText(pass); toast.success("Copied"); }} className="text-muted-foreground hover:text-brand">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <BrandButton variant="ghost" onClick={() => setOpen(false)}>Cancel</BrandButton>
                <BrandButton icon={UserPlus} onClick={() => {
                  if (!pass) { toast.error("Generate a password first"); return; }
                  setCreated({ user: "admin_00" + (ADMINS.length + 1), pass });
                }}>Create Account</BrandButton>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-12 w-12 text-[#10B981]" />
                <h3 className="mt-3 text-[18px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>Account Created Successfully!</h3>
              </div>
              <div className="mt-5 rounded-2xl border-2 border-brand-light p-5" style={{ background: "rgba(25,27,223,0.04)" }}>
                <div className="font-[family-name:var(--font-dm)] text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Login Credentials</div>
                <div className="mt-2 font-mono text-[14px] text-ink">Username: {created.user}</div>
                <div className="mt-1 font-mono text-[14px] text-ink">Password: {created.pass}</div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <BrandButton variant="ghost" icon={Copy} onClick={() => { navigator.clipboard?.writeText(`${created.user} / ${created.pass}`); toast.success("Copied"); }}>Copy</BrandButton>
                <BrandButton variant="ghost" onClick={() => window.print()}>Print</BrandButton>
                <BrandButton variant="ghost" icon={Download} onClick={() => toast.success("Downloaded")}>PDF</BrandButton>
              </div>
              <div className="mt-4">
                <BrandButton onClick={() => setOpen(false)}>Done</BrandButton>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

/* ============== SA3: User Management ============== */
const USERS_LIST = [
  { name: "Dr. Samuel Devanand", email: "samuel@ba.edu", role: "Principal", last: "10 min ago", status: "active" },
  { name: "Dr. Priya Venkatesan", email: "priya@ba.edu", role: "HOF", last: "1h ago", status: "active" },
  { name: "Mr. Rajesh Iyer", email: "rajesh@ba.edu", role: "Faculty", last: "3h ago", status: "active" },
  { name: "Mrs. Anitha Reddy", email: "anitha@ba.edu", role: "School Admin", last: "2 days ago", status: "active" },
  { name: "Mr. Vikram Joshi", email: "vikram@ba.edu", role: "Faculty", last: "5 days ago", status: "disabled" },
];

export function UserManagementPage() {
  const [tab, setTab] = useState("All Users");
  const tabs = ["All Users", "School Admin", "Principal", "HOF", "Faculty"];
  const filtered = tab === "All Users" ? USERS_LIST : USERS_LIST.filter((u) => u.role === tab);

  return (
    <div className="space-y-5">
      <SectionHeader title="User Management" subtitle="847 users across all roles" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#F8F7F4", boxShadow: "var(--shadow-neumorphic-inset)" }}>
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="flex-1 bg-transparent text-[13px] focus:outline-none" placeholder="Search by name, email..." />
        </div>
        <button className="flex items-center gap-2 rounded-full bg-bg px-4 py-2.5 font-[family-name:var(--font-dm)] text-[13px] font-bold shadow-[var(--shadow-neumorphic-sm)]">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 font-[family-name:var(--font-dm)] text-[12px] font-bold transition-all ${
              tab === t ? "bg-brand text-white shadow-[var(--shadow-brand-glow)]" : "bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] hover:text-brand"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <Panel className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg/60">
              <tr className="text-left">
                {["User", "Role", "Last Login", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.email} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">{u.name.split(" ").slice(-2).map((s) => s[0]).join("")}</div>
                      <div>
                        <div className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{u.name}</div>
                        <div className="text-[11px] text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="inline-flex rounded-full bg-brand-light px-3 py-1 text-[11px] font-bold text-brand">{u.role}</span></td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{u.last}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <IconBtn icon={KeyRound} onClick={() => toast.success("Password reset")} />
                      <IconBtn icon={ToggleRight} onClick={() => toast("Account toggled")} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-[12px] text-muted-foreground">
          <span>Showing 1–{filtered.length} of 847 users</span>
          <div className="flex gap-1">
            <button className="rounded-lg bg-bg px-3 py-1 font-bold shadow-[var(--shadow-neumorphic-sm)]">Prev</button>
            <button className="rounded-lg bg-brand px-3 py-1 font-bold text-white">1</button>
            <button className="rounded-lg bg-bg px-3 py-1 font-bold shadow-[var(--shadow-neumorphic-sm)]">2</button>
            <button className="rounded-lg bg-bg px-3 py-1 font-bold shadow-[var(--shadow-neumorphic-sm)]">Next</button>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ============== SA4: System Monitor ============== */
export function SystemMonitorPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="System Monitoring" subtitle="Last updated: just now" action={
        <BrandButton variant="ghost" icon={RefreshCw} onClick={() => toast.success("Refreshed")}>Refresh</BrandButton>
      } />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <OverviewCard icon={Cpu} value="34%" label="CPU Usage" sub="4 vCPUs · Ampere A1" color="success" progress={34} delay={0} />
        <OverviewCard icon={MemoryStick} value="8.4 GB" label="Memory Used" sub="24 GB Total · 65% Free" color="success" progress={35} delay={80} />
        <OverviewCard icon={HardDrive} value="42 GB" label="Storage Used" sub="200 GB Total · 79% Free" color="success" progress={21} delay={160} />
        <OverviewCard icon={Wifi} value="2.4 MB/s" label="Network I/O" sub="↑ 1.2  ↓ 1.2 MB/s" color="info" delay={240} />
      </div>
      <Panel>
        <SectionHeader title="System Information" />
        <div className="divide-y divide-border">
          {SYS_INFO.map((row) => (
            <div key={row[0]} className="flex items-center justify-between py-2.5">
              <span className="font-[family-name:var(--font-dm)] text-[12px] font-semibold text-muted-foreground">{row[0]}</span>
              <span className="font-[family-name:var(--font-dm)] text-[12px] font-bold text-ink">{row[1]}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <SectionHeader title="Active Sessions" subtitle="Currently logged in users" />
        <div className="space-y-2">
          {ACTIVE_SESSIONS.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-xl bg-bg p-3 shadow-[var(--shadow-neumorphic-sm)]">
              <span className="rounded-full bg-brand-light px-2.5 py-1 text-[10px] font-bold text-brand">{s.role}</span>
              <span className="flex-1 truncate font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{s.name}</span>
              <span className="text-[11px] text-muted-foreground">{s.when}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
const SYS_INFO: [string, string][] = [
  ["Operating System", "Ubuntu 22.04 LTS ARM64"], ["Node.js", "v20.x LTS"],
  ["Architecture", "ARM64 (Ampere A1)"], ["PostgreSQL", "16.x"],
  ["Server Region", "ap-mumbai-1 (Oracle Cloud)"], ["IP Address", "xxx.xxx.xxx.xxx"],
  ["Uptime", "14 days, 6 hours, 42 minutes"], ["Last Restart", "July 1, 2025 at 4:00 AM"],
  ["TanStack Version", "1.x"], ["SSL Expires", "October 9, 2025"],
];
const ACTIVE_SESSIONS = [
  { role: "Principal", name: "Dr. Samuel Devanand", when: "Active now" },
  { role: "HOF", name: "Dr. Priya Venkatesan", when: "5 min ago" },
  { role: "Faculty", name: "Mr. Rajesh Iyer", when: "Active now" },
  { role: "School Admin", name: "Mrs. Anitha Reddy", when: "12 min ago" },
];

/* ============== SA5: Database Backup ============== */
const BACKUPS = [
  { date: "Today 2:00 AM", size: "124 MB", type: "Automatic", status: "Success" },
  { date: "Yesterday 2:00 AM", size: "123 MB", type: "Automatic", status: "Success" },
  { date: "July 12 2:00 AM", size: "122 MB", type: "Automatic", status: "Success" },
  { date: "July 11 10:30 AM", size: "121 MB", type: "Manual", status: "Success" },
  { date: "July 10 2:00 AM", size: "120 MB", type: "Automatic", status: "Success" },
];
export function DatabaseBackupPage() {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-5">
      <SectionHeader title="Database Backup & Restore" subtitle="PostgreSQL 16 · Baptist Academy" />
      <Panel>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(16,185,129,0.12)] text-[#10B981] shadow-[var(--shadow-neumorphic-sm)]">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <div className="font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">Last Backup: Today at 2:00 AM</div>
              <div className="text-[12px] text-muted-foreground">Size: 124 MB · Duration: 43 seconds</div>
              <span className="mt-1 inline-flex rounded-full bg-[rgba(16,185,129,0.15)] px-3 py-0.5 text-[11px] font-bold text-[#059669]">Successful</span>
            </div>
          </div>
          <BrandButton icon={busy ? Loader2 : Database} onClick={() => { setBusy(true); setTimeout(() => { setBusy(false); toast.success("Backup complete"); }, 1500); }}>
            {busy ? "Backing up..." : "Backup Now"}
          </BrandButton>
        </div>
        {busy && <div className="mt-3"><ProgressBar value={70} /></div>}
      </Panel>
      <Panel className="!p-0 overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <div className="text-[15px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>Backup History</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg/60">
              <tr className="text-left">
                {["Date & Time", "Size", "Type", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BACKUPS.map((b) => (
                <tr key={b.date} className="border-t border-border hover:bg-brand-light/30">
                  <td className="px-4 py-3 text-[12px] text-ink">{b.date}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{b.size}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{b.type}</td>
                  <td className="px-4 py-3"><StatusBadge status="completed" /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <IconBtn icon={Download} onClick={() => toast.success("Downloading...")} />
                      <IconBtn icon={RotateCcw} onClick={() => toast("Restore confirmed")} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ============== SA6: Audit Logs ============== */
const LOGS = [
  { time: "10:42 AM", user: "Super Admin", action: "Created School Admin account", ip: "192.168.1.10" },
  { time: "10:30 AM", user: "Dr. Samuel", action: "Approved 3 leave requests", ip: "192.168.1.12" },
  { time: "10:15 AM", user: "Mrs. Anitha", action: "Updated fee schedule", ip: "192.168.1.15" },
  { time: "09:58 AM", user: "Mr. Rajesh", action: "Entered marks for Class 11-A Mathematics", ip: "192.168.1.22" },
  { time: "09:42 AM", user: "Dr. Priya", action: "Approved substitute teacher assignment", ip: "192.168.1.18" },
  { time: "09:20 AM", user: "System", action: "Automated backup completed", ip: "—" },
  { time: "09:00 AM", user: "Mrs. Lalitha", action: "Logged in from new device", ip: "192.168.1.32" },
];
export function AuditLogsPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Audit Logs" subtitle="Complete system activity trail" action={
        <BrandButton variant="ghost" icon={Download} onClick={() => toast.success("Exported")}>Export CSV</BrandButton>
      } />
      <Panel className="!p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {LOGS.map((l, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-brand-light/30">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                <ScrollText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{l.action}</div>
                <div className="truncate text-[11px] text-muted-foreground">{l.user} · IP {l.ip}</div>
              </div>
              <div className="shrink-0 text-[11px] text-muted-foreground">{l.time}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ============== Helpers ============== */
function IconBtn({ icon: Icon, onClick }: { icon: typeof Pencil; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] transition-colors hover:text-brand">
      <Icon className="h-4 w-4" />
    </button>
  );
}
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-[480px] rounded-3xl bg-bg p-6 shadow-[var(--shadow-neumorphic)] sm:p-8" onClick={(e) => e.stopPropagation()} style={{ animation: "var(--animate-stagger-in)" }}>
        {children}
      </div>
    </div>
  );
}
function Input({ label, placeholder, helper }: { label: string; placeholder: string; helper?: string }) {
  return (
    <div>
      <label className="mb-1.5 block font-[family-name:var(--font-dm)] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full rounded-xl bg-bg px-4 py-3 text-[13px] text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
        style={{ boxShadow: "var(--shadow-neumorphic-inset)" }}
      />
      {helper && <div className="mt-1 text-[11px] text-muted-foreground">{helper}</div>}
    </div>
  );
}
