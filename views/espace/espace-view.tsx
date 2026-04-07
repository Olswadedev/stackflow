"use client";

import { EspacePanel } from "./espace-panel";

export function EspaceView({ setActiveTab }: { setActiveTab: (tab: "dashboard" | "settings") => void }) {
  return <EspacePanel setActiveTab={setActiveTab} />;
}