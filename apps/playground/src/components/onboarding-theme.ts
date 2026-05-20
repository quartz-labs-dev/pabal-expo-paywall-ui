import { getColorWithAlpha } from "pabal-expo-paywall-ui";

import type { OnboardingFrameTheme } from "./OnboardingFrame";

export interface PlaygroundOnboardingTheme {
  accentColor?: string;
  backgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  cardBackgroundColor?: string;
  deviceBackgroundColor?: string;
  deviceForegroundColor?: string;
  frameBackgroundColor?: string;
  frameBorderColor?: string;
  landingOverlayColor?: string;
  primaryTextColor?: string;
  progressActiveColor?: string;
  progressInactiveColor?: string;
  secondaryTextColor?: string;
  shadowColor?: string;
}

export interface CreateOnboardingFrameThemeOptions {
  backgroundColor?: string;
  footerBackgroundColor?: string;
}

export const DEFAULT_PLAYGROUND_ONBOARDING_THEME = {
  accentColor: "#E22121",
  backgroundColor: "#F7F7F8",
  buttonBackgroundColor: "#E22121",
  buttonTextColor: "#FFFFFF",
  cardBackgroundColor: "#FFFFFF",
  deviceBackgroundColor: "#151515",
  deviceForegroundColor: "#050505",
  frameBackgroundColor: "#F4F4F4",
  frameBorderColor: "#151515",
  landingOverlayColor: "rgba(0, 0, 0, 0.48)",
  primaryTextColor: "#050505",
  progressActiveColor: "#050505",
  progressInactiveColor: "#DDDDDE",
  secondaryTextColor: "#666A70",
  shadowColor: "#000000",
} satisfies Required<PlaygroundOnboardingTheme>;

export const resolvePlaygroundOnboardingTheme = (
  themeOverride?: PlaygroundOnboardingTheme,
) => ({
  ...DEFAULT_PLAYGROUND_ONBOARDING_THEME,
  ...themeOverride,
});

export const getMutedPrimaryTextColor = (
  theme: Required<PlaygroundOnboardingTheme>,
) =>
  getColorWithAlpha(theme.primaryTextColor, 0.62, theme.secondaryTextColor);

export const createOnboardingFrameTheme = (
  theme: Required<PlaygroundOnboardingTheme>,
  options: CreateOnboardingFrameThemeOptions = {},
): OnboardingFrameTheme => ({
  backgroundColor: options.backgroundColor ?? theme.backgroundColor,
  backButtonBackgroundColor: theme.progressInactiveColor,
  backButtonDisabledIconColor: theme.secondaryTextColor,
  backButtonIconColor: theme.primaryTextColor,
  continueButtonBackgroundColor: theme.buttonBackgroundColor,
  continueButtonTextColor: theme.buttonTextColor,
  descriptionTextColor: getMutedPrimaryTextColor(theme),
  footerBackgroundColor: options.footerBackgroundColor ?? theme.backgroundColor,
  progressActiveColor: theme.progressActiveColor,
  progressInactiveColor: theme.progressInactiveColor,
  secondaryActionTextColor: theme.primaryTextColor,
  titleTextColor: theme.primaryTextColor,
});
