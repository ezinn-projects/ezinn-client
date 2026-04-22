"use client";

import {
  Facebook,
  Music2,
  Calendar,
  MessageCircleMore,
  X,
} from "lucide-react";
import { useCallback, useState, type ElementType } from "react";

type ContactAction = {
  label: string;
  href?: string;
  icon: ElementType;
  onClick?: () => void;
};

const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61575350724412&locale=vi_VN";
const TIKTOK_URL =
  "https://www.tiktok.com/@jozomusicbox?is_from_webapp=1&sender_device=pc";

const buttonBaseClass =
  "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const FloatingContactButtons = () => {
  const [open, setOpen] = useState(false);

  const handleBookingClick = useCallback(() => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "booking";
    }
  }, []);

  const toggleOpen = () => setOpen((v) => !v);

  const contacts: ContactAction[] = [
    { label: "Facebook", href: FACEBOOK_URL, icon: Facebook },
    { label: "TikTok", href: TIKTOK_URL, icon: Music2 },
    { label: "Đặt box", icon: Calendar, onClick: handleBookingClick },
  ];

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`flex flex-col items-end gap-3 transition-all ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {contacts.map(({ label, href, icon: Icon, onClick }) =>
          href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={buttonBaseClass}
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-foreground">{label}</span>
            </a>
          ) : (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={buttonBaseClass}
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-foreground">{label}</span>
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={toggleOpen}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={open ? "Đóng liên hệ" : "Mở liên hệ"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircleMore className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default FloatingContactButtons;

