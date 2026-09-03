import assert from "node:assert/strict";
import test from "node:test";

import {
  getInitialPaywallStep,
  usesValueStep,
} from "../src/paywall/paywall-step";

const VALUE_STEP = { title: "Why Pro" };

test("two-step mode needs a value step to have one", () => {
  assert.equal(usesValueStep("twoStep", VALUE_STEP), true);
  assert.equal(usesValueStep("twoStep", undefined), false);
});

test("single-step mode ignores a value step it was handed", () => {
  assert.equal(usesValueStep("singleStep", VALUE_STEP), false);
});

test("a paywall opens on the first step it actually has", () => {
  assert.equal(getInitialPaywallStep(true), "value");
  assert.equal(getInitialPaywallStep(false), "purchase");
});
