"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/register", label: "Đăng ký thành viên" },
  { href: "/booking-search", label: "Tra cứu đặt box" },
  { href: "/recruitment", label: "Tuyển dụng" },
  // { href: "/faq", label: "Câu hỏi thường gặp" },
];

type MenuItemsProps = {
  onClick?: () => void;
  mobile?: boolean;
};

export default function MenuItems({ onClick, mobile = false }: MenuItemsProps) {
  const pathname = usePathname();

  return (
    <ul
      className={`text-primary ${
        mobile
          ? "mt-0 flex flex-col gap-1 bg-transparent"
          : "mt-4 flex flex-col bg-white md:mt-0 md:flex-row md:space-x-6 md:bg-transparent"
      }`}
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li
            key={item.href}
            className={`${
              mobile
                ? "py-0"
                : "border-b border-primary/15 py-4 md:border-none md:py-0"
            }`}
          >
            <Link
              href={item.href}
              className={`whitespace-nowrap transition-all ${
                mobile
                  ? `flex items-center rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-primary/10 text-brand-hover shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.35)]"
                        : "text-primary/90 hover:bg-primary/5 hover:text-brand-hover"
                    }`
                  : `px-4 py-2 text-primary hover:text-brand-hover hover:underline md:px-0 ${
                      isActive ? "text-brand-hover" : ""
                    }`
              }`}
              onClick={onClick}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
