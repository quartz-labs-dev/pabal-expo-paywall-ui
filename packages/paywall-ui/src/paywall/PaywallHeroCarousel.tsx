import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import {
  getNextSlideIndex,
  getSlideIndexFromOffset,
} from "./hero-carousel-math";

export interface PaywallHeroCarouselSlide {
  key?: string;
  icon?: ReactNode;
  title: string;
  description?: string;
}

export interface PaywallHeroCarouselProps {
  slides: PaywallHeroCarouselSlide[];
  accentColor: string;
  /**
   * Milliseconds between automatic slide advances. Auto-advance pauses
   * while the user is swiping. Pass 0 to disable. Defaults to 3200.
   */
  autoAdvanceIntervalMs?: number;
  textColor?: string;
  secondaryTextColor?: string;
}

const DEFAULT_AUTO_ADVANCE_INTERVAL_MS = 3200;

// Swipeable, auto-advancing feature carousel for the `hero` slot. Renders
// on a transparent background so an app-provided `backgroundOverlay` glow
// stays visible behind it.
export const PaywallHeroCarousel = ({
  slides,
  accentColor,
  autoAdvanceIntervalMs = DEFAULT_AUTO_ADVANCE_INTERVAL_MS,
  textColor = "#FFFFFF",
  secondaryTextColor = "rgba(255, 255, 255, 0.66)",
}: PaywallHeroCarouselProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const activeIndexRef = useRef(0);
  const isUserScrollingRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (containerWidth <= 0 || slides.length < 2 || autoAdvanceIntervalMs <= 0) {
      return undefined;
    }

    const interval = setInterval(() => {
      if (isUserScrollingRef.current) return;
      const nextIndex = getNextSlideIndex(
        activeIndexRef.current,
        slides.length
      );
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: nextIndex * containerWidth,
      });
      setActiveIndex(nextIndex);
    }, autoAdvanceIntervalMs);

    return () => clearInterval(interval);
  }, [autoAdvanceIntervalMs, containerWidth, slides.length]);

  const syncIndexFromScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    isUserScrollingRef.current = false;
    setActiveIndex(
      getSlideIndexFromOffset(
        event.nativeEvent.contentOffset.x,
        containerWidth,
        slides.length
      )
    );
  };

  return (
    <View
      style={styles.root}
      onLayout={(event) =>
        setContainerWidth(Math.round(event.nativeEvent.layout.width))
      }
    >
      {containerWidth > 0 && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => {
            isUserScrollingRef.current = true;
          }}
          onScrollEndDrag={syncIndexFromScroll}
          onMomentumScrollEnd={syncIndexFromScroll}
        >
          {slides.map((slide, index) => (
            <View
              key={slide.key ?? `${slide.title}-${index}`}
              style={[styles.slide, { width: containerWidth }]}
            >
              {slide.icon && (
                <View style={[styles.iconBubble, { borderColor: accentColor }]}>
                  {slide.icon}
                </View>
              )}
              <Text style={[styles.title, { color: textColor }]}>
                {slide.title}
              </Text>
              {slide.description && (
                <Text
                  style={[styles.description, { color: secondaryTextColor }]}
                >
                  {slide.description}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
      {slides.length > 1 && (
        <View style={styles.dots}>
          {slides.map((slide, index) => (
            <View
              key={slide.key ?? `${slide.title}-${index}`}
              style={[
                styles.dot,
                index === activeIndex
                  ? { backgroundColor: accentColor, width: 18 }
                  : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 12,
    justifyContent: "flex-end",
    paddingBottom: 14,
  },
  slide: {
    alignItems: "center",
    gap: 4,
    justifyContent: "flex-end",
    paddingHorizontal: 32,
  },
  iconBubble: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 24,
    borderWidth: 1.5,
    height: 48,
    justifyContent: "center",
    marginBottom: 4,
    width: 48,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
  description: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "center",
  },
  dots: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  dotInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.28)",
  },
});
