/**
 * Select dropdown component definition with full accessibility specs
 */

import { ComponentDefinition } from '../schemas/component.js';

export const SelectComponent: ComponentDefinition = {
  name: 'Select',
  category: 'inputs',
  description: 'Dropdown selection control allowing users to pick one option from a list of 5 or more items.',
  tokens: {
    colors: {
      bg: '--dm-color-surface',
      borderDefault: '--dm-color-neutral-300',
      borderFocus: '--dm-color-primary-500',
      text: '--dm-color-neutral-900',
    },
    spacing: {
      paddingX: '--dm-space-3-half',
      paddingY: '--dm-space-2-half',
    },
    typography: {
      fontSize: '--dm-font-size-base',
    },
    borders: {
      radius: '--dm-radius-md',
    },
  },
  variants: {
    size: ['sm', 'md', 'lg'],
  },
  states: ['default', 'hover', 'focus', 'open', 'disabled'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label' },
    { name: 'options', type: 'Array<{ label: string; value: string }>', required: true, description: 'Selectable items' },
    { name: 'value', type: 'string', required: false, description: 'Currently selected value' },
  ],
  accessibility: {
    role: 'combobox',
    aria: {
      label: 'required',
      expanded: 'required',
      live: 'off',
    },
    keyboard: {
      focusable: true,
      shortcuts: [
        { key: 'ArrowDown', action: 'Open dropdown and highlight next item' },
        { key: 'ArrowUp', action: 'Highlight previous item' },
        { key: 'Enter', action: 'Select highlighted option' },
        { key: 'Escape', action: 'Close dropdown without changing selection' },
      ],
    },
    screenReader: {
      roleDescription: 'Dropdown menu',
      talkback: { contentDescription: '{label}, pop-up button. Currently selected: {value}.' },
      voiceover: { trait: 'button', hint: 'Double tap to select from menu' },
    },
    touch: {
      minTargetSize: '44px',
      haptic: { onToggle: 'selection', onTap: 'light' },
    },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: [
      'Use Select when there are 5 to 15 mutually exclusive options',
      'Display the currently selected value clearly inside the closed trigger',
    ],
    dont: [
      'Do not use Select for 2-4 choices — use RadioGroup or SegmentedControl instead for better visibility',
      'Do not use Select for binary yes/no choices — use Checkbox or Toggle',
    ],
    whenToUse: 'Use Select when space is constrained and users must choose a single option from a list of 5+ items.',
    alternatives: ['RadioGroup', 'Tabs', 'Combobox'],
  },
};
