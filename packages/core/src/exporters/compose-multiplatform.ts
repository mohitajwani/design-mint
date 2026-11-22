/**
 * Compose Multiplatform Exporter
 * Compatible with Android, iOS, Desktop (JVM), and Web (Wasm / JS)
 */

import { DesignTokens } from '../schemas/tokens.js';

export interface ComposeMultiplatformBundle {
  colorKt: string;
  typographyKt: string;
  shapeKt: string;
  themeKt: string;
  accessibilityKt: string;
}

export function exportToComposeMultiplatform(tokens: DesignTokens): ComposeMultiplatformBundle {
  // 1. Color.kt (commonMain)
  const colorLines: string[] = [];
  colorLines.push('// Generated automatically by DesignMint');
  colorLines.push('package com.designmint.theme\n');
  colorLines.push('import androidx.compose.ui.graphics.Color\n');
  colorLines.push('object DesignMintColors {');

  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    colorLines.push(`    // ${scaleName.toUpperCase()} palette`);
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      const cleanHex = t.hex.replace('#', '').toUpperCase();
      colorLines.push(`    val ${scaleName}_${step} = Color(0xFF${cleanHex})`);
    }
  }

  colorLines.push('\n    // Semantic Light Theme');
  colorLines.push(`    val LightCanvas = Color(0xFF${tokens.themes.light.background.canvas.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val LightSurface = Color(0xFF${tokens.themes.light.background.surface.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val LightTextPrimary = Color(0xFF${tokens.themes.light.text.primary.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val LightActionPrimary = Color(0xFF${tokens.themes.light.action.primary.replace('#', '').toUpperCase()})`);

  colorLines.push('\n    // Semantic Dark Theme');
  colorLines.push(`    val DarkCanvas = Color(0xFF${tokens.themes.dark.background.canvas.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val DarkSurface = Color(0xFF${tokens.themes.dark.background.surface.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val DarkTextPrimary = Color(0xFF${tokens.themes.dark.text.primary.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val DarkActionPrimary = Color(0xFF${tokens.themes.dark.action.primary.replace('#', '').toUpperCase()})`);

  colorLines.push('\n    // Semantic High Contrast Theme (WCAG AAA)');
  colorLines.push(`    val HighContrastCanvas = Color(0xFF${tokens.themes.highContrast.background.canvas.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val HighContrastSurface = Color(0xFF${tokens.themes.highContrast.background.surface.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val HighContrastTextPrimary = Color(0xFF${tokens.themes.highContrast.text.primary.replace('#', '').toUpperCase()})`);
  colorLines.push(`    val HighContrastActionPrimary = Color(0xFF${tokens.themes.highContrast.action.primary.replace('#', '').toUpperCase()})`);

  colorLines.push('}\n');

  // 2. Typography.kt
  const typeLines: string[] = [];
  typeLines.push('// Generated automatically by DesignMint');
  typeLines.push('package com.designmint.theme\n');
  typeLines.push('import androidx.compose.material3.Typography');
  typeLines.push('import androidx.compose.ui.text.TextStyle');
  typeLines.push('import androidx.compose.ui.text.font.FontFamily');
  typeLines.push('import androidx.compose.ui.text.font.FontWeight');
  typeLines.push('import androidx.compose.ui.unit.sp\n');
  typeLines.push('val DesignMintTypography = Typography(');
  typeLines.push('    displayLarge = TextStyle(');
  typeLines.push('        fontFamily = FontFamily.Default,');
  typeLines.push('        fontWeight = FontWeight.Bold,');
  typeLines.push(`        fontSize = ${Math.round(tokens.typography.fontSizes['4xl'].sizePx)}.sp,`);
  typeLines.push(`        lineHeight = ${tokens.typography.fontSizes['4xl'].lineHeightPx}.sp`);
  typeLines.push('    ),');
  typeLines.push('    headlineMedium = TextStyle(');
  typeLines.push('        fontFamily = FontFamily.Default,');
  typeLines.push('        fontWeight = FontWeight.SemiBold,');
  typeLines.push(`        fontSize = ${Math.round(tokens.typography.fontSizes['2xl'].sizePx)}.sp,`);
  typeLines.push(`        lineHeight = ${tokens.typography.fontSizes['2xl'].lineHeightPx}.sp`);
  typeLines.push('    ),');
  typeLines.push('    bodyLarge = TextStyle(');
  typeLines.push('        fontFamily = FontFamily.Default,');
  typeLines.push('        fontWeight = FontWeight.Normal,');
  typeLines.push(`        fontSize = ${Math.round(tokens.typography.fontSizes.base.sizePx)}.sp,`);
  typeLines.push(`        lineHeight = ${tokens.typography.fontSizes.base.lineHeightPx}.sp`);
  typeLines.push('    ),');
  typeLines.push('    labelSmall = TextStyle(');
  typeLines.push('        fontFamily = FontFamily.Default,');
  typeLines.push('        fontWeight = FontWeight.Medium,');
  typeLines.push(`        fontSize = ${Math.round(tokens.typography.fontSizes.xs.sizePx)}.sp,`);
  typeLines.push(`        lineHeight = ${tokens.typography.fontSizes.xs.lineHeightPx}.sp`);
  typeLines.push('    )');
  typeLines.push(')\n');

  // 3. Shape.kt
  const shapeLines: string[] = [];
  shapeLines.push('// Generated automatically by DesignMint');
  shapeLines.push('package com.designmint.theme\n');
  shapeLines.push('import androidx.compose.foundation.shape.RoundedCornerShape');
  shapeLines.push('import androidx.compose.material3.Shapes');
  shapeLines.push('import androidx.compose.ui.unit.dp\n');
  shapeLines.push('val DesignMintShapes = Shapes(');
  shapeLines.push(`    small = RoundedCornerShape(${tokens.borders.radii.sm.valuePx}.dp),`);
  shapeLines.push(`    medium = RoundedCornerShape(${tokens.borders.radii.md.valuePx}.dp),`);
  shapeLines.push(`    large = RoundedCornerShape(${tokens.borders.radii.lg.valuePx}.dp),`);
  shapeLines.push(`    extraLarge = RoundedCornerShape(${tokens.borders.radii.xl.valuePx}.dp)`);
  shapeLines.push(')\n');

  // 4. Accessibility.kt (Multiplatform Semantics, TalkBack, VoiceOver & Touch targets)
  const a11yLines: string[] = [];
  a11yLines.push('// Generated automatically by DesignMint');
  a11yLines.push('package com.designmint.theme\n');
  a11yLines.push('import androidx.compose.ui.Modifier');
  a11yLines.push('import androidx.compose.ui.semantics.Role');
  a11yLines.push('import androidx.compose.ui.semantics.contentDescription');
  a11yLines.push('import androidx.compose.ui.semantics.role');
  a11yLines.push('import androidx.compose.ui.semantics.semantics');
  a11yLines.push('import androidx.compose.ui.unit.Dp');
  a11yLines.push('import androidx.compose.ui.unit.dp\n');
  a11yLines.push('object DesignMintAccessibility {');
  a11yLines.push('    /** WCAG 2.5.8 Minimum Touch Target (48dp for Material / 44dp for iOS) */');
  a11yLines.push('    val MinTouchTarget: Dp = 48.dp\n');
  a11yLines.push('    /** WCAG 2.4.7 Focus Indicator Width */');
  a11yLines.push('    val FocusRingWidth: Dp = 2.dp');
  a11yLines.push('    val HighContrastFocusRingWidth: Dp = 3.dp');
  a11yLines.push('}\n');
  a11yLines.push('/**');
  a11yLines.push(' * Accessibility helper extension for Compose Multiplatform');
  a11yLines.push(' */');
  a11yLines.push('fun Modifier.designMintA11y(');
  a11yLines.push('    label: String,');
  a11yLines.push('    role: Role? = null');
  a11yLines.push('): Modifier = semantics {');
  a11yLines.push('    this.contentDescription = label');
  a11yLines.push('    if (role != null) this.role = role');
  a11yLines.push('}\n');

  // 5. Theme.kt (Multiplatform Theme provider)
  const themeLines: string[] = [];
  themeLines.push('// Generated automatically by DesignMint');
  themeLines.push('package com.designmint.theme\n');
  themeLines.push('import androidx.compose.foundation.isSystemInDarkTheme');
  themeLines.push('import androidx.compose.material3.MaterialTheme');
  themeLines.push('import androidx.compose.material3.darkColorScheme');
  themeLines.push('import androidx.compose.material3.lightColorScheme');
  themeLines.push('import androidx.compose.runtime.Composable\n');
  themeLines.push('enum class ThemeMode {');
  themeLines.push('    LIGHT,');
  themeLines.push('    DARK,');
  themeLines.push('    HIGH_CONTRAST,');
  themeLines.push('    SYSTEM');
  themeLines.push('}\n');
  themeLines.push('@Composable');
  themeLines.push('fun DesignMintTheme(');
  themeLines.push('    mode: ThemeMode = ThemeMode.SYSTEM,');
  themeLines.push('    content: @Composable () -> Unit');
  themeLines.push(') {');
  themeLines.push('    val isDark = when (mode) {');
  themeLines.push('        ThemeMode.LIGHT -> false');
  themeLines.push('        ThemeMode.DARK -> true');
  themeLines.push('        ThemeMode.HIGH_CONTRAST -> true');
  themeLines.push('        ThemeMode.SYSTEM -> isSystemInDarkTheme()');
  themeLines.push('    }\n');
  themeLines.push('    val colorScheme = if (mode == ThemeMode.HIGH_CONTRAST) {');
  themeLines.push('        darkColorScheme(');
  themeLines.push('            primary = DesignMintColors.HighContrastActionPrimary,');
  themeLines.push('            background = DesignMintColors.HighContrastCanvas,');
  themeLines.push('            surface = DesignMintColors.HighContrastSurface,');
  themeLines.push('            onPrimary = DesignMintColors.HighContrastCanvas,');
  themeLines.push('            onBackground = DesignMintColors.HighContrastTextPrimary,');
  themeLines.push('            onSurface = DesignMintColors.HighContrastTextPrimary');
  themeLines.push('        )');
  themeLines.push('    } else if (isDark) {');
  themeLines.push('        darkColorScheme(');
  themeLines.push('            primary = DesignMintColors.DarkActionPrimary,');
  themeLines.push('            background = DesignMintColors.DarkCanvas,');
  themeLines.push('            surface = DesignMintColors.DarkSurface,');
  themeLines.push('            onBackground = DesignMintColors.DarkTextPrimary,');
  themeLines.push('            onSurface = DesignMintColors.DarkTextPrimary');
  themeLines.push('        )');
  themeLines.push('    } else {');
  themeLines.push('        lightColorScheme(');
  themeLines.push('            primary = DesignMintColors.LightActionPrimary,');
  themeLines.push('            background = DesignMintColors.LightCanvas,');
  themeLines.push('            surface = DesignMintColors.LightSurface,');
  themeLines.push('            onBackground = DesignMintColors.LightTextPrimary,');
  themeLines.push('            onSurface = DesignMintColors.LightTextPrimary');
  themeLines.push('        )');
  themeLines.push('    }\n');
  themeLines.push('    MaterialTheme(');
  themeLines.push('        colorScheme = colorScheme,');
  themeLines.push('        typography = DesignMintTypography,');
  themeLines.push('        shapes = DesignMintShapes,');
  themeLines.push('        content = content');
  themeLines.push('    )');
  themeLines.push('}\n');

  return {
    colorKt: colorLines.join('\n'),
    typographyKt: typeLines.join('\n'),
    shapeKt: shapeLines.join('\n'),
    accessibilityKt: a11yLines.join('\n'),
    themeKt: themeLines.join('\n'),
  };
}
