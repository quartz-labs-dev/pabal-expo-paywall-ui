import { StyleSheet, View } from "react-native";

interface IconProps {
  color: string;
}

interface CopyIconProps extends IconProps {
  backgroundColor?: string;
}

export const ChevronDownIcon = ({ color }: IconProps) => {
  return (
    <View style={styles.chevronDownIcon}>
      <View
        style={[
          styles.chevronDownLine,
          styles.chevronDownLineLeft,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.chevronDownLine,
          styles.chevronDownLineRight,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

export const ChevronLeftIcon = ({ color }: IconProps) => {
  return (
    <View style={styles.chevronLeftIcon}>
      <View
        style={[
          styles.chevronLeftLine,
          styles.chevronLeftLineFirst,
          { backgroundColor: color },
        ]}
      />
      <View
        style={[
          styles.chevronLeftLine,
          styles.chevronLeftLineSecond,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

export const CloseIcon = ({ color }: IconProps) => {
  return (
    <View style={styles.closeIcon}>
      <View
        style={[styles.closeLine, styles.closeLineFirst, { backgroundColor: color }]}
      />
      <View
        style={[
          styles.closeLine,
          styles.closeLineSecond,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
};

export const CopyIcon = ({
  backgroundColor = "transparent",
  color,
}: CopyIconProps) => {
  return (
    <View style={styles.copyIcon}>
      <View style={[styles.copyBack, { borderColor: color }]} />
      <View
        style={[styles.copyFront, { backgroundColor, borderColor: color }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chevronDownIcon: {
    height: 14,
    width: 14,
  },
  chevronDownLine: {
    borderRadius: 999,
    height: 2,
    position: "absolute",
    top: 7,
    width: 8,
  },
  chevronDownLineLeft: {
    left: 1,
    transform: [{ rotate: "45deg" }],
  },
  chevronDownLineRight: {
    right: 1,
    transform: [{ rotate: "-45deg" }],
  },
  chevronLeftIcon: {
    height: 18,
    width: 18,
  },
  chevronLeftLine: {
    borderRadius: 1,
    height: 2,
    left: 4,
    position: "absolute",
    width: 11,
  },
  chevronLeftLineFirst: {
    top: 5,
    transform: [{ rotate: "-45deg" }],
  },
  chevronLeftLineSecond: {
    bottom: 5,
    transform: [{ rotate: "45deg" }],
  },
  closeIcon: {
    alignItems: "center",
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  closeLine: {
    borderRadius: 1,
    height: 2,
    position: "absolute",
    width: 14,
  },
  closeLineFirst: {
    transform: [{ rotate: "45deg" }],
  },
  closeLineSecond: {
    transform: [{ rotate: "-45deg" }],
  },
  copyIcon: {
    height: 20,
    width: 20,
  },
  copyBack: {
    borderCurve: "continuous",
    borderRadius: 3,
    borderWidth: 2,
    height: 14,
    left: 2,
    position: "absolute",
    top: 2,
    width: 14,
  },
  copyFront: {
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
