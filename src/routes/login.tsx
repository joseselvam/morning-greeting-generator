import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout, ToggleLink } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Baptist Academy ERP" },
      { name: "description", content: "Secure sign-in to the Baptist Academy school ERP portal for students, faculty, heads of faculty, and principal." },
      { property: "og:title", content: "Sign In — Baptist Academy ERP" },
      { property: "og:description", content: "Secure role-based access to your Baptist Academy portal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout
      mode="signin"
      title="Welcome Back"
      subtitle="Sign in to access your Baptist Academy portal"
      bottomPrompt={<ToggleLink to="/signup" prefix="Don't have an account?" action="Sign Up" />}
      renderForm={(role) => <SignInForm role={role} />}
    />
  );
}
