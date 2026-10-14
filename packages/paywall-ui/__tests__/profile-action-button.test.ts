import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const sectionSource = readFileSync(
  join(process.cwd(), "src", "profile", "ProfileSubscriptionSection.tsx"),
  "utf8",
);

test("manage subscription defaults to primary and can be secondary", () => {
  assert.match(sectionSource, /manageSubscriptionButtonVariant = "primary"/);
  assert.match(sectionSource, /variant=\{manageSubscriptionButtonVariant\}/);
});

test("the secondary button is a small centered outlined pill", () => {
  assert.match(
    sectionSource,
    /isSecondary && \[styles\.secondaryButton, \{ borderColor: theme\.borderColor \}\]/,
  );
  assert.match(
    sectionSource,
    /secondaryButton: \{\n    alignSelf: "center",\n    borderWidth: 1,\n    minHeight: 30,/,
  );
});

test("plan and renewal sit under the title instead of a separate box", () => {
  assert.match(sectionSource, /hasPlanInfo \? \(\s*<View style=\{styles\.planInfo\}>/);
  assert.doesNotMatch(sectionSource, /planSummary/);
});
