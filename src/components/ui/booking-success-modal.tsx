"use client";

import { Check, Copy, Download } from "lucide-react";
import Link from "next/link";

interface BookingSuccessModalProps {
  isOpen: boolean;
  bookingDetails: {
    name: string;
    phone: string;
    date: string;
    time: string;
    roomType: string;
  };
  bookingId: string;
  bookingCode: string;
  onCopyCode: () => void;
  onDownloadTicket: () => void;
}

export default function BookingSuccessModal({
  isOpen,
  bookingDetails,
  bookingId,
  bookingCode,
  onCopyCode,
  onDownloadTicket,
}: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        {/* Action buttons in top right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={onDownloadTicket}
            className="p-2 bg-lightpink text-white rounded-lg hover:bg-pink-600 transition-colors"
            title="Tải vé"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-lightpink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Check className="text-white w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-center text-lightpink mb-4">
          Đặt box thành công!
        </h2>

        <div className="mb-6 border-2 border-dashed border-lightpink/40 rounded-lg p-4 bg-lightpink/5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lightpink">Mã đặt box:</span>
            <div className="flex items-center">
              <span className="font-mono text-lg font-bold tracking-wider text-lightpink mr-2">
                {bookingCode}
              </span>
              <button
                onClick={onCopyCode}
                className="text-lightpink hover:text-pink-700"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mb-3">
            Vui lòng lưu lại mã đặt box để tra cứu sau này
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tên khách hàng:</span>
              <span className="font-medium text-lightpink">
                {bookingDetails.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium text-lightpink">
                {bookingDetails.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loại box:</span>
              <span className="font-medium text-lightpink">
                {bookingDetails.roomType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày đặt:</span>
              <span className="font-medium text-lightpink">
                {bookingDetails.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian:</span>
              <span className="font-medium text-lightpink">
                {bookingDetails.time}
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 mb-6">
          Yay! Đặt box thành công rồi nè! 🎉 Hẹn gặp khách iu đúng giờ để cùng
          quẩy tung nóc nha! ✨
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href={`/search-songs/${bookingId}`}
            className="w-full py-3 bg-lightpink text-white rounded-lg hover:bg-pink-600 transition-colors animate-buttonheartbeat font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            Tìm kiếm & chọn bài hát
          </Link>
          <Link
            href="/booking-search"
            className="w-full py-3 bg-white text-center text-lightpink border-2 border-lightpink rounded-lg hover:bg-lightpink hover:text-white transition-colors"
          >
            Tra cứu đặt box
          </Link>
          <Link
            href="/"
            className="w-full py-3 bg-white text-center text-lightpink border-2 border-lightpink rounded-lg hover:bg-lightpink hover:text-white transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
