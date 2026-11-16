export function RealisticGiftIcon({ className = 'h-16 w-16' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="giftBoxGrad" x1="20" y1="45" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="55%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#831843" />
        </linearGradient>
        <linearGradient id="giftLidGrad" x1="15" y1="30" x2="105" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#9d174d" />
        </linearGradient>
        <linearGradient id="ribbonGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Box body */}
      <rect x="20" y="48" width="80" height="56" rx="10" fill="url(#giftBoxGrad)" />
      {/* Box lid */}
      <rect x="14" y="34" width="92" height="20" rx="7" fill="url(#giftLidGrad)" />
      {/* Vertical ribbon */}
      <rect x="52" y="34" width="16" height="70" fill="url(#ribbonGold)" />
      {/* Horizontal ribbon */}
      <rect x="20" y="70" width="80" height="12" fill="url(#ribbonGold)" opacity="0.92" />
      {/* Bow loops */}
      <path
        d="M60 35C48 16 28 18 32 30C35 38 50 36 60 35Z"
        fill="url(#ribbonGold)"
      />
      <path
        d="M60 35C72 16 92 18 88 30C85 38 70 36 60 35Z"
        fill="url(#ribbonGold)"
      />
      <circle cx="60" cy="35" r="6" fill="#fef3c7" />
      {/* Glossy highlight */}
      <rect x="24" y="38" width="28" height="4" rx="2" fill="#ffffff" opacity="0.45" />
    </svg>
  );
}

export function RealisticEnvelopeIcon({ className = 'h-14 w-14' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="envBody" x1="15" y1="28" x2="105" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="60%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="envFlap" x1="60" y1="28" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
        <linearGradient id="waxSeal" x1="48" y1="54" x2="72" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <rect x="14" y="28" width="92" height="64" rx="12" fill="url(#envBody)" />
      <path d="M16 32L60 66L104 32" fill="url(#envFlap)" opacity="0.95" />
      <path d="M16 90L48 60M104 90L72 60" stroke="#db2777" strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="64" r="12" fill="url(#waxSeal)" />
      <path
        d="M60 69.5C60 69.5 53.5 65.2 53.5 61.2C53.5 59.3 55 58 56.8 58C58.1 58 59.3 58.7 60 59.8C60.7 58.7 61.9 58 63.2 58C65 58 66.5 59.3 66.5 61.2C66.5 65.2 60 69.5 60 69.5Z"
        fill="#fffbeb"
      />
    </svg>
  );
}

export function RealisticSparkleHeartIcon({ className = 'h-12 w-12' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="heart3d" x1="25" y1="25" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="45%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M60 98C60 98 20 72 20 45C20 31.7 30.7 22 43 22C50.4 22 56.9 25.8 60 31.6C63.1 25.8 69.6 22 77 22C89.3 22 100 31.7 100 45C100 72 60 98 60 98Z"
        fill="url(#heart3d)"
      />
      <ellipse cx="40" cy="40" rx="8" ry="4.5" transform="rotate(-30 40 40)" fill="#ffffff" opacity="0.45" />
      <path d="M95 16L98 24L106 27L98 30L95 38L92 30L84 27L92 24L95 16Z" fill="#fde68a" />
      <path d="M22 76L24 81L29 83L24 85L22 90L20 85L15 83L20 81L22 76Z" fill="#fde68a" />
    </svg>
  );
}
