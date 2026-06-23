"use client";

type TierThreshold = [string, number];

type MembershipTierProgressProps = {
  tierThresholds: TierThreshold[];
  maxThreshold: number;
  absolutePercent: number;
};

export function MembershipTierProgress({
  tierThresholds,
  maxThreshold,
  absolutePercent,
}: MembershipTierProgressProps) {
  return (
    <div>
      {/* Track — chiều cao cố định, fill không tràn ra ngoài */}
      <div className="relative h-2.5 w-full">
        <div className="absolute inset-0 rounded-full bg-white/15" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white to-amber-200 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          style={{
            width: `${Math.min(100, Math.max(0, absolutePercent || 0))}%`,
          }}
        />
        {tierThresholds.length > 0 &&
          maxThreshold > 0 &&
          tierThresholds.map(([tier, value]) => {
            const pct = Math.min(
              100,
              Math.max(0, (value / maxThreshold) * 100),
            );
            return (
              <div
                key={`dot-${tier}`}
                className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pct}%` }}
              >
                <span className="block h-2 w-2 rounded-full border border-white/80 bg-white shadow" />
              </div>
            );
          })}
      </div>

      {/* Nhãn mốc — hàng riêng bên dưới track */}
      {tierThresholds.length > 0 && maxThreshold > 0 && (
        <div className="relative mt-2 h-8 w-full">
          {tierThresholds.map(([tier, value], index) => {
            const pct = Math.min(
              100,
              Math.max(0, (value / maxThreshold) * 100),
            );
            const isFirst = index === 0;
            const isLast = index === tierThresholds.length - 1;

            return (
              <div
                key={`label-${tier}`}
                className={`absolute top-0 whitespace-nowrap text-[10px] leading-tight text-white/80 ${
                  isFirst
                    ? "left-0 text-left"
                    : isLast
                      ? "right-0 text-right"
                      : "-translate-x-1/2 text-center"
                }`}
                style={isLast ? undefined : { left: isFirst ? 0 : `${pct}%` }}
              >
                <span className="font-semibold text-white/90">{tier}</span>
                <br />
                {value.toLocaleString("vi-VN")} điểm
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
