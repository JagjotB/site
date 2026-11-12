type MonogramProps = {
  className?: string;
};

export function Monogram({ className }: MonogramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      role="img"
      aria-label="A tall man and a woman in an elegant formal twirl"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="25.5" cy="9.5" r="3.7" fill="currentColor" stroke="none" />
        <path d="M25.5 14.2c-2.8 6.5-3.6 14.5-2.3 24l-3.5 32.4M23.2 38.2l9 32.4" strokeWidth="2" />
        <path d="M23.7 18.2c4.6 1.2 8.7-.2 12.2-4.2l7.1-4.2" strokeWidth="1.9" />
        <path d="M24 20c-4.1 5.2-7 10.6-8.7 16.2" strokeWidth="1.6" />
        <path d="m27.5 17.2 2.7 8.4-6.7 12.6M28.8 18.2l-3.1 4.1" strokeWidth="1.05" opacity=".7" />
        <circle cx="54" cy="19.5" r="3.4" fill="currentColor" stroke="none" />
        <path d="M53.1 23.7c-3.5 4.4-5.3 10.1-5.2 17.1" strokeWidth="1.7" />
        <path d="M49.3 27.4c-2.6-4.6-4.7-10.4-6.3-17.6" strokeWidth="1.65" />
        <path d="M52.5 25.1c5 3.3 8.9 7.9 11.7 13.8" strokeWidth="1.55" />
        <path d="M48 39.1c-4.7 7-8.5 13.3-11.3 18.8 8.7 2.7 17.5 2.6 26.6-.2-5.3-5.8-9.2-12-11.5-18.5" strokeWidth="1.75" />
        <path d="M43.5 59.5 41.8 70M57.2 59.3l4.2 10.7" strokeWidth="1.75" />
        <path d="M30.6 29.2c5.8 1.7 11.8 4.8 18 9.3" strokeWidth="1.55" />
        <path d="M43 9.8c10.1-.4 18.1 4 21.6 12.9 2.5 6.4 1.6 12.6-2.7 18.5" strokeWidth="1" strokeDasharray="1.2 3" opacity=".6" />
        <path d="M15 72h49" strokeWidth="1" opacity=".28" />
      </g>
      <circle cx="43" cy="9.8" r="2.1" fill="#572a38" />
    </svg>
  );
}
