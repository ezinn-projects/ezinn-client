"use client";

import { useState } from "react";
import MenuItems from "./menu-items";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex sm:hidden">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white"
        aria-label="Toggle Menu"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
        className={`fixed top-[80px] right-0 z-40 h-full w-64 bg-black text-white transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <MenuItems onClick={() => setMenuOpen(false)} />
      </div>
    </div>
  );
}
