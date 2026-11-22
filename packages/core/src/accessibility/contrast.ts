/**
 * WCAG 2.2 Color Contrast Checker and Accessible Color Suggester
 */

import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToHex,
  getRelativeLuminance,
  getContrastRatio,
} from '../generators/color.js';
import { AuditCheck } from '../schemas/accessibility.js';

export interface ContrastResult {
  fg: string;
  bg: string;
  ratio: number;
  meetsAANormal: boolean;    // 4.5:1
  meetsAALarge: boolean;     // 3.0:1
  meetsAAANormal: boolean;   // 7.0:1
  meetsAAALarge: boolean;    // 4.5:1
  meetsUIComponent: boolean; // 3.0:1 (WCAG 1.4.11 Non-text contrast)
}

export function checkContrast(fgHex: string, bgHex: string): ContrastResult {
  const ratio = getContrastRatio(fgHex, bgHex);
  return {
    fg: fgHex,
    bg: bgHex,
    ratio,
    meetsAANormal: ratio >= 4.5,
    meetsAALarge: ratio >= 3.0,
    meetsAAANormal: ratio >= 7.0,
    meetsAAALarge: ratio >= 4.5,
    meetsUIComponent: ratio >= 3.0,
  };
}

/**
 * Suggests an accessible color variant by adjusting lightness in HSL
 */
export function suggestAccessibleColor(
  fgHex: string,
  bgHex: string,
  targetRatio: number = 4.5
): string {
  const currentRatio = getContrastRatio(fgHex, bgHex);
  if (currentRatio >= targetRatio) return fgHex;

  const bgLum = getRelativeLuminance(bgHex);
  const fgRgb = hexToRgb(fgHex);
  const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);

  // If background is bright, darken foreground; if background is dark, lighten foreground
  const shouldLighten = bgLum < 0.5;

  let bestHex = fgHex;
  let bestRatio = currentRatio;

  for (let step = 1; step <= 50; step++) {
    const delta = shouldLighten ? step : -step;
    const testL = Math.max(0, Math.min(100, fgHsl.l + delta));
    const testHex = hslToHex(fgHsl.h, fgHsl.s, testL);
    const testRatio = getContrastRatio(testHex, bgHex);

    if (testRatio > bestRatio) {
      bestRatio = testRatio;
      bestHex = testHex;
    }

    if (testRatio >= targetRatio) {
      return testHex;
    }
  }

  return bestHex;
}

/**
 * Audits a set of foreground colors against a background color
 */
export function auditColorPairs(
  colors: Record<string, string>,
  background: string,
  targetLevel: 'AA' | 'AAA' = 'AA'
): AuditCheck[] {
  const checks: AuditCheck[] = [];
  const minRatio = targetLevel === 'AAA' ? 7.0 : 4.5;

  for (const [name, hex] of Object.entries(colors)) {
    const result = checkContrast(hex, background);
    const passes = result.ratio >= minRatio;

    checks.push({
      id: `contrast-${name}-on-bg`,
      rule: 'WCAG 1.4.3 Contrast (Minimum)',
      wcagCriterion: targetLevel === 'AAA' ? '1.4.6 Contrast (Enhanced)' : '1.4.3 Contrast (Minimum)',
      category: 'contrast',
      severity: passes ? 'pass' : 'fail',
      message: passes
        ? `Color "${name}" (${hex}) has contrast ratio ${result.ratio}:1 against background (${background}), meeting ${targetLevel}`
        : `Color "${name}" (${hex}) has contrast ratio ${result.ratio}:1 against background (${background}), below required ${minRatio}:1`,
      details: {
        foreground: hex,
        background,
        ratio: result.ratio,
        requiredRatio: minRatio,
      },
      remediation: passes
        ? undefined
        : `Adjust lightness of "${name}" to ${suggestAccessibleColor(hex, background, minRatio)} to reach ${minRatio}:1`,
    });
  }

  return checks;
}
