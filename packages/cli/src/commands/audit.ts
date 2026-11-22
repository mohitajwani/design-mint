/**
 * CLI Audit Command — Runs WCAG 2.2 accessibility audit on design system
 */

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import { generateDesignSystem } from '@designmint/core';

export async function auditCommand(options: { config?: string }): Promise<void> {
  const configPath = path.resolve(process.cwd(), options.config || 'designmint.config.yaml');

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found at: ${configPath}`);
    console.log('Run `designmint init` to create one.');
    process.exit(1);
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  const parsed = configPath.endsWith('.json') ? JSON.parse(raw) : yaml.parse(raw);
  const brandData = parsed.brand || parsed;

  console.log(`\n🔍 Running WCAG 2.2 Accessibility Audit for "${brandData.name}"...\n`);

  const ds = generateDesignSystem(brandData);
  const audit = ds.audit;

  const scoreEmoji = audit.score >= 90 ? '🟢' : audit.score >= 75 ? '🟡' : '🔴';
  console.log(`${scoreEmoji} Accessibility Score: ${audit.score}/100 (Target Level: WCAG ${audit.level})\n`);
  console.log(`Status: ${audit.overallStatus.toUpperCase()}`);
  console.log(`Passed: ${audit.summary.passed} | Warnings: ${audit.summary.warnings} | Failures: ${audit.summary.failures}\n`);

  console.log('─'.repeat(70));
  for (const check of audit.checks) {
    const icon = check.severity === 'pass' ? '✅' : check.severity === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} [${check.category.toUpperCase()}] ${check.rule}`);
    console.log(`   ${check.message}`);
    if (check.remediation) {
      console.log(`   💡 Remediation: ${check.remediation}`);
    }
    console.log('');
  }
  console.log('─'.repeat(70));
}
