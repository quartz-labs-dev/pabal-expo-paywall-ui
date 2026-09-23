import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getLimitedTimeOfferCountdownParts } from "./limited-time-offer";
import type {
  LimitedTimeOfferCountdownParts,
  PaywallTheme,
} from "../types";

interface OfferCountdownProps {
  expiresAt: number;
  formatRemainingTime?: (
    parts: LimitedTimeOfferCountdownParts,
  ) => string;
  label: string;
  theme: PaywallTheme;
  onExpire: () => void;
}

const padTimeUnit = (value: number): string =>
  String(value).padStart(2, "0");

export const OfferCountdown = ({
  expiresAt,
  formatRemainingTime,
  label,
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
                style={[styles.separator, { color: theme.accentColor }]}
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
