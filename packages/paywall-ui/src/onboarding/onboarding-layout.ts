import { Platform } from "react-native";

const ANDROID_FOOTER_BOTTOM_PADDING_CAP = 24;
const IOS_FOOTER_EXTRA_BOTTOM_PADDING = 12;
const MIN_FOOTER_BOTTOM_PADDING = 12;

export const getOnboardingFooterBottomPadding = (
  safeAreaBottom: number,
) => {
  if (Platform.OS === "android") {
    return Math.max(
      MIN_FOOTER_BOTTOM_PADDING,
      Math.min(safeAreaBottom, ANDROID_FOOTER_BOTTOM_PADDING_CAP),
    );
  }

  const bottomPadding = Math.max(safeAreaBottom, MIN_FOOTER_BOTTOM_PADDING);

  return bottomPadding + IOS_FOOTER_EXTRA_BOTTOM_PADDING;
};
