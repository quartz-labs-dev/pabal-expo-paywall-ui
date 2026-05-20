import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import {
  createIntroTextTokens,
  createSequentialWordAnimation,
  getSequentialWordStyle,
  parseIntroEmphasisSegments,
  startSequentialTextAnimation,
} from "../../utils/onboarding-intro-text";

interface PreludeStepContentProps {
  accentColor: string;
  bodyColor: string;
  bodyLines: string[];
  headline: string;
  headlineColor: string;
}

export const PreludeStepContent = ({
  accentColor,
  bodyColor,
  bodyLines,
  headline,
  headlineColor,
}: PreludeStepContentProps) => {
  const headlineTokens = useMemo(
    () =>
      createIntroTextTokens(
        parseIntroEmphasisSegments(headline),
        headlineColor,
        accentColor,
      ),
    [accentColor, headline, headlineColor],
  );
  const bodyLineTokens = useMemo(
    () =>
      bodyLines.map((line) =>
        createIntroTextTokens(
          parseIntroEmphasisSegments(line),
          bodyColor,
          accentColor,
        ),
      ),
    [accentColor, bodyColor, bodyLines],
  );
  const wordCount =
    headlineTokens.length +
    bodyLineTokens.reduce((count, lineTokens) => count + lineTokens.length, 0);
  const wordAnimations = useSequentialTextAnimation(wordCount);
  let wordIndex = 0;

  return (
    <View style={styles.introCopy}>
      <View style={styles.introHeadlineLine}>
        {headlineTokens.map((token) => {
          const animatedStyle = getSequentialWordStyle(
            wordAnimations[wordIndex],
          );
          wordIndex += 1;

          return (
            <Animated.Text
              key={token.key}
              style={[
                styles.introHeadline,
                styles.introWord,
                { color: token.color },
                token.isHighlighted && styles.introHighlightedWord,
                animatedStyle,
              ]}
            >
              {token.text}
            </Animated.Text>
          );
        })}
      </View>
      <View style={styles.introBodyStack}>
        {bodyLineTokens.map((lineTokens, lineIndex) => (
          <View key={`body-line-${lineIndex}`} style={styles.introBodyLine}>
            {lineTokens.map((token) => {
              const animatedStyle = getSequentialWordStyle(
                wordAnimations[wordIndex],
              );
              wordIndex += 1;

              return (
                <Animated.Text
                  key={token.key}
                  style={[
                    styles.introBody,
                    styles.introWord,
                    { color: token.color },
                    token.isHighlighted && styles.introHighlightedWord,
                    animatedStyle,
                  ]}
                >
                  {token.text}
                </Animated.Text>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const useSequentialTextAnimation = (count: number) => {
  const animationsRef = useRef<Animated.Value[]>([]);

  if (animationsRef.current.length !== count) {
    animationsRef.current = Array.from(
      { length: count },
      createSequentialWordAnimation,
    );
  }

  useEffect(() => {
    const sequence = startSequentialTextAnimation(animationsRef.current);
    return () => sequence.stop();
  }, [count]);

  return animationsRef.current;
};

const styles = StyleSheet.create({
  introCopy: {
    gap: 72,
    width: "100%",
  },
  introHeadlineLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  introHeadline: {
    fontSize: 31,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 39,
  },
  introHighlightedWord: {
    fontWeight: "700",
  },
  introWord: {
    marginRight: 7,
  },
  introBodyStack: {
    gap: 0,
  },
  introBodyLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  introBody: {
    fontSize: 23,
    fontWeight: "400",
    letterSpacing: 0,
    lineHeight: 34,
  },
});
