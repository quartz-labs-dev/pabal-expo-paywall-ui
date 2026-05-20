import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  type StyleProp,
  Text,
  useWindowDimensions,
  View,
  type ViewStyle,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getDefaultOnboardingCopy } from "pabal-expo-paywall-ui";

import { OnboardingFrame } from "../components/OnboardingFrame";
import type { OnboardingFrameTheme } from "../components/OnboardingFrame";
import type { PlaygroundLocale } from "../types/playground";

interface PreOnboardingPlaygroundScreenProps {
  isLoginPromptVisible?: boolean;
  landingBackground?: ReactNode;
  landingVideo?: ReactNode;
  languageSelector?: ReactNode;
  logo?: ReactNode;
  logoPositionStyle?: StyleProp<ViewStyle>;
  logoSource?: ImageSourcePropType;
  mockImageSource?: ImageSourcePropType;
  mockVideo?: ReactNode;
  selectedLocale: PlaygroundLocale;
  theme?: PreOnboardingTheme;
  onContinue: () => void;
  onLoginPress?: () => void;
}

export interface PreOnboardingTheme {
  accentColor?: string;
  backgroundColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  cardBackgroundColor?: string;
  frameBackgroundColor?: string;
  frameBorderColor?: string;
  landingOverlayColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  shadowColor?: string;
}

const DEFAULT_PRE_ONBOARDING_THEME = {
  accentColor: "#E22121",
  backgroundColor: "#FAFAFA",
  buttonBackgroundColor: "#E22121",
  buttonTextColor: "#FFFFFF",
  cardBackgroundColor: "#FFFFFF",
  frameBackgroundColor: "#F4F4F4",
  frameBorderColor: "#151515",
  landingOverlayColor: "rgba(0, 0, 0, 0.48)",
  primaryTextColor: "#050505",
  secondaryTextColor: "#666A70",
  shadowColor: "#000000",
} satisfies Required<PreOnboardingTheme>;

const useEntranceAnimation = (delay: number, resetKey?: unknown) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, progress, resetKey]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [22, 0],
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

const useRightSlideEntranceAnimation = (delay: number, offset: number) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration: 780,
      easing: Easing.out(Easing.exp),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, offset, progress]);

  return {
    opacity: progress,
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
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

export const PreOnboardingPlaygroundScreen = ({
  isLoginPromptVisible = true,
  landingBackground,
  landingVideo,
  languageSelector,
  logo,
  logoPositionStyle,
  logoSource,
  mockImageSource,
  mockVideo,
  selectedLocale,
  theme: themeOverride,
  onContinue,
  onLoginPress,
}: PreOnboardingPlaygroundScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const copy = getDefaultOnboardingCopy(selectedLocale);
  const theme = { ...DEFAULT_PRE_ONBOARDING_THEME, ...themeOverride };
  const { height, width } = useWindowDimensions();
  const isLandingStep = currentStepIndex === 0;
  const isCompactHeight = height < 760;
  const isTinyHeight = height < 690;
  const mockPhoneHeight = Math.min(
    height * (isTinyHeight ? 0.38 : isCompactHeight ? 0.43 : 0.5),
    width * 1.04,
    430,
  );
  const mockPhoneWidth = mockPhoneHeight * 0.492;
  const mockContentGap = isTinyHeight ? 26 : isCompactHeight ? 34 : 44;
  const mockTitleFontSize = isTinyHeight ? 22 : isCompactHeight ? 25 : 29;
  const mockTitleLineHeight = isTinyHeight ? 27 : isCompactHeight ? 31 : 35;
  const frameTheme: OnboardingFrameTheme = {
    backgroundColor: isLandingStep ? theme.primaryTextColor : theme.backgroundColor,
    continueButtonBackgroundColor: theme.buttonBackgroundColor,
    continueButtonTextColor: theme.buttonTextColor,
    footerBackgroundColor: isLandingStep ? "transparent" : theme.backgroundColor,
  };

  const goNext = () => {
    if (isLandingStep) {
      setCurrentStepIndex(1);
      return;
    }

    onContinue();
  };

  return (
    <>
      <StatusBar style={isLandingStep ? "light" : "dark"} />
      <OnboardingFrame
        background={
          isLandingStep ? (
            <LandingBackgroundSlot overlayColor={theme.landingOverlayColor}>
              {landingVideo ?? landingBackground}
            </LandingBackgroundSlot>
          ) : undefined
        }
        continueButtonStyle={styles.primaryButton}
        continueLabel={isLandingStep ? copy.continueButton : copy.startButton}
        contentContainerStyle={
          isLandingStep
            ? styles.landingContentContainer
            : styles.mockContentContainer
        }
        currentStepIndex={currentStepIndex}
        footerAccessory={
          !isLandingStep && isLoginPromptVisible ? (
            <LoginPrompt
              loginLabel={copy.loginLabel}
              prompt={copy.loginPrompt}
              theme={theme}
              onPress={onLoginPress}
            />
          ) : undefined
        }
        footerStyle={isLandingStep ? styles.landingFooter : styles.mockFooter}
        isBodyScrollEnabled={false}
        showHeader={false}
        theme={frameTheme}
        totalSteps={2}
        onContinue={goNext}
      >
        {isLandingStep ? (
          <LandingContent
            languageSelector={languageSelector}
            logo={logo}
            logoPositionStyle={logoPositionStyle}
            logoSource={logoSource}
            theme={theme}
            title={copy.landingTitle}
          />
        ) : (
          <MockVideoContent
            mockPhoneWidth={mockPhoneWidth}
            mockContentGap={mockContentGap}
            mockImageSource={mockImageSource}
            mockTitleFontSize={mockTitleFontSize}
            mockTitleLineHeight={mockTitleLineHeight}
            theme={theme}
            title={copy.mockTitle}
            mockVideo={mockVideo}
          />
        )}
      </OnboardingFrame>
    </>
  );
};

interface LandingBackgroundSlotProps {
  children?: ReactNode;
  overlayColor: string;
}

const LandingBackgroundSlot = ({
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

interface LandingContentProps {
  languageSelector?: ReactNode;
  logo?: ReactNode;
  logoPositionStyle?: StyleProp<ViewStyle>;
  logoSource?: ImageSourcePropType;
  theme: Required<PreOnboardingTheme>;
  title: string;
}

const LandingContent = ({
  languageSelector,
  logo,
  logoPositionStyle,
  logoSource,
  theme,
  title,
}: LandingContentProps) => {
  const logoAnimatedStyle = useEntranceAnimation(120);
  const titleAnimatedStyle = useEntranceAnimation(300);
  const selectorAnimatedStyle = useEntranceAnimation(560);

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

interface MockVideoContentProps {
  mockContentGap: number;
  mockPhoneWidth: number;
  mockImageSource?: ImageSourcePropType;
  mockTitleFontSize: number;
  mockTitleLineHeight: number;
  mockVideo?: ReactNode;
  theme: Required<PreOnboardingTheme>;
  title: string;
}

const MockVideoContent = ({
  mockContentGap,
  mockImageSource,
  mockPhoneWidth,
  mockTitleFontSize,
  mockTitleLineHeight,
  mockVideo,
  theme,
  title,
}: MockVideoContentProps) => {
  const phoneAnimatedStyle = useRightSlideEntranceAnimation(
    480,
    mockPhoneWidth + 90,
  );

  return (
    <View style={[styles.mockContent, { gap: mockContentGap }]}>
      <Animated.View
        style={[
          styles.mockPhoneShadow,
          { shadowColor: theme.frameBorderColor, width: mockPhoneWidth },
          phoneAnimatedStyle,
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
            {mockVideo ??
              (mockImageSource ? (
                <Image
                  resizeMode="cover"
                  source={mockImageSource}
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

      <View style={styles.mockCopy}>
        <Text
          style={[
            styles.mockTitle,
            {
              color: theme.primaryTextColor,
              fontSize: mockTitleFontSize,
              lineHeight: mockTitleLineHeight,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

interface DefaultLogoProps {
  source?: ImageSourcePropType;
  theme: Required<PreOnboardingTheme>;
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
      <View style={[styles.logoBarPrimary, { backgroundColor: theme.accentColor }]} />
      <View style={[styles.logoBarPrimary, { backgroundColor: theme.accentColor }]} />
      <View style={[styles.logoBarPrimary, { backgroundColor: theme.accentColor }]} />
      <View style={[styles.logoBarAccent, { backgroundColor: theme.buttonBackgroundColor }]} />
      <View style={[styles.logoBarDark, { backgroundColor: theme.primaryTextColor }]} />
    </View>
  );
};

interface LoginPromptProps {
  loginLabel: string;
  prompt: string;
  theme: Required<PreOnboardingTheme>;
  onPress?: () => void;
}

const LoginPrompt = ({
  loginLabel,
  prompt,
  theme,
  onPress,
}: LoginPromptProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    Alert.alert("Login prompt", "Consuming apps can inject login behavior.");
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
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

const styles = StyleSheet.create({
  landingContentContainer: {
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  mockContentContainer: {
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  landingFooter: {
    backgroundColor: "transparent",
    paddingHorizontal: 24,
  },
  mockFooter: {
    gap: 10,
    paddingHorizontal: 18,
  },
  primaryButton: {
    borderRadius: 999,
    minHeight: 58,
  },
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
    justifyContent: "space-between",
    width: "100%",
  },
  mockPhoneShadow: {
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
  mockCopy: {
    width: "100%",
  },
  mockTitle: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 41,
    textAlign: "center",
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
