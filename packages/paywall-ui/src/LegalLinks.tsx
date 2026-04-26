import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallCopy, PaywallTheme } from "./types";

interface LegalLinksProps {
  copy: PaywallCopy;
  shouldShowLegalPrefix?: boolean;
  theme: PaywallTheme;
  onRestore: () => Promise<void> | void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const LegalLinks = ({
  copy,
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
});
