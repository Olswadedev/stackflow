import { RegisterForm } from "@/components/forms/register-form";
import { AuthShell } from "@/components/layout/auth-shell";

export function RegisterView() {
  return (
    <AuthShell title="Créer un compte">
      <RegisterForm />
    </AuthShell>
  );
}
