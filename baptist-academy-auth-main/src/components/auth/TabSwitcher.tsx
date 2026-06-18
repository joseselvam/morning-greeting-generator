import { Link } from "@tanstack/react-router";

export function TabSwitcher({ active }: { active: "signin" | "signup" }) {
  const base =
    "relative z-10 flex-1 rounded-full py-2.5 text-center font-[family-name:var(--font-dm)] text-[13px] font-semibold tracking-[0.03em] transition-colors duration-300";
  return (
    <div className="relative mx-auto mb-8 flex w-full max-w-[320px] rounded-full bg-bg p-1.5 shadow-[var(--shadow-neumorphic-inset)]">
      <span
        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-brand shadow-[var(--shadow-brand-glow)] transition-transform duration-300 ease-[var(--ease-premium)]"
        style={{ transform: active === "signin" ? "translateX(0)" : "translateX(100%)" }}
      />
      <Link to="/login" className={`${base} ${active === "signin" ? "text-white" : "text-muted-foreground"}`}>
        Sign In
      </Link>
      <Link to="/signup" className={`${base} ${active === "signup" ? "text-white" : "text-muted-foreground"}`}>
        Sign Up
      </Link>
    </div>
  );
}
