import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

import {
  getMutedPrimaryTextColor,
  type PlaygroundOnboardingTheme,
} from "../onboarding-theme";
import type {
  SocialProofContentData,
  SocialProofReview,
  SocialProofReviewRating,
} from "./types";
import { parseIntroEmphasisSegments } from "../../utils/onboarding-intro-text";

const STAR_RATING_ENTRANCE_DELAY_MS = 500;

export interface SocialProofContentProps extends SocialProofContentData {
  theme: Required<PlaygroundOnboardingTheme>;
}

export const SocialProofContent = ({
  headline,
  metric,
  reviews,
  theme,
}: SocialProofContentProps) => {
  const mutedTextColor = getMutedPrimaryTextColor(theme);
  const headingEntranceStyle = useSocialProofEntrance(0);
  const metricCopyEntranceStyle = useSocialProofEntrance(1);
  const laurelEntranceStyle = useSocialProofEntrance(2, {
    initialScale: 0.82,
    translateY: 10,
  });
  const reviewStartIndex = metric ? 3 : 1;

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.heading, headingEntranceStyle]}>
        <Headline
          accentColor={theme.accentColor}
          text={headline}
          textColor={theme.primaryTextColor}
        />
      </Animated.View>

      {metric ? (
        <View style={styles.metricWrap}>
          <Animated.View style={[styles.metricCopy, metricCopyEntranceStyle]}>
            <Text style={[styles.metricValue, { color: theme.primaryTextColor }]}>
              {metric.value}
            </Text>
            <StarRating
              color={theme.accentColor}
              isAnimated
              rating={5}
              size="compact"
            />
            <Text style={[styles.metricLabel, { color: mutedTextColor }]}>
              {metric.label}
            </Text>
          </Animated.View>
          <Animated.View style={laurelEntranceStyle}>
            <LaurelWreath />
          </Animated.View>
        </View>
      ) : null}

      <View style={styles.reviewList}>
        {reviews.slice(0, 2).map((review, index) => (
          <ReviewCard
            key={`${review.title}-${review.quote}`}
            entranceIndex={reviewStartIndex + index}
            review={review}
            theme={theme}
          />
        ))}
      </View>
    </View>
  );
};

interface HeadlineProps {
  accentColor: string;
  text: string;
  textColor: string;
}

const Headline = ({
  accentColor,
  text,
  textColor,
}: HeadlineProps) => {
  const segments = parseIntroEmphasisSegments(text);

  return (
    <Text style={[styles.headline, { color: textColor }]}>
      {segments.map((segment, index) => (
        <Text
          key={`${index}-${segment.text}`}
          style={[
            segment.isHighlighted && {
              color: accentColor,
              fontWeight: "700",
            },
          ]}
        >
          {segment.text}
        </Text>
      ))}
    </Text>
  );
};

const LaurelWreath = () => {
  return (
    <Image
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      resizeMode="contain"
      source={require("../../../../../packages/paywall-ui/src/assets/laurel.png")}
      style={styles.laurelWreath}
    />
  );
};

interface SocialProofEntranceOptions {
  initialScale?: number;
  translateY?: number;
}

const useSocialProofEntrance = (
  index: number,
  { initialScale = 0.94, translateY = 16 }: SocialProofEntranceOptions = {},
) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      delay: index * 86,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      toValue: 1,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [index, initialScale, progress, translateY]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [translateY, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [initialScale, 1],
        }),
      },
    ],
  };
};

interface StarRatingProps {
  color: string;
  isAnimated?: boolean;
  rating?: SocialProofReviewRating;
  size?: "compact" | "regular";
}

const StarRating = ({
  color,
  isAnimated = false,
  rating = 5,
  size = "regular",
}: StarRatingProps) => {
  const starSize = size === "compact" ? styles.starCompact : styles.starRegular;
  const starAnimations = useStarRatingAnimation(rating, isAnimated);

  return (
    <View
      accessibilityLabel={`${rating} out of 5 stars`}
      accessibilityRole="image"
      style={styles.starRow}
    >
      {Array.from({ length: rating }).map((_, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.star,
            starSize,
            { color },
            isAnimated && {
              opacity: starAnimations[index],
              transform: [
                {
                  scale: starAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        >
          ★
        </Animated.Text>
      ))}
    </View>
  );
};

const useStarRatingAnimation = (
  count: number,
  isEnabled: boolean,
) => {
  const animationsRef = useRef<Animated.Value[]>([]);

  if (animationsRef.current.length !== count) {
    animationsRef.current = Array.from(
      { length: count },
      () => new Animated.Value(isEnabled ? 0 : 1),
    );
  }

  useEffect(() => {
    const animations = animationsRef.current;

    if (!isEnabled) {
      animations.forEach((animation) => animation.setValue(1));
      return;
    }

    animations.forEach((animation) => animation.setValue(0));
    const sequence = Animated.sequence([
      Animated.delay(STAR_RATING_ENTRANCE_DELAY_MS),
      Animated.stagger(
        64,
        animations.map((animation) =>
          Animated.spring(animation, {
            friction: 6,
            tension: 160,
            toValue: 1,
            useNativeDriver: true,
          }),
        ),
      ),
    ]);

    sequence.start();
    return () => sequence.stop();
  }, [count, isEnabled]);

  return animationsRef.current;
};

interface ReviewCardProps {
  entranceIndex: number;
  review: SocialProofReview;
  theme: Required<PlaygroundOnboardingTheme>;
}

const ReviewCard = ({ entranceIndex, review, theme }: ReviewCardProps) => {
  const entranceStyle = useSocialProofEntrance(entranceIndex);

  return (
    <Animated.View
      style={[
        styles.reviewCard,
        entranceStyle,
        {
          backgroundColor: theme.cardBackgroundColor,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <View style={styles.reviewHeader}>
        <StarRating color={theme.accentColor} rating={review.rating ?? 5} />
      </View>
      <Text style={[styles.reviewTitle, { color: theme.primaryTextColor }]}>
        {review.title}
      </Text>
      <Text style={[styles.reviewQuote, { color: theme.primaryTextColor }]}>
        {review.quote}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 22,
    paddingBottom: 16,
    width: "100%",
  },
  heading: {
    alignItems: "center",
    gap: 8,
    maxWidth: 360,
    width: "100%",
  },
  headline: {
    flexShrink: 1,
    fontSize: 31,
    fontWeight: "700",
    lineHeight: 37,
    textAlign: "center",
  },
  metricWrap: {
    alignItems: "center",
    gap: 6,
    justifyContent: "flex-start",
    maxWidth: 220,
    minHeight: 202,
    width: "100%",
  },
  metricCopy: {
    alignItems: "center",
    gap: 3,
    minHeight: 62,
  },
  metricLabel: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 27,
    textAlign: "center",
  },
  laurelWreath: {
    height: 128,
    width: 128,
  },
  reviewList: {
    gap: 12,
    maxWidth: 380,
    width: "100%",
  },
  reviewCard: {
    borderRadius: 8,
    gap: 9,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
  },
  reviewHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 23,
  },
  reviewQuote: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  starRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  star: {
    includeFontPadding: false,
    lineHeight: 18,
  },
  starCompact: {
    fontSize: 15,
  },
  starRegular: {
    fontSize: 17,
  },
});
