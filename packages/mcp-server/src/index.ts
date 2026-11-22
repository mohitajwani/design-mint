#!/usr/bin/env node

/**
 * @designmint/mcp-server
 *
 * Model Context Protocol (MCP) Server for DesignMint
 * Allows AI agents to generate, query, audit, and navigate design systems seamlessly.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  generateDesignSystem,
  defaultRegistry,
  generateColorScale,
  generateSemanticColors,
  checkContrast,
  runAccessibilityAudit,
  FREE_FONTS,
} from '@designmint/core';

const server = new Server(
  {
    name: 'designmint-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// 1. List Available Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_design_system',
        description:
          'Generates a complete, accessibility-first design system with tokens, multi-theme colors (light/dark/high-contrast), components, and export options.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Brand or application name' },
            primaryColor: { type: 'string', description: 'Hex code for primary brand color (e.g. #2563EB)' },
            secondaryColor: { type: 'string', description: 'Optional secondary hex color' },
            headingFont: { type: 'string', description: 'Optional heading font family' },
            bodyFont: { type: 'string', description: 'Optional body font family' },
            compliance: { type: 'string', enum: ['AA', 'AAA'], description: 'Target WCAG level (default AA)' },
          },
          required: ['name', 'primaryColor'],
        },
      },
      {
        name: 'recommend_component',
        description:
          'Asks which UI component to use for a specific user interaction or UI requirement, with accessibility notes and guidelines.',
        inputSchema: {
          type: 'object',
          properties: {
            requirement: {
              type: 'string',
              description: 'What the user needs to do (e.g. "pick multiple filters", "instant dark mode setting")',
            },
          },
          required: ['requirement'],
        },
      },
      {
        name: 'get_component',
        description: 'Retrieves complete design specs, tokens, props, and WCAG accessibility details for a specific component.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Component name (e.g. Button, Input, Modal, Select, Tabs, Alert)' },
          },
          required: ['name'],
        },
      },
      {
        name: 'validate_contrast',
        description: 'Checks WCAG 2.2 contrast ratio between two colors and verifies AA and AAA compliance for normal and large text.',
        inputSchema: {
          type: 'object',
          properties: {
            foreground: { type: 'string', description: 'Foreground hex color' },
            background: { type: 'string', description: 'Background hex color' },
          },
          required: ['foreground', 'background'],
        },
      },
      {
        name: 'suggest_palette',
        description: 'Generates an accessible 11-step color scale (50-950) and semantic colors from a single primary hex color.',
        inputSchema: {
          type: 'object',
          properties: {
            primaryColor: { type: 'string', description: 'Primary hex color' },
          },
          required: ['primaryColor'],
        },
      },
      {
        name: 'audit_accessibility',
        description: 'Runs a comprehensive WCAG 2.2 accessibility audit on a brand configuration.',
        inputSchema: {
          type: 'object',
          properties: {
            primaryColor: { type: 'string', description: 'Brand primary hex color' },
            compliance: { type: 'string', enum: ['AA', 'AAA'], default: 'AA' },
          },
          required: ['primaryColor'],
        },
      },
      {
        name: 'get_font_pairing',
        description: 'Returns curated, free Google Font pairings optimized for screen legibility and brand character.',
        inputSchema: {
          type: 'object',
          properties: {
            style: {
              type: 'string',
              enum: ['modern', 'editorial', 'technical', 'friendly'],
              description: 'Aesthetic mood',
            },
          },
        },
      },
      {
        name: 'export_tokens',
        description: 'Exports a design system to platform-specific code (css, tailwind, swift, android, flutter, dtcg).',
        inputSchema: {
          type: 'object',
          properties: {
            primaryColor: { type: 'string', description: 'Primary hex color' },
            brandName: { type: 'string', default: 'App' },
            platform: {
              type: 'string',
              enum: ['css', 'tailwind', 'swift', 'compose', 'compose-multiplatform', 'flutter', 'dtcg', 'json'],
              description: 'Target platform output',
            },
          },
          required: ['primaryColor', 'platform'],
        },
      },
    ],
  };
});

// 2. Handle Tool Invocations
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'recommend_component') {
      const query = String(args?.requirement || '');
      const rec = defaultRegistry.recommend(query);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(rec, null, 2),
          },
        ],
      };
    }

    if (name === 'get_component') {
      const compName = String(args?.name || '');
      const comp = defaultRegistry.get(compName);
      if (!comp) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Component "${compName}" not found in registry.` }],
        };
      }
      return {
        content: [{ type: 'text', text: JSON.stringify(comp, null, 2) }],
      };
    }

    if (name === 'validate_contrast') {
      const fg = String(args?.foreground || '#000000');
      const bg = String(args?.background || '#FFFFFF');
      const result = checkContrast(fg, bg);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }

    if (name === 'suggest_palette') {
      const primaryHex = String(args?.primaryColor || '#2563EB');
      const palette = generateSemanticColors(primaryHex);
      return {
        content: [{ type: 'text', text: JSON.stringify(palette, null, 2) }],
      };
    }

    if (name === 'get_font_pairing') {
      const style = String(args?.style || 'modern');
      const pairings: Record<string, { heading: string; body: string; mono: string; description: string }> = {
        modern: {
          heading: 'Plus Jakarta Sans',
          body: 'Inter',
          mono: 'JetBrains Mono',
          description: 'Contemporary, geometric, neutral tech aesthetic',
        },
        editorial: {
          heading: 'Playfair Display',
          body: 'Merriweather',
          mono: 'JetBrains Mono',
          description: 'High elegance, literary, editorial character',
        },
        technical: {
          heading: 'Outfit',
          body: 'Roboto',
          mono: 'Fira Code',
          description: 'Structured, highly legible, developer-centric',
        },
        friendly: {
          heading: 'Poppins',
          body: 'Inter',
          mono: 'JetBrains Mono',
          description: 'Warm, approachable, rounded personality',
        },
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(pairings[style] || pairings.modern, null, 2) }],
      };
    }

    if (name === 'generate_design_system') {
      const brandName = String(args?.name || 'DesignMint App');
      const primaryHex = String(args?.primaryColor || '#2563EB');
      const ds = generateDesignSystem({
        name: brandName,
        colors: {
          primary: primaryHex,
          secondary: args?.secondaryColor ? String(args.secondaryColor) : undefined,
        },
        typography: {
          headingFont: args?.headingFont ? String(args.headingFont) : undefined,
          bodyFont: args?.bodyFont ? String(args.bodyFont) : undefined,
        },
        accessibility: {
          compliance: (args?.compliance as 'AA' | 'AAA') || 'AA',
        },
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                brandName: ds.config.name,
                auditScore: ds.audit.score,
                tokensSummary: {
                  primaryScale: ds.tokens.colors.primary,
                  semanticColors: {
                    success: ds.tokens.colors.success['500'].hex,
                    warning: ds.tokens.colors.warning['500'].hex,
                    error: ds.tokens.colors.error['500'].hex,
                    info: ds.tokens.colors.info['500'].hex,
                  },
                  spacingSteps: Object.keys(ds.tokens.spacing).length,
                  themesAvailable: Object.keys(ds.tokens.themes),
                },
                componentsCount: ds.components.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    if (name === 'export_tokens') {
      const primaryHex = String(args?.primaryColor || '#2563EB');
      const brandName = String(args?.brandName || 'App');
      const platform = String(args?.platform || 'css');

      const ds = generateDesignSystem({
        name: brandName,
        colors: { primary: primaryHex },
      });

      let output = '';
      if (platform === 'css') output = ds.exporters.css();
      else if (platform === 'tailwind') output = ds.exporters.tailwind();
      else if (platform === 'swift') output = ds.exporters.swift();
      else if (platform === 'compose') output = ds.exporters.compose();
      else if (platform === 'compose-multiplatform') output = JSON.stringify(ds.exporters.composeMultiplatform(), null, 2);
      else if (platform === 'flutter') output = ds.exporters.flutter();
      else if (platform === 'dtcg') output = ds.exporters.dtcg();
      else output = ds.exporters.json();

      return {
        content: [{ type: 'text', text: output }],
      };
    }

    if (name === 'audit_accessibility') {
      const primaryHex = String(args?.primaryColor || '#2563EB');
      const compliance = (args?.compliance as 'AA' | 'AAA') || 'AA';

      const ds = generateDesignSystem({
        name: 'Audit Target',
        colors: { primary: primaryHex },
        accessibility: { compliance },
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(ds.audit, null, 2) }],
      };
    }

    return {
      isError: true,
      content: [{ type: 'text', text: `Unknown tool: ${name}` }],
    };
  } catch (err: any) {
    return {
      isError: true,
      content: [{ type: 'text', text: `Error executing ${name}: ${err.message}` }],
    };
  }
});

// Start transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Fatal MCP Server error:', err);
  process.exit(1);
});
