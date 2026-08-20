export type OnboardingCompanionPreviewVariant =
  | "watch"
  | "widget"
  | "widget-watch";

export interface OnboardingCompanionPreviewVisibility {
  showsPhone: boolean;
  showsWatch: boolean;
}

export const getOnboardingCompanionPreviewVisibility = (
  variant: OnboardingCompanionPreviewVariant,
): OnboardingCompanionPreviewVisibility => ({
  showsPhone: variant !== "watch",
  showsWatch: variant !== "widget",
});

export const resolveOnboardingCompanionPreviewAccentColor = (
  stageAccentColor: string | undefined,
  themeAccentColor: string,
) => stageAccentColor ?? themeAccentColor;
