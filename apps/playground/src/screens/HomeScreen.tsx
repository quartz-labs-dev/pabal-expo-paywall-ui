import { type ReactNode, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LocaleSelector } from "../components/LocaleSelector";
import type { PlaygroundOnboardingPlatform } from "../components/onboarding-context";
import {
  packageScenarioDescriptions,
  packageScenarioLabels,
} from "../fixtures/paywall-plans";
import { getPlaygroundTrialPreviewRows } from "../fixtures/paywall-trial-policy";
import type {
  PlaygroundFreeTrialMode,
  PlaygroundPackageScenario,
  PlaygroundPaywallAnimation,
  PlaygroundPaywallDesign,
  PlaygroundPaywallProduct,
  PlaygroundPaywallFlow,
  PlaygroundLocale,
} from "../types/playground";

interface HomeScreenProps {
  scenario: PlaygroundPackageScenario;
  isLongPriceEnabled: boolean;
  selectedLocale: PlaygroundLocale;
  paywallFlow: PlaygroundPaywallFlow;
  paywallAnimation: PlaygroundPaywallAnimation;
  paywallDesign: PlaygroundPaywallDesign;
  paywallProduct: PlaygroundPaywallProduct;
  onboardingPlatform: PlaygroundOnboardingPlatform;
  freeTrialMode: PlaygroundFreeTrialMode;
  isTrialEligible: boolean;
  isPreOnboardingLoginPromptVisible: boolean;
  onChangeScenario: (scenario: PlaygroundPackageScenario) => void;
  onChangeLocale: (locale: PlaygroundLocale) => void;
  onToggleLongPrice: (isEnabled: boolean) => void;
  onToggleTrialEligibility: (isEligible: boolean) => void;
  onTogglePreOnboardingLoginPrompt: (isVisible: boolean) => void;
  onChangePaywallFlow: (paywallFlow: PlaygroundPaywallFlow) => void;
  onChangePaywallAnimation: (
    paywallAnimation: PlaygroundPaywallAnimation,
  ) => void;
  onChangePaywallDesign: (paywallDesign: PlaygroundPaywallDesign) => void;
  onChangePaywallProduct: (paywallProduct: PlaygroundPaywallProduct) => void;
  onChangeOnboardingPlatform: (
    onboardingPlatform: PlaygroundOnboardingPlatform,
  ) => void;
  onChangeFreeTrialMode: (freeTrialMode: PlaygroundFreeTrialMode) => void;
  onOpenOnboarding: () => void;
  onOpenPaywall: () => void;
  onOpenPreOnboarding: () => void;
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
const paywallAnimations: PlaygroundPaywallAnimation[] = [
  "default",
  "opacity",
  "none",
];
const paywallAnimationLabels: Record<PlaygroundPaywallAnimation, string> = {
  default: "Move",
  opacity: "Fade",
  none: "No animation",
};
const paywallDesigns: PlaygroundPaywallDesign[] = ["refresh", "legacy"];
const paywallDesignLabels: Record<PlaygroundPaywallDesign, string> = {
  refresh: "Refresh",
  legacy: "Legacy",
};
const paywallProducts: PlaygroundPaywallProduct[] = [
  "aurora",
  "tide",
  "ember",
  "drift",
  "summit",
];
const paywallProductLabels: Record<PlaygroundPaywallProduct, string> = {
  aurora: "Aurora (photo)",
  tide: "Tide (floating)",
  ember: "Ember (before/after)",
  drift: "Drift (carousel)",
  summit: "Summit (tall hero)",
};
const freeTrialModes: PlaygroundFreeTrialMode[] = [
  "sevenDays",
  "twoWeeks",
  "perPlan",
  "none",
];
const freeTrialModeLabels: Record<PlaygroundFreeTrialMode, string> = {
  sevenDays: "7 days",
  twoWeeks: "2 weeks",
  perPlan: "Per plan",
  none: "No trial",
};
const onboardingPlatforms: PlaygroundOnboardingPlatform[] = ["ios", "android"];
const onboardingPlatformLabels: Record<PlaygroundOnboardingPlatform, string> = {
  ios: "iOS",
  android: "Android",
};
export const HomeScreen = ({
  scenario,
  isLongPriceEnabled,
  selectedLocale,
  paywallFlow,
  paywallAnimation,
  paywallDesign,
  paywallProduct,
  onboardingPlatform,
  freeTrialMode,
  isTrialEligible,
  isPreOnboardingLoginPromptVisible,
  onChangeScenario,
  onChangeLocale,
  onToggleLongPrice,
  onToggleTrialEligibility,
  onTogglePreOnboardingLoginPrompt,
  onChangePaywallFlow,
  onChangePaywallAnimation,
  onChangePaywallDesign,
  onChangePaywallProduct,
  onChangeOnboardingPlatform,
  onChangeFreeTrialMode,
  onOpenOnboarding,
  onOpenPaywall,
  onOpenPreOnboarding,
  onOpenProfile,
}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [isPaywallSettingsVisible, setIsPaywallSettingsVisible] =
    useState(false);
  const [isOnboardingSettingsVisible, setIsOnboardingSettingsVisible] =
    useState(false);
  const closePaywallSettings = () => setIsPaywallSettingsVisible(false);
  const closeOnboardingSettings = () => setIsOnboardingSettingsVisible(false);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 20) + 24,
            paddingTop: Math.max(insets.top, 12) + 16,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>pabal-expo-paywall-ui playground</Text>
          <Text style={styles.title}>Paywall lab</Text>
        </View>

        <View style={styles.sharedSection}>
          <SectionTitleRow
            title="Paywall"
            onOpenSettings={() => setIsPaywallSettingsVisible(true)}
          />
          <Pressable onPress={onOpenPaywall} style={styles.primaryAction}>
            <Text style={styles.primaryActionText}>Open /paywall</Text>
          </Pressable>
        </View>

        <View style={styles.sharedSection}>
          <SectionTitleRow
            title="Onboarding"
            onOpenSettings={() => setIsOnboardingSettingsVisible(true)}
          />
          <Pressable
            onPress={onOpenPreOnboarding}
            style={styles.secondaryAction}
          >
            <Text style={styles.secondaryActionText}>Open /pre-onboarding</Text>
          </Pressable>
          <Pressable onPress={onOpenOnboarding} style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Open /onboarding</Text>
          </Pressable>
        </View>

        <View style={styles.sharedSection}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Pressable onPress={onOpenProfile} style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Open /profile</Text>
          </Pressable>
        </View>

        <View style={styles.separator} />

        <LocaleSelector
          selectedLocale={selectedLocale}
          onChangeLocale={onChangeLocale}
        />
      </ScrollView>

      <SettingsModal
        title="Paywall settings"
        visible={isPaywallSettingsVisible}
        onClose={closePaywallSettings}
      >
        <PackageScenarioSettings
          scenario={scenario}
          isLongPriceEnabled={isLongPriceEnabled}
          onChangeScenario={onChangeScenario}
          onToggleLongPrice={onToggleLongPrice}
        />
        <SegmentedSettings
          title="Paywall flow"
          options={paywallFlows}
          selectedOption={paywallFlow}
          labels={paywallFlowLabels}
          onChangeOption={onChangePaywallFlow}
        />
        <SegmentedSettings
          title="Animation"
          options={paywallAnimations}
          selectedOption={paywallAnimation}
          labels={paywallAnimationLabels}
          onChangeOption={onChangePaywallAnimation}
        />
        <SegmentedSettings
          title="Design"
          options={paywallDesigns}
          selectedOption={paywallDesign}
          labels={paywallDesignLabels}
          onChangeOption={onChangePaywallDesign}
        />
        <SegmentedSettings
          title="Product"
          options={paywallProducts}
          selectedOption={paywallProduct}
          labels={paywallProductLabels}
          onChangeOption={onChangePaywallProduct}
        />
        <TrialPolicySettings
          scenario={scenario}
          isLongPriceEnabled={isLongPriceEnabled}
          freeTrialMode={freeTrialMode}
          isTrialEligible={isTrialEligible}
          onChangeFreeTrialMode={onChangeFreeTrialMode}
          onToggleTrialEligibility={onToggleTrialEligibility}
        />
      </SettingsModal>

      <SettingsModal
        title="Onboarding settings"
        visible={isOnboardingSettingsVisible}
        onClose={closeOnboardingSettings}
      >
        <SegmentedSettings
          title="Platform"
          options={onboardingPlatforms}
          selectedOption={onboardingPlatform}
          labels={onboardingPlatformLabels}
          onChangeOption={onChangeOnboardingPlatform}
        />
        <PreOnboardingSettings
          isLoginPromptVisible={isPreOnboardingLoginPromptVisible}
          onToggleLoginPrompt={onTogglePreOnboardingLoginPrompt}
        />
      </SettingsModal>
    </View>
  );
};

interface SectionTitleRowProps {
  title: string;
  onOpenSettings: () => void;
}

const SectionTitleRow = ({ title, onOpenSettings }: SectionTitleRowProps) => {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <SettingsButton onPress={onOpenSettings} />
    </View>
  );
};

interface SettingsButtonProps {
  onPress: () => void;
}

const SettingsButton = ({ onPress }: SettingsButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.settingsButton}
    >
      <Text style={styles.settingsButtonText}>Settings</Text>
    </Pressable>
  );
};

interface SettingsModalProps {
  children: ReactNode;
  title: string;
  visible: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  children,
  title,
  visible,
  onClose,
}: SettingsModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View
        style={[
          styles.settingsModalBackdrop,
          {
            paddingBottom: Math.max(insets.bottom, 20),
            paddingTop: Math.max(insets.top, 20),
          },
        ]}
      >
        <View style={styles.settingsModalCard}>
          <View style={styles.settingsModalHeader}>
            <Text style={styles.settingsModalTitle}>{title}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={styles.settingsModalCloseButton}
            >
              <Text style={styles.settingsModalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={styles.settingsModalContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

interface PackageScenarioSettingsProps {
  scenario: PlaygroundPackageScenario;
  isLongPriceEnabled: boolean;
  onChangeScenario: (scenario: PlaygroundPackageScenario) => void;
  onToggleLongPrice: (isEnabled: boolean) => void;
}

const PackageScenarioSettings = ({
  scenario,
  isLongPriceEnabled,
  onChangeScenario,
  onToggleLongPrice,
}: PackageScenarioSettingsProps) => {
  return (
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
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </View>
              <Text
                style={[
                  styles.scenarioDescription,
                  isSelected && styles.scenarioDescriptionSelected,
                ]}
              >
                {packageScenarioDescriptions[item]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

interface SegmentedSettingsProps<TOption extends string> {
  labels: Record<TOption, string>;
  options: TOption[];
  selectedOption: TOption;
  title: string;
  onChangeOption: (option: TOption) => void;
}

const SegmentedSettings = <TOption extends string>({
  labels,
  options,
  selectedOption,
  title,
  onChangeOption,
}: SegmentedSettingsProps<TOption>) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.segmentedList}>
        {options.map((item) => {
          const isSelected = item === selectedOption;

          return (
            <Pressable
              key={item}
              onPress={() => onChangeOption(item)}
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
                {labels[item]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

interface TrialPolicySettingsProps {
  scenario: PlaygroundPackageScenario;
  isLongPriceEnabled: boolean;
  freeTrialMode: PlaygroundFreeTrialMode;
  isTrialEligible: boolean;
  onChangeFreeTrialMode: (freeTrialMode: PlaygroundFreeTrialMode) => void;
  onToggleTrialEligibility: (isEligible: boolean) => void;
}

const TrialPolicySettings = ({
  scenario,
  isLongPriceEnabled,
  freeTrialMode,
  isTrialEligible,
  onChangeFreeTrialMode,
  onToggleTrialEligibility,
}: TrialPolicySettingsProps) => {
  const trialPreviewRows = getPlaygroundTrialPreviewRows({
    freeTrialMode,
    isLongPriceEnabled,
    isTrialEligible,
    scenario,
  });

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Trial policy</Text>
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: isTrialEligible }}
          onPress={() => onToggleTrialEligibility(!isTrialEligible)}
          style={[
            styles.eligibilityToggle,
            isTrialEligible && styles.eligibilityToggleOn,
          ]}
        >
          <Text
            style={[
              styles.eligibilityToggleText,
              isTrialEligible && styles.eligibilityToggleTextOn,
            ]}
          >
            {isTrialEligible ? "Eligible" : "Subscribed"}
          </Text>
          <View
            style={[styles.switchTrack, isTrialEligible && styles.switchTrackOn]}
          >
            <View
              style={[
                styles.switchThumb,
                isTrialEligible && styles.switchThumbOn,
              ]}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.segmentedList}>
        {freeTrialModes.map((item) => {
          const isSelected = item === freeTrialMode;

          return (
            <Pressable
              key={item}
              onPress={() => onChangeFreeTrialMode(item)}
              style={[
                styles.trialModeOption,
                isSelected && styles.trialModeOptionSelected,
              ]}
            >
              <Text
                style={[
                  styles.trialModeTitle,
                  isSelected && styles.trialModeTitleSelected,
                ]}
              >
                {freeTrialModeLabels[item]}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.trialPreviewCard}>
        <View style={styles.trialPreviewHeader}>
          <Text style={styles.trialPreviewTitle}>Package preview</Text>
          <Text style={styles.trialPreviewMeta}>
            {trialPreviewRows.length} package
            {trialPreviewRows.length === 1 ? "" : "s"}
          </Text>
        </View>
        <View style={styles.trialPreviewRows}>
          {trialPreviewRows.map((row) => (
            <View key={row.period} style={styles.trialPreviewRow}>
              <View style={styles.trialPreviewPlan}>
                <Text style={styles.trialPreviewPlanLabel}>{row.label}</Text>
                <Text style={styles.trialPreviewPlanDetail}>{row.detail}</Text>
              </View>
              <View
                style={[
                  styles.trialPreviewBadge,
                  row.isActive && styles.trialPreviewBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.trialPreviewBadgeText,
                    row.isActive && styles.trialPreviewBadgeTextActive,
                  ]}
                >
                  {row.value}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

interface PreOnboardingSettingsProps {
  isLoginPromptVisible: boolean;
  onToggleLoginPrompt: (isVisible: boolean) => void;
}

const PreOnboardingSettings = ({
  isLoginPromptVisible,
  onToggleLoginPrompt,
}: PreOnboardingSettingsProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pre-onboarding</Text>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: isLoginPromptVisible }}
        onPress={() => onToggleLoginPrompt(!isLoginPromptVisible)}
        style={[
          styles.trialEligibilityCard,
          isLoginPromptVisible && styles.trialEligibilityCardSelected,
        ]}
      >
        <View style={styles.trialEligibilityHeader}>
          <Text
            style={[
              styles.trialEligibilityTitle,
              isLoginPromptVisible && styles.trialEligibilityTitleSelected,
            ]}
          >
            {isLoginPromptVisible ? "Login available" : "No login"}
          </Text>
          <View
            style={[
              styles.switchTrack,
              isLoginPromptVisible && styles.switchTrackOn,
            ]}
          >
            <View
              style={[
                styles.switchThumb,
                isLoginPromptVisible && styles.switchThumbOn,
              ]}
            />
          </View>
        </View>
      </Pressable>
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
    gap: 14,
    paddingHorizontal: 20,
  },
  header: {
    gap: 6,
  },
  eyebrow: {
    color: "#5AC8B7",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: "#F5F7FA",
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 34,
  },
  section: {
    gap: 10,
  },
  sharedSection: {
    gap: 8,
  },
  separator: {
    backgroundColor: "#2B3845",
    height: 1,
    marginVertical: 4,
  },
  sectionTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  settingsButton: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 32,
    paddingHorizontal: 10,
  },
  settingsButtonText: {
    color: "#B9C4CF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15,
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: "#5AC8B7",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 16,
  },
  primaryActionText: {
    color: "#071312",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  secondaryAction: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 16,
  },
  secondaryActionText: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
  settingsModalBackdrop: {
    backgroundColor: "rgba(5, 8, 12, 0.78)",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 14,
  },
  settingsModalCard: {
    backgroundColor: "#05080C",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: "86%",
    overflow: "hidden",
  },
  settingsModalHeader: {
    alignItems: "center",
    borderBottomColor: "#2B3845",
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  settingsModalTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  settingsModalCloseButton: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 34,
    paddingHorizontal: 10,
  },
  settingsModalCloseButtonText: {
    color: "#F5F7FA",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15,
  },
  settingsModalContent: {
    gap: 18,
    padding: 14,
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
    fontWeight: "600",
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
    fontWeight: "600",
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
    flexWrap: "wrap",
    gap: 10,
  },
  scenarioCard: {
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 86,
    padding: 12,
    gap: 8,
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
    fontWeight: "600",
  },
  scenarioTitleSelected: {
    color: "#5AC8B7",
  },
  scenarioDescription: {
    color: "#7F8B96",
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  scenarioDescriptionSelected: {
    color: "#B7E8DF",
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
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 54,
    padding: 12,
  },
  flowOptionSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  flowTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    textAlign: "center",
  },
  flowTitleSelected: {
    color: "#5AC8B7",
  },
  eligibilityToggle: {
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
  eligibilityToggleOn: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  eligibilityToggleText: {
    color: "#B9C4CF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15,
  },
  eligibilityToggleTextOn: {
    color: "#5AC8B7",
  },
  trialModeOption: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: "22%",
    flexGrow: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  trialModeOptionSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  trialModeTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    textAlign: "center",
  },
  trialModeTitleSelected: {
    color: "#5AC8B7",
  },
  trialPreviewCard: {
    backgroundColor: "#0B1117",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 12,
  },
  trialPreviewHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  trialPreviewTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 17,
  },
  trialPreviewMeta: {
    color: "#7F8B96",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15,
  },
  trialPreviewRows: {
    gap: 8,
  },
  trialPreviewRow: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#22303D",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    minHeight: 58,
    padding: 10,
  },
  trialPreviewPlan: {
    flex: 1,
    gap: 3,
  },
  trialPreviewPlanLabel: {
    color: "#F5F7FA",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 17,
  },
  trialPreviewPlanDetail: {
    color: "#7F8B96",
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 15,
  },
  trialPreviewBadge: {
    alignItems: "center",
    backgroundColor: "#202A34",
    borderColor: "#344351",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 32,
    minWidth: 78,
    paddingHorizontal: 9,
  },
  trialPreviewBadgeActive: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  trialPreviewBadgeText: {
    color: "#B9C4CF",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "center",
  },
  trialPreviewBadgeTextActive: {
    color: "#5AC8B7",
  },
  trialEligibilityCard: {
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 54,
    padding: 12,
  },
  trialEligibilityCardSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  trialEligibilityHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  trialEligibilityTitle: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  trialEligibilityTitleSelected: {
    color: "#5AC8B7",
  },
});
