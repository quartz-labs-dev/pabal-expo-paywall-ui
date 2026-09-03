import {
  resolveHealthSyncMockPalette,
  type OnboardingHealthSyncMockPlatform,
} from "./health-sync-mock-palette";

export type OnboardingCompanionPreviewVariant =
  | "watch"
  | "widget"
  | "widget-watch";

export interface OnboardingCompanionPreviewVisibilityOptions {
  // Custom watch badge slot provided by the app.
  hasWatchBadge?: boolean;
  // Soft accent circle behind the devices. On by default.
  showsStageGlow?: boolean;
  watchHealthPlatform?: OnboardingHealthSyncMockPlatform;
}

export interface OnboardingCompanionPreviewVisibility {
  showsPhone: boolean;
  showsStageGlow: boolean;
  showsWatch: boolean;
  // Health logo (or custom badge) floating on the watch. Only meaningful
  // when the watch itself is on stage.
  showsWatchBadge: boolean;
}

export const getOnboardingCompanionPreviewVisibility = (
  variant: OnboardingCompanionPreviewVariant,
  {
    hasWatchBadge = false,
    showsStageGlow = true,
    watchHealthPlatform,
  }: OnboardingCompanionPreviewVisibilityOptions = {},
): OnboardingCompanionPreviewVisibility => {
  const showsWatch = variant !== "widget";

  return {
    showsPhone: variant !== "watch",
    showsStageGlow,
    showsWatch,
    showsWatchBadge:
      showsWatch && (hasWatchBadge || watchHealthPlatform !== undefined),
  };
};

export const resolveOnboardingCompanionPreviewAccentColor = (
  stageAccentColor: string | undefined,
  themeAccentColor: string,
) => stageAccentColor ?? themeAccentColor;

export interface OnboardingCompanionWatchBadgePalette {
  backgroundColor: string;
  borderRadius: number;
}

// The health palette radii are tuned for the 40pt icon slot in the sync
// mock; the badge floating above the watch is an app-icon sized tile.
export const COMPANION_WATCH_BADGE_SIZE = 60;
const HEALTH_ICON_SLOT_SIZE = 40;
const CUSTOM_BADGE_BORDER_RADIUS = 14;

export const resolveOnboardingCompanionWatchBadgePalette = (
  platform: OnboardingHealthSyncMockPlatform | undefined,
  fallbackBackgroundColor: string,
): OnboardingCompanionWatchBadgePalette => {
  if (!platform) {
    return {
      backgroundColor: fallbackBackgroundColor,
      borderRadius: CUSTOM_BADGE_BORDER_RADIUS,
    };
  }
  const palette = resolveHealthSyncMockPalette(platform);
  return {
    backgroundColor: palette.badgeBackgroundColor,
    borderRadius: Math.round(
      (palette.badgeBorderRadius * COMPANION_WATCH_BADGE_SIZE) /
        HEALTH_ICON_SLOT_SIZE,
    ),
  };
};
