import type {
  CreatePaywallPlansOptions,
  PaywallPlan,
  PaywallPlanPeriod,
  PurchasesPackageLike,
} from "./types";

const DEFAULT_MONTHLY_PACKAGE_IDS = ["$rc_monthly"];
const DEFAULT_ANNUAL_PACKAGE_IDS = ["$rc_annual"];
const DEFAULT_DISPLAY_ORDER: PaywallPlanPeriod[] = ["annual", "monthly"];

const getPeriod = (
  pack: PurchasesPackageLike,
  options: Required<
    Pick<CreatePaywallPlansOptions, "monthlyPackageIds" | "annualPackageIds">
  >,
): PaywallPlanPeriod | null => {
  if (options.monthlyPackageIds.includes(pack.identifier)) return "monthly";
  if (options.annualPackageIds.includes(pack.identifier)) return "annual";
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
  const recommendedPeriod = options.recommendedPeriod ?? "annual";
  const displayOrder = options.displayOrder ?? DEFAULT_DISPLAY_ORDER;

  const plans = packages.reduce<PaywallPlan<TPackage>[]>((acc, pack) => {
    const period = getPeriod(pack, { monthlyPackageIds, annualPackageIds });
    if (period === null) return acc;

    const isAnnual = period === "annual";
    acc.push({
      id: pack.identifier,
      period,
      title:
        (isAnnual ? options.annualTitle : options.monthlyTitle) ??
        (isAnnual ? "Annual" : "Monthly"),
      priceText: pack.product.priceString,
      monthlyPriceText: isAnnual ? formatMonthlyPrice(pack) : undefined,
      badgeText: isAnnual ? options.annualBadgeText : undefined,
      description:
        (isAnnual ? options.annualDescription : options.monthlyDescription) ??
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
