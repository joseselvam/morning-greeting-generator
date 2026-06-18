import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Mail, Hash, Lock, LogIn, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { saveSession, mockDelay } from "@/lib/auth-helpers";
import type { RoleId } from "@/lib/roles";

export function SignInForm({ role }: { role: RoleId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const isStudent = role === "student";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    await mockDelay();
    saveSession({ role, identifier });
    setLoading(false);
    toast.success("Welcome back to Baptist Academy!", {
      icon: <CheckCircle2 className="h-5 w-5 text-brand" />,
    });
    setTimeout(() => navigate({ to: "/dashboard" }), 400);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" style={{ animation: "var(--animate-form-in)" }}>
      {isStudent ? (
        <FormInput
          label="Register Number"
          icon={Hash}
          placeholder="Your register number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
        />
      ) : (
        <FormInput
          label="Email ID"
          icon={Mail}
          type="email"
          placeholder="yourname@baptistacademy.edu"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="email"
        />
      )}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-[family-name:var(--font-dm)] text-[12px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
            Password
          </span>
          <button
            type="button"
            className="text-[13px] font-medium text-brand transition-colors hover:text-brand-dark hover:underline"
            onClick={() => toast("Password reset link sent (mock)")}
          >
            Forgot password?
          </button>
        </div>
        <PasswordInput
          label=""
          icon={Lock}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <SubmitButton loading={loading} label="Sign In to Portal" Icon={LogIn} />
    </form>
  );
}

function SubmitButton({
  loading,
  label,
  Icon,
}: {
  loading: boolean;
  label: string;
  Icon: typeof LogIn;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] bg-brand font-[family-name:var(--font-dm)] text-[15px] font-bold tracking-[0.03em] text-white shadow-[var(--shadow-brand-glow)] transition-all duration-[250ms] ease-[var(--ease-premium)] hover:-translate-y-[1px] hover:bg-brand-dark hover:shadow-[var(--shadow-brand-glow-strong)] active:translate-y-0 active:scale-[0.99] disabled:opacity-80"
    >
      {loading ? (
        <>
          <Loader2 className="h-[18px] w-[18px] animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          {label}
          <Icon className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

// Hide the empty-label spacer from PasswordInput by collapsing label margin
// (label="" still renders mb-2 spacer — acceptable visually)
