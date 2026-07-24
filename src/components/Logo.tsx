interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Personal logomark — "Monolith": a solid rounded-square tile with a tightly
 * kerned "BY" monogram. Monochrome and theme-adaptive: the tile uses the current
 * foreground colour and the letters use the page background, so it inverts
 * automatically between light and dark. Matches the favicon in src/app/icon.svg.
 */
export function Logo({ size = 34, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-foreground ${className}`}
      aria-label="Batuhan Yeniköse"
      role="img"
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="currentColor" />
      <text
        x="32"
        y="34"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-geist-sans), system-ui, -apple-system, Segoe UI, Arial, sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="-3"
        fill="var(--background)"
      >
        BY
      </text>
    </svg>
  );
}
