import { test, describe } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import path from 'node:path';

describe('CLI Integration Tests', () => {
  const cliPath = path.resolve('dist/index.js');

  test('CLI responds to --help with command descriptions', () => {
    const output = execSync(`node ${cliPath} --help`, { encoding: 'utf8' });
    assert.ok(output.includes('Accessibility-first design system generator'));
    assert.ok(output.includes('generate'));
    assert.ok(output.includes('audit'));
    assert.ok(output.includes('recommend'));
  });

  test('CLI recommend command suggests component with guidelines', () => {
    const output = execSync(`node ${cliPath} recommend "user needs to toggle dark mode instantly"`, { encoding: 'utf8' });
    assert.ok(output.includes('Toggle'));
    assert.ok(output.includes('Accessibility Guidelines'));
  });
});
