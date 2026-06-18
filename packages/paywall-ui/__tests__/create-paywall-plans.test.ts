import {
  createPaywallPlans,
  getDefaultSelectedPlanId,
} from "../src/paywall/create-paywall-plans";
import {
  PAYWALL_TEXT_LOCALES,
  getDefaultPaywallCopy,
  getDefaultPaywallPlanOptions,
  getDefaultProfilePlanLabel,
  getDefaultProfileIdentifiersCopy,
  getDefaultProfileSubscriptionCopy,
  resolvePaywallTextLocale,
} from "../src/locales/localized-paywall-copy";
import {
  ONBOARDING_TEXT_LOCALES,
  getDefaultOnboardingCopy,
  getDefaultPermissionPromptCopy,
} from "../src/locales/onboarding";
import {
  getDefaultOnboardingAcquisitionSourceText,
  ONBOARDING_ACQUISITION_SOURCE_TEXT_LOCALES,
} from "../src/locales/onboarding/acquisition-source";
import {
  formatOnboardingNicknameWelcomeTitle,
  getDefaultOnboardingNicknameInputText,
  ONBOARDING_NICKNAME_INPUT_TEXT_LOCALES,
} from "../src/locales/onboarding/nickname-input";
import { UNIFIED_LOCALES } from "../src/locales/unified-locales";
import type { PurchasesPackageLike } from "../src/types";
import type {
  PaywallReviewSectionText,
  PaywallValueStepText,
} from "../src/locales/paywall";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const makePackage = (
  identifier: string,
  price: number,
  priceString: string,
  productOverrides: Partial<PurchasesPackageLike["product"]> = {},
): PurchasesPackageLike => ({
  identifier,
  product: {
    price,
    priceString,
    description: `${identifier} description`,
    ...productOverrides,
  },
});

test("keeps weekly, monthly, annual, and lifetime packages by default", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_weekly", 1.99, "$1.99"),
    makePackage("$rc_monthly", 4.99, "$4.99"),
    makePackage("$rc_annual", 29.99, "$29.99"),
    makePackage("$rc_lifetime", 99.99, "$99.99"),
  ]);

  assert.deepEqual(plans.map((plan) => plan.id), [
    "$rc_annual",
    "$rc_lifetime",
    "$rc_monthly",
    "$rc_weekly",
  ]);
});

test("marks annual as recommended by default", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_monthly", 4.99, "$4.99"),
    makePackage("$rc_annual", 29.99, "$29.99"),
  ]);

  assert.equal(
    plans.find((plan) => plan.period === "annual")?.isRecommended,
    true,
  );
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_annual");
});

test("falls back to the first available plan when recommended period is missing", () => {
  const plans = createPaywallPlans([makePackage("$rc_monthly", 4.99, "$4.99")]);

  assert.equal(getDefaultSelectedPlanId(plans), "$rc_monthly");
});

test("preserves the raw package for app-owned purchase callbacks", () => {
  const monthlyPackage = makePackage("$rc_monthly", 4.99, "$4.99");
  const plans = createPaywallPlans([monthlyPackage]);

  assert.equal(plans[0]?.rawPackage, monthlyPackage);
});

test("supports app-specific package identifiers", () => {
  const plans = createPaywallPlans(
    [
      makePackage("weekly-pro", 1.99, "$1.99"),
      makePackage("monthly-pro", 6.99, "$6.99"),
      makePackage("yearly-pro", 49.99, "$49.99"),
      makePackage("forever-pro", 99.99, "$99.99"),
    ],
    {
      weeklyPackageIds: ["weekly-pro"],
      annualPackageIds: ["yearly-pro"],
      lifetimePackageIds: ["forever-pro"],
      monthlyPackageIds: ["monthly-pro"],
    },
  );

  assert.deepEqual(plans.map((plan) => plan.period), [
    "annual",
    "lifetime",
    "monthly",
    "weekly",
  ]);
});

test("supports a single weekly package offering", () => {
  const plans = createPaywallPlans([makePackage("$rc_weekly", 1.99, "$1.99")]);

  assert.deepEqual(plans.map((plan) => plan.period), ["weekly"]);
  assert.equal(plans[0]?.title, "Weekly");
  assert.equal(plans[0]?.pricePerPeriodText, "$1.99 / week");
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_weekly");
});

test("supports a single lifetime package offering", () => {
  const plans = createPaywallPlans([makePackage("$rc_lifetime", 99.99, "$99.99")]);

  assert.deepEqual(plans.map((plan) => plan.period), ["lifetime"]);
  assert.equal(plans[0]?.title, "Lifetime");
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_lifetime");
});

test("uses yearly as the default annual plan title", () => {
  const plans = createPaywallPlans([makePackage("$rc_annual", 29.99, "$29.99")]);

  assert.equal(plans[0]?.title, "Yearly");
});

test("supports custom lifetime plan copy", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_monthly", 10, "$10.00"),
      makePackage("$rc_lifetime", 149.99, "$149.99"),
    ],
    {
      lifetimeBadgeText: "One-time payment",
      lifetimeTitle: "Lifetime access",
    },
  );

  const lifetimePlan = plans.find((plan) => plan.period === "lifetime");

  assert.equal(lifetimePlan?.badgeText, "One-time payment");
  assert.equal(lifetimePlan?.title, "Lifetime access");
  assert.equal(lifetimePlan?.isRecommended, false);
  assert.equal(getDefaultSelectedPlanId(plans), "$rc_lifetime");
});

test("supports selected-only plan descriptions from app config", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_weekly", 1.99, "$1.99"),
      makePackage("$rc_monthly", 4.99, "$4.99"),
      makePackage("$rc_annual", 29.99, "$29.99"),
      makePackage("$rc_lifetime", 99.99, "$99.99"),
    ],
    {
      annualSelectedDescription: "About 90% less than a guided aurora tour.",
      lifetimeSelectedDescription: "One payment, no renewal.",
      monthlySelectedDescription: "Flexible access without annual commitment.",
      weeklySelectedDescription: "Try Pro one week at a time.",
    },
  );

  assert.equal(
    plans.find((plan) => plan.period === "annual")?.selectedDescription,
    "About 90% less than a guided aurora tour.",
  );
  assert.equal(
    plans.find((plan) => plan.period === "lifetime")?.selectedDescription,
    "One payment, no renewal.",
  );
  assert.equal(
    plans.find((plan) => plan.period === "monthly")?.selectedDescription,
    "Flexible access without annual commitment.",
  );
  assert.equal(
    plans.find((plan) => plan.period === "weekly")?.selectedDescription,
    "Try Pro one week at a time.",
  );
});

test("formats high-value annual prices without cents", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_annual", 49900, "KRW 49,900"),
  ]);

  assert.equal(plans[0]?.monthlyPriceText, "KRW 4,158 / mo");
});

test("adds annual discount text compared to monthly pricing", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_monthly", 10, "$10.00"),
    makePackage("$rc_annual", 80, "$80.00"),
  ]);

  assert.equal(
    plans.find((plan) => plan.period === "annual")?.discountText,
    "Save 33%",
  );
  assert.equal(
    plans.find((plan) => plan.period === "annual")?.badgeText,
    "Save 33%",
  );
  assert.equal(
    plans.find((plan) => plan.period === "monthly")?.discountText,
    undefined,
  );
});

test("supports localized annual pricing copy", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_weekly", 3000, "KRW 3,000"),
      makePackage("$rc_monthly", 10000, "KRW 10,000"),
      makePackage("$rc_annual", 80000, "KRW 80,000"),
    ],
    {
      formatDiscountText: (discountPercentage) => `${discountPercentage}% 할인`,
      formatMonthlyPriceText: (monthlyPriceText) => `월 ${monthlyPriceText}`,
    },
  );

  const annualPlan = plans.find((plan) => plan.period === "annual");

  assert.equal(annualPlan?.discountText, "33% 할인");
  assert.equal(annualPlan?.badgeText, "33% 할인");
  assert.equal(annualPlan?.monthlyPriceText, "월 KRW 6,667");
});

test("adds localized price-per-period copy for trial disclosures", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_weekly", 3000, "KRW 3,000"),
      makePackage("$rc_monthly", 10000, "KRW 10,000"),
      makePackage("$rc_annual", 80000, "KRW 80,000"),
    ],
    getDefaultPaywallPlanOptions("ko-KR"),
  );

  assert.equal(
    plans.find((plan) => plan.period === "weekly")?.pricePerPeriodText,
    "KRW 3,000 / 주",
  );
  assert.equal(
    plans.find((plan) => plan.period === "monthly")?.pricePerPeriodText,
    "KRW 10,000 / 월",
  );
  assert.equal(
    plans.find((plan) => plan.period === "annual")?.pricePerPeriodText,
    "KRW 80,000 / 년",
  );
});

test("uses product price-per-period copy when provided", () => {
  const plans = createPaywallPlans([
    makePackage("$rc_annual", 29.99, "$29.99", {
      price_per_period: "$29.99 per year",
    }),
  ]);

  assert.equal(plans[0]?.pricePerPeriodText, "$29.99 per year");
});

test("formats free-trial durations with singular and plural copy", () => {
  const enCopy = getDefaultPaywallCopy("en-US", { title: "Pro" });
  const koCopy = getDefaultPaywallCopy("ko-KR", { title: "Pro" });

  assert.equal(
    enCopy.formatTrialPriceDisclosure?.(
      { value: 1, unit: "day" },
      "$4.99 / month",
    ),
    "1 day free, then $4.99 / month",
  );
  assert.equal(
    enCopy.formatTrialPriceDisclosure?.(
      { value: 2, unit: "week" },
      "$29.99 / year",
    ),
    "2 weeks free, then $29.99 / year",
  );
  assert.equal(
    enCopy.formatTrialIncludedTitle?.({ value: 7, unit: "day" }),
    "7-Day Free Trial Included",
  );
  assert.equal(
    koCopy.formatTrialPriceDisclosure?.(
      { value: 2, unit: "week" },
      "KRW 80,000 / 년",
    ),
    "2주 무료, 이후 KRW 80,000 / 년",
  );
});

test("formats default purchase CTA from trial eligibility and selected price", () => {
  const enCopy = getDefaultPaywallCopy("en-US", { title: "Pro" });
  const koCopy = getDefaultPaywallCopy("ko-KR", { title: "Pro" });
  const annualPlan = createPaywallPlans([
    makePackage("$rc_annual", 29.99, "$29.99"),
  ])[0];

  assert.ok(annualPlan);
  assert.equal(
    enCopy.formatPurchaseButtonLabel?.({
      hasFreeTrial: true,
      plan: annualPlan,
      trialDuration: { value: 7, unit: "day" },
    }),
    "7 days free, then $29.99",
  );
  assert.equal(
    enCopy.formatPurchaseButtonLabel?.({
      hasFreeTrial: false,
      plan: annualPlan,
    }),
    "Start for $29.99",
  );
  assert.equal(
    koCopy.formatPurchaseButtonLabel?.({
      hasFreeTrial: true,
      plan: annualPlan,
      trialDuration: { value: 7, unit: "day" },
    }),
    "7일 무료, 이후 $29.99",
  );
  assert.equal(
    koCopy.formatPurchaseButtonLabel?.({
      hasFreeTrial: false,
      plan: annualPlan,
    }),
    "$29.99으로 시작해보세요",
  );
});

test("provides localized default plan copy from locale strings", () => {
  const plans = createPaywallPlans(
    [
      makePackage("$rc_weekly", 3000, "KRW 3,000"),
      makePackage("$rc_monthly", 10000, "KRW 10,000"),
      makePackage("$rc_annual", 80000, "KRW 80,000"),
      makePackage("$rc_lifetime", 120000, "KRW 120,000"),
    ],
    getDefaultPaywallPlanOptions("ko-KR"),
  );

  const annualPlan = plans.find((plan) => plan.period === "annual");
  const lifetimePlan = plans.find((plan) => plan.period === "lifetime");
  const weeklyPlan = plans.find((plan) => plan.period === "weekly");

  assert.equal(resolvePaywallTextLocale("pt-BR"), "ptBr");
  assert.equal(resolvePaywallTextLocale("zh-Hant"), "zhHant");
  assert.equal(annualPlan?.title, "연간");
  assert.equal(annualPlan?.badgeText, "33% 할인");
  assert.equal(annualPlan?.monthlyPriceText, "월 KRW 6,667");
  assert.equal(lifetimePlan?.badgeText, "일회성 구매");
  assert.equal(weeklyPlan?.title, "주간");
  assert.equal(weeklyPlan?.pricePerPeriodText, "KRW 3,000 / 주");
  assert.equal(getDefaultProfilePlanLabel("weekly", "ko-KR"), "주간 Pro");
  assert.equal(
    getDefaultPaywallCopy("ko-KR", { title: "Pro" }).continueButton,
    "계속",
  );
});

test("keeps first-step next button copy package-owned", () => {
  const copy = getDefaultPaywallCopy("ko-KR", {
    title: "Pro",
    nextButton: "Custom",
    nextButtonAccessibilityLabel: "Custom accessibility label",
  } as Parameters<typeof getDefaultPaywallCopy>[1] & PaywallValueStepText);
  const valueStepCopy = copy as typeof copy & PaywallValueStepText;

  assert.equal(valueStepCopy.nextButton, "다음");
  assert.equal(
    valueStepCopy.nextButtonAccessibilityLabel,
    "요금제 선택으로 계속",
  );
});

test("keeps purchase-step review section title package-owned", () => {
  const copy = getDefaultPaywallCopy("ko-KR", {
    title: "Pro",
    reviewSectionTitle: "Custom reviews",
  } as Parameters<typeof getDefaultPaywallCopy>[1] & PaywallReviewSectionText);
  const reviewCopy = copy as typeof copy & PaywallReviewSectionText;

  assert.equal(reviewCopy.reviewSectionTitle, "사용자 리뷰");
});

test("provides localized support messages for paywall and profile", () => {
  const paywallCopy = getDefaultPaywallCopy("ko-KR", { title: "Pro" });
  const customPaywallCopy = getDefaultPaywallCopy("ko-KR", {
    title: "Pro",
    supportMessage: "Your subscription supports future updates.",
  });
  const profileCopy = getDefaultProfileSubscriptionCopy("ko-KR", {
    productName: "Pro",
  });

  assert.equal(
    paywallCopy.supportMessage,
    "유료 구독은 이 앱을 계속 만들고 개선하는 데 큰 도움이 됩니다. 구독하면 더 편한 기능, 안정적인 서비스, 꾸준한 업데이트를 먼저 누릴 수 있어요.",
  );
  assert.equal(paywallCopy.supportMessageLabel, "개발자의 말");
  assert.equal(
    customPaywallCopy.supportMessage,
    "Your subscription supports future updates.",
  );
  assert.equal(
    profileCopy.supportMessage,
    "유료 구독은 이 앱을 계속 만들고 개선하는 데 큰 도움이 됩니다. 더 안정적인 서비스와 꾸준한 업데이트로 보답하겠습니다. 감사합니다!",
  );
  assert.equal(profileCopy.supportMessageLabel, "개발자의 말");
});

test("localizes support messages for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const paywallCopy = getDefaultPaywallCopy(locale, { title: "Pro" });
    const profileCopy = getDefaultProfileSubscriptionCopy(locale, {
      productName: "Pro",
    });

    assert.ok(paywallCopy.supportMessage, locale);
    assert.ok(paywallCopy.supportMessageLabel, locale);
    assert.ok(profileCopy.supportMessage, locale);
    assert.ok(profileCopy.supportMessageLabel, locale);

    if (locale === "en") continue;

    assert.notEqual(paywallCopy.supportMessageLabel, "Developer's note", locale);
    assert.notEqual(profileCopy.supportMessageLabel, "Developer's note", locale);
    assert.notEqual(
      paywallCopy.supportMessage,
      "Your subscription helps keep this app growing. Subscribers get smoother features, a more stable service, and steady updates first.",
      locale,
    );
    assert.notEqual(
      profileCopy.supportMessage,
      "Your subscription helps keep this app growing. I will keep returning that support with a more stable service and steady updates. Thank you!",
      locale,
    );
  }
});

test("localizes legal renewal copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });

    assert.ok(copy.legalPrefix, locale);
    assert.match(copy.legalPrefix, /[.!?。！？։।።။។។۔؟]$/u, locale);

    if (locale === "en") {
      assert.equal(
        copy.legalPrefix,
        "Payments are securely managed by the store. Automatic payments can be cancelled within 7 days. If automatic renewal is not turned off at least 24 hours before the subscription period ends, your account will be charged automatically.",
      );
      continue;
    }

    if (locale === "ko") {
      assert.equal(
        copy.legalPrefix,
        "결제는 스토어에서 안전하게 관리됩니다. 자동 결제는 7일 내 취소 가능합니다. 구독기간 만료 시점으로부터 24시간 전까지 자동 갱신을 해지하지 않으면 사용자의 계정으로 자동 청구됩니다.",
      );
    }

    assert.notEqual(
      copy.legalPrefix,
      "Payments are securely managed by the store. Automatic payments can be cancelled within 7 days. If automatic renewal is not turned off at least 24 hours before the subscription period ends, your account will be charged automatically.",
      locale,
    );
  }
});

test("resolves every unified non-English locale without falling back to English", () => {
  for (const locale of UNIFIED_LOCALES) {
    const resolvedLocale = resolvePaywallTextLocale(locale);
    const isEnglishLocale = locale.toLowerCase().startsWith("en");

    if (isEnglishLocale) {
      assert.equal(resolvedLocale, "en", `${locale} resolved to ${resolvedLocale}`);
      continue;
    }

    assert.notEqual(resolvedLocale, "en", `${locale} resolved to ${resolvedLocale}`);
  }

  assert.equal(resolvePaywallTextLocale("fa-AE"), "fa");
  assert.equal(resolvePaywallTextLocale("no-NO"), "nb");
  assert.equal(resolvePaywallTextLocale("zh-HK"), "zhHant");
});

test("localizes continue button copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });

    if (locale === "en") {
      assert.equal(copy.continueButton, "Continue");
      continue;
    }

    assert.notEqual(copy.continueButton, "Continue", locale);
  }
});

test("localizes weekly plan copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const plans = createPaywallPlans(
      [makePackage("$rc_weekly", 1.99, "$1.99")],
      getDefaultPaywallPlanOptions(locale),
    );

    const weeklyPlan = plans[0];

    assert.equal(weeklyPlan?.period, "weekly", locale);
    assert.ok(weeklyPlan?.title, locale);
    assert.ok(weeklyPlan?.pricePerPeriodText, locale);
    assert.ok(getDefaultProfilePlanLabel("weekly", locale), locale);

    if (locale === "en") {
      assert.equal(weeklyPlan.title, "Weekly");
      assert.equal(weeklyPlan.pricePerPeriodText, "$1.99 / week");
      continue;
    }

    assert.notEqual(weeklyPlan.title, "Weekly", locale);
    assert.notEqual(getDefaultProfilePlanLabel("weekly", locale), "Weekly Pro");
  }
});

test("localizes onboarding copy for every non-English onboarding locale", () => {
  for (const locale of ONBOARDING_TEXT_LOCALES) {
    const copy = getDefaultOnboardingCopy(locale);

    if (locale === "en") {
      assert.equal(copy.continueButton, "Continue");
      assert.equal(copy.doneButton, "Done");
      assert.equal(copy.landingTitle, "Welcome to\nPost Black Belt!");
      assert.equal(copy.loginLabel, "Log in");
      assert.equal(copy.loginPrompt, "Already have an account? ");
      assert.equal(copy.mockTitle, "Do not memorize\nhundreds of techniques.");
      assert.equal(copy.notificationNowLabel, "now");
      assert.equal(copy.notNowButton, "Not now");
      assert.equal(copy.returnButton, "Return");
      assert.equal(copy.startButton, "Get started");
      continue;
    }

    assert.notEqual(copy.continueButton, "Continue", locale);
    assert.notEqual(copy.doneButton, "Done", locale);
    assert.notEqual(copy.landingTitle, "Welcome to\nPost Black Belt!", locale);
    assert.notEqual(copy.loginLabel, "Log in", locale);
    assert.notEqual(copy.loginPrompt, "Already have an account? ", locale);
    assert.notEqual(
      copy.mockTitle,
      "Do not memorize\nhundreds of techniques.",
      locale,
    );
    assert.notEqual(copy.notificationNowLabel, "now", locale);
    assert.notEqual(copy.notNowButton, "Not now", locale);
    assert.notEqual(copy.returnButton, "Return", locale);
    assert.notEqual(copy.startButton, "Get started", locale);
  }
});

test("localizes permission prompt buttons for every non-English onboarding locale", () => {
  for (const locale of ONBOARDING_TEXT_LOCALES) {
    const copy = getDefaultPermissionPromptCopy(locale);

    if (locale === "en") {
      assert.equal(copy.allowButton, "Allow");
      assert.equal(copy.denyButton, "Don't Allow");
      continue;
    }

    assert.notEqual(copy.allowButton, "Allow", locale);
    assert.notEqual(copy.denyButton, "Don't Allow", locale);
  }

  assert.deepEqual(getDefaultPermissionPromptCopy("ko-KR"), {
    allowButton: "허용",
    denyButton: "허용 안 함",
  });
  assert.deepEqual(getDefaultPermissionPromptCopy("zh-HK"), {
    allowButton: "允許",
    denyButton: "不允許",
  });
});

test("localizes onboarding acquisition source copy for every non-English locale", () => {
  for (const locale of ONBOARDING_ACQUISITION_SOURCE_TEXT_LOCALES) {
    const text = getDefaultOnboardingAcquisitionSourceText(locale);

    if (locale === "en") {
      assert.equal(text.title, "Where did you hear about us?");
      assert.equal(text.friendOrFamily, "Friend or family");
      assert.equal(text.other, "Other");
      assert.equal(text.threads, "Threads");
      assert.equal(text.x, "X (formerly Twitter)");
      continue;
    }

    assert.notEqual(text.title, "Where did you hear about us?", locale);
    assert.notEqual(text.friendOrFamily, "Friend or family", locale);
    assert.notEqual(text.other, "Other", locale);
    assert.equal(text.threads, "Threads", locale);
    assert.notEqual(text.x, "X (formerly Twitter)", locale);
  }
});

test("orders onboarding acquisition source options with Threads second and TikTok after X", () => {
  const acquisitionSourceModule = readFileSync(
    join(process.cwd(), "src", "onboarding", "acquisition-sources.tsx"),
    "utf8",
  );
  const optionIdMatches = acquisitionSourceModule.matchAll(/id: "([^"]+)"/gu);

  assert.deepEqual(
    Array.from(optionIdMatches, (match) => match[1]),
    [
      "instagram",
      "threads",
      "youtube",
      "google",
      "store",
      "x",
      "tiktok",
      "friend-or-family",
      "other",
    ],
  );
});

test("localizes onboarding nickname input copy for every non-English locale", () => {
  for (const locale of ONBOARDING_NICKNAME_INPUT_TEXT_LOCALES) {
    const text = getDefaultOnboardingNicknameInputText(locale);

    if (locale === "en") {
      assert.equal(text.title, "What should we call you?");
      assert.equal(text.inputPlaceholder, "Nickname");
      assert.equal(text.inputAccessibilityLabel, "Nickname");
      assert.equal(text.welcomeTitle, "Welcome, {nickname}!");
      continue;
    }

    assert.notEqual(text.title, "What should we call you?", locale);
    assert.notEqual(text.inputPlaceholder, "Nickname", locale);
    assert.notEqual(text.welcomeTitle, "Welcome, {nickname}!", locale);
    assert.match(text.welcomeTitle, /!$/u, locale);
  }

  assert.deepEqual(getDefaultOnboardingNicknameInputText("ko-KR"), {
    inputAccessibilityLabel: "닉네임",
    inputPlaceholder: "닉네임",
    title: "어떻게 불러드릴까요?",
    welcomeTitle: "환영합니다 {nickname}님!",
  });
  assert.equal(
    formatOnboardingNicknameWelcomeTitle("환영합니다 {nickname}님!", "길동"),
    "환영합니다 길동님!",
  );
});

test("keeps onboarding locale copy split by language file", () => {
  const localeFileName = (locale: string) => {
    if (locale === "ptBr") return "pt-br";
    if (locale === "zhHans") return "zh-hans";
    if (locale === "zhHant") return "zh-hant";

    return locale;
  };
  const onboardingIndexSource = readFileSync(
    join(process.cwd(), "src", "locales", "onboarding", "index.ts"),
    "utf8",
  );

  assert.doesNotMatch(
    onboardingIndexSource,
    /const ONBOARDING_TEXT_BY_LOCALE = \{\n\s+af:/,
  );
  assert.deepEqual(ONBOARDING_TEXT_LOCALES, PAYWALL_TEXT_LOCALES);

  for (const locale of ONBOARDING_TEXT_LOCALES) {
    assert.equal(
      existsSync(
        join(
          process.cwd(),
          "src",
          "locales",
          "onboarding",
          `${localeFileName(locale)}.ts`,
        ),
      ),
      true,
      locale,
    );
  }
});

test("provides localized onboarding acquisition source labels", () => {
  const text = getDefaultOnboardingAcquisitionSourceText("ko-KR");

  assert.equal(text.title, "어디에서 저희를 알게 되셨나요?");
  assert.equal(text.appStore, "App Store");
  assert.equal(text.playStore, "Play Store");
  assert.equal(text.threads, "Threads");
  assert.equal(text.tiktok, "TikTok");
  assert.equal(text.x, "X(구 Twitter)");
  assert.equal(text.friendOrFamily, "친구 또는 가족");
  assert.equal(text.other, "기타");
});

test("localizes review section title for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });
    const reviewCopy = copy as typeof copy & PaywallReviewSectionText;

    if (locale === "en") {
      assert.equal(reviewCopy.reviewSectionTitle, "User reviews");
      continue;
    }

    assert.notEqual(reviewCopy.reviewSectionTitle, "User reviews", locale);
  }
});

test("localizes profile identifier copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultProfileIdentifiersCopy(locale);

    if (locale === "en") {
      assert.equal(copy.copyButtonAccessibilityLabel, "Copy IDs");
      assert.equal(copy.hideButtonLabel, "Hide IDs");
      assert.equal(copy.showButtonLabel, "Show IDs");
      continue;
    }

    assert.match(copy.copyButtonAccessibilityLabel, /IDs/, locale);
    assert.match(copy.hideButtonLabel, /IDs/, locale);
    assert.match(copy.showButtonLabel, /IDs/, locale);
  }
});

test("omits the free profile status badge by default", () => {
  const copy = getDefaultProfileSubscriptionCopy("en", { productName: "Pro" });

  assert.equal(copy.subscribedBadge, "PRO");
  assert.equal(copy.notSubscribedBadge, undefined);
});

test("localizes profile upgrade button copy for every paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultProfileSubscriptionCopy(locale, {
      productName: "Pro",
    });

    assert.ok(copy.upgradeButton?.includes("Pro"), locale);
    assert.notEqual(copy.upgradeButton, "Pro", locale);
  }
});

test("localizes generated paywall copy for every non-English paywall locale", () => {
  for (const locale of PAYWALL_TEXT_LOCALES) {
    const copy = getDefaultPaywallCopy(locale, { title: "Pro" });
    const plans = createPaywallPlans(
      [
        makePackage("$rc_monthly", 10, "$10.00"),
        makePackage("$rc_annual", 80, "$80.00"),
      ],
      getDefaultPaywallPlanOptions(locale),
    );
    const trialTitle = copy.formatTrialIncludedTitle?.({
      value: 2,
      unit: "week",
    });
    const trialDisclosure = copy.formatTrialPriceDisclosure?.(
      { value: 2, unit: "week" },
      "$80.00",
    );
    const trialCta = copy.formatPurchaseButtonLabel?.({
      hasFreeTrial: true,
      plan: plans[0]!,
      trialDuration: { value: 2, unit: "week" },
    });
    const paidCta = copy.formatPurchaseButtonLabel?.({
      hasFreeTrial: false,
      plan: plans[0]!,
    });
    const annualPlan = plans.find((plan) => plan.period === "annual");
    const monthlyPlan = plans.find((plan) => plan.period === "monthly");

    assert.ok(copy.closeButtonAccessibilityLabel, locale);
    assert.ok(copy.trialIncludedDescription, locale);
    assert.ok(copy.trialNoPaymentDueNow, locale);
    assert.ok(trialTitle, locale);
    assert.ok(trialDisclosure, locale);
    assert.ok(trialCta, locale);
    assert.ok(paidCta, locale);
    assert.ok(annualPlan?.monthlyPriceText, locale);
    assert.ok(annualPlan?.pricePerPeriodText, locale);
    assert.ok(monthlyPlan?.pricePerPeriodText, locale);

    if (locale === "en") continue;

    assert.notEqual(copy.closeButtonAccessibilityLabel, "Close paywall", locale);
    assert.doesNotMatch(
      copy.trialIncludedDescription ?? "",
      /Cancel anytime/,
      locale,
    );
    assert.notEqual(copy.trialNoPaymentDueNow, "No payment due now", locale);
    assert.doesNotMatch(trialTitle ?? "", /Free Trial Included/, locale);
    assert.doesNotMatch(trialDisclosure ?? "", / free, then /, locale);
    assert.doesNotMatch(trialCta ?? "", / free, then /, locale);
    assert.doesNotMatch(paidCta ?? "", /^Start for /, locale);
    assert.doesNotMatch(annualPlan?.monthlyPriceText ?? "", / \/ mo$/, locale);
    assert.doesNotMatch(annualPlan?.pricePerPeriodText ?? "", / \/ year$/, locale);
    assert.doesNotMatch(monthlyPlan?.pricePerPeriodText ?? "", / \/ month$/, locale);
  }
});
