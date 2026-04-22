import Link from "next/link";

const menuItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/register", label: "Đăng ký thành viên" },
  { href: "/booking-search", label: "Tra cứu đặt box" },
  { href: "/recruitment", label: "Tuyển dụng" },
  // { href: "/faq", label: "Câu hỏi thường gặp" },
];

export default function MenuItems({ onClick }: { onClick?: () => void }) {
  return (
    <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-6 bg-white md:bg-transparent text-primary">
      {menuItems.map((item) => (
        <li
          key={item.href}
          className="border-b border-primary/15 md:border-none py-4 md:py-0"
        >
          <Link
            href={item.href}
            className="text-primary hover:text-brand-hover hover:underline whitespace-nowrap px-4 py-2 md:px-0"
            onClick={onClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
