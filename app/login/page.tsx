import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      description="Sign in to continue to your insurance workspace."
      title="Welcome back"
    >
      <LoginForm />
    </AuthShell>
  );
}
