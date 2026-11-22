/**
 * DesignMint Master Generator Engine
 */

import { BrandConfig, BrandConfigSchema } from '../schemas/brand-config.js';
import { DesignTokens } from '../schemas/tokens.js';
import { generateSemanticColors } from '../generators/color.js';
import { generateSpacingScale } from '../generators/spacing.js';
import { generateTypographyTokens } from '../generators/typography.js';
import { generateShadowScale } from '../generators/shadows.js';
import { generateBorderRadii, generateBorderWidths } from '../generators/borders.js';
import { generateBreakpoints } from '../generators/breakpoints.js';
import { generateMotionTokens } from '../generators/motion.js';
import { generateZIndexScale } from '../generators/z-index.js';
import { generateFocusTokens } from '../generators/focus.js';
import { generateTouchTokens } from '../generators/touch.js';
import { generateThemeColors } from '../accessibility/themes.js';
import { runAccessibilityAudit } from '../accessibility/audit.js';
import { defaultRegistry } from '../components/registry.js';
import { ComponentDefinition } from '../schemas/component.js';
import { AuditReport } from '../schemas/accessibility.js';
import { exportToCss } from '../exporters/css.js';
import { exportToTailwind } from '../exporters/tailwind.js';
import { exportToJson, exportToDtcg } from '../exporters/json.js';
import { exportToSwift } from '../exporters/ios.js';
import { exportToAndroidXml, exportToCompose } from '../exporters/android.js';
import { exportToFlutter } from '../exporters/flutter.js';

export interface DesignSystem {
  config: BrandConfig;
  tokens: DesignTokens;
  components: ComponentDefinition[];
  audit: AuditReport;
  exporters: {
    css: () => string;
    tailwind: () => string;
    json: () => string;
    dtcg: () => string;
    swift: () => string;
    androidXml: () => { colorsXml: string; dimensXml: string };
    compose: () => string;
    flutter: () => string;
  };
}

export function generateDesignSystem(rawConfig: unknown): DesignSystem {
  const config = BrandConfigSchema.parse(rawConfig);

  // 1. Color Palettes
  const colors = generateSemanticColors(
    config.colors.primary,
    config.colors.secondary,
    config.colors.accent
  );

  // 2. Spacing Scale
  const spacing = generateSpacingScale(config.spacing.base, config.spacing.scaleType);

  // 3. Typography
  const typography = generateTypographyTokens(
    config.typography.headingFont,
    config.typography.bodyFont,
    config.typography.monoFont,
    config.typography.baseSize,
    config.typography.scaleRatio
  );

  // 4. Shadows
  const shadows = generateShadowScale('light');

  // 5. Borders
  const radii = generateBorderRadii(config.borders.radius);
  const widths = generateBorderWidths(false);

  // 6. Breakpoints, Motion, Z-Index
  const breakpoints = generateBreakpoints();
  const motion = generateMotionTokens(config.accessibility.reducedMotion);
  const zIndex = generateZIndexScale();

  // 7. Accessibility Tokens (Focus & Touch)
  const focus = generateFocusTokens(config.colors.primary, 'light');
  const touch = generateTouchTokens(config.preferences.density);

  // 8. Multi-Theme Generation (Light, Dark, High-Contrast)
  const lightTheme = generateThemeColors(colors.primary, colors.neutral, 'light');
  const darkTheme = generateThemeColors(colors.primary, colors.neutral, 'dark');
  const highContrastTheme = generateThemeColors(colors.primary, colors.neutral, 'high-contrast');

  const tokens: DesignTokens = {
    brandName: config.name,
    version: '0.1.0',
    colors,
    spacing,
    typography,
    shadows,
    borders: {
      radii,
      widths,
    },
    breakpoints,
    motion,
    zIndex,
    focus,
    touch,
    themes: {
      light: lightTheme,
      dark: darkTheme,
      highContrast: highContrastTheme,
    },
  };

  // 9. Component Registry
  const components = defaultRegistry.list();

  // 10. Automated Accessibility Audit
  const audit = runAccessibilityAudit(config, components);

  return {
    config,
    tokens,
    components,
    audit,
    exporters: {
      css: () => exportToCss(tokens),
      tailwind: () => exportToTailwind(tokens),
      json: () => exportToJson(tokens),
      dtcg: () => exportToDtcg(tokens),
      swift: () => exportToSwift(tokens),
      androidXml: () => exportToAndroidXml(tokens),
      compose: () => exportToCompose(tokens),
      flutter: () => exportToFlutter(tokens),
    },
  };
}
