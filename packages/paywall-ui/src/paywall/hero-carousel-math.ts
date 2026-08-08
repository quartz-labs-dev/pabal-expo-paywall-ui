export const getSlideIndexFromOffset = (
  offsetX: number,
  slideWidth: number,
  slideCount: number
): number => {
  if (slideWidth <= 0 || slideCount <= 0) return 0;
  const index = Math.round(offsetX / slideWidth);
  return Math.min(Math.max(index, 0), slideCount - 1);
};

export const getNextSlideIndex = (
  currentIndex: number,
  slideCount: number
): number => {
  if (slideCount <= 0) return 0;
  return (currentIndex + 1) % slideCount;
};
