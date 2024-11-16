"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, MouseEvent } from "react";

function Nav() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState<number>(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else if (window.scrollY < lastScrollY || window.scrollY === 0) {
        setShowHeader(true);
      }
      lastScrollY = window.scrollY;

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        if (window.scrollY > 0) {
          setShowHeader(true);
        }
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && !(event.target as HTMLElement).closest("nav")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener(
      "click",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [menuOpen]);

  return (
    <nav
      className={`container mx-auto flex justify-between items-center px-4 fixed top-0 left-0 right-0 bg-black text-white z-50 transition-transform duration-500 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${scrollY > 0 ? "backdrop-blur-md bg-opacity-40" : "bg-opacity-100"}`}
    >
      <div className="text-2xl font-bold">
        <Link href="/">
          <Image
            src="/images/ezinn-logo.png"
            alt="Ezinn Homestay"
            width={200}
            height={50}
            className="hidden md:block"
          />
          <Image
            src="/images/ezinn-logo.png"
            alt="Ezinn Homestay"
            width={90}
            height={30}
            className="block md:hidden"
          />
        </Link>
      </div>
      <button
        className="text-white md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
      <div
        className={`fixed top-[74px] z-40 right-0 h-full w-64 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:transform-none md:flex md:space-x-6`}
      >
        <ul
          className={`flex flex-col mt-4 md:mt-0 md:flex-row md:space-x-6 ${
            scrollY > 0
              ? "bg-black bg-opacity-40 backdrop-blur-md"
              : "bg-black bg-opacity-100"
          }`}
        >
          <li className="border-b border-white md:border-none py-4 md:py-0">
            <Link
              href="/"
              className="hover:underline whitespace-nowrap px-4 py-2 md:px-0"
              onClick={() => setMenuOpen(false)}
            >
              Trang chủ
            </Link>
          </li>
          <li className="border-b border-white md:border-none py-4 md:py-0">
            <Link
              href="/policies"
              className="hover:underline whitespace-nowrap px-4 py-2 md:px-0"
              onClick={() => setMenuOpen(false)}
            >
              Chính sách
            </Link>
          </li>
          <li className="border-b border-white md:border-none py-4 md:py-0">
            <Link
              href="/about"
              className="hover:underline whitespace-nowrap px-4 py-2 md:px-0"
              onClick={() => setMenuOpen(false)}
            >
              Giới thiệu
            </Link>
          </li>
          <li className="border-b border-white md:border-none py-4 md:py-0">
            <Link
              href="/contact"
              className="hover:underline whitespace-nowrap px-4 py-2 md:px-0"
              onClick={() => setMenuOpen(false)}
            >
              Liên hệ
            </Link>
          </li>
          <li className="border-b border-white md:border-none py-4 md:py-0">
            <Link
              href="/faq"
              className="hover:underline whitespace-nowrap px-4 py-2 md:px-0"
              onClick={() => setMenuOpen(false)}
            >
              Câu hỏi thường gặp
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
