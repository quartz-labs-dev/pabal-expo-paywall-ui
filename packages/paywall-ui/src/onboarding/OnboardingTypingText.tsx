import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
} from "react-native";

export interface OnboardingTypingTextProps {
  color: string;
  text: string;
  characterIntervalMs?: number;
  delayMs?: number;
  style?: StyleProp<TextStyle>;
}

export function OnboardingTypingText({
  color,
  text,
  characterIntervalMs = 42,
  delayMs = 120,
  style,
}: OnboardingTypingTextProps) {
  const characters = useMemo(() => Array.from(text), [text]);
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0);

  useEffect(() => {
    setVisibleCharacterCount(0);

    if (characters.length === 0) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setVisibleCharacterCount((currentCount) => {
          const nextCount = currentCount + 1;

          if (nextCount >= characters.length && intervalId) {
            clearInterval(intervalId);
          }

          return Math.min(nextCount, characters.length);
        });
      }, characterIntervalMs);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);

      if (intervalId) clearInterval(intervalId);
    };
  }, [characters.length, characterIntervalMs, delayMs, text]);

  return (
    <Text style={[styles.text, { color }, style]}>
      {characters.slice(0, visibleCharacterCount).join("")}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0,
  },
});
