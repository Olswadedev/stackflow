import { AuthShell } from "@/components/layout/auth-shell";
import { LoginForm } from "@/components/forms/login-form";

export function LoginView() {
  return (
    <AuthShell title="Connexion">
      <LoginForm />
    </AuthShell>
  );
}
