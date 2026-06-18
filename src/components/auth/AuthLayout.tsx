import { useState, type ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import { LeftPanel } from "./LeftPanel";
import { RoleSelector } from "./RoleSelector";
import { ChangeRolePill } from "./ChangeRolePill";
import type { RoleId } from "@/lib/roles";

interface Props {
  mode: "signin";
  title: string;
  subtitle: string;
  renderForm: (role: RoleId) => ReactNode;
}

export function AuthLayout({ title, subtitle, renderForm }: Props) {
  const [role, setRole] = useState<RoleId | null>(null);

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[40%_60%]">
      <LeftPanel />

      <div
        className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 py-10 sm:px-8"
        style={{ animation: "var(--animate-fade-up)" }}
      >
        <div className="w-full max-w-[520px]">
          <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
            <GraduationCap className="h-7 w-7 text-brand" />
            <span
              className="text-[22px] font-extrabold text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Baptist Academy
            </span>
          </div>

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
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground md:hidden">
          © 2025 Baptist Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
