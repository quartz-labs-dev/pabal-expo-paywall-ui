import { StyleSheet, View } from "react-native";

interface CopyIconProps {
  backgroundColor?: string;
  color: string;
}

export const CopyIcon = ({
  backgroundColor = "transparent",
  color,
}: CopyIconProps) => {
  return (
    <View style={styles.icon}>
      <View style={[styles.back, { borderColor: color }]} />
      <View style={[styles.front, { backgroundColor, borderColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  back: {
    borderCurve: "continuous",
    borderRadius: 3,
    borderWidth: 2,
    height: 14,
    left: 2,
    position: "absolute",
    top: 2,
    width: 14,
  },
  front: {
    borderCurve: "continuous",
    borderRadius: 3,
    borderWidth: 2,
    height: 14,
    left: 6,
    position: "absolute",
    top: 6,
    width: 14,
  },
});
