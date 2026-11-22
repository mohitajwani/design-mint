/**
 * Typography token generator, type scales, and free Google Fonts catalog
 */

export interface FontSizeToken {
  name: string;
  sizePx: number;
  sizeRem: string;
  lineHeight: number;
  lineHeightPx: number;
}

export interface FreeFontMeta {
  family: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  weights: number[];
  googleFontUrl: string;
  recommendedFor: 'heading' | 'body' | 'mono' | 'both';
  characteristics: string[];
}

export const FREE_FONTS: Record<string, FreeFontMeta> = {
  'Plus Jakarta Sans': {
    family: 'Plus Jakarta Sans',
    category: 'sans-serif',
    weights: [400, 500, 600, 700, 800],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
    recommendedFor: 'heading',
    characteristics: ['Modern', 'Geometric', 'Clean', 'High legibility'],
  },
  Inter: {
    family: 'Inter',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    recommendedFor: 'body',
    characteristics: ['Neutral', 'Screen-optimized', 'Tall x-height'],
  },
  Outfit: {
    family: 'Outfit',
    category: 'sans-serif',
    weights: [400, 500, 600, 700, 800],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
    recommendedFor: 'heading',
    characteristics: ['Contemporary', 'Friendly', 'Distinctive'],
  },
  'JetBrains Mono': {
    family: 'JetBrains Mono',
    category: 'monospace',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
    recommendedFor: 'mono',
    characteristics: ['Code-friendly', 'Distinct ligatures', 'Crisp'],
  },
  'Fira Code': {
    family: 'Fira Code',
    category: 'monospace',
    weights: [400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap',
    recommendedFor: 'mono',
    characteristics: ['Popular', 'Clear punctuation'],
  },
  Merriweather: {
    family: 'Merriweather',
    category: 'serif',
    weights: [300, 400, 700, 900],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap',
    recommendedFor: 'body',
    characteristics: ['Editorial', 'High readability', 'Warm'],
  },
  'Playfair Display': {
    family: 'Playfair Display',
    category: 'serif',
    weights: [400, 600, 700, 800, 900],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&display=swap',
    recommendedFor: 'heading',
    characteristics: ['Elegant', 'Editorial', 'High contrast'],
  },
  Poppins: {
    family: 'Poppins',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    recommendedFor: 'both',
    characteristics: ['Geometric', 'Friendly', 'Versatile'],
  },
  Roboto: {
    family: 'Roboto',
    category: 'sans-serif',
    weights: [300, 400, 500, 700],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    recommendedFor: 'body',
    characteristics: ['Workhorse', 'Material design standard'],
  },
  Montserrat: {
    family: 'Montserrat',
    category: 'sans-serif',
    weights: [400, 500, 600, 700, 800],
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
    recommendedFor: 'heading',
    characteristics: ['Urban', 'Authoritative', 'Wide'],
  },
};

export interface TypographyTokens {
  fontFamilies: {
    heading: string;
    body: string;
    mono: string;
    headingStack: string;
    bodyStack: string;
    monoStack: string;
  };
  fontSizes: Record<string, FontSizeToken>;
  fontWeights: Record<string, number>;
  lineHeights: Record<string, number>;
  letterSpacing: Record<string, string>;
}

export function generateTypographyTokens(
  headingFont: string = 'Plus Jakarta Sans',
  bodyFont: string = 'Inter',
  monoFont: string = 'JetBrains Mono',
  baseSize: number = 16,
  scaleRatio: number = 1.25 // Major Third ratio (standard web harmony)
): TypographyTokens {
  const headingStack = `"${headingFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const bodyStack = `"${bodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
  const monoStack = `"${monoFont}", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

  const scaleNames = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
  const scaleExponents: Record<string, number> = {
    xs: -2,
    sm: -1,
    base: 0,
    md: 0.5,
    lg: 1,
    xl: 2,
    '2xl': 3,
    '3xl': 4,
    '4xl': 5,
    '5xl': 6,
    '6xl': 7,
  };

  const fontSizes: Record<string, FontSizeToken> = {};

  for (const name of scaleNames) {
    const exp = scaleExponents[name];
    const sizePx = Math.round(baseSize * Math.pow(scaleRatio, exp) * 10) / 10;
    const sizeRem = `${Math.round((sizePx / 16) * 1000) / 1000}rem`;

    // Dynamic line height: headings get tighter line-height, body text gets looser
    let lh = 1.5;
    if (sizePx >= 36) lh = 1.15;
    else if (sizePx >= 24) lh = 1.25;
    else if (sizePx >= 20) lh = 1.35;
    else if (sizePx <= 13) lh = 1.4;

    fontSizes[name] = {
      name: `font-size-${name}`,
      sizePx,
      sizeRem,
      lineHeight: lh,
      lineHeightPx: Math.round(sizePx * lh),
    };
  }

  return {
    fontFamilies: {
      heading: headingFont,
      body: bodyFont,
      mono: monoFont,
      headingStack,
      bodyStack,
      monoStack,
    },
    fontSizes,
    fontWeights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      none: 1,
      tight: 1.15,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  };
}
