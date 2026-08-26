export type OnboardingHealthSyncMockPlatform =
  | "apple-health"
  | "health-connect";

export interface HealthSyncMockPalette {
  // Backing behind the platform icon; the Health Connect artwork is
  // transparent and needs a soft ground, the Apple Health artwork is
  // its own white squircle.
  badgeBackgroundColor: string;
  badgeBorderRadius: number;
}

export const resolveHealthSyncMockPalette = (
  platform: OnboardingHealthSyncMockPlatform,
): HealthSyncMockPalette => {
  if (platform === "health-connect") {
    return {
      badgeBackgroundColor: "#E8F0FE",
      badgeBorderRadius: 20,
    };
  }
  return {
    badgeBackgroundColor: "#FFFFFF",
    badgeBorderRadius: 9,
  };
};
