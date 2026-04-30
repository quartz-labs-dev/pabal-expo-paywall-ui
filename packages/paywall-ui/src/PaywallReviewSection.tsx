import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getColorWithAlpha } from "./color-utils";
import type {
  PaywallReview,
  PaywallReviewRating,
  PaywallTheme,
} from "./types";

interface PaywallReviewSectionProps {
  reviews: PaywallReview[];
  theme: PaywallTheme;
  title?: string;
}

const MAX_RATING = 5;

const renderRating = (
  rating: PaywallReviewRating,
  theme: PaywallTheme
): ReactNode => {
  return Array.from({ length: MAX_RATING }, (_, index) => {
    const isActive = index < rating;

    return (
      <Text
        key={index}
        style={{ color: isActive ? theme.accentColor : theme.borderColor }}
      >
        ★
      </Text>
    );
  });
};

export const PaywallReviewSection = ({
  reviews,
  theme,
  title,
}: PaywallReviewSectionProps) => {
  if (reviews.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        {title && (
          <Text style={[styles.sectionTitle, { color: theme.primaryTextColor }]}>
            {title}
          </Text>
        )}
      </View>
      <View
        style={[
          styles.panel,
          {
            backgroundColor: getColorWithAlpha(theme.accentColor, 0.09),
          },
        ]}
      >
        {reviews.map((review, index) => (
          <View
            key={`${review.quote}-${index}`}
            style={[
              styles.review,
              index > 0 && [
                styles.reviewDivider,
                {
                  borderTopColor: getColorWithAlpha(
                    theme.primaryTextColor,
                    0.1
                  ),
                },
              ],
            ]}
          >
            <View style={styles.quoteRow}>
              <Text style={[styles.quoteMark, { color: theme.accentColor }]}>
                “
              </Text>
              <Text style={[styles.quote, { color: theme.primaryTextColor }]}>
                {review.quote}
              </Text>
            </View>
            <View style={styles.metaRow}>
              {review.rating && (
                <Text
                  accessibilityLabel={`${review.rating}/${MAX_RATING}`}
                  style={styles.inlineRating}
                >
                  {renderRating(review.rating, theme)}
                </Text>
              )}
              {review.author && (
                <Text style={[styles.author, { color: theme.mutedTextColor }]}>
                  {review.author}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 12,
    marginTop: 10,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  sectionTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    minWidth: 0,
    paddingHorizontal: 2,
  },
  panel: {
    borderRadius: 8,
    overflow: "hidden",
  },
  review: {
    gap: 8,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  reviewDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  quoteRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 9,
  },
  quoteMark: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 24,
  },
  quote: {
    flex: 1,
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
    minWidth: 0,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingLeft: 29,
  },
  inlineRating: {
    fontSize: 10,
    fontWeight: "800",
    lineHeight: 14,
  },
  author: {
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
  },
});
