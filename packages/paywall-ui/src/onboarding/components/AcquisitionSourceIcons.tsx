import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";

export type AcquisitionSourceBrandIconId =
  | "appStore"
  | "google"
  | "instagram"
  | "playStore"
  | "threads"
  | "tiktok"
  | "x"
  | "youtube";

export const acquisitionSourceIconSources = {
  appStore: require("../../assets/acquisition-icons/app-store.png"),
  google: require("../../assets/acquisition-icons/google.png"),
  instagram: require("../../assets/acquisition-icons/instagram.png"),
  playStore: require("../../assets/acquisition-icons/play-store.png"),
  threads: require("../../assets/acquisition-icons/threads.png"),
  tiktok: require("../../assets/acquisition-icons/tiktok.png"),
  x: require("../../assets/acquisition-icons/x.png"),
  youtube: require("../../assets/acquisition-icons/youtube.png"),
} satisfies Record<AcquisitionSourceBrandIconId, ImageSourcePropType>;

interface AcquisitionSourceImageIconProps {
  source: ImageSourcePropType;
}

export const AcquisitionSourceImageIcon = ({
  source,
}: AcquisitionSourceImageIconProps) => {
  return (
    <View style={styles.iconBadge}>
      <Image
        resizeMode="contain"
        source={source}
        style={styles.brandIconImage}
      />
    </View>
  );
};

export const FriendOrFamilyIcon = () => {
  return (
    <View style={[styles.iconBadge, styles.peopleIcon]}>
      <View style={[styles.personIcon, styles.personIconLeft]}>
        <View style={styles.personIconHead} />
        <View style={styles.personIconBody} />
      </View>
      <View style={[styles.personIcon, styles.personIconRight]}>
        <View style={styles.personIconHead} />
        <View style={styles.personIconBody} />
      </View>
    </View>
  );
};

export const OtherSourceIcon = () => {
  return (
    <View style={[styles.iconBadge, styles.otherSourceIcon]}>
      <View style={styles.otherSourceDot} />
      <View style={styles.otherSourceDot} />
      <View style={styles.otherSourceDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconBadge: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  brandIconImage: {
    height: 24,
    width: 24,
  },
  peopleIcon: {
    flexDirection: "row",
  },
  personIcon: {
    alignItems: "center",
    gap: 2,
    position: "absolute",
  },
  personIconLeft: {
    left: 8,
  },
  personIconRight: {
    right: 8,
  },
  personIconHead: {
    backgroundColor: "#191522",
    borderRadius: 999,
    height: 7,
    width: 7,
  },
  personIconBody: {
    backgroundColor: "#191522",
    borderRadius: 999,
    height: 8,
    width: 10,
  },
  otherSourceIcon: {
    flexDirection: "row",
    gap: 3,
  },
  otherSourceDot: {
    backgroundColor: "#191522",
    borderRadius: 999,
    height: 4,
    width: 4,
  },
});
