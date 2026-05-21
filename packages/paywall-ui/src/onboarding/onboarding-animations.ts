import { useEffect, useRef } from "react";
import { Animated, Easing, Platform, type TextStyle } from "react-native";

export interface OnboardingIntroTextSegment {
  isHighlighted?: boolean;
  text: string;
}

export interface OnboardingIntroTextToken {
  color: string;
  isHighlighted: boolean;
  key: string;
  text: string;
}

const ACTION_PANEL_ANIMATION_DURATION_MS = 520;
const ENTRANCE_ANIMATION_DURATION_MS = 620;
const PHONE_FRAME_ENTRANCE_DURATION_MS = 980;
const SEQUENTIAL_TEXT_STAGGER_MS = 42;
const SEQUENTIAL_WORD_DURATION_MS = 320;
const EMPHASIS_PATTERN = /\*\*(.*?)\*\*/g;

export const stripOnboardingIntroEmphasis = (copy: string) => {
  return copy.replace(EMPHASIS_PATTERN, "$1");
};

export const parseOnboardingIntroEmphasisSegments = (
  copy: string,
): OnboardingIntroTextSegment[] => {
  const segments: OnboardingIntroTextSegment[] = [];
  let currentIndex = 0;
  let match = EMPHASIS_PATTERN.exec(copy);

  while (match) {
    if (match.index > currentIndex) {
      segments.push({ text: copy.slice(currentIndex, match.index) });
    }

    segments.push({ isHighlighted: true, text: match[1] });
    currentIndex = match.index + match[0].length;
    match = EMPHASIS_PATTERN.exec(copy);
  }

  if (currentIndex < copy.length) {
    segments.push({ text: copy.slice(currentIndex) });
  }

  EMPHASIS_PATTERN.lastIndex = 0;
  return segments;
};

export const createOnboardingIntroTextTokens = (
  segments: OnboardingIntroTextSegment[],
  defaultColor: string,
  accentColor: string,
): OnboardingIntroTextToken[] => {
  return segments.flatMap((segment, segmentIndex) =>
    segment.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word, wordIndex) => ({
        color: segment.isHighlighted ? accentColor : defaultColor,
        isHighlighted: Boolean(segment.isHighlighted),
        key: `${segmentIndex}-${wordIndex}-${word}`,
        text: word,
      })),
  );
};

export const createOnboardingSequentialWordAnimation = () =>
  new Animated.Value(0);

export const startOnboardingSequentialTextAnimation = (
  animations: Animated.Value[],
): Animated.CompositeAnimation => {
  animations.forEach((animation) => animation.setValue(0));

  const sequence = Animated.stagger(
    SEQUENTIAL_TEXT_STAGGER_MS,
    animations.map((animation) =>
      Animated.timing(animation, {
        duration: SEQUENTIAL_WORD_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: false,
      }),
    ),
  );

  sequence.start();
  return sequence;
};

export const getOnboardingSequentialWordStyle = (
  animation: Animated.Value,
): Animated.WithAnimatedObject<TextStyle> => ({
  opacity: animation,
  transform:
    Platform.OS === "android"
      ? undefined
      : [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [14, 0],
            }),
          },
        ],
});

export const useOnboardingEntranceAnimation = (
  delay: number,
  resetKey?: unknown,
) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration: ENTRANCE_ANIMATION_DURATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, progress, resetKey]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [22, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };
};

export const useOnboardingActionPanelAnimation = (isVisible: boolean) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      duration: ACTION_PANEL_ANIMATION_DURATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: isVisible ? 1 : 0,
      useNativeDriver: false,
    });

    animation.start();
    return () => animation.stop();
  }, [isVisible, progress]);

  return progress;
};

export const useOnboardingPhoneFrameEntranceAnimation = (
  delay: number,
  offsetX: number,
  offsetY: number,
) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration: PHONE_FRAME_ENTRANCE_DURATION_MS,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [delay, offsetX, offsetY, progress]);

  return {
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [offsetX, 0],
        }),
      },
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [offsetY, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };
};
