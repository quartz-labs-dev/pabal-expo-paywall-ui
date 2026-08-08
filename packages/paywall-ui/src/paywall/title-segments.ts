import type { PaywallTitleSegment } from "../types";

export interface NormalizedTitleSegment {
  text: string;
  emphasized: boolean;
}

export const normalizeTitleSegments = (
  segments: PaywallTitleSegment[]
): NormalizedTitleSegment[] => {
  return segments
    .map((segment) =>
      typeof segment === "string"
        ? { text: segment, emphasized: false }
        : { text: segment.text, emphasized: Boolean(segment.emphasized) }
    )
    .filter((segment) => segment.text.length > 0);
};

export const getTitleSegmentsText = (
  segments: PaywallTitleSegment[]
): string => {
  return normalizeTitleSegments(segments)
    .map((segment) => segment.text)
    .join("");
};
