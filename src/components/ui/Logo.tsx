interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
}

/**
 * The Outhood mark: an open gold ring (the "hood" — a community circle)
 * with a connecting node breaking outward, rimmed in blue-glow.
 * It reads as community + a path leading somewhere new — adventure, growth, impact.
 */
export default function Logo({ className = "", showWordmark = true, variant = "light" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="outhood-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2D879" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9C7B22" />
          </linearGradient>
        </defs>
        <path
          d="M 48.26 29.76 A 19 19 0 1 1 32.64 16.18"
          fill="none"
          stroke="url(#outhood-mark-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 48.26 29.76 L 56.2 27.5"
          fill="none"
          stroke="url(#outhood-mark-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="57.4" cy="27.2" r="5.6" fill="none" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="57.4" cy="27.2" r="3.2" fill="#F2D879" />
      </svg>
      {showWordmark && (
        <span
          className={`font-display text-lg font-bold tracking-tight ${
            variant === "light" ? "text-ink" : "text-obsidian"
          }`}
        >
          Outhood
        </span>
      )}
    </div>
  );
}
