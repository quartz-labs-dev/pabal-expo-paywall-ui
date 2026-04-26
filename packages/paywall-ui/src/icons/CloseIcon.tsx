import { StyleSheet, View } from "react-native";

interface CloseIconProps {
  color: string;
}

export const CloseIcon = ({ color }: CloseIconProps) => {
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
    alignItems: "center",
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  line: {
    borderRadius: 1,
    height: 2,
    position: "absolute",
    width: 14,
  },
  lineFirst: {
    transform: [{ rotate: "45deg" }],
  },
  lineSecond: {
    transform: [{ rotate: "-45deg" }],
  },
});
