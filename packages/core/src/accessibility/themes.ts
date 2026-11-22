/**
 * Multi-theme generator: Light, Dark, and High Contrast
 */

import { ColorScale, hexToHsl, hslToHex } from '../generators/color.js';
import { ThemeMode } from '../schemas/accessibility.js';

export interface ThemeColors {
  mode: ThemeMode;
  background: {
    canvas: string;
    surface: string;
    surfaceElevated: string;
    subtle: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
  };
  action: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    primaryText: string;
  };
}

export function generateThemeColors(
  primaryScale: ColorScale,
  neutralScale: ColorScale,
  mode: ThemeMode
): ThemeColors {
  if (mode === 'light') {
    return {
      mode: 'light',
      background: {
        canvas: '#FFFFFF',
        surface: neutralScale['50'].hex,
        surfaceElevated: '#FFFFFF',
        subtle: neutralScale['100'].hex,
      },
      text: {
        primary: neutralScale['900'].hex,
        secondary: neutralScale['700'].hex,
        muted: neutralScale['500'].hex,
        inverse: '#FFFFFF',
      },
      border: {
        default: neutralScale['200'].hex,
        subtle: neutralScale['100'].hex,
        strong: neutralScale['400'].hex,
      },
      action: {
        primary: primaryScale['600'].hex,
        primaryHover: primaryScale['700'].hex,
        primaryActive: primaryScale['800'].hex,
        primaryText: '#FFFFFF',
      },
    };
  }

  if (mode === 'dark') {
    return {
      mode: 'dark',
      background: {
        canvas: neutralScale['950'].hex,
        surface: neutralScale['900'].hex,
        surfaceElevated: neutralScale['800'].hex,
        subtle: neutralScale['800'].hex,
      },
      text: {
        primary: neutralScale['50'].hex,
        secondary: neutralScale['200'].hex,
        muted: neutralScale['400'].hex,
        inverse: neutralScale['950'].hex,
      },
      border: {
        default: neutralScale['800'].hex,
        subtle: neutralScale['900'].hex,
        strong: neutralScale['600'].hex,
      },
      action: {
        primary: primaryScale['500'].hex,
        primaryHover: primaryScale['400'].hex,
        primaryActive: primaryScale['300'].hex,
        primaryText: '#FFFFFF',
      },
    };
  }

  // High Contrast Mode (WCAG AAA ≥ 7:1)
  return {
    mode: 'high-contrast',
    background: {
      canvas: '#000000',
      surface: '#000000',
      surfaceElevated: '#000000',
      subtle: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      muted: '#E5E5E5',
      inverse: '#000000',
    },
    border: {
      default: '#FFFFFF',
      subtle: '#FFFFFF',
      strong: '#FFFFFF',
    },
    action: {
      primary: '#FFFFFF',
      primaryHover: '#E5E5E5',
      primaryActive: '#CCCCCC',
      primaryText: '#000000',
    },
  };
}
