import type { ObjectId } from "mongodb";

export interface IStreakReward {
  count: number;
  bonusPoints: number;
  giftId?: ObjectId;
}

export interface IStreakConfig {
  windowDays: number;
  rewards: IStreakReward[];
}

export interface IBonusRules {
  [key: string]: unknown;
}

export interface IMembershipConfig {
  _id?: ObjectId;
  currencyUnit: number;
  pointPerCurrency: number;
  tierThresholds: Record<string, number>;
  bonusRules?: IBonusRules;
  streak?: IStreakConfig;
  dailySelfClaimLimitPerPhone?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMemberLoyalty {
  points?: number;
  totalPoints?: number;
  balance?: number;
  tier?: string;
  tierName?: string;
  streakCount?: number;
  lastClaimedAt?: string | Date;
  [key: string]: unknown;
}

export interface IMemberProfile {
  _id?: string | ObjectId;
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  fullName?: string;
  full_name?: string;
  name?: string;
  role?: string;
  tier?: string;
  tierName?: string;
  loyalty?: IMemberLoyalty;
  loyaltyPoints?: number;
  points?: number;
  membership?: {
    tier?: string;
    tierName?: string;
    points?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

