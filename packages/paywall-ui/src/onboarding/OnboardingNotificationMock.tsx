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

import { PreOnboardingMockPhoneFrame } from "./PreOnboardingContent";
import type { OnboardingContentTheme } from "./types";

export interface OnboardingNotificationMockProps {
  body?: string;
  dateLabel?: string;
  description?: string;
  iconBackgroundColor?: string;
  logo?: ReactNode;
  logoSource?: ImageSourcePropType;
  nowLabel: string;
  notifications?: readonly OnboardingNotificationItem[];
  theme: OnboardingContentTheme;
  timeLabel?: string;
  title?: string;
}

export interface OnboardingNotificationItem {
  description: string;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  iconSource?: ImageSourcePropType;
  title: string;
}

const PHONE_WIDTH = 224;
const PHONE_HEIGHT = 455;
const PHONE_VISIBLE_HEIGHT = PHONE_HEIGHT * 0.6;
const NOTIFICATION_ENTRANCE_DELAY_MS = 260;
const DEFAULT_LOCK_SCREEN_HOUR = 18;
const DEFAULT_LOCK_SCREEN_MINUTE = 30;

export const OnboardingNotificationMock = ({
  body,
  dateLabel,
  description,
  iconBackgroundColor,
  logo,
  logoSource,
  nowLabel,
  notifications,
  theme,
  timeLabel,
  title,
}: OnboardingNotificationMockProps) => {
  const notificationBackgroundColor = theme.backgroundColor;
  const notificationTextColor = theme.primaryTextColor;
  const fallbackNotification = resolveFallbackNotification({
    body,
    description,
    iconBackgroundColor,
    logo,
    logoSource,
    theme,
    title,
  });
  const visibleNotifications = (
    notifications && notifications.length > 0
      ? notifications
      : fallbackNotification
        ? [fallbackNotification]
        : []
  ).slice(0, 3);
  const defaultLockScreenDate = new Date();
  const lockScreenDateLabel =
    dateLabel ?? formatLockScreenDate(defaultLockScreenDate);
  const lockScreenTimeLabel =
    timeLabel ??
    formatLockScreenTime(createDefaultLockScreenTime(defaultLockScreenDate));

  return (
    <View style={styles.root}>
      <View style={styles.frameStage}>
        <View style={styles.phoneLayer}>
          <PreOnboardingMockPhoneFrame
            height={PHONE_HEIGHT}
            theme={theme}
            video={
              <NotificationFrameContent
                dateLabel={lockScreenDateLabel}
                timeLabel={lockScreenTimeLabel}
                theme={theme}
              />
            }
            width={PHONE_WIDTH}
          />
        </View>
        <View style={styles.notificationStack}>
          {visibleNotifications.map((notification, index) => (
            <NotificationCardLayer
              backgroundColor={notificationBackgroundColor}
              index={index}
              key={`${notification.title}-${index}`}
              notification={notification}
              nowLabel={nowLabel}
              textColor={notificationTextColor}
              theme={theme}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

interface NotificationEntranceOptions {
  delayMs: number;
  initialScaleX: number;
  settledOffsetY: number;
  settledOpacity: number;
  settledScaleX: number;
  settledScaleY: number;
}

const useNotificationEntrance = ({
  delayMs,
  initialScaleX,
  settledOffsetY,
  settledOpacity,
  settledScaleX,
  settledScaleY,
}: NotificationEntranceOptions) => {
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
  }, [
    delayMs,
    initialScaleX,
    progress,
    settledOffsetY,
    settledOpacity,
    settledScaleX,
    settledScaleY,
  ]);

  return {
    opacity: progress.interpolate({
      inputRange: [0, 0.34, 1],
      outputRange: [0, settledOpacity * 0.92, settledOpacity],
    }),
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-34, settledOffsetY],
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
          outputRange: [0.96, settledScaleY],
        }),
      },
    ],
  };
};

interface NotificationFrameContentProps {
  dateLabel: string;
  theme: OnboardingContentTheme;
  timeLabel: string;
}

const NotificationFrameContent = ({
  dateLabel,
  theme,
  timeLabel,
}: NotificationFrameContentProps) => {
  return (
    <View style={styles.frameContent}>
      <View style={styles.lockScreenClock}>
        <Text
          numberOfLines={1}
          style={[
            styles.lockScreenDate,
            { color: theme.secondaryTextColor },
          ]}
        >
          {dateLabel}
        </Text>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          numberOfLines={1}
          style={[
            styles.lockScreenTime,
            { color: theme.primaryTextColor },
          ]}
        >
          {timeLabel}
        </Text>
      </View>
      <View style={[styles.frameBottomFade, { backgroundColor: "#FFFFFF" }]} />
    </View>
  );
};

interface NotificationCardLayerProps {
  backgroundColor: string;
  index: number;
  notification: OnboardingNotificationItem;
  nowLabel: string;
  textColor: string;
  theme: OnboardingContentTheme;
}

const NotificationCardLayer = ({
  backgroundColor,
  index,
  notification,
  nowLabel,
  textColor,
  theme,
}: NotificationCardLayerProps) => {
  const layerOpacity = [0.98, 0.9, 0.76][index] ?? 0.76;
  const notificationEntranceStyle = useNotificationEntrance({
    delayMs: NOTIFICATION_ENTRANCE_DELAY_MS + index * 72,
    initialScaleX: 0.96 - index * 0.02,
    settledOffsetY: index * 64,
    settledOpacity: layerOpacity,
    settledScaleX: 1 - index * 0.045,
    settledScaleY: 1 - index * 0.035,
  });

  return (
    <Animated.View
      style={[
        styles.notificationCardWrap,
        { zIndex: 3 - index },
        notificationEntranceStyle,
      ]}
    >
      <View
        style={[
          styles.notificationCard,
          {
            backgroundColor,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View
          style={[
            styles.notificationIconSlot,
            {
              backgroundColor:
                notification.iconBackgroundColor ?? theme.cardBackgroundColor,
            },
          ]}
        >
          {notification.icon ??
            (notification.iconSource ? (
              <Image
                resizeMode="cover"
                source={notification.iconSource}
                style={styles.notificationIconImage}
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
              {notification.title}
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
            {notification.description}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

interface DefaultNotificationLogoProps {
  theme: OnboardingContentTheme;
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

interface ResolveFallbackNotificationParams {
  body?: string;
  description?: string;
  iconBackgroundColor?: string;
  logo?: ReactNode;
  logoSource?: ImageSourcePropType;
  theme: OnboardingContentTheme;
  title?: string;
}

const resolveFallbackNotification = ({
  body,
  description,
  iconBackgroundColor,
  logo,
  logoSource,
  theme,
  title,
}: ResolveFallbackNotificationParams): OnboardingNotificationItem | null => {
  if (!title) return null;

  return {
    description: description ?? body ?? "",
    icon: logo,
    iconBackgroundColor: iconBackgroundColor ?? theme.cardBackgroundColor,
    iconSource: logoSource,
    title,
  };
};

const formatLockScreenDate = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "numeric",
      month: "long",
      weekday: "long",
    }).format(date);
  } catch {
    return "";
  }
};

const createDefaultLockScreenTime = (date: Date): Date => {
  const lockScreenTime = new Date(date);
  lockScreenTime.setHours(
    DEFAULT_LOCK_SCREEN_HOUR,
    DEFAULT_LOCK_SCREEN_MINUTE,
    0,
    0,
  );
  return lockScreenTime;
};

const formatLockScreenTime = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
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
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 50,
  },
  lockScreenClock: {
    alignItems: "center",
    gap: 2,
    width: "100%",
  },
  lockScreenDate: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 15,
    maxWidth: "90%",
    textAlign: "center",
  },
  lockScreenTime: {
    fontSize: 46,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 52,
    maxWidth: "92%",
    textAlign: "center",
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
    top: 105,
    zIndex: 2,
  },
  notificationCardWrap: {
    alignSelf: "center",
    position: "absolute",
    width: "100%",
  },
  notificationCard: {
    alignItems: "flex-start",
    alignSelf: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    minHeight: 76,
    paddingHorizontal: 11,
    paddingVertical: 12,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    width: "100%",
  },
  notificationIconSlot: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    overflow: "hidden",
    width: 40,
  },
  notificationDefaultLogo: {
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 1,
    height: 27,
    justifyContent: "center",
    width: 27,
  },
  notificationIconImage: {
    height: 40,
    width: 40,
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
