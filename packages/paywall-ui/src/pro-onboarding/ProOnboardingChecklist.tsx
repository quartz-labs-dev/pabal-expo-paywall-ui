import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import { AnimatedChevron, CollapsibleView } from "../shared/CollapsibleView";
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
 * step and the first open one carries "Try it" and "Already used". Folded, the
 * other rows shrink away and only that step stays, so the next thing to try is
 * always visible.
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
  const doneCount = steps.filter((step) => step.isDone).length;
  const currentStep = steps.find((step) => !step.isDone);
  const currentIndex = currentStep ? steps.indexOf(currentStep) : -1;
  const progress = steps.length === 0 ? 0 : doneCount / steps.length;

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
        The current step (or the all-done line) never moves out: folding only
        shrinks the rows around it, so it slides into place instead of a new
        view appearing. Each row carries its spacing on the side facing the
        current step, so a folded row leaves no gap.
      */}
      <View style={styles.fold}>
        {steps.map((step, index) => {
          if (step.id === currentStep?.id) {
            return (
              <CurrentStep
                copy={copy}
                key={step.id}
                step={step}
                theme={theme}
                onConfirmDone={onConfirmDone}
                onTry={onTry}
              />
            );
          }
          const isBeforeCurrent = !currentStep || index < currentIndex;
          return (
            <CollapsibleView isExpanded={isExpanded} key={step.id}>
              <View
                style={isBeforeCurrent ? styles.rowBefore : styles.rowAfter}
              >
                <StepRow step={step} theme={theme} />
              </View>
            </CollapsibleView>
          );
        })}
        {!currentStep ? <AllDone copy={copy} theme={theme} /> : null}
      </View>
    </View>
  );
};

interface StepRowProps {
  step: ProOnboardingStep;
  theme: PaywallTheme;
}

const StepRow = ({ step, theme }: StepRowProps) => (
  <View style={[styles.stepRow, styles.stepInset]}>
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
  </View>
);

interface CurrentStepProps {
  step: ProOnboardingStep;
  copy: ProOnboardingCopy;
  theme: PaywallTheme;
  onTry: (step: ProOnboardingStep) => void;
  onConfirmDone?: (stepId: string) => void;
}

const CurrentStep = ({
  step,
  copy,
  theme,
  onTry,
  onConfirmDone,
}: CurrentStepProps) => (
  <View
    style={[
      styles.current,
      {
        backgroundColor: getColorWithAlpha(
          theme.accentColor,
          0.1,
          theme.surfaceColor,
        ),
        borderRadius: Math.max(theme.cardBorderRadius - 6, 8),
      },
    ]}
  >
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

interface AllDoneProps {
  copy: ProOnboardingCopy;
  theme: PaywallTheme;
}

const AllDone = ({ copy, theme }: AllDoneProps) => (
  <Text
    style={[
      styles.allDone,
      styles.stepInset,
      { color: theme.secondaryTextColor },
    ]}
  >
    {copy.allExplored}
  </Text>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 16,
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
  allDone: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.72,
  },
});
