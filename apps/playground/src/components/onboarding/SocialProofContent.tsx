import { Image, StyleSheet, Text, View } from "react-native";

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

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Headline
          accentColor={theme.accentColor}
          text={headline}
          textColor={theme.primaryTextColor}
        />
      </View>

      {metric ? (
        <View style={styles.metricWrap}>
          <View style={styles.metricCopy}>
            <Text style={[styles.metricValue, { color: theme.primaryTextColor }]}>
              {metric.value}
            </Text>
            <StarRating color={theme.accentColor} rating={5} size="compact" />
            <Text style={[styles.metricLabel, { color: mutedTextColor }]}>
              {metric.label}
            </Text>
          </View>
          <LaurelWreath />
        </View>
      ) : null}

      <View style={styles.reviewList}>
        {reviews.slice(0, 2).map((review) => (
          <ReviewCard
            key={`${review.title}-${review.quote}`}
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

interface StarRatingProps {
  color: string;
  rating?: SocialProofReviewRating;
  size?: "compact" | "regular";
}

const StarRating = ({ color, rating = 5, size = "regular" }: StarRatingProps) => {
  const starSize = size === "compact" ? styles.starCompact : styles.starRegular;

  return (
    <View
      accessibilityLabel={`${rating} out of 5 stars`}
      accessibilityRole="image"
      style={styles.starRow}
    >
      {Array.from({ length: rating }).map((_, index) => (
        <Text key={index} style={[styles.star, starSize, { color }]}>
          ★
        </Text>
      ))}
    </View>
  );
};

interface ReviewCardProps {
  review: SocialProofReview;
  theme: Required<PlaygroundOnboardingTheme>;
}

const ReviewCard = ({ review, theme }: ReviewCardProps) => {
  return (
    <View
      style={[
        styles.reviewCard,
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
    </View>
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
