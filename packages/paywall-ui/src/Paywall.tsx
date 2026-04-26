import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getDefaultSelectedPlanId } from "./create-paywall-plans";
import { LegalLinks } from "./LegalLinks";
import { PlanSelector } from "./PlanSelector";
import { PurchaseButton } from "./PurchaseButton";
import { mergePaywallTheme } from "./theme";
import type {
  PaywallBenefit,
  PaywallPlan,
  PaywallProps,
  PaywallTheme,
} from "./types";

type PaywallStep = "value" | "purchase";

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

const FIXED_FOOTER_BUTTON_HEIGHT = 52;
const FIXED_FOOTER_TOP_PADDING = 12;
const FIXED_FOOTER_MIN_BOTTOM_PADDING = 12;
const FIXED_FOOTER_SCROLL_GAP = 24;
const DEFAULT_HERO_HEIGHT_RATIO = 0.2;

export const Paywall = <TPackage,>({
  plans,
  hero,
  heroHeightRatio = DEFAULT_HERO_HEIGHT_RATIO,
  stepMode = "twoStep",
  valueStep,
  benefits = [],
  content,
  purchaseButtonBackground,
  copy,
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
  const [currentStep, setCurrentStep] = useState<PaywallStep>(() =>
    shouldUseValueStep ? "value" : "purchase",
  );
  const selectedPlan = getSelectedPlan(plans, selectedPlanId);
  const resolvedSelectedPlanId = selectedPlan?.id;
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
  const bodyBenefits = isValueStep ? valueStep?.benefits ?? [] : benefits;
  const bodyContent = isValueStep ? valueStep?.content : content;
  const shouldShowCloseButton =
    !isValueStep || valueStep?.closeButtonVisibility === "visible";

  useEffect(() => {
    setCurrentStep(shouldUseValueStep ? "value" : "purchase");
  }, [shouldUseValueStep]);

  return (
    <View style={[styles.root, { backgroundColor: theme.backgroundColor }]}>
      {shouldShowCloseButton && (
        <Pressable
          accessibilityLabel={
            copy.closeButtonAccessibilityLabel ?? "Close paywall"
          }
          accessibilityRole="button"
          onPress={onClose}
          style={[styles.closeButton, { top: Math.max(insets.top, 10) }]}
        >
          <View
            style={[
              styles.closeIcon,
              {
                backgroundColor: theme.backgroundColor,
                borderColor: theme.secondaryTextColor,
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
        </Pressable>
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

        <View style={[styles.body, isValueStep && styles.valueBody]}>
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
            <PlanSelector
              plans={plans}
              selectedPlanId={resolvedSelectedPlanId}
              theme={theme}
              onSelectPlan={onSelectPlan}
            />
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
                  <Text style={[styles.check, { color: theme.accentColor }]}>
                    +
                  </Text>
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
              theme={theme}
              onRestore={onRestore}
              onOpenTerms={onOpenTerms}
              onOpenPrivacy={onOpenPrivacy}
            />
          )}
        </View>
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
              accessibilityLabel={valueStep.nextButtonAccessibilityLabel}
              label={valueStep.nextButton}
              theme={theme}
              onPress={() => setCurrentStep("purchase")}
            />
          </View>
        ) : (
          <PurchaseButton
            label={copy.purchaseButton}
            loadingLabel={copy.purchasingButton}
            background={purchaseButtonBackground}
            isLoading={isPurchasing}
            isDisabled={!selectedPlan}
            theme={theme}
            onPress={() => {
              if (selectedPlan) onPurchase(selectedPlan);
            }}
          />
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
  closeButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    position: "absolute",
    right: 10,
    width: 44,
    zIndex: 10,
  },
  closeIcon: {
    alignItems: "center",
    borderRadius: 17,
    borderWidth: StyleSheet.hairlineWidth,
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
    gap: 22,
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
    paddingVertical: 8,
  },
  contentSlot: {
    paddingVertical: 8,
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
