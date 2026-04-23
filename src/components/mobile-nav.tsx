"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MenuItems from "./menu-items";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex sm:hidden">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-primary"
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
      {mounted &&
        createPortal(
          <>
            <button
              type="button"
              aria-label="Close Menu Overlay"
              onClick={() => setMenuOpen(false)}
              className={`fixed inset-0 z-[10000] bg-black/35 transition-opacity duration-300 ${
                menuOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            />
            <div
              className={`fixed top-[80px] right-0 z-[10001] h-[calc(100vh-80px)] w-64 border-l border-red-100 bg-white text-primary shadow-lg transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              <MenuItems onClick={() => setMenuOpen(false)} />
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
