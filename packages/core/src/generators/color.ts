/**
 * Color token generator and HSL/RGB conversion utilities
 */

export interface ColorToken {
  name: string;
  value: string; // hex string e.g. #2563eb
  hex: string;
  hsl: { h: number; s: number; l: number; css: string };
  rgb: { r: number; g: number; b: number; css: string };
  contrastOnWhite: number;
  contrastOnBlack: number;
}

export type ColorScale = Record<
  '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950',
  ColorToken
>;

export interface SemanticColors {
  primary: ColorScale;
  secondary?: ColorScale;
  accent?: ColorScale;
  neutral: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

// Convert Hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace(/^#/, '');
  let fullHex = cleanHex;
  if (cleanHex.length === 3) {
    fullHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Convert RGB to Hex
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hNorm = (h % 360) / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return { r, g, b };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// Relative luminance according to WCAG 2.2
export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const transform = (val: number) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const rLin = transform(r);
  const gLin = transform(g);
  const bLin = transform(b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

// Contrast ratio between two colors per WCAG 2.2
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

// Create a single ColorToken
export function createColorToken(name: string, hex: string): ColorToken {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const contrastOnWhite = getContrastRatio(hex, '#FFFFFF');
  const contrastOnBlack = getContrastRatio(hex, '#000000');

  return {
    name,
    value: hex,
    hex,
    hsl: {
      ...hsl,
      css: `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`,
    },
    rgb: {
      ...rgb,
      css: `rgb(${rgb.r} ${rgb.g} ${rgb.b})`,
    },
    contrastOnWhite,
    contrastOnBlack,
  };
}

// Standard lightness steps for a 50-950 scale
const LIGHTNESS_MAP: Record<keyof ColorScale, number> = {
  '50': 96,
  '100': 91,
  '200': 82,
  '300': 72,
  '400': 60,
  '500': 48,
  '600': 38,
  '700': 30,
  '800': 22,
  '900': 15,
  '950': 9,
};

// Generate full 11-step ColorScale from a base color
export function generateColorScale(baseHex: string, name: string): ColorScale {
  const baseHsl = hexToHsl(baseHex);

  const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
  const result: Partial<ColorScale> = {};

  for (const step of steps) {
    let targetL = LIGHTNESS_MAP[step];
    let targetS = baseHsl.s;

    // Saturation adjustments for very light and very dark shades
    if (step === '50') targetS = Math.max(10, Math.round(baseHsl.s * 0.4));
    else if (step === '100') targetS = Math.max(15, Math.round(baseHsl.s * 0.6));
    else if (step === '950') targetS = Math.min(100, Math.round(baseHsl.s * 1.15));

    // If the base color closely matches 500 step, keep base hex at 500
    if (step === '500' && Math.abs(baseHsl.l - targetL) < 10) {
      result[step] = createColorToken(`${name}-500`, baseHex);
    } else {
      const stepHex = hslToHex(baseHsl.h, targetS, targetL);
      result[step] = createColorToken(`${name}-${step}`, stepHex);
    }
  }

  return result as ColorScale;
}

// Generate Neutral scale (cool gray or warm gray based on primary hue)
export function generateNeutralScale(baseHue?: number): ColorScale {
  const hue = baseHue !== undefined ? baseHue : 220; // default cool slate hue
  const sat = 12; // low saturation for neutral

  const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
  const result: Partial<ColorScale> = {};

  for (const step of steps) {
    const l = LIGHTNESS_MAP[step];
    const s = step === '50' ? 8 : sat;
    const hex = hslToHex(hue, s, l);
    result[step] = createColorToken(`neutral-${step}`, hex);
  }

  return result as ColorScale;
}

// Generate standard semantic colors
export function generateSemanticColors(
  primaryHex: string,
  secondaryHex?: string,
  accentHex?: string
): SemanticColors {
  const primaryHsl = hexToHsl(primaryHex);

  const primary = generateColorScale(primaryHex, 'primary');
  const secondary = secondaryHex
    ? generateColorScale(secondaryHex, 'secondary')
    : generateColorScale(hslToHex((primaryHsl.h + 60) % 360, Math.min(80, primaryHsl.s), 50), 'secondary');
  const accent = accentHex
    ? generateColorScale(accentHex, 'accent')
    : generateColorScale(hslToHex((primaryHsl.h + 180) % 360, Math.min(90, primaryHsl.s), 55), 'accent');

  const neutral = generateNeutralScale(primaryHsl.h);

  // Standard accessible semantic roots
  const success = generateColorScale('#10B981', 'success'); // Emerald Green
  const warning = generateColorScale('#F59E0B', 'warning'); // Amber
  const error = generateColorScale('#EF4444', 'error');     // Red
  const info = generateColorScale('#3B82F6', 'info');       // Blue

  return {
    primary,
    secondary,
    accent,
    neutral,
    success,
    warning,
    error,
    info,
  };
}
