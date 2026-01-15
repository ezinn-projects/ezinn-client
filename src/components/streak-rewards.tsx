"use client";

import { useMemo, useState } from "react";
import type { Gift } from "@/types/gift";

type StreakReward = {
  count: number;
  bonusPoints: number;
  giftId?: string;
};

type Props = {
  windowDays: number;
  currentCount: number;
  rewards: StreakReward[];
  gifts: Gift[];
};

const dayLabel = (day: number) => `Ngày ${day}`;

const GiftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 7h-1.18A3 3 0 0 0 21 5a3 3 0 0 0-5.4-1.6L14.62 5H9.38l-1-1.6A3 3 0 0 0 3 5a3 3 0 0 0 2.18 2H4a1 1 0 0 0-1 1v3.5A2.5 2.5 0 0 0 5.5 14H6v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6h.5A2.5 2.5 0 0 0 21 11.5V8a1 1 0 0 0-1-1ZM17 4a1 1 0 0 1 0 2h-2.12ZM7 4 9.12 6H7a1 1 0 0 1 0-2Zm3 16H8v-6h2Zm6 0h-2v-6h2Zm2.5-8.5a.5.5 0 0 1-.5.5H5.5a.5.5 0 0 1-.5-.5V9h14Z" />
  </svg>
);

export function StreakRewards({
  windowDays,
  currentCount,
  rewards,
  gifts,
}: Props) {
  const cappedWindow = Math.max(1, Math.min(windowDays || 0, 60));

  const rewardMap = useMemo(() => {
    const byId = new Map<string, Gift>();
    gifts.forEach((gift) => {
      if (gift?._id) {
        byId.set(String(gift._id), gift);
      }
    });

    const map = new Map<
      number,
      StreakReward & {
        gift?: Gift;
      }
    >();
    rewards?.forEach((reward) => {
      const gift =
        reward.giftId && byId.get(reward.giftId)
          ? byId.get(reward.giftId)
          : undefined;
      map.set(reward.count, { ...reward, gift });
    });
    return map;
  }, [rewards, gifts]);

  const [selected, setSelected] = useState<
    (StreakReward & { gift?: Gift }) | null
  >(null);

  return (
    <div className="space-y-3">
      <style jsx>{`
        @keyframes shimmerGift {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Chuỗi điểm danh</p>
          <p className="text-xs text-gray-500">
            {currentCount} / {cappedWindow} ngày · Chạm vào mốc để xem quà
          </p>
        </div>
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))",
        }}
      >
        {Array.from({ length: cappedWindow }).map((_, idx) => {
          const day = idx + 1;
          const active = day <= currentCount;
          const reward = rewardMap.get(day);
          const isNext = day === currentCount + 1;
          const hasGift = Boolean(reward?.gift || reward?.giftId);

          return (
            <button
              key={day}
              type="button"
              onClick={() => reward && hasGift && setSelected(reward)}
              className={`relative flex h-14 w-full items-center justify-center rounded-xl border text-[11px] font-semibold overflow-hidden transition focus:outline-none ${
                active
                  ? "bg-gradient-to-br from-emerald-100 via-white to-emerald-50 border-emerald-200 text-emerald-800 shadow-sm"
                  : "bg-gray-50 border-gray-200 text-gray-600"
              } ${isNext ? "ring-2 ring-emerald-300" : ""} ${
                reward && hasGift ? "hover:-translate-y-[1px] hover:shadow" : ""
              }`}
              title={
                reward
                  ? `Mốc ${day}: +${reward.bonusPoints} điểm${
                      reward.gift ? ` · ${reward.gift.name}` : ""
                    }`
                  : dayLabel(day)
              }
            >
              {reward ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-1 text-center relative">
                  {hasGift && (
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          "linear-gradient(110deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.18) 45%, rgba(16,185,129,0.08) 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmerGift 2.2s linear infinite",
                      }}
                    />
                  )}

                  <div className="relative flex flex-col items-center gap-1">
                    {hasGift ? (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow ring-1 ring-emerald-100 animate-pulse">
                        <GiftIcon className="h-5 w-5" />
                      </div>
                    ) : (
                      <span className="text-[10px] text-gray-600">
                        Quà tặng
                      </span>
                    )}
                  </div>
                </div>
              ) : active ? (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-white/60 text-[11px] font-bold text-emerald-800">
                  ✓
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-gray-700">
                  {dayLabel(day)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-5 space-y-4">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200"
            >
              Đóng
            </button>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Mốc {selected.count}/{cappedWindow}
              </p>
              <h3 className="text-lg font-bold text-gray-900">
                +{selected.bonusPoints} điểm thưởng
              </h3>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
              {selected.gift?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.gift.image}
                  alt={selected.gift.name}
                  className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-white border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-500">
                  No image
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                  {selected.gift?.name || "Quà tặng"}
                </p>

                {selected.gift?.discountAmount ? (
                  <p className="text-xs font-semibold text-emerald-700">
                    Giảm {selected.gift.discountAmount.toLocaleString("vi-VN")}đ
                  </p>
                ) : selected.gift?.discountPercentage ? (
                  <p className="text-xs font-semibold text-emerald-700">
                    Giảm {selected.gift.discountPercentage}%
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
