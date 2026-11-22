/**
 * Unit tests for DesignMint Core Engine
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  generateColorScale,
  getContrastRatio,
  generateSpacingScale,
  generateDesignSystem,
  defaultRegistry,
  checkContrast,
} from '../dist/index.js';

describe('DesignMint Core Generator Tests', () => {
  test('Color Scale generation generates 11 shades with hex values', () => {
    const scale = generateColorScale('#2563EB', 'primary');
    assert.strictEqual(typeof scale['50'].hex, 'string');
    assert.strictEqual(typeof scale['500'].hex, 'string');
    assert.strictEqual(typeof scale['950'].hex, 'string');
    assert.strictEqual(scale['500'].name, 'primary-500');
  });

  test('WCAG contrast ratio matches expected mathematical boundaries', () => {
    const whiteOnBlack = getContrastRatio('#FFFFFF', '#000000');
    assert.strictEqual(whiteOnBlack, 21);

    const sameColor = getContrastRatio('#FFFFFF', '#FFFFFF');
    assert.strictEqual(sameColor, 1);

    const check = checkContrast('#000000', '#FFFFFF');
    assert.strictEqual(check.meetsAANormal, true);
    assert.strictEqual(check.meetsAAANormal, true);
  });

  test('Spacing scale generates valid rem and px tokens on 4px base', () => {
    const spacing = generateSpacingScale(4, 'linear');
    assert.strictEqual(spacing['space-1'].px, '4px');
    assert.strictEqual(spacing['space-2'].px, '8px');
    assert.strictEqual(spacing['space-4'].px, '16px');
    assert.strictEqual(spacing['space-4'].rem, '1rem');
  });

  test('Master generator orchestrator generates complete system and exporters', () => {
    const ds = generateDesignSystem({
      name: 'Test Brand',
      colors: { primary: '#2563EB' },
    });

    assert.strictEqual(ds.config.name, 'Test Brand');
    assert.ok(ds.tokens.colors.primary['500']);
    assert.ok(ds.audit.score > 0);

    // Test all exporters generate non-empty strings
    assert.ok(ds.exporters.css().includes(':root'));
    assert.ok(ds.exporters.tailwind().includes('module.exports'));
    assert.ok(ds.exporters.json().includes('Test Brand'));
    assert.ok(ds.exporters.dtcg().includes('$type'));
    assert.ok(ds.exporters.swift().includes('DesignMintTokens'));
    assert.ok(ds.exporters.compose().includes('DesignMintTheme'));
    assert.ok(ds.exporters.flutter().includes('createDesignMintTheme'));
  });

  test('Component Registry recommends appropriate components based on queries', () => {
    const toggleRec = defaultRegistry.recommend('instant binary dark mode switch');
    assert.strictEqual(toggleRec.recommendedComponent.name, 'Toggle');

    const checkRec = defaultRegistry.recommend('pick multiple permissions');
    assert.strictEqual(checkRec.recommendedComponent.name, 'Checkbox');

    const modalRec = defaultRegistry.recommend('critical delete confirmation dialog');
    assert.strictEqual(modalRec.recommendedComponent.name, 'Modal');
  });
});
