import { Pressable, StyleSheet, Text, View } from "react-native";
import type { OnboardingContentTheme } from "pabal-expo-paywall-ui";

export interface PlaygroundSegmentedOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface PlaygroundSegmentedControlProps<TValue extends string> {
  accessibilityLabel: string;
  onChange: (value: TValue) => void;
  options: readonly PlaygroundSegmentedOption<TValue>[];
  theme: OnboardingContentTheme;
  value: TValue;
}

export const PlaygroundSegmentedControl = <TValue extends string>({
  accessibilityLabel,
  onChange,
  options,
  theme,
  value,
}: PlaygroundSegmentedControlProps<TValue>) => (
  <View
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="radiogroup"
    style={[styles.selector, { backgroundColor: theme.cardBackgroundColor }]}
  >
    {options.map((option) => {
      const isSelected = option.value === value;

      return (
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: isSelected }}
          key={option.value}
          onPress={() => onChange(option.value)}
          style={[
            styles.selectorOption,
            isSelected && { backgroundColor: theme.accentColor },
          ]}
        >
          <Text
            style={[
              styles.selectorLabel,
              {
                color: isSelected
                  ? theme.buttonTextColor
                  : theme.secondaryTextColor,
              },
            ]}
          >
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  selector: {
    borderRadius: 14,
    flexDirection: "row",
    gap: 4,
    padding: 4,
  },
  selectorOption: {
    borderRadius: 10,
    minWidth: 72,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectorLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
