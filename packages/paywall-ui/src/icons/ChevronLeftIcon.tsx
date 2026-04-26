import { StyleSheet, View } from "react-native";

interface ChevronLeftIconProps {
  color: string;
}

export const ChevronLeftIcon = ({ color }: ChevronLeftIconProps) => {
  return (
    <View style={styles.icon}>
      <View
        style={[styles.line, styles.lineFirst, { backgroundColor: color }]}
      />
      <View
        style={[styles.line, styles.lineSecond, { backgroundColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
  line: {
    borderRadius: 1,
    height: 2,
    left: 4,
    position: "absolute",
    width: 11,
  },
  lineFirst: {
    top: 5,
    transform: [{ rotate: "-45deg" }],
  },
  lineSecond: {
    bottom: 5,
    transform: [{ rotate: "45deg" }],
  },
});
