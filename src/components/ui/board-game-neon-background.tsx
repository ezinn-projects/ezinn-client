import { cn } from "@/lib/utils";

type BoardGameNeonBackgroundProps = {
  className?: string;
  tileSize?: number;
  patternOpacity?: number;
  animated?: boolean;
};

const patternSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" fill="none">
  <defs>
    <filter id="lineGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.25"/>
    </filter>
  </defs>
  <g stroke-linecap="round" stroke-linejoin="round">
    <g stroke="rgba(255,255,255,0.32)" stroke-width="4.2" filter="url(#lineGlow)">
      <path d="M18 74L92 48L138 88L84 124L18 74Z"/>
      <path d="M196 26L252 42L244 94L188 78L196 26Z"/>
      <path d="M154 178L206 154L254 182L200 208L154 178Z"/>
      <path d="M30 268L86 238L130 266L74 294L30 268Z"/>
      <path d="M240 246L298 220L304 278L250 300L240 246Z"/>
      <path d="M140 12L148 40M108 154L130 170M286 126L302 146M168 278L182 302"/>
    </g>

    <g stroke="rgba(255,255,255,0.62)" stroke-width="1.9">
      <path d="M18 74L92 48L138 88L84 124L18 74Z"/>
      <path d="M196 26L252 42L244 94L188 78L196 26Z"/>
      <path d="M154 178L206 154L254 182L200 208L154 178Z"/>
      <path d="M30 268L86 238L130 266L74 294L30 268Z"/>
      <path d="M240 246L298 220L304 278L250 300L240 246Z"/>
      <path d="M140 12L148 40M108 154L130 170M286 126L302 146M168 278L182 302"/>
    </g>

    <g transform="translate(56 52) rotate(-11)">
      <animate
        attributeName="opacity"
        values="1;0.42;1;0.26;1;0.7;1"
        keyTimes="0;0.06;0.14;0.18;0.56;0.63;1"
        dur="6.9s"
        begin="-2.2s"
        repeatCount="indefinite"
      />
      <g stroke="#ff4d5a">
        <rect x="0" y="0" width="28" height="74" rx="14" stroke-width="5.8" opacity="0.22"/>
        <rect x="0" y="0" width="28" height="74" rx="14" stroke-width="2.2"/>
        <circle cx="14" cy="18" r="3.8" stroke-width="5.4" opacity="0.2"/>
        <circle cx="14" cy="18" r="3.8" stroke-width="2.1"/>
        <path d="M8 38H20M14 32V44" stroke-width="5.2" opacity="0.2"/>
        <path d="M8 38H20M14 32V44" stroke-width="2"/>
      </g>

      <g stroke="#35a7ff" transform="translate(34 0)">
        <rect x="0" y="0" width="28" height="74" rx="14" stroke-width="5.8" opacity="0.22"/>
        <rect x="0" y="0" width="28" height="74" rx="14" stroke-width="2.2"/>
        <circle cx="14" cy="54" r="3.8" stroke-width="5.4" opacity="0.2"/>
        <circle cx="14" cy="54" r="3.8" stroke-width="2.1"/>
        <circle cx="14" cy="24" r="2.4" stroke-width="4.6" opacity="0.2"/>
        <circle cx="14" cy="24" r="2.4" stroke-width="1.9"/>
      </g>

      <path d="M31 5V69" stroke="rgba(255,255,255,0.3)" stroke-width="3.6" filter="url(#lineGlow)"/>
      <path d="M31 5V69" stroke="rgba(255,255,255,0.58)" stroke-width="1.6"/>
    </g>

    <g transform="translate(228 84) rotate(13)" stroke="#7ee7ff">
      <animate
        attributeName="opacity"
        values="1;0.35;1;0.52;1;0.22;1"
        keyTimes="0;0.09;0.16;0.2;0.61;0.68;1"
        dur="7.7s"
        begin="-4.6s"
        repeatCount="indefinite"
      />
      <rect x="-10" y="-22" width="20" height="34" rx="10" stroke-width="5.6" opacity="0.22"/>
      <rect x="-10" y="-22" width="20" height="34" rx="10" stroke-width="2.2"/>
      <path d="M0 13V28" stroke-width="5.4" opacity="0.2"/>
      <path d="M0 13V28" stroke-width="2.1"/>
      <path d="M-14 20C-14 30 -6 36 0 36C6 36 14 30 14 20" stroke-width="5.4" opacity="0.2"/>
      <path d="M-14 20C-14 30 -6 36 0 36C6 36 14 30 14 20" stroke-width="2.1"/>
      <path d="M-8 42H8" stroke-width="4.8" opacity="0.18"/>
      <path d="M-8 42H8" stroke-width="1.9"/>
    </g>

    <g transform="translate(80 224) rotate(9)" stroke="#ffd166">
      <animate
        attributeName="opacity"
        values="1;0.58;1;0.28;1;0.84;1"
        keyTimes="0;0.05;0.11;0.16;0.49;0.58;1"
        dur="5.8s"
        begin="-0.9s"
        repeatCount="indefinite"
      />
      <rect x="-18" y="-18" width="36" height="36" rx="7" stroke-width="5.8" opacity="0.22"/>
      <rect x="-18" y="-18" width="36" height="36" rx="7" stroke-width="2.2"/>
      <circle cx="-7" cy="-7" r="1.8" stroke-width="4.4" opacity="0.2"/>
      <circle cx="-7" cy="-7" r="1.8" stroke-width="1.8"/>
      <circle cx="7" cy="7" r="1.8" stroke-width="4.4" opacity="0.2"/>
      <circle cx="7" cy="7" r="1.8" stroke-width="1.8"/>
      <circle cx="7" cy="-7" r="1.8" stroke-width="4.4" opacity="0.2"/>
      <circle cx="7" cy="-7" r="1.8" stroke-width="1.8"/>
    </g>

    <g transform="translate(236 224) rotate(-8)" stroke="#ffd166">
      <animate
        attributeName="opacity"
        values="1;0.24;1;0.46;1;0.3;1"
        keyTimes="0;0.07;0.15;0.21;0.64;0.71;1"
        dur="8.4s"
        begin="-3.1s"
        repeatCount="indefinite"
      />
      <circle cx="0" cy="-14" r="8" stroke-width="5.6" opacity="0.22"/>
      <circle cx="0" cy="-14" r="8" stroke-width="2.1"/>
      <path d="M-12 16C-12 6 -7 0 0 0C7 0 12 6 12 16" stroke-width="5.8" opacity="0.22"/>
      <path d="M-12 16C-12 6 -7 0 0 0C7 0 12 6 12 16" stroke-width="2.2"/>
      <path d="M-16 16H16" stroke-width="5.6" opacity="0.22"/>
      <path d="M-16 16H16" stroke-width="2.1"/>
      <path d="M-10 22H10" stroke-width="5.2" opacity="0.2"/>
      <path d="M-10 22H10" stroke-width="2"/>
    </g>
  </g>
</svg>
`;

const svgDataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}")`;

export function BoardGameNeonBackground({
  className,
  tileSize = 320,
  patternOpacity = 0.22,
  animated = true,
}: BoardGameNeonBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_10%_0%,#8c2430_0%,#6e1a24_45%,#57141d_100%)]" />

      <div
        className={cn(
          "absolute inset-0 bg-repeat",
          animated && "board-game-neon-drift",
        )}
        style={{
          backgroundImage: svgDataUri,
          backgroundSize: `${tileSize}px ${tileSize}px`,
          opacity: patternOpacity,
          willChange: animated ? "background-position" : undefined,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(58%_48%_at_18%_14%,rgba(126,231,255,0.1),transparent_72%),radial-gradient(50%_42%_at_82%_80%,rgba(255,209,102,0.08),transparent_74%),radial-gradient(70%_60%_at_50%_50%,rgba(255,255,255,0.04),transparent_78%)]" />
    </div>
  );
}

export default BoardGameNeonBackground;
