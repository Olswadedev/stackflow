import type { ReactNode } from "react";

export interface AuthShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export interface LogoMarkProps {
  className?: string;
}

export interface AdminChromeProps {
  children: ReactNode;
}
