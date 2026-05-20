import type { ReactNode } from "react";

export interface PlaygroundSlide {
  canContinue?: boolean;
  content: ReactNode;
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
