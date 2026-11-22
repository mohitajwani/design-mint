/**
 * Zod schemas for Token system output
 */

import { z } from 'zod';

export const DesignTokensSchema = z.object({
  brandName: z.string(),
  version: z.string().default('0.1.0'),
  colors: z.record(z.any()),
  spacing: z.record(z.any()),
  typography: z.record(z.any()),
  shadows: z.record(z.any()),
  borders: z.record(z.any()),
  breakpoints: z.record(z.any()),
  motion: z.record(z.any()),
  zIndex: z.record(z.any()),
  focus: z.record(z.any()),
  touch: z.record(z.any()),
  themes: z.object({
    light: z.record(z.any()),
    dark: z.record(z.any()),
    highContrast: z.record(z.any()),
  }),
});

export type DesignTokens = z.infer<typeof DesignTokensSchema>;
