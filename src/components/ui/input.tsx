"use client";

import React, { useState } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "suffix"
  > {
  /**
   * Nhãn hiển thị cho trường nhập liệu.
   */
  label?: string;
  /**
   * Số ký tự tối đa. Với kiểu number, giá trị này sẽ được enforced qua logic.
   */
  maxLength?: number;
  /**
   * Lỗi hiển thị khi có lỗi.
   */
  error?: string;
  helpText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  showPasswordToggle?: boolean;
  required?: boolean;
}

/**
 * Component Input dùng chung, hỗ trợ cả kiểu text và number.
 * - Nếu type là "number", sẽ tự động enforces giới hạn số ký tự (maxLength) trong hàm onChange.
 */
const Input: React.FC<InputProps> = ({
  label,
  required,
  helpText,
  type = "text",
  maxLength,
  onChange,
  className,
  error,
  prefix,
  suffix,
  showPasswordToggle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const value = e.target.value;
      if (!/^\d*$/.test(value) || (maxLength && value.length > maxLength)) {
        return;
      }
    }
    onChange?.(e);
  };

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : "text"; // Luôn sử dụng type="text"

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const value = e.key;
      if (!/^\d*$/.test(value) || (maxLength && value.length > maxLength)) {
        e.preventDefault();
      }
    }
  };

  // Thêm key để force re-render khi có error
  const animationKey = error ? "error" : "normal";

  return (
    <div className="mb-4" key={animationKey}>
      {label && (
        <label className="block text-lightpink mb-1">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </div>
        )}
        <input
          type={inputType}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          maxLength={maxLength}
          className={cn(
            "w-full border rounded px-3 py-2 text-black outline-none",
            "transition-all duration-200 ease-in-out",
            "focus:ring-2 focus:ring-lightpink focus:border-lightpink",
            error && [
              "border-red-500",
              "animate-shake-vertical",
              "focus:ring-red-500",
            ],
            prefix && "pl-10",
            (suffix || showPasswordToggle) && "pr-10",
            className
          )}
          {...props}
        />
        {(suffix || showPasswordToggle) && (
          <div className="absolute right-3 top-1/2 -translate-y-[35%] text-gray-500">
            {showPasswordToggle ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-lightpink focus:outline-none"
              >
                {showPassword ? (
                  <EyeOpenIcon className="h-4 w-4" />
                ) : (
                  <EyeNoneIcon className="h-4 w-4" />
                )}
              </button>
            ) : (
              suffix
            )}
          </div>
        )}
      </div>
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
