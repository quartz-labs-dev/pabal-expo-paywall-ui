import assert from "node:assert/strict";
import test from "node:test";

import { defaultPaywallTheme, mergePaywallTheme } from "../src/shared/theme";

test("default theme includes design tokens", () => {
  assert.equal(defaultPaywallTheme.cardBorderRadius, 16);
  assert.equal(defaultPaywallTheme.buttonBorderRadius, 999);
  assert.equal(defaultPaywallTheme.titleFontSize, 28);
});

test("merge keeps defaults when overrides omit tokens", () => {
  const theme = mergePaywallTheme({ accentColor: "#FF00FF" });
  assert.equal(theme.accentColor, "#FF00FF");
  assert.equal(theme.cardBorderRadius, 16);
  assert.equal(theme.buttonBorderRadius, 999);
  assert.equal(theme.titleFontSize, 28);
});

test("merge lets apps restore the legacy shape language", () => {
  const theme = mergePaywallTheme({
    cardBorderRadius: 8,
    buttonBorderRadius: 8,
    titleFontSize: 26,
  });
  assert.equal(theme.cardBorderRadius, 8);
  assert.equal(theme.buttonBorderRadius, 8);
  assert.equal(theme.titleFontSize, 26);
});
