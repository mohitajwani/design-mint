/**
 * Complete accessibility audit engine for Design Systems
 */

import { auditColorPairs } from './contrast.js';
import { validateColorBlindSafety } from './color-blind.js';
import { AuditCheck, AuditReport } from '../schemas/accessibility.js';
import { BrandConfig } from '../schemas/brand-config.js';
import { ComponentDefinition } from '../schemas/component.js';

export function runAccessibilityAudit(
  brandConfig: BrandConfig,
  components: ComponentDefinition[] = []
): AuditReport {
  const checks: AuditCheck[] = [];

  // 1. Audit Primary & Semantic Colors on White & Black Canvas
  const colorsToAudit: Record<string, string> = {
    primary: brandConfig.colors.primary,
    ...(brandConfig.colors.secondary ? { secondary: brandConfig.colors.secondary } : {}),
    ...(brandConfig.colors.accent ? { accent: brandConfig.colors.accent } : {}),
  };

  const canvasBg = '#FFFFFF';
  const contrastChecks = auditColorPairs(colorsToAudit, canvasBg, brandConfig.accessibility.compliance);
  checks.push(...contrastChecks);

  // 2. Audit Color-Blind Safety for Semantics
  const semanticColors = {
    success: brandConfig.colors.success || '#10B981',
    error: brandConfig.colors.error || '#EF4444',
    warning: brandConfig.colors.warning || '#F59E0B',
    info: brandConfig.colors.info || '#3B82F6',
  };
  const colorBlindChecks = validateColorBlindSafety(semanticColors);
  checks.push(...colorBlindChecks);

  // 3. Touch Target Audit
  const minTarget = brandConfig.accessibility.minTouchTargetPx;
  const touchPass = minTarget >= 44;
  checks.push({
    id: 'touch-target-size',
    rule: 'WCAG 2.5.8 Target Size (Minimum)',
    wcagCriterion: '2.5.8 Target Size (AA)',
    category: 'touch-target',
    severity: touchPass ? 'pass' : 'fail',
    message: touchPass
      ? `Minimum touch target size is set to ${minTarget}px (meets or exceeds 44px WCAG recommendation)`
      : `Minimum touch target size is set to ${minTarget}px (below 44px recommended for mobile accessibility)`,
    details: { minTouchTargetPx: minTarget, recommended: 44 },
    remediation: touchPass ? undefined : 'Increase minTouchTargetPx in brand configuration to at least 44px',
  });

  // 4. Reduced Motion Preference
  const motionPass = brandConfig.accessibility.reducedMotion === true;
  checks.push({
    id: 'motion-prefers-reduced',
    rule: 'WCAG 2.3.3 Animation from Interactions',
    wcagCriterion: '2.3.3 Animation from Interactions (AAA)',
    category: 'motion',
    severity: motionPass ? 'pass' : 'warning',
    message: motionPass
      ? 'Reduced motion mode is supported and enabled in design system tokens'
      : 'Reduced motion mode is not configured, which may cause vestibular discomfort for users sensitive to motion',
    details: { reducedMotion: brandConfig.accessibility.reducedMotion },
    remediation: motionPass ? undefined : 'Enable reducedMotion: true in your brand accessibility configuration',
  });

  // 5. Component Accessibility Specs Audit
  for (const comp of components) {
    const hasAria = !!comp.accessibility.role;
    const hasKeyboard = comp.accessibility.keyboard?.focusable !== undefined;
    const hasScreenReader = !!comp.accessibility.screenReader?.roleDescription;

    const compPass = hasAria && hasKeyboard && hasScreenReader;

    checks.push({
      id: `component-a11y-${comp.name}`,
      rule: 'Component Accessibility Specification',
      category: 'keyboard',
      severity: compPass ? 'pass' : 'warning',
      message: compPass
        ? `Component "${comp.name}" defines ARIA role (${comp.accessibility.role}), keyboard behavior, and screen reader announcements`
        : `Component "${comp.name}" has incomplete accessibility metadata`,
      details: {
        component: comp.name,
        role: comp.accessibility.role,
        keyboardFocusable: comp.accessibility.keyboard?.focusable,
      },
    });
  }

  // Summary calculation
  const passed = checks.filter((c) => c.severity === 'pass').length;
  const warnings = checks.filter((c) => c.severity === 'warning').length;
  const failures = checks.filter((c) => c.severity === 'fail').length;

  const total = checks.length;
  const score = total > 0 ? Math.round(((passed + warnings * 0.5) / total) * 100) : 100;
  const overallStatus = failures > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass';

  return {
    score,
    overallStatus,
    level: brandConfig.accessibility.compliance,
    summary: {
      totalChecks: total,
      passed,
      warnings,
      failures,
    },
    checks,
    timestamp: new Date().toISOString(),
  };
}
