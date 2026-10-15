import {
  ProOnboardingEntryCard,
  ProfileSubscriptionWithOnboarding,
  getNextProOnboardingItemId,
  getDefaultProfilePlanLabel,
  getDefaultProfileRenewalLabel,
  getDefaultProfileSubscriptionCopy,
  type ProfileSubscriptionConfig,
  type ProfileBenefitDisplayMode,
  type PaywallPlanPeriod,
} from "pabal-expo-paywall-ui";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PlaygroundOptionRow,
  onOffOptions,
  type PlaygroundOption,
} from "../components/PlaygroundOptionRow";
import { SettingsModal } from "../components/SettingsModal";
import { playgroundBenefits } from "../fixtures/playground-benefits";
import {
  createPlaygroundProOnboardingItems,
  createPlaygroundProOnboardingSteps,
  playgroundProOnboardingOrder,
  playgroundProOnboardingSections,
} from "../fixtures/pro-onboarding";
import type { PlaygroundLocale, PlaygroundScenario } from "../types/playground";

const wait = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const profileSubscriptionBaseConfig = {
  benefits: playgroundBenefits,
  benefitUsageSection: {
    usageColumnTitle: "Usage",
    proLimitColumnTitle: "Pro",
    items: [
      {
        id: "home-screen-widget",
        title: "Home Screen Widget",
        titleContent: <ProfileUsageTitle title="Home Screen Widget" />,
        usageText: "Off",
        proLimitText: "Included",
        onPress: () => Alert.alert("Home Screen Widget details"),
      },
      {
        id: "custom-locations",
        title: "Custom Location Settings",
        usageText: "1 saved",
        proLimitText: "Unlimited",
      },
      {
        id: "custom-colors",
        title: "Custom Color Palette Settings",
        usageText: "Default",
        proLimitText: "Unlimited",
        onPress: () => Alert.alert("Color palette details"),
      },
      {
        id: "forecast-alerts",
        title: "Forecast Alerts",
        usageText: "1 active",
        proLimitText: "Unlimited",
      },
      {
        id: "saved-observation-notes",
        title: "Saved Observation Notes",
        usageText: "5 saved",
        proLimitText: "Unlimited",
      },
      {
        id: "advanced-maps",
        title: "Advanced Map Layers",
        usageText: "0 enabled",
        proLimitText: "6 layers",
      },
      {
        id: "historical-activity-timeline",
        title: "Historical Activity Timeline",
        usageText: "24 hours",
        proLimitText: "90 days",
      },
      {
        id: "multi-day-trip-planner",
        title: "Multi-Day Trip Planner",
        usageText: "Off",
        proLimitText: "Included",
      },
      {
        id: "priority-data-refresh",
        title: "Priority Data Refresh",
        usageText: "15 min",
        proLimitText: "5 min",
      },
    ],
  },
} satisfies Omit<ProfileSubscriptionConfig, "copy" | "headerIcon">;

const profilePeriods: Record<PlaygroundScenario, PaywallPlanPeriod> = {
  annualOnly: "annual",
  lifetimeOnly: "lifetime",
  longPrice: "annual",
  monthlyOnly: "monthly",
  standard: "annual",
  weeklyAnnual: "annual",
  weeklyOnly: "weekly",
};

type ProfilePlaygroundPlan = "free" | "subscribed" | "lifetime";

const planOptions = [
  { label: "Free", value: "free" },
  { label: "Subscribed", value: "subscribed" },
  { label: "Lifetime", value: "lifetime" },
] as const satisfies readonly PlaygroundOption<ProfilePlaygroundPlan>[];

const manageButtonOptions = [
  { label: "Filled", value: "primary" },
  { label: "Quiet", value: "secondary" },
] as const satisfies readonly PlaygroundOption<"primary" | "secondary">[];

const benefitDisplayOptions = [
  { label: "List", value: "list" },
  { label: "Usage table", value: "usage" },
] as const satisfies readonly PlaygroundOption<ProfileBenefitDisplayMode>[];

const guideTopOptions = [
  { label: "Checklist", value: "checklist" },
  { label: "Next card", value: "next" },
] as const satisfies readonly PlaygroundOption<"checklist" | "next">[];

const toOnOff = (isOn: boolean) => (isOn ? "on" : "off");

interface ProfilePlaygroundScreenProps {
  scenario: PlaygroundScenario;
  selectedLocale: PlaygroundLocale;
  /** /profile-onboarding: ProfileSubscriptionWithOnboarding. */
  withOnboarding?: boolean;
  onClose: () => void;
}

export const ProfilePlaygroundScreen = ({
  scenario,
  selectedLocale,
  withOnboarding = false,
  onClose,
}: ProfilePlaygroundScreenProps) => {
  const insets = useSafeAreaInsets();
  // The guide is for subscribers, so /profile-onboarding opens subscribed
  // with the quiet manage button, as an app would show it.
  const [plan, setPlan] = useState<ProfilePlaygroundPlan>(
    withOnboarding ? "subscribed" : "free",
  );
  const isSubscribed = plan !== "free";
  const isLifetime = plan === "lifetime";
  const [showPromoCodeButton, setShowPromoCodeButton] = useState(true);
  const [showProfileIdentifiers, setShowProfileIdentifiers] = useState(false);
  const [benefitDisplayMode, setBenefitDisplayMode] =
    useState<ProfileBenefitDisplayMode>("list");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const [isRestoringPurchases, setIsRestoringPurchases] = useState(false);
  const [isRedeemingPromoCode, setIsRedeemingPromoCode] = useState(false);
  const [isManageSubscriptionSecondary, setIsManageSubscriptionSecondary] =
    useState(withOnboarding);
  const [hasNewItem, setHasNewItem] = useState(true);
  const [hasInUseItems, setHasInUseItems] = useState(true);
  const [hasOnboardingLinks, setHasOnboardingLinks] = useState(true);
  const [confirmedItemIds, setConfirmedItemIds] = useState<string[]>([]);
  const [hasChecklist, setHasChecklist] = useState(true);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [doneStepIds, setDoneStepIds] = useState<string[]>(["theme"]);
  const onboarding = useMemo(() => {
    const inUseItemIds = hasInUseItems ? ["widget"] : [];
    const newItemIds = hasNewItem ? ["trip-planner"] : [];
    return {
      sections: playgroundProOnboardingSections,
      items: createPlaygroundProOnboardingItems({
        hasLinks: hasOnboardingLinks,
        inUseItemIds,
        newItemIds,
      }),
      nextItemId: getNextProOnboardingItemId({
        order: playgroundProOnboardingOrder,
        usedItemIds: [...inUseItemIds, ...confirmedItemIds],
        newItemIds,
      }),
      onConfirmUsed: (itemId: string) =>
        setConfirmedItemIds((previous) => [...previous, itemId]),
      steps: hasChecklist
        ? createPlaygroundProOnboardingSteps({
            doneStepIds,
            lockedStepIds: ["recap"],
          })
        : undefined,
      onConfirmStepDone: (stepId: string) =>
        setDoneStepIds((previous) => [...previous, stepId]),
    };
  }, [
    confirmedItemIds,
    doneStepIds,
    hasChecklist,
    hasInUseItems,
    hasNewItem,
    hasOnboardingLinks,
  ]);
  const subscribedPeriod = isLifetime ? "lifetime" : profilePeriods[scenario];
  const profileCopy = useMemo(() => {
    return {
      ...getDefaultProfileSubscriptionCopy(selectedLocale, {
        productName: "Pro",
      }),
      notSubscribedSubtitle:
        "Unlock widgets, custom locations, and premium color tools.",
      notSubscribedTitle: "Golden Horizon Pro",
      subscribedBadge: "ACTIVE",
      subscribedTitle: "Golden Horizon Pro",
    };
  }, [selectedLocale]);
  const planLabel = isSubscribed
    ? getDefaultProfilePlanLabel(subscribedPeriod, selectedLocale, {
        productName: "Pro",
      })
    : undefined;
  const renewalLabel = isSubscribed
    ? getDefaultProfileRenewalLabel(
        subscribedPeriod,
        "Sep 18, 2026",
        selectedLocale,
      )
    : undefined;
  const identifierSection = useMemo(() => {
    return {
      defaultExpanded: true,
      isEnabled: showProfileIdentifiers,
      items: [
        {
          key: "anonymous-user-id",
          label: "User ID",
          value: "bdac7af9-17c6-4930-b5ca-e1e4aa38e42d",
        },
        {
          key: "revenuecat-id",
          label: "RevenueCat ID",
          value: "bdac7af9-17c6-4930-b5ca-e1e4aa38e42d",
        },
      ],
      onCopy: () => undefined,
    };
  }, [showProfileIdentifiers]);

  const runLoadingState = async (
    setLoading: (isLoading: boolean) => void,
    afterComplete?: () => void,
  ) => {
    setLoading(true);
    try {
      await wait(700);
      afterComplete?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 20) + 24,
            paddingTop: Math.max(insets.top, 20) + 12,
          },
        ]}
      >
        <View style={styles.topBar}>
          <Pressable onPress={onClose} style={styles.barButton}>
            <Text style={styles.barButtonText}>Back</Text>
          </Pressable>
          <Text numberOfLines={1} style={styles.title}>
            {withOnboarding ? "Profile · Pro guide" : "Profile"}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsSettingsVisible(true)}
            style={styles.barButton}
          >
            <Text style={styles.barButtonText}>Settings</Text>
          </Pressable>
        </View>

        {withOnboarding && isSubscribed && onboarding.steps ? (
          // How an app's Settings or My Page shows the same checklist.
          <View style={styles.entryCardPreview}>
            <Text style={styles.entryCardPreviewLabel}>Settings entry card</Text>
            <ProOnboardingEntryCard
              header={
                <View style={styles.entryCardHeader}>
                  <Text style={styles.entryCardHeaderTitle}>Pro Member</Text>
                  {planLabel ? (
                    <Text style={styles.entryCardHeaderSubtitle}>
                      {planLabel}
                    </Text>
                  ) : null}
                </View>
              }
              locale={selectedLocale}
              steps={onboarding.steps}
              onPress={() => Alert.alert("Open the Pro profile")}
            />
          </View>
        ) : null}

        <ProfileSubscriptionWithOnboarding
          {...profileSubscriptionBaseConfig}
          onboarding={withOnboarding ? onboarding : undefined}
          manageSubscriptionButtonVariant={
            isManageSubscriptionSecondary ? "secondary" : "primary"
          }
          benefitDisplayMode={benefitDisplayMode}
          copy={profileCopy}
          headerIcon={<GoldenHorizonIcon isSubscribed={isSubscribed} />}
          supportMessageIcon={<DeveloperLogo />}
          identifierSection={identifierSection}
          isManagingSubscription={isManagingSubscription}
          isRedeemingPromoCode={isRedeemingPromoCode}
          isRestoringPurchases={isRestoringPurchases}
          isSubscribed={isSubscribed}
          isUpgrading={isUpgrading}
          locale={selectedLocale}
          planLabel={planLabel}
          renewalLabel={renewalLabel}
          showPromoCodeButton={showPromoCodeButton}
          onManageSubscription={
            subscribedPeriod === "lifetime"
              ? undefined
              : () => runLoadingState(setIsManagingSubscription)
          }
          onOpenDeveloperWebsite={() =>
            Alert.alert("Developer website callback")
          }
          onRedeemPromoCode={() => runLoadingState(setIsRedeemingPromoCode)}
          onRestorePurchases={() =>
            runLoadingState(setIsRestoringPurchases, () =>
              setPlan("subscribed"),
            )
          }
          onUpgrade={() =>
            runLoadingState(setIsUpgrading, () => setPlan("subscribed"))
          }
        />
      </ScrollView>

      <SettingsModal
        title={
          withOnboarding ? "Profile · Pro guide settings" : "Profile settings"
        }
        visible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      >
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Account</Text>
          <PlaygroundOptionRow
            label="Plan"
            options={planOptions}
            value={plan}
            onChange={setPlan}
          />
          <PlaygroundOptionRow
            label="Manage subscription"
            options={manageButtonOptions}
            value={isManageSubscriptionSecondary ? "secondary" : "primary"}
            onChange={(value) =>
              setIsManageSubscriptionSecondary(value === "secondary")
            }
          />
          <PlaygroundOptionRow
            label="Promo code button"
            options={onOffOptions}
            value={toOnOff(showPromoCodeButton)}
            onChange={(value) => setShowPromoCodeButton(value === "on")}
          />
          <PlaygroundOptionRow
            label="User IDs"
            options={onOffOptions}
            value={toOnOff(showProfileIdentifiers)}
            onChange={(value) => setShowProfileIdentifiers(value === "on")}
          />
          <PlaygroundOptionRow
            label="Benefits"
            options={benefitDisplayOptions}
            value={benefitDisplayMode}
            onChange={setBenefitDisplayMode}
          />
        </View>

        {withOnboarding ? (
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Pro guide</Text>
            <PlaygroundOptionRow
              label="Top card"
              options={guideTopOptions}
              value={hasChecklist ? "checklist" : "next"}
              onChange={(value) => setHasChecklist(value === "checklist")}
            />
            <PlaygroundOptionRow
              label="NEW chip on Trip planner"
              options={onOffOptions}
              value={toOnOff(hasNewItem)}
              onChange={(value) => setHasNewItem(value === "on")}
            />
            <PlaygroundOptionRow
              label="In use chip on Widget"
              options={onOffOptions}
              value={toOnOff(hasInUseItems)}
              onChange={(value) => setHasInUseItems(value === "on")}
            />
            <PlaygroundOptionRow
              label="Rows open a screen"
              options={onOffOptions}
              value={toOnOff(hasOnboardingLinks)}
              onChange={(value) => setHasOnboardingLinks(value === "on")}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setConfirmedItemIds([]);
                setDoneStepIds(["theme"]);
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetButtonText}>
                Reset progress ("Already used")
              </Text>
            </Pressable>
          </View>
        ) : null}
      </SettingsModal>
    </View>
  );
};

interface GoldenHorizonIconProps {
  isSubscribed: boolean;
}

function GoldenHorizonIcon({ isSubscribed }: GoldenHorizonIconProps) {
  return (
    <View
      style={[
        styles.appIcon,
        isSubscribed ? styles.appIconSubscribed : styles.appIconFree,
      ]}
    >
      <View style={styles.appIconSky} />
      <View
        style={[
          styles.appIconHorizon,
          isSubscribed && styles.appIconHorizonSubscribed,
        ]}
      />
      <View
        style={[
          styles.appIconGround,
          isSubscribed && styles.appIconGroundSubscribed,
        ]}
      />
      {isSubscribed ? (
        <View style={styles.appIconProBadge}>
          <Text style={styles.appIconProBadgeText}>PRO</Text>
        </View>
      ) : null}
    </View>
  );
}

function DeveloperLogo() {
  return (
    <View style={styles.developerLogo}>
      <Text style={styles.developerLogoText}>P</Text>
    </View>
  );
}

interface ProfileUsageTitleProps {
  title: string;
}

function ProfileUsageTitle({ title }: ProfileUsageTitleProps) {
  return (
    <View style={styles.profileUsageTitle}>
      <Text style={styles.profileUsageTitleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#05080C",
    flex: 1,
  },
  content: {
    gap: 22,
    paddingHorizontal: 20,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  title: {
    color: "#F5F7FA",
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  entryCardPreview: {
    gap: 8,
  },
  entryCardPreviewLabel: {
    color: "#8A97A5",
    fontSize: 12,
    fontWeight: "600",
  },
  entryCardHeader: {
    gap: 2,
  },
  entryCardHeaderTitle: {
    color: "#F5F7FA",
    fontSize: 15,
    fontWeight: "600",
  },
  entryCardHeaderSubtitle: {
    color: "#8A97A5",
    fontSize: 12,
    fontWeight: "500",
  },
  barButton: {
    backgroundColor: "#151D25",
    borderRadius: 8,
    minHeight: 38,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  barButtonText: {
    color: "#F5F7FA",
    fontSize: 13,
    fontWeight: "600",
  },
  panel: {
    backgroundColor: "#0F161D",
    borderColor: "#22303C",
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: "#F5F7FA",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    lineHeight: 17,
    textTransform: "uppercase",
  },
  resetButton: {
    alignItems: "center",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 38,
  },
  resetButtonText: {
    color: "#B9C4CF",
    fontSize: 13,
    fontWeight: "600",
  },
  appIcon: {
    borderRadius: 29,
    height: 58,
    overflow: "hidden",
    width: 58,
  },
  appIconFree: {
    opacity: 0.82,
  },
  appIconSubscribed: {
    borderColor: "#FFE29A",
    borderWidth: 2,
  },
  appIconSky: {
    backgroundColor: "#1987F3",
    height: 25,
  },
  appIconHorizon: {
    backgroundColor: "#6DB8D7",
    height: 13,
  },
  appIconHorizonSubscribed: {
    backgroundColor: "#9EE6DD",
  },
  appIconGround: {
    backgroundColor: "#E6C568",
    flex: 1,
  },
  appIconGroundSubscribed: {
    backgroundColor: "#FFD86F",
  },
  appIconProBadge: {
    alignItems: "center",
    backgroundColor: "#101820",
    borderColor: "#FFE29A",
    borderRadius: 8,
    borderWidth: 1,
    bottom: 6,
    height: 18,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    right: 10,
  },
  appIconProBadgeText: {
    color: "#FFE29A",
    fontSize: 8,
    fontWeight: "700",
    lineHeight: 10,
  },
  developerLogo: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#5AC8B7",
    flex: 1,
    justifyContent: "center",
  },
  developerLogoText: {
    color: "#05080C",
    fontSize: 16,
    fontWeight: "700",
  },
  profileUsageTitle: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    gap: 6,
  },
  profileUsageTitleText: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    textDecorationLine: "underline",
  },
});
