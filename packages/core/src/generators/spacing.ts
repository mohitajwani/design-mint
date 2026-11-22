/**
 * Spacing token generator supporting linear, fibonacci, and golden ratio scales
 */

export interface SpacingToken {
  name: string;
  step: number;
  valuePx: number;
  px: string;
  rem: string;
  valueRem: number;
}

export type SpacingScaleType = 'linear' | 'fibonacci' | 'golden-ratio';

export function generateSpacingScale(
  base: number = 4,
  scaleType: SpacingScaleType = 'linear'
): Record<string, SpacingToken> {
  const result: Record<string, SpacingToken> = {};

  // Standard step index list: 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 32
  const steps = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64,
  ];

  const fibonacciMap: Record<number, number> = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    7: 48,
    8: 64,
    9: 80,
    10: 96,
    12: 128,
    16: 192,
    20: 256,
  };

  for (const step of steps) {
    let pxVal = 0;
    if (step === 0) {
      pxVal = 0;
    } else if (scaleType === 'linear') {
      pxVal = Math.round(step * base);
    } else if (scaleType === 'fibonacci') {
      pxVal = fibonacciMap[step] !== undefined ? fibonacciMap[step] : Math.round(step * base);
    } else if (scaleType === 'golden-ratio') {
      pxVal = Math.round(base * Math.pow(1.618, Math.min(step, 8) / 2));
    }

    const remVal = pxVal / 16;
    const key = `space-${step}`.replace('.5', '-half');

    result[key] = {
      name: key,
      step,
      valuePx: pxVal,
      px: `${pxVal}px`,
      rem: `${remVal}rem`,
      valueRem: remVal,
    };
  }

  return result;
}
