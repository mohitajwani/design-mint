/**
 * Accessibility schemas and types
 */

import { z } from 'zod';

export const WCAGLevelSchema = z.enum(['A', 'AA', 'AAA']);
export type WCAGLevel = z.infer<typeof WCAGLevelSchema>;

export const ThemeModeSchema = z.enum(['light', 'dark', 'high-contrast']);
export type ThemeMode = z.infer<typeof ThemeModeSchema>;

export const ColorBlindnessTypeSchema = z.enum([
  'protanopia',   // Red-blind
  'deuteranopia', // Green-blind
  'tritanopia',   // Blue-blind
  'achromatopsia' // Total color blindness
]);
export type ColorBlindnessType = z.infer<typeof ColorBlindnessTypeSchema>;

export const AuditSeveritySchema = z.enum(['pass', 'warning', 'fail']);
export type AuditSeverity = z.infer<typeof AuditSeveritySchema>;

export const AuditCheckSchema = z.object({
  id: z.string(),
  rule: z.string(),
  wcagCriterion: z.string().optional(),
  category: z.enum(['contrast', 'touch-target', 'motion', 'keyboard', 'screen-reader', 'color-blindness']),
  severity: AuditSeveritySchema,
  message: z.string(),
  details: z.record(z.any()).optional(),
  remediation: z.string().optional(),
});
export type AuditCheck = z.infer<typeof AuditCheckSchema>;

export const AuditReportSchema = z.object({
  score: z.number().min(0).max(100),
  overallStatus: z.enum(['pass', 'warning', 'fail']),
  level: WCAGLevelSchema,
  summary: z.object({
    totalChecks: z.number(),
    passed: z.number(),
    warnings: z.number(),
    failures: z.number(),
  }),
  checks: z.array(AuditCheckSchema),
  timestamp: z.string(),
});
export type AuditReport = z.infer<typeof AuditReportSchema>;
