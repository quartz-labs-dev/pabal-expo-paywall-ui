export { createPaywallPlans, getDefaultSelectedPlanId } from "./paywall/create-paywall-plans";
export { getColorWithAlpha } from "./shared/color-utils";
export {
  getDefaultOnboardingCopy,
  getDefaultPermissionPromptCopy,
  ONBOARDING_TEXT_LOCALES,
  PERMISSION_PROMPT_TEXT,
} from "./locales/onboarding";
export {
  getDefaultOnboardingAcquisitionSourceText,
  ONBOARDING_ACQUISITION_SOURCE_TEXT,
  ONBOARDING_ACQUISITION_SOURCE_TEXT_LOCALES,
} from "./locales/onboarding/acquisition-source";
export {
  createOnboardingAcquisitionSourceOptions,
  ONBOARDING_ACQUISITION_SOURCE_TITLE,
} from "./onboarding/acquisition-sources";
export {
  createOnboardingIntroTextTokens,
  createOnboardingSequentialWordAnimation,
  getOnboardingSequentialWordStyle,
  parseOnboardingIntroEmphasisSegments,
  startOnboardingSequentialTextAnimation,
  stripOnboardingIntroEmphasis,
  useOnboardingActionPanelAnimation,
  useOnboardingEntranceAnimation,
  useOnboardingPhoneFrameEntranceAnimation,
} from "./onboarding/onboarding-animations";
export { OnboardingChoiceList } from "./onboarding/OnboardingChoiceList";
export { OnboardingCompletion } from "./onboarding/OnboardingCompletion";
export { OnboardingNotificationMock } from "./onboarding/OnboardingNotificationMock";
export { OnboardingPreludeContent } from "./onboarding/OnboardingPreludeContent";
export { OnboardingPreludeFrame } from "./onboarding/OnboardingPreludeFrame";
export { OnboardingSocialProof } from "./onboarding/OnboardingSocialProof";
export { OnboardingStepFrame } from "./onboarding/OnboardingStepFrame";
export { PermissionPromptPreview } from "./onboarding/PermissionPromptPreview";
export {
  PreOnboardingBackgroundSlot,
  PreOnboardingLandingContent,
  PreOnboardingLoginPrompt,
  PreOnboardingMockContent,
  PreOnboardingMockPhoneFrame,
} from "./onboarding/PreOnboardingContent";
export { PreOnboardingFrame } from "./onboarding/PreOnboardingFrame";
export { PreOnboardingValue } from "./onboarding/PreOnboardingValue";
export { PreOnboardingWelcome } from "./onboarding/PreOnboardingWelcome";
export {
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  getDefaultProfileIdentifiersCopy,
  getDefaultProfilePlanLabel,
  getDefaultProfileRenewalLabel,
  getDefaultProfileSubscriptionCopy,
  PAYWALL_TEXT_LOCALES,
  resolvePaywallTextLocale,
} from "./locales/localized-paywall-copy";
export type {
  OnboardingText,
  OnboardingTextLocale,
  PermissionPromptText,
} from "./locales/onboarding";
export type {
  OnboardingAcquisitionSourceId,
  OnboardingAcquisitionSourceOption,
  OnboardingAcquisitionStorePlatform,
} from "./onboarding/acquisition-sources";
export type {
  OnboardingCompletionProps,
  OnboardingCompletionTheme,
} from "./onboarding/OnboardingCompletion";
export type {
  OnboardingChoiceListProps,
} from "./onboarding/OnboardingChoiceList";
export type {
  OnboardingNotificationMockProps,
} from "./onboarding/OnboardingNotificationMock";
export type {
  OnboardingPreludeContentProps,
} from "./onboarding/OnboardingPreludeContent";
export type {
  OnboardingPreludeFrameProps,
} from "./onboarding/OnboardingPreludeFrame";
export type {
  OnboardingSocialProofProps,
} from "./onboarding/OnboardingSocialProof";
export type {
  OnboardingIntroTextSegment,
  OnboardingIntroTextToken,
} from "./onboarding/onboarding-animations";
export type {
  OnboardingFrameTheme,
} from "./onboarding/onboarding-frame-theme";
export type {
  OnboardingStepFrameProps,
} from "./onboarding/OnboardingStepFrame";
export type {
  OnboardingChoiceOption,
  OnboardingContentTheme,
  OnboardingPreludeStep,
  OnboardingSlide,
  OnboardingSocialProofContentData,
  OnboardingSocialProofMetric,
  OnboardingSocialProofReview,
  OnboardingSocialProofReviewRating,
  RequiredOnboardingPreludeSteps,
} from "./onboarding/types";
export type {
  PreOnboardingBackgroundSlotProps,
  PreOnboardingLandingContentProps,
  PreOnboardingLoginPromptProps,
  PreOnboardingMockContentProps,
  PreOnboardingMockPhoneFrameProps,
} from "./onboarding/PreOnboardingContent";
export type {
  PreOnboardingFrameProps,
} from "./onboarding/PreOnboardingFrame";
export type {
  PreOnboardingTheme,
} from "./onboarding/pre-onboarding-theme";
export type {
  PreOnboardingValueProps,
} from "./onboarding/PreOnboardingValue";
export type {
  PreOnboardingWelcomeProps,
} from "./onboarding/PreOnboardingWelcome";
export type { OnboardingAcquisitionSourceText } from "./locales/onboarding/acquisition-source";
export { Paywall } from "./paywall/Paywall";
export { ProfileSubscriptionSection } from "./profile/ProfileSubscriptionSection";
export { isUnifiedLocale, UNIFIED_LOCALES } from "./locales/unified-locales";
export type {
  CreatePaywallPlansOptions,
  PaywallAnimationMode,
  PaywallBenefit,
  PaywallBenefitDetail,
  PaywallConfig,
  PaywallCopy,
  PaywallFeatureComparison,
  PaywallFeatureComparisonCell,
  PaywallFeatureComparisonRow,
  PaywallFreeTrialConfig,
  PaywallPlan,
  PaywallPlanPeriod,
  PaywallProps,
  PaywallPurchaseButtonLabelContext,
  PaywallReview,
  PaywallReviewRating,
  PaywallReviewSection,
  PaywallStepMode,
  PaywallTheme,
  PaywallTrialDuration,
  PaywallTrialUnit,
  PaywallValueStep,
  ProfileIdentifierItem,
  ProfileBenefitDisplayMode,
  ProfileBenefitUsageItem,
  ProfileBenefitUsageSection,
  ProfileIdentifiersConfig,
  ProfileIdentifiersCopy,
  ProfileIdentifiersSectionProps,
  ProfileSubscriptionCopy,
  ProfileSubscriptionConfig,
  ProfileSubscriptionSectionProps,
  PurchasesPackageLike,
} from "./types";
export type {
  PermissionPromptPreviewPlatform,
  PermissionPromptPreviewProps,
} from "./onboarding/PermissionPromptPreview";
export type { PaywallTextLocale } from "./locales/localized-paywall-copy";
export type { UnifiedLocale } from "./locales/unified-locales";
