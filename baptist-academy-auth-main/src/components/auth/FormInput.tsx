import { forwardRef, type InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  rightSlot?: React.ReactNode;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ label, icon: Icon, rightSlot, error, id, className = "", ...rest }, ref) => {
    const inputId = id ?? `f-${label.replace(/\s+/g, "-").toLowerCase()}`;
    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="mb-2 block font-[family-name:var(--font-dm)] text-[12px] font-semibold uppercase tracking-[0.05em] text-muted-foreground"
        >
          {label}
        </label>
        <div className="group relative">
          <Icon
            className={`pointer-events-none absolute left-[14px] top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 transition-colors duration-200 ${
              error ? "text-destructive" : "text-[#9CA3AF] group-focus-within:text-brand"
            }`}
          />
          <input
            ref={ref}
            id={inputId}
            className={`h-[52px] w-full rounded-[12px] border-[1.5px] bg-bg pl-11 pr-11 text-[14px] text-ink outline-none transition-all duration-200 placeholder:text-[#9CA3AF] ${
              error
                ? "border-destructive shadow-[var(--shadow-neumorphic-inset)] focus:shadow-[var(--shadow-neumorphic-inset),0_0_0_3px_rgba(239,68,68,0.12)]"
                : "border-border shadow-[var(--shadow-neumorphic-inset)] focus:border-brand focus:shadow-[var(--shadow-neumorphic-inset),0_0_0_3px_rgba(25,27,223,0.10)]"
            } ${className}`}
            {...rest}
          />
          {rightSlot && (
            <div className="absolute right-[10px] top-1/2 -translate-y-1/2">{rightSlot}</div>
          )}
        </div>
        {error && <p className="mt-1.5 text-[12px] text-destructive">{error}</p>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
