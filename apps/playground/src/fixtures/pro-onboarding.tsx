import type {
  ProOnboardingItem,
  ProOnboardingSection,
} from "pabal-expo-paywall-ui";
import { Alert, StyleSheet, Text, View } from "react-native";

// Mock Pro onboarding for the profile playground. Titles are app-provided in
// real apps (resolved with the app's own i18n), so they stay English here.

export const playgroundProOnboardingSections: ProOnboardingSection[] = [
  { id: "plan", title: "Plan your sky", itemIds: ["smart-alerts", "trip-planner"] },
  {
    id: "explore",
    title: "Explore more",
    itemIds: ["map-layers", "timeline"],
  },
  { id: "customize", title: "Make it yours", itemIds: ["widget", "palette"] },
];

export const playgroundProOnboardingOrder = [
  "palette",
  "widget",
  "smart-alerts",
  "map-layers",
  "trip-planner",
  "timeline",
];

const AiBadge = () => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>AI</Text>
  </View>
);

interface PlaygroundItemOptions {
  hasLinks: boolean;
  inUseItemIds: string[];
  newItemIds: string[];
}

export const createPlaygroundProOnboardingItems = ({
  hasLinks,
  inUseItemIds,
  newItemIds,
}: PlaygroundItemOptions): Record<string, ProOnboardingItem> => {
  const base: Omit<ProOnboardingItem, "isInUse" | "isNew" | "onPress">[] = [
    {
      id: "smart-alerts",
      title: "Smart sunset alerts",
      description: "Cloud cover, golden hour, notifications",
      badge: <AiBadge />,
    },
    { id: "trip-planner", title: "Multi-day trip planner" },
    { id: "map-layers", title: "Advanced map layers" },
    { id: "timeline", title: "Historical activity timeline" },
    { id: "widget", title: "Home and lock screen widgets" },
    { id: "palette", title: "Custom color palette" },
  ];

  return Object.fromEntries(
    base.map((item) => [
      item.id,
      {
        ...item,
        isInUse: inUseItemIds.includes(item.id),
        isNew: newItemIds.includes(item.id),
        onPress: hasLinks ? () => Alert.alert(`Open ${item.title}`) : undefined,
      },
    ]),
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#2B3845",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#F5F7FA",
    fontSize: 11,
    fontWeight: "600",
  },
});
