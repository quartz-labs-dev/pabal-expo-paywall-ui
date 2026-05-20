import { Animated, Easing, type TextStyle } from "react-native";

export interface IntroTextSegment {
  isHighlighted?: boolean;
  text: string;
}

export interface IntroTextToken {
  color: string;
  isHighlighted: boolean;
  key: string;
  text: string;
}

const EMPHASIS_PATTERN = /\*\*(.*?)\*\*/g;

export const stripIntroEmphasis = (copy: string) => {
  return copy.replace(EMPHASIS_PATTERN, "$1");
};

export const parseIntroEmphasisSegments = (
  copy: string,
): IntroTextSegment[] => {
  const segments: IntroTextSegment[] = [];
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

export const createIntroTextTokens = (
  segments: IntroTextSegment[],
  defaultColor: string,
  accentColor: string,
): IntroTextToken[] => {
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

export const createSequentialWordAnimation = () => new Animated.Value(0);

export const startSequentialTextAnimation = (
  animations: Animated.Value[],
): Animated.CompositeAnimation => {
  animations.forEach((animation) => animation.setValue(0));

  const sequence = Animated.stagger(
    42,
    animations.map((animation) =>
      Animated.timing(animation, {
        duration: 320,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: false,
      }),
    ),
  );

  sequence.start();
  return sequence;
};

export const getSequentialWordStyle = (
  animation: Animated.Value,
): Animated.WithAnimatedObject<TextStyle> => ({
  opacity: animation,
  transform: [
    {
      translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
    },
  ],
});
