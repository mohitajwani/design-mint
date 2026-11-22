/**
 * Responsive breakpoint token generator
 */

export interface BreakpointToken {
  name: string;
  minWidthPx: number;
  px: string;
  mediaQuery: string;
}

export function generateBreakpoints(): Record<string, BreakpointToken> {
  const points: Record<string, number> = {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  const result: Record<string, BreakpointToken> = {};
  for (const [key, val] of Object.entries(points)) {
    result[key] = {
      name: `breakpoint-${key}`,
      minWidthPx: val,
      px: `${val}px`,
      mediaQuery: `@media (min-width: ${val}px)`,
    };
  }
  return result;
}
