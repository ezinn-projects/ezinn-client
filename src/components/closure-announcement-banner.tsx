"use client";

import { useMemo } from "react";
import { isUnderMaintenance, CLOSURE_MESSAGE } from "@/config/closure";

export default function ClosureAnnouncementBanner() {
  const show = useMemo(() => isUnderMaintenance(), []);

  if (!show) return null;

  return (
    <div
      role="alert"
      className="bg-amber-500 text-amber-950 font-medium text-center py-3 px-4 shadow-md border-b border-amber-600/30"
      aria-live="polite"
    >
      <p className="max-w-4xl mx-auto text-sm sm:text-base">
        {CLOSURE_MESSAGE}
      </p>
    </div>
  );
}
