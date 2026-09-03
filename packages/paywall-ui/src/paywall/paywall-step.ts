import type { PaywallStep, PaywallStepMode, PaywallValueStep } from "../types";

/**
 * Whether the paywall actually runs two steps.
 *
 * `stepMode: "twoStep"` alone is not enough: the value step needs its own
 * copy to show, so a two-step paywall without a `valueStep` stays on the
 * purchase step rather than rendering an empty one.
 */
export const usesValueStep = (
  stepMode: PaywallStepMode,
  valueStep: PaywallValueStep | undefined
): boolean => stepMode === "twoStep" && Boolean(valueStep);

/**
 * The step a paywall opens on. A paywall with no value step starts — and
 * stays — on `purchase`, which is also where it lands back after the
 * two-step mode is switched off mid-mount.
 */
export const getInitialPaywallStep = (
  hasValueStep: boolean
): PaywallStep => (hasValueStep ? "value" : "purchase");
