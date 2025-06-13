import Link from "next/link";

export default function BetaBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 text-center">
      <p className="text-sm md:text-base">
        🚧 Đây là phiên bản beta - Vui lòng{" "}
        <Link
          href="https://www.facebook.com/messages/t/599129623288900"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline hover:text-pink-200 transition-colors"
        >
          nhắn tin qua Messenger
        </Link>{" "}
        để đặt phòng 🚧
        <br />
        <span className="text-xs md:text-sm opacity-90">
          Hứa với khách iu sẽ sớm có chức năng đặt phòng online, không lười nữa!
          💪
        </span>
      </p>
    </div>
  );
}
