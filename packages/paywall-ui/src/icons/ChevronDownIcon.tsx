import { StyleSheet, View } from "react-native";

interface ChevronDownIconProps {
  color: string;
}

export const ChevronDownIcon = ({ color }: ChevronDownIconProps) => {
  return (
    <View style={styles.icon}>
      <View
        style={[styles.line, styles.lineLeft, { backgroundColor: color }]}
      />
      <View
        style={[styles.line, styles.lineRight, { backgroundColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 14,
    width: 14,
  },
  line: {
    borderRadius: 999,
    height: 2,
    position: "absolute",
    top: 7,
    width: 8,
  },
  lineLeft: {
    left: 1,
    transform: [{ rotate: "45deg" }],
  },
  lineRight: {
    right: 1,
    transform: [{ rotate: "-45deg" }],
  },
});
