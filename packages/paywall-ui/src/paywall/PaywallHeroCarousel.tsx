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
  resolveInitialCarouselPosition,
  resolveLoopedCarouselPosition,
} from "./hero-carousel-math";
import { resolveCarouselDotAppearance } from "./carousel-dots";

export interface PaywallHeroCarouselSlide {
  key?: string;
  icon?: ReactNode;
  /**
   * Full-width slide body, for apps that show a real screen or component
   * rather than an icon. Rendered in place of the `icon` bubble, which is
   * sized for a glyph. `title` becomes the caption underneath it.
   */
  content?: ReactNode;
  title?: string;
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
  /**
   * Fixed height for the slide body. Without it a `content` slide is only as
   * tall as what it renders, so the caption underneath sits at a different
   * height on every slide and jumps as the user swipes. Set it to the tallest
   * body and every caption lines up.
   */
  contentHeight?: number;
  /**
   * Fixed height for the caption row, for the same reason: it keeps the
   * description from moving when one slide's title wraps to two lines or a
   * slide has no title at all.
   */
  titleHeight?: number;
  /**
   * Slide the carousel opens on, 0-based. Prefer this over reordering
   * `slides`: the dots read as a position within a fixed list, so reordering
   * makes the first dot mean a different slide on every visit. Applied on
   * mount only; out-of-range values clamp.
   */
  initialIndex?: number;
  textColor?: string;
  secondaryTextColor?: string;
  /**
   * Color of the dots that are not the current slide. Defaults to translucent
   * white, which reads on the dark paywall the theme defaults describe and
   * disappears on a light one. Apps with a light `theme.backgroundColor` must
   * pass a color of their own, or the carousel looks like it has a single
   * dot. The active dot follows `accentColor`.
   */
  inactiveDotColor?: string;
}

const DEFAULT_AUTO_ADVANCE_INTERVAL_MS = 3200;

// `content` is a ReactNode, so a bare truthiness check can yield 0 or "" and
// leak a non-style value into a style array.
const hasContent = (slide: PaywallHeroCarouselSlide) =>
  slide.content !== undefined && slide.content !== null;

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
  contentHeight,
  titleHeight,
  initialIndex = 0,
  textColor = "#FFFFFF",
  secondaryTextColor = "rgba(255, 255, 255, 0.66)",
  inactiveDotColor,
}: PaywallHeroCarouselProps) => {
  const slideCount = slides.length;
  const isLooping = slideCount > 1;
  const initialPosition = resolveInitialCarouselPosition(
    initialIndex,
    slideCount
  );
  const scrollViewRef = useRef<ScrollView>(null);
  // Page position within [1, slideCount] (see hero-carousel-math).
  const virtualIndexRef = useRef(initialPosition.virtualIndex);
  const isUserScrollingRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(initialPosition.realIndex);

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
              style={[
                styles.slide,
                hasContent(slide) ? styles.contentSlide : styles.iconSlide,
                { width: containerWidth },
              ]}
            >
              {hasContent(slide) ? (
                <View
                  style={[
                    styles.content,
                    contentHeight === undefined ? null : { height: contentHeight },
                  ]}
                >
                  {slide.content}
                </View>
              ) : (
                slide.icon && (
                  <View
                    style={[styles.iconBubble, { borderColor: accentColor }]}
                  >
                    {slide.icon}
                  </View>
                )
              )}
              {(slide.title || titleHeight !== undefined) && (
                <View
                  style={[
                    styles.titleRow,
                    titleHeight === undefined ? null : { height: titleHeight },
                  ]}
                >
                  {slide.title && (
                    <Text
                      style={[
                        styles.title,
                        hasContent(slide) && styles.contentTitle,
                        { color: textColor },
                      ]}
                    >
                      {slide.title}
                    </Text>
                  )}
                </View>
              )}
              {slide.description && (
                <Text
                  style={[
                    styles.description,
                    { color: secondaryTextColor },
                  ]}
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
              key={slide.key ?? `slide-${index}`}
              style={[
                styles.dot,
                resolveCarouselDotAppearance(
                  index === activeIndex,
                  accentColor,
                  inactiveDotColor
                ),
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
  },
  iconSlide: {
    justifyContent: "flex-end",
    paddingHorizontal: 32,
  },
  // Both slide kinds sit on the baseline. Centering a content slide leaves
  // dead space between its caption and the dots whenever the carousel is
  // taller than the slide, which is most of the time.
  contentSlide: {
    gap: 10,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
  content: {
    alignItems: "center",
    flexShrink: 1,
    justifyContent: "center",
    width: "100%",
  },
  titleRow: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  contentTitle: {
    fontSize: 14,
    // Must be set alongside fontSize: the base title's lineHeight of 24 would
    // otherwise survive and overflow a caption row sized for 14pt text. The
    // gap to the content lives on the slide, not as a margin here, so
    // `titleHeight` measures the caption box and nothing else.
    lineHeight: 18,
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
  // Color and width come from `resolveCarouselDotAppearance`, so the active
  // pill and the inactive dot stay described in one place.
  dot: {
    borderRadius: 3,
    height: 6,
  },
});
