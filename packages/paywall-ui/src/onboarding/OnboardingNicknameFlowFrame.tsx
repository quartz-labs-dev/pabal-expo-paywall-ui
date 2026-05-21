import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  formatOnboardingNicknameWelcomeTitle,
  getDefaultOnboardingNicknameInputText,
  type OnboardingNicknameInputText,
} from "../locales/onboarding/nickname-input";
import type { OnboardingFrameTheme } from "./onboarding-frame-theme";
import { OnboardingNicknameInput } from "./OnboardingNicknameInput";
import { OnboardingStepFrame } from "./OnboardingStepFrame";
import { OnboardingTypingText } from "./OnboardingTypingText";
import type { OnboardingContentTheme } from "./types";

export type OnboardingNicknameFlowPhase = "input" | "welcome";

export interface OnboardingNicknameFlowFrameProps {
  baseStepIndex: number;
  continueLabel: string;
  nickname: string;
  theme: OnboardingContentTheme;
  totalSteps: number;
  autoFocus?: boolean;
  contentTransitionIndex?: number;
  copy?: OnboardingNicknameInputText;
  frameTheme?: OnboardingFrameTheme;
  initialPhase?: OnboardingNicknameFlowPhase;
  isBackButtonDisabled?: boolean;
  isContentTransitionEnabled?: boolean;
  locale?: string;
  placeholder?: string;
  onBack?: () => Promise<void> | void;
  onChangeNickname: (nickname: string) => void;
  onComplete: () => Promise<void> | void;
  onPhaseChange?: (phase: OnboardingNicknameFlowPhase) => void;
  onSubmitNickname?: (nickname: string) => Promise<void> | void;
}

export function OnboardingNicknameFlowFrame({
  autoFocus,
  baseStepIndex,
  continueLabel,
  contentTransitionIndex,
  copy: copyOverride,
  frameTheme,
  initialPhase = "input",
  isBackButtonDisabled,
  isContentTransitionEnabled,
  locale,
  nickname,
  placeholder,
  theme,
  totalSteps,
  onBack,
  onChangeNickname,
  onComplete,
  onPhaseChange,
  onSubmitNickname,
}: OnboardingNicknameFlowFrameProps) {
  const copy = copyOverride ?? getDefaultOnboardingNicknameInputText(locale);
  const [phase, setPhase] = useState<OnboardingNicknameFlowPhase>(initialPhase);
  const [submittedNickname, setSubmittedNickname] = useState("");
  const phaseStepOffset = phase === "welcome" ? 1 : 0;
  const trimmedNickname = nickname.trim();
  const displayNickname =
    (submittedNickname || trimmedNickname) || copy.inputPlaceholder;
  const welcomeTitle = formatOnboardingNicknameWelcomeTitle(
    copy.welcomeTitle,
    displayNickname,
  );

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [onPhaseChange, phase]);

  const handleBack = async () => {
    if (phase === "welcome") {
      setPhase("input");
      return;
    }

    await onBack?.();
  };

  const handleContinue = async () => {
    if (phase === "welcome") {
      await onComplete();
      return;
    }

    if (!trimmedNickname) return;

    await onSubmitNickname?.(trimmedNickname);
    setSubmittedNickname(trimmedNickname);
    setPhase("welcome");
  };

  if (phase === "welcome") {
    return (
      <OnboardingStepFrame
        canContinue
        continueLabel={continueLabel}
        contentTransitionIndex={
          (contentTransitionIndex ?? baseStepIndex) + phaseStepOffset
        }
        currentStepIndex={baseStepIndex + phaseStepOffset}
        isBackButtonDisabled={isBackButtonDisabled}
        isContentTransitionEnabled={isContentTransitionEnabled}
        locale={locale}
        showBackButton
        showSecondaryAction={false}
        theme={frameTheme}
        tone="inverted"
        totalSteps={totalSteps}
        onBack={handleBack}
        onContinue={handleContinue}
      >
        <View style={styles.welcomeContent}>
          <OnboardingTypingText
            color={theme.backgroundColor}
            style={styles.welcomeTitle}
            text={welcomeTitle}
          />
        </View>
      </OnboardingStepFrame>
    );
  }

  return (
    <OnboardingStepFrame
      canContinue={Boolean(trimmedNickname)}
      continueLabel={continueLabel}
      contentTransitionIndex={contentTransitionIndex ?? baseStepIndex}
      currentStepIndex={baseStepIndex}
      isBackButtonDisabled={isBackButtonDisabled}
      isContentTransitionEnabled={isContentTransitionEnabled}
      locale={locale}
      showBackButton
      showSecondaryAction={false}
      theme={frameTheme}
      title={copy.title}
      totalSteps={totalSteps}
      onBack={handleBack}
      onContinue={handleContinue}
    >
      <View style={styles.inputContent}>
        <OnboardingNicknameInput
          autoFocus={autoFocus}
          copy={copy}
          locale={locale}
          placeholder={placeholder ?? copy.inputPlaceholder}
          theme={theme}
          value={nickname}
          onChangeNickname={onChangeNickname}
        />
      </View>
    </OnboardingStepFrame>
  );
}

const styles = StyleSheet.create({
  inputContent: {
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 360,
    width: "100%",
  },
  welcomeContent: {
    alignItems: "flex-start",
    alignSelf: "center",
    maxWidth: 360,
    width: "100%",
  },
  welcomeTitle: {
    flexShrink: 1,
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 41,
  },
});
