import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  resolvePaywallTextLocale,
  type UnifiedLocale,
} from "pabal-expo-paywall-ui";

import {
  getLocaleFlag,
  getLocaleLabel,
  getPlaygroundLocaleOptions,
} from "../LocaleSelector";
import type { PlaygroundOnboardingTheme } from "../onboarding-theme";

interface PreOnboardingLanguageSelectorProps {
  selectedLocale: UnifiedLocale;
  theme: Required<PlaygroundOnboardingTheme>;
  onChangeLocale: (locale: UnifiedLocale) => void;
}

const SELECTOR_PANEL_HEIGHT = 352;
const SELECTOR_CLOSE_DURATION = 220;

export const PreOnboardingLanguageSelector = ({
  selectedLocale,
  theme,
  onChangeLocale,
}: PreOnboardingLanguageSelectorProps) => {
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [isSelectorMounted, setIsSelectorMounted] = useState(false);
  const selectorProgress = useRef(new Animated.Value(0)).current;
  const localeOptions = useMemo(getPlaygroundLocaleOptions, []);
  const selectedLocaleText = `${getLocaleFlag(selectedLocale)} ${getLocaleLabel(
    selectedLocale,
  )}`;

  useEffect(() => {
    if (isSelectorVisible) {
      setIsSelectorMounted(true);
      Animated.spring(selectorProgress, {
        damping: 18,
        mass: 0.85,
        stiffness: 170,
        toValue: 1,
        useNativeDriver: false,
      }).start();
      return undefined;
    }

    Animated.timing(selectorProgress, {
      duration: SELECTOR_CLOSE_DURATION,
      easing: Easing.out(Easing.cubic),
      toValue: 0,
      useNativeDriver: false,
    }).start();

    const closeTimeoutId = setTimeout(() => {
      setIsSelectorMounted(false);
    }, SELECTOR_CLOSE_DURATION);

    return () => clearTimeout(closeTimeoutId);
  }, [isSelectorVisible, selectorProgress]);

  const selectorPanelAnimatedStyle = {
    height: selectorProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, SELECTOR_PANEL_HEIGHT],
    }),
    opacity: selectorProgress,
    transform: [
      {
        translateY: selectorProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
      {
        scale: selectorProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isSelectorVisible }}
        onPress={() => setIsSelectorVisible((currentValue) => !currentValue)}
        style={({ pressed }) => [
          styles.changeLanguageButton,
          {
            backgroundColor: theme.cardBackgroundColor,
            shadowColor: theme.shadowColor,
          },
          pressed && styles.changeLanguageButtonPressed,
        ]}
      >
        <View style={styles.languageIcon}>
          <Text
            style={[
              styles.languageIconText,
              { color: theme.buttonBackgroundColor },
            ]}
          >
            {isSelectorVisible ? "^" : "A"}
          </Text>
        </View>
        <View style={styles.changeLanguageContent}>
          <Text
            numberOfLines={1}
            style={[styles.selectedLanguageText, { color: theme.primaryTextColor }]}
          >
            {selectedLocaleText}
          </Text>
          <Text
            style={[
              styles.changeLanguageText,
              { color: theme.secondaryTextColor },
            ]}
          >
            {isSelectorVisible ? "Close" : "Change language"}
          </Text>
        </View>
      </Pressable>

      {isSelectorMounted && (
        <Animated.View
          style={[
            styles.localeSelectorPanel,
            {
              backgroundColor: theme.cardBackgroundColor,
              borderColor: theme.progressInactiveColor,
              shadowColor: theme.shadowColor,
            },
            selectorPanelAnimatedStyle,
          ]}
        >
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.localeScroll}
          >
            {localeOptions.map((locale) => {
              const isSelected = locale === selectedLocale;

              return (
                <Pressable
                  key={locale}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => {
                    onChangeLocale(locale);
                    setIsSelectorVisible(false);
                  }}
                  style={({ pressed }) => [
                    styles.localeOption,
                    isSelected && {
                      backgroundColor: theme.progressInactiveColor,
                    },
                    pressed && styles.localeOptionPressed,
                  ]}
                >
                  <Text style={styles.localeFlag}>{getLocaleFlag(locale)}</Text>
                  <View style={styles.localeCopy}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.localeLabel,
                        { color: theme.primaryTextColor },
                        isSelected && { color: theme.buttonBackgroundColor },
                      ]}
                    >
                      {getLocaleLabel(locale)}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.localeMeta,
                        { color: theme.secondaryTextColor },
                      ]}
                    >
                      {locale} {"->"} {resolvePaywallTextLocale(locale)}
                    </Text>
                  </View>
                  {isSelected && (
                    <Text
                      style={[
                        styles.selectedMark,
                        { color: theme.buttonBackgroundColor },
                      ]}
                    >
                      Selected
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  changeLanguageButton: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 12,
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
  },
  changeLanguageButtonPressed: {
    opacity: 0.86,
  },
  languageIcon: {
    alignItems: "center",
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  languageIconText: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
  changeLanguageContent: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  selectedLanguageText: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 19,
  },
  changeLanguageText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  localeSelectorPanel: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    overflow: "hidden",
    padding: 8,
    shadowOffset: { height: 16, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  localeScroll: {
    flex: 1,
  },
  localeOption: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
    minHeight: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  localeOptionPressed: {
    opacity: 0.82,
  },
  localeFlag: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
    width: 30,
  },
  localeCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  localeLabel: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  localeMeta: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
  },
  selectedMark: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
  },
});
