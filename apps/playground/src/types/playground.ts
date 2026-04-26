export type PlaygroundScenario =
  | "standard"
  | "annualOnly"
  | "monthlyOnly"
  | "lifetimeOnly"
  | "longPrice";

export type PlaygroundRoute = "home" | "paywall";

export type PlaygroundPaywallFlow = "twoStep" | "singleStep";

export type PlaygroundPaywallAnimation = "default" | "none";
