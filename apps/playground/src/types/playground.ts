import type { UnifiedLocale } from "pabal-expo-paywall-ui";

export type PlaygroundScenario =
  | "standard"
  | "annualOnly"
  | "monthlyOnly"
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

export type PlaygroundPaywallAnimation = "default" | "opacity" | "none";

export type PlaygroundFreeTrialMode = "sevenDays" | "twoWeeks" | "none";

export type PlaygroundLocale = UnifiedLocale;
