"use client";

import React, { useState } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

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
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  showPasswordToggle?: boolean;
}

/**
 * Component Input dùng chung, hỗ trợ cả kiểu text và number.
 * - Nếu type là "number", sẽ tự động enforces giới hạn số ký tự (maxLength) trong hàm onChange.
 */
const Input: React.FC<InputProps> = ({
  label,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Nếu type là number, chỉ cho phép nhập số
    if (type === "number") {
      // Kiểm tra nếu giá trị không phải số hoặc vượt quá maxLength thì return
      if (!/^\d*$/.test(value) || (maxLength && value.length > maxLength)) {
        return;
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-4">
      {label && <label className="block text-lightpink mb-1">{label}</label>}
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </div>
        )}
        <input
          type={inputType}
          onChange={handleChange}
          maxLength={maxLength}
          className={`w-full border rounded px-3 py-2 text-black outline-none 
            active:ring-2 focus:ring-2 focus:ring-lightpink focus:border-lightpink 
            transition-colors
            ${prefix ? "pl-10" : ""} 
            ${suffix || showPasswordToggle ? "pr-10" : ""}
            ${className || ""} 
            ${error ? "border-red-500" : "border-black/20"}`}
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
