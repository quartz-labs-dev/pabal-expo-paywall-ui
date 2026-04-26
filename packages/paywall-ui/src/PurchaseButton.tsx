import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { PaywallTheme } from "./types";

interface PurchaseButtonProps {
  label: string;
  loadingLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  background?: ReactNode;
  theme: PaywallTheme;
  onPress: () => void;
}

export const PurchaseButton = ({
  label,
  loadingLabel,
  isLoading = false,
  isDisabled = false,
  background,
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
          backgroundColor: background ? "transparent" : theme.accentColor,
          opacity: isDisabled ? 0.45 : pressed ? 0.82 : 1,
        },
      ]}
    >
      {background && (
        <View pointerEvents="none" style={styles.background}>
          {background}
        </View>
      )}
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
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 14,
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});
