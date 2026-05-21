import type { ReactNode } from "react";

export interface OnboardingContentTheme {
  accentColor: string;
  backgroundColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  cardBackgroundColor: string;
  frameBackgroundColor: string;
  frameBorderColor: string;
  landingOverlayColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
  shadowColor: string;
}

export interface OnboardingSlide {
  canContinue?: boolean;
  content: ReactNode;
  continueLabel?: string;
  description?: string;
  isBackButtonDisabled?: boolean;
  title?: string;
}

export interface OnboardingPreludeStep {
  bodyColor: string;
  bodyLines: string[];
  headline: string;
  headlineColor: string;
  tone: "normal" | "inverted";
}

export interface OnboardingChoiceOption {
  id: string;
  description?: string;
  icon?: ReactNode;
  title: string;
}

export type OnboardingSocialProofReviewRating = 1 | 2 | 3 | 4 | 5;

export interface OnboardingSocialProofMetric {
  label: string;
  value: string;
}

export interface OnboardingSocialProofReview {
  quote: string;
  rating?: OnboardingSocialProofReviewRating;
  title: string;
}

export interface OnboardingSocialProofContentData {
  headline: string;
  metric?: OnboardingSocialProofMetric;
  reviews: OnboardingSocialProofReview[];
}
