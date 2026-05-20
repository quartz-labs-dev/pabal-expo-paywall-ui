import { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface OnboardingCompletionTheme {
  accentColor: string;
  accentTextColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}

export interface OnboardingCompletionProps {
  title: string;
  description?: string;
  eyebrow?: string;
  theme: OnboardingCompletionTheme;
}

const PARTICLE_COUNT = 14;
const PARTICLE_OFFSETS = [
  { rotate: "-82deg", x: -4, y: -88 },
  { rotate: "-55deg", x: 48, y: -74 },
  { rotate: "-30deg", x: 80, y: -42 },
  { rotate: "-8deg", x: 92, y: 0 },
  { rotate: "18deg", x: 76, y: 42 },
  { rotate: "44deg", x: 48, y: 76 },
  { rotate: "72deg", x: 8, y: 92 },
  { rotate: "100deg", x: -38, y: 82 },
  { rotate: "132deg", x: -72, y: 52 },
  { rotate: "164deg", x: -92, y: 10 },
  { rotate: "198deg", x: -84, y: -34 },
  { rotate: "226deg", x: -58, y: -68 },
  { rotate: "252deg", x: -20, y: -92 },
  { rotate: "292deg", x: 26, y: -88 },
] satisfies Array<{ rotate: string; x: number; y: number }>;

export const OnboardingCompletion = ({
  title,
  description,
  eyebrow,
  theme,
}: OnboardingCompletionProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const ringAnimation = useRef(new Animated.Value(0)).current;
  const burstParticles = useMemo(
    () => PARTICLE_OFFSETS.slice(0, PARTICLE_COUNT),
    [],
  );

  useEffect(() => {
    animation.setValue(0);
    ringAnimation.setValue(0);
    const entry = Animated.timing(animation, {
      duration: 780,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });
    const ringPulse = Animated.loop(
      Animated.timing(ringAnimation, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    entry.start();
    ringPulse.start();
    return () => {
      entry.stop();
      ringPulse.stop();
    };
  }, [animation, ringAnimation]);

  const badgeScale = animation.interpolate({
    inputRange: [0, 0.5, 0.72, 1],
    outputRange: [0.82, 1.06, 0.98, 1],
  });
  const contentTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });
  const contentOpacity = animation.interpolate({
    inputRange: [0, 0.34, 1],
    outputRange: [0.01, 0.01, 1],
  });
  const firstRingScale = ringAnimation.interpolate({
    inputRange: [0, 0.62, 1],
    outputRange: [0.72, 1.34, 1.46],
  });
  const secondRingScale = ringAnimation.interpolate({
    inputRange: [0, 0.34, 1],
    outputRange: [0.7, 0.7, 1.74],
  });
  const ringOpacity = ringAnimation.interpolate({
    inputRange: [0, 0.18, 0.72, 1],
    outputRange: [0, 0.2, 0.12, 0],
  });
  const particleOpacity = animation.interpolate({
    inputRange: [0, 0.2, 0.52, 0.92, 1],
    outputRange: [0, 0, 1, 0, 0],
  });
  const particleScale = animation.interpolate({
    inputRange: [0, 0.2, 0.92, 1],
    outputRange: [0.4, 0.4, 1, 1],
  });

  return (
    <View accessibilityRole="summary" style={styles.root}>
      <View style={styles.burstStage} pointerEvents="none">
        <Animated.View
          style={[
            styles.ring,
            {
              borderColor: theme.accentColor,
              opacity: ringOpacity,
              transform: [{ scale: secondRingScale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.ring,
            styles.ringStrong,
            {
              borderColor: theme.accentColor,
              opacity: ringOpacity,
              transform: [{ scale: firstRingScale }],
            },
          ]}
        />
        {burstParticles.map((particle, index) => (
          <Animated.View
            key={`particle-${index}`}
            style={[
              styles.particle,
              {
                backgroundColor:
                  index % 3 === 0
                    ? theme.primaryTextColor
                    : theme.accentColor,
                opacity: particleOpacity,
                transform: [
                  { translateX: particle.x },
                  { translateY: particle.y },
                  { rotate: particle.rotate },
                  { scale: particleScale },
                ],
              },
            ]}
          />
        ))}
        <Animated.View
          style={[
            styles.badge,
            {
              backgroundColor: theme.accentColor,
              shadowColor: theme.accentColor,
              transform: [{ scale: badgeScale }],
            },
          ]}
        >
          <CompletionCheck color={theme.accentTextColor} />
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.copy,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslateY }],
          },
        ]}
      >
        {eyebrow ? (
          <Text
            style={[
              styles.eyebrow,
              { color: theme.accentColor },
            ]}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Text
          style={[
            styles.title,
            { color: theme.primaryTextColor },
          ]}
        >
          {title}
        </Text>
        {description ? (
          <Text
            style={[
              styles.description,
              { color: theme.secondaryTextColor },
            ]}
          >
            {description}
          </Text>
        ) : null}
      </Animated.View>

    </View>
  );
};

interface CompletionCheckProps {
  color: string;
}

const CompletionCheck = ({ color }: CompletionCheckProps) => (
  <View style={styles.check}>
    <View
      style={[
        styles.checkLine,
        styles.checkLineShort,
        { backgroundColor: color },
      ]}
    />
    <View
      style={[
        styles.checkLine,
        styles.checkLineLong,
        { backgroundColor: color },
      ]}
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    alignSelf: "stretch",
    gap: 28,
    justifyContent: "center",
    paddingVertical: 18,
  },
  burstStage: {
    alignItems: "center",
    height: 188,
    justifyContent: "center",
    width: 188,
  },
  ring: {
    borderRadius: 999,
    borderWidth: 2,
    height: 92,
    position: "absolute",
    width: 92,
  },
  ringStrong: {
    borderWidth: 1,
  },
  particle: {
    borderRadius: 999,
    height: 18,
    position: "absolute",
    width: 4,
  },
  badge: {
    alignItems: "center",
    borderRadius: 999,
    height: 92,
    justifyContent: "center",
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 28,
    width: 92,
  },
  check: {
    height: 38,
    position: "relative",
    width: 46,
  },
  checkLine: {
    borderRadius: 999,
    height: 6,
    position: "absolute",
  },
  checkLineShort: {
    left: 3,
    top: 22,
    transform: [{ rotate: "45deg" }],
    width: 18,
  },
  checkLineLong: {
    right: 2,
    top: 17,
    transform: [{ rotate: "-45deg" }],
    width: 34,
  },
  copy: {
    alignItems: "center",
    gap: 10,
    maxWidth: 340,
    width: "100%",
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: "center",
    textTransform: "uppercase",
  },
  title: {
    flexShrink: 1,
    fontSize: 31,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 38,
    textAlign: "center",
  },
  description: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 23,
    textAlign: "center",
  },
});
