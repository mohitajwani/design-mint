/**
 * @designmint/figma-sync
 *
 * Exports tokens to Figma Variables API & Tokens Studio plugin formats
 */

import { DesignTokens } from '@designmint/core';

export interface FigmaVariable {
  name: string;
  type: 'COLOR' | 'FLOAT' | 'STRING';
  valuesByMode: Record<string, any>;
  description?: string;
}

export interface FigmaCollection {
  name: string;
  modes: { modeId: string; name: string }[];
  defaultModeId: string;
  variables: FigmaVariable[];
}

/**
 * Converts DesignMint tokens to Figma Variables API format
 */
export function exportToFigmaVariables(tokens: DesignTokens): FigmaCollection[] {
  const modes = [
    { modeId: 'mode-light', name: 'Light' },
    { modeId: 'mode-dark', name: 'Dark' },
    { modeId: 'mode-hc', name: 'High Contrast' },
  ];

  const colorVariables: FigmaVariable[] = [];

  // Semantic Theme Colors across modes
  colorVariables.push({
    name: 'canvas/background',
    type: 'COLOR',
    valuesByMode: {
      'mode-light': tokens.themes.light.background.canvas,
      'mode-dark': tokens.themes.dark.background.canvas,
      'mode-hc': tokens.themes.highContrast.background.canvas,
    },
    description: 'Main canvas background color',
  });

  colorVariables.push({
    name: 'surface/background',
    type: 'COLOR',
    valuesByMode: {
      'mode-light': tokens.themes.light.background.surface,
      'mode-dark': tokens.themes.dark.background.surface,
      'mode-hc': tokens.themes.highContrast.background.surface,
    },
    description: 'Component surface background',
  });

  colorVariables.push({
    name: 'text/primary',
    type: 'COLOR',
    valuesByMode: {
      'mode-light': tokens.themes.light.text.primary,
      'mode-dark': tokens.themes.dark.text.primary,
      'mode-hc': tokens.themes.highContrast.text.primary,
    },
    description: 'High emphasis body and heading text',
  });

  colorVariables.push({
    name: 'action/primary',
    type: 'COLOR',
    valuesByMode: {
      'mode-light': tokens.themes.light.action.primary,
      'mode-dark': tokens.themes.dark.action.primary,
      'mode-hc': tokens.themes.highContrast.action.primary,
    },
    description: 'Primary button and call to action color',
  });

  // Numeric spacing variables
  const spacingVariables: FigmaVariable[] = [];
  for (const [key, t] of Object.entries(tokens.spacing)) {
    spacingVariables.push({
      name: `spacing/${key}`,
      type: 'FLOAT',
      valuesByMode: {
        'mode-light': t.valuePx,
        'mode-dark': t.valuePx,
        'mode-hc': t.valuePx,
      },
    });
  }

  return [
    {
      name: 'Colors & Themes',
      modes,
      defaultModeId: 'mode-light',
      variables: colorVariables,
    },
    {
      name: 'Dimensions & Spacing',
      modes: [{ modeId: 'default', name: 'Default' }],
      defaultModeId: 'default',
      variables: spacingVariables,
    },
  ];
}

/**
 * Converts DesignMint tokens to Tokens Studio (Figma Tokens Plugin) JSON format
 */
export function exportToTokensStudio(tokens: DesignTokens): Record<string, any> {
  const globalTokens: Record<string, any> = {
    colors: {},
    spacing: {},
  };

  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    globalTokens.colors[scaleName] = {};
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      globalTokens.colors[scaleName][step] = {
        value: t.hex,
        type: 'color',
      };
    }
  }

  for (const [key, t] of Object.entries(tokens.spacing)) {
    globalTokens.spacing[key] = {
      value: `${t.valuePx}px`,
      type: 'spacing',
    };
  }

  return {
    global: globalTokens,
    $themes: [
      { id: 'light', name: 'Light', selectedTokenSets: { global: 'enabled' } },
      { id: 'dark', name: 'Dark', selectedTokenSets: { global: 'enabled' } },
      { id: 'high-contrast', name: 'High Contrast', selectedTokenSets: { global: 'enabled' } },
    ],
  };
}
