import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const ACTION_PANEL_ANIMATION_DURATION_MS = 520;

export const useEntranceAnimation = (delay: number, resetKey?: unknown) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay,
      duration: 620,
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

export const useActionPanelAnimation = (isVisible: boolean) => {
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
