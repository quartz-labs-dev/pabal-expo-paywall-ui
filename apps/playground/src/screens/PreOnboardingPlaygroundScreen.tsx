import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  useOnboardingActionPanelAnimation,
  useOnboardingEntranceAnimation,
  PreOnboardingBackgroundSlot,
  PreOnboardingFrame,
  PreOnboardingLandingContent,
  PreOnboardingLoginPrompt,
  PreOnboardingMockContent,
} from "pabal-expo-paywall-ui";
import {
  type ImageSourcePropType,
  StyleSheet,
  type StyleProp,
  Text,
  useWindowDimensions,
  type ViewStyle,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { DefaultLoginActionButtons } from "../components/onboarding/DefaultLoginActionButtons";
import type { PlaygroundOnboardingContext } from "../components/onboarding-context";
import type { PlaygroundOnboardingTheme } from "../components/onboarding-theme";

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
  onboardingContext: PlaygroundOnboardingContext;
  primaryActionContent?: ReactNode;
  onContinue: () => void;
  onLoginPress?: () => void;
}

export type PreOnboardingTheme = PlaygroundOnboardingTheme;

const MOCK_PHONE_ASPECT_RATIO = 0.492;
const MOCK_PHONE_MAX_HEIGHT = 430;
const MOCK_PHONE_MAX_WIDTH = 224;
const MOCK_PHONE_HORIZONTAL_MARGIN = 72;
const ACTION_PANEL_UNMOUNT_DELAY_MS = 600;
const MOCK_FOOTER_RESERVED_HEIGHT = 202;
const MOCK_FOOTER_RESERVED_COMPACT_HEIGHT = 184;

type PreOnboardingAction = "login" | "primary";

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
  onboardingContext,
  primaryActionContent,
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
  const { copy, createFrameTheme, platform, theme } = onboardingContext;
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
  const actionProgress = useOnboardingActionPanelAnimation(isActionPanelVisible);
  const logoAnimatedStyle = useOnboardingEntranceAnimation(120);
  const titleAnimatedStyle = useOnboardingEntranceAnimation(300);
  const selectorAnimatedStyle = useOnboardingEntranceAnimation(560);
  const activeActionContent =
    renderedAction === "primary" ? primaryActionContent : loginActionContent;
  const actionContent =
    activeActionContent ?? (
      <DefaultLoginActionButtons
        platform={platform}
        theme={theme}
        onComplete={onContinue}
      />
    );
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
  const frameTheme = createFrameTheme({
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
      <PreOnboardingFrame
        background={
          isLandingStep ? (
            <PreOnboardingBackgroundSlot overlayColor={theme.landingOverlayColor}>
              {landingVideo ?? landingBackground}
            </PreOnboardingBackgroundSlot>
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
        footerContentPointerEvents={isActionPanelMounted ? "none" : "auto"}
        footerContentStyle={loweredFooterContentStyle as StyleProp<ViewStyle>}
        footerAccessory={
          !isLandingStep && isLoginPromptVisible ? (
            <PreOnboardingLoginPrompt
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
        theme={frameTheme}
        onContinue={goNext}
      >
        {isLandingStep ? (
          <PreOnboardingLandingContent
            languageSelector={languageSelector}
            logo={logo}
            logoAnimatedStyle={logoAnimatedStyle}
            logoPositionStyle={logoPositionStyle}
            logoSource={logoSource}
            selectorAnimatedStyle={selectorAnimatedStyle}
            theme={theme}
            title={copy.landingTitle}
            titleAnimatedStyle={titleAnimatedStyle}
          />
        ) : (
          <PreOnboardingMockContent
            actionContent={actionContent}
            actionProgress={actionProgress}
            entranceOffsetX={width}
            isActionPanelMounted={isActionPanelMounted}
            mockPhoneHeight={mockPhoneHeight}
            mockPhoneWidth={mockPhoneWidth}
            mockImageSource={mockImageSource}
            returnLabel={copy.returnButton}
            theme={theme}
            mockVideo={mockVideo}
            onReturn={closeActionPanel}
          />
        )}
      </PreOnboardingFrame>
    </>
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
    minHeight: 52,
  },
  mockTitle: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 41,
    textAlign: "center",
  },
});
