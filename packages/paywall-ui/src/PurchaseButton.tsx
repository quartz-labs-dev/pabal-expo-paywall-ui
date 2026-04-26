import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import type { PaywallTheme } from "./types";

interface PurchaseButtonProps {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  theme: PaywallTheme;
  onPress: () => void;
}

export const PurchaseButton = ({
  label,
  loadingLabel,
  isLoading = false,
  isDisabled = false,
  theme,
  onPress,
}: PurchaseButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled || isLoading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: theme.accentColor,
          opacity: isDisabled ? 0.45 : pressed ? 0.82 : 1,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.accentTextColor} />
      ) : (
        <Text style={[styles.label, { color: theme.accentTextColor }]}>
          {loadingLabel ?? label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});
