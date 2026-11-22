/**
 * Z-index scale token generator
 */

export interface ZIndexToken {
  name: string;
  value: number;
}

export function generateZIndexScale(): Record<string, ZIndexToken> {
  const scale: Record<string, number> = {
    hide: -1,
    base: 0,
    elevated: 1,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  };

  const result: Record<string, ZIndexToken> = {};
  for (const [key, value] of Object.entries(scale)) {
    result[key] = {
      name: `z-${key}`,
      value,
    };
  }
  return result;
}
