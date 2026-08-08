// How far the pinned-layout sheet overlaps up into the fixed hero at
// rest, before the user scrolls.
export const PINNED_HERO_SHEET_OVERLAP = 28;

export const getPinnedContentPaddingTop = (heroHeight: number): number => {
  return Math.max(heroHeight - PINNED_HERO_SHEET_OVERLAP, 0);
};
