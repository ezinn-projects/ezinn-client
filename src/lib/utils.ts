import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

/**
 * A shorthand for `twMerge(clsx(...inputs))` which is often used for combining
 * multiple utility class names into a single string.
 *
 * @example
 * import { cn } from "@/lib/utils";
 *
 * const className = cn("text-lg", "font-bold", "text-primary");
 * // className === "text-lg font-bold text-primary"
 *
 * @param inputs - A list of utility class names or objects that will be merged
 *                 using Tailwind's {@link https://tailwindcss.com/docs/utility-first#using-objects|object syntax}.
 * @returns A single string containing the merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Format a date object into a string in the format "EEEE, dd/MM/yyyy"
 * where EEEE is the full weekday name in Vietnamese.
 *
 * @param {Date} date - date object to format
 * @returns {string} formatted date string
 */

export const formatDate = (date: Date) => {
  return format(date, "eeee, dd/MM/yyyy", { locale: vi });
};

/**
 * Add minutes to a given time string.
 *
 * @param {string} time - time string in "HH:mm" format
 * @param {number} minutes - number of minutes to add
 * @returns {string} new time string in "HH:mm" format
 */
export function addMinutes(time: string, minutes: number) {
  const [hour, min] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + min + minutes;
  const newHour = Math.floor(totalMinutes / 60);
  const newMin = totalMinutes % 60;
  return `${String(newHour).padStart(2, "0")}:${String(newMin).padStart(
    2,
    "0"
  )}`;
}

/**
 * Định dạng số tiền theo chuẩn VNĐ
 * @param amount Số tiền cần định dạng
 * @returns Chuỗi định dạng VNĐ
 */
export function formatCurrencyVND(amount: number): string {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
