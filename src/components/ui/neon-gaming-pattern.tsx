import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface NeonGamingPatternProps extends HTMLAttributes<HTMLDivElement> {
  tileSize?: number;
  opacity?: number;
  fade?: boolean;
  flicker?: boolean;
  flickerDuration?: number;
}

const patternSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" fill="none">
  <g stroke-linecap="round" stroke-linejoin="round">
    <g stroke="rgba(255,255,255,0.18)" stroke-width="1.4">
      <path d="M18 74L92 48L138 88L84 124L18 74Z"/>
      <path d="M196 26L252 42L244 94L188 78L196 26Z"/>
      <path d="M154 178L206 154L254 182L200 208L154 178Z"/>
      <path d="M30 268L86 238L130 266L74 294L30 268Z"/>
      <path d="M240 246L298 220L304 278L250 300L240 246Z"/>
      <path d="M140 12L148 40M108 154L130 170M286 126L302 146M168 278L182 302"/>
    </g>

    <g transform="translate(56 52) rotate(-11)">
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

      <path d="M31 5V69" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
    </g>

    <g transform="translate(228 84) rotate(13)" stroke="#7ee7ff">
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

const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}`;

export function NeonGamingPattern({
  className,
  tileSize = 320,
  opacity = 1,
  fade = false,
  flicker = true,
  flickerDuration = 6.5,
  style,
  ...props
}: NeonGamingPatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        flicker && "neon-gaming-flicker",
        className,
      )}
      style={{
        backgroundImage: `url("${svgDataUri}")`,
        backgroundRepeat: "repeat",
        backgroundSize: `${tileSize}px ${tileSize}px`,
        opacity,
        animationDuration: flicker ? `${flickerDuration}s` : undefined,
        maskImage: fade
          ? "radial-gradient(ellipse at center, white 15%, transparent 85%)"
          : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse at center, white 15%, transparent 85%)"
          : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

export default NeonGamingPattern;
