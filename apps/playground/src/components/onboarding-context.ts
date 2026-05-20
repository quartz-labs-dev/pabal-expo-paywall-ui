import {
  getDefaultOnboardingAcquisitionSourceText,
  getDefaultOnboardingCopy,
  type OnboardingAcquisitionSourceText,
  type OnboardingText,
} from "pabal-expo-paywall-ui";

import type { PlaygroundLocale } from "../types/playground";
import {
  DEFAULT_PLAYGROUND_ONBOARDING_PLATFORM,
  resolvePlaygroundOnboardingStorePlatform,
  type PlaygroundOnboardingPlatform,
  type PlaygroundOnboardingStorePlatform,
} from "../utils/onboarding-platform";
import type { OnboardingFrameTheme } from "./OnboardingFrame";
import {
  createOnboardingFrameTheme,
  type CreateOnboardingFrameThemeOptions,
  type PlaygroundOnboardingTheme,
  resolvePlaygroundOnboardingTheme,
} from "./onboarding-theme";

export {
  DEFAULT_PLAYGROUND_ONBOARDING_PLATFORM,
  type PlaygroundOnboardingPlatform,
  type PlaygroundOnboardingStorePlatform,
} from "../utils/onboarding-platform";

export interface PlaygroundOnboardingContext {
  acquisitionSourceText: OnboardingAcquisitionSourceText;
  copy: OnboardingText;
  frameTheme: OnboardingFrameTheme;
  locale: PlaygroundLocale;
  platform: PlaygroundOnboardingPlatform;
  storePlatform: PlaygroundOnboardingStorePlatform;
  theme: Required<PlaygroundOnboardingTheme>;
  createFrameTheme: (
    options?: CreateOnboardingFrameThemeOptions,
  ) => OnboardingFrameTheme;
}

export interface ResolvePlaygroundOnboardingContextOptions {
  locale: PlaygroundLocale;
  platform?: PlaygroundOnboardingPlatform;
  theme?: PlaygroundOnboardingTheme;
}

export const resolvePlaygroundOnboardingContext = ({
  locale,
  platform = DEFAULT_PLAYGROUND_ONBOARDING_PLATFORM,
  theme: themeOverride,
}: ResolvePlaygroundOnboardingContextOptions): PlaygroundOnboardingContext => {
  const theme = resolvePlaygroundOnboardingTheme(themeOverride);
  const createFrameTheme = (options?: CreateOnboardingFrameThemeOptions) =>
    createOnboardingFrameTheme(theme, options);

  return {
    acquisitionSourceText: getDefaultOnboardingAcquisitionSourceText(locale),
    copy: getDefaultOnboardingCopy(locale),
    createFrameTheme,
    frameTheme: createFrameTheme(),
    locale,
    platform,
    storePlatform: resolvePlaygroundOnboardingStorePlatform(platform),
    theme,
  };
};
