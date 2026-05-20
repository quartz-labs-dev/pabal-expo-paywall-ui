import type { OnboardingAcquisitionStorePlatform } from "pabal-expo-paywall-ui";

export type PlaygroundOnboardingPlatform = "ios" | "android";
export type PlaygroundOnboardingStorePlatform =
  OnboardingAcquisitionStorePlatform;

export const DEFAULT_PLAYGROUND_ONBOARDING_PLATFORM: PlaygroundOnboardingPlatform =
  "ios";

export const resolvePlaygroundOnboardingStorePlatform = (
  platform: PlaygroundOnboardingPlatform,
): PlaygroundOnboardingStorePlatform =>
  platform === "android" ? "playStore" : "appStore";

export const createDefaultLoginActions = (
  platform: PlaygroundOnboardingPlatform,
) =>
  platform === "android"
    ? ["Continue with Google", "Continue with Email"]
    : ["Continue with Apple", "Continue with Google", "Continue with Email"];
