"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type MobileSnapSliderProps = {
  children: ReactNode;
  /** Chiều rộng mỗi slide trên mobile (để lộ cạnh card kế tiếp) */
  slideClassName?: string;
  /** Class grid từ breakpoint sm trở lên */
  desktopClassName: string;
  className?: string;
  showDots?: boolean;
};

export default function MobileSnapSlider({
  children,
  slideClassName = "w-[82%] max-w-[300px]",
  desktopClassName,
  className,
  showDots = true,
}: MobileSnapSliderProps) {
  const items = Children.toArray(children);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || items.length <= 1) return;

    const onScroll = () => {
      const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
      if (!slides.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;

      slides.forEach((slide, i) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - slideCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });

      setActive(best);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelectorAll<HTMLElement>("[data-slide]")[index];
    if (!slide) return;
    el.scrollTo({ left: Math.max(0, slide.offsetLeft - 16), behavior: "smooth" });
  };

  if (items.length <= 1) {
    return (
      <div className={cn("max-w-md mx-auto w-full", className)}>{children}</div>
    );
  }

  return (
    <div className={className}>
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((child, i) => (
            <div
              key={
                isValidElement(child) && child.key != null
                  ? String(child.key)
                  : i
              }
              data-slide
              className={cn("shrink-0 snap-center", slideClassName)}
            >
              {child}
            </div>
          ))}
        </div>

        {showDots && (
          <div className="mt-3 flex justify-center gap-1.5" role="tablist">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Trang ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-5 bg-primary" : "w-1.5 bg-primary/30",
                )}
              />
            ))}
          </div>
        )}
      </div>

      <div className={cn("hidden sm:grid", desktopClassName)}>{children}</div>
    </div>
  );
}
