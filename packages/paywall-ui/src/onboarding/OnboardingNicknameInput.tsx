import type {
  NativeSyntheticEvent,
  StyleProp,
  TextInputSubmitEditingEventData,
  TextStyle,
} from "react-native";

import {
  getDefaultOnboardingNicknameInputText,
  type OnboardingNicknameInputText,
} from "../locales/onboarding/nickname-input";
import type { OnboardingContentTheme, OnboardingFrameTone } from "./types";
import { OnboardingTextInputContent } from "./OnboardingTextInputContent";

export interface OnboardingNicknameInputProps {
  autoFocus?: boolean;
  copy?: OnboardingNicknameInputText;
  inputStyle?: StyleProp<TextStyle>;
  locale?: string;
  maxLength?: number;
  placeholder?: string;
  theme: OnboardingContentTheme;
  tone?: OnboardingFrameTone;
  value: string;
  onChangeNickname: (nickname: string) => void;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export const OnboardingNicknameInput = ({
  autoFocus = false,
  copy: copyOverride,
  inputStyle,
  locale,
  maxLength = 40,
  placeholder,
  theme,
  tone = "normal",
  value,
  onChangeNickname,
  onSubmitEditing,
}: OnboardingNicknameInputProps) => {
  const copy = copyOverride ?? getDefaultOnboardingNicknameInputText(locale);

  return (
    <OnboardingTextInputContent
      accessibilityLabel={copy.inputAccessibilityLabel}
      autoFocus={autoFocus}
      inputStyle={inputStyle}
      maxLength={maxLength}
      placeholder={placeholder ?? copy.inputPlaceholder}
      theme={theme}
      tone={tone}
      value={value}
      onChangeText={onChangeNickname}
      onSubmitEditing={onSubmitEditing}
    />
  );
};
