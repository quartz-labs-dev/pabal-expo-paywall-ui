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

import { MockPhoneFrame } from "./PreOnboardingContent";
import type { PlaygroundOnboardingTheme } from "../onboarding-theme";

export interface NotificationMockContentProps {
  body: string;
  logo?: ReactNode;
  logoSource?: ImageSourcePropType;
  nowLabel: string;
  theme: Required<PlaygroundOnboardingTheme>;
  title: string;
}

const PHONE_WIDTH = 224;
const PHONE_HEIGHT = 455;
const PHONE_VISIBLE_HEIGHT = PHONE_HEIGHT * 0.6;
const NOTIFICATION_ENTRANCE_DELAY_MS = 260;

export const NotificationMockContent = ({
  body,
  logo,
  logoSource,
  nowLabel,
  theme,
  title,
}: NotificationMockContentProps) => {
  const notificationBackgroundColor = theme.primaryTextColor;
  const notificationTextColor = theme.backgroundColor;
  const notificationEntranceStyle = useNotificationEntrance({
    initialScaleX: 0.96,
    settledScaleX: 1,
  });

  return (
    <View style={styles.root}>
      <View style={styles.frameStage}>
        <View style={styles.phoneLayer}>
          <MockPhoneFrame
            height={PHONE_HEIGHT}
            theme={theme}
            video={<NotificationFrameContent theme={theme} />}
            width={PHONE_WIDTH}
          />
        </View>
        <View style={styles.notificationStack}>
          <Animated.View
            style={[styles.notificationCardWrap, notificationEntranceStyle]}
          >
            <NotificationCard
              backgroundColor={notificationBackgroundColor}
              body={body}
              logo={logo}
              logoSource={logoSource}
              nowLabel={nowLabel}
              textColor={notificationTextColor}
              theme={theme}
              title={title}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

interface NotificationEntranceOptions {
  initialScaleX: number;
  settledScaleX: number;
}

const useNotificationEntrance = (
  { initialScaleX, settledScaleX }: NotificationEntranceOptions,
) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(NOTIFICATION_ENTRANCE_DELAY_MS),
      Animated.timing(progress, {
        duration: 360,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [initialScaleX, progress, settledScaleX]);

  return {
    opacity: progress.interpolate({
      inputRange: [0, 0.34, 1],
      outputRange: [0, 0.92, 1],
    }),
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-34, 0],
        }),
      },
      {
        scaleX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [initialScaleX, settledScaleX],
        }),
      },
      {
        scaleY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.96, 1],
        }),
      },
    ],
  };
};

interface NotificationFrameContentProps {
  theme: Required<PlaygroundOnboardingTheme>;
}

const NotificationFrameContent = ({ theme }: NotificationFrameContentProps) => {
  return (
    <View style={styles.frameContent}>
      <View
        style={[
          styles.frameMediaBlock,
          { backgroundColor: "#FFFFFF" },
        ]}
      />
      <View
        style={[
          styles.frameBottomFade,
          { backgroundColor: "#FFFFFF" },
        ]}
      />
    </View>
  );
};

interface NotificationCardProps {
  backgroundColor: string;
  body: string;
  logo?: ReactNode;
  logoSource?: ImageSourcePropType;
  nowLabel: string;
  textColor: string;
  theme: Required<PlaygroundOnboardingTheme>;
  title: string;
}

const NotificationCard = ({
  backgroundColor,
  body,
  logo,
  logoSource,
  nowLabel,
  textColor,
  theme,
  title,
}: NotificationCardProps) => {
  return (
    <View
      style={[
        styles.notificationCard,
        {
          backgroundColor,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <View style={styles.notificationLogoSlot}>
        {logo ??
          (logoSource ? (
            <Image
              resizeMode="cover"
              source={logoSource}
              style={styles.notificationLogoImage}
            />
          ) : (
            <DefaultNotificationLogo theme={theme} />
          ))}
      </View>
      <View style={styles.notificationCopy}>
        <View style={styles.notificationTitleRow}>
          <Text
            numberOfLines={1}
            style={[styles.notificationTitle, { color: textColor }]}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.notificationNowLabel, { color: textColor }]}
          >
            {nowLabel}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={[styles.notificationBody, { color: textColor }]}
        >
          {body}
        </Text>
      </View>
    </View>
  );
};

interface DefaultNotificationLogoProps {
  theme: Required<PlaygroundOnboardingTheme>;
}

const DefaultNotificationLogo = ({ theme }: DefaultNotificationLogoProps) => {
  return (
    <View
      style={[
        styles.notificationDefaultLogo,
        { borderColor: theme.accentColor },
      ]}
    >
      <View
        style={[
          styles.notificationLogoStroke,
          styles.notificationLogoStrokeFirst,
          { backgroundColor: theme.accentColor },
        ]}
      />
      <View
        style={[
          styles.notificationLogoStroke,
          styles.notificationLogoStrokeSecond,
          { backgroundColor: theme.accentColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  frameStage: {
    alignItems: "center",
    height: PHONE_VISIBLE_HEIGHT,
    justifyContent: "flex-start",
    width: PHONE_WIDTH,
  },
  phoneLayer: {
    alignItems: "center",
    height: PHONE_VISIBLE_HEIGHT,
    overflow: "hidden",
    width: PHONE_WIDTH,
  },
  frameContent: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 44,
  },
  frameMediaBlock: {
    borderRadius: 3,
    height: "70%",
    width: "100%",
  },
  frameBottomFade: {
    bottom: 0,
    height: 68,
    left: 0,
    opacity: 0.76,
    position: "absolute",
    right: 0,
  },
  notificationStack: {
    left: -40,
    position: "absolute",
    right: -40,
    top: 100,
    zIndex: 2,
  },
  notificationCardWrap: {
    alignSelf: "center",
    width: "100%",
  },
  notificationCard: {
    alignItems: "flex-start",
    alignSelf: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 9,
    minHeight: 74,
    opacity: 0.94,
    paddingHorizontal: 11,
    paddingVertical: 13,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    width: "100%",
  },
  notificationLogoSlot: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  notificationDefaultLogo: {
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
    height: 25,
    justifyContent: "center",
    width: 25,
  },
  notificationLogoImage: {
    borderRadius: 7,
    height: 25,
    width: 25,
  },
  notificationLogoStroke: {
    borderRadius: 2,
    height: 2,
    position: "absolute",
    width: 15,
  },
  notificationLogoStrokeFirst: {
    transform: [{ rotate: "-42deg" }],
  },
  notificationLogoStrokeSecond: {
    transform: [{ rotate: "42deg" }],
  },
  notificationCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  notificationTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  notificationTitle: {
    flex: 1,
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
    minWidth: 0,
  },
  notificationNowLabel: {
    flexShrink: 0,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 13,
    opacity: 0.54,
  },
  notificationBody: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 14,
  },
});
