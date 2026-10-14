import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CheckCircleIcon, ChevronDownIcon } from "../shared/icons";
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
 * A short getting-started checklist. Done steps are checked; the first open
 * step carries "Try it" and "Already used". The header folds it.
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

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: theme.accentColor,
          borderRadius: theme.cardBorderRadius,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        onPress={() => setIsExpanded((expanded) => !expanded)}
        style={styles.header}
      >
        <Text style={[styles.title, { color: theme.primaryTextColor }]}>
          {copy.checklistTitle}
        </Text>
        <Text style={[styles.progress, { color: theme.accentColor }]}>
          {`${doneCount}/${steps.length}`}
        </Text>
        <View style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
          <ChevronDownIcon color={theme.secondaryTextColor} />
        </View>
      </Pressable>

      {isExpanded ? (
        <View style={styles.steps}>
          {steps.map((step) => {
            const isCurrent = step.id === currentStep?.id;
            return (
              <View key={step.id} style={styles.step}>
                <View style={styles.stepRow}>
                  <CheckCircleIcon
                    checkColor={theme.accentTextColor}
                    color={
                      step.isDone || isCurrent
                        ? theme.accentColor
                        : theme.mutedTextColor
                    }
                    isChecked={Boolean(step.isDone)}
                  />
                  <View style={styles.stepTexts}>
                    {step.badge}
                    <Text
                      style={[
                        styles.stepTitle,
                        {
                          color: step.isDone
                            ? theme.mutedTextColor
                            : theme.primaryTextColor,
                        },
                        step.isDone && styles.doneTitle,
                      ]}
                    >
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

                {isCurrent ? (
                  <View style={styles.actions}>
                    {step.onPress ? (
                      <Pressable
                        accessibilityRole="button"
                        onPress={() => onTry(step)}
                        style={({ pressed }) => [
                          styles.button,
                          {
                            backgroundColor: theme.accentColor,
                            // Same border width as the secondary button keeps
                            // both labels on one line.
                            borderColor: theme.accentColor,
                            borderRadius: theme.buttonBorderRadius,
                          },
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            { color: theme.accentTextColor },
                          ]}
                        >
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
                          borderColor: theme.borderColor,
                          borderRadius: theme.buttonBorderRadius,
                        },
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          { color: theme.secondaryTextColor },
                        ]}
                      >
                        {copy.alreadyUsedButton}
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })}
          {!currentStep ? (
            <Text style={[styles.allDone, { color: theme.secondaryTextColor }]}>
              {copy.allExplored}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    gap: 12,
    padding: 16,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 32,
  },
  title: {
    flex: 1,
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "600",
  },
  progress: {
    fontSize: 14,
    fontWeight: "600",
  },
  chevron: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  steps: {
    gap: 14,
  },
  step: {
    gap: 10,
  },
  stepRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  stepTexts: {
    alignItems: "flex-start",
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  stepTitle: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  doneTitle: {
    textDecorationLine: "line-through",
  },
  stepDescription: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "400",
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
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  allDone: {
    fontSize: 14,
    fontWeight: "400",
  },
  pressed: {
    opacity: 0.72,
  },
});
