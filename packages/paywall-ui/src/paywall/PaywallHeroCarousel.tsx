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
  getSlideIndexFromOffset,
  getLoopedPageCount,
  resolveLoopedCarouselPosition,
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

// Swipeable, auto-advancing feature carousel for the `hero` slot. Loops
// infinitely in both directions (1 -> 2 -> 3 -> 1 keeps moving forward)
// by rendering clone pages at both edges and silently snapping to the
// matching real page after the scroll settles. Renders on a transparent
// background so an app-provided `backgroundOverlay` glow stays visible
// behind it.
export const PaywallHeroCarousel = ({
  slides,
  accentColor,
  autoAdvanceIntervalMs = DEFAULT_AUTO_ADVANCE_INTERVAL_MS,
  textColor = "#FFFFFF",
  secondaryTextColor = "rgba(255, 255, 255, 0.66)",
}: PaywallHeroCarouselProps) => {
  const slideCount = slides.length;
  const isLooping = slideCount > 1;
  const scrollViewRef = useRef<ScrollView>(null);
  // Page position within [1, slideCount] (see hero-carousel-math).
  const virtualIndexRef = useRef(isLooping ? 1 : 0);
  const isUserScrollingRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const pages = isLooping
    ? [slides[slideCount - 1], ...slides, slides[0]]
    : slides;

  // Start on (and re-snap to) the current real page whenever the
  // container width becomes known or changes.
  useEffect(() => {
    if (!isLooping || containerWidth <= 0) return;
    scrollViewRef.current?.scrollTo({
      animated: false,
      x: virtualIndexRef.current * containerWidth,
    });
  }, [containerWidth, isLooping]);

  useEffect(() => {
    if (containerWidth <= 0 || !isLooping || autoAdvanceIntervalMs <= 0) {
      return undefined;
    }

    const interval = setInterval(() => {
      if (isUserScrollingRef.current) return;

      // Safety net: if a scroll-settled event was missed while parked on
      // the first-slide clone, silently snap to the real first page before
      // advancing so motion always continues forward.
      let currentVirtualIndex = virtualIndexRef.current;
      if (currentVirtualIndex > slideCount) {
        currentVirtualIndex = 1;
        scrollViewRef.current?.scrollTo({
          animated: false,
          x: currentVirtualIndex * containerWidth,
        });
      }

      // Advancing past the last real page lands on the first-slide clone;
      // the scroll-end handler snaps back to the real first page.
      const nextVirtualIndex = currentVirtualIndex + 1;
      virtualIndexRef.current = nextVirtualIndex;
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: nextVirtualIndex * containerWidth,
      });
      setActiveIndex((nextVirtualIndex - 1) % slideCount);
    }, autoAdvanceIntervalMs);

    return () => clearInterval(interval);
  }, [autoAdvanceIntervalMs, containerWidth, isLooping, slideCount]);

  const handleScrollSettled = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    isUserScrollingRef.current = false;
    if (!isLooping || containerWidth <= 0) return;

    const rawPageIndex = getSlideIndexFromOffset(
      event.nativeEvent.contentOffset.x,
      containerWidth,
      getLoopedPageCount(slideCount)
    );
    const position = resolveLoopedCarouselPosition(rawPageIndex, slideCount);

    virtualIndexRef.current = position.virtualIndex;
    setActiveIndex(position.realIndex);

    if (position.requiresSnap) {
      scrollViewRef.current?.scrollTo({
        animated: false,
        x: position.virtualIndex * containerWidth,
      });
    }
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
          onScrollEndDrag={handleScrollSettled}
          onMomentumScrollEnd={handleScrollSettled}
        >
          {pages.map((slide, pageIndex) => (
            <View
              key={`page-${pageIndex}`}
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
      {isLooping && (
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
