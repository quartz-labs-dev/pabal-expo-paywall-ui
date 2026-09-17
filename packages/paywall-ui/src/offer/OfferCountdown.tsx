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

  return (
    <View
      accessibilityLabel={formatRemainingTime?.(parts) ?? `${label} ${visibleTime}`}
      accessible
      style={styles.container}
    >
      <Text style={[styles.label, { color: theme.secondaryTextColor }]}>
        {label}
      </Text>
      <Text style={[styles.time, { color: theme.primaryTextColor }]}>
        {visibleTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
  },
  time: {
    fontVariant: ["tabular-nums"],
    fontSize: 31,
    fontWeight: "800",
    letterSpacing: 1.5,
    lineHeight: 38,
    textAlign: "center",
  },
});
