export type OnboardingHealthSyncMockPlatform =
  | "apple-health"
  | "health-connect";

export interface HealthSyncMockPalette {
  // Rounded-square badge behind the heart mark.
  badgeBackgroundColor: string;
  badgeBorderRadius: number;
  heartColor: string;
}

// Platform-flavored heart badges. These evoke each platform's health
// surface with generic marks; the real Apple Health / Health Connect
// icons are trademarked assets and must not be recreated.
export const resolveHealthSyncMockPalette = (
  platform: OnboardingHealthSyncMockPlatform,
): HealthSyncMockPalette => {
  if (platform === "health-connect") {
    return {
      badgeBackgroundColor: "#E8F0FE",
      badgeBorderRadius: 20,
      heartColor: "#1A73E8",
    };
  }
  return {
    badgeBackgroundColor: "#FFFFFF",
    badgeBorderRadius: 9,
    heartColor: "#FF2D55",
  };
};
