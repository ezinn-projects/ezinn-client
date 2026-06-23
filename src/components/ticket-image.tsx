"use client";

import React from "react";

interface TicketImageProps {
  bookingDetails: {
    name: string;
    phone: string;
    roomType: string;
    date: string;
    time: string;
    bookingCode: string;
  };
}

const TicketImage: React.FC<TicketImageProps> = ({ bookingDetails }) => {
  return (
    <div className="w-[400px] h-[600px] bg-white relative overflow-hidden ring-1 ring-accent">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-200 to-neutral-200"></div>
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-red-400 opacity-20"></div>
        <div className="absolute top-32 right-16 w-16 h-16 rounded-full bg-neutral-400 opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-red-400 opacity-20"></div>
        <div className="absolute bottom-32 right-10 w-18 h-18 rounded-full bg-neutral-400 opacity-20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-700 mb-2">JOZO</h1>
        </div>

        {/* Booking Code */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-lg border-2 border-dashed border-red-300">
          <div className="text-center">
            <p className="text-sm text-primary/70 mb-2">Mã đặt box</p>
            <p className="text-2xl font-bold text-red-700 tracking-wider font-mono">
              {bookingDetails.bookingCode}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold text-foreground mb-4 text-center">
            Thông tin đặt box
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-primary/10">
              <span className="text-primary/70 font-medium">Tên khách hàng:</span>
              <span className="text-foreground font-semibold text-right">
                {bookingDetails.name}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-primary/10">
              <span className="text-primary/70 font-medium">Số điện thoại:</span>
              <span className="text-foreground font-semibold text-right">
                {bookingDetails.phone}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-primary/10">
              <span className="text-primary/70 font-medium">Loại box:</span>
              <span className="text-foreground font-semibold text-right">
                {bookingDetails.roomType}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-primary/10">
              <span className="text-primary/70 font-medium">Ngày đặt:</span>
              <span className="text-foreground font-semibold text-right">
                {bookingDetails.date}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-primary/70 font-medium">Thời gian:</span>
              <span className="text-foreground font-semibold text-right">
                {bookingDetails.time}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-primary/55 mb-2">
            Vui lòng mang theo mã đặt box khi đến
          </p>
          <p className="text-xs text-primary/50">
            Cảm ơn bạn đã tin tưởng JOZO! 🎉
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-red-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-neutral-300 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default TicketImage;
