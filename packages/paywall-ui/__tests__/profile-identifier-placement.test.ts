import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { getProfileIdentifierPlacement } from "../src/profile/identifier-placement";

const sectionSource = readFileSync(
  join(process.cwd(), "src", "profile", "ProfileSubscriptionSection.tsx"),
  "utf8",
);

test("IDs share the row with a secondary manage button", () => {
  assert.equal(
    getProfileIdentifierPlacement({
      hasIdentifiers: true,
      manageSubscriptionButtonVariant: "secondary",
      showsManageSubscription: true,
    }),
    "inline",
  );
});

test("a primary manage button or no manage button keeps IDs below the card", () => {
  assert.equal(
    getProfileIdentifierPlacement({
      hasIdentifiers: true,
      manageSubscriptionButtonVariant: "primary",
      showsManageSubscription: true,
    }),
    "below",
  );
  assert.equal(
    getProfileIdentifierPlacement({
      hasIdentifiers: true,
      manageSubscriptionButtonVariant: "secondary",
      showsManageSubscription: false,
    }),
    "below",
  );
});

test("no identifiers, no placement", () => {
  assert.equal(
    getProfileIdentifierPlacement({
      hasIdentifiers: false,
      manageSubscriptionButtonVariant: "secondary",
      showsManageSubscription: true,
    }),
    "none",
  );
});

test("inline IDs open inside the card, borderless, with a matching toggle size", () => {
  assert.match(
    sectionSource,
    /<View style=\{styles\.manageRow\}>\s*<ProfileIdentifiersToggle[\s\S]*?isCompact[\s\S]*?<\/View>\s*<ProfileIdentifiersList\s*expansion=\{identifierExpansion\}\s*isEmbedded/,
  );
});
