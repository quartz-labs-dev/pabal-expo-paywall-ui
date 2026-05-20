import { type ReactNode, useEffect, useRef, useState } from "react";
import {
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
import {
  createOnboardingFrameTheme,
  resolvePlaygroundOnboardingTheme,
} from "../components/onboarding-theme";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";
import type { PlaygroundLocale } from "../types/playground";

interface PreOnboardingPlaygroundScreenProps {
  isLoginPromptVisible?: boolean;
  loginActionContent?: ReactNode;
  landingBackground?: ReactNode;
  landingVideo?: ReactNode;
  languageSelector?: ReactNode;
  logo?: ReactNode;
  logoPositionStyle?: StyleProp<ViewStyle>;
  logoSource?: ImageSourcePropType;
  mockImageSource?: ImageSourcePropType;
  mockVideo?: ReactNode;
  primaryActionContent?: ReactNode;
  selectedLocale: PlaygroundLocale;
  theme?: PreOnboardingTheme;
  onContinue: () => void;
  onLoginPress?: () => void;
}

export type PreOnboardingTheme = PlaygroundOnboardingTheme;

const MOCK_PHONE_ASPECT_RATIO = 0.492;
const MOCK_PHONE_MAX_HEIGHT = 430;
const MOCK_PHONE_MAX_WIDTH = 224;
const MOCK_PHONE_HORIZONTAL_MARGIN = 72;
const ACTION_PANEL_ANIMATION_DURATION_MS = 520;
const ACTION_PANEL_UNMOUNT_DELAY_MS = ACTION_PANEL_ANIMATION_DURATION_MS + 80;
const MOCK_FOOTER_RESERVED_HEIGHT = 202;
const MOCK_FOOTER_RESERVED_COMPACT_HEIGHT = 184;

type PreOnboardingAction = "login" | "primary";

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
    opacity: progress,
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

const useActionPanelAnimation = (isVisible: boolean) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      duration: ACTION_PANEL_ANIMATION_DURATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: isVisible ? 1 : 0,
      useNativeDriver: false,
    });

    animation.start();
    return () => animation.stop();
  }, [isVisible, progress]);

  return progress;
};

export const PreOnboardingPlaygroundScreen = ({
  isLoginPromptVisible = true,
  loginActionContent,
  landingBackground,
  landingVideo,
  languageSelector,
  logo,
  logoPositionStyle,
  logoSource,
  mockImageSource,
  mockVideo,
  primaryActionContent,
  selectedLocale,
  theme: themeOverride,
  onContinue,
  onLoginPress,
}: PreOnboardingPlaygroundScreenProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeAction, setActiveAction] = useState<PreOnboardingAction | null>(
    null,
  );
  const [renderedAction, setRenderedAction] =
    useState<PreOnboardingAction | null>(null);
  const closeActionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const copy = getDefaultOnboardingCopy(selectedLocale);
  const theme = resolvePlaygroundOnboardingTheme(themeOverride);
  const { height, width } = useWindowDimensions();
  const isLandingStep = currentStepIndex === 0;
  const isCompactHeight = height < 760;
  const isTinyHeight = height < 690;
  const mockPhoneMaxHeight = Math.min(
    height * (isTinyHeight ? 0.38 : isCompactHeight ? 0.43 : 0.5),
    MOCK_PHONE_MAX_HEIGHT,
  );
  const mockPhoneMaxWidth = Math.min(
    Math.max(width - MOCK_PHONE_HORIZONTAL_MARGIN, 160),
    MOCK_PHONE_MAX_WIDTH,
  );
  const mockPhoneWidth = Math.min(
    mockPhoneMaxWidth,
    mockPhoneMaxHeight * MOCK_PHONE_ASPECT_RATIO,
  );
  const mockPhoneHeight = mockPhoneWidth / MOCK_PHONE_ASPECT_RATIO;
  const mockTitleFontSize = isTinyHeight ? 22 : isCompactHeight ? 25 : 29;
  const mockTitleLineHeight = isTinyHeight ? 27 : isCompactHeight ? 31 : 35;
  const mockFooterReservedHeight = isTinyHeight
    ? MOCK_FOOTER_RESERVED_COMPACT_HEIGHT
    : MOCK_FOOTER_RESERVED_HEIGHT;
  const isActionPanelVisible = activeAction !== null;
  const isActionPanelMounted = renderedAction !== null;
  const actionProgress = useActionPanelAnimation(isActionPanelVisible);
  const activeActionContent =
    renderedAction === "primary" ? primaryActionContent : loginActionContent;
  const loweredFooterContentStyle = isActionPanelMounted
    ? {
        opacity: actionProgress.interpolate({
          inputRange: [0, 0.82, 1],
          outputRange: [1, 0, 0],
        }),
        transform: [
          {
            translateY: actionProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 64],
            }),
          },
        ],
      }
    : undefined;
  const frameTheme = createOnboardingFrameTheme(theme, {
    backgroundColor: isLandingStep ? theme.primaryTextColor : theme.backgroundColor,
    footerBackgroundColor: isLandingStep ? "transparent" : theme.backgroundColor,
  });

  useEffect(() => {
    return () => {
      if (closeActionTimeoutRef.current) {
        clearTimeout(closeActionTimeoutRef.current);
      }
    };
  }, []);

  const openActionPanel = (action: PreOnboardingAction) => {
    if (closeActionTimeoutRef.current) {
      clearTimeout(closeActionTimeoutRef.current);
      closeActionTimeoutRef.current = null;
    }

    setRenderedAction(action);
    setActiveAction(action);
  };

  const closeActionPanel = () => {
    setActiveAction(null);
    closeActionTimeoutRef.current = setTimeout(() => {
      setRenderedAction(null);
      closeActionTimeoutRef.current = null;
    }, ACTION_PANEL_UNMOUNT_DELAY_MS);
  };

  const goNext = () => {
    if (isLandingStep) {
      setCurrentStepIndex(1);
      return;
    }

    if (isLoginPromptVisible) {
      openActionPanel("primary");
      return;
    }

    onContinue();
  };

  const openLoginAction = () => {
    openActionPanel("login");
    onLoginPress?.();
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
            : [
                styles.mockContentContainer,
                { paddingBottom: mockFooterReservedHeight },
              ]
        }
        currentStepIndex={currentStepIndex}
        footerContentPointerEvents={isActionPanelMounted ? "none" : "auto"}
        footerContentStyle={loweredFooterContentStyle as StyleProp<ViewStyle>}
        footerAccessory={
          !isLandingStep && isLoginPromptVisible ? (
            <LoginPrompt
              loginLabel={copy.loginLabel}
              prompt={copy.loginPrompt}
              theme={theme}
              onPress={openLoginAction}
            />
          ) : undefined
        }
        footerStyle={[
          isLandingStep ? styles.landingFooter : styles.mockFooter,
          !isLandingStep && styles.detachedFrameFooter,
        ]}
        footerTopAccessory={
          !isLandingStep ? (
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
              {copy.mockTitle}
            </Text>
          ) : undefined
        }
        isBodyScrollEnabled={false}
        isContentTransitionEnabled={false}
        isFooterTransitionEnabled={!isLandingStep}
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
            mockPhoneHeight={mockPhoneHeight}
            mockPhoneWidth={mockPhoneWidth}
            mockImageSource={mockImageSource}
            actionContent={activeActionContent}
            actionProgress={actionProgress}
            isActionPanelMounted={isActionPanelMounted}
            returnLabel={copy.returnButton}
            theme={theme}
            mockVideo={mockVideo}
            onComplete={onContinue}
            onReturn={closeActionPanel}
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
  actionContent?: ReactNode;
  actionProgress: Animated.Value;
  isActionPanelMounted: boolean;
  mockPhoneHeight: number;
  mockPhoneWidth: number;
  mockImageSource?: ImageSourcePropType;
  mockVideo?: ReactNode;
  returnLabel: string;
  theme: Required<PreOnboardingTheme>;
  onComplete: () => void;
  onReturn: () => void;
}

const MockVideoContent = ({
  actionContent,
  actionProgress,
  isActionPanelMounted,
  mockPhoneHeight,
  mockImageSource,
  mockPhoneWidth,
  mockVideo,
  returnLabel,
  theme,
  onComplete,
  onReturn,
}: MockVideoContentProps) => {
  const phoneAnimatedStyle = usePhoneFrameEntranceAnimation(
    160,
    0,
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

interface DefaultLoginActionButtonsProps {
  theme: Required<PreOnboardingTheme>;
  onComplete: () => void;
}

const defaultLoginActions = [
  "Continue with Apple",
  "Continue with Google",
  "Continue with Email",
];

const DefaultLoginActionButtons = ({
  theme,
  onComplete,
}: DefaultLoginActionButtonsProps) => {
  return (
    <View style={styles.defaultLoginActions}>
      {defaultLoginActions.map((label, index) => {
        const isPrimary = index === 0;

        return (
          <Pressable
            key={label}
            accessibilityRole="button"
            onPress={onComplete}
            style={[
              styles.defaultLoginActionButton,
              {
                backgroundColor: isPrimary
                  ? theme.buttonBackgroundColor
                  : theme.backgroundColor,
                borderColor: isPrimary
                  ? theme.buttonBackgroundColor
                  : theme.frameBackgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.defaultLoginActionButtonText,
                {
                  color: isPrimary
                    ? theme.buttonTextColor
                    : theme.primaryTextColor,
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

interface MockPhoneFrameProps {
  animatedStyle: StyleProp<ViewStyle>;
  height: number;
  imageSource?: ImageSourcePropType;
  theme: Required<PreOnboardingTheme>;
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
  detachedFrameFooter: {
    backgroundColor: "transparent",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
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
  mockPhoneStage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
  mockTitle: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 41,
    textAlign: "center",
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
  defaultLoginActions: {
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  defaultLoginActionButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 16,
  },
  defaultLoginActionButtonText: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
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
