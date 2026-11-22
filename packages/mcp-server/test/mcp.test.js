import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('MCP Server Integration Tests', () => {
  const serverPath = path.resolve('dist/index.js');

  test('MCP server binary file exists and is executable', () => {
    assert.strictEqual(fs.existsSync(serverPath), true);
    const content = fs.readFileSync(serverPath, 'utf8');
    assert.ok(content.includes('designmint-mcp-server'));
    assert.ok(content.includes('recommend_component'));
    assert.ok(content.includes('generate_design_system'));
  });
});
