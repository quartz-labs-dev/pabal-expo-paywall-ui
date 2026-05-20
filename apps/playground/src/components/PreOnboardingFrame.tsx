import { type ReactNode } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  resolveOnboardingFrameTheme,
  type OnboardingFrameTheme,
} from "./onboarding-frame-theme";

interface PreOnboardingFrameProps {
  background?: ReactNode;
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  continueButtonStyle?: StyleProp<ViewStyle>;
  continueLabel: string;
  footerAccessory?: ReactNode;
  footerContentPointerEvents?: "auto" | "none" | "box-none" | "box-only";
  footerContentStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  footerTopAccessory?: ReactNode;
  theme?: OnboardingFrameTheme;
  onContinue: () => void;
}

export const PreOnboardingFrame = ({
  background,
  children,
  contentContainerStyle,
  continueButtonStyle,
  continueLabel,
  footerAccessory,
  footerContentPointerEvents = "auto",
  footerContentStyle,
  footerStyle,
  footerTopAccessory,
  theme: themeOverride,
  onContinue,
}: PreOnboardingFrameProps) => {
  const insets = useSafeAreaInsets();
  const theme = resolveOnboardingFrameTheme(themeOverride);

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      {background && <View style={styles.background}>{background}</View>}
      <ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.bodyContent,
          {
            paddingTop: Math.max(insets.top, 12) + 22,
          },
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={styles.bodyScroll}
      >
        {children}
      </ScrollView>
      <View
        style={[
          styles.footer,
          { backgroundColor: theme.footerBackgroundColor },
          footerStyle,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 12,
          },
        ]}
      >
        <Animated.View
          pointerEvents={footerContentPointerEvents}
          style={[styles.footerContent, footerContentStyle]}
        >
          {footerTopAccessory}
          <Pressable
            accessibilityRole="button"
            onPress={onContinue}
            style={[
              styles.continueButton,
              { backgroundColor: theme.continueButtonBackgroundColor },
              continueButtonStyle,
            ]}
          >
            <Text
              style={[
                styles.continueButtonText,
                { color: theme.continueButtonTextColor },
              ]}
            >
              {continueLabel}
            </Text>
          </Pressable>
          {footerAccessory}
        </Animated.View>
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
  },
  bodyScroll: {
    flex: 1,
  },
  bodyContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  footerContent: {
    gap: 12,
  },
  continueButton: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 18,
  },
  continueButtonText: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 23,
    textAlign: "center",
  },
});
