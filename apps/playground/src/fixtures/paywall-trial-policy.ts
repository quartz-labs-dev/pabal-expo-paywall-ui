import type {
  PaywallFreeTrialConfig,
  PaywallPlanPeriod,
  PaywallTrialDuration,
} from "pabal-expo-paywall-ui";

import type {
  PlaygroundFreeTrialMode,
  PlaygroundPackageScenario,
  PlaygroundScenario,
} from "../types/playground";

export interface PlaygroundTrialPreviewRow {
  period: PaywallPlanPeriod;
  label: string;
  value: string;
  detail: string;
  isActive: boolean;
}

const DEFAULT_TRIAL_DURATION: PaywallTrialDuration = {
  value: 7,
  unit: "day",
};

const trialPreviewPeriodsByScenario: Record<
  PlaygroundScenario,
  PaywallPlanPeriod[]
> = {
  annualOnly: ["annual"],
  lifetimeOnly: ["lifetime"],
  longPrice: ["monthly", "annual"],
  monthlyOnly: ["monthly"],
  standard: ["monthly", "annual"],
  weeklyAnnual: ["weekly", "annual"],
  weeklyOnly: ["weekly"],
};

const trialPreviewPeriodLabels: Record<PaywallPlanPeriod, string> = {
  annual: "Annual package",
  lifetime: "Lifetime package",
  monthly: "Monthly package",
  weekly: "Weekly package",
};

const formatTrialDuration = (duration: PaywallTrialDuration): string => {
  const unit = duration.unit === "week" ? "week" : "day";
  return `${duration.value} ${duration.value === 1 ? unit : `${unit}s`}`;
};

const getEffectiveScenario = (
  scenario: PlaygroundPackageScenario,
  isLongPriceEnabled: boolean,
): PlaygroundScenario => {
  return isLongPriceEnabled ? "longPrice" : scenario;
};

export const getPlaygroundFreeTrialConfig = (
  mode: PlaygroundFreeTrialMode,
  isTrialEligible: boolean,
): boolean | PaywallFreeTrialConfig => {
  if (!isTrialEligible) return false;
  if (mode === "none") return false;
  if (mode === "twoWeeks") return { duration: { value: 2, unit: "week" } };
  if (mode === "perPlan") {
    return {
      duration: DEFAULT_TRIAL_DURATION,
      byPeriod: {
        weekly: { duration: { value: 3, unit: "day" } },
        monthly: true,
        annual: { duration: { value: 2, unit: "week" } },
      },
    };
  }

  return true;
};

const getTrialPreviewValue = (
  period: PaywallPlanPeriod,
  freeTrial: boolean | PaywallFreeTrialConfig,
): Pick<PlaygroundTrialPreviewRow, "detail" | "isActive" | "value"> => {
  if (freeTrial === false) {
    return {
      detail: "Customer is ineligible or trial is disabled.",
      isActive: false,
      value: "No trial",
    };
  }

  if (period === "lifetime") {
    return {
      detail: "Lifetime purchases never show trial copy.",
      isActive: false,
      value: "No trial",
    };
  }

  if (freeTrial === true) {
    return {
      detail: "Default trial duration applies to every renewing package.",
      isActive: true,
      value: formatTrialDuration(DEFAULT_TRIAL_DURATION),
    };
  }

  const fallbackDuration = freeTrial.duration ?? DEFAULT_TRIAL_DURATION;
  const periodTrial = freeTrial.byPeriod?.[period];

  if (periodTrial === false) {
    return {
      detail: `${period} override disables trial.`,
      isActive: false,
      value: "No trial",
    };
  }

  if (periodTrial === true) {
    return {
      detail: "Uses the global fallback duration.",
      isActive: true,
      value: formatTrialDuration(fallbackDuration),
    };
  }

  if (periodTrial !== undefined) {
    return {
      detail: `byPeriod.${period} override`,
      isActive: true,
      value: formatTrialDuration(periodTrial.duration ?? fallbackDuration),
    };
  }

  return {
    detail: "Uses the global fallback duration.",
    isActive: true,
    value: formatTrialDuration(fallbackDuration),
  };
};

export const getPlaygroundTrialPreviewRows = ({
  freeTrialMode,
  isLongPriceEnabled,
  isTrialEligible,
  scenario,
}: {
  freeTrialMode: PlaygroundFreeTrialMode;
  isLongPriceEnabled: boolean;
  isTrialEligible: boolean;
  scenario: PlaygroundPackageScenario;
}): PlaygroundTrialPreviewRow[] => {
  const effectiveScenario = getEffectiveScenario(scenario, isLongPriceEnabled);
  const freeTrial = getPlaygroundFreeTrialConfig(
    freeTrialMode,
    isTrialEligible,
  );

  return trialPreviewPeriodsByScenario[effectiveScenario].map((period) => ({
    period,
    label: trialPreviewPeriodLabels[period],
    ...getTrialPreviewValue(period, freeTrial),
  }));
};
