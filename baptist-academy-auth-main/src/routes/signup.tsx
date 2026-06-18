import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout, ToggleLink } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Baptist Academy ERP" },
      { name: "description", content: "Register for the Baptist Academy school ERP portal — students, faculty, heads of faculty, and principal." },
      { property: "og:title", content: "Create Account — Baptist Academy ERP" },
      { property: "og:description", content: "Join Baptist Academy's unified portal for all stakeholders." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <AuthLayout
      mode="signup"
      title="Create Your Account"
      subtitle="Join Baptist Academy's unified portal"
      bottomPrompt={<ToggleLink to="/login" prefix="Already have an account?" action="Sign In" />}
      renderForm={(role) => <SignUpForm role={role} />}
    />
  );
}
