import type { LogoMarkProps } from "@/types/layout.types";
import Link from "next/link";

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-semibold tracking-tight text-foreground ${className}`}
    >
      <span
        className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
        aria-hidden
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4h12v4H6V4zm0 6h8v4H6v-4zm0 6h12v4H6v-4z"
            fill="currentColor"
            opacity="0.92"
          />
        </svg>
      </span>
      <span className="text-lg">Synthèse</span>
    </Link>
  );
}
