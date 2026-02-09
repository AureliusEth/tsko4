export function XLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-label="Fight Night logo"
    >
      {/* Left blade */}
      <path d="M15 20 L50 55 L45 60 L10 25 Z" />
      {/* Right blade */}
      <path d="M85 20 L50 55 L55 60 L90 25 Z" />
      {/* Bottom left blade */}
      <path d="M15 80 L50 45 L45 40 L10 75 Z" />
      {/* Bottom right blade */}
      <path d="M85 80 L50 45 L55 40 L90 75 Z" />
    </svg>
  )
}
