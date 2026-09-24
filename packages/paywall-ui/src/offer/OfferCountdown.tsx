import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getLimitedTimeOfferCountdownParts } from "./limited-time-offer";
import type {
  LimitedTimeOfferCountdownParts,
  PaywallTheme,
} from "../types";

interface OfferCountdownProps {
  accentColor?: string;
  expiresAt: number;
  formatRemainingTime?: (
    parts: LimitedTimeOfferCountdownParts,
  ) => string;
  label: string;
  variant?: "pill" | "segmented";
  theme: PaywallTheme;
  onExpire: () => void;
}

const padTimeUnit = (value: number): string =>
  String(value).padStart(2, "0");

export const OfferCountdown = ({
  accentColor,
  expiresAt,
  formatRemainingTime,
  label,
  variant = "segmented",
  theme,
  onExpire,
}: OfferCountdownProps) => {
  const [remainingMs, setRemainingMs] = useState(() =>
    Math.max(expiresAt - Date.now(), 0),
  );
  const hasExpiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const updateRemainingTime = () => {
      const nextRemainingMs = Math.max(expiresAt - Date.now(), 0);
      setRemainingMs(nextRemainingMs);

      if (nextRemainingMs > 0 || hasExpiredRef.current) return;
      hasExpiredRef.current = true;
      onExpireRef.current();
    };

    hasExpiredRef.current = false;
    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  const parts = getLimitedTimeOfferCountdownParts(remainingMs);
  const visibleTime = [parts.hours, parts.minutes, parts.seconds]
    .map(padTimeUnit)
    .join(":");
  const visibleParts = [parts.hours, parts.minutes, parts.seconds].map(
    padTimeUnit,
  );
  const resolvedAccentColor = accentColor ?? theme.accentColor;

  if (variant === "pill") {
    return (
      <View
        accessibilityLabel={
          formatRemainingTime?.(parts) ?? `${label} ${visibleTime}`
        }
        accessible
        style={styles.container}
      >
        <View
          style={[
            styles.pill,
            {
              backgroundColor: resolvedAccentColor,
              borderColor: resolvedAccentColor,
            },
          ]}
        >
          <Text style={styles.pillTime}>{visibleTime}</Text>
        </View>
        <Text style={[styles.pillLabel, { color: theme.mutedTextColor }]}>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={formatRemainingTime?.(parts) ?? `${label} ${visibleTime}`}
      accessible
      style={styles.container}
    >
      <Text style={[styles.label, { color: theme.secondaryTextColor }]}>
        {label}
      </Text>
      <View style={styles.timeRow}>
        {visibleParts.map((part, index) => (
          <View key={index} style={styles.timePartRow}>
            {index > 0 ? (
              <Text
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={[styles.separator, { color: resolvedAccentColor }]}
              >
                :
              </Text>
            ) : null}
            <View
              style={[
                styles.timePart,
                {
                  backgroundColor: theme.surfaceColor,
                  borderColor: theme.borderColor,
                },
              ]}
            >
              <Text style={[styles.time, { color: theme.primaryTextColor }]}>
                {part}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
    lineHeight: 18,
    textAlign: "center",
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    minWidth: 124,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  pillLabel: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "center",
  },
  pillTime: {
    color: "#FFFFFF",
    fontSize: 22,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
    letterSpacing: 0.6,
    lineHeight: 27,
    textAlign: "center",
  },
  separator: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    marginHorizontal: 6,
  },
  time: {
    fontVariant: ["tabular-nums"],
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 1,
    lineHeight: 34,
    textAlign: "center",
  },
  timePart: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: 62,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  timePartRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  timeRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
