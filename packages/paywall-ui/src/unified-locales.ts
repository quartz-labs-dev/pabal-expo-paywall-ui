export const UNIFIED_LOCALES = [
  "af", // Afrikaans - Google Play only
  "am", // Amharic - Google Play only
  "ar", // Arabic
  "az-AZ", // Azerbaijani - Google Play only
  "be", // Belarusian - Google Play only
  "bg-BG", // Bulgarian - Google Play only
  "bn-BD", // Bengali - Google Play only
  "ca-ES", // Catalan
  "cs-CZ", // Czech
  "da-DK", // Danish
  "de-DE", // German
  "el-GR", // Greek
  "en-AU", // English (Australia)
  "en-CA", // English (Canada)
  "en-GB", // English (United Kingdom)
  "en-IN", // English (India) - Google Play only
  "en-SG", // English (Singapore) - Google Play only
  "en-US", // English (United States)
  "en-ZA", // English (South Africa) - Google Play only
  "es-419", // Spanish (Latin America)
  "es-ES", // Spanish (Spain)
  "es-US", // Spanish (United States)
  "et-EE", // Estonian - Google Play only
  "eu-ES", // Basque - Google Play only
  "fa", // Persian - Google Play only
  "fa-AE", // Persian (UAE) - Google Play only
  "fa-AF", // Persian (Afghanistan) - Google Play only
  "fa-IR", // Persian (Iran) - Google Play only
  "fi-FI", // Finnish
  "fil", // Filipino - Google Play only
  "fr-CA", // French (Canada)
  "fr-FR", // French (France)
  "gl-ES", // Galician - Google Play only
  "gu", // Gujarati - Google Play only
  "he-IL", // Hebrew
  "hi-IN", // Hindi
  "hr-HR", // Croatian - Google Play only
  "hu-HU", // Hungarian
  "hy-AM", // Armenian - Google Play only
  "id-ID", // Indonesian
  "is-IS", // Icelandic - Google Play only
  "it-IT", // Italian
  "ja-JP", // Japanese
  "ka-GE", // Georgian - Google Play only
  "kk", // Kazakh - Google Play only
  "km-KH", // Khmer - Google Play only
  "kn-IN", // Kannada - Google Play only
  "ko-KR", // Korean
  "ky-KG", // Kyrgyz - Google Play only
  "lo-LA", // Lao - Google Play only
  "lt-LT", // Lithuanian - Google Play only
  "lv-LV", // Latvian - Google Play only
  "mk-MK", // Macedonian - Google Play only
  "ml-IN", // Malayalam - Google Play only
  "mn-MN", // Mongolian - Google Play only
  "mr-IN", // Marathi - Google Play only
  "ms", // Malay - Google Play only
  "ms-MY", // Malay (Malaysia)
  "my-MM", // Burmese - Google Play only
  "ne-NP", // Nepali - Google Play only
  "nl-NL", // Dutch
  "no-NO", // Norwegian
  "pa", // Punjabi - Google Play only
  "pl-PL", // Polish
  "pt-BR", // Portuguese (Brazil)
  "pt-PT", // Portuguese (Portugal)
  "rm", // Romansh - Google Play only
  "ro-RO", // Romanian
  "ru-RU", // Russian
  "si-LK", // Sinhala - Google Play only
  "sk-SK", // Slovak
  "sl-SI", // Slovenian - Google Play only
  "sq", // Albanian - Google Play only
  "sr-RS", // Serbian - Google Play only
  "sv-SE", // Swedish
  "sw", // Swahili - Google Play only
  "ta-IN", // Tamil - Google Play only
  "te-IN", // Telugu - Google Play only
  "th-TH", // Thai
  "tr-TR", // Turkish
  "uk-UA", // Ukrainian
  "ur", // Urdu - Google Play only
  "vi-VN", // Vietnamese
  "zh-HK", // Chinese (Hong Kong)
  "zh-Hans", // Chinese (Simplified)
  "zh-Hant", // Chinese (Traditional)
  "zu", // Zulu - Google Play only
] as const;

export type UnifiedLocale = (typeof UNIFIED_LOCALES)[number];

export const isUnifiedLocale = (locale: string): locale is UnifiedLocale => {
  return UNIFIED_LOCALES.includes(locale as UnifiedLocale);
};
