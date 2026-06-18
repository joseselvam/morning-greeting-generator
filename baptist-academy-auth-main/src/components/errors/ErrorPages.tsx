import { Link } from "@tanstack/react-router";
import { type LucideIcon, AlertTriangle, Lock, ServerCrash, Home, ArrowLeft } from "lucide-react";

export function ErrorPageShell({
  code, title, message, icon: Icon, accent = "#191BDF",
}: { code: string; title: string; message: string; icon: LucideIcon; accent?: string }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-12 text-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            `radial-gradient(circle at 20% 20%, ${accent}1F, transparent 50%), radial-gradient(circle at 80% 80%, ${accent}14, transparent 50%)`,
        }}
      />
      <div className="relative w-full max-w-lg text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl shadow-[var(--shadow-neumorphic-sm)]"
          style={{ background: `${accent}1A`, color: accent }}
        >
          <Icon className="h-10 w-10" />
        </div>
        <h1
          className="mt-8 bg-clip-text text-7xl font-extrabold leading-none tracking-tight text-transparent sm:text-8xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accent} 0%, ${accent}99 100%)`,
            fontFamily: "var(--font-display)",
          }}
        >
          {code}
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-ink sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">{message}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-bold text-ink shadow-[var(--shadow-neumorphic-sm)] transition-all hover:-translate-y-px hover:border-brand-light hover:text-brand sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-brand-glow)] transition-all hover:-translate-y-px hover:bg-brand-dark sm:w-auto"
          >
            <Home className="h-4 w-4" /> Back to home
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Baptist Academy ERP · Error reference {code}</p>
      </div>
    </div>
  );
}

export const NotFound404 = () => (
  <ErrorPageShell
    code="404"
    title="Page not found"
    message="The page you're looking for doesn't exist or has been moved. Check the URL or head back home."
    icon={AlertTriangle}
    accent="#191BDF"
  />
);

export const Forbidden403 = () => (
  <ErrorPageShell
    code="403"
    title="Access denied"
    message="You don't have permission to view this page. Please contact your administrator if you believe this is a mistake."
    icon={Lock}
    accent="#F59E0B"
  />
);

export const ServerError500 = () => (
  <ErrorPageShell
    code="500"
    title="Something went wrong"
    message="Our servers ran into an unexpected issue. We've been notified — please try again in a moment."
    icon={ServerCrash}
    accent="#EF4444"
  />
);
