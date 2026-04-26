import {
  ProfileSubscriptionSection,
  getDefaultProfilePlanLabel,
  getDefaultProfileRenewalLabel,
  getDefaultProfileSubscriptionCopy,
  type ProfileSubscriptionConfig,
  type PaywallPlanPeriod,
} from "pabal-expo-paywall-ui";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { PlaygroundLocale, PlaygroundScenario } from "../types/playground";

const wait = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const profileSubscriptionBaseConfig = {
  benefits: [
    {
      title: "Home Screen Widget",
      description: "Keep your status visible from the home screen.",
      icon: <BenefitIcon label="W" />,
    },
    {
      title: "Custom Location Settings",
      description: "Save the places that matter most to you.",
      icon: <BenefitIcon label="L" />,
    },
    {
      title: "Custom Color Palette Settings",
      description: "Tune the interface to match your preferred look.",
      icon: <BenefitIcon label="C" />,
    },
  ],
} satisfies Omit<ProfileSubscriptionConfig, "copy" | "headerIcon">;

const profilePeriods: Record<PlaygroundScenario, PaywallPlanPeriod> = {
  annualOnly: "annual",
  lifetimeOnly: "lifetime",
  longPrice: "annual",
  monthlyOnly: "monthly",
  standard: "annual",
};

interface ProfilePlaygroundScreenProps {
  scenario: PlaygroundScenario;
  selectedLocale: PlaygroundLocale;
  onClose: () => void;
}

export const ProfilePlaygroundScreen = ({
  scenario,
  selectedLocale,
  onClose,
}: ProfilePlaygroundScreenProps) => {
  const insets = useSafeAreaInsets();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPromoCodeButton, setShowPromoCodeButton] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const [isRestoringPurchases, setIsRestoringPurchases] = useState(false);
  const [isRedeemingPromoCode, setIsRedeemingPromoCode] = useState(false);
  const subscribedPeriod = profilePeriods[scenario];
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
        <Pressable onPress={onClose} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <View style={styles.controls}>
          <ToggleButton
            isSelected={isSubscribed}
            label={isSubscribed ? "Subscribed" : "Free"}
            onPress={() => setIsSubscribed((previousValue) => !previousValue)}
          />
          <ToggleButton
            isSelected={showPromoCodeButton}
            label={showPromoCodeButton ? "Promo shown" : "Promo hidden"}
            onPress={() =>
              setShowPromoCodeButton((previousValue) => !previousValue)
            }
          />
        </View>

        <ProfileSubscriptionSection
          {...profileSubscriptionBaseConfig}
          copy={profileCopy}
          headerIcon={<GoldenHorizonIcon isSubscribed={isSubscribed} />}
          isManagingSubscription={isManagingSubscription}
          isRedeemingPromoCode={isRedeemingPromoCode}
          isRestoringPurchases={isRestoringPurchases}
          isSubscribed={isSubscribed}
          isUpgrading={isUpgrading}
          planLabel={planLabel}
          renewalLabel={renewalLabel}
          showPromoCodeButton={showPromoCodeButton}
          onManageSubscription={() =>
            runLoadingState(setIsManagingSubscription)
          }
          onRedeemPromoCode={() => runLoadingState(setIsRedeemingPromoCode)}
          onRestorePurchases={() =>
            runLoadingState(setIsRestoringPurchases, () =>
              setIsSubscribed(true),
            )
          }
          onUpgrade={() =>
            runLoadingState(setIsUpgrading, () => setIsSubscribed(true))
          }
        />
      </ScrollView>
    </View>
  );
};

interface BenefitIconProps {
  label: string;
}

function BenefitIcon({ label }: BenefitIconProps) {
  return (
    <View style={styles.benefitIcon}>
      <Text style={styles.benefitIconText}>{label}</Text>
    </View>
  );
}

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

interface ToggleButtonProps {
  isSelected: boolean;
  label: string;
  onPress: () => void;
}

const ToggleButton = ({ isSelected, label, onPress }: ToggleButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.toggleButton, isSelected && styles.toggleButtonSelected]}
    >
      <Text
        style={[
          styles.toggleButtonText,
          isSelected && styles.toggleButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#05080C",
    flex: 1,
  },
  content: {
    gap: 22,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#151D25",
    borderRadius: 8,
    minHeight: 38,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  backButtonText: {
    color: "#F5F7FA",
    fontSize: 13,
    fontWeight: "700",
  },
  controls: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  toggleButton: {
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minHeight: 44,
    minWidth: 144,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  toggleButtonSelected: {
    backgroundColor: "#102A2A",
    borderColor: "#5AC8B7",
  },
  toggleButtonText: {
    color: "#B9C4CF",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  toggleButtonTextSelected: {
    color: "#5AC8B7",
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
    fontWeight: "900",
    lineHeight: 10,
  },
  benefitIcon: {
    alignItems: "center",
    backgroundColor: "rgba(90, 200, 183, 0.16)",
    borderRadius: 8,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  benefitIconText: {
    color: "#5AC8B7",
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
});
