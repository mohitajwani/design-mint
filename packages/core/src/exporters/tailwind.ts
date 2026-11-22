/**
 * Tailwind CSS Configuration Exporter
 */

import { DesignTokens } from '../schemas/tokens.js';

export function exportToTailwind(tokens: DesignTokens): string {
  const colorsConfig: Record<string, any> = {};

  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    colorsConfig[scaleName] = {};
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      colorsConfig[scaleName][step] = t.hex;
    }
  }

  // Add semantic theme references
  colorsConfig.canvas = 'var(--dm-canvas-bg)';
  colorsConfig.surface = 'var(--dm-surface-bg)';

  const spacingConfig: Record<string, string> = {};
  for (const [key, t] of Object.entries(tokens.spacing)) {
    spacingConfig[key.replace('space-', '')] = t.rem;
  }

  const borderRadiusConfig: Record<string, string> = {};
  for (const [key, t] of Object.entries(tokens.borders.radii)) {
    borderRadiusConfig[key] = (t as any).rem;
  }

  const configObj = {
    theme: {
      extend: {
        colors: colorsConfig,
        spacing: spacingConfig,
        borderRadius: borderRadiusConfig,
        fontFamily: {
          heading: [tokens.typography.fontFamilies.heading, 'sans-serif'],
          body: [tokens.typography.fontFamilies.body, 'sans-serif'],
          mono: [tokens.typography.fontFamilies.mono, 'monospace'],
        },
      },
    },
  };

  return `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(configObj, null, 2)};\n`;
}
