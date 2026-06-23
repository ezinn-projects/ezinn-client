type MembershipLike = {
  user?: Record<string, unknown>;
  progress?: {
    currentTier?: string;
    currentPoints?: number;
    points?: number;
    nextTier?: { tier?: string; required?: number };
  };
  config?: {
    tierThresholds?: Record<string, number>;
  };
};

type TierThreshold = [string, number];

export const extractMembershipPoints = (
  membership: MembershipLike | null | undefined,
): number | null => {
  if (!membership) return null;

  const user = membership.user;
  const progress = membership.progress;
  const loyalty =
    user?.loyalty && typeof user.loyalty === "object"
      ? (user.loyalty as Record<string, unknown>)
      : null;

  const candidates = [
    progress?.currentPoints,
    progress?.points,
    user?.points,
    user?.totalPoints,
    user?.loyaltyPoints,
    loyalty?.points,
    loyalty?.totalPoints,
    loyalty?.balance,
  ];

  for (const value of candidates) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return Math.max(0, value);
    }
  }

  return null;
};

export const computeMembershipProgress = (
  membership: MembershipLike | null | undefined,
  tierThresholds: TierThreshold[] | undefined,
) => {
  const currentTier = membership?.progress?.currentTier ?? null;
  const nextTierName = membership?.progress?.nextTier?.tier ?? null;
  const nextTierRequired = membership?.progress?.nextTier?.required;
  const maxThreshold =
    tierThresholds && tierThresholds.length > 0
      ? tierThresholds[tierThresholds.length - 1][1]
      : 0;

  const currentThreshold =
    tierThresholds?.find(([tier]) => tier === currentTier)?.[1] ?? 0;
  const nextThreshold =
    tierThresholds?.find(([tier]) => tier === nextTierName)?.[1] ?? null;

  const apiPoints = extractMembershipPoints(membership);
  let currentPoints = apiPoints;

  if (
    currentPoints === null &&
    tierThresholds &&
    currentTier &&
    nextTierName &&
    nextThreshold !== null
  ) {
    const span = Math.max(0, nextThreshold - currentThreshold);
    const remaining = Math.max(0, nextTierRequired ?? span);
    currentPoints = currentThreshold + Math.max(0, span - remaining);
  }

  currentPoints = currentPoints ?? 0;

  const remainingToNextTier =
    nextThreshold !== null
      ? Math.max(0, nextThreshold - currentPoints)
      : null;

  const absolutePercent =
    maxThreshold > 0
      ? Math.min(100, (currentPoints / maxThreshold) * 100)
      : 0;

  return {
    currentTier,
    nextTierName,
    currentPoints,
    remainingToNextTier,
    maxThreshold,
    nextThreshold,
    absolutePercent,
  };
};
