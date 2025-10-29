"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface DateSelectProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export function DateSelect({
  value,
  onChange,
  error,
  label = "Ngày sinh",
  required = false,
}: DateSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dayRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentYear = isClient ? new Date().getFullYear() : 2024;
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const selectedDate = useMemo(() => {
    if (isClient) {
      return value || new Date();
    }
    return value || new Date(2024, 0, 1); // Default date for SSR
  }, [value, isClient]);

  const scrollToCenter = (element: HTMLElement, container: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollOffset =
      elementRect.top +
      elementRect.height / 2 -
      (containerRect.top + containerRect.height / 2);

    container.scrollBy({
      top: scrollOffset,
      behavior: "smooth",
    });
  };

  const handleSelect = (type: "day" | "month" | "year", val: number) => {
    if (!isClient) return;

    const newDate = new Date(selectedDate);
    if (type === "day") newDate.setDate(val);
    if (type === "month") newDate.setMonth(val - 1);
    if (type === "year") newDate.setFullYear(val);
    onChange(newDate);

    // Scroll to center after selection
    setTimeout(() => {
      const selectedElement = document.querySelector(`[data-${type}="${val}"]`);
      const containerRef =
        type === "day" ? dayRef : type === "month" ? monthRef : yearRef;

      if (selectedElement && containerRef.current) {
        scrollToCenter(selectedElement as HTMLElement, containerRef.current);
      }
    }, 0);
  };

  // Initial scroll to selected values when opened
  useEffect(() => {
    if (isOpen && isClient) {
      setTimeout(() => {
        const containers = {
          day: { ref: dayRef.current, value: selectedDate.getDate() },
          month: { ref: monthRef.current, value: selectedDate.getMonth() + 1 },
          year: { ref: yearRef.current, value: selectedDate.getFullYear() },
        };

        Object.entries(containers).forEach(([type, { ref, value }]) => {
          const selectedElement = document.querySelector(
            `[data-${type}="${value}"]`
          );
          if (selectedElement && ref) {
            scrollToCenter(selectedElement as HTMLElement, ref);
          }
        });
      }, 0);
    }
  }, [isOpen, selectedDate, isClient]);

  // Click outside handler
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isClient]);

  return (
    <div className="relative">
      <label className="block font-medium text-lightpink mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-2 text-left bg-white rounded-md border text-black border-black/20",
          "focus:outline-none focus:ring-2 focus:ring-black/20",
          "flex items-center justify-between",
          error && "border-red-500"
        )}
      >
        <span>
          {isClient
            ? selectedDate.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Đang tải..."}
        </span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      <AnimatePresence>
        {isOpen && isClient && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-black/20"
          >
            <div className="grid grid-cols-3 p-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-black/60">
                  Ngày
                </label>
                <div
                  ref={dayRef}
                  className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20"
                >
                  {days.map((day) => (
                    <motion.button
                      key={day}
                      data-day={day}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect("day", day)}
                      className={cn(
                        "w-full px-2 py-1 text-sm rounded-md text-black",
                        isClient && selectedDate.getDate() === day
                          ? "bg-lightpink text-white"
                          : "hover:bg-lightpink/5"
                      )}
                    >
                      {day}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-black/60">
                  Tháng
                </label>
                <div
                  ref={monthRef}
                  className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20"
                >
                  {months.map((month) => (
                    <motion.button
                      key={month}
                      data-month={month}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect("month", month)}
                      className={cn(
                        "w-full px-2 py-1 text-sm rounded-md text-black",
                        isClient && selectedDate.getMonth() + 1 === month
                          ? "bg-lightpink text-white"
                          : "hover:bg-lightpink/5"
                      )}
                    >
                      {month}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-black/60">Năm</label>
                <div
                  ref={yearRef}
                  className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20"
                >
                  {years.map((year) => (
                    <motion.button
                      key={year}
                      data-year={year}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect("year", year)}
                      className={cn(
                        "w-full px-2 py-1 text-sm rounded-md text-black",
                        isClient && selectedDate.getFullYear() === year
                          ? "bg-lightpink text-white"
                          : "hover:bg-lightpink/5"
                      )}
                    >
                      {year}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* OK Button */}
            <div className="p-2 border-t border-black/10">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 px-4 bg-lightpink text-white rounded-md hover:bg-lightpink/80 animate-buttonheartbeat transition-colors"
              >
                OK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
