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

export type PlaygroundRoute = "home" | "paywall" | "profile";

export type PlaygroundPaywallFlow = "twoStep" | "singleStep";

export type PlaygroundPaywallAnimation = "default" | "none";

export type PlaygroundLocale = UnifiedLocale;
