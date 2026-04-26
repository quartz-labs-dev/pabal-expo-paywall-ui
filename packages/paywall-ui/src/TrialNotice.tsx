import { StyleSheet, Text, View } from "react-native";

import type { PaywallTheme } from "./types";

const getSubtleBackgroundColor = (color: string): string => {
  const normalizedColor = color.trim();
  const shortHexMatch = normalizedColor.match(
    /^#([a-f\d])([a-f\d])([a-f\d])$/i,
  );
  const hexColor = shortHexMatch
    ? `#${shortHexMatch[1]}${shortHexMatch[1]}${shortHexMatch[2]}${shortHexMatch[2]}${shortHexMatch[3]}${shortHexMatch[3]}`
    : normalizedColor;
  const hexMatch = hexColor.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

  if (!hexMatch) return color;

  const red = Number.parseInt(hexMatch[1] ?? "0", 16);
  const green = Number.parseInt(hexMatch[2] ?? "0", 16);
  const blue = Number.parseInt(hexMatch[3] ?? "0", 16);

  return `rgba(${red}, ${green}, ${blue}, 0.36)`;
};

export interface TrialNoticeProps {
  title: string;
  description: string;
  theme: PaywallTheme;
}

export const TrialNotice = ({
  title,
  description,
  theme,
}: TrialNoticeProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getSubtleBackgroundColor(theme.surfaceColor),
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.secondaryTextColor }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: theme.mutedTextColor }]}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 8,
    gap: 2,
    maxWidth: 520,
    paddingHorizontal: 12,
    paddingVertical: 9,
    width: "100%",
  },
  description: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 15,
    textAlign: "left",
  },
  title: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "left",
  },
});
