import { resolvePaywallTextLocale } from "../localized-paywall-copy";
import { ONBOARDING_LOCALE_TEXT, ONBOARDING_TEXT_LOCALES } from "./index";
import type { OnboardingNicknameInputText } from "./types";

export type { OnboardingNicknameInputText } from "./types";

type OnboardingTextLocale = (typeof ONBOARDING_TEXT_LOCALES)[number];

export const ONBOARDING_NICKNAME_INPUT_TEXT_LOCALES = ONBOARDING_TEXT_LOCALES;

export const ONBOARDING_NICKNAME_INPUT_TEXT = Object.fromEntries(
  ONBOARDING_TEXT_LOCALES.map((locale) => [
    locale,
    ONBOARDING_LOCALE_TEXT[locale].nicknameInput,
  ]),
) as Record<OnboardingTextLocale, OnboardingNicknameInputText>;

export const getDefaultOnboardingNicknameInputText = (
  locale?: string,
): OnboardingNicknameInputText => {
  return ONBOARDING_NICKNAME_INPUT_TEXT[resolvePaywallTextLocale(locale)];
};

export const formatOnboardingNicknameWelcomeTitle = (
  template: string,
  nickname: string,
): string => template.replace("{nickname}", nickname);
