import { Pressable, StyleSheet, Text, View } from "react-native";

export interface PlaygroundOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface PlaygroundOptionRowProps<TValue extends string> {
  label: string;
  options: readonly PlaygroundOption<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
}

/** A labeled single-choice row, so every control says what it changes. */
export const PlaygroundOptionRow = <TValue extends string>({
  label,
  options,
  value,
  onChange,
}: PlaygroundOptionRowProps<TValue>) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View
      accessibilityLabel={label}
      accessibilityRole="radiogroup"
      style={styles.options}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, isSelected && styles.optionSelected]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

export const onOffOptions = [
  { label: "On", value: "on" },
  { label: "Off", value: "off" },
] as const satisfies readonly PlaygroundOption<"on" | "off">[];

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  label: {
    color: "#B9C4CF",
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 17,
  },
  options: {
    backgroundColor: "#0B1117",
    borderRadius: 8,
    flexDirection: "row",
    gap: 2,
    padding: 2,
  },
  option: {
    borderRadius: 6,
    minHeight: 32,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  optionSelected: {
    backgroundColor: "#102A2A",
  },
  optionText: {
    color: "#7D8A97",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
  optionTextSelected: {
    color: "#5AC8B7",
  },
});
