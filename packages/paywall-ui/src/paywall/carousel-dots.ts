// The carousel renders on a transparent background, so its dots sit on
// whatever the paywall's `backgroundColor` is. The package theme defaults to a
// dark paywall, which is why the inactive dot defaults to translucent white.
// An app on a light background can not see that dot and has to pass its own.
export const DEFAULT_INACTIVE_CAROUSEL_DOT_COLOR =
  "rgba(255, 255, 255, 0.28)";

export const INACTIVE_CAROUSEL_DOT_WIDTH = 6;
export const ACTIVE_CAROUSEL_DOT_WIDTH = 18;

export interface CarouselDotAppearance {
  backgroundColor: string;
  width: number;
}

/**
 * The active dot carries the accent color and stretches into a pill; the rest
 * stay round. Only the inactive color is configurable — the active one is the
 * accent by definition, and an app that wants a different one is really
 * asking for a different `accentColor`.
 */
export const resolveCarouselDotAppearance = (
  isActive: boolean,
  accentColor: string,
  inactiveDotColor: string = DEFAULT_INACTIVE_CAROUSEL_DOT_COLOR
): CarouselDotAppearance =>
  isActive
    ? { backgroundColor: accentColor, width: ACTIVE_CAROUSEL_DOT_WIDTH }
    : {
        backgroundColor: inactiveDotColor,
        width: INACTIVE_CAROUSEL_DOT_WIDTH,
      };
