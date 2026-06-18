import { ChevronDown } from "lucide-react";
import { getRole, type RoleId } from "@/lib/roles";

export function ChangeRolePill({ role, onReset }: { role: RoleId; onReset: () => void }) {
  const r = getRole(role);
  if (!r) return null;
  const Icon = r.icon;
  return (
    <button
      type="button"
      onClick={onReset}
      className="mx-auto mb-6 flex items-center gap-2 rounded-full bg-bg px-4 py-2 shadow-[var(--shadow-neumorphic-sm)] transition-all duration-200 hover:shadow-[var(--shadow-neumorphic)]"
    >
      <Icon className="h-4 w-4 text-brand" />
      <span className="font-[family-name:var(--font-dm)] text-[13px] font-semibold text-brand">
        {r.label}
      </span>
      <ChevronDown className="h-4 w-4 text-brand" />
    </button>
  );
}
