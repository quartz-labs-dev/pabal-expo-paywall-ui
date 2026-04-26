import { StyleSheet, View } from "react-native";

interface CopyIconProps {
  color: string;
}

export const CopyIcon = ({ color }: CopyIconProps) => {
  return (
    <View style={styles.icon}>
      <View style={[styles.back, { borderColor: color }]} />
      <View style={[styles.front, { borderColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  back: {
    borderCurve: "continuous",
    borderRadius: 5,
    borderWidth: 2,
    height: 14,
    left: 4,
    position: "absolute",
    top: 3,
    width: 14,
  },
  front: {
    backgroundColor: "transparent",
    borderCurve: "continuous",
    borderRadius: 5,
    borderWidth: 2,
    height: 14,
    left: 7,
    position: "absolute",
    top: 7,
    width: 14,
  },
});
