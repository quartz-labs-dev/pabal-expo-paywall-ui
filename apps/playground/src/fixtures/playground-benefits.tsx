import { StyleSheet, Text, View } from "react-native";
import type { PaywallBenefit } from "pabal-expo-paywall-ui";

export const playgroundBenefits = [
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
] satisfies PaywallBenefit[];

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

const styles = StyleSheet.create({
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
