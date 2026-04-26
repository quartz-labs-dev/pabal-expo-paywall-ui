import {
  ProfileSubscriptionSection,
  type ProfileSubscriptionConfig,
} from "pabal-expo-paywall-ui";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const wait = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const profileSubscriptionConfig = {
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
  copy: {
    subscribedTitle: "Golden Horizon Pro",
    subscribedSubtitle: "Thank you for your support!",
    notSubscribedTitle: "Golden Horizon Pro",
    notSubscribedSubtitle:
      "Unlock widgets, custom locations, and premium color tools.",
    subscribedBadge: "ACTIVE",
    notSubscribedBadge: "FREE PLAN",
    benefitsTitle: "Your Pro Benefits",
    upgradeButton: "Upgrade to Pro",
    upgradingButton: "Opening paywall...",
    manageSubscriptionButton: "Manage subscription",
    managingSubscriptionButton: "Opening...",
    restorePurchasesButton: "Restore purchases",
    restoringPurchasesButton: "Restoring...",
    redeemPromoCodeButton: "Enter promo code",
    redeemingPromoCodeButton: "Opening...",
  },
  headerIcon: <GoldenHorizonIcon />,
} satisfies ProfileSubscriptionConfig;

interface ProfilePlaygroundScreenProps {
  onClose: () => void;
}

export const ProfilePlaygroundScreen = ({
  onClose,
}: ProfilePlaygroundScreenProps) => {
  const insets = useSafeAreaInsets();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPromoCodeButton, setShowPromoCodeButton] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isManagingSubscription, setIsManagingSubscription] = useState(false);
  const [isRestoringPurchases, setIsRestoringPurchases] = useState(false);
  const [isRedeemingPromoCode, setIsRedeemingPromoCode] = useState(false);

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
          {...profileSubscriptionConfig}
          isManagingSubscription={isManagingSubscription}
          isRedeemingPromoCode={isRedeemingPromoCode}
          isRestoringPurchases={isRestoringPurchases}
          isSubscribed={isSubscribed}
          isUpgrading={isUpgrading}
          planLabel={isSubscribed ? "Annual Pro" : undefined}
          renewalLabel={isSubscribed ? "Renews on Sep 18, 2026" : undefined}
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

function GoldenHorizonIcon() {
  return (
    <View style={styles.appIcon}>
      <View style={styles.appIconSky} />
      <View style={styles.appIconHorizon} />
      <View style={styles.appIconGround} />
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
  appIconSky: {
    backgroundColor: "#1987F3",
    height: 25,
  },
  appIconHorizon: {
    backgroundColor: "#6DB8D7",
    height: 13,
  },
  appIconGround: {
    backgroundColor: "#E6C568",
    flex: 1,
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
