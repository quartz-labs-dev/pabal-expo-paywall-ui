import af from "./af";
import am from "./am";
import ar from "./ar";
import az from "./az";
import be from "./be";
import bg from "./bg";
import bn from "./bn";
import ca from "./ca";
import cs from "./cs";
import da from "./da";
import de from "./de";
import el from "./el";
import en from "./en";
import es from "./es";
import et from "./et";
import eu from "./eu";
import fa from "./fa";
import fi from "./fi";
import fil from "./fil";
import fr from "./fr";
import gl from "./gl";
import gu from "./gu";
import he from "./he";
import hi from "./hi";
import hr from "./hr";
import hu from "./hu";
import hy from "./hy";
import id from "./id";
import is from "./is";
import it from "./it";
import ja from "./ja";
import ka from "./ka";
import kk from "./kk";
import km from "./km";
import kn from "./kn";
import ko from "./ko";
import ky from "./ky";
import lo from "./lo";
import lt from "./lt";
import lv from "./lv";
import mk from "./mk";
import ml from "./ml";
import mn from "./mn";
import mr from "./mr";
import ms from "./ms";
import my from "./my";
import nb from "./nb";
import ne from "./ne";
import nl from "./nl";
import pa from "./pa";
import pl from "./pl";
import pt from "./pt";
import ptBr from "./pt-br";
import rm from "./rm";
import ro from "./ro";
import ru from "./ru";
import si from "./si";
import sk from "./sk";
import sl from "./sl";
import sq from "./sq";
import sr from "./sr";
import sv from "./sv";
import sw from "./sw";
import ta from "./ta";
import te from "./te";
import th from "./th";
import tr from "./tr";
import uk from "./uk";
import ur from "./ur";
import vi from "./vi";
import zhHans from "./zh-hans";
import zhHant from "./zh-hant";
import zu from "./zu";
import type { PaywallLocaleText, PaywallText, PaywallValueStepText } from "./types";

export const PAYWALL_TEXT_LOCALES = [
  "af",
  "am",
  "ar",
  "az",
  "be",
  "bg",
  "bn",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "eu",
  "fa",
  "fi",
  "fil",
  "fr",
  "gl",
  "gu",
  "he",
  "hi",
  "hr",
  "hu",
  "hy",
  "id",
  "is",
  "it",
  "ja",
  "ka",
  "kk",
  "km",
  "kn",
  "ko",
  "ky",
  "lo",
  "lt",
  "lv",
  "mk",
  "ml",
  "mn",
  "mr",
  "ms",
  "my",
  "nb",
  "ne",
  "nl",
  "pa",
  "pl",
  "pt",
  "ptBr",
  "rm",
  "ro",
  "ru",
  "si",
  "sk",
  "sl",
  "sq",
  "sr",
  "sv",
  "sw",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "ur",
  "vi",
  "zhHans",
  "zhHant",
  "zu",
] as const;

export type PaywallTextLocale = (typeof PAYWALL_TEXT_LOCALES)[number];

const PAYWALL_LOCALE_TEXT = {
  af,
  am,
  ar,
  az,
  be,
  bg,
  bn,
  ca,
  cs,
  da,
  de,
  el,
  en,
  es,
  et,
  eu,
  fa,
  fi,
  fil,
  fr,
  gl,
  gu,
  he,
  hi,
  hr,
  hu,
  hy,
  id,
  is,
  it,
  ja,
  ka,
  kk,
  km,
  kn,
  ko,
  ky,
  lo,
  lt,
  lv,
  mk,
  ml,
  mn,
  mr,
  ms,
  my,
  nb,
  ne,
  nl,
  pa,
  pl,
  pt,
  ptBr,
  rm,
  ro,
  ru,
  si,
  sk,
  sl,
  sq,
  sr,
  sv,
  sw,
  ta,
  te,
  th,
  tr,
  uk,
  ur,
  vi,
  zhHans,
  zhHant,
  zu,
} satisfies Record<PaywallTextLocale, PaywallLocaleText>;

export const PAYWALL_TEXT = Object.fromEntries(
  PAYWALL_TEXT_LOCALES.map((locale) => [locale, PAYWALL_LOCALE_TEXT[locale].text]),
) as Record<PaywallTextLocale, PaywallText>;

export const PAYWALL_VALUE_STEP_TEXT = Object.fromEntries(
  PAYWALL_TEXT_LOCALES.map((locale) => [
    locale,
    PAYWALL_LOCALE_TEXT[locale].valueStep,
  ]),
) as Record<PaywallTextLocale, PaywallValueStepText>;

export type { PaywallText, PaywallValueStepText } from "./types";
