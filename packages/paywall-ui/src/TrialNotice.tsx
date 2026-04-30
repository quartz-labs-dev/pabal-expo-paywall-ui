import { StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "./color-utils";
import type { PaywallTheme } from "./types";

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
          backgroundColor: getColorWithAlpha(theme.surfaceColor, 0.36),
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
