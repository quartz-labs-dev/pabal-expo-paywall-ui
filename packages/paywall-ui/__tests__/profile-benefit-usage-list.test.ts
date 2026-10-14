import assert from "node:assert/strict";
import test from "node:test";

import { isBenefitUsageTableVisible } from "../src/profile/benefit-usage-visibility";

test("a non-collapsible table always shows", () => {
  assert.equal(
    isBenefitUsageTableVisible({
      collapsible: false,
      hasTitle: true,
      isExpanded: false,
    }),
    true
  );
});

test("a collapsible table shows only while expanded", () => {
  const visible = (isExpanded: boolean) =>
    isBenefitUsageTableVisible({ collapsible: true, hasTitle: true, isExpanded });

  assert.equal(visible(false), false);
  assert.equal(visible(true), true);
});

test("a collapsible table without a title has nothing to tap, so it shows", () => {
  assert.equal(
    isBenefitUsageTableVisible({
      collapsible: true,
      hasTitle: false,
      isExpanded: false,
    }),
    true
  );
});
