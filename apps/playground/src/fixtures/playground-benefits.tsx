import { Alert, StyleSheet, Text, View } from "react-native";
import type { PaywallBenefit } from "pabal-expo-paywall-ui";

export const playgroundBenefits = [
  {
    title: "Home Screen Widget",
    description: "Keep your status visible from the home screen.",
    icon: <BenefitIcon label="W" />,
    onClick: () => Alert.alert("Home Screen Widget benefit"),
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
  {
    title: "Forecast Alerts",
    description: "Get notified when the next viewing window improves.",
    icon: <BenefitIcon label="A" />,
  },
  {
    title: "Saved Observation Notes",
    description: "Keep notes for each aurora session and location.",
    icon: <BenefitIcon label="N" />,
  },
  {
    title: "Advanced Map Layers",
    description: "Compare cloud cover, light pollution, and visibility zones.",
    icon: <BenefitIcon label="M" />,
  },
  {
    title: "Historical Activity Timeline",
    description: "Review recent activity trends before planning a trip.",
    icon: <BenefitIcon label="T" />,
  },
  {
    title: "Multi-Day Trip Planner",
    description: "Plan several nights around the best forecast windows.",
    icon: <BenefitIcon label="P" />,
  },
  {
    title: "Priority Data Refresh",
    description: "Refresh forecast data faster during active sky events.",
    icon: <BenefitIcon label="R" />,
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
