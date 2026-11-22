/**
 * Button component definition with full accessibility specs
 */

import { ComponentDefinition } from '../schemas/component.js';

export const ButtonComponent: ComponentDefinition = {
  name: 'Button',
  category: 'actions',
  description: 'Interactive button component used to trigger actions, submissions, or events.',
  tokens: {
    colors: {
      primaryBg: '--dm-color-primary-600',
      primaryHoverBg: '--dm-color-primary-700',
      primaryActiveBg: '--dm-color-primary-800',
      primaryText: '#FFFFFF',
      focusRing: '--dm-focus-ring-color',
    },
    spacing: {
      paddingXSm: '--dm-space-3',
      paddingYSm: '--dm-space-1-half',
      paddingXMd: '--dm-space-4',
      paddingYMd: '--dm-space-2',
      paddingXLg: '--dm-space-6',
      paddingYLg: '--dm-space-3',
      gap: '--dm-space-2',
    },
    typography: {
      fontSizeSm: '--dm-font-size-sm',
      fontSizeMd: '--dm-font-size-base',
      fontSizeLg: '--dm-font-size-lg',
      fontWeight: '600',
    },
    borders: {
      radius: '--dm-radius-md',
      width: '--dm-border-thin',
    },
  },
  variants: {
    variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
    size: ['sm', 'md', 'lg'],
  },
  states: ['default', 'hover', 'active', 'focus', 'disabled', 'loading'],
  props: [
    {
      name: 'children',
      type: 'ReactNode | string',
      required: true,
      description: 'Button text or content',
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
      required: false,
      default: 'primary',
      description: 'Visual appearance variant',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      default: 'md',
      description: 'Button size (all maintain min 44px touch target on mobile)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disables button interactions',
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Shows loading spinner and disables click',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessibility label required if button contains icon-only',
    },
  ],
  accessibility: {
    role: 'button',
    aria: {
      label: 'conditional', // Required if no visible text
      describedby: 'optional',
      live: 'off',
      expanded: 'none',
      pressed: 'none',
      selected: 'none',
    },
    keyboard: {
      focusable: true,
      tabOrder: 'natural',
      shortcuts: [
        { key: 'Enter', action: 'Triggers click event' },
        { key: 'Space', action: 'Triggers click event' },
      ],
      focusIndicator: {
        style: 'ring',
        colorToken: '--dm-focus-ring-color',
        width: '2px',
      },
    },
    screenReader: {
      roleDescription: 'Button',
      talkback: {
        contentDescription: '{label}, button. Double-tap to activate.',
      },
      voiceover: {
        trait: 'button',
        hint: 'Double tap to activate',
      },
    },
    touch: {
      minTargetSize: '44px',
      haptic: {
        onTap: 'light',
        onError: 'error',
      },
    },
    visual: {
      minContrastRatio: 4.5,
      colorNotSoleIndicator: true,
      focusVisible: true,
    },
  },
  guidelines: {
    do: [
      'Use clear, action-oriented verb labels (e.g. "Save Changes", "Create Account")',
      'Provide an explicit aria-label for icon-only buttons',
      'Keep button text on a single line',
      'Use Destructive variant with a confirmation modal for irreversible actions',
    ],
    dont: [
      'Do not use generic labels like "Click Here" or "Submit" without context',
      'Do not disable button styling without reflecting aria-disabled="true" or disabled attribute',
      'Do not rely solely on color to convey loading or disabled states',
    ],
    whenToUse: 'Use Button for initiating discrete actions, submitting forms, or opening dialogs. For navigating between URLs, use Link instead.',
    alternatives: ['Link', 'IconButton', 'FAB'],
  },
};
