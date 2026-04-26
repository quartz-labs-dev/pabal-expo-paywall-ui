import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LocaleSelector } from "../components/LocaleSelector";
import {
  packageScenarioDescriptions,
  packageScenarioLabels,
} from "../fixtures/paywall-plans";
import type {
  PlaygroundPackageScenario,
  PlaygroundPaywallAnimation,
  PlaygroundPaywallFlow,
  PlaygroundLocale,
} from "../types/playground";

interface HomeScreenProps {
  scenario: PlaygroundPackageScenario;
  isLongPriceEnabled: boolean;
  selectedLocale: PlaygroundLocale;
  paywallFlow: PlaygroundPaywallFlow;
  paywallAnimation: PlaygroundPaywallAnimation;
  onChangeScenario: (scenario: PlaygroundPackageScenario) => void;
  onChangeLocale: (locale: PlaygroundLocale) => void;
  onToggleLongPrice: (isEnabled: boolean) => void;
  onChangePaywallFlow: (paywallFlow: PlaygroundPaywallFlow) => void;
  onChangePaywallAnimation: (
    paywallAnimation: PlaygroundPaywallAnimation,
  ) => void;
  onOpenPaywall: () => void;
  onOpenProfile: () => void;
}

const scenarios = Object.keys(
  packageScenarioLabels,
) as PlaygroundPackageScenario[];
const paywallFlows: PlaygroundPaywallFlow[] = ["twoStep", "singleStep"];
const paywallFlowLabels: Record<PlaygroundPaywallFlow, string> = {
  twoStep: "Two-step",
  singleStep: "One-step",
};
const paywallFlowDescriptions: Record<PlaygroundPaywallFlow, string> = {
  twoStep:
    "Default value-first flow: value screen first, then plans and purchase.",
  singleStep: "Classic paywall: show plans and purchase UI immediately.",
};
const paywallAnimations: PlaygroundPaywallAnimation[] = ["default", "none"];
const paywallAnimationLabels: Record<PlaygroundPaywallAnimation, string> = {
  default: "Animated",
  none: "No animation",
};
const paywallAnimationDescriptions: Record<PlaygroundPaywallAnimation, string> =
  {
    default: "Bottom-up entrance and side-to-side step transition.",
    none: "Render paywall and step changes immediately.",
  };
const FIXED_FOOTER_BUTTON_HEIGHT = 54;
const FIXED_FOOTER_TOP_PADDING = 12;
const FIXED_FOOTER_MIN_BOTTOM_PADDING = 12;
const FIXED_FOOTER_SCROLL_GAP = 24;

export const HomeScreen = ({
  scenario,
  isLongPriceEnabled,
  selectedLocale,
  paywallFlow,
  paywallAnimation,
  onChangeScenario,
  onChangeLocale,
  onToggleLongPrice,
  onChangePaywallFlow,
  onChangePaywallAnimation,
  onOpenPaywall,
  onOpenProfile,
}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [measuredFooterHeight, setMeasuredFooterHeight] = useState(0);
  const footerBottomPadding = Math.max(
    insets.bottom,
    FIXED_FOOTER_MIN_BOTTOM_PADDING,
  );
  const fallbackFooterHeight =
    FIXED_FOOTER_TOP_PADDING +
    FIXED_FOOTER_BUTTON_HEIGHT +
    footerBottomPadding;
  const fixedFooterHeight = Math.max(
    measuredFooterHeight,
    fallbackFooterHeight,
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: fixedFooterHeight + FIXED_FOOTER_SCROLL_GAP,
            paddingTop: Math.max(insets.top, 12) + 16,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>pabal-expo-paywall-ui playground</Text>
          <Text style={styles.title}>Paywall lab</Text>
          <Text style={styles.subtitle}>
            Pick packages, locale, flow, then inspect the shared screens.
          </Text>
        </View>

        <LocaleSelector
          selectedLocale={selectedLocale}
          onChangeLocale={onChangeLocale}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Package scenario</Text>
            <LongPriceToggle
              isEnabled={isLongPriceEnabled}
              onPress={() => onToggleLongPrice(!isLongPriceEnabled)}
            />
          </View>
          <View style={styles.scenarioList}>
            {scenarios.map((item) => {
              const isSelected = item === scenario;

              return (
                <Pressable
                  key={item}
                  onPress={() => onChangeScenario(item)}
                  style={[
                    styles.scenarioCard,
                    isSelected && styles.scenarioCardSelected,
                  ]}
                >
                  <View style={styles.scenarioHeader}>
                    <Text
                      style={[
                        styles.scenarioTitle,
                        isSelected && styles.scenarioTitleSelected,
                      ]}
                    >
                      {packageScenarioLabels[item]}
                    </Text>
                    <View
                      style={[
                        styles.radio,
                        isSelected && styles.radioSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>
                  <Text style={styles.scenarioDescription}>
                    {packageScenarioDescriptions[item]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paywall flow</Text>
          <View style={styles.segmentedList}>
            {paywallFlows.map((item) => {
              const isSelected = item === paywallFlow;

              return (
                <Pressable
                  key={item}
                  onPress={() => onChangePaywallFlow(item)}
                  style={[
                    styles.flowOption,
                    isSelected && styles.flowOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.flowTitle,
                      isSelected && styles.flowTitleSelected,
                    ]}
                  >
                    {paywallFlowLabels[item]}
                  </Text>
                  <Text style={styles.flowDescription}>
                    {paywallFlowDescriptions[item]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animation</Text>
          <View style={styles.segmentedList}>
            {paywallAnimations.map((item) => {
              const isSelected = item === paywallAnimation;

              return (
                <Pressable
                  key={item}
                  onPress={() => onChangePaywallAnimation(item)}
                  style={[
                    styles.flowOption,
                    isSelected && styles.flowOptionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.flowTitle,
                      isSelected && styles.flowTitleSelected,
                    ]}
                  >
                    {paywallAnimationLabels[item]}
                  </Text>
                  <Text style={styles.flowDescription}>
                    {paywallAnimationDescriptions[item]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View
        onLayout={(event) => {
          const nextFooterHeight = Math.ceil(event.nativeEvent.layout.height);
          setMeasuredFooterHeight((previousFooterHeight) =>
            previousFooterHeight === nextFooterHeight
              ? previousFooterHeight
              : nextFooterHeight,
          );
        }}
        style={[styles.fixedFooter, { paddingBottom: footerBottomPadding }]}
      >
        <View style={styles.footerActions}>
          <Pressable onPress={onOpenProfile} style={styles.secondaryCta}>
            <Text style={styles.secondaryCtaText}>Open /profile</Text>
          </Pressable>
          <Pressable onPress={onOpenPaywall} style={styles.cta}>
            <Text style={styles.ctaText}>Open /paywall</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

interface LongPriceToggleProps {
  isEnabled: boolean;
  onPress: () => void;
}

const LongPriceToggle = ({ isEnabled, onPress }: LongPriceToggleProps) => {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: isEnabled }}
      onPress={onPress}
      style={[styles.longPriceToggle, isEnabled && styles.longPriceToggleOn]}
    >
      <Text
        style={[
          styles.longPriceToggleText,
          isEnabled && styles.longPriceToggleTextOn,
        ]}
      >
        Long price
      </Text>
      <View style={[styles.switchTrack, isEnabled && styles.switchTrackOn]}>
        <View style={[styles.switchThumb, isEnabled && styles.switchThumbOn]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#05080C",
    flex: 1,
  },
  content: {
    gap: 18,
    paddingHorizontal: 20,
  },
  fixedFooter: {
    backgroundColor: "#05080C",
    bottom: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingTop: FIXED_FOOTER_TOP_PADDING,
    position: "absolute",
    right: 0,
    zIndex: 5,
  },
  footerActions: {
    flexDirection: "row",
    gap: 10,
  },
  header: {
    gap: 6,
  },
  eyebrow: {
    color: "#5AC8B7",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: "#F5F7FA",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 34,
  },
  subtitle: {
    color: "#B9C4CF",
    fontSize: 13,
    lineHeight: 19,
  },
  section: {
    gap: 10,
  },
  sectionHeaderRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#F5F7FA",
    fontSize: 15,
    fontWeight: "900",
  },
  longPriceToggle: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 32,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  longPriceToggleOn: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  longPriceToggleText: {
    color: "#B9C4CF",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 15,
  },
  longPriceToggleTextOn: {
    color: "#5AC8B7",
  },
  switchTrack: {
    alignItems: "flex-start",
    backgroundColor: "#2B3845",
    borderRadius: 999,
    height: 16,
    justifyContent: "center",
    paddingHorizontal: 2,
    width: 30,
  },
  switchTrackOn: {
    alignItems: "flex-end",
    backgroundColor: "#5AC8B7",
  },
  switchThumb: {
    backgroundColor: "#7F8B96",
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  switchThumbOn: {
    backgroundColor: "#071312",
  },
  scenarioList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  segmentedList: {
    flexDirection: "row",
    gap: 10,
  },
  scenarioCard: {
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    gap: 8,
    minHeight: 102,
    padding: 12,
  },
  scenarioCardSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  scenarioHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  scenarioTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "900",
  },
  scenarioTitleSelected: {
    color: "#5AC8B7",
  },
  scenarioDescription: {
    color: "#B9C4CF",
    fontSize: 12,
    lineHeight: 17,
  },
  radio: {
    alignItems: "center",
    borderColor: "#7F8B96",
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  radioSelected: {
    borderColor: "#5AC8B7",
  },
  radioDot: {
    backgroundColor: "#5AC8B7",
    borderRadius: 5,
    height: 8,
    width: 8,
  },
  flowOption: {
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    minHeight: 86,
    padding: 12,
  },
  flowOptionSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  flowTitle: {
    color: "#F5F7FA",
    fontSize: 14,
    fontWeight: "900",
  },
  flowTitleSelected: {
    color: "#5AC8B7",
  },
  flowDescription: {
    color: "#B9C4CF",
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 17,
  },
  cta: {
    alignItems: "center",
    backgroundColor: "#5AC8B7",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 20,
  },
  ctaText: {
    color: "#071312",
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryCta: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 14,
  },
  secondaryCtaText: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },
});
