/**
 * Input component definition (TextField & TextArea) with accessibility specs
 */

import { ComponentDefinition } from '../schemas/component.js';

export const InputComponent: ComponentDefinition = {
  name: 'Input',
  category: 'inputs',
  description: 'Text input field allowing users to enter and edit text or numbers.',
  tokens: {
    colors: {
      bg: '--dm-color-surface',
      borderDefault: '--dm-color-neutral-300',
      borderFocus: '--dm-color-primary-500',
      borderError: '--dm-color-error-500',
      text: '--dm-color-neutral-900',
      placeholder: '--dm-color-neutral-400',
    },
    spacing: {
      paddingX: '--dm-space-3-half',
      paddingY: '--dm-space-2-half',
      gap: '--dm-space-1-half',
    },
    typography: {
      fontSize: '--dm-font-size-base',
      fontFamily: '--dm-font-family-body',
    },
    borders: {
      radius: '--dm-radius-md',
      width: '--dm-border-thin',
    },
  },
  variants: {
    variant: ['outlined', 'filled'],
    size: ['sm', 'md', 'lg'],
  },
  states: ['default', 'hover', 'focus', 'error', 'disabled'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label for the input' },
    { name: 'placeholder', type: 'string', required: false, description: 'Hint text inside input' },
    { name: 'helperText', type: 'string', required: false, description: 'Supplementary guidance below field' },
    { name: 'errorMessage', type: 'string', required: false, description: 'Error message when invalid' },
    { name: 'required', type: 'boolean', required: false, default: false, description: 'Marks field as required' },
    { name: 'disabled', type: 'boolean', required: false, default: false, description: 'Disables input' },
    { name: 'type', type: 'string', required: false, default: 'text', description: 'HTML input type (text, email, password, etc)' },
  ],
  accessibility: {
    role: 'textbox',
    aria: {
      label: 'required',
      describedby: 'conditional', // links to helperText or errorMessage id
      live: 'polite',
      expanded: 'none',
      pressed: 'none',
      selected: 'none',
    },
    keyboard: {
      focusable: true,
      tabOrder: 'natural',
      shortcuts: [
        { key: 'Tab', action: 'Move to next form control' },
      ],
      focusIndicator: {
        style: 'ring',
        colorToken: '--dm-focus-ring-color',
        width: '2px',
      },
    },
    screenReader: {
      roleDescription: 'Edit text field',
      talkback: {
        contentDescription: '{label}, edit box. {helperText}',
      },
      voiceover: {
        trait: 'none',
        hint: 'Double tap to edit text',
      },
    },
    touch: {
      minTargetSize: '44px',
      haptic: {
        onError: 'error',
      },
    },
    visual: {
      minContrastRatio: 4.5,
      colorNotSoleIndicator: true, // Error must include text/icon, not just red border
      focusVisible: true,
    },
  },
  guidelines: {
    do: [
      'Always associate an explicit visible <label> with htmlFor / aria-labelledby',
      'Use aria-invalid="true" and aria-errormessage when validation fails',
      'Provide clear, constructive error messages explaining how to fix the input',
      'Use appropriate input types (e.g. email, tel) to show mobile-optimized keyboards',
    ],
    dont: [
      'Never use placeholder text as a replacement for a visible label',
      'Never rely solely on red border color to indicate an error state',
    ],
    whenToUse: 'Use Input for single-line text data entry. For multi-line text, use TextArea instead.',
    alternatives: ['TextArea', 'Select', 'Checkbox'],
  },
};
