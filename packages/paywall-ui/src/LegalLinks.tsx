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
      <View
        style={[
          styles.topSeparator,
          { backgroundColor: theme.mutedTextColor },
        ]}
      />

      {shouldShowLegalPrefix && copy.legalPrefix && (
        <Text style={[styles.legalText, { color: theme.mutedTextColor }]}>
          {copy.legalPrefix}
        </Text>
      )}

      <View style={styles.actionRow}>
        <View style={styles.actionCell}>
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={onRestore}
            style={styles.actionItem}
          >
            <Text style={[styles.actionLabel, { color: theme.secondaryTextColor }]}>
              {copy.restoreButton}
            </Text>
          </Pressable>
          <Text
            style={[
              styles.separator,
              styles.mutedSeparator,
              { color: theme.mutedTextColor },
            ]}
          >
            |
          </Text>
        </View>
        <View style={styles.actionCell}>
          <Pressable
            accessibilityRole="link"
            hitSlop={8}
            onPress={onOpenPrivacy}
            style={styles.actionItem}
          >
            <Text style={[styles.actionLabel, { color: theme.secondaryTextColor }]}>
              {copy.privacyText}
            </Text>
          </Pressable>
          <Text
            style={[
              styles.separator,
              styles.mutedSeparator,
              { color: theme.mutedTextColor },
            ]}
          >
            |
          </Text>
        </View>
        <View style={styles.actionCell}>
          <Pressable
            accessibilityRole="link"
            hitSlop={8}
            onPress={onOpenTerms}
            style={styles.actionItem}
          >
            <Text style={[styles.actionLabel, { color: theme.secondaryTextColor }]}>
              {copy.termsText}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 14,
    width: "100%",
  },
  actionCell: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    position: "relative",
  },
  actionItem: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
    paddingHorizontal: 8,
    width: "100%",
  },
  actionLabel: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    paddingHorizontal: 4,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  actionRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  legalText: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    textAlign: "center",
  },
  separator: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    position: "absolute",
    right: -5,
    textAlign: "center",
    top: 9,
    width: 10,
  },
  mutedSeparator: {
    opacity: 0.3,
  },
  topSeparator: {
    alignSelf: "stretch",
    height: 1,
    marginBottom: 8,
    opacity: 0.3,
  },
});
