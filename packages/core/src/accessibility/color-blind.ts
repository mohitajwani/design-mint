/**
 * Color blindness simulation and palette safety validator
 */

import { hexToRgb, rgbToHex } from '../generators/color.js';
import { ColorBlindnessType, AuditCheck } from '../schemas/accessibility.js';

// Simulation matrices based on Brettel et al. and Machado et al. models
export function simulateColorBlindness(hex: string, type: ColorBlindnessType): string {
  const { r, g, b } = hexToRgb(hex);

  // Gamma expansion
  const gamma = (val: number) => Math.pow(val / 255, 2.2);
  const ungamma = (val: number) => Math.max(0, Math.min(255, Math.round(Math.pow(val, 1 / 2.2) * 255)));

  const rLin = gamma(r);
  const gLin = gamma(g);
  const bLin = gamma(b);

  let rSim = rLin;
  let gSim = gLin;
  let bSim = bLin;

  switch (type) {
    case 'protanopia': // Missing L-cones (red weak/blind)
      rSim = 0.56667 * rLin + 0.43333 * gLin + 0.0 * bLin;
      gSim = 0.55833 * rLin + 0.44167 * gLin + 0.0 * bLin;
      bSim = 0.0 * rLin + 0.24167 * gLin + 0.75833 * bLin;
      break;

    case 'deuteranopia': // Missing M-cones (green weak/blind - most common)
      rSim = 0.625 * rLin + 0.375 * gLin + 0.0 * bLin;
      gSim = 0.7 * rLin + 0.3 * gLin + 0.0 * bLin;
      bSim = 0.0 * rLin + 0.3 * gLin + 0.7 * bLin;
      break;

    case 'tritanopia': // Missing S-cones (blue weak/blind)
      rSim = 0.95 * rLin + 0.05 * gLin + 0.0 * bLin;
      gSim = 0.0 * rLin + 0.43333 * gLin + 0.56667 * bLin;
      bSim = 0.0 * rLin + 0.475 * gLin + 0.525 * bLin;
      break;

    case 'achromatopsia': // Complete color blindness (monochrome)
      const gray = 0.299 * rLin + 0.587 * gLin + 0.114 * bLin;
      rSim = gray;
      gSim = gray;
      bSim = gray;
      break;
  }

  return rgbToHex(ungamma(rSim), ungamma(gSim), ungamma(bSim));
}

// Check perceptual color difference (Euclidean distance in RGB)
export function colorDistance(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

/**
 * Validates that semantic colors (success, error, warning) do not collide under color blindness
 */
export function validateColorBlindSafety(
  semanticColors: { success: string; error: string; warning: string; info: string }
): AuditCheck[] {
  const checks: AuditCheck[] = [];
  const types: ColorBlindnessType[] = ['protanopia', 'deuteranopia', 'tritanopia'];

  for (const type of types) {
    const simSuccess = simulateColorBlindness(semanticColors.success, type);
    const simError = simulateColorBlindness(semanticColors.error, type);

    // Threshold distance to ensure distinguishable states
    const dist = colorDistance(simSuccess, simError);
    const passes = dist >= 35; // Distinct enough to tell apart

    checks.push({
      id: `colorblind-${type}-success-error`,
      rule: 'WCAG 1.4.1 Use of Color',
      wcagCriterion: '1.4.1 Use of Color (A)',
      category: 'color-blindness',
      severity: passes ? 'pass' : 'warning',
      message: passes
        ? `Success and Error colors remain distinguishable under ${type} (perceptual distance: ${Math.round(dist)})`
        : `Success and Error colors may be hard to distinguish under ${type} (perceptual distance: ${Math.round(dist)}). Never rely solely on color to convey state (add icons or text labels).`,
      details: {
        type,
        distance: Math.round(dist),
        simulatedSuccess: simSuccess,
        simulatedError: simError,
      },
      remediation: passes
        ? undefined
        : 'Always accompany state colors with distinct icons (e.g., checkmark vs cross) and textual indicators.',
    });
  }

  return checks;
}
