"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import TimeSlot from "@/components/time-slot";
import { addMinutes, formatCurrencyVND, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const fixedTimeSlots = [
  "06:00 - 08:00",
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
  "20:00 - 22:00",
];

const existingBookings = [{ start: "08:00", end: "10:00", date: "2024-11-23" }];

const cleaningTime = 60; // Thời gian dọn phòng

// Tính toán các khung giờ khả dụng
const calculateAvailableSlots = (date: string) => {
  const bookingsForDate = existingBookings.filter((b) => b.date === date);

  return fixedTimeSlots.filter((slot) => {
    const [slotStart, slotEnd] = slot.split(" - ");
    return !bookingsForDate.some(
      (booking) =>
        (slotStart >= booking.start &&
          slotStart < addMinutes(booking.end, cleaningTime)) ||
        (slotEnd > booking.start &&
          slotEnd <= addMinutes(booking.end, cleaningTime))
    );
  });
};

function BookingSection({ price }: { price: number }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookingType, setBookingType] = useState<"hourly" | "overnight">(
    "hourly"
  );

  const handleBookingTypeChange = (value: "hourly" | "overnight") => {
    setBookingType(value);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const slots = calculateAvailableSlots(formatDate(date));
      setAvailableSlots(slots);
      setSelectedDate(date);
    }
  };

  const handleSlotSelect = (slot: string) => {
    const checkIfAdjacent = (lastSlot: string, currentSlot: string) => {
      const [lastStart, lastEnd] = lastSlot.split(" - ");
      const [currentStart] = currentSlot.split(" - ");
      console.log("l", lastStart, lastEnd);
      console.log("c", currentStart);
      return lastEnd === currentStart; // Liên tiếp nếu thời gian kết thúc của slot trước = thời gian bắt đầu của slot sau
    };

    if (selectedSlots.includes(slot)) {
      // Bỏ chọn: Chỉ được bỏ khung giờ đầu tiên hoặc cuối cùng
      if (
        slot === selectedSlots[0] ||
        slot === selectedSlots[selectedSlots.length - 1]
      ) {
        setSelectedSlots((prev) => prev.filter((s) => s !== slot));
      } else {
        toast({
          title: "Bạn chỉ có thể bỏ khung giờ đầu hoặc cuối!",
        });
      }
    } else {
      // Thêm mới: Kiểm tra liên tiếp và giới hạn 3 khung giờ
      if (selectedSlots.length === 0) {
        setSelectedSlots([slot]);
      } else if (selectedSlots.length < 3) {
        const lastSlot = selectedSlots[selectedSlots.length - 1];
        const firstSlot = selectedSlots[0];

        // Kiểm tra nếu khung giờ liền kề với khung giờ đầu tiên hoặc cuối cùng
        const isAdjacentToLast = checkIfAdjacent(lastSlot, slot);
        const isAdjacentToFirst = checkIfAdjacent(slot, firstSlot);

        if (isAdjacentToLast || isAdjacentToFirst) {
          setSelectedSlots((prev) =>
            isAdjacentToLast ? [...prev, slot] : [slot, ...prev]
          );
        } else {
          toast({
            title: "Vui lòng chọn khung giờ liền kề với đã chọn!",
          });
        }
      } else {
        toast({
          title: "Bạn chỉ được chọn tối đa 3 khung giờ liên tiếp!",
        });
      }
    }
  };

  return (
    <div className="mt-3">
      <RadioGroup
        value={bookingType}
        onValueChange={handleBookingTypeChange}
        className="flex"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hourly" id="hourly" />
          <Label htmlFor="hourly">Theo giờ</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="overnight" id="overnight" />
          <Label htmlFor="overnight">Theo đêm</Label>
        </div>
      </RadioGroup>

      <Calendar
        onSelect={handleDateSelect}
        mode="single"
        selected={selectedDate}
      />

      {bookingType === "hourly" && (
        <TimeSlot
          selectedDate={formatDate(selectedDate)}
          availableSlots={availableSlots}
          selectedSlots={selectedSlots}
          onSelectSlots={handleSlotSelect}
        />
      )}

      {/* CTA (Call to Action) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t shadow-md flex justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">
            {formatCurrencyVND(selectedSlots.length * 2 * price)}
          </p>

          {/* Hiển thị ngày và giờ */}
          <p className="text-gray-600 text-sm">
            {!selectedSlots.length ? (
              "Chưa chọn ngày"
            ) : (
              <>
                {" "}
                {formatDate(selectedDate)} |{" "}
                <>
                  {selectedSlots[0].split(" - ")[0]} -{" "}
                  {selectedSlots[selectedSlots.length - 1].split(" - ")[1]}
                </>
              </>
            )}
          </p>
        </div>
        <Button
          className="py-3 rounded-lg font-semibold h-full"
          disabled={selectedSlots.length === 0}
        >
          Đặt phòng
        </Button>
      </div>
    </div>
  );
}

export default BookingSection;
