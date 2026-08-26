import { type ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  resolveHealthSyncMockPalette,
  type OnboardingHealthSyncMockPlatform,
} from "./health-sync-mock-palette";
import type { OnboardingContentTheme } from "./types";

export interface OnboardingHealthSyncMockProps {
  // Icon shown on the app-side result card; falls back to a themed
  // check badge when neither icon prop is provided.
  appIcon?: ReactNode;
  appIconSource?: ImageSourcePropType;
  // Localized platform health surface name ("Apple Health",
  // "Health Connect"). The app owns this copy.
  healthAppName: string;
  // Overrides the bundled platform store icon.
  healthIcon?: ReactNode;
  platform: OnboardingHealthSyncMockPlatform;
  // Result card copy, e.g. "Added to your record".
  resultDescription: string;
  // Result card title, e.g. "Table tennis · 60 min".
  resultTitle: string;
  theme: OnboardingContentTheme;
  // Health card session line, e.g. "6:30 PM · 60 min · 320kcal".
  workoutDetail: string;
  // Health card session title, e.g. "Table tennis".
  workoutTitle: string;
}

const SOURCE_CARD_ENTRANCE_DELAY_MS = 120;
const CONNECTOR_START_DELAY_MS = 520;
const RESULT_CARD_ENTRANCE_DELAY_MS = 1040;
const CONNECTOR_DOT_COUNT = 3;
const CONNECTOR_DOT_STAGGER_MS = 190;
const CONNECTOR_LOOP_PAUSE_MS = 620;

export const OnboardingHealthSyncMock = ({
  appIcon,
  appIconSource,
  healthAppName,
  healthIcon,
  platform,
  resultDescription,
  resultTitle,
  theme,
  workoutDetail,
  workoutTitle,
}: OnboardingHealthSyncMockProps) => {
  const palette = resolveHealthSyncMockPalette(platform);
  const sourceEntranceStyle = useCardEntrance({
    delayMs: SOURCE_CARD_ENTRANCE_DELAY_MS,
    translateY: -18,
  });
  const resultEntranceStyle = useCardEntrance({
    delayMs: RESULT_CARD_ENTRANCE_DELAY_MS,
    translateY: 18,
  });

  return (
    <View pointerEvents="none" style={styles.root}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme.backgroundColor,
            shadowColor: theme.shadowColor,
          },
          sourceEntranceStyle,
        ]}
      >
        <View
          style={[
            styles.iconSlot,
            {
              backgroundColor: palette.badgeBackgroundColor,
              borderRadius: palette.badgeBorderRadius,
            },
          ]}
        >
          {healthIcon ?? (
            <Image
              resizeMode="contain"
              source={
                platform === "health-connect"
                  ? require("../assets/health/health-connect.png")
                  : require("../assets/health/apple-health.png")
              }
              style={styles.healthIconImage}
            />
          )}
        </View>
        <View style={styles.cardCopy}>
          <Text
            numberOfLines={1}
            style={[
              styles.cardCaption,
              { color: theme.secondaryTextColor },
            ]}
          >
            {healthAppName}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.cardTitle,
              { color: theme.primaryTextColor },
            ]}
          >
            {workoutTitle}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.cardBody,
              { color: theme.secondaryTextColor },
            ]}
          >
            {workoutDetail}
          </Text>
        </View>
      </Animated.View>

      <FlowConnector color={theme.accentColor} />

      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme.backgroundColor,
            shadowColor: theme.shadowColor,
          },
          resultEntranceStyle,
        ]}
      >
        <View
          style={[
            styles.iconSlot,
            styles.resultIconSlot,
            { backgroundColor: theme.cardBackgroundColor },
          ]}
        >
          {appIcon ??
            (appIconSource ? (
              <Image
                resizeMode="cover"
                source={appIconSource}
                style={styles.appIconImage}
              />
            ) : (
              <CheckMark color={theme.accentColor} />
            ))}
        </View>
        <View style={styles.cardCopy}>
          <Text
            numberOfLines={1}
            style={[
              styles.cardTitle,
              { color: theme.primaryTextColor },
            ]}
          >
            {resultTitle}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              styles.cardBody,
              { color: theme.secondaryTextColor },
            ]}
          >
            {resultDescription}
          </Text>
        </View>
        <View
          style={[
            styles.resultCheckBadge,
            { backgroundColor: theme.accentColor },
          ]}
        >
          <CheckMark color={theme.backgroundColor} small />
        </View>
      </Animated.View>
    </View>
  );
};

interface CardEntranceOptions {
  delayMs: number;
  translateY: number;
}

const useCardEntrance = ({
  delayMs,
  translateY,
}: CardEntranceOptions) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(delayMs),
      Animated.timing(progress, {
        duration: 420,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [delayMs, progress, translateY]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [translateY, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };
};

interface FlowConnectorProps {
  color: string;
}

// Three dots pulse downward in a stagger to read as data flowing from
// the health card into the app card.
const FlowConnector = ({ color }: FlowConnectorProps) => {
  return (
    <View style={styles.connector}>
      {Array.from({ length: CONNECTOR_DOT_COUNT }, (_, index) => (
        <ConnectorDot color={color} index={index} key={index} />
      ))}
    </View>
  );
};

interface ConnectorDotProps {
  color: string;
  index: number;
}

const ConnectorDot = ({ color, index }: ConnectorDotProps) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(
          CONNECTOR_START_DELAY_MS + index * CONNECTOR_DOT_STAGGER_MS,
        ),
        Animated.timing(progress, {
          duration: 460,
          easing: Easing.inOut(Easing.quad),
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          duration: 300,
          easing: Easing.in(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.delay(
          CONNECTOR_LOOP_PAUSE_MS +
            (CONNECTOR_DOT_COUNT - 1 - index) *
              CONNECTOR_DOT_STAGGER_MS,
        ),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [index, progress]);

  return (
    <Animated.View
      style={[
        styles.connectorDot,
        {
          backgroundColor: color,
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.18, 0.9],
          }),
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 3],
              }),
            },
          ],
        },
      ]}
    />
  );
};

interface CheckMarkProps {
  color: string;
  small?: boolean;
}

const CheckMark = ({ color, small = false }: CheckMarkProps) => {
  return (
    <View style={small ? styles.checkSmall : styles.check}>
      <View
        style={[
          small ? styles.checkShortSmall : styles.checkShort,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          small ? styles.checkLongSmall : styles.checkLong,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "stretch",
    alignSelf: "center",
    gap: 6,
    justifyContent: "center",
    maxWidth: 300,
    width: "100%",
  },
  card: {
    alignItems: "center",
    borderRadius: 16,
    elevation: 6,
    flexDirection: "row",
    gap: 12,
    minHeight: 74,
    paddingHorizontal: 14,
    paddingVertical: 13,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  iconSlot: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    width: 40,
  },
  resultIconSlot: {
    borderRadius: 9,
  },
  appIconImage: {
    height: 40,
    width: 40,
  },
  cardCopy: {
    flex: 1,
    gap: 1,
    minWidth: 0,
  },
  cardCaption: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.2,
    lineHeight: 13,
    textTransform: "uppercase",
  },
  cardTitle: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  cardBody: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 14,
  },
  connector: {
    alignItems: "center",
    alignSelf: "center",
    gap: 4,
    paddingVertical: 5,
  },
  connectorDot: {
    borderRadius: 2.5,
    height: 5,
    width: 5,
  },
  resultCheckBadge: {
    alignItems: "center",
    borderRadius: 11,
    height: 22,
    justifyContent: "center",
    width: 22,
  },
  healthIconImage: {
    height: 40,
    width: 40,
  },
  check: {
    height: 22,
    width: 22,
  },
  checkShort: {
    borderRadius: 1.5,
    bottom: 5,
    height: 3,
    left: 2,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    width: 9,
  },
  checkLong: {
    borderRadius: 1.5,
    bottom: 7.5,
    height: 3,
    position: "absolute",
    right: 1,
    transform: [{ rotate: "-50deg" }],
    width: 15,
  },
  checkSmall: {
    height: 12,
    width: 12,
  },
  checkShortSmall: {
    borderRadius: 1,
    bottom: 2.5,
    height: 2,
    left: 1,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    width: 5,
  },
  checkLongSmall: {
    borderRadius: 1,
    bottom: 4,
    height: 2,
    position: "absolute",
    right: 0.5,
    transform: [{ rotate: "-50deg" }],
    width: 8.5,
  },
});
