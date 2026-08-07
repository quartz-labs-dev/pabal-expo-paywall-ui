import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from "react-native";

const columnGap = 8;
const tileGap = 8;
const tileHeight = 180;
const loopDistance = 8 * (tileHeight + tileGap);
const loopDurationMs = 18_000;
const tileColors = [
  "#375A7A",
  "#76624A",
  "#456B58",
  "#704D68",
  "#49657A",
  "#7A5A43",
  "#4F6D61",
  "#65577D",
] as const;

export function PlaygroundLandingBackground() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        duration: loopDurationMs,
        easing: Easing.linear,
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    animation.start();
    return () => animation.stop();
  }, [progress]);

  const upwardTransform = {
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -loopDistance],
        }),
      },
    ],
  };
  const downwardTransform = {
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-loopDistance, 0],
        }),
      },
    ],
  };

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.root}
    >
      <View style={styles.columns}>
        <BackgroundColumn
          animatedStyle={upwardTransform}
          colorOffset={0}
        />
        <BackgroundColumn
          animatedStyle={downwardTransform}
          colorOffset={3}
        />
      </View>
      <View style={styles.scrim} />
    </View>
  );
}

interface BackgroundColumnProps {
  animatedStyle: {
    transform: {
      translateY: Animated.AnimatedInterpolation<number>;
    }[];
  };
  colorOffset: number;
}

const BackgroundColumn = ({
  animatedStyle,
  colorOffset,
}: BackgroundColumnProps) => (
  <View style={styles.column}>
    <Animated.View style={[styles.track, animatedStyle]}>
      {Array.from({ length: 2 }).flatMap((_, cycleIndex) =>
        tileColors.map((color, tileIndex) => (
          <View
            key={`${cycleIndex}-${tileIndex}`}
            style={[
              styles.tile,
              {
                backgroundColor:
                  tileColors[
                    (tileIndex + colorOffset) %
                      tileColors.length
                  ] ?? color,
              },
            ]}
          >
            <View style={styles.tileSky} />
            <View style={styles.tileGround} />
            <View style={styles.tileSubject} />
          </View>
        )),
      )}
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
  column: {
    flex: 1,
    overflow: "hidden",
  },
  columns: {
    flex: 1,
    flexDirection: "row",
    gap: columnGap,
    paddingHorizontal: 8,
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0B1117",
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5, 8, 14, 0.66)",
  },
  tile: {
    borderRadius: 18,
    height: tileHeight,
    overflow: "hidden",
    position: "relative",
  },
  tileGround: {
    backgroundColor: "rgba(17, 24, 39, 0.28)",
    bottom: 0,
    height: "42%",
    left: 0,
    position: "absolute",
    right: 0,
  },
  tileSky: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    height: "52%",
  },
  tileSubject: {
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderRadius: 10,
    bottom: 26,
    height: 44,
    left: "50%",
    marginLeft: -22,
    position: "absolute",
    width: 44,
  },
  track: {
    gap: tileGap,
  },
});
