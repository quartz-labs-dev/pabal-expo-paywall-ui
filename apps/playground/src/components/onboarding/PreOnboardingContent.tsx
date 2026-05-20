import { type ReactNode } from "react";
import {
  Animated,
  Easing,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { useEffect, useRef } from "react";

import type { PlaygroundOnboardingPlatform } from "../../utils/onboarding-platform";
import { DefaultLoginActionButtons } from "./DefaultLoginActionButtons";
import type { PlaygroundOnboardingTheme } from "../onboarding-theme";

export interface LandingBackgroundSlotProps {
  children?: ReactNode;
  overlayColor: string;
}

export const LandingBackgroundSlot = ({
  children,
  overlayColor,
}: LandingBackgroundSlotProps) => {
  return (
    <View style={styles.videoPlaceholder}>
      {children}
      <View style={[styles.landingOverlay, { backgroundColor: overlayColor }]} />
    </View>
  );
};

export interface LandingContentProps {
  languageSelector?: ReactNode;
  logo?: ReactNode;
  logoAnimatedStyle: StyleProp<ViewStyle>;
  logoPositionStyle?: StyleProp<ViewStyle>;
  logoSource?: ImageSourcePropType;
  selectorAnimatedStyle: StyleProp<ViewStyle>;
  theme: Required<PlaygroundOnboardingTheme>;
  title: string;
  titleAnimatedStyle: StyleProp<ViewStyle>;
}

export const LandingContent = ({
  languageSelector,
  logo,
  logoAnimatedStyle,
  logoPositionStyle,
  logoSource,
  selectorAnimatedStyle,
  theme,
  title,
  titleAnimatedStyle,
}: LandingContentProps) => {
  return (
    <View style={styles.landingContent}>
      <View style={styles.landingHero}>
        <Animated.View
          style={[styles.logoSlot, logoPositionStyle, logoAnimatedStyle]}
        >
          {logo ?? <DefaultLogo source={logoSource} theme={theme} />}
        </Animated.View>
        <Animated.Text
          style={[
            styles.landingTitle,
            { color: theme.buttonTextColor },
            titleAnimatedStyle,
          ]}
        >
          {title}
        </Animated.Text>
      </View>

      <Animated.View style={[styles.languageSelectorSlot, selectorAnimatedStyle]}>
        {languageSelector ?? <View style={styles.languageSelectorPlaceholder} />}
      </Animated.View>
    </View>
  );
};

export interface MockVideoContentProps {
  actionContent?: ReactNode;
  actionProgress: Animated.Value;
  entranceOffsetX: number;
  isActionPanelMounted: boolean;
  mockPhoneHeight: number;
  mockPhoneWidth: number;
  mockImageSource?: ImageSourcePropType;
  mockVideo?: ReactNode;
  platform: PlaygroundOnboardingPlatform;
  returnLabel: string;
  theme: Required<PlaygroundOnboardingTheme>;
  onComplete: () => void;
  onReturn: () => void;
}

export const MockVideoContent = ({
  actionContent,
  actionProgress,
  entranceOffsetX,
  isActionPanelMounted,
  mockPhoneHeight,
  mockImageSource,
  mockPhoneWidth,
  mockVideo,
  platform,
  returnLabel,
  theme,
  onComplete,
  onReturn,
}: MockVideoContentProps) => {
  const phoneAnimatedStyle = usePhoneFrameEntranceAnimation(
    300,
    entranceOffsetX,
    42,
  );
  const phoneExitAnimatedStyle = {
    opacity: actionProgress.interpolate({
      inputRange: [0, 0.34, 1],
      outputRange: [1, 0, 0],
    }),
    transform: [
      {
        translateY: actionProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -360],
        }),
      },
      {
        scale: actionProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.96],
        }),
      },
    ],
  };
  const panelAnimatedStyle = {
    opacity: actionProgress.interpolate({
      inputRange: [0, 0.24, 1],
      outputRange: [0, 1, 1],
    }),
    transform: [
      {
        translateX: actionProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [42, 0],
        }),
      },
    ],
  };

  if (!isActionPanelMounted) {
    return (
      <View style={styles.mockContent}>
        <View style={styles.mockPhoneStage}>
          <MockPhoneFrame
            animatedStyle={phoneAnimatedStyle}
            height={mockPhoneHeight}
            imageSource={mockImageSource}
            theme={theme}
            video={mockVideo}
            width={mockPhoneWidth}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mockContent}>
      <Animated.View
        pointerEvents="none"
        style={[styles.mockPhoneStage, phoneExitAnimatedStyle]}
      >
        <MockPhoneFrame
          animatedStyle={isActionPanelMounted ? undefined : phoneAnimatedStyle}
          height={mockPhoneHeight}
          imageSource={mockImageSource}
          theme={theme}
          video={mockVideo}
          width={mockPhoneWidth}
        />
      </Animated.View>

      <View pointerEvents="box-none" style={styles.actionPanelOverlay}>
        <Animated.View style={[styles.actionPanel, panelAnimatedStyle]}>
          <Pressable
            accessibilityRole="button"
            onPress={onReturn}
            style={styles.actionReturnButton}
          >
            <ChevronLeftInlineIcon color={theme.secondaryTextColor} />
            <Text
              style={[
                styles.actionReturnButtonText,
                { color: theme.secondaryTextColor },
              ]}
            >
              {returnLabel}
            </Text>
          </Pressable>
          <View
            style={[
              styles.actionContentSlot,
              { backgroundColor: theme.cardBackgroundColor },
            ]}
          >
            {actionContent ?? (
              <DefaultLoginActionButtons
                platform={platform}
                theme={theme}
                onComplete={onComplete}
              />
            )}
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export interface LoginPromptProps {
  loginLabel: string;
  prompt: string;
  theme: Required<PlaygroundOnboardingTheme>;
  onPress?: () => void;
}

export const LoginPrompt = ({
  loginLabel,
  prompt,
  theme,
  onPress,
}: LoginPromptProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.loginPrompt}
    >
      <Text style={[styles.loginPromptText, { color: theme.primaryTextColor }]}>
        {prompt}
      </Text>
      <Text style={[styles.loginPromptLink, { color: theme.primaryTextColor }]}>
        {loginLabel}
      </Text>
    </Pressable>
  );
};

interface ChevronLeftInlineIconProps {
  color: string;
}

const ChevronLeftInlineIcon = ({ color }: ChevronLeftInlineIconProps) => {
  return (
    <View style={styles.chevronInlineIcon}>
      <View
        style={[
          styles.chevronInlineLine,
          styles.chevronInlineLineFirst,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.chevronInlineLine,
          styles.chevronInlineLineSecond,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

interface MockPhoneFrameProps {
  animatedStyle?: StyleProp<ViewStyle>;
  height: number;
  imageSource?: ImageSourcePropType;
  theme: Required<PlaygroundOnboardingTheme>;
  video?: ReactNode;
  width: number;
}

const MockPhoneFrame = ({
  animatedStyle,
  height,
  imageSource,
  theme,
  video,
  width,
}: MockPhoneFrameProps) => {
  return (
    <Animated.View
      style={[
        styles.mockPhoneShadow,
        { height, shadowColor: theme.frameBorderColor, width },
        animatedStyle,
      ]}
    >
      <View
        style={[
          styles.mockPhoneFrame,
          {
            backgroundColor: theme.frameBorderColor,
            borderColor: theme.frameBorderColor,
          },
        ]}
      >
        <View
          style={[
            styles.mockPhoneScreen,
            { backgroundColor: theme.frameBackgroundColor },
          ]}
        >
          {video ??
            (imageSource ? (
              <Image
                resizeMode="cover"
                source={imageSource}
                style={styles.mockImage}
              />
            ) : (
              <View
                style={[
                  styles.mockMediaSlot,
                  { backgroundColor: theme.frameBackgroundColor },
                ]}
              />
            ))}
        </View>
        <View
          style={[
            styles.sideButtonLeftTop,
            { backgroundColor: theme.frameBorderColor },
          ]}
        />
        <View
          style={[
            styles.sideButtonLeftBottom,
            { backgroundColor: theme.frameBorderColor },
          ]}
        />
        <View
          style={[
            styles.sideButtonRight,
            { backgroundColor: theme.frameBorderColor },
          ]}
        />
      </View>
    </Animated.View>
  );
};

interface DefaultLogoProps {
  source?: ImageSourcePropType;
  theme: Required<PlaygroundOnboardingTheme>;
}

const DefaultLogo = ({ source, theme }: DefaultLogoProps) => {
  if (source) {
    return <Image resizeMode="contain" source={source} style={styles.logoImage} />;
  }

  return (
    <View
      style={[
        styles.logoMark,
        { backgroundColor: theme.cardBackgroundColor },
      ]}
    >
      <View
        style={[styles.logoBarPrimary, { backgroundColor: theme.accentColor }]}
      />
      <View
        style={[styles.logoBarPrimary, { backgroundColor: theme.accentColor }]}
      />
      <View
        style={[styles.logoBarPrimary, { backgroundColor: theme.accentColor }]}
      />
      <View
        style={[
          styles.logoBarAccent,
          { backgroundColor: theme.buttonBackgroundColor },
        ]}
      />
      <View
        style={[styles.logoBarDark, { backgroundColor: theme.primaryTextColor }]}
      />
    </View>
  );
};

const usePhoneFrameEntranceAnimation = (
  delay: number,
  offsetX: number,
  offsetY: number,
) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration: 980,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, offsetX, offsetY, progress]);

  return {
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [offsetX, 0],
        }),
      },
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [offsetY, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };
};

const styles = StyleSheet.create({
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  landingOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  landingContent: {
    alignItems: "center",
    gap: 28,
    width: "100%",
  },
  landingHero: {
    alignItems: "center",
    gap: 18,
    width: "100%",
  },
  logoSlot: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoImage: {
    borderRadius: 8,
    height: 62,
    width: 62,
  },
  logoMark: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
    height: 62,
    justifyContent: "center",
    width: 62,
  },
  logoBarPrimary: {
    height: 26,
    width: 5,
  },
  logoBarAccent: {
    height: 26,
    width: 5,
  },
  logoBarDark: {
    height: 26,
    width: 11,
  },
  landingTitle: {
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 37,
    textAlign: "center",
  },
  languageSelectorSlot: {
    maxWidth: 380,
    width: "100%",
  },
  languageSelectorPlaceholder: {
    minHeight: 72,
    width: "100%",
  },
  mockContent: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  mockPhoneStage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  actionPanelOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    width: "100%",
  },
  actionPanel: {
    gap: 10,
    paddingTop: 4,
    width: "100%",
  },
  mockPhoneShadow: {
    alignSelf: "center",
    aspectRatio: 0.492,
    maxWidth: 275,
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 26,
  },
  mockPhoneFrame: {
    borderRadius: 38,
    borderWidth: 5,
    flex: 1,
  },
  mockPhoneScreen: {
    borderRadius: 32,
    flex: 1,
    overflow: "hidden",
  },
  sideButtonLeftTop: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: 46,
    left: -9,
    position: "absolute",
    top: 95,
    width: 5,
  },
  sideButtonLeftBottom: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: 46,
    left: -9,
    position: "absolute",
    top: 150,
    width: 5,
  },
  sideButtonRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    height: 68,
    position: "absolute",
    right: -9,
    top: 124,
    width: 5,
  },
  mockImage: {
    height: "100%",
    width: "100%",
  },
  mockMediaSlot: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  actionReturnButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 34,
    paddingHorizontal: 4,
  },
  actionReturnButtonText: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  chevronInlineIcon: {
    height: 14,
    justifyContent: "center",
    width: 9,
  },
  chevronInlineLine: {
    borderRadius: 1,
    height: 2,
    position: "absolute",
    width: 8,
  },
  chevronInlineLineFirst: {
    top: 3.5,
    transform: [{ rotate: "-45deg" }],
  },
  chevronInlineLineSecond: {
    bottom: 3.5,
    transform: [{ rotate: "45deg" }],
  },
  actionContentSlot: {
    borderRadius: 8,
    minHeight: 220,
    overflow: "hidden",
    padding: 16,
    width: "100%",
  },
  loginPrompt: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: 32,
  },
  loginPromptText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  loginPromptLink: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
});
