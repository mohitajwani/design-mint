#!/usr/bin/env node

/**
 * @designmint/cli
 *
 * Mint your design system in minutes.
 */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { generateCommand } from './commands/generate.js';
import { auditCommand } from './commands/audit.js';
import { recommendCommand } from './commands/recommend.js';

const program = new Command();

program
  .name('designmint')
  .description('Accessibility-first design system generator with multi-platform tokens & MCP integration')
  .version('0.1.0');

program
  .command('init')
  .description('Create a starter designmint.config.yaml file')
  .option('-t, --template <name>', 'Template preset (minimal, corporate, playful)')
  .action(initCommand);

program
  .command('generate')
  .description('Generate multi-platform design tokens from config')
  .option('-c, --config <path>', 'Path to designmint config file', 'designmint.config.yaml')
  .option('-o, --output <dir>', 'Output directory', 'dist/designmint')
  .option('-p, --platform <platform>', 'Target platform: web, ios, android, flutter, all', 'all')
  .action(generateCommand);

program
  .command('audit')
  .description('Run automated WCAG 2.2 accessibility audit')
  .option('-c, --config <path>', 'Path to designmint config file', 'designmint.config.yaml')
  .action(auditCommand);

program
  .command('recommend <query>')
  .description('Ask which UI component to use for a specific user interaction need')
  .action(recommendCommand);

program.parse(process.argv);
