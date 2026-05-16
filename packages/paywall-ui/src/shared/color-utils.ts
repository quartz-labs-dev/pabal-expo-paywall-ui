const HEX_COLOR_MATCH = /^#([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i;
const RGB_COLOR_MATCH = /^rgba?\(\s*(.*?)\s*\)$/i;
const HSL_COLOR_MATCH = /^hsla?\(\s*(.*?)\s*\)$/i;

const clampAlpha = (alpha: number): number => Math.max(0, Math.min(1, alpha));

const expandHexChannel = (channel: string): string =>
  channel.length === 1 ? `${channel}${channel}` : channel;

const getHexRgbChannels = (color: string): string[] | null => {
  const match = color.match(HEX_COLOR_MATCH);
  if (!match) return null;

  const value = match[1] ?? "";
  if (value.length === 3 || value.length === 4) {
    return [
      expandHexChannel(value[0] ?? "0"),
      expandHexChannel(value[1] ?? "0"),
      expandHexChannel(value[2] ?? "0"),
    ];
  }

  return [value.slice(0, 2), value.slice(2, 4), value.slice(4, 6)];
};

const getCommaSeparatedColorBase = (components: string): string | null => {
  const parts = components.split(",").map((part) => part.trim());
  if (parts.length < 3) return null;
  if (parts.slice(0, 3).some((part) => part.length === 0)) return null;

  return parts.slice(0, 3).join(", ");
};

const getSlashSeparatedColorBase = (components: string): string => {
  return components.split("/")[0]?.trim() ?? components.trim();
};

const hasThreeColorComponents = (components: string): boolean => {
  if (components.includes(",")) return getCommaSeparatedColorBase(components) !== null;

  return components.split(/\s+/).filter(Boolean).length === 3;
};

const getFunctionalColorWithAlpha = (
  color: string,
  alpha: number,
  match: RegExpMatchArray,
  functionName: "rgba" | "hsla",
): string => {
  const components = match[1]?.trim() ?? "";
  if (components.includes("/")) {
    const base = getSlashSeparatedColorBase(components);
    if (!hasThreeColorComponents(base)) return color;

    return `${functionName}(${base} / ${alpha})`;
  }

  if (components.includes(",")) {
    const base = getCommaSeparatedColorBase(components);
    if (!base) return color;

    return `${functionName}(${base}, ${alpha})`;
  }

  if (!hasThreeColorComponents(components)) return color;

  return `${functionName}(${components} / ${alpha})`;
};

export const getColorWithAlpha = (
  color: string,
  alpha: number,
  fallback = color,
): string => {
  const normalizedColor = color.trim();
  const normalizedAlpha = clampAlpha(alpha);
  const hexChannels = getHexRgbChannels(normalizedColor);

  if (hexChannels) {
    const [redHex, greenHex, blueHex] = hexChannels;
    const red = Number.parseInt(redHex ?? "0", 16);
    const green = Number.parseInt(greenHex ?? "0", 16);
    const blue = Number.parseInt(blueHex ?? "0", 16);

    return `rgba(${red}, ${green}, ${blue}, ${normalizedAlpha})`;
  }

  const rgbMatch = normalizedColor.match(RGB_COLOR_MATCH);
  if (rgbMatch) {
    return getFunctionalColorWithAlpha(
      normalizedColor,
      normalizedAlpha,
      rgbMatch,
      "rgba",
    );
  }

  const hslMatch = normalizedColor.match(HSL_COLOR_MATCH);
  if (hslMatch) {
    return getFunctionalColorWithAlpha(
      normalizedColor,
      normalizedAlpha,
      hslMatch,
      "hsla",
    );
  }

  return fallback;
};
