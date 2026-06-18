import { useEffect, useState } from "react";
import {
  GraduationCap, Users, Activity, Server, Database, Globe, ShieldCheck,
  Cpu, MemoryStick, HardDrive, UserPlus, KeyRound, LogIn, Edit, Shield, TrendingUp,
} from "lucide-react";
import { OverviewCard, SectionHeader, Panel, ProgressBar } from "../primitives";

export function SuperAdminHome() {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const clock = now.toLocaleString("en-US", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            System Overview
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Baptist Academy ERP — Super Admin Control</p>
        </div>
        <div className="rounded-full bg-bg px-4 py-2 font-[family-name:var(--font-dm)] text-[12px] font-semibold text-muted-foreground shadow-[var(--shadow-neumorphic-sm)] sm:text-[13px]">
          {clock}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-5">
        <OverviewCard icon={GraduationCap} value="1,284" label="Active Students" sub="Across 42 sections" color="brand" trend={{ dir: "up", text: "+12", positive: true }} delay={0} />
        <OverviewCard icon={Users} value="68" label="Active Faculty" sub="Including HOFs" color="success" trend={{ dir: "up", text: "+2", positive: true }} delay={80} />
        <OverviewCard icon={Activity} value="847" label="Online Right Now" sub="Live sessions" color="info" pulse delay={160} />
        <OverviewCard icon={Server} value="99.8%" label="Uptime This Month" sub="All systems operational" color="success" progress={99.8} delay={240} />
      </div>

      <Panel>
        <SectionHeader title="Server Status" subtitle="Production infrastructure health" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <StatusRow icon={Server} label="Oracle Cloud ARM64" sub="Running · 14 days uptime" />
          <StatusRow icon={Database} label="PostgreSQL 16" sub="Connected · 23ms avg query" />
          <StatusRow icon={Globe} label="TanStack Start" sub="v1.x · Node 20 LTS" />
          <StatusRow icon={ShieldCheck} label="SSL Active" sub="Expires in 87 days" />
        </div>
      </Panel>

      <Panel>
        <SectionHeader title="System Resources" subtitle="Live consumption" />
        <div className="space-y-5">
          <ResourceBar icon={Cpu} label="CPU Usage" value="34%" percent={34} sub="4 vCPUs · Ampere A1 ARM64" />
          <ResourceBar icon={MemoryStick} label="RAM Usage" value="8.2 GB / 24 GB" percent={34} sub="34% used" />
          <ResourceBar icon={HardDrive} label="Disk Usage" value="42 GB / 200 GB" percent={21} sub="21% used" />
        </div>
      </Panel>

      <Panel>
        <SectionHeader title="Recent Activity" subtitle="Latest system events" />
        <div className="space-y-2">
          {RECENT.map((r, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-bg/60 p-3 transition-all hover:bg-brand-light/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${r.color}1A`, color: r.color }}>
                <r.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{r.action}</div>
                <div className="truncate text-[11px] text-muted-foreground">{r.who}</div>
              </div>
              <div className="shrink-0 text-[11px] text-muted-foreground">{r.time}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

const RECENT = [
  { icon: UserPlus, color: "#191BDF", action: "School Admin created", who: "by Super Admin", time: "2 min ago" },
  { icon: KeyRound, color: "#F59E0B", action: "Password reset", who: "EMP001", time: "15 min ago" },
  { icon: LogIn, color: "#10B981", action: "Principal logged in", who: "Dr. Samuel Devanand", time: "1h ago" },
  { icon: Edit, color: "#3B82F6", action: "Marks updated", who: "Mrs. Priya Sharma", time: "2h ago" },
  { icon: Shield, color: "#8B5CF6", action: "New session created", who: "Student BA2024001", time: "3h ago" },
] as const;

function StatusRow({ icon: Icon, label, sub }: { icon: typeof Server; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-bg p-4 shadow-[var(--shadow-neumorphic-sm)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="truncate font-[family-name:var(--font-dm)] text-[13px] font-bold text-ink">{label}</span>
        </div>
        <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function ResourceBar({ icon: Icon, label, value, percent, sub }: { icon: typeof Cpu; label: string; value: string; percent: number; sub: string }) {
  const color = percent >= 90 ? "#EF4444" : percent >= 70 ? "#F59E0B" : "#10B981";
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <Icon className="h-4 w-4 text-brand" />
        <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-ink">{label}</span>
        <span className="ml-auto font-[family-name:var(--font-dm)] text-[13px] font-bold" style={{ color }}>{value}</span>
      </div>
      <ProgressBar value={percent} color={color} />
      <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}
