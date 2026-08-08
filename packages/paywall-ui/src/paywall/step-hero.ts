import type { PaywallHeroLayout } from "../types";

/**
 * The hero settings one step renders with. `Paywall` resolves these per step
 * so a two-step paywall can lead with one hero and sell with another.
 */
export interface StepHeroSettings<THero> {
  hero: THero;
  heroHeightRatio: number;
  heroFade: boolean;
  heroLayout: PaywallHeroLayout;
}

/**
 * Resolves the hero settings for the step being rendered.
 *
 * Each field falls back to the top-level value on its own, so an override
 * carrying only a `hero` keeps the shared ratio, fade, and layout. Only
 * `undefined` counts as absent: an override can pass `null` to render no
 * hero node at all, or `false` to turn a shared `heroFade` off for one step.
 *
 * When the override step is not active — or carries nothing — the top-level
 * settings apply unchanged. That is the shared-hero behavior every paywall
 * had before per-step heroes existed.
 */
export const resolveStepHeroSettings = <THero>(
  base: StepHeroSettings<THero>,
  override: Partial<StepHeroSettings<THero>> | undefined,
  isOverrideActive: boolean
): StepHeroSettings<THero> => {
  if (!isOverrideActive || !override) return base;

  return {
    hero: override.hero !== undefined ? override.hero : base.hero,
    heroHeightRatio: override.heroHeightRatio ?? base.heroHeightRatio,
    heroFade: override.heroFade ?? base.heroFade,
    heroLayout: override.heroLayout ?? base.heroLayout,
  };
};

/**
 * Whether a step carries any hero override at all.
 *
 * The hero sits outside the body that animates between steps, so a paywall
 * whose hero is shared must not fade it — the shared hero staying put is what
 * makes the two steps read as one screen. Only a paywall that swaps heroes
 * crossfades, and only then does the swap need covering.
 */
export const hasStepHeroOverride = <THero>(
  override: Partial<StepHeroSettings<THero>> | undefined
): boolean => {
  if (!override) return false;

  return (
    override.hero !== undefined ||
    override.heroHeightRatio !== undefined ||
    override.heroFade !== undefined ||
    override.heroLayout !== undefined
  );
};
