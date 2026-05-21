export interface OnboardingFrameTheme {
  backgroundColor?: string;
  backButtonBackgroundColor?: string;
  backButtonDisabledIconColor?: string;
  backButtonIconColor?: string;
  continueButtonBackgroundColor?: string;
  continueButtonTextColor?: string;
  descriptionTextColor?: string;
  footerBackgroundColor?: string;
  progressActiveColor?: string;
  progressInactiveColor?: string;
  secondaryActionTextColor?: string;
  titleTextColor?: string;
}

export const DEFAULT_ONBOARDING_FRAME_THEME = {
  backgroundColor: "#F7F7F8",
  backButtonDisabledIconColor: "#C9C9CA",
  backButtonIconColor: "#050505",
  continueButtonBackgroundColor: "#E22121",
  continueButtonTextColor: "#FFFFFF",
  descriptionTextColor: "#666A70",
  footerBackgroundColor: "#F7F7F8",
  progressActiveColor: "#050505",
  progressInactiveColor: "#DDDDDE",
  secondaryActionTextColor: "#050505",
  titleTextColor: "#050505",
} satisfies Required<Omit<OnboardingFrameTheme, "backButtonBackgroundColor">>;

export const resolveOnboardingFrameTheme = (
  themeOverride?: OnboardingFrameTheme,
) => ({
  ...DEFAULT_ONBOARDING_FRAME_THEME,
  ...themeOverride,
  backButtonBackgroundColor:
    themeOverride?.backButtonBackgroundColor ??
    themeOverride?.progressInactiveColor ??
    DEFAULT_ONBOARDING_FRAME_THEME.progressInactiveColor,
});
