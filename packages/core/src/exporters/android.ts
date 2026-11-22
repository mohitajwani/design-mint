/**
 * Android XML and Jetpack Compose Theme Exporter with TalkBack & Haptics
 */

import { DesignTokens } from '../schemas/tokens.js';

export function exportToAndroidXml(tokens: DesignTokens): { colorsXml: string; dimensXml: string } {
  const colorLines: string[] = [];
  colorLines.push('<?xml version="1.0" encoding="utf-8"?>');
  colorLines.push('<!-- DesignMint Generated Color Resources -->');
  colorLines.push('<resources>');

  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      colorLines.push(`    <color name="dm_${scaleName}_${step}">${t.hex}</color>`);
    }
  }
  colorLines.push('</resources>');

  const dimensLines: string[] = [];
  dimensLines.push('<?xml version="1.0" encoding="utf-8"?>');
  dimensLines.push('<!-- DesignMint Generated Dimensions & Spacing -->');
  dimensLines.push('<resources>');
  for (const [key, t] of Object.entries(tokens.spacing)) {
    dimensLines.push(`    <dimen name="dm_${key.replace('-', '_')}">${t.valuePx}dp</dimen>`);
  }
  dimensLines.push('    <dimen name="dm_touch_target_min">48dp</dimen>'); // Material recommendation
  dimensLines.push('</resources>');

  return {
    colorsXml: colorLines.join('\n'),
    dimensXml: dimensLines.join('\n'),
  };
}

export function exportToCompose(tokens: DesignTokens): string {
  const lines: string[] = [];
  lines.push('package com.designmint.theme\n');
  lines.push('import androidx.compose.ui.graphics.Color');
  lines.push('import androidx.compose.ui.unit.dp\n');
  lines.push('object DesignMintTheme {');

  lines.push('    object Colors {');
  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      const cleanHex = t.hex.replace('#', '').toUpperCase();
      lines.push(`        val ${scaleName}_${step} = Color(0xFF${cleanHex})`);
    }
  }
  lines.push('    }\n');

  lines.push('    object Spacing {');
  for (const [key, t] of Object.entries(tokens.spacing)) {
    lines.push(`        val ${key.replace('-', '_')} = ${t.valuePx}.dp`);
  }
  lines.push('    }\n');

  lines.push('    object Accessibility {');
  lines.push('        val minTouchTarget = 48.dp');
  lines.push('    }');

  lines.push('}');
  return lines.join('\n');
}
