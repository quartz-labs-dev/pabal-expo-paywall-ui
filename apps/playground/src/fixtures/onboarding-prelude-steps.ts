import type { RequiredOnboardingPreludeSteps } from "pabal-expo-paywall-ui";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";

export const createOnboardingPreludeSteps = (
  theme: Required<PlaygroundOnboardingTheme>,
): RequiredOnboardingPreludeSteps => [
  {
    bodyColor: theme.backgroundColor,
    bodyLines: [
      "The technique you learned, the spot where sparring broke down, and your coach's advice fade faster than you think.",
      "If you do not record it, progress can pile up without ever becoming visible.",
    ],
    headline:
      "You trained hard, but do you remember **what actually stayed with you?**",
    headlineColor: theme.backgroundColor,
    tone: "inverted",
  },
  {
    bodyColor: theme.primaryTextColor,
    bodyLines: [
      "what happened, what you learned,",
      "and what to work on next.",
    ],
    headline: "Post Black Belt helps you **capture**",
    headlineColor: theme.primaryTextColor,
    tone: "normal",
  },
];
