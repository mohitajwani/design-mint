/**
 * Display components: Text, Heading, Badge, and Chip
 */

import { ComponentDefinition } from '../schemas/component.js';

export const TextComponent: ComponentDefinition = {
  name: 'Text',
  category: 'display',
  description: 'Typography component for displaying body copy, paragraphs, captions, and labels.',
  tokens: {
    colors: {
      default: '--dm-color-neutral-900',
      muted: '--dm-color-neutral-500',
      primary: '--dm-color-primary-600',
    },
    typography: {
      family: '--dm-font-family-body',
    },
  },
  variants: {
    variant: ['body', 'caption', 'code', 'lead'],
    size: ['xs', 'sm', 'base', 'lg', 'xl'],
    weight: ['regular', 'medium', 'semibold', 'bold'],
  },
  states: ['default'],
  props: [
    { name: 'children', type: 'ReactNode | string', required: true, description: 'Text content' },
    { name: 'as', type: "'p' | 'span' | 'label' | 'div'", required: false, default: 'p', description: 'HTML tag' },
  ],
  accessibility: {
    role: 'generic',
    screenReader: { roleDescription: 'Text' },
    touch: { minTargetSize: '0px' },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: false },
  },
  guidelines: {
    do: ['Use appropriate semantic HTML tags (e.g. <p> for paragraphs)'],
    dont: ['Do not use body text smaller than 12px / 0.75rem for readable content'],
    whenToUse: 'Use Text for all standard body copy and descriptive UI text.',
  },
};

export const HeadingComponent: ComponentDefinition = {
  name: 'Heading',
  category: 'display',
  description: 'Section and page headings establishing structural hierarchy.',
  tokens: {
    colors: { default: '--dm-color-neutral-950' },
    typography: { family: '--dm-font-family-heading' },
  },
  variants: {
    level: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  states: ['default'],
  props: [
    { name: 'level', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", required: true, default: 'h2', description: 'Heading level' },
    { name: 'children', type: 'ReactNode | string', required: true, description: 'Heading title' },
  ],
  accessibility: {
    role: 'heading',
    screenReader: { roleDescription: 'Heading level {level}' },
    touch: { minTargetSize: '0px' },
    visual: { minContrastRatio: 3.0, colorNotSoleIndicator: true, focusVisible: false },
  },
  guidelines: {
    do: ['Maintain logical heading order (never skip from h1 directly to h3)'],
    dont: ['Do not use heading elements purely for styling text size without semantic structure'],
    whenToUse: 'Use Heading for structuring page titles, section headers, and card titles.',
  },
};

export const BadgeComponent: ComponentDefinition = {
  name: 'Badge',
  category: 'display',
  description: 'Compact visual indicator used to highlight status, count, or metadata tag.',
  tokens: {
    colors: {
      successBg: '--dm-color-success-100',
      successText: '--dm-color-success-800',
      errorBg: '--dm-color-error-100',
      errorText: '--dm-color-error-800',
      warningBg: '--dm-color-warning-100',
      warningText: '--dm-color-warning-800',
      infoBg: '--dm-color-info-100',
      infoText: '--dm-color-info-800',
    },
    borders: { radius: '--dm-radius-full' },
  },
  variants: {
    variant: ['success', 'warning', 'error', 'info', 'neutral'],
    size: ['sm', 'md'],
  },
  states: ['default'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Badge text' },
    { name: 'variant', type: 'string', required: false, default: 'neutral', description: 'Color intent' },
  ],
  accessibility: {
    role: 'status',
    screenReader: {
      roleDescription: 'Status badge',
      talkback: { contentDescription: 'Status: {label}' },
    },
    touch: { minTargetSize: '0px' },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: false },
  },
  guidelines: {
    do: ['Include both an icon or descriptive label so status is not conveyed solely by color'],
    dont: ['Do not make badges interactive — use Chip or Button for clickable elements'],
    whenToUse: 'Use Badge for read-only status labels, unread counters, or category tags.',
    alternatives: ['Chip', 'Tag'],
  },
};

export const ChipComponent: ComponentDefinition = {
  name: 'Chip',
  category: 'display',
  description: 'Interactive compact element used for filters, inputs, selections, or dismissible tags.',
  tokens: {
    colors: {
      bg: '--dm-color-neutral-100',
      activeBg: '--dm-color-primary-100',
      activeText: '--dm-color-primary-800',
    },
    borders: { radius: '--dm-radius-full' },
  },
  variants: {
    variant: ['filter', 'input', 'action'],
  },
  states: ['default', 'selected', 'hover', 'focus'],
  props: [
    { name: 'label', type: 'string', required: true, description: 'Chip text' },
    { name: 'selected', type: 'boolean', required: false, default: false, description: 'Active filter state' },
    { name: 'onDismiss', type: 'function', required: false, description: 'Callback when removed' },
  ],
  accessibility: {
    role: 'button',
    aria: { pressed: 'conditional' },
    keyboard: {
      focusable: true,
      shortcuts: [
        { key: 'Enter / Space', action: 'Toggle filter selection' },
        { key: 'Backspace / Delete', action: 'Dismiss chip if dismissible' },
      ],
    },
    screenReader: { roleDescription: 'Filter chip' },
    touch: { minTargetSize: '44px', haptic: { onTap: 'light' } },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: ['Support keyboard removal with Backspace/Delete on dismissible chips'],
    dont: ['Do not crowd too many chips without horizontal scroll or flex wrap'],
    whenToUse: 'Use Chip for dynamic filter lists, email recipient tags, or quick category toggles.',
  },
};
