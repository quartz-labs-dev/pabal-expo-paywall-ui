import type {
  LimitedTimeOfferCountdownParts,
  LimitedTimeOfferDuration,
  LimitedTimeOfferWindow,
  PaywallVariant,
} from "../types";

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

const getDurationMilliseconds = (
  duration: LimitedTimeOfferDuration,
): number | null => {
  if (!Number.isFinite(duration.value) || duration.value <= 0) return null;

  const unitMilliseconds =
    duration.unit === "day"
      ? MILLISECONDS_PER_DAY
      : duration.unit === "hour"
        ? MILLISECONDS_PER_HOUR
        : null;
  if (unitMilliseconds === null) return null;

  const durationMilliseconds = duration.value * unitMilliseconds;
  return Number.isSafeInteger(durationMilliseconds)
    ? durationMilliseconds
    : null;
};

export const resolveLimitedTimeOfferWindow = ({
  duration,
  now = Date.now(),
  startedAt,
}: {
  duration: LimitedTimeOfferDuration;
  now?: number;
  startedAt: number;
}): LimitedTimeOfferWindow => {
  const durationMilliseconds = getDurationMilliseconds(duration);
  if (
    durationMilliseconds === null ||
    !Number.isFinite(startedAt) ||
    !Number.isFinite(now)
  ) {
    return { expiresAt: null, remainingMs: 0, status: "invalid" };
  }

  const expiresAt = startedAt + durationMilliseconds;
  if (!Number.isSafeInteger(expiresAt)) {
    return { expiresAt: null, remainingMs: 0, status: "invalid" };
  }

  const remainingMs = Math.max(expiresAt - now, 0);
  return {
    expiresAt,
    remainingMs,
    status: remainingMs > 0 ? "active" : "expired",
  };
};

export const resolvePaywallVariant = ({
  hasOfferProduct,
  isEligible,
  offerWindow,
}: {
  hasOfferProduct: boolean;
  isEligible: boolean;
  offerWindow: LimitedTimeOfferWindow;
}): PaywallVariant =>
  hasOfferProduct && isEligible && offerWindow.status === "active"
    ? "limitedTimeOffer"
    : "standard";

export const getLimitedTimeOfferCountdownParts = (
  remainingMs: number,
): LimitedTimeOfferCountdownParts => {
  const totalSeconds = Number.isFinite(remainingMs)
    ? Math.max(Math.ceil(remainingMs / 1000), 0)
    : 0;

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalSeconds,
  };
};
