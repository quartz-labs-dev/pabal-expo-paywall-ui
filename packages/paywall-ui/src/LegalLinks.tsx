import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallCopy, PaywallTheme } from "./types";

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

interface LegalLinksProps {
  copy: PaywallCopy;
  trialNotice?: {
    title: string;
    description: string;
  };
  shouldShowLegalPrefix?: boolean;
  theme: PaywallTheme;
  onRestore: () => Promise<void> | void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const LegalLinks = ({
  copy,
  trialNotice,
  shouldShowLegalPrefix = true,
  theme,
  onRestore,
  onOpenTerms,
  onOpenPrivacy,
}: LegalLinksProps) => {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={onRestore}>
        <Text style={[styles.restoreLink, { color: theme.mutedTextColor }]}>
          {copy.restoreButton}
        </Text>
      </Pressable>

      <View style={styles.legalRow}>
        {shouldShowLegalPrefix && copy.legalPrefix && (
          <Text style={[styles.legalText, { color: theme.mutedTextColor }]}>
            {copy.legalPrefix}
          </Text>
        )}
        <Pressable accessibilityRole="link" onPress={onOpenTerms}>
          <Text style={[styles.link, { color: theme.secondaryTextColor }]}>
            {copy.termsText}
          </Text>
        </Pressable>
        <Text style={[styles.legalText, { color: theme.mutedTextColor }]}>
          {copy.legalSeparator ?? "/"}
        </Text>
        <Pressable accessibilityRole="link" onPress={onOpenPrivacy}>
          <Text style={[styles.link, { color: theme.secondaryTextColor }]}>
            {copy.privacyText}
          </Text>
        </Pressable>
      </View>

      {trialNotice && (
        <View
          style={[
            styles.trialNotice,
            {
              backgroundColor: getSubtleBackgroundColor(theme.surfaceColor),
            },
          ]}
        >
          <Text
            style={[styles.trialNoticeTitle, { color: theme.secondaryTextColor }]}
          >
            {trialNotice.title}
          </Text>
          <Text
            style={[
              styles.trialNoticeDescription,
              { color: theme.mutedTextColor },
            ]}
          >
            {trialNotice.description}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  legalRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    justifyContent: "center",
  },
  legalText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
  },
  link: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
    textDecorationLine: "underline",
  },
  restoreLink: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
    textDecorationLine: "underline",
  },
  trialNotice: {
    alignSelf: "center",
    borderRadius: 8,
    gap: 2,
    maxWidth: 520,
    paddingHorizontal: 12,
    paddingVertical: 9,
    width: "100%",
  },
  trialNoticeDescription: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 15,
    textAlign: "center",
  },
  trialNoticeTitle: {
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "center",
  },
});
