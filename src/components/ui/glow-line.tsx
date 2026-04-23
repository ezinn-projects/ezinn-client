import { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Orientation = "vertical" | "horizontal";
type GlowLineColor = "purple" | "blue" | "green" | "red";

type GlowLayer = {
  size: string;
  blur: string;
  opacity: string;
  color: string;
};

type ColorSchemeConfig = {
  core: string;
  glow: [string, string, string, string];
};

type GlowLineProps = {
  orientation: Orientation;
  position: string;
  color?: GlowLineColor;
  className?: string;
};

const COLOR_SCHEMES: Record<GlowLineColor, ColorSchemeConfig> = {
  purple: {
    core: "via-purple-400",
    glow: ["via-purple-400", "via-purple-500", "via-purple-400", "via-purple-300"],
  },
  blue: {
    core: "via-blue-400",
    glow: ["via-blue-400", "via-blue-500", "via-blue-400", "via-blue-300"],
  },
  green: {
    core: "via-green-400",
    glow: ["via-green-400", "via-green-500", "via-green-400", "via-green-300"],
  },
  red: {
    core: "via-red-400",
    glow: ["via-red-400", "via-red-500", "via-red-400", "via-red-300"],
  },
};

export default function GlowLine({
  orientation,
  position,
  className,
  color = "red",
}: GlowLineProps) {
  const isVertical = orientation === "vertical";
  const containerClasses = isVertical ? "absolute h-full w-px" : "absolute h-px w-full";
  const positionStyle: CSSProperties = isVertical ? { left: position } : { top: position };
  const gradientDirection = isVertical ? "bg-gradient-to-b" : "bg-gradient-to-r";
  const selectedScheme = COLOR_SCHEMES[color];

  const glowLayers: GlowLayer[] = [
    {
      size: isVertical ? "w-1 -ml-0.5" : "h-1 -mt-0.5",
      blur: "blur-sm",
      opacity: "opacity-100",
      color: selectedScheme.glow[0],
    },
    {
      size: isVertical ? "w-2 -ml-1" : "h-2 -mt-1",
      blur: "blur-md",
      opacity: "opacity-80",
      color: selectedScheme.glow[1],
    },
    {
      size: isVertical ? "w-4 -ml-2" : "h-4 -mt-2",
      blur: "blur-lg",
      opacity: "opacity-60",
      color: selectedScheme.glow[2],
    },
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", containerClasses, className)}
      style={positionStyle}
    >
      <div
        className={cn(
          "absolute inset-0 from-transparent to-transparent",
          gradientDirection,
          selectedScheme.core,
        )}
      />
      <div
        className={cn(
          "absolute inset-0 from-transparent via-white to-transparent opacity-60",
          gradientDirection,
          isVertical ? "w-0.5 -ml-px" : "h-0.5 -mt-px",
        )}
      />
      {glowLayers.map((layer, index) => (
        <div
          key={`${color}-${orientation}-layer-${index}`}
          className={cn(
            "absolute inset-0 from-transparent to-transparent",
            layer.size,
            gradientDirection,
            layer.color,
            layer.blur,
            layer.opacity,
          )}
        />
      ))}
    </div>
  );
}
