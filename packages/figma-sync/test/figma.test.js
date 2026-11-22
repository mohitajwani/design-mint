import { test, describe } from 'node:test';
import assert from 'node:assert';
import { generateDesignSystem } from '@designmint/core';
import { exportToFigmaVariables, exportToTokensStudio } from '../dist/index.js';

describe('Figma Sync Integration Tests', () => {
  const ds = generateDesignSystem({
    name: 'Figma Test Brand',
    colors: { primary: '#2563EB' },
  });

  test('Exports collections to Figma Variables format', () => {
    const collections = exportToFigmaVariables(ds.tokens);
    assert.strictEqual(Array.isArray(collections), true);
    assert.strictEqual(collections.length >= 2, true);

    const colorCol = collections.find((c) => c.name === 'Colors & Themes');
    assert.ok(colorCol);
    assert.strictEqual(colorCol.modes.length, 3); // Light, Dark, High Contrast
    assert.ok(colorCol.variables.length > 0);
  });

  test('Exports tokens to Tokens Studio JSON format', () => {
    const studio = exportToTokensStudio(ds.tokens);
    assert.ok(studio.global);
    assert.ok(studio.global.colors.primary);
    assert.ok(studio.$themes);
    assert.strictEqual(studio.$themes.length, 3);
  });
});
