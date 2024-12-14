import React from "react";
import clsx from "clsx";

type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "a";
  children: React.ReactNode;
  className?: string;
  href?: string; // Dành riêng cho link
  variant?: "default" | "bold" | "semibold" | "italic"; // Kiểu chữ (tùy chọn)
};

const Typography: React.FC<TypographyProps> = ({
  as = "p",
  children,
  className = "text-black dark:text-white",
  href,
  variant = "default",
}) => {
  const Component = as;

  // Áp dụng class CSS theo từng thẻ và responsive
  const baseClass = clsx(
    {
      h1: "text-2xl sm:text-3xl md:text-4xl font-bold leading-tight",
      h2: "text-xl sm:text-2xl md:text-3xl font-semibold leading-snug",
      h3: "text-lg sm:text-xl md:text-2xl font-medium",
      h4: "text-base sm:text-lg md:text-xl font-medium",
      h5: "text-sm sm:text-base md:text-lg font-medium",
      h6: "text-xs sm:text-sm md:text-base font-medium",
      p: "text-sm sm:text-base leading-relaxed",
      span: "text-xs sm:text-sm",
      a: "text-blue-500 hover:underline",
    }[as],
    // Màu chủ đạo
    variant === "bold" && "font-bold",
    variant === "semibold" && "font-semibold",
    variant === "italic" && "italic",
    className // Cho phép custom thêm class bên ngoài
  );

  // Xử lý đặc biệt cho thẻ <a>
  if (as === "a" && href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }

  return <Component className={baseClass}>{children}</Component>;
};

export default Typography;
