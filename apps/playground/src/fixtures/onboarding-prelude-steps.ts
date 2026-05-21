import type { RequiredOnboardingPreludeSteps } from "pabal-expo-paywall-ui";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";

export const createOnboardingPreludeSteps = (
  theme: Required<PlaygroundOnboardingTheme>,
): RequiredOnboardingPreludeSteps => [
  {
    bodyColor: theme.backgroundColor,
    bodyLines: [
      "you are not alone",
      "jiu-jitsu is too deep to keep in your head,",
      "especially when every class adds another detail.",
    ],
    headline: "ever feel like you **forget** the technique right after class?",
    headlineColor: theme.backgroundColor,
    tone: "inverted",
  },
  {
    bodyColor: theme.primaryTextColor,
    bodyLines: [
      "save the move, review the key detail,",
      "and come back before the next roll.",
    ],
    headline:
      "Post Black Belt turns training into a **library** you can actually use.",
    headlineColor: theme.primaryTextColor,
    tone: "normal",
  },
];
