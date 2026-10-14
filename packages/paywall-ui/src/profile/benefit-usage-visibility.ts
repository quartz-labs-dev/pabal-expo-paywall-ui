/**
 * A collapsible table needs a title to tap; without one the table always
 * shows. Pure so the branch can be tested without a renderer.
 */
export const isBenefitUsageTableVisible = ({
  collapsible,
  hasTitle,
  isExpanded,
}: {
  collapsible: boolean;
  hasTitle: boolean;
  isExpanded: boolean;
}): boolean => !(collapsible && hasTitle) || isExpanded;
