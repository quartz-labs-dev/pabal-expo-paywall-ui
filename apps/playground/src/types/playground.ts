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
  | "paywall"
  | "preOnboarding"
  | "profile";

export type PlaygroundPaywallFlow = "twoStep" | "singleStep";

export type PlaygroundPaywallProduct =
  | "aurora"
  | "tide"
  | "ember"
  | "drift"
  | "summit"
  | "atlas";

export type PlaygroundPaywallAnimation = "default" | "opacity" | "none";

export type PlaygroundFreeTrialMode =
  | "sevenDays"
  | "twoWeeks"
  | "perPlan"
  | "none";

export type PlaygroundLocale = UnifiedLocale;
