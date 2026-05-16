import type { ReactNode } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

import type { PaywallTheme } from "../types";

const defaultSupportMessageIconSource =
  require("./assets/retriever.webp") as ImageSourcePropType;

interface SupportMessageBubbleProps {
  icon?: ReactNode;
  label?: string;
  message: string;
  theme: PaywallTheme;
  onPress?: () => Promise<void> | void;
}

export const SupportMessageBubble = ({
  icon,
  label,
  message,
  theme,
  onPress,
}: SupportMessageBubbleProps) => {
  const resolvedIcon = icon ?? (
    <Image
      accessibilityIgnoresInvertColors
      source={defaultSupportMessageIconSource}
      style={styles.defaultIconImage}
    />
  );

  return (
    <Pressable
      accessibilityLabel={label ? `${label}. ${message}` : message}
      accessibilityRole={onPress ? "link" : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? 0.82 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.icon,
          {
            backgroundColor: theme.selectedSurfaceColor,
            borderColor: theme.borderColor,
          },
        ]}
      >
        {resolvedIcon}
      </View>

      <View
        style={[
          styles.bubble,
          {
            backgroundColor: theme.surfaceColor,
            borderColor: theme.borderColor,
          },
        ]}
      >
        <View
          style={[
            styles.tail,
            {
              backgroundColor: theme.surfaceColor,
              borderColor: theme.borderColor,
            },
          ]}
        />
        {label && (
          <Text style={[styles.label, { color: theme.accentColor }]}>
            {label}
          </Text>
        )}
        <Text style={[styles.message, { color: theme.secondaryTextColor }]}>
          {message}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
    minHeight: 44,
  },
  icon: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 34,
    justifyContent: "center",
    marginTop: 10,
    overflow: "hidden",
    width: 34,
  },
  defaultIconImage: {
    height: "100%",
    width: "100%",
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 14,
    paddingHorizontal: 2,
  },
  bubble: {
    borderCurve: "continuous",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    gap: 6,
    minWidth: 0,
    overflow: "visible",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  tail: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    height: 12,
    left: -6,
    position: "absolute",
    top: 20,
    transform: [{ rotate: "45deg" }],
    width: 12,
  },
  message: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 19,
  },
});
