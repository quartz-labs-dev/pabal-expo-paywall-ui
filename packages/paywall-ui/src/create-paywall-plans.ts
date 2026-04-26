import type {
  CreatePaywallPlansOptions,
  PaywallPlan,
  PaywallPlanPeriod,
  PurchasesPackageLike,
} from "./types";

const DEFAULT_MONTHLY_PACKAGE_IDS = ["$rc_monthly"];
const DEFAULT_ANNUAL_PACKAGE_IDS = ["$rc_annual"];
const DEFAULT_LIFETIME_PACKAGE_IDS = ["$rc_lifetime"];
const DEFAULT_DISPLAY_ORDER: PaywallPlanPeriod[] = [
  "annual",
  "lifetime",
  "monthly",
];

const getPeriod = (
  pack: PurchasesPackageLike,
  options: Required<
    Pick<
      CreatePaywallPlansOptions,
      "monthlyPackageIds" | "annualPackageIds" | "lifetimePackageIds"
    >
  >,
): PaywallPlanPeriod | null => {
  if (options.monthlyPackageIds.includes(pack.identifier)) return "monthly";
  if (options.annualPackageIds.includes(pack.identifier)) return "annual";
  if (options.lifetimePackageIds.includes(pack.identifier)) return "lifetime";
  return null;
};

const getCurrencyPrefix = (priceText: string): string => {
  const match = priceText.match(/^[^\d]*/);
  return match?.[0] ?? "";
};

const formatMonthlyPrice = (annualPackage: PurchasesPackageLike): string => {
  const prefix = getCurrencyPrefix(annualPackage.product.priceString);
  const monthlyPrice = annualPackage.product.price / 12;

  if (monthlyPrice >= 100) return `${prefix}${Math.round(monthlyPrice)}`;

  return `${prefix}${monthlyPrice.toFixed(2)}`;
};

const formatDiscountText = (
  annualPackage: PurchasesPackageLike,
  monthlyPackage: PurchasesPackageLike,
): string | undefined => {
  const annualPrice = annualPackage.product.price;
  const annualizedMonthlyPrice = monthlyPackage.product.price * 12;
  if (annualPrice <= 0 || annualizedMonthlyPrice <= 0) return undefined;
  if (annualPrice >= annualizedMonthlyPrice) return undefined;

  const discountPercentage = Math.round(
    ((annualizedMonthlyPrice - annualPrice) / annualizedMonthlyPrice) * 100,
  );
  if (discountPercentage <= 0) return undefined;

  return `Save ${discountPercentage}%`;
};

const orderPlans = <TPackage extends PurchasesPackageLike>(
  plans: PaywallPlan<TPackage>[],
  displayOrder: PaywallPlanPeriod[],
): PaywallPlan<TPackage>[] => {
  const orderIndex = new Map(
    displayOrder.map((period, index) => [period, index] as const),
  );

  return [...plans].sort((a, b) => {
    const aIndex = orderIndex.get(a.period) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = orderIndex.get(b.period) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });
};

export const createPaywallPlans = <TPackage extends PurchasesPackageLike>(
  packages: TPackage[],
  options: CreatePaywallPlansOptions = {},
): PaywallPlan<TPackage>[] => {
  const monthlyPackageIds =
    options.monthlyPackageIds ?? DEFAULT_MONTHLY_PACKAGE_IDS;
  const annualPackageIds =
    options.annualPackageIds ?? DEFAULT_ANNUAL_PACKAGE_IDS;
  const lifetimePackageIds =
    options.lifetimePackageIds ?? DEFAULT_LIFETIME_PACKAGE_IDS;
  const recommendedPeriod = options.recommendedPeriod ?? "annual";
  const displayOrder = options.displayOrder ?? DEFAULT_DISPLAY_ORDER;
  const monthlyPackage = packages.find((pack) => {
    return (
      getPeriod(pack, {
        monthlyPackageIds,
        annualPackageIds,
        lifetimePackageIds,
      }) === "monthly"
    );
  });

  const plans = packages.reduce<PaywallPlan<TPackage>[]>((acc, pack) => {
    const period = getPeriod(pack, {
      monthlyPackageIds,
      annualPackageIds,
      lifetimePackageIds,
    });
    if (period === null) return acc;

    const isAnnual = period === "annual";
    const isLifetime = period === "lifetime";
    const discountText =
      isAnnual && monthlyPackage
        ? formatDiscountText(pack, monthlyPackage)
        : undefined;

    acc.push({
      id: pack.identifier,
      period,
      title:
        (isAnnual
          ? options.annualTitle
          : isLifetime
          ? options.lifetimeTitle
          : options.monthlyTitle) ??
        (isAnnual ? "Annual" : isLifetime ? "Lifetime" : "Monthly"),
      priceText: pack.product.priceString,
      monthlyPriceText: isAnnual ? formatMonthlyPrice(pack) : undefined,
      discountText,
      badgeText: isAnnual
        ? discountText ?? options.annualBadgeText
        : isLifetime
        ? options.lifetimeBadgeText
        : undefined,
      description:
        (isAnnual
          ? options.annualDescription
          : isLifetime
          ? options.lifetimeDescription
          : options.monthlyDescription) ??
        pack.product.description,
      isRecommended: period === recommendedPeriod,
      rawPackage: pack,
    });

    return acc;
  }, []);

  return orderPlans(plans, displayOrder);
};

export const getDefaultSelectedPlanId = <TPackage>(
  plans: PaywallPlan<TPackage>[],
): string | undefined => {
  return plans.find((plan) => plan.isRecommended)?.id ?? plans[0]?.id;
};
