/**
 * iOS Swift and SwiftUI Exporter with Dynamic Type and Accessibility Support
 */

import { DesignTokens } from '../schemas/tokens.js';
import { hexToRgb } from '../generators/color.js';

export function exportToSwift(tokens: DesignTokens): string {
  const lines: string[] = [];

  lines.push('//');
  lines.push(`// DesignMintTokens.swift — ${tokens.brandName}`);
  lines.push('// Generated automatically by DesignMint');
  lines.push('//');
  lines.push('\nimport SwiftUI');
  lines.push('import UIKit\n');

  lines.push('public enum DesignMintTokens {');

  // Spacing
  lines.push('    public enum Spacing {');
  for (const [key, t] of Object.entries(tokens.spacing)) {
    const varName = key.replace('space-', 'space_').replace('-', '_');
    lines.push(`        public static let ${varName}: CGFloat = ${t.valuePx}`);
  }
  lines.push('    }\n');

  // Colors
  lines.push('    public enum Colors {');
  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      const rgb = hexToRgb(t.hex);
      const r = (rgb.r / 255).toFixed(3);
      const g = (rgb.g / 255).toFixed(3);
      const b = (rgb.b / 255).toFixed(3);
      lines.push(
        `        public static let ${scaleName}_${step} = Color(red: ${r}, green: ${g}, blue: ${b})`
      );
    }
  }
  lines.push('    }\n');

  // Touch targets (WCAG / Apple Human Interface Guidelines)
  lines.push('    public enum Accessibility {');
  lines.push('        public static let minTouchTarget: CGFloat = 44.0');
  lines.push('        public static let minFocusRingWidth: CGFloat = 2.0');
  lines.push('    }');

  lines.push('}\n');

  // UIKit UIColor extensions
  lines.push('extension UIColor {');
  const primaryRgb = hexToRgb((tokens.colors.primary as any)['600'].hex);
  lines.push(
    `    public static let dmPrimary = UIColor(red: ${(primaryRgb.r / 255).toFixed(3)}, green: ${(primaryRgb.g / 255).toFixed(3)}, blue: ${(primaryRgb.b / 255).toFixed(3)}, alpha: 1.0)`
  );
  lines.push('}\n');

  return lines.join('\n');
}
