/**
 * Touch target and haptic feedback tokens for mobile and accessibility (WCAG 2.5.8)
 */

export interface TouchTokens {
  minTargetSizePx: number;
  minTargetSizeCss: string;
  density: 'compact' | 'comfortable' | 'spacious';
  paddingPx: number;
  hapticPatterns: Record<string, string>;
  cssVariableMap: Record<string, string>;
}

export function generateTouchTokens(
  density: 'compact' | 'comfortable' | 'spacious' = 'comfortable'
): TouchTokens {
  const targetSizes: Record<'compact' | 'comfortable' | 'spacious', number> = {
    compact: 40,      // Minimum mobile size
    comfortable: 44,  // WCAG 2.5.8 Target Size (Minimum) AA
    spacious: 48,     // Android Material guidelines standard
  };

  const minPx = targetSizes[density];

  const hapticPatterns: Record<string, string> = {
    none: 'none',
    selection: 'selection', // Subtle tick e.g. iOS UISelectionFeedbackGenerator
    light: 'light',         // Light impact
    medium: 'medium',       // Medium impact
    heavy: 'heavy',         // Heavy impact e.g. destructive actions
    success: 'success',     // Notification success
    warning: 'warning',     // Notification warning
    error: 'error',         // Notification error
  };

  return {
    minTargetSizePx: minPx,
    minTargetSizeCss: `${minPx}px`,
    density,
    paddingPx: Math.round(minPx / 4),
    hapticPatterns,
    cssVariableMap: {
      '--dm-touch-target-min': `${minPx}px`,
      '--dm-touch-padding': `${Math.round(minPx / 4)}px`,
    },
  };
}
