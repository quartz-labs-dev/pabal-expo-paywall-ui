import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getColorWithAlpha } from "../shared/color-utils";
import type { OnboardingChoiceOption, OnboardingContentTheme } from "./types";

export interface OnboardingChoiceListProps {
  options: OnboardingChoiceOption[];
  selectedOptionId: string | null;
  theme: OnboardingContentTheme;
  onSelectOption: (optionId: string) => void;
}

interface ChoiceListRowProps {
  descriptionTextColor: string;
  index: number;
  isSelected: boolean;
  option: OnboardingChoiceOption;
  theme: OnboardingContentTheme;
  onSelectOption: (optionId: string) => void;
}

const CHOICE_ROW_ENTRANCE_STAGGER_MS = 72;

export const OnboardingChoiceList = ({
  options,
  selectedOptionId,
  theme,
  onSelectOption,
}: OnboardingChoiceListProps) => {
  const descriptionTextColor = getColorWithAlpha(
    theme.primaryTextColor,
    0.62,
    theme.secondaryTextColor,
  );

  return (
    <View style={styles.choiceList}>
      {options.map((option, index) => (
        <ChoiceListRow
          key={option.id}
          descriptionTextColor={descriptionTextColor}
          index={index}
          isSelected={option.id === selectedOptionId}
          option={option}
          theme={theme}
          onSelectOption={onSelectOption}
        />
      ))}
    </View>
  );
};

const ChoiceListRow = ({
  descriptionTextColor,
  index,
  isSelected,
  option,
  theme,
  onSelectOption,
}: ChoiceListRowProps) => {
  const entranceProgress = useRef(new Animated.Value(0)).current;
  const selectionProgress = useRef(
    new Animated.Value(isSelected ? 1 : 0),
  ).current;
  const didMountRef = useRef(false);

  useEffect(() => {
    entranceProgress.setValue(0);
    const animation = Animated.sequence([
      Animated.delay(index * CHOICE_ROW_ENTRANCE_STAGGER_MS),
      Animated.spring(entranceProgress, {
        friction: 7,
        tension: 130,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
    return () => animation.stop();
  }, [entranceProgress, index, option.id]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      selectionProgress.setValue(isSelected ? 1 : 0);
      return;
    }

    if (!isSelected) {
      Animated.timing(selectionProgress, {
        duration: 120,
        easing: Easing.out(Easing.cubic),
        toValue: 0,
        useNativeDriver: true,
      }).start();
      return;
    }

    selectionProgress.setValue(0);
    Animated.sequence([
      Animated.timing(selectionProgress, {
        duration: 150,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(selectionProgress, {
        duration: 130,
        easing: Easing.out(Easing.cubic),
        toValue: 0.82,
        useNativeDriver: true,
      }),
      Animated.timing(selectionProgress, {
        duration: 120,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSelected, selectionProgress]);

  const animatedRowStyle = {
    opacity: entranceProgress,
    transform: [
      {
        scale: Animated.multiply(
          entranceProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.92, 1],
          }),
          selectionProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.018],
          }),
        ),
      },
    ],
  };
  const animatedCheckStyle = {
    opacity: selectionProgress,
    transform: [
      {
        scale: selectionProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.72, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedRowStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        onPress={() => onSelectOption(option.id)}
        style={[
          styles.choiceRow,
          {
            backgroundColor: theme.cardBackgroundColor,
            shadowColor: theme.shadowColor,
          },
          isSelected && {
            borderColor: theme.accentColor,
          },
        ]}
      >
        {option.icon ? (
          <View style={styles.choiceLeadingIcon}>{option.icon}</View>
        ) : null}
        <View style={styles.choiceTextWrap}>
          <Text style={[styles.choiceTitle, { color: theme.primaryTextColor }]}>
            {option.title}
          </Text>
          {option.description ? (
            <Text
              style={[
                styles.choiceDescription,
                { color: descriptionTextColor },
              ]}
            >
              {option.description}
            </Text>
          ) : null}
        </View>
        <Animated.View
          style={[
            styles.choiceIndicator,
            isSelected && animatedCheckStyle,
            {
              backgroundColor: theme.accentColor,
              borderColor: theme.accentColor,
              opacity: isSelected ? undefined : 0,
            },
          ]}
        >
          <CheckIcon color="#FFFFFF" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

interface CheckIconProps {
  color: string;
}

const CheckIcon = ({ color }: CheckIconProps) => {
  return (
    <View style={styles.checkIcon}>
      <View
        style={[
          styles.checkLine,
          styles.checkLineShort,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.checkLine,
          styles.checkLineLong,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  choiceList: {
    gap: 12,
    maxWidth: 360,
    width: "100%",
  },
  choiceRow: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
  },
  choiceLeadingIcon: {
    alignItems: "center",
    flexShrink: 0,
    justifyContent: "center",
  },
  choiceTextWrap: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  choiceTitle: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 22,
  },
  choiceDescription: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 18,
  },
  choiceIndicator: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  checkIcon: {
    height: 14,
    width: 14,
  },
  checkLine: {
    borderRadius: 999,
    height: 2.5,
    position: "absolute",
  },
  checkLineShort: {
    left: 1.5,
    top: 7,
    transform: [{ rotate: "45deg" }],
    width: 6,
  },
  checkLineLong: {
    right: 0.5,
    top: 5.5,
    transform: [{ rotate: "-45deg" }],
    width: 11,
  },
});
