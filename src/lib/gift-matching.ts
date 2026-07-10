import { extractGiftId, normalizeObjectId } from "@/lib/object-id";
import type { Gift } from "@/types/gift";

type RewardLike = {
  count: number;
  giftId?: unknown;
  gift?: unknown;
};

export const resolveGiftForReward = (
  reward: RewardLike,
  gifts: Gift[],
): Gift | undefined => {
  if (reward.gift && typeof reward.gift === "object" && "name" in reward.gift) {
    return reward.gift as Gift;
  }

  const giftId = extractGiftId(reward);
  if (giftId) {
    const byId = gifts.find(
      (gift) => normalizeObjectId(gift._id) === giftId,
    );
    if (byId) return byId;
  }

  const countLabel = String(reward.count);
  const byName = gifts.find((gift) => gift.name === countLabel);
  if (byName) return byName;

  const byComboName = gifts.find((gift) => gift.name === `combo ${countLabel}`);
  if (byComboName) return byComboName;

  return undefined;
};
