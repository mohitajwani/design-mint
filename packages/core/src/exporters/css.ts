/**
 * CSS Custom Properties Exporter with Theme & Accessibility Media Queries
 */

import { DesignTokens } from '../schemas/tokens.js';

export function exportToCss(tokens: DesignTokens): string {
  const lines: string[] = [];

  lines.push('/**');
  lines.push(` * DesignMint Design System — ${tokens.brandName}`);
  lines.push(' * Accessibility-first tokens with light, dark, and high-contrast support');
  lines.push(' */\n');

  lines.push(':root {');

  // Spacing
  lines.push('  /* Spacing */');
  for (const [key, t] of Object.entries(tokens.spacing)) {
    lines.push(`  --dm-${key}: ${t.rem}; /* ${t.px} */`);
  }

  // Typography
  lines.push('\n  /* Typography */');
  lines.push(`  --dm-font-family-heading: ${tokens.typography.fontFamilies.headingStack};`);
  lines.push(`  --dm-font-family-body: ${tokens.typography.fontFamilies.bodyStack};`);
  lines.push(`  --dm-font-family-mono: ${tokens.typography.fontFamilies.monoStack};`);

  for (const [key, t] of Object.entries(tokens.typography.fontSizes)) {
    lines.push(`  --dm-${key}: ${(t as any).sizeRem};`);
    lines.push(`  --dm-line-height-${key.replace('font-size-', '')}: ${(t as any).lineHeight};`);
  }

  // Borders & Radius
  lines.push('\n  /* Borders & Radius */');
  for (const [key, t] of Object.entries(tokens.borders.radii)) {
    lines.push(`  --dm-radius-${key}: ${(t as any).rem};`);
  }
  for (const [key, t] of Object.entries(tokens.borders.widths)) {
    lines.push(`  --dm-${(t as any).name}: ${(t as any).px};`);
  }

  // Shadows (Light theme default)
  lines.push('\n  /* Shadows */');
  for (const [key, t] of Object.entries(tokens.shadows)) {
    lines.push(`  --dm-shadow-${key}: ${(t as any).css};`);
  }

  // Motion
  lines.push('\n  /* Motion */');
  for (const [key, t] of Object.entries(tokens.motion.durations)) {
    lines.push(`  --dm-${(t as any).name}: ${(t as any).css};`);
  }
  for (const [key, t] of Object.entries(tokens.motion.easings)) {
    lines.push(`  --dm-${(t as any).name}: ${(t as any).css};`);
  }

  // Focus & Touch (Accessibility)
  lines.push('\n  /* Accessibility (Focus & Touch) */');
  for (const [varName, val] of Object.entries(tokens.focus.cssVariableMap)) {
    lines.push(`  ${varName}: ${val};`);
  }
  for (const [varName, val] of Object.entries(tokens.touch.cssVariableMap)) {
    lines.push(`  ${varName}: ${val};`);
  }

  // Colors - Light Theme
  lines.push('\n  /* Color Palettes (Light Theme) */');
  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      lines.push(`  --dm-color-${scaleName}-${step}: ${t.hex};`);
    }
  }

  // Semantic surfaces for light
  const lightColors = tokens.themes.light;
  lines.push('\n  /* Semantic Theme Surfaces (Light) */');
  lines.push(`  --dm-canvas-bg: ${lightColors.background.canvas};`);
  lines.push(`  --dm-surface-bg: ${lightColors.background.surface};`);
  lines.push(`  --dm-text-primary: ${lightColors.text.primary};`);
  lines.push(`  --dm-text-secondary: ${lightColors.text.secondary};`);
  lines.push(`  --dm-border-color: ${lightColors.border.default};`);
  lines.push(`  --dm-action-primary: ${lightColors.action.primary};`);

  lines.push('}\n');

  // Dark Theme Media Query & class
  const darkColors = tokens.themes.dark;
  lines.push('/* Dark Theme */');
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root:not([data-theme="light"]) {');
  lines.push(`    --dm-canvas-bg: ${darkColors.background.canvas};`);
  lines.push(`    --dm-surface-bg: ${darkColors.background.surface};`);
  lines.push(`    --dm-text-primary: ${darkColors.text.primary};`);
  lines.push(`    --dm-text-secondary: ${darkColors.text.secondary};`);
  lines.push(`    --dm-border-color: ${darkColors.border.default};`);
  lines.push(`    --dm-action-primary: ${darkColors.action.primary};`);
  lines.push('  }');
  lines.push('}');
  lines.push('[data-theme="dark"] {');
  lines.push(`  --dm-canvas-bg: ${darkColors.background.canvas};`);
  lines.push(`  --dm-surface-bg: ${darkColors.background.surface};`);
  lines.push(`  --dm-text-primary: ${darkColors.text.primary};`);
  lines.push(`  --dm-text-secondary: ${darkColors.text.secondary};`);
  lines.push(`  --dm-border-color: ${darkColors.border.default};`);
  lines.push(`  --dm-action-primary: ${darkColors.action.primary};`);
  lines.push('}\n');

  // High Contrast Media Query & class (WCAG AAA)
  const hcColors = tokens.themes.highContrast;
  lines.push('/* High Contrast Theme (WCAG AAA) */');
  lines.push('@media (prefers-contrast: more) {');
  lines.push('  :root {');
  lines.push(`    --dm-canvas-bg: ${hcColors.background.canvas};`);
  lines.push(`    --dm-surface-bg: ${hcColors.background.surface};`);
  lines.push(`    --dm-text-primary: ${hcColors.text.primary};`);
  lines.push(`    --dm-text-secondary: ${hcColors.text.secondary};`);
  lines.push(`    --dm-border-color: ${hcColors.border.default};`);
  lines.push(`    --dm-action-primary: ${hcColors.action.primary};`);
  lines.push('    --dm-focus-ring-width: 3px;');
  lines.push('  }');
  lines.push('}');
  lines.push('[data-theme="high-contrast"] {');
  lines.push(`  --dm-canvas-bg: ${hcColors.background.canvas};`);
  lines.push(`  --dm-surface-bg: ${hcColors.background.surface};`);
  lines.push(`  --dm-text-primary: ${hcColors.text.primary};`);
  lines.push(`  --dm-text-secondary: ${hcColors.text.secondary};`);
  lines.push(`  --dm-border-color: ${hcColors.border.default};`);
  lines.push(`  --dm-action-primary: ${hcColors.action.primary};`);
  lines.push('  --dm-focus-ring-width: 3px;');
  lines.push('}\n');

  // Reduced Motion Media Query
  lines.push('/* Reduced Motion (WCAG 2.3.3) */');
  lines.push('@media (prefers-reduced-motion: reduce) {');
  lines.push('  :root {');
  lines.push('    --dm-duration-fast: 0ms;');
  lines.push('    --dm-duration-normal: 0ms;');
  lines.push('    --dm-duration-slow: 0ms;');
  lines.push('    --dm-duration-slower: 0ms;');
  lines.push('  }');
  lines.push('  *, *::before, *::after {');
  lines.push('    animation-duration: 0.01ms !important;');
  lines.push('    animation-iteration-count: 1 !important;');
  lines.push('    transition-duration: 0.01ms !important;');
  lines.push('    scroll-behavior: auto !important;');
  lines.push('  }');
  lines.push('}');

  return lines.join('\n');
}
