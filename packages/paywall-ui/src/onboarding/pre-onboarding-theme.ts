export interface PreOnboardingTheme {
  backgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  cardBackgroundColor?: string;
  borderColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  landingOverlayColor?: string;
  shadowColor?: string;
}

export const DEFAULT_PRE_ONBOARDING_THEME = {
  backgroundColor: "#F7F7F8",
  buttonBackgroundColor: "#E22121",
  buttonTextColor: "#FFFFFF",
  cardBackgroundColor: "#FFFFFF",
  borderColor: "#E6E6E8",
  primaryTextColor: "#050505",
  secondaryTextColor: "#666A70",
  landingOverlayColor: "rgba(0, 0, 0, 0.48)",
  shadowColor: "#000000",
} satisfies Required<PreOnboardingTheme>;

export const resolvePreOnboardingTheme = (
  themeOverride?: PreOnboardingTheme,
) => ({
  ...DEFAULT_PRE_ONBOARDING_THEME,
  ...themeOverride,
});
