import { StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import type { OnboardingContentTheme, OnboardingFrameTone } from "./types";

export interface OnboardingPlainListItem {
  id: string;
  title: string;
}

export interface OnboardingPlainListProps {
  items: readonly OnboardingPlainListItem[];
  theme: OnboardingContentTheme;
  tone?: OnboardingFrameTone;
}

export const OnboardingPlainList = ({
  items,
  theme,
  tone = "normal",
}: OnboardingPlainListProps) => {
  const isInvertedTone = tone === "inverted";
  const textColor = isInvertedTone
    ? theme.backgroundColor
    : theme.primaryTextColor;
  const indexBackgroundColor = isInvertedTone
    ? theme.backgroundColor
    : getColorWithAlpha(theme.primaryTextColor, 0.1, theme.cardBackgroundColor);
  const indexTextColor = theme.primaryTextColor;

  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={item.id} style={styles.row}>
          <View
            style={[
              styles.index,
              {
                backgroundColor: indexBackgroundColor,
              },
            ]}
          >
            <Text style={[styles.indexText, { color: indexTextColor }]}>
              {index + 1}
            </Text>
          </View>
          <Text style={[styles.itemText, { color: textColor }]}>
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 14,
    maxWidth: 360,
    width: "100%",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    minHeight: 52,
  },
  index: {
    alignItems: "center",
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  indexText: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 19,
  },
  itemText: {
    flex: 1,
    flexShrink: 1,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
});
