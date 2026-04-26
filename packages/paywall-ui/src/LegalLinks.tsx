import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PaywallCopy, PaywallTheme } from "./types";

interface LegalLinksProps {
  copy: PaywallCopy;
  theme: PaywallTheme;
  onRestore: () => Promise<void> | void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const LegalLinks = ({
  copy,
  theme,
  onRestore,
  onOpenTerms,
  onOpenPrivacy,
}: LegalLinksProps) => {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={onRestore}>
        <Text style={[styles.link, { color: theme.secondaryTextColor }]}>
          {copy.restoreButton}
        </Text>
      </Pressable>

      <View style={styles.legalRow}>
        {copy.legalPrefix && (
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
          /
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
    gap: 12,
  },
  legalRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  legalText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  link: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    textDecorationLine: "underline",
  },
});
