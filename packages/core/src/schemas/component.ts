/**
 * Component definition schema with full accessibility specs
 */

import { z } from 'zod';

export const ComponentCategorySchema = z.enum([
  'actions',
  'inputs',
  'display',
  'layout',
  'navigation',
  'feedback',
  'data'
]);
export type ComponentCategory = z.infer<typeof ComponentCategorySchema>;

export const ComponentPropSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean().default(false),
  default: z.any().optional(),
  description: z.string(),
});

export const ComponentAccessibilitySchema = z.object({
  role: z.string(),
  aria: z.object({
    label: z.enum(['required', 'optional', 'none', 'conditional']).optional(),
    describedby: z.enum(['required', 'optional', 'none', 'conditional']).optional(),
    live: z.enum(['off', 'polite', 'assertive']).optional(),
    expanded: z.enum(['required', 'optional', 'none', 'conditional']).optional(),
    pressed: z.enum(['required', 'optional', 'none', 'conditional']).optional(),
    selected: z.enum(['required', 'optional', 'none', 'conditional']).optional(),
    checked: z.enum(['required', 'optional', 'none', 'conditional']).optional(),
  }).optional().default({}),
  keyboard: z.object({
    focusable: z.boolean().default(true),
    tabOrder: z.enum(['natural', 'custom', 'none']).optional().default('natural'),
    shortcuts: z.array(z.object({
      key: z.string(),
      action: z.string(),
    })).optional().default([]),
    focusIndicator: z.object({
      style: z.string().optional(),
      colorToken: z.string().optional(),
      width: z.string().optional(),
    }).optional().default({}),
  }).optional().default({ focusable: true }),
  screenReader: z.object({
    roleDescription: z.string(),
    talkback: z.object({
      contentDescription: z.string(),
      traversalOrder: z.string().optional(),
    }).optional(),
    voiceover: z.object({
      trait: z.string().optional(),
      hint: z.string().optional(),
    }).optional(),
  }),
  touch: z.object({
    minTargetSize: z.string().optional().default('44px'),
    haptic: z.object({
      onTap: z.string().optional(),
      onLongPress: z.string().optional(),
      onToggle: z.string().optional(),
      onSuccess: z.string().optional(),
      onError: z.string().optional(),
    }).optional().default({}),
  }).optional().default({ minTargetSize: '44px' }),
  visual: z.object({
    minContrastRatio: z.number().optional().default(4.5),
    colorNotSoleIndicator: z.boolean().optional().default(true),
    focusVisible: z.boolean().optional().default(true),
  }).optional().default({}),
});

export const ComponentGuidelinesSchema = z.object({
  do: z.array(z.string()).default([]),
  dont: z.array(z.string()).default([]),
  whenToUse: z.string(),
  alternatives: z.array(z.string()).optional().default([]),
});

export const ComponentDefinitionSchema = z.object({
  name: z.string(),
  category: ComponentCategorySchema,
  description: z.string(),
  tokens: z.object({
    colors: z.record(z.string()).optional(),
    spacing: z.record(z.string()).optional(),
    typography: z.record(z.string()).optional(),
    borders: z.record(z.string()).optional(),
    shadows: z.record(z.string()).optional(),
  }).optional().default({}),
  variants: z.record(z.array(z.string())).optional().default({}),
  states: z.array(z.string()).optional().default(['default', 'hover', 'active', 'focus', 'disabled']),
  props: z.array(ComponentPropSchema).optional().default([]),
  accessibility: ComponentAccessibilitySchema,
  guidelines: ComponentGuidelinesSchema,
});

export type ComponentDefinition = z.input<typeof ComponentDefinitionSchema>;
export type ComponentAccessibility = z.input<typeof ComponentAccessibilitySchema>;
export type ComponentGuidelines = z.input<typeof ComponentGuidelinesSchema>;
