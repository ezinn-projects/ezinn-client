import Link from "next/link";

type MenuItem = {
  href: string;
  label: string;
  hideWhenAuthed?: boolean;
};

const menuItems: MenuItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/register", label: "Đăng ký thành viên", hideWhenAuthed: true },
  { href: "/login", label: "Đăng nhập", hideWhenAuthed: true },
  { href: "/booking-search", label: "Tra cứu đặt box" },
  { href: "/recruitment", label: "Tuyển dụng" },
  // { href: "/faq", label: "Câu hỏi thường gặp" },
];

export default function MenuItems({
  authed,
  onClick,
}: {
  authed?: boolean;
  onClick?: () => void;
}) {
  const visibleItems = menuItems.filter((item) =>
    authed ? !item.hideWhenAuthed : true
  );

  return (
    <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-6 bg-black md:bg-transparent">
      {visibleItems.map((item) => (
        <li
          key={item.href}
          className="border-b border-white md:border-none py-4 md:py-0"
        >
          <Link
            href={item.href}
            className="hover:underline whitespace-nowrap px-4 py-2 md:px-0"
            onClick={onClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
