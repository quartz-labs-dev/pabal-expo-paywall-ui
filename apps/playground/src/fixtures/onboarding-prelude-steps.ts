import type { RequiredOnboardingPreludeSteps } from "pabal-expo-paywall-ui";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";

export const createOnboardingPreludeSteps = (
  theme: Required<PlaygroundOnboardingTheme>,
): RequiredOnboardingPreludeSteps => {
  const problemBody = [
    "The technique you learned, the spot where sparring broke down, and your coach's advice fade faster than you think.",
    "If you do not record it, progress can pile up without ever becoming **visible**.",
  ].join(" ");
  const solutionBody = [
    "what happened, what you learned, and your next focus.",
  ].join(" ");

  return [
    {
      bodyColor: theme.backgroundColor,
      bodyLines: [problemBody],
      headline: "You trained hard. Do you remember **what stayed?**",
      headlineColor: theme.backgroundColor,
      tone: "inverted",
    },
    {
      bodyColor: theme.primaryTextColor,
      bodyLines: [solutionBody],
      headline: "Post Black Belt helps you **capture**",
      headlineColor: theme.primaryTextColor,
      tone: "normal",
    },
  ];
};
