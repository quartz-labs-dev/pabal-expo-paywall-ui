import type { ReactNode } from "react";

export interface PlaygroundSlide {
  canContinue?: boolean;
  content: ReactNode;
  continueLabel?: string;
  description?: string;
  isBackButtonDisabled?: boolean;
  title?: string;
}

export interface PreludeStep {
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

export type SocialProofReviewRating = 1 | 2 | 3 | 4 | 5;

export interface SocialProofMetric {
  label: string;
  value: string;
}

export interface SocialProofReview {
  quote: string;
  rating?: SocialProofReviewRating;
  title: string;
}

export interface SocialProofContentData {
  headline: string;
  metric?: SocialProofMetric;
  reviews: SocialProofReview[];
}
