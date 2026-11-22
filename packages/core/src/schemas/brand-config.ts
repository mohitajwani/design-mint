/**
 * Zod schemas for Brand Configuration
 */

import { z } from 'zod';

export const BrandColorsSchema = z.object({
  primary: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color'),
  secondary: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
  accent: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
  neutral: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
  success: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
  warning: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
  error: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
  info: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color').optional(),
});

export const TypographyConfigSchema = z.object({
  headingFont: z.string().default('Plus Jakarta Sans'),
  bodyFont: z.string().default('Inter'),
  monoFont: z.string().default('JetBrains Mono'),
  baseSize: z.number().default(16),
  scaleRatio: z.number().default(1.25),
});

export const SpacingConfigSchema = z.object({
  base: z.number().default(4),
  scaleType: z.enum(['linear', 'fibonacci', 'golden-ratio']).default('linear'),
});

export const AccessibilityConfigSchema = z.object({
  compliance: z.enum(['AA', 'AAA']).default('AA'),
  themes: z.array(z.enum(['light', 'dark', 'high-contrast'])).default(['light', 'dark', 'high-contrast']),
  reducedMotion: z.boolean().default(true),
  minTouchTargetPx: z.number().default(44),
  colorBlindSafe: z.boolean().default(true),
});

export const BrandConfigSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  description: z.string().optional(),
  website: z.string().url().optional(),
  colors: BrandColorsSchema,
  typography: TypographyConfigSchema.default({}),
  spacing: SpacingConfigSchema.default({}),
  borders: z.object({
    radius: z.enum(['sharp', 'slightly-rounded', 'rounded', 'pill']).default('rounded'),
  }).default({}),
  accessibility: AccessibilityConfigSchema.default({}),
  preferences: z.object({
    mode: z.enum(['light', 'dark', 'both', 'all']).default('all'),
    density: z.enum(['compact', 'comfortable', 'spacious']).default('comfortable'),
    style: z.enum(['minimal', 'modern', 'playful', 'corporate']).default('modern'),
  }).default({}),
});

export type BrandConfig = z.infer<typeof BrandConfigSchema>;
export type BrandColors = z.infer<typeof BrandColorsSchema>;
