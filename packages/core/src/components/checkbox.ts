/**
 * Selection controls: Checkbox, Radio, and Toggle Switch
 */

import { ComponentDefinition } from '../schemas/component.js';

export const CheckboxComponent: ComponentDefinition = {
  name: 'Checkbox',
  category: 'inputs',
  description: 'Control that allows users to select one or multiple items from a list, or toggle an independent setting.',
  tokens: {
    colors: {
      checkedBg: '--dm-color-primary-600',
      checkedText: '#FFFFFF',
      borderDefault: '--dm-color-neutral-400',
      focusRing: '--dm-focus-ring-color',
    },
    spacing: { gap: '--dm-space-2-half' },
    typography: { fontSize: '--dm-font-size-base' },
    borders: { radius: '--dm-radius-sm' },
  },
  variants: { size: ['sm', 'md'] },
  states: ['unchecked', 'checked', 'indeterminate', 'hover', 'focus', 'disabled'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label' },
    { name: 'checked', type: 'boolean', required: false, default: false, description: 'Checked state' },
    { name: 'indeterminate', type: 'boolean', required: false, default: false, description: 'Partial selection state' },
  ],
  accessibility: {
    role: 'checkbox',
    aria: { label: 'required', checked: 'required' },
    keyboard: {
      focusable: true,
      shortcuts: [{ key: 'Space', action: 'Toggles checked state' }],
    },
    screenReader: {
      roleDescription: 'Checkbox',
      talkback: { contentDescription: '{label}, checkbox, {checked ? "checked" : "not checked"}. Double-tap to toggle.' },
      voiceover: { trait: 'button', hint: 'Double tap to toggle' },
    },
    touch: {
      minTargetSize: '44px',
      haptic: { onToggle: 'selection' },
    },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: [
      'Use Checkbox when users can select multiple options independently',
      'Ensure the entire row (checkbox + label text) is clickable to meet touch target size',
    ],
    dont: ['Do not use for mutually exclusive options — use Radio instead'],
    whenToUse: 'Use Checkbox for multi-select choices, terms acceptance, or optional feature toggles in forms.',
    alternatives: ['Radio', 'Toggle'],
  },
};

export const RadioComponent: ComponentDefinition = {
  name: 'Radio',
  category: 'inputs',
  description: 'Single-select control used in a group where only one option can be chosen at a time.',
  tokens: {
    colors: {
      checkedBg: '--dm-color-primary-600',
      borderDefault: '--dm-color-neutral-400',
      focusRing: '--dm-focus-ring-color',
    },
    spacing: { gap: '--dm-space-2-half' },
    borders: { radius: '--dm-radius-full' },
  },
  variants: { size: ['sm', 'md'] },
  states: ['unselected', 'selected', 'hover', 'focus', 'disabled'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Option label' },
    { name: 'name', type: 'string', required: true, description: 'Radio group name' },
    { name: 'value', type: 'string', required: true, description: 'Option value' },
  ],
  accessibility: {
    role: 'radio',
    aria: { label: 'required', checked: 'required' },
    keyboard: {
      focusable: true,
      shortcuts: [
        { key: 'ArrowDown / ArrowRight', action: 'Select next radio option in group' },
        { key: 'ArrowUp / ArrowLeft', action: 'Select previous radio option in group' },
      ],
    },
    screenReader: {
      roleDescription: 'Radio button',
      talkback: { contentDescription: '{label}, radio button, {selected ? "checked" : "not checked"}' },
      voiceover: { trait: 'button' },
    },
    touch: { minTargetSize: '44px', haptic: { onToggle: 'selection' } },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: ['Always present radio buttons in groups of 2 to 5 options', 'Make one option selected by default whenever possible'],
    dont: ['Do not use Radio for independent multi-select choices — use Checkbox'],
    whenToUse: 'Use Radio when users must choose exactly one option from a visible list of 2-5 choices.',
    alternatives: ['Checkbox', 'Select', 'Tabs'],
  },
};

export const ToggleComponent: ComponentDefinition = {
  name: 'Toggle',
  category: 'inputs',
  description: 'Switch control that represents an instantaneous binary state (On/Off).',
  tokens: {
    colors: {
      activeBg: '--dm-color-primary-600',
      inactiveBg: '--dm-color-neutral-300',
      thumbBg: '#FFFFFF',
    },
    borders: { radius: '--dm-radius-full' },
  },
  variants: { size: ['sm', 'md'] },
  states: ['off', 'on', 'focus', 'disabled'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Setting description' },
    { name: 'checked', type: 'boolean', required: true, description: 'Current binary state' },
  ],
  accessibility: {
    role: 'switch',
    aria: { label: 'required', checked: 'required' },
    keyboard: {
      focusable: true,
      shortcuts: [{ key: 'Space', action: 'Toggles switch on or off' }],
    },
    screenReader: {
      roleDescription: 'Switch',
      talkback: { contentDescription: '{label}, switch, {checked ? "on" : "off"}' },
      voiceover: { trait: 'button' },
    },
    touch: { minTargetSize: '44px', haptic: { onToggle: 'selection' } },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: ['Use Toggle for instantaneous settings (e.g. WiFi On/Off, Dark Mode, Notifications)'],
    dont: ['Do not use Toggle inside a form that requires an explicit "Submit" button to save'],
    whenToUse: 'Use Toggle for preferences and settings that take effect immediately without a form submit.',
    alternatives: ['Checkbox'],
  },
};
