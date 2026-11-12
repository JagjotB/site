import type { ReactNode } from "react";

type ExperienceShellProps = {
  children: ReactNode;
  className?: string;
  ambient?: "cool" | "warm" | "oxblood";
};

export function ExperienceShell({
  children,
  className = "",
  ambient = "cool",
}: ExperienceShellProps) {
  return (
    <main className={`experience-shell ambient-${ambient} ${className}`}>
      <div className="ambient-light" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="relative z-10 min-h-[100svh]">{children}</div>
    </main>
  );
}
