import type {
  LimitedTimeOfferCopy,
  PaywallFreeTrialConfig,
  LimitedTimeOfferCountdownParts,
  LimitedTimeOfferDuration,
  LimitedTimeOfferWindow,
  PaywallPlan,
  PaywallVariant,
} from "../types";
import { resolveFreeTrialConfig } from "../paywall/free-trial-config";
import {
  getDefaultPaywallCopy,
  resolvePaywallTextLocale,
} from "../locales/localized-paywall-copy";
import { PAYWALL_TEXT } from "../locales/paywall";

export const resolveLimitedTimeOfferPurchasePresentation = ({
  copy,
  freeTrial = false,
  locale,
  plan,
}: {
  copy: LimitedTimeOfferCopy;
  freeTrial?: boolean | PaywallFreeTrialConfig;
  locale?: string;
  plan: PaywallPlan;
}): { label: string; disclosure: string } => {
  const defaults = getDefaultPaywallCopy(locale, { title: copy.title });
  const text = PAYWALL_TEXT[resolvePaywallTextLocale(locale)];
  const trialDuration = resolveFreeTrialConfig(freeTrial, plan)?.duration;
  const context = { hasFreeTrial: Boolean(trialDuration), plan, trialDuration };
  // Trial terms take precedence over period-level marketing CTA overrides.
  const label = trialDuration
    ? (copy.formatPurchaseButtonLabel ?? defaults.formatPurchaseButtonLabel)?.(context)
    : copy.purchaseButtonByPeriod?.[plan.period] ??
      (copy.formatPurchaseButtonLabel ?? defaults.formatPurchaseButtonLabel)?.(context);
  const disclosure = trialDuration
    ? copy.trialNoPaymentDueNow ?? defaults.trialNoPaymentDueNow
    : copy.purchaseDisclosureByPeriod?.[plan.period] ??
      (plan.period === "lifetime"
        ? text.oneTimePayment
        : text.formatPricePerPeriodText(plan.priceText, plan.period));

  return {
    label: label ?? copy.purchaseButton,
    disclosure: disclosure ?? "",
  };
};

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

export const getLimitedTimeOfferAlternativePlans = <TPackage>(
  primaryPlan: PaywallPlan<TPackage>,
  alternativePlans: PaywallPlan<TPackage>[],
): PaywallPlan<TPackage>[] => {
  const seenPlanIds = new Set([primaryPlan.id]);

  return alternativePlans.filter((plan) => {
    if (seenPlanIds.has(plan.id)) return false;
    seenPlanIds.add(plan.id);
    return true;
  });
};

export const resolveLimitedTimeOfferSelectedPlan = <TPackage>(
  primaryPlan: PaywallPlan<TPackage>,
  alternativePlans: PaywallPlan<TPackage>[],
  selectedPlanId: string,
): PaywallPlan<TPackage> =>
  [primaryPlan, ...alternativePlans].find(
    (candidate) => candidate.id === selectedPlanId,
  ) ?? primaryPlan;
