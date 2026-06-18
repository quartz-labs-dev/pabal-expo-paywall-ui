import type {
  PaywallFreeTrialConfig,
  PaywallPlan,
  PaywallPlanFreeTrialConfig,
  PaywallTrialDuration,
} from "../types";

export const DEFAULT_TRIAL_DURATION: PaywallTrialDuration = {
  value: 7,
  unit: "day",
};

const resolvePlanFreeTrialConfig = (
  planFreeTrial: PaywallPlanFreeTrialConfig | undefined,
  fallbackDuration: PaywallTrialDuration,
): PaywallFreeTrialConfig | undefined => {
  if (planFreeTrial === undefined) return undefined;
  if (planFreeTrial === false) return undefined;
  if (planFreeTrial === true) return { duration: fallbackDuration };

  return {
    duration: planFreeTrial.duration ?? fallbackDuration,
  };
};

export const resolveFreeTrialConfig = (
  freeTrial: boolean | PaywallFreeTrialConfig | undefined,
  selectedPlan?: PaywallPlan,
): PaywallFreeTrialConfig | undefined => {
  if (freeTrial === false || selectedPlan?.period === "lifetime") {
    return undefined;
  }

  if (freeTrial === true || freeTrial === undefined) {
    return { duration: DEFAULT_TRIAL_DURATION };
  }

  const fallbackDuration = freeTrial.duration ?? DEFAULT_TRIAL_DURATION;
  const planTrial =
    selectedPlan === undefined
      ? undefined
      : freeTrial.byPlanId?.[selectedPlan.id];

  if (planTrial !== undefined) {
    return resolvePlanFreeTrialConfig(planTrial, fallbackDuration);
  }

  const periodTrial =
    selectedPlan === undefined
      ? undefined
      : freeTrial.byPeriod?.[selectedPlan.period];

  if (periodTrial !== undefined) {
    return resolvePlanFreeTrialConfig(periodTrial, fallbackDuration);
  }

  return {
    duration: fallbackDuration,
  };
};
