"use client";

import React from "react";
import Image from "next/image";

interface JozoLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function JozoLoader({
  size = "md",
  className = "",
}: JozoLoaderProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const logoSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer rotating ring */}
      <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-red-600 border-r-red-400 animate-spin"></div>

      {/* Inner rotating ring */}
      <div
        className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary border-l-red-300 animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
      ></div>

      {/* Jozo Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/images/jozo-logo.webp"
          alt="Jozo Logo"
          width={40}
          height={40}
          className={`${logoSizeClasses[size]} object-contain animate-pulse`}
        />
      </div>
    </div>
  );
}

// Variant với text
export function JozoLoaderWithText({
  text = "Đang tải...",
  size = "md",
  className = "",
}: JozoLoaderProps & { text?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <JozoLoader size={size} />
      <p className="text-sm text-primary/70 font-medium animate-pulse">{text}</p>
    </div>
  );
}

// Variant cho button
export function JozoLoaderButton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <JozoLoader size="sm" />
      <span>Đang tìm...</span>
    </div>
  );
}
