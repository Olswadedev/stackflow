import { AuthShell } from "@/components/layout/auth-shell";
import { EspacePanel } from "@/views/espace/espace-panel";

export function EspaceView() {
  return (
    <AuthShell title="Mon espace">
      <EspacePanel />
    </AuthShell>
  );
}
