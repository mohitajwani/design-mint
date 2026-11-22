/**
 * Shadow token generator supporting light, dark, and high-contrast modes
 */

export interface ShadowToken {
  name: string;
  css: string;
  blur: number;
  y: number;
}

import { ThemeMode } from '../schemas/accessibility.js';

export function generateShadowScale(mode: ThemeMode = 'light'): Record<string, ShadowToken> {
  if (mode === 'high-contrast') {
    // WCAG AAA: High contrast disables blurred shadows in favor of crisp borders
    return {
      none: { name: 'shadow-none', css: 'none', blur: 0, y: 0 },
      xs: { name: 'shadow-xs', css: '0 0 0 1px #000000', blur: 0, y: 0 },
      sm: { name: 'shadow-sm', css: '0 0 0 1.5px #000000', blur: 0, y: 0 },
      md: { name: 'shadow-md', css: '0 0 0 2px #000000', blur: 0, y: 0 },
      lg: { name: 'shadow-lg', css: '0 0 0 2.5px #000000', blur: 0, y: 0 },
      xl: { name: 'shadow-xl', css: '0 0 0 3px #000000', blur: 0, y: 0 },
      '2xl': { name: 'shadow-2xl', css: '0 0 0 4px #000000', blur: 0, y: 0 },
      inner: { name: 'shadow-inner', css: 'inset 0 0 0 2px #000000', blur: 0, y: 0 },
    };
  }

  const alpha1 = mode === 'dark' ? 0.35 : 0.05;
  const alpha2 = mode === 'dark' ? 0.45 : 0.1;
  const color = mode === 'dark' ? '0 0 0' : '0 0 0';

  return {
    none: { name: 'shadow-none', css: 'none', blur: 0, y: 0 },
    xs: {
      name: 'shadow-xs',
      css: `0 1px 2px 0 rgba(${color}, ${alpha1})`,
      blur: 2,
      y: 1,
    },
    sm: {
      name: 'shadow-sm',
      css: `0 1px 3px 0 rgba(${color}, ${alpha2}), 0 1px 2px -1px rgba(${color}, ${alpha2})`,
      blur: 3,
      y: 1,
    },
    md: {
      name: 'shadow-md',
      css: `0 4px 6px -1px rgba(${color}, ${alpha2}), 0 2px 4px -2px rgba(${color}, ${alpha2})`,
      blur: 6,
      y: 4,
    },
    lg: {
      name: 'shadow-lg',
      css: `0 10px 15px -3px rgba(${color}, ${alpha2}), 0 4px 6px -4px rgba(${color}, ${alpha2})`,
      blur: 15,
      y: 10,
    },
    xl: {
      name: 'shadow-xl',
      css: `0 20px 25px -5px rgba(${color}, ${alpha2}), 0 8px 10px -6px rgba(${color}, ${alpha2})`,
      blur: 25,
      y: 20,
    },
    '2xl': {
      name: 'shadow-2xl',
      css: `0 25px 50px -12px rgba(${color}, ${alpha2 * 1.5})`,
      blur: 50,
      y: 25,
    },
    inner: {
      name: 'shadow-inner',
      css: `inset 0 2px 4px 0 rgba(${color}, ${alpha1})`,
      blur: 4,
      y: 2,
    },
  };
}
