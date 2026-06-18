import { ROLES, type RoleId } from "@/lib/roles";

interface Props {
  selected: RoleId | null;
  onSelect: (id: RoleId) => void;
}

export function RoleSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <p className="mb-4 text-center font-[family-name:var(--font-dm)] text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        Select Your Role
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {ROLES.map((role, idx) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(role.id)}
              className="group glass relative flex h-[100px] flex-col items-center justify-center gap-1.5 rounded-2xl px-2 shadow-[var(--shadow-glass)] transition-all duration-[250ms] ease-[var(--ease-premium)] hover:scale-[1.02] hover:border-[#E8E9FF] hover:shadow-[var(--shadow-neumorphic-sm)]"
              style={{
                animation: `var(--animate-stagger-in)`,
                animationDelay: `${idx * 60}ms`,
                ...(isSelected
                  ? {
                      background: "rgba(25,27,223,0.06)",
                      border: "2px solid #191BDF",
                      transform: "scale(1.04)",
                      boxShadow:
                        "inset 0 0 0 1px rgba(25,27,223,0.15), 0 8px 32px 0 rgba(25,27,223,0.18)",
                    }
                  : {}),
              }}
            >
              <Icon
                className="h-6 w-6 transition-colors"
                style={{ color: isSelected ? "#191BDF" : "#6B7280" }}
              />
              <span
                className="text-center font-[family-name:var(--font-dm)] text-[12px] leading-tight"
                style={{
                  color: isSelected ? "#191BDF" : "#6B7280",
                  fontWeight: isSelected ? 700 : 600,
                }}
              >
                {role.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
