type MonogramProps = {
  className?: string;
};

export function Monogram({ className }: MonogramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      role="img"
      aria-label="A tall man in a British-style pagg twirling a woman"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 19c1.8-5.7 7-9.1 13.2-8.4 3.8.4 6.8 2 8.8 4.5-4.9-.8-9.6.3-13 3.7-3-1.1-6-1-9 .2Z" fill="currentColor" stroke="none" />
        <path d="M18.8 17.5c5.3-2.7 11-3.4 17-1.3M21 14.6c4.5-2.2 9.1-2.7 13.6-1.4" strokeWidth="1.25" />
        <path d="M27.7 20.2c0 3.9 1.7 6.4 5 7.6" strokeWidth="1.7" />
        <path d="M27.8 28.3 24.9 47l-6.6 19.2M25.1 47l8.8 19.2M25.7 32.2c5.6-1.1 9.9-4.5 13-10.1l5.4-7.6" strokeWidth="2" />
        <path d="M25.8 31.9c-3.8 5.2-6.8 8.8-9.2 10.8" strokeWidth="1.65" />
        <path d="M50.3 28.6c-.1 3.4 1.5 5.7 4.7 6.8M50.2 29c2.6-2.2 6.1-1.9 8.1.8 1.2 1.7 1.4 3.6.7 5.7" strokeWidth="1.55" />
        <path d="M53 36.2c-3.2 5.6-5.7 11.3-7.6 17.3 5.1 1.8 11.1 1.9 17.8.3-3.4-6.1-5.7-11.8-6.9-17.2" strokeWidth="1.8" />
        <path d="m48.7 54.3-1 11.9M59.2 54.6l3.4 11.6M53.2 36.5c-2.5-3.9-5.5-8.3-9.1-13.2l.1-8.8M56.4 37.2c3.4 3 6.6 4.9 9.7 5.8" strokeWidth="1.7" />
        <path d="M44.3 14.7c10.8-1.2 19.1 4.4 21.6 14.4 1.8 7.2-.4 13.8-6.5 19.6" strokeWidth="1" strokeDasharray="1 3.2" opacity=".65" />
        <path d="M16.5 69h48" strokeWidth="1" opacity=".32" />
      </g>
      <circle cx="44.3" cy="14.7" r="2.15" fill="#572a38" />
    </svg>
  );
}
