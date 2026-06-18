import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { User, Hash, Mail, Lock, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { saveSession, mockDelay } from "@/lib/auth-helpers";
import type { RoleId } from "@/lib/roles";

export function SignUpForm({ role }: { role: RoleId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const isStudent = role === "student";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!name || !identifier || !pw || !cpw) {
      toast.error("Please fill in all fields");
      return;
    }
    if (pw !== cpw) {
      setErr("Passwords do not match");
      return;
    }
    setLoading(true);
    await mockDelay();
    saveSession({ role, identifier });
    setLoading(false);
    toast.success("Account created. Welcome to Baptist Academy!", {
      icon: <CheckCircle2 className="h-5 w-5 text-brand" />,
    });
    setTimeout(() => navigate({ to: "/dashboard" }), 400);
  }

  const placeholders: Record<RoleId, { name: string; id: string }> = {
    student: { name: "Enter your full name", id: "e.g. BA2024001" },
    faculty: { name: "Enter your full name", id: "yourname@baptistacademy.edu" },
    hof: { name: "Enter your full name", id: "hof@baptistacademy.edu" },
    principal: { name: "Principal's full name", id: "principal@baptistacademy.edu" },
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" style={{ animation: "var(--animate-form-in)" }}>
      <FormInput
        label="Full Name"
        icon={User}
        placeholder={placeholders[role].name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />

      {isStudent ? (
        <FormInput
          label="Register Number"
          icon={Hash}
          placeholder={placeholders.student.id}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      ) : (
        <FormInput
          label={role === "faculty" ? "Faculty Email ID" : "Email ID"}
          icon={Mail}
          type="email"
          placeholder={placeholders[role].id}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="email"
        />
      )}

      <PasswordInput
        label="Password"
        icon={Lock}
        placeholder="Create a strong password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        autoComplete="new-password"
      />

      <PasswordInput
        label="Confirm Password"
        icon={ShieldCheck}
        placeholder="Re-enter your password"
        value={cpw}
        onChange={(e) => setCpw(e.target.value)}
        error={err ?? undefined}
        autoComplete="new-password"
      />

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
            Create Account
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
