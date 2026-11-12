export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-label="The Art of Us monogram"
      role="img"
    >
      <path d="M11 17h42M11 47h42" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M17 14v36M28 21v26M40 14v36M48 24v23" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M28 21l12-7" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="48" cy="20" r="2.3" fill="currentColor" />
    </svg>
  );
}
