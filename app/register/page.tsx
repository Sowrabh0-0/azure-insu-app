import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      description="Create your customer account to manage future policies and claims."
      title="Create account"
    >
      <RegisterForm />
    </AuthShell>
  );
}
