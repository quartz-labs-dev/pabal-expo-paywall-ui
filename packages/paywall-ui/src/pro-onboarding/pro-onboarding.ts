/**
 * Pure Pro onboarding rules, testable without a renderer. The app decides
 * which items are used or new; these only order and compare.
 */

/**
 * The item to suggest next: a NEW item first, then `order`, skipping used
 * items. Null when every item in `order` is used.
 */
export const getNextProOnboardingItemId = ({
  order,
  usedItemIds,
  newItemIds = [],
}: {
  order: string[];
  usedItemIds: string[];
  newItemIds?: string[];
}): string | null => {
  const candidates = order.filter((itemId) => !usedItemIds.includes(itemId));
  return (
    candidates.find((itemId) => newItemIds.includes(itemId)) ??
    candidates[0] ??
    null
  );
};

const compareVersions = (left: string, right: string): number => {
  const a = left.split(".").map(Number);
  const b = right.split(".").map(Number);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const diff = (a[index] ?? 0) - (b[index] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

/**
 * NEW rule: an item added after the version the user last opened the guide
 * on. A user who never opened it compares against `baselineVersion`, so a
 * first visit does not mark everything new.
 */
export const isProOnboardingItemNew = ({
  addedInVersion,
  lastSeenVersion,
  baselineVersion,
}: {
  addedInVersion?: string;
  lastSeenVersion?: string | null;
  baselineVersion: string;
}): boolean =>
  Boolean(addedInVersion) &&
  compareVersions(addedInVersion as string, lastSeenVersion ?? baselineVersion) >
    0;
