import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeader, Panel, BrandButton } from "./primitives";
import type { RoleId } from "@/lib/roles";

export function PlaceholderPage({ title, role }: { title: string; role: RoleId }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        title={title}
        subtitle="This module is in active development — full UI coming soon."
        action={
          <Link to="/dashboard/$role" params={{ role }}>
            <BrandButton variant="ghost" icon={ArrowLeft}>Back to Dashboard</BrandButton>
          </Link>
        }
      />
      <Panel className="!p-12 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-light">
          <Sparkles className="h-12 w-12 text-brand" strokeWidth={1.8} />
        </div>
        <h3 className="mt-6 text-[22px] font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-muted-foreground">
          We're crafting this experience with the same level of polish as the rest of your portal.
          You'll be able to manage, view, and act on everything related to <span className="font-semibold text-ink">{title.toLowerCase()}</span> right from here.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2 font-[family-name:var(--font-dm)] text-[12px] font-bold text-muted-foreground shadow-[var(--shadow-neumorphic-sm)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#F59E0B]" />
          In Development
        </div>
      </Panel>
    </div>
  );
}
