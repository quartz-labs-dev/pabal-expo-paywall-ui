import { type ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
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

export interface PreOnboardingWelcomeProps {
  copy: OnboardingText;
  background?: ReactNode;
  logo?: ReactNode;
  localeSelector?: ReactNode;
  selectedLocaleText?: string;
  isLocaleSelectorVisible?: boolean;
  theme?: PreOnboardingTheme;
  containerStyle?: StyleProp<ViewStyle>;
  onToggleLocaleSelector?: () => void;
  onContinue: () => Promise<void> | void;
}

export const PreOnboardingWelcome = ({
  copy,
  background,
  logo,
  localeSelector,
  selectedLocaleText,
  isLocaleSelectorVisible = false,
  theme: themeOverride,
  containerStyle,
  onToggleLocaleSelector,
  onContinue,
}: PreOnboardingWelcomeProps) => {
  const insets = useSafeAreaInsets();
  const theme = resolvePreOnboardingTheme(themeOverride);
  const canToggleLocaleSelector = Boolean(onToggleLocaleSelector);

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.primaryTextColor },
        containerStyle,
      ]}
    >
      {background ? (
        <View style={styles.background}>
          {background}
          <View
            pointerEvents="none"
            style={[
              styles.backgroundOverlay,
              { backgroundColor: theme.landingOverlayColor },
            ]}
          />
        </View>
      ) : null}

      <View
        style={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 12,
            paddingTop: Math.max(insets.top, 12) + 22,
          },
        ]}
      >
        <View style={styles.hero}>
          {logo ? <View style={styles.logoSlot}>{logo}</View> : null}
          <Text style={[styles.title, { color: theme.buttonTextColor }]}>
            {copy.landingTitle}
          </Text>
        </View>

        <View style={styles.footer}>
          {selectedLocaleText ? (
            <Pressable
              accessibilityRole="button"
              disabled={!canToggleLocaleSelector}
              onPress={onToggleLocaleSelector}
              style={[
                styles.localeButton,
                {
                  backgroundColor: theme.cardBackgroundColor,
                  borderColor: theme.borderColor,
                  shadowColor: theme.shadowColor,
                },
              ]}
            >
              <Text
                numberOfLines={2}
                style={[styles.localeButtonText, { color: theme.primaryTextColor }]}
              >
                {selectedLocaleText}
              </Text>
              {canToggleLocaleSelector ? (
                <Text
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={[
                    styles.localeButtonIndicator,
                    { color: theme.secondaryTextColor },
                  ]}
                >
                  {isLocaleSelectorVisible ? "^" : "v"}
                </Text>
              ) : null}
            </Pressable>
          ) : null}

          {isLocaleSelectorVisible && localeSelector ? (
            <View style={styles.localeSelectorSlot}>{localeSelector}</View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            onPress={onContinue}
            style={[
              styles.primaryButton,
              { backgroundColor: theme.buttonBackgroundColor },
            ]}
          >
            <Text
              style={[styles.primaryButtonText, { color: theme.buttonTextColor }]}
            >
              {copy.continueButton}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    gap: 28,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: "center",
    flex: 1,
    gap: 18,
    justifyContent: "center",
    width: "100%",
  },
  logoSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flexShrink: 1,
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 37,
    textAlign: "center",
  },
  footer: {
    alignSelf: "center",
    gap: 12,
    maxWidth: 420,
    width: "100%",
  },
  localeButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    minHeight: 58,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  localeButtonText: {
    flex: 1,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
    textAlign: "center",
  },
  localeButtonIndicator: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    minWidth: 14,
    textAlign: "center",
  },
  localeSelectorSlot: {
    width: "100%",
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
});
