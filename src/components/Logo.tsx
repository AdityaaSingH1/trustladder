import { Link } from 'react-router-dom';

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 46 L24 46 L24 38 L34 38 L34 30 L44 30 L44 22 L52 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 16 L50 20 L57 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="42" r="1.6" fill="currentColor" />
      <circle cx="29" cy="34" r="1.6" fill="currentColor" />
      <circle cx="39" cy="26" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Logo({ to = '/', showText = true }: { to?: string; showText?: boolean }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-ink-800 text-blue transition-all duration-300 group-hover:border-blue/40 group-hover:shadow-glow">
        <LogoMark className="h-5 w-5" />
      </span>
      {showText && (
        <span className="font-mono text-sm font-semibold tracking-tight text-white">
          Trust<span className="text-blue">Ladder</span>
        </span>
      )}
    </Link>
  );
}
