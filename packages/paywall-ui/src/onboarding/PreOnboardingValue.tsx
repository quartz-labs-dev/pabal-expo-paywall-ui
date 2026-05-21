import { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { OnboardingText } from "../locales/onboarding";
import {
  resolvePreOnboardingTheme,
  type PreOnboardingTheme,
} from "./pre-onboarding-theme";

export interface PreOnboardingValueProps {
  copy: OnboardingText;
  preview: ReactNode;
  theme?: PreOnboardingTheme;
  containerStyle?: StyleProp<ViewStyle>;
  onStart: () => Promise<void> | void;
  onLogin?: () => Promise<void> | void;
}

export const PreOnboardingValue = ({
  copy,
  preview,
  theme: themeOverride,
  containerStyle,
  onStart,
  onLogin,
}: PreOnboardingValueProps) => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const theme = resolvePreOnboardingTheme(themeOverride);
  const isCompactHeight = height < 760;
  const isTinyHeight = height < 690;
  const titleFontSize = isTinyHeight ? 22 : isCompactHeight ? 25 : 29;
  const titleLineHeight = isTinyHeight ? 27 : isCompactHeight ? 31 : 35;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.backgroundColor },
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 12) + 22,
          },
        ]}
      >
        <View style={styles.previewStage}>{preview}</View>
      </View>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.backgroundColor,
            paddingBottom: Math.max(insets.bottom, 12) + 12,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.primaryTextColor,
              fontSize: titleFontSize,
              lineHeight: titleLineHeight,
            },
          ]}
        >
          {copy.mockTitle}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onStart}
          style={[
            styles.primaryButton,
            { backgroundColor: theme.buttonBackgroundColor },
          ]}
        >
          <Text style={[styles.primaryButtonText, { color: theme.buttonTextColor }]}>
            {copy.startButton}
          </Text>
        </Pressable>
        {onLogin ? (
          <Pressable
            accessibilityRole="button"
            onPress={onLogin}
            style={styles.loginPrompt}
          >
            <Text
              style={[styles.loginPromptText, { color: theme.primaryTextColor }]}
            >
              {copy.loginPrompt}
            </Text>
            <Text
              style={[styles.loginPromptLink, { color: theme.primaryTextColor }]}
            >
              {copy.loginLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  previewStage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  footer: {
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  title: {
    flexShrink: 1,
    fontWeight: "600",
    letterSpacing: 0,
    textAlign: "center",
  },
  primaryButton: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 23,
    textAlign: "center",
  },
  loginPrompt: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: 32,
  },
  loginPromptText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  loginPromptLink: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
});
