import { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import {
  AnimatedChevron,
  CollapsibleView,
  useExpandProgress,
} from "../shared/CollapsibleView";
import { CheckCircleIcon } from "../shared/icons";
import type {
  PaywallTheme,
  ProOnboardingCopy,
  ProOnboardingStep,
} from "../types";

interface ProOnboardingChecklistProps {
  steps: ProOnboardingStep[];
  copy: ProOnboardingCopy;
  theme: PaywallTheme;
  defaultExpanded: boolean;
  onTry: (step: ProOnboardingStep) => void;
  onConfirmDone?: (stepId: string) => void;
}

/**
 * A short getting-started checklist with a progress bar. Open, it lists every
 * step; the active one (the first open step, or an open step the user taps)
 * carries "Try it" and "Already used". Folded, the other rows shrink away and
 * only the active step stays, so the next thing to try is always visible.
 * Once every step is done the checklist hides.
 */
export const ProOnboardingChecklist = ({
  steps,
  copy,
  theme,
  defaultExpanded,
  onTry,
  onConfirmDone,
}: ProOnboardingChecklistProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const expandProgress = useExpandProgress(isExpanded);
  const doneCount = steps.filter((step) => step.isDone).length;
  // A tapped step stays active until it is done; then the first open one.
  const currentStep =
    steps.find((step) => step.id === selectedStepId && !step.isDone) ??
    steps.find((step) => !step.isDone);
  if (!currentStep) return null;

  const currentIndex = steps.indexOf(currentStep);
  const progress = doneCount / steps.length;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getColorWithAlpha(
            theme.accentColor,
            0.06,
            theme.surfaceColor,
          ),
          borderColor: getColorWithAlpha(
            theme.accentColor,
            0.45,
            theme.accentColor,
          ),
          borderRadius: theme.cardBorderRadius,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        onPress={() => setIsExpanded((expanded) => !expanded)}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.primaryTextColor }]}>
            {copy.checklistTitle}
          </Text>
          <Text style={[styles.progressText, { color: theme.accentColor }]}>
            {`${doneCount}/${steps.length}`}
          </Text>
          <AnimatedChevron
            color={theme.secondaryTextColor}
            isExpanded={isExpanded}
          />
        </View>
        <View
          style={[
            styles.track,
            {
              backgroundColor: getColorWithAlpha(
                theme.accentColor,
                0.16,
                theme.borderColor,
              ),
            },
          ]}
        >
          <View
            style={[
              styles.fill,
              {
                backgroundColor: theme.accentColor,
                width: `${Math.round(progress * 100)}%`,
              },
            ]}
          />
        </View>
      </Pressable>

      {/*
        The active step never moves out: folding only
        shrinks the rows around it, so it slides into place instead of a new
        view appearing. Each row carries its spacing on the side facing the
        active step, so a folded row leaves no gap.
      */}
      <View style={styles.fold}>
        {steps.map((step, index) => {
          if (step.id === currentStep.id) {
            return (
              <CurrentStep
                copy={copy}
                highlightOpacity={expandProgress}
                key={step.id}
                step={step}
                theme={theme}
                onConfirmDone={onConfirmDone}
                onTry={onTry}
              />
            );
          }
          const isLast = index === steps.length - 1;
          return (
            <CollapsibleView isExpanded={isExpanded} key={step.id}>
              <View
                style={[
                  index < currentIndex ? styles.rowBefore : styles.rowAfter,
                  isLast && styles.rowLast,
                ]}
              >
                <StepRow
                  step={step}
                  theme={theme}
                  onSelect={
                    step.isDone ? undefined : () => setSelectedStepId(step.id)
                  }
                />
              </View>
            </CollapsibleView>
          );
        })}
      </View>
    </View>
  );
};

interface StepRowProps {
  step: ProOnboardingStep;
  theme: PaywallTheme;
  onSelect?: () => void;
}

const StepRow = ({ step, theme, onSelect }: StepRowProps) => (
  <Pressable
    accessibilityRole={onSelect ? "button" : undefined}
    disabled={!onSelect}
    onPress={onSelect}
    style={({ pressed }) => [
      styles.stepRow,
      styles.stepInset,
      pressed && styles.pressed,
    ]}
  >
    <CheckCircleIcon
      checkColor={theme.accentTextColor}
      color={step.isDone ? theme.accentColor : theme.mutedTextColor}
      isChecked={Boolean(step.isDone)}
    />
    <View style={styles.stepTexts}>
      {step.isDone ? null : step.badge}
      <Text
        numberOfLines={2}
        style={[
          styles.stepTitle,
          {
            color: step.isDone
              ? theme.mutedTextColor
              : theme.secondaryTextColor,
          },
          step.isDone && styles.doneTitle,
        ]}
      >
        {step.title}
      </Text>
      {step.description && !step.isDone ? (
        <Text style={[styles.stepDescription, { color: theme.mutedTextColor }]}>
          {step.description}
        </Text>
      ) : null}
    </View>
  </Pressable>
);

interface CurrentStepProps {
  step: ProOnboardingStep;
  copy: ProOnboardingCopy;
  theme: PaywallTheme;
  /** Folded, the highlight fades so the step sits on the card itself. */
  highlightOpacity: Animated.Value;
  onTry: (step: ProOnboardingStep) => void;
  onConfirmDone?: (stepId: string) => void;
}

const CurrentStep = ({
  step,
  copy,
  theme,
  highlightOpacity,
  onTry,
  onConfirmDone,
}: CurrentStepProps) => (
  <View style={styles.current}>
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: getColorWithAlpha(
            theme.accentColor,
            0.1,
            theme.surfaceColor,
          ),
          // Concentric with the card: its radius minus the 4px inset.
          borderRadius: Math.max(theme.cardBorderRadius - CARD_INSET, 4),
          opacity: highlightOpacity,
        },
      ]}
    />
    <View style={styles.stepRow}>
      <CheckCircleIcon
        checkColor={theme.accentTextColor}
        color={theme.accentColor}
        isChecked={false}
      />
      <View style={styles.stepTexts}>
        {step.badge}
        <Text style={[styles.currentTitle, { color: theme.primaryTextColor }]}>
          {step.title}
        </Text>
        {step.description ? (
          <Text
            style={[
              styles.stepDescription,
              { color: theme.secondaryTextColor },
            ]}
          >
            {step.description}
          </Text>
        ) : null}
      </View>
    </View>

    <View style={styles.actions}>
      {step.onPress ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => onTry(step)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.accentColor,
              // Same border width as the secondary button keeps both labels
              // on one line.
              borderColor: theme.accentColor,
              borderRadius: theme.buttonBorderRadius,
            },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.accentTextColor }]}>
            {copy.tryButton}
          </Text>
        </Pressable>
      ) : null}
      <Pressable
        accessibilityRole="button"
        onPress={() => onConfirmDone?.(step.id)}
        style={({ pressed }) => [
          styles.button,
          {
            borderColor: getColorWithAlpha(
              theme.secondaryTextColor,
              0.28,
              theme.borderColor,
            ),
            borderRadius: theme.buttonBorderRadius,
          },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.secondaryTextColor }]}>
          {copy.alreadyUsedButton}
        </Text>
      </Pressable>
    </View>
  </View>
);

// Horizontal and bottom padding of the card; the active step's highlight
// fills it so the edges stay even.
const CARD_INSET = 4;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    paddingBottom: CARD_INSET,
    paddingHorizontal: CARD_INSET,
    paddingTop: 16,
  },
  fold: {
    paddingTop: 14,
  },
  header: {
    gap: 10,
    paddingHorizontal: 12,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 28,
  },
  title: {
    flex: 1,
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 21,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  track: {
    borderRadius: 2,
    height: 4,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 2,
    height: 4,
  },
  rowBefore: {
    paddingBottom: 14,
  },
  rowAfter: {
    paddingTop: 14,
  },
  // The card's bottom padding is only the 4px inset, sized for the active
  // step's highlight; a plain last row needs the rest.
  rowLast: {
    paddingBottom: 12,
  },
  stepRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  stepTexts: {
    alignItems: "flex-start",
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  stepTitle: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
  },
  doneTitle: {
    textDecorationLine: "line-through",
  },
  stepDescription: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  current: {
    gap: 12,
    padding: 12,
  },
  // Same horizontal inset as the highlighted current step, so every check
  // circle sits in one column.
  stepInset: {
    paddingHorizontal: 12,
  },
  currentTitle: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 40,
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.72,
  },
});
