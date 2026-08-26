import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { OnboardingContentTheme } from "./types";

export interface OnboardingHealthBackfillItem {
  // Supporting line, e.g. "8 sessions".
  detail: string;
  iconSource?: ImageSourcePropType;
  id: string;
  // Sport or group name.
  title: string;
}

// Review screen for the initial history import: a scanning state
// while the app reads the health store, then the found groups as a
// list. The step frame owns the headline and the add/skip actions;
// all copy comes from the app.
export interface OnboardingHealthBackfillSummaryProps {
  isScanning: boolean;
  items: readonly OnboardingHealthBackfillItem[];
  // Optional footnote under the list, e.g. "3 sessions need a quick
  // confirmation later."
  note?: string;
  scanningLabel: string;
  theme: OnboardingContentTheme;
}

const ITEM_ENTRANCE_STAGGER_MS = 90;
const SCANNING_DOT_COUNT = 3;

export const OnboardingHealthBackfillSummary = ({
  isScanning,
  items,
  note,
  scanningLabel,
  theme,
}: OnboardingHealthBackfillSummaryProps) => {
  if (isScanning) {
    return (
      <View pointerEvents="none" style={styles.scanningRoot}>
        <View style={styles.scanningDots}>
          {Array.from({ length: SCANNING_DOT_COUNT }, (_, index) => (
            <ScanningDot
              color={theme.accentColor}
              index={index}
              key={index}
            />
          ))}
        </View>
        <Text
          style={[
            styles.scanningLabel,
            { color: theme.secondaryTextColor },
          ]}
        >
          {scanningLabel}
        </Text>
      </View>
    );
  }

  return (
    <View pointerEvents="none" style={styles.root}>
      <View style={styles.list}>
        {items.map((item, index) => (
          <BackfillItemRow
            index={index}
            item={item}
            key={item.id}
            theme={theme}
          />
        ))}
      </View>
      {note ? (
        <Text
          style={[styles.note, { color: theme.secondaryTextColor }]}
        >
          {note}
        </Text>
      ) : null}
    </View>
  );
};

interface BackfillItemRowProps {
  index: number;
  item: OnboardingHealthBackfillItem;
  theme: OnboardingContentTheme;
}

const BackfillItemRow = ({
  index,
  item,
  theme,
}: BackfillItemRowProps) => {
  const entranceStyle = useRowEntrance(
    index * ITEM_ENTRANCE_STAGGER_MS,
  );

  return (
    <Animated.View
      style={[
        styles.itemRow,
        {
          backgroundColor: theme.backgroundColor,
          shadowColor: theme.shadowColor,
        },
        entranceStyle,
      ]}
    >
      <View
        style={[
          styles.itemIconSlot,
          { backgroundColor: theme.cardBackgroundColor },
        ]}
      >
        {item.iconSource ? (
          <Image
            resizeMode="cover"
            source={item.iconSource}
            style={styles.itemIconImage}
          />
        ) : (
          <View
            style={[
              styles.itemIconFallback,
              { backgroundColor: theme.accentColor },
            ]}
          />
        )}
      </View>
      <View style={styles.itemCopy}>
        <Text
          numberOfLines={1}
          style={[
            styles.itemTitle,
            { color: theme.primaryTextColor },
          ]}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.itemDetail,
            { color: theme.secondaryTextColor },
          ]}
        >
          {item.detail}
        </Text>
      </View>
    </Animated.View>
  );
};

const useRowEntrance = (delayMs: number) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(delayMs),
      Animated.timing(progress, {
        duration: 360,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [delayMs, progress]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        }),
      },
    ],
  };
};

interface ScanningDotProps {
  color: string;
  index: number;
}

const ScanningDot = ({ color, index }: ScanningDotProps) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(index * 160),
        Animated.timing(progress, {
          duration: 380,
          easing: Easing.inOut(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          duration: 380,
          easing: Easing.inOut(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.delay((SCANNING_DOT_COUNT - 1 - index) * 160),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [index, progress]);

  return (
    <Animated.View
      style={[
        styles.scanningDot,
        {
          backgroundColor: color,
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.24, 1],
          }),
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.25],
              }),
            },
          ],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
    gap: 14,
    maxWidth: 320,
    width: "100%",
  },
  list: {
    gap: 10,
  },
  itemRow: {
    alignItems: "center",
    borderRadius: 16,
    elevation: 4,
    flexDirection: "row",
    gap: 12,
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 11,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  itemIconSlot: {
    alignItems: "center",
    borderRadius: 9,
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    width: 40,
  },
  itemIconImage: {
    height: 40,
    width: 40,
  },
  itemIconFallback: {
    borderRadius: 6,
    height: 12,
    opacity: 0.7,
    width: 12,
  },
  itemCopy: {
    flex: 1,
    gap: 1,
    minWidth: 0,
  },
  itemTitle: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 19,
  },
  itemDetail: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15,
  },
  note: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "center",
  },
  scanningRoot: {
    alignItems: "center",
    flex: 1,
    gap: 16,
    justifyContent: "center",
  },
  scanningDots: {
    flexDirection: "row",
    gap: 8,
  },
  scanningDot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  scanningLabel: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
    maxWidth: 260,
    textAlign: "center",
  },
});
