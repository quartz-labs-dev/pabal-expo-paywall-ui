import {
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputSubmitEditingEventData,
  type TextStyle,
} from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import type { OnboardingContentTheme, OnboardingFrameTone } from "./types";

export interface OnboardingTextInputContentProps {
  accessibilityLabel: string;
  autoFocus?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  maxLength?: number;
  placeholder: string;
  theme: OnboardingContentTheme;
  tone?: OnboardingFrameTone;
  value: string;
  onChangeText: (value: string) => void;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export const OnboardingTextInputContent = ({
  accessibilityLabel,
  autoFocus = false,
  inputStyle,
  maxLength = 40,
  placeholder,
  theme,
  tone = "normal",
  value,
  onChangeText,
  onSubmitEditing,
}: OnboardingTextInputContentProps) => {
  const isInvertedTone = tone === "inverted";
  const textColor = isInvertedTone
    ? theme.backgroundColor
    : theme.primaryTextColor;
  const placeholderTextColor = getColorWithAlpha(
    textColor,
    0.44,
    theme.secondaryTextColor,
  );
  const inputBackgroundColor = isInvertedTone
    ? getColorWithAlpha(theme.backgroundColor, 0.12, theme.cardBackgroundColor)
    : theme.cardBackgroundColor;
  const inputBorderColor = isInvertedTone
    ? getColorWithAlpha(theme.backgroundColor, 0.36, "transparent")
    : getColorWithAlpha(theme.primaryTextColor, 0.12, "transparent");

  return (
    <TextInput
      accessibilityLabel={accessibilityLabel}
      autoCapitalize="words"
      autoCorrect={false}
      autoFocus={autoFocus}
      maxLength={maxLength}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      returnKeyType="done"
      selectionColor={theme.accentColor}
      style={[
        styles.input,
        {
          backgroundColor: inputBackgroundColor,
          borderColor: inputBorderColor,
          color: textColor,
          shadowColor: theme.shadowColor,
        },
        inputStyle,
      ]}
      textAlign="center"
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
    minHeight: 64,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    width: "100%",
  },
});
