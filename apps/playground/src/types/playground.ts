import type { UnifiedLocale } from "pabal-expo-paywall-ui";

export type PlaygroundScenario =
  | "standard"
  | "annualOnly"
  | "monthlyOnly"
  | "weeklyOnly"
  | "weeklyAnnual"
  | "lifetimeOnly"
  | "longPrice";

export type PlaygroundPackageScenario = Exclude<
  PlaygroundScenario,
  "annualOnly" | "longPrice" | "monthlyOnly"
>;

export type PlaygroundRoute =
  | "home"
  | "onboarding"
  | "onboardingHealth"
  | "offerPaywall"
  | "paywall"
  | "preOnboarding"
  | "profile";

export type PlaygroundPaywallVariant = "standard" | "offer";

export type PlaygroundOfferDurationHours = "12" | "24" | "48";

export type PlaygroundOfferDiscountPercent = "20" | "30" | "40";

export type PlaygroundPaywallFlow = "twoStep" | "singleStep";

/**
 * Three products, each covering a hero pairing rather than a single hero:
 * `aurora` splits photo → screens, `tide` splits widget → before/after, and
 * `drift` shares one hero across both steps.
 */
export type PlaygroundPaywallProduct = "aurora" | "tide" | "drift";

export type PlaygroundPaywallAnimation = "default" | "opacity" | "none";

export type PlaygroundFreeTrialMode =
  | "sevenDays"
  | "twoWeeks"
  | "perPlan"
  | "none";

export type PlaygroundLocale = UnifiedLocale;
