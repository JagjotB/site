export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8AB7A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111315]";

export function announceableProgress(value: number): string {
  return `${Math.round(value * 100)} percent revealed`;
}
