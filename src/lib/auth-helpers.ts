import type { IMemberProfile, IMembershipConfig } from "@/types/membership";

export const getTokenFromResponse = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as Record<string, unknown>;
  const resultObj = data.result as Record<string, unknown> | undefined;
  const candidates = [
    data.token,
    data.accessToken,
    data.access_token,
    resultObj?.token,
    resultObj?.accessToken,
    resultObj?.access_token,
    (data.data as Record<string, unknown> | undefined)?.token,
    (data.data as Record<string, unknown> | undefined)?.accessToken,
    (data.data as Record<string, unknown> | undefined)?.access_token,
    (resultObj?.data as Record<string, unknown> | undefined)?.token,
    (resultObj?.data as Record<string, unknown> | undefined)?.accessToken,
    (resultObj?.data as Record<string, unknown> | undefined)?.access_token,
  ];
  return (
    (candidates.find((t) => typeof t === "string" && t.trim()) as string) ||
    null
  );
};

const isUserLike = (value: unknown): value is IMemberProfile => {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return Boolean(
    obj.full_name ||
      obj.fullName ||
      obj.email ||
      obj.username ||
      obj.phone ||
      obj.phone_number,
  );
};

export const extractMember = (payload: unknown): IMemberProfile | null => {
  if (!payload || typeof payload !== "object") return null;

  const root = payload as Record<string, unknown>;
  const envelope = root.data ?? root.result ?? root;
  if (!envelope || typeof envelope !== "object") return null;

  const envelopeObj = envelope as Record<string, unknown>;

  const memberCandidates = [
    envelopeObj.user,
    envelopeObj.member,
    envelopeObj.profile,
    isUserLike(envelopeObj) ? envelopeObj : null,
    root.user,
    (root.result as Record<string, unknown> | undefined)?.user,
    (root.data as Record<string, unknown> | undefined)?.user,
  ];

  const member = memberCandidates.find(
    (candidate) => candidate && typeof candidate === "object",
  ) as IMemberProfile | undefined;

  return member ?? null;
};

export const extractMembershipConfig = (
  payload: unknown
): IMembershipConfig | null => {
  if (!payload || typeof payload !== "object") return null;

  const data = (payload as Record<string, unknown>).data ?? payload;
  if (!data || typeof data !== "object") return null;

  const configCandidates = [
    (data as Record<string, unknown>).membershipConfig,
    (data as Record<string, unknown>).membership,
    (data as Record<string, unknown>).config,
  ];

  const config = configCandidates.find(
    (candidate) => candidate && typeof candidate === "object"
  ) as IMembershipConfig | undefined;

  return config ?? null;
};

export const getDisplayName = (profile?: IMemberProfile | null) =>
  profile?.full_name || profile?.fullName || profile?.name || profile?.username;

export const pickAvatarUrl = (profile?: IMemberProfile | null) => {
  if (!profile) return null;
  const candidates = [
    (profile as Record<string, unknown>).avatar,
    (profile as Record<string, unknown>).avatarUrl,
    (profile as Record<string, unknown>).avatar_url,
    (profile as Record<string, unknown>).image,
    (profile as Record<string, unknown>).photo,
    (profile as Record<string, unknown>).picture,
  ];
  const url = candidates.find(
    (item) => typeof item === "string" && item.trim()
  ) as string | undefined;
  return url || null;
};

