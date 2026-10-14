import { type ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

import { ChevronDownIcon } from "./icons";

const EXPAND_DURATION = 260;

export const useExpandProgress = (isExpanded: boolean) => {
  const progress = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      duration: EXPAND_DURATION,
      easing: Easing.inOut(Easing.cubic),
      toValue: isExpanded ? 1 : 0,
      // Height cannot run on the native driver.
      useNativeDriver: false,
    }).start();
  }, [isExpanded, progress]);

  return progress;
};

interface CollapsibleViewProps {
  isExpanded: boolean;
  children: ReactNode;
}

/**
 * Animates its height between 0 and the measured content height (with a
 * fade), so folding works the same on iOS, Android and web. LayoutAnimation
 * is a no-op on web.
 */
export const CollapsibleView = ({
  isExpanded,
  children,
}: CollapsibleViewProps) => {
  const progress = useExpandProgress(isExpanded);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  // Until measured, an open view takes its natural height and a closed one
  // measures off-layout, so neither jumps on mount.
  const isMeasuring = contentHeight === null;
  const height = isMeasuring
    ? isExpanded
      ? undefined
      : 0
    : progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
      });

  return (
    <Animated.View
      accessibilityElementsHidden={!isExpanded}
      aria-hidden={!isExpanded}
      importantForAccessibility={isExpanded ? "auto" : "no-hide-descendants"}
      pointerEvents={isExpanded ? "auto" : "none"}
      style={[styles.clip, { height, opacity: progress }]}
    >
      <View
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
        style={isMeasuring && isExpanded ? undefined : styles.measured}
      >
        {children}
      </View>
    </Animated.View>
  );
};

interface AnimatedChevronProps {
  isExpanded: boolean;
  color: string;
}

export const AnimatedChevron = ({
  isExpanded,
  color,
}: AnimatedChevronProps) => {
  const progress = useExpandProgress(isExpanded);
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={[styles.chevron, { transform: [{ rotate }] }]}>
      <ChevronDownIcon color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  clip: {
    overflow: "hidden",
  },
  // Once measured, the content keeps its natural height while the clip
  // animates around it.
  measured: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  chevron: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 20,
  },
});
