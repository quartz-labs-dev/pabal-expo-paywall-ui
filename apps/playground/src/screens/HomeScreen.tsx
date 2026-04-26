import { createPaywallPlans, getDefaultSelectedPlanId } from "@pabal/expo-paywall-ui";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  getPackagesForScenario,
  scenarioDescriptions,
  scenarioLabels,
} from "../fixtures/paywall-plans";
import type {
  PlaygroundPaywallFlow,
  PlaygroundScenario,
} from "../types/playground";

interface HomeScreenProps {
  scenario: PlaygroundScenario;
  paywallFlow: PlaygroundPaywallFlow;
  onChangeScenario: (scenario: PlaygroundScenario) => void;
  onChangePaywallFlow: (paywallFlow: PlaygroundPaywallFlow) => void;
  onOpenPaywall: () => void;
}

const scenarios = Object.keys(scenarioLabels) as PlaygroundScenario[];
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
const FIXED_FOOTER_BUTTON_HEIGHT = 54;
const FIXED_FOOTER_TOP_PADDING = 12;
const FIXED_FOOTER_MIN_BOTTOM_PADDING = 12;
const FIXED_FOOTER_SCROLL_GAP = 24;

export const HomeScreen = ({
  scenario,
  paywallFlow,
  onChangeScenario,
  onChangePaywallFlow,
  onOpenPaywall,
}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [measuredFooterHeight, setMeasuredFooterHeight] = useState(0);
  const plans = createPaywallPlans(getPackagesForScenario(scenario), {
    annualBadgeText: "Best value",
    annualTitle: "Yearly",
    lifetimeBadgeText: "One-time",
    lifetimeTitle: "Lifetime",
    monthlyTitle: "Monthly",
    recommendedPeriod: "annual",
  });
  const defaultPlanId = getDefaultSelectedPlanId(plans);
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
          { paddingBottom: fixedFooterHeight + FIXED_FOOTER_SCROLL_GAP },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>@pabal/expo-paywall-ui playground</Text>
          <Text style={styles.title}>Choose test packages</Text>
          <Text style={styles.subtitle}>
            Select an offering state on the home screen, then open `/paywall`
            to inspect only the shared paywall UI.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package scenario</Text>
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
                      {scenarioLabels[item]}
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
                    {scenarioDescriptions[item]}
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

        <View style={styles.preview}>
          <Text style={styles.previewTitle}>Selected offering preview</Text>
          {plans.map((plan) => (
            <View key={plan.id} style={styles.previewRow}>
              <Text style={styles.previewPlan}>{plan.title}</Text>
              <Text style={styles.previewPrice}>{plan.priceText}</Text>
            </View>
          ))}
          <Text style={styles.previewMeta}>
            Default selected plan: {defaultPlanId ?? "none"}
          </Text>
          <Text style={styles.previewMeta}>
            Paywall flow: {paywallFlowLabels[paywallFlow]}
          </Text>
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
        <Pressable onPress={onOpenPaywall} style={styles.cta}>
          <Text style={styles.ctaText}>Open /paywall</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#05080C",
    flex: 1,
  },
  content: {
    gap: 28,
    paddingHorizontal: 20,
    paddingTop: 72,
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
  header: {
    gap: 10,
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
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 40,
  },
  subtitle: {
    color: "#B9C4CF",
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: "#F5F7FA",
    fontSize: 17,
    fontWeight: "900",
  },
  scenarioList: {
    gap: 12,
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
    gap: 8,
    padding: 16,
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
    fontSize: 17,
    fontWeight: "900",
  },
  scenarioTitleSelected: {
    color: "#5AC8B7",
  },
  scenarioDescription: {
    color: "#B9C4CF",
    fontSize: 13,
    lineHeight: 19,
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
    minHeight: 104,
    padding: 14,
  },
  flowOptionSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  flowTitle: {
    color: "#F5F7FA",
    fontSize: 16,
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
  preview: {
    backgroundColor: "#101820",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  previewTitle: {
    color: "#F5F7FA",
    fontSize: 15,
    fontWeight: "900",
  },
  previewRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  previewPlan: {
    color: "#B9C4CF",
    fontSize: 14,
    fontWeight: "700",
  },
  previewPrice: {
    color: "#F5F7FA",
    fontSize: 14,
    fontWeight: "900",
  },
  previewMeta: {
    color: "#7F8B96",
    fontSize: 12,
    lineHeight: 18,
  },
  cta: {
    alignItems: "center",
    backgroundColor: "#5AC8B7",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 20,
  },
  ctaText: {
    color: "#071312",
    fontSize: 16,
    fontWeight: "900",
  },
});
