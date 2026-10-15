import type { ProfileActionButtonVariant } from "../types";

export type ProfileIdentifierPlacement = "none" | "inline" | "below";

/**
 * Where the "Show IDs" toggle goes. Next to a quiet (secondary) "Manage
 * subscription" pill it shares one row: IDs on the left, manage on the right.
 * A full-width primary button leaves no room, so the toggle stays below the
 * card. Pure so the branch can be tested without a renderer.
 */
export const getProfileIdentifierPlacement = ({
  hasIdentifiers,
  manageSubscriptionButtonVariant,
  showsManageSubscription,
}: {
  hasIdentifiers: boolean;
  manageSubscriptionButtonVariant: ProfileActionButtonVariant;
  showsManageSubscription: boolean;
}): ProfileIdentifierPlacement => {
  if (!hasIdentifiers) return "none";
  return showsManageSubscription && manageSubscriptionButtonVariant === "secondary"
    ? "inline"
    : "below";
};
