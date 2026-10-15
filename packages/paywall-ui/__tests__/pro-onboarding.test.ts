import assert from "node:assert/strict";
import test from "node:test";

import {
  getDefaultProOnboardingCopy,
  PAYWALL_TEXT_LOCALES,
} from "../src/locales/localized-paywall-copy";
import {
  getNextProOnboardingItemId,
  getProOnboardingProgress,
  isProOnboardingItemNew,
} from "../src/pro-onboarding/pro-onboarding";

const order = ["theme", "widget", "recap", "health"];

test("suggests a NEW item first, then the order, skipping used items", () => {
  assert.equal(
    getNextProOnboardingItemId({ order, usedItemIds: [], newItemIds: ["health"] }),
    "health"
  );
  assert.equal(
    getNextProOnboardingItemId({ order, usedItemIds: ["theme"] }),
    "widget"
  );
});

test("a used NEW item is not suggested", () => {
  assert.equal(
    getNextProOnboardingItemId({
      order,
      usedItemIds: ["health"],
      newItemIds: ["health"],
    }),
    "theme"
  );
});

test("returns null when everything is used", () => {
  assert.equal(getNextProOnboardingItemId({ order, usedItemIds: order }), null);
});

test("NEW compares against the last seen version or the baseline", () => {
  const isNew = (lastSeenVersion: string | null) =>
    isProOnboardingItemNew({
      addedInVersion: "3.23.0",
      lastSeenVersion,
      baselineVersion: "3.22.0",
    });

  assert.equal(isNew(null), true);
  assert.equal(isNew("3.22.9"), true);
  assert.equal(isNew("3.23.0"), false);
  assert.equal(
    isProOnboardingItemNew({ lastSeenVersion: null, baselineVersion: "1.0.0" }),
    false
  );
});

test("every locale has its own onboarding copy", () => {
  const english = getDefaultProOnboardingCopy("en");
  assert.equal(english.title, "Pro feature guide");
  assert.equal(getDefaultProOnboardingCopy("ko").tryButton, "해보기");

  const keys = [
    "title",
    "nextTitle",
    "tryButton",
    "alreadyUsedButton",
    "inUseBadge",
    "allExplored",
  ] as const;
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultProOnboardingCopy(locale);
    for (const key of keys) {
      assert.ok(copy[key].trim().length > 0, `${locale} ${key}`);
      if (!locale.startsWith("en")) {
        assert.notEqual(copy[key], english[key], `${locale} ${key}`);
      }
    }
  }
});

test("steps show as a folded checklist that keeps the active step and hides when done; the section list keeps In use chips", () => {
  const { readFileSync } = require("node:fs") as typeof import("node:fs");
  const { join } = require("node:path") as typeof import("node:path");
  const read = (file: string) =>
    readFileSync(join(process.cwd(), "src", "pro-onboarding", file), "utf8");

  const guide = read("ProOnboardingGuide.tsx");
  assert.match(guide, /defaultChecklistExpanded = false/);
  assert.match(guide, /steps && steps\.length > 0 \? \(\s*<ProOnboardingChecklist/);

  const checklist = read("ProOnboardingChecklist.tsx");
  assert.match(checklist, /isChecked=\{Boolean\(step\.isDone\)\}/);
  // A tapped open step becomes active; with every step done it hides.
  assert.match(checklist, /step\.id === selectedStepId && !step\.isDone/);
  assert.match(checklist, /if \(!currentStep\) return null;/);
  assert.match(checklist, /accessibilityState=\{\{ expanded: isExpanded \}\}/);
  // Folded, the active step stays put and the other rows shrink away;
  // switching the active step animates its actions and highlight.
  assert.match(checklist, /<CollapsibleView isExpanded=\{isExpanded \|\| isActive\}/);
  assert.match(checklist, /<CollapsibleView isExpanded=\{isActive\}>/);
  assert.match(checklist, /Animated\.multiply\(activeProgress, expandProgress\)/);

  const benefits = readFileSync(
    join(process.cwd(), "src", "profile", "ProfileBenefitUsageList.tsx"),
    "utf8",
  );
  assert.match(benefits, /<CollapsibleView isExpanded=\{isExpanded\}>/);

  const list = read("ProOnboardingSectionList.tsx");
  assert.match(list, /copy\.inUseBadge/);
  assert.match(list, /ChevronLeftIcon/);
});

test("entry card progress counts done steps and finds the first open one", () => {
  const steps = [
    { id: "theme", title: "Theme", isDone: true },
    { id: "widget", title: "Widget" },
    { id: "recap", title: "Recap" },
  ];
  const progress = getProOnboardingProgress(steps);
  assert.equal(progress.doneCount, 1);
  assert.equal(progress.totalCount, 3);
  assert.equal(progress.nextStep?.id, "widget");
  assert.equal(
    getProOnboardingProgress(steps.map((step) => ({ ...step, isDone: true })))
      .nextStep,
    null,
  );
});
