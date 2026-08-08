export const getSlideIndexFromOffset = (
  offsetX: number,
  slideWidth: number,
  slideCount: number
): number => {
  if (slideWidth <= 0 || slideCount <= 0) return 0;
  const index = Math.round(offsetX / slideWidth);
  return Math.min(Math.max(index, 0), slideCount - 1);
};

// A looping carousel renders [lastClone, ...slides, firstClone], so real
// slides occupy page indexes 1..slideCount and the clones sit at 0 and
// slideCount + 1.
export interface LoopedCarouselPosition {
  /** Page index to display, within [1, slideCount]. */
  virtualIndex: number;
  /** 0-based slide index (for pagination dots). */
  realIndex: number;
  /** True when the scroll settled on a clone page and must silently jump. */
  requiresSnap: boolean;
}

export const getLoopedPageCount = (slideCount: number): number => {
  return slideCount > 1 ? slideCount + 2 : slideCount;
};

export const resolveLoopedCarouselPosition = (
  rawPageIndex: number,
  slideCount: number
): LoopedCarouselPosition => {
  if (slideCount <= 1) {
    return { virtualIndex: 0, realIndex: 0, requiresSnap: false };
  }

  if (rawPageIndex <= 0) {
    return {
      virtualIndex: slideCount,
      realIndex: slideCount - 1,
      requiresSnap: true,
    };
  }

  if (rawPageIndex >= slideCount + 1) {
    return { virtualIndex: 1, realIndex: 0, requiresSnap: true };
  }

  return {
    virtualIndex: rawPageIndex,
    realIndex: rawPageIndex - 1,
    requiresSnap: false,
  };
};

/**
 * Starting position for a carousel opened on a given slide. Apps that want a
 * specific slide first should pass `initialIndex` rather than reordering
 * `slides`: the dots read as a position within a fixed list, so reordering
 * makes the first dot mean a different slide on every visit and turns a
 * backward swipe into an arbitrary jump.
 *
 * Out-of-range values clamp to the nearest real slide.
 */
export const resolveInitialCarouselPosition = (
  initialIndex: number,
  slideCount: number
): Pick<LoopedCarouselPosition, "virtualIndex" | "realIndex"> => {
  if (slideCount <= 0) return { virtualIndex: 0, realIndex: 0 };

  const safeIndex = Number.isFinite(initialIndex)
    ? Math.min(Math.max(Math.trunc(initialIndex), 0), slideCount - 1)
    : 0;

  return {
    virtualIndex: slideCount > 1 ? safeIndex + 1 : safeIndex,
    realIndex: safeIndex,
  };
};
