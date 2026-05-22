import { Platform } from "react-native";

const ANDROID_FOOTER_BOTTOM_PADDING_FALLBACK = 52;
const IOS_FOOTER_EXTRA_BOTTOM_PADDING = 12;
const MIN_FOOTER_BOTTOM_PADDING = 12;

export const getOnboardingFooterBottomPadding = (
  safeAreaBottom: number,
) => {
  if (Platform.OS === "android") {
    if (safeAreaBottom <= 0) return ANDROID_FOOTER_BOTTOM_PADDING_FALLBACK;

    return Math.max(MIN_FOOTER_BOTTOM_PADDING, safeAreaBottom);
  }

  const bottomPadding = Math.max(safeAreaBottom, MIN_FOOTER_BOTTOM_PADDING);

  return bottomPadding + IOS_FOOTER_EXTRA_BOTTOM_PADDING;
};
