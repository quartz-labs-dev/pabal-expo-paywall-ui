import { Pressable, StyleSheet, Text, View } from "react-native";

import { CheckCircleIcon } from "../shared/icons";
import type {
  PaywallTheme,
  ProOnboardingCopy,
  ProOnboardingItem,
  ProOnboardingSection,
} from "../types";

interface ProOnboardingSectionListProps {
  sections: ProOnboardingSection[];
  items: Record<string, ProOnboardingItem>;
  copy: ProOnboardingCopy;
  theme: PaywallTheme;
  onPressItem: (item: ProOnboardingItem) => void;
}

/**
 * Section titles and item rows: badge, title, NEW, description, and a check
 * on the right (filled when the app proves the item is in use). In-use titles
 * are dimmed so what is left to try stands out.
 */
export const ProOnboardingSectionList = ({
  sections,
  items,
  copy,
  theme,
  onPressItem,
}: ProOnboardingSectionListProps) => (
  <View style={styles.list}>
    {sections.map((section) => {
      const sectionItems = section.itemIds
        .map((itemId) => items[itemId])
        .filter((item): item is ProOnboardingItem => Boolean(item));
      if (sectionItems.length === 0) return null;

      return (
        <View key={section.id} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>
            {section.title}
          </Text>
          {sectionItems.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole={item.onPress ? "button" : undefined}
              disabled={!item.onPress}
              onPress={() => onPressItem(item)}
              style={({ pressed }) => [
                styles.row,
                { borderBottomColor: theme.borderColor },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.texts}>
                {item.badge}
                <View style={styles.titleRow}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: item.isInUse
                          ? theme.secondaryTextColor
                          : theme.primaryTextColor,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  {item.isNew ? (
                    <View
                      style={[styles.chip, { backgroundColor: theme.accentColor }]}
                    >
                      <Text
                        style={[styles.chipText, { color: theme.accentTextColor }]}
                      >
                        {copy.newBadge}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {item.description ? (
                  <Text
                    style={[
                      styles.description,
                      { color: theme.secondaryTextColor },
                    ]}
                  >
                    {item.description}
                  </Text>
                ) : null}
              </View>
              <View
                accessibilityLabel={item.isInUse ? copy.inUseBadge : undefined}
                accessible={Boolean(item.isInUse)}
              >
                <CheckCircleIcon
                  checkColor={theme.accentTextColor}
                  color={item.isInUse ? theme.accentColor : theme.mutedTextColor}
                  isChecked={Boolean(item.isInUse)}
                />
              </View>
            </Pressable>
          ))}
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: 24,
  },
  section: {
    gap: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    paddingBottom: 4,
  },
  row: {
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 8,
    minHeight: 48,
    paddingVertical: 8,
  },
  texts: {
    alignItems: "flex-start",
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  title: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "400",
  },
  chip: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.72,
  },
});
