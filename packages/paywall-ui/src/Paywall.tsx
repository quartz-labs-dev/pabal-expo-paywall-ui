import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getDefaultSelectedPlanId } from "./create-paywall-plans";
import { LegalLinks } from "./LegalLinks";
import { PlanSelector } from "./PlanSelector";
import { PurchaseButton } from "./PurchaseButton";
import { mergePaywallTheme } from "./theme";
import { TrialNotice } from "./TrialNotice";
import type {
  PaywallBenefit,
  PaywallFreeTrialConfig,
  PaywallPlan,
  PaywallProps,
  PaywallTheme,
  PaywallTrialDuration,
} from "./types";

type PaywallStep = "value" | "purchase";
type PaywallTransitionPhase = "idle" | "exiting" | "entering";
type PaywallTransitionDirection = "forward" | "backward";

const getSelectedPlan = <TPackage,>(
  plans: PaywallPlan<TPackage>[],
  selectedPlanId?: string
): PaywallPlan<TPackage> | undefined => {
  const fallbackPlanId = selectedPlanId ?? getDefaultSelectedPlanId(plans);
  return plans.find((plan) => plan.id === fallbackPlanId);
};

const getBenefitKey = (benefit: PaywallBenefit): string => {
  return typeof benefit === "string" ? benefit : benefit.title;
};

const getBenefitIcon = (benefit: PaywallBenefit) => {
  return typeof benefit === "string" ? undefined : benefit.icon;
};

const hasRenewingSubscriptionPlan = <TPackage,>(
  plans: PaywallPlan<TPackage>[],
): boolean => {
  return plans.some((plan) => plan.period !== "lifetime");
};

const DEFAULT_TRIAL_DURATION: PaywallTrialDuration = {
  value: 7,
  unit: "day",
};

const resolveFreeTrialConfig = (
  freeTrial: boolean | PaywallFreeTrialConfig | undefined,
  selectedPlan?: PaywallPlan,
): PaywallFreeTrialConfig | undefined => {
  if (freeTrial === false || selectedPlan?.period === "lifetime") {
    return undefined;
  }

  if (freeTrial === true || freeTrial === undefined) {
    return { duration: DEFAULT_TRIAL_DURATION };
  }

  return {
    ...freeTrial,
    duration: freeTrial.duration ?? DEFAULT_TRIAL_DURATION,
  };
};

const formatFallbackTrialDuration = (
  duration: PaywallTrialDuration,
): string => {
  const unit = duration.unit === "week" ? "week" : "day";
  const suffix = duration.value === 1 ? unit : `${unit}s`;
  return `${duration.value} ${suffix}`;
};

const getTrialDurationText = (
  copy: PaywallProps["copy"],
  duration: PaywallTrialDuration,
): string => {
  return copy.formatTrialDuration?.(duration) ?? formatFallbackTrialDuration(duration);
};

const getTrialPriceDisclosure = (
  copy: PaywallProps["copy"],
  duration: PaywallTrialDuration,
  pricePerPeriodText: string,
): string => {
  return (
    copy.formatTrialPriceDisclosure?.(duration, pricePerPeriodText) ??
    `${getTrialDurationText(copy, duration)} free, then ${pricePerPeriodText}`
  );
};

const getTrialIncludedTitle = (
  copy: PaywallProps["copy"],
  duration: PaywallTrialDuration,
): string => {
  return (
    copy.formatTrialIncludedTitle?.(duration) ??
    `${getTrialDurationText(copy, duration)} Free Trial Included`
  );
};

const FIXED_FOOTER_BUTTON_HEIGHT = 52;
const FIXED_FOOTER_TOP_PADDING = 12;
const FIXED_FOOTER_MIN_BOTTOM_PADDING = 12;
const FIXED_FOOTER_SCROLL_GAP = 24;
const DEFAULT_HERO_HEIGHT_RATIO = 0.2;
const STEP_TRANSITION_OUT_DURATION = 180;
const STEP_TRANSITION_IN_DURATION = 300;
const STEP_TRANSITION_DISTANCE = 28;
const INITIAL_TRANSITION_DURATION = 380;
const INITIAL_TRANSITION_DISTANCE = 22;
const NAV_ICON_BACKGROUND_COLOR = "rgba(0, 0, 0, 0.22)";

const getStepTransitionOffset = (
  phase: PaywallTransitionPhase,
  direction: PaywallTransitionDirection,
): number => {
  if (phase === "exiting") {
    return direction === "forward"
      ? -STEP_TRANSITION_DISTANCE
      : STEP_TRANSITION_DISTANCE;
  }

  return direction === "forward"
    ? STEP_TRANSITION_DISTANCE
    : -STEP_TRANSITION_DISTANCE;
};

export const Paywall = <TPackage,>({
  plans,
  hero,
  heroHeightRatio = DEFAULT_HERO_HEIGHT_RATIO,
  stepMode = "twoStep",
  animationMode = "default",
  valueStep,
  benefits = [],
  content,
  purchaseButtonBackground,
  copy,
  freeTrial = true,
  selectedPlanId,
  theme: themeOverride,
  isPurchasing = false,
  onSelectPlan,
  onPurchase,
  onRestore,
  onClose,
  onOpenTerms,
  onOpenPrivacy,
}: PaywallProps<TPackage>) => {
  const theme = mergePaywallTheme(themeOverride);
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const shouldUseValueStep = stepMode === "twoStep" && Boolean(valueStep);
  const shouldAnimate = animationMode !== "none";
  const initialTransition = useRef(
    new Animated.Value(shouldAnimate ? 0 : 1),
  ).current;
  const stepTransition = useRef(new Animated.Value(1)).current;
  const isStepTransitioningRef = useRef(false);
  const [currentStep, setCurrentStep] = useState<PaywallStep>(() =>
    shouldUseValueStep ? "value" : "purchase",
  );
  const [transitionPhase, setTransitionPhase] =
    useState<PaywallTransitionPhase>("idle");
  const [transitionDirection, setTransitionDirection] =
    useState<PaywallTransitionDirection>("forward");
  const selectedPlan = getSelectedPlan(plans, selectedPlanId);
  const resolvedSelectedPlanId = selectedPlan?.id;
  const freeTrialConfig = resolveFreeTrialConfig(freeTrial, selectedPlan);
  const trialDuration = freeTrialConfig?.duration;
  const trialPriceDisclosure =
    trialDuration && selectedPlan
      ? getTrialPriceDisclosure(
          copy,
          trialDuration,
          selectedPlan.pricePerPeriodText ?? selectedPlan.priceText,
        )
      : undefined;
  const trialNotice =
    trialDuration && copy.trialIncludedDescription
      ? {
          title: getTrialIncludedTitle(copy, trialDuration),
          description: copy.trialIncludedDescription,
        }
      : undefined;
  const purchaseButtonLabel = trialDuration
    ? copy.purchaseButton
    : copy.continueButton ?? "Continue";
  const heroHeight = Math.round(windowHeight * heroHeightRatio);
  const [measuredFooterHeight, setMeasuredFooterHeight] = useState(0);
  const footerBottomPadding = Math.max(
    insets.bottom,
    FIXED_FOOTER_MIN_BOTTOM_PADDING
  );
  const fallbackFooterHeight =
    FIXED_FOOTER_TOP_PADDING + FIXED_FOOTER_BUTTON_HEIGHT + footerBottomPadding;
  const fixedFooterHeight = Math.max(
    measuredFooterHeight,
    fallbackFooterHeight
  );
  const isValueStep = shouldUseValueStep && currentStep === "value";
  const title = isValueStep ? valueStep?.title : copy.title;
  const subtitle = isValueStep ? valueStep?.subtitle : copy.subtitle;
  const bodyBenefits = benefits;
  const bodyContent = isValueStep ? valueStep?.content : content;
  const shouldShowCloseButton =
    !isValueStep || valueStep?.closeButtonVisibility === "visible";
  const shouldShowBackButton = shouldUseValueStep && currentStep === "purchase";
  const shouldShowLegalPrefix = hasRenewingSubscriptionPlan(plans);
  const initialTranslateY = initialTransition.interpolate({
    inputRange: [0, 1],
    outputRange: [INITIAL_TRANSITION_DISTANCE, 0],
  });
  const stepTranslateX = stepTransition.interpolate({
    inputRange: [0, 1],
    outputRange: [
      getStepTransitionOffset(transitionPhase, transitionDirection),
      0,
    ],
  });
  const animatedStepStyle = {
    opacity: Animated.multiply(initialTransition, stepTransition),
    transform: [
      {
        translateY: initialTranslateY,
      },
      {
        translateX: stepTranslateX,
      },
    ],
  };

  useEffect(() => {
    if (!shouldAnimate) {
      initialTransition.setValue(1);
      return;
    }

    initialTransition.setValue(0);
    Animated.timing(initialTransition, {
      duration: INITIAL_TRANSITION_DURATION,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [initialTransition, shouldAnimate]);

  useEffect(() => {
    isStepTransitioningRef.current = false;
    setTransitionPhase("idle");
    setTransitionDirection("forward");
    stepTransition.setValue(1);
    setCurrentStep(shouldUseValueStep ? "value" : "purchase");
  }, [shouldUseValueStep, stepTransition]);

  const transitionToStep = (
    nextStep: PaywallStep,
    direction: PaywallTransitionDirection,
  ) => {
    if (isStepTransitioningRef.current || currentStep === nextStep) return;

    if (!shouldAnimate) {
      setCurrentStep(nextStep);
      return;
    }

    isStepTransitioningRef.current = true;
    setTransitionDirection(direction);
    setTransitionPhase("exiting");
    Animated.timing(stepTransition, {
      duration: STEP_TRANSITION_OUT_DURATION,
      easing: Easing.out(Easing.cubic),
      toValue: 0,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        isStepTransitioningRef.current = false;
        return;
      }

      setCurrentStep(nextStep);
      requestAnimationFrame(() => {
        setTransitionPhase("entering");
        stepTransition.setValue(0);
        Animated.timing(stepTransition, {
          duration: STEP_TRANSITION_IN_DURATION,
          easing: Easing.out(Easing.cubic),
          toValue: 1,
          useNativeDriver: true,
        }).start(() => {
          isStepTransitioningRef.current = false;
          setTransitionPhase("idle");
        });
      });
    });
  };

  const handleShowPurchaseStep = () => {
    transitionToStep("purchase", "forward");
  };

  const handleShowValueStep = () => {
    transitionToStep("value", "backward");
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      {shouldShowBackButton && (
        <TouchableOpacity
          accessibilityLabel="Back to previous step"
          accessibilityRole="button"
          activeOpacity={0.7}
          onPress={handleShowValueStep}
          style={[styles.backButton, { top: Math.max(insets.top, 10) }]}
        >
          <View
            style={[
              styles.navIcon,
              {
                backgroundColor: NAV_ICON_BACKGROUND_COLOR,
              },
            ]}
          >
            <View
              style={[
                styles.backIconLine,
                styles.backIconLineFirst,
                { backgroundColor: theme.primaryTextColor },
              ]}
            />
            <View
              style={[
                styles.backIconLine,
                styles.backIconLineSecond,
                { backgroundColor: theme.primaryTextColor },
              ]}
            />
          </View>
        </TouchableOpacity>
      )}

      {shouldShowCloseButton && (
        <TouchableOpacity
          accessibilityLabel={
            copy.closeButtonAccessibilityLabel ?? "Close paywall"
          }
          accessibilityRole="button"
          activeOpacity={0.7}
          onPress={onClose}
          style={[styles.closeButton, { top: Math.max(insets.top, 10) }]}
        >
          <View
            style={[
              styles.navIcon,
              {
                backgroundColor: NAV_ICON_BACKGROUND_COLOR,
              },
            ]}
          >
            <View
              style={[
                styles.closeIconLine,
                styles.closeIconLineFirst,
                { backgroundColor: theme.primaryTextColor },
              ]}
            />
            <View
              style={[
                styles.closeIconLine,
                styles.closeIconLineSecond,
                { backgroundColor: theme.primaryTextColor },
              ]}
            />
          </View>
        </TouchableOpacity>
      )}

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: fixedFooterHeight + FIXED_FOOTER_SCROLL_GAP,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { height: heroHeight }]}>{hero}</View>

        <Animated.View
          style={[
            styles.body,
            isValueStep && styles.valueBody,
            animatedStepStyle,
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.primaryTextColor }]}>
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[styles.subtitle, { color: theme.secondaryTextColor }]}
              >
                {subtitle}
              </Text>
            )}
          </View>

          {!isValueStep && (
            <View style={styles.planSection}>
              <PlanSelector
                plans={plans}
                selectedPlanId={resolvedSelectedPlanId}
                shouldAnimate={shouldAnimate}
                theme={theme}
                onSelectPlan={onSelectPlan}
              />
              {trialNotice && (
                <TrialNotice
                  title={trialNotice.title}
                  description={trialNotice.description}
                  theme={theme}
                />
              )}
            </View>
          )}

          {bodyContent ? (
            <View style={styles.contentSlot}>{bodyContent}</View>
          ) : (
            <View style={styles.benefits}>
              {bodyBenefits.map((benefit, index) => (
                <View
                  key={`${getBenefitKey(benefit)}-${index}`}
                  style={styles.benefitRow}
                >
                  {getBenefitIcon(benefit) ? (
                    <View style={styles.benefitIcon}>
                      {getBenefitIcon(benefit)}
                    </View>
                  ) : (
                    <Text style={[styles.check, { color: theme.accentColor }]}>
                      +
                    </Text>
                  )}
                  <View style={styles.benefitTextGroup}>
                    <Text
                      style={[
                        styles.benefitText,
                        { color: theme.primaryTextColor },
                      ]}
                    >
                      {typeof benefit === "string" ? benefit : benefit.title}
                    </Text>
                    {typeof benefit !== "string" && benefit.description && (
                      <Text
                        style={[
                          styles.benefitDescription,
                          { color: theme.secondaryTextColor },
                        ]}
                      >
                        {benefit.description}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {!isValueStep && (
            <LegalLinks
              copy={copy}
              shouldShowLegalPrefix={shouldShowLegalPrefix}
              theme={theme}
              onRestore={onRestore}
              onOpenTerms={onOpenTerms}
              onOpenPrivacy={onOpenPrivacy}
            />
          )}
        </Animated.View>
      </ScrollView>

      <View
        onLayout={(event) => {
          const nextFooterHeight = Math.ceil(event.nativeEvent.layout.height);
          setMeasuredFooterHeight((previousFooterHeight) =>
            previousFooterHeight === nextFooterHeight
              ? previousFooterHeight
              : nextFooterHeight
          );
        }}
        style={[
          styles.fixedFooter,
          {
            backgroundColor: theme.backgroundColor,
            paddingBottom: footerBottomPadding,
          },
        ]}
      >
        {isValueStep && valueStep ? (
          <View style={styles.nextButtonRow}>
            <StepNextButton
              accessibilityLabel={
                valueStep.nextButtonAccessibilityLabel ??
                copy.nextButtonAccessibilityLabel
              }
              label={valueStep.nextButton ?? copy.nextButton ?? "Next"}
              theme={theme}
              onPress={handleShowPurchaseStep}
            />
          </View>
        ) : (
          <View style={styles.purchaseActionGroup}>
            <PurchaseButton
              label={purchaseButtonLabel}
              loadingLabel={copy.purchasingButton}
              background={purchaseButtonBackground}
              isLoading={isPurchasing}
              isDisabled={!selectedPlan}
              theme={theme}
              onPress={() => {
                if (selectedPlan) onPurchase(selectedPlan);
              }}
            />
            {trialPriceDisclosure && (
              <Text
                style={[
                  styles.trialPriceDisclosure,
                  { color: theme.mutedTextColor },
                ]}
              >
                {trialPriceDisclosure}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

interface StepNextButtonProps {
  label: string;
  accessibilityLabel?: string;
  theme: PaywallTheme;
  onPress: () => void;
}

const StepNextButton = ({
  label,
  accessibilityLabel,
  theme,
  onPress,
}: StepNextButtonProps) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.nextButton,
        {
          backgroundColor: theme.accentColor,
          opacity: pressed ? 0.82 : 1,
        },
      ]}
    >
      <Text style={[styles.nextButtonLabel, { color: theme.accentTextColor }]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    width: 44,
    zIndex: 10,
  },
  closeButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    width: 44,
    zIndex: 10,
  },
  navIcon: {
    alignItems: "center",
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  closeIconLine: {
    borderRadius: 1,
    height: 2,
    position: "absolute",
    width: 14,
  },
  closeIconLineFirst: {
    transform: [{ rotate: "45deg" }],
  },
  closeIconLineSecond: {
    transform: [{ rotate: "-45deg" }],
  },
  backIconLine: {
    borderRadius: 1,
    height: 2,
    left: 11,
    position: "absolute",
    width: 11,
  },
  backIconLineFirst: {
    transform: [{ translateY: -3.5 }, { rotate: "-45deg" }],
  },
  backIconLineSecond: {
    transform: [{ translateY: 3.5 }, { rotate: "45deg" }],
  },
  fixedFooter: {
    bottom: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingTop: FIXED_FOOTER_TOP_PADDING,
    position: "absolute",
    right: 0,
    zIndex: 5,
  },
  nextButtonRow: {
    alignItems: "flex-end",
  },
  purchaseActionGroup: {
    gap: 8,
  },
  trialPriceDisclosure: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
    textAlign: "center",
  },
  nextButton: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 104,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  nextButtonLabel: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
    textAlign: "center",
  },
  content: {
    gap: 34,
  },
  hero: {
    overflow: "hidden",
    width: "100%",
  },
  body: {
    gap: 24,
    paddingHorizontal: 20,
  },
  valueBody: {
    gap: 34,
  },
  planSection: {
    gap: 12,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 32,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "center",
  },
  benefits: {
    gap: 12,
    paddingVertical: 18,
  },
  contentSlot: {
    paddingVertical: 18,
    width: "100%",
  },
  benefitRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  check: {
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 22,
  },
  benefitIcon: {
    alignItems: "center",
    minHeight: 22,
    justifyContent: "center",
    width: 18,
  },
  benefitText: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 22,
  },
  benefitTextGroup: {
    flex: 1,
    gap: 2,
  },
  benefitDescription: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
  },
});
