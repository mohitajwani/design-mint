/**
 * Border radius and width token generators
 */

export interface RadiusToken {
  name: string;
  valuePx: number;
  px: string;
  rem: string;
}

export interface BorderWidthToken {
  name: string;
  valuePx: number;
  px: string;
}

export type RadiusStyle = 'sharp' | 'slightly-rounded' | 'rounded' | 'pill';

export function generateBorderRadii(style: RadiusStyle = 'rounded'): Record<string, RadiusToken> {
  const multipliers: Record<RadiusStyle, number> = {
    sharp: 0,
    'slightly-rounded': 0.5,
    rounded: 1,
    pill: 1.5,
  };

  const m = multipliers[style];

  const baseValues: Record<string, number> = {
    none: 0,
    xs: m === 0 ? 0 : Math.max(2, Math.round(2 * m)),
    sm: m === 0 ? 0 : Math.max(4, Math.round(4 * m)),
    md: m === 0 ? 0 : Math.max(6, Math.round(8 * m)),
    lg: m === 0 ? 0 : Math.max(8, Math.round(12 * m)),
    xl: m === 0 ? 0 : Math.max(12, Math.round(16 * m)),
    '2xl': m === 0 ? 0 : Math.max(16, Math.round(24 * m)),
    '3xl': m === 0 ? 0 : Math.max(24, Math.round(32 * m)),
    full: 9999,
  };

  const result: Record<string, RadiusToken> = {};
  for (const [key, px] of Object.entries(baseValues)) {
    result[key] = {
      name: `radius-${key}`,
      valuePx: px,
      px: `${px}px`,
      rem: px === 9999 ? '9999px' : `${px / 16}rem`,
    };
  }
  return result;
}

export function generateBorderWidths(highContrast: boolean = false): Record<string, BorderWidthToken> {
  const boost = highContrast ? 1 : 0;
  return {
    none: { name: 'border-0', valuePx: 0, px: '0px' },
    thin: { name: 'border-thin', valuePx: 1 + boost, px: `${1 + boost}px` },
    default: { name: 'border-default', valuePx: 2 + boost, px: `${2 + boost}px` },
    thick: { name: 'border-thick', valuePx: 4 + boost, px: `${4 + boost}px` },
  };
}
