export interface PreOnboardingPhoneFrameMetrics {
  borderRadius: number;
  borderWidth: number;
  screenBorderRadius: number;
  sideButtonOffset: number;
  sideButtonRadius: number;
  sideButtonWidth: number;
  leftTopButtonHeight: number;
  leftTopButtonTop: number;
  leftBottomButtonHeight: number;
  leftBottomButtonTop: number;
  rightButtonHeight: number;
  rightButtonTop: number;
  shadowOffsetY: number;
  shadowRadius: number;
}

const BASE_PHONE_WIDTH = 224;
const MIN_PHONE_SCALE = 0.72;
const MAX_PHONE_SCALE = 1.12;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const scaleMetric = (value: number, scale: number) => {
  return Math.round(value * scale);
};

export const getPreOnboardingPhoneFrameMetrics = (
  width: number,
): PreOnboardingPhoneFrameMetrics => {
  const scale = clamp(width / BASE_PHONE_WIDTH, MIN_PHONE_SCALE, MAX_PHONE_SCALE);
  const borderWidth = scaleMetric(5, scale);
  const borderRadius = scaleMetric(38, scale);

  return {
    borderRadius,
    borderWidth,
    screenBorderRadius: Math.max(borderRadius - borderWidth - 1, 16),
    sideButtonOffset: -scaleMetric(9, scale),
    sideButtonRadius: scaleMetric(5, scale),
    sideButtonWidth: Math.max(scaleMetric(5, scale), 3),
    leftTopButtonHeight: scaleMetric(46, scale),
    leftTopButtonTop: scaleMetric(95, scale),
    leftBottomButtonHeight: scaleMetric(46, scale),
    leftBottomButtonTop: scaleMetric(150, scale),
    rightButtonHeight: scaleMetric(68, scale),
    rightButtonTop: scaleMetric(124, scale),
    shadowOffsetY: scaleMetric(18, scale),
    shadowRadius: scaleMetric(26, scale),
  };
};
