import type { PaywallTheme } from "./types";

export const defaultPaywallTheme: PaywallTheme = {
  backgroundColor: "#0B1117",
  surfaceColor: "#151D25",
  selectedSurfaceColor: "#102A2A",
  borderColor: "#2B3845",
  selectedBorderColor: "#5AC8B7",
  primaryTextColor: "#F5F7FA",
  secondaryTextColor: "#B9C4CF",
  accentColor: "#5AC8B7",
  accentTextColor: "#071312",
  mutedTextColor: "#7F8B96",
};

export const mergePaywallTheme = (
  theme?: Partial<PaywallTheme>,
): PaywallTheme => ({
  ...defaultPaywallTheme,
  ...theme,
});
