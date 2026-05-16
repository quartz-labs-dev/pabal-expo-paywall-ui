import { type ReactNode, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ReviewRequestModal,
  getDefaultReviewRequestModalCopy,
} from "pabal-expo-paywall-ui";

import { LocaleSelector } from "../components/LocaleSelector";
import { packageScenarioLabels } from "../fixtures/paywall-plans";
import type {
  PlaygroundFreeTrialMode,
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
  freeTrialMode: PlaygroundFreeTrialMode;
  isTrialEligible: boolean;
  onChangeScenario: (scenario: PlaygroundPackageScenario) => void;
  onChangeLocale: (locale: PlaygroundLocale) => void;
  onToggleLongPrice: (isEnabled: boolean) => void;
  onToggleTrialEligibility: (isEligible: boolean) => void;
  onChangePaywallFlow: (paywallFlow: PlaygroundPaywallFlow) => void;
  onChangePaywallAnimation: (
    paywallAnimation: PlaygroundPaywallAnimation,
  ) => void;
  onChangeFreeTrialMode: (freeTrialMode: PlaygroundFreeTrialMode) => void;
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
const freeTrialModes: PlaygroundFreeTrialMode[] = [
  "sevenDays",
  "twoWeeks",
  "none",
];
const freeTrialModeLabels: Record<PlaygroundFreeTrialMode, string> = {
  sevenDays: "7 days",
  twoWeeks: "2 weeks",
  none: "No trial",
};
export const HomeScreen = ({
  scenario,
  isLongPriceEnabled,
  selectedLocale,
  paywallFlow,
  paywallAnimation,
  freeTrialMode,
  isTrialEligible,
  onChangeScenario,
  onChangeLocale,
  onToggleLongPrice,
  onToggleTrialEligibility,
  onChangePaywallFlow,
  onChangePaywallAnimation,
  onChangeFreeTrialMode,
  onOpenPaywall,
  onOpenProfile,
}: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [isPaywallSettingsVisible, setIsPaywallSettingsVisible] =
    useState(false);
  const [isReviewRequestVisible, setIsReviewRequestVisible] = useState(false);
  const closePaywallSettings = () => setIsPaywallSettingsVisible(false);

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
          <Text style={styles.sectionTitle}>Profile</Text>
          <Pressable onPress={onOpenProfile} style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Open /profile</Text>
          </Pressable>
        </View>

        <View style={styles.sharedSection}>
          <Text style={styles.sectionTitle}>Review modal</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsReviewRequestVisible(true)}
            style={styles.secondaryAction}
          >
            <Text style={styles.secondaryActionText}>Open modal</Text>
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
          title="Free trial"
          options={freeTrialModes}
          selectedOption={freeTrialMode}
          labels={freeTrialModeLabels}
          onChangeOption={onChangeFreeTrialMode}
        />
        <CustomerStateSettings
          isTrialEligible={isTrialEligible}
          onToggleTrialEligibility={onToggleTrialEligibility}
        />
      </SettingsModal>

      <ReviewRequestModal
        copy={getDefaultReviewRequestModalCopy(selectedLocale, {
          developerName: "Quartz",
        })}
        developerName="Quartz"
        theme={{
          accentColor: "#FF7A45",
          accentTextColor: "#FFFFFF",
          backgroundColor: "#F7F8FA",
          borderColor: "#DDE3EA",
          mutedTextColor: "#7B8491",
          primaryTextColor: "#1D2430",
          secondaryTextColor: "#596273",
          selectedBorderColor: "#FF7A45",
          selectedSurfaceColor: "#FFF1EA",
          surfaceColor: "#FFFFFF",
        }}
        visible={isReviewRequestVisible}
        onDismiss={() => setIsReviewRequestVisible(false)}
        onRequestFeedback={() => {
          setIsReviewRequestVisible(false);
          Alert.alert("Feedback callback");
        }}
        onRequestReview={() => {
          setIsReviewRequestVisible(false);
          Alert.alert("Store review callback");
        }}
      />
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

interface CustomerStateSettingsProps {
  isTrialEligible: boolean;
  onToggleTrialEligibility: (isEligible: boolean) => void;
}

const CustomerStateSettings = ({
  isTrialEligible,
  onToggleTrialEligibility,
}: CustomerStateSettingsProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer state</Text>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: isTrialEligible }}
        onPress={() => onToggleTrialEligibility(!isTrialEligible)}
        style={[
          styles.trialEligibilityCard,
          isTrialEligible && styles.trialEligibilityCardSelected,
        ]}
      >
        <View style={styles.trialEligibilityHeader}>
          <Text
            style={[
              styles.trialEligibilityTitle,
              isTrialEligible && styles.trialEligibilityTitleSelected,
            ]}
          >
            {isTrialEligible ? "Trial eligible" : "Previously subscribed"}
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
    fontWeight: "900",
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
    fontWeight: "900",
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
    fontWeight: "900",
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
    fontWeight: "900",
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
    fontWeight: "900",
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
    minHeight: 54,
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
    fontWeight: "900",
    lineHeight: 18,
    textAlign: "center",
  },
  flowTitleSelected: {
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
    fontWeight: "900",
  },
  trialEligibilityTitleSelected: {
    color: "#5AC8B7",
  },
});
