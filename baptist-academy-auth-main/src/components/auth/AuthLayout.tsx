import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { LeftPanel } from "./LeftPanel";
import { TabSwitcher } from "./TabSwitcher";
import { RoleSelector } from "./RoleSelector";
import { ChangeRolePill } from "./ChangeRolePill";
import type { RoleId } from "@/lib/roles";

interface Props {
  mode: "signin" | "signup";
  title: string;
  subtitle: string;
  bottomPrompt: ReactNode;
  renderForm: (role: RoleId) => ReactNode;
}

export function AuthLayout({ mode, title, subtitle, bottomPrompt, renderForm }: Props) {
  const [role, setRole] = useState<RoleId | null>(null);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[40%_60%]">
      <LeftPanel />

      <div
        className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 py-10 sm:px-8"
        style={{ animation: "var(--animate-fade-up)" }}
      >
        <div className="w-full max-w-[480px]">
          {/* Mobile wordmark */}
          <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <GraduationCap className="h-7 w-7 text-brand" />
            <span
              className="text-[22px] font-extrabold text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Baptist Academy
            </span>
          </div>

          <TabSwitcher active={mode} />

          <div className="mb-7 text-center">
            <h2
              className="text-[30px] font-bold leading-tight text-ink sm:text-[34px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            <p className="mt-2 text-[14px] text-muted-foreground">{subtitle}</p>
          </div>

          <div className="rounded-[24px] bg-bg p-6 shadow-[var(--shadow-neumorphic)] sm:p-8">
            {role === null ? (
              <RoleSelector selected={role} onSelect={setRole} />
            ) : (
              <>
                <ChangeRolePill role={role} onReset={() => setRole(null)} />
                {renderForm(role)}
              </>
            )}
          </div>

          {/* Divider + bottom prompt */}
          <div className="mt-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[12px] uppercase tracking-wider text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <p className="mt-5 text-center text-[14px] text-muted-foreground">{bottomPrompt}</p>
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground md:hidden">
          © 2025 Baptist Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export function ToggleLink({ to, prefix, action }: { to: "/login" | "/signup"; prefix: string; action: string }) {
  return (
    <>
      {prefix}{" "}
      <Link to={to} className="font-bold text-brand transition-colors hover:text-brand-dark hover:underline">
        {action}
      </Link>
    </>
  );
}
