import { useEffect, useRef, type ReactNode } from "react";
import {
  ActivityIndicator,
  Animated,
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
  const loadingOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isLoading) {
      loadingOpacity.stopAnimation();
      loadingOpacity.setValue(1);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(loadingOpacity, {
          duration: 520,
          toValue: 0.35,
          useNativeDriver: true,
        }),
        Animated.timing(loadingOpacity, {
          duration: 520,
          toValue: 1,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [isLoading, loadingOpacity]);

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
      <Animated.View
        style={[
          styles.content,
          isLoading && {
            opacity: loadingOpacity,
          },
        ]}
      >
        {isLoading && (
          <ActivityIndicator color={theme.accentTextColor} size="small" />
        )}
        <Text style={[styles.label, { color: theme.accentTextColor }]}>
          {isLoading ? loadingLabel ?? label : label}
        </Text>
      </Animated.View>
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
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  label: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
});
