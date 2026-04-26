import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  PAYWALL_TEXT_LOCALES,
  UNIFIED_LOCALES,
  resolvePaywallTextLocale,
  type UnifiedLocale,
} from "pabal-expo-paywall-ui";

interface LocaleSelectorProps {
  selectedLocale: UnifiedLocale;
  onChangeLocale: (locale: UnifiedLocale) => void;
}

const pinnedLocales: UnifiedLocale[] = [
  "en-US",
  "ko-KR",
  "ja-JP",
  "zh-Hans",
  "zh-Hant",
  "es-ES",
  "fr-FR",
  "de-DE",
  "pt-BR",
];

const localeLabels: Partial<Record<UnifiedLocale, string>> = {
  "ar": "Arabic",
  "bg-BG": "Bulgarian",
  "cs-CZ": "Czech",
  "da-DK": "Danish",
  "de-DE": "German",
  "el-GR": "Greek",
  "en-AU": "English AU",
  "en-CA": "English CA",
  "en-GB": "English UK",
  "en-US": "English US",
  "es-419": "Spanish LATAM",
  "es-ES": "Spanish ES",
  "es-US": "Spanish US",
  "et-EE": "Estonian",
  "fi-FI": "Finnish",
  "fr-CA": "French CA",
  "fr-FR": "French FR",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "ko-KR": "Korean",
  "lt-LT": "Lithuanian",
  "lv-LV": "Latvian",
  "ms-MY": "Malay",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "pl-PL": "Polish",
  "pt-BR": "Portuguese BR",
  "pt-PT": "Portuguese PT",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sk-SK": "Slovak",
  "sl-SI": "Slovenian",
  "sv-SE": "Swedish",
  "th-TH": "Thai",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "vi-VN": "Vietnamese",
  "zh-Hans": "Chinese Simplified",
  "zh-Hant": "Chinese Traditional",
  "zh-HK": "Chinese HK",
};

const localeFlags: Partial<Record<UnifiedLocale, string>> = {
  af: "🇿🇦",
  am: "🇪🇹",
  ar: "🇸🇦",
  "az-AZ": "🇦🇿",
  be: "🇧🇾",
  "bg-BG": "🇧🇬",
  "bn-BD": "🇧🇩",
  "ca-ES": "🇪🇸",
  "cs-CZ": "🇨🇿",
  "da-DK": "🇩🇰",
  "de-DE": "🇩🇪",
  "el-GR": "🇬🇷",
  "en-AU": "🇦🇺",
  "en-CA": "🇨🇦",
  "en-GB": "🇬🇧",
  "en-IN": "🇮🇳",
  "en-SG": "🇸🇬",
  "en-US": "🇺🇸",
  "en-ZA": "🇿🇦",
  "es-419": "🌎",
  "es-ES": "🇪🇸",
  "es-US": "🇺🇸",
  "et-EE": "🇪🇪",
  "eu-ES": "🇪🇸",
  fa: "🇮🇷",
  "fa-AE": "🇦🇪",
  "fa-AF": "🇦🇫",
  "fa-IR": "🇮🇷",
  "fi-FI": "🇫🇮",
  fil: "🇵🇭",
  "fr-CA": "🇨🇦",
  "fr-FR": "🇫🇷",
  "gl-ES": "🇪🇸",
  gu: "🇮🇳",
  "he-IL": "🇮🇱",
  "hi-IN": "🇮🇳",
  "hr-HR": "🇭🇷",
  "hu-HU": "🇭🇺",
  "hy-AM": "🇦🇲",
  "id-ID": "🇮🇩",
  "is-IS": "🇮🇸",
  "it-IT": "🇮🇹",
  "ja-JP": "🇯🇵",
  "ka-GE": "🇬🇪",
  kk: "🇰🇿",
  "km-KH": "🇰🇭",
  "kn-IN": "🇮🇳",
  "ko-KR": "🇰🇷",
  "ky-KG": "🇰🇬",
  "lo-LA": "🇱🇦",
  "lt-LT": "🇱🇹",
  "lv-LV": "🇱🇻",
  "mk-MK": "🇲🇰",
  "ml-IN": "🇮🇳",
  "mn-MN": "🇲🇳",
  "mr-IN": "🇮🇳",
  ms: "🇲🇾",
  "ms-MY": "🇲🇾",
  "my-MM": "🇲🇲",
  "ne-NP": "🇳🇵",
  "nl-NL": "🇳🇱",
  "no-NO": "🇳🇴",
  pa: "🇮🇳",
  "pl-PL": "🇵🇱",
  "pt-BR": "🇧🇷",
  "pt-PT": "🇵🇹",
  rm: "🇨🇭",
  "ro-RO": "🇷🇴",
  "ru-RU": "🇷🇺",
  "si-LK": "🇱🇰",
  "sk-SK": "🇸🇰",
  "sl-SI": "🇸🇮",
  sq: "🇦🇱",
  "sr-RS": "🇷🇸",
  "sv-SE": "🇸🇪",
  sw: "🇰🇪",
  "ta-IN": "🇮🇳",
  "te-IN": "🇮🇳",
  "th-TH": "🇹🇭",
  "tr-TR": "🇹🇷",
  "uk-UA": "🇺🇦",
  ur: "🇵🇰",
  "vi-VN": "🇻🇳",
  "zh-HK": "🇭🇰",
  "zh-Hans": "🇨🇳",
  "zh-Hant": "🇹🇼",
  zu: "🇿🇦",
};

const getLocaleLabel = (locale: UnifiedLocale): string => {
  return localeLabels[locale] ?? locale;
};

const getLocaleFlag = (locale: UnifiedLocale): string => {
  return localeFlags[locale] ?? "🌐";
};

export const LocaleSelector = ({
  selectedLocale,
  onChangeLocale,
}: LocaleSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const resolvedTextLocale = resolvePaywallTextLocale(selectedLocale);
  const localeOptions = useMemo(() => {
    const remainingLocales = UNIFIED_LOCALES.filter((locale) => {
      return !pinnedLocales.includes(locale);
    });

    return [...pinnedLocales, ...remainingLocales];
  }, []);
  const selectedLabel = getLocaleLabel(selectedLocale);
  const selectedFlag = getLocaleFlag(selectedLocale);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Locale</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen((currentValue) => !currentValue)}
        style={({ pressed }) => [
          styles.selectorButton,
          isOpen && styles.selectorButtonOpen,
          pressed && styles.selectorButtonPressed,
        ]}
      >
        <View style={styles.selectedContent}>
          <Text style={styles.flag}>{selectedFlag}</Text>
          <View style={styles.selectedCopy}>
            <Text style={styles.selectedLabel}>{selectedLabel}</Text>
            <Text style={styles.selectedMeta}>
              {selectedLocale} {"->"} {resolvedTextLocale}
            </Text>
          </View>
        </View>
        <Text style={styles.chevron}>{isOpen ? "^" : "v"}</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.menu}>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.menuScroll}
          >
            {localeOptions.map((locale) => {
              const isSelected = locale === selectedLocale;

              return (
                <Pressable
                  key={locale}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => {
                    onChangeLocale(locale);
                    setIsOpen(false);
                  }}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                  ]}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.flag}>{getLocaleFlag(locale)}</Text>
                    <View style={styles.optionCopy}>
                      <Text
                        style={[
                          styles.optionLabel,
                          isSelected && styles.optionLabelSelected,
                        ]}
                      >
                        {getLocaleLabel(locale)}
                      </Text>
                      <Text
                        style={[
                          styles.optionMeta,
                          isSelected && styles.optionMetaSelected,
                        ]}
                      >
                        {locale} {"->"} {resolvePaywallTextLocale(locale)}
                      </Text>
                    </View>
                  </View>
                  {isSelected && <Text style={styles.selectedMark}>Selected</Text>}
                </Pressable>
              );
            })}
          </ScrollView>
          <Text style={styles.supportText}>
            Fixed paywall text supports {PAYWALL_TEXT_LOCALES.length} language
            groups. Unified locales resolve to a matching language group.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101820",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 12,
  },
  sectionTitle: {
    color: "#F5F7FA",
    fontSize: 15,
    fontWeight: "900",
  },
  selectorButton: {
    alignItems: "center",
    backgroundColor: "#151D25",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    minHeight: 54,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectorButtonOpen: {
    borderColor: "#5AC8B7",
  },
  selectorButtonPressed: {
    opacity: 0.82,
  },
  selectedCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  selectedContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minWidth: 0,
  },
  flag: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
    width: 30,
  },
  selectedLabel: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 18,
  },
  selectedMeta: {
    color: "#7F8B96",
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  chevron: {
    color: "#5AC8B7",
    fontSize: 11,
    fontWeight: "900",
    lineHeight: 14,
  },
  menu: {
    backgroundColor: "#0C1218",
    borderColor: "#2B3845",
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    overflow: "hidden",
    padding: 8,
  },
  menuScroll: {
    maxHeight: 248,
  },
  option: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    minHeight: 48,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  optionSelected: {
    backgroundColor: "#102A2A",
  },
  optionCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  optionContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minWidth: 0,
  },
  optionLabel: {
    color: "#F5F7FA",
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 17,
  },
  optionLabelSelected: {
    color: "#5AC8B7",
  },
  optionMeta: {
    color: "#7F8B96",
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 14,
  },
  optionMetaSelected: {
    color: "#B9F2E8",
  },
  selectedMark: {
    color: "#5AC8B7",
    fontSize: 11,
    fontWeight: "900",
    lineHeight: 14,
  },
  supportText: {
    color: "#B9C4CF",
    fontSize: 12,
    lineHeight: 17,
  },
});
