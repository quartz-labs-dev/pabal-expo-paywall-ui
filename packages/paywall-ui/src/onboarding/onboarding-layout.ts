import { Platform } from "react-native";

const IOS_FOOTER_EXTRA_BOTTOM_PADDING = 12;
const MIN_FOOTER_BOTTOM_PADDING = 12;

export const getOnboardingFooterBottomPadding = (safeAreaBottom: number) => {
  const bottomPadding = Math.max(safeAreaBottom, MIN_FOOTER_BOTTOM_PADDING);

  if (Platform.OS === "android") return bottomPadding;

  return bottomPadding + IOS_FOOTER_EXTRA_BOTTOM_PADDING;
};

