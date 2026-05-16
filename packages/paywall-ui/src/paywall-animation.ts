import { Animated, Easing } from "react-native";

export const CONTENT_RISE_TRANSITION_DURATION = 500;
export const CONTENT_RISE_TRANSITION_DISTANCE = 20;

export const createContentRiseTranslateY = (
  transition: Animated.Value
): Animated.AnimatedInterpolation<string | number> => {
  return transition.interpolate({
    inputRange: [0, 1],
    outputRange: [CONTENT_RISE_TRANSITION_DISTANCE, 0],
  });
};

export const startContentRiseTransition = (
  transition: Animated.Value,
  onComplete?: Animated.EndCallback
): Animated.CompositeAnimation => {
  const animation = Animated.timing(transition, {
    duration: CONTENT_RISE_TRANSITION_DURATION,
    easing: Easing.out(Easing.cubic),
    toValue: 1,
    useNativeDriver: true,
  });

  animation.start(onComplete);

  return animation;
};
