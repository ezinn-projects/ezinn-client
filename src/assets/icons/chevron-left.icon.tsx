import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

function ChevronLeftIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-6 dark:stroke-black stroke-white", props.className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export default ChevronLeftIcon;
