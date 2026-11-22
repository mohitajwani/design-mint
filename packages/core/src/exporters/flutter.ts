/**
 * Flutter Dart ThemeData and ColorScheme Exporter
 */

import { DesignTokens } from '../schemas/tokens.js';

export function exportToFlutter(tokens: DesignTokens): string {
  const lines: string[] = [];

  lines.push('//');
  lines.push(`// DesignMint Theme for Flutter — ${tokens.brandName}`);
  lines.push('// Generated automatically by DesignMint');
  lines.push('//\n');
  lines.push("import 'package:flutter/material.dart';\n");

  lines.push('class DesignMintTokens {');

  // Colors
  lines.push('  // Color Palette');
  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      const cleanHex = t.hex.replace('#', '').toUpperCase();
      lines.push(`  static const Color ${scaleName}${step} = Color(0xFF${cleanHex});`);
    }
  }

  // Spacing
  lines.push('\n  // Spacing');
  for (const [key, t] of Object.entries(tokens.spacing)) {
    const varName = key.replace('space-', 'space').replace('-', '_');
    lines.push(`  static const double ${varName} = ${t.valuePx}.0;`);
  }

  // Accessibility
  lines.push('\n  // Accessibility');
  lines.push('  static const double minTouchTarget = 48.0;');

  lines.push('}\n');

  // ThemeData constructor
  lines.push('ThemeData createDesignMintTheme({bool isDark = false}) {');
  lines.push('  return ThemeData(');
  lines.push('    brightness: isDark ? Brightness.dark : Brightness.light,');
  lines.push('    primaryColor: DesignMintTokens.primary600,');
  lines.push('    scaffoldBackgroundColor: isDark ? const Color(0xFF121212) : Colors.white,');
  lines.push('  );');
  lines.push('}');

  return lines.join('\n');
}
