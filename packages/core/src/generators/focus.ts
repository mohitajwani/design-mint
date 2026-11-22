/**
 * Focus ring and indicator tokens for keyboard navigation accessibility (WCAG 2.4.7 / 2.4.11)
 */

export interface FocusTokens {
  ringColor: string;
  ringWidth: string;
  ringOffset: string;
  ringStyle: string;
  outline: string;
  cssVariableMap: Record<string, string>;
}

export function generateFocusTokens(
  primaryHex: string = '#2563EB',
  mode: 'light' | 'dark' | 'high-contrast' = 'light'
): FocusTokens {
  if (mode === 'high-contrast') {
    return {
      ringColor: '#000000',
      ringWidth: '3px',
      ringOffset: '3px',
      ringStyle: 'solid',
      outline: '3px solid #000000',
      cssVariableMap: {
        '--dm-focus-ring-color': '#000000',
        '--dm-focus-ring-width': '3px',
        '--dm-focus-ring-offset': '3px',
        '--dm-focus-ring-style': 'solid',
        '--dm-focus-outline': '3px solid #000000',
      },
    };
  }

  const ringColor = mode === 'dark' ? '#60A5FA' : primaryHex;
  const ringWidth = '2px';
  const ringOffset = '2px';

  return {
    ringColor,
    ringWidth,
    ringOffset,
    ringStyle: 'solid',
    outline: `${ringWidth} solid ${ringColor}`,
    cssVariableMap: {
      '--dm-focus-ring-color': ringColor,
      '--dm-focus-ring-width': ringWidth,
      '--dm-focus-ring-offset': ringOffset,
      '--dm-focus-ring-style': 'solid',
      '--dm-focus-outline': `${ringWidth} solid ${ringColor}`,
    },
  };
}
