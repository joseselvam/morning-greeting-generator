import { Shield, BookOpen, Users, ShieldCheck } from "lucide-react";

const features = [
  { Icon: BookOpen, text: "Academic Excellence Since 1984" },
  { Icon: Users, text: "Unified Portal for All Stakeholders" },
  { Icon: ShieldCheck, text: "Secure Role-Based Access Control" },
];

export function LeftPanel() {
  return (
    <div
      className="relative hidden h-full w-full overflow-hidden md:flex md:flex-col md:items-center md:justify-between md:p-10"
      style={{ background: "linear-gradient(135deg, #191BDF 0%, #0F11A8 100%)" }}
    >
      {/* Floating shapes */}
      <div
        className="pointer-events-none absolute -left-16 top-20 h-[200px] w-[200px] rounded-full blur-3xl"
        style={{ background: "#E8E9FF", opacity: 0.08, animation: "var(--animate-float-med)" }}
      />
      <div
        className="pointer-events-none absolute right-10 top-1/3 h-[140px] w-[140px] rounded-full blur-2xl"
        style={{ background: "#ffffff", opacity: 0.06, animation: "var(--animate-float-slow)" }}
      />
      <div
        className="pointer-events-none absolute bottom-32 left-1/3 h-[100px] w-[100px] rounded-full blur-2xl"
        style={{ background: "#E8E9FF", opacity: 0.1, animation: "var(--animate-float-fast)" }}
      />

      <div className="z-10 h-2" />

      <div className="glass-dark relative z-10 w-full max-w-md rounded-3xl p-8 shadow-[var(--shadow-glass)]">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Shield className="h-8 w-8 text-white" strokeWidth={2.2} />
          </div>
          <h1
            className="text-white"
            style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}
          >
            Baptist Academy
          </h1>
          <p
            className="mt-3 italic"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "var(--font-sans)" }}
          >
            Shaping Minds. Building Futures.
          </p>

          <div className="my-6 h-px w-full bg-white/20" />

          <ul className="w-full space-y-4 text-left">
            {features.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(232,233,255,0.18)" }}
                >
                  <Icon className="h-[18px] w-[18px]" style={{ color: "#E8E9FF" }} />
                </span>
                <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="z-10 text-[12px]" style={{ color: "rgba(255,255,255,0.55)" }}>
        © 2025 Baptist Academy. All rights reserved.
      </p>
    </div>
  );
}
