import type {
  ProOnboardingItem,
  ProOnboardingSection,
  ProOnboardingStep,
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

const PLAYGROUND_STEPS: Omit<ProOnboardingStep, "isDone" | "onPress">[] = [
  { id: "theme", title: "Change the app color and icon" },
  { id: "first-plan", title: "Plan your first sunset" },
  { id: "widget", title: "Set up a home screen widget" },
  { id: "alerts", title: "Turn on smart alerts", badge: <AiBadge /> },
  {
    id: "recap",
    title: "View your monthly recap",
    description: "Unlocks after 3 saved plans (1/3)",
  },
];

/** Five getting-started steps; `lockedStepIds` get no "Try it". */
export const createPlaygroundProOnboardingSteps = ({
  doneStepIds,
  lockedStepIds,
}: {
  doneStepIds: string[];
  lockedStepIds: string[];
}): ProOnboardingStep[] =>
  PLAYGROUND_STEPS.map((step) => ({
    ...step,
    isDone: doneStepIds.includes(step.id),
    onPress: lockedStepIds.includes(step.id)
      ? undefined
      : () => Alert.alert(`Open ${step.title}`),
  }));

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
