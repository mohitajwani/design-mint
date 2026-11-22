/**
 * Layout, Navigation, and Feedback components: Card, Tabs, Modal, Alert, Tooltip
 */

import { ComponentDefinition } from '../schemas/component.js';

export const CardComponent: ComponentDefinition = {
  name: 'Card',
  category: 'layout',
  description: 'Flexible content container grouping related information and actions.',
  tokens: {
    colors: {
      bg: '--dm-color-surface',
      border: '--dm-color-neutral-200',
    },
    spacing: {
      padding: '--dm-space-6',
    },
    borders: {
      radius: '--dm-radius-lg',
      width: '--dm-border-thin',
    },
    shadows: {
      elevation: '--dm-shadow-sm',
    },
  },
  variants: {
    variant: ['outlined', 'elevated', 'flat'],
  },
  states: ['default', 'hover', 'active'],
  props: [
    { name: 'children', type: 'ReactNode', required: true, description: 'Card body content' },
    { name: 'title', type: 'string', required: false, description: 'Optional card heading' },
  ],
  accessibility: {
    role: 'region',
    screenReader: { roleDescription: 'Card' },
    touch: { minTargetSize: '0px' },
    visual: { minContrastRatio: 3.0, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: ['Use cards to group cohesive information about a single subject'],
    dont: ['Avoid deeply nested cards within cards'],
    whenToUse: 'Use Card for dashboards, media previews, grid items, and structured content widgets.',
  },
};

export const TabsComponent: ComponentDefinition = {
  name: 'Tabs',
  category: 'navigation',
  description: 'Navigation component dividing content into separate views within the same context.',
  tokens: {
    colors: {
      activeText: '--dm-color-primary-600',
      activeBorder: '--dm-color-primary-600',
      inactiveText: '--dm-color-neutral-600',
    },
    spacing: { gap: '--dm-space-4', paddingY: '--dm-space-3' },
  },
  variants: { variant: ['underline', 'pills', 'enclosed'] },
  states: ['default', 'selected', 'hover', 'focus'],
  props: [
    { name: 'tabs', type: 'Array<{ id: string; label: string }>', required: true, description: 'Tab items' },
    { name: 'activeTab', type: 'string', required: true, description: 'Active tab id' },
  ],
  accessibility: {
    role: 'tablist',
    aria: { selected: 'required' },
    keyboard: {
      focusable: true,
      shortcuts: [
        { key: 'ArrowRight / ArrowDown', action: 'Move focus to next tab' },
        { key: 'ArrowLeft / ArrowUp', action: 'Move focus to previous tab' },
        { key: 'Home / End', action: 'Move focus to first / last tab' },
      ],
    },
    screenReader: {
      roleDescription: 'Tab list',
      talkback: { contentDescription: 'Tab {index} of {total}: {label}, {selected ? "selected" : ""}' },
    },
    touch: { minTargetSize: '44px', haptic: { onTap: 'selection' } },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: ['Follow WAI-ARIA tablist pattern with arrow-key navigation between tabs'],
    dont: ['Do not use tabs for primary site-wide navigation — use a Navbar or Drawer'],
    whenToUse: 'Use Tabs to switch between related views on the same page without a URL reload.',
  },
};

export const ModalComponent: ComponentDefinition = {
  name: 'Modal',
  category: 'feedback',
  description: 'Overlay dialog that blocks interaction with the rest of the app until completed or dismissed.',
  tokens: {
    colors: {
      backdrop: 'rgba(0, 0, 0, 0.5)',
      bg: '--dm-color-surface-elevated',
    },
    shadows: { elevation: '--dm-shadow-2xl' },
    borders: { radius: '--dm-radius-xl' },
  },
  variants: { size: ['sm', 'md', 'lg', 'full'] },
  states: ['open', 'closed'],
  props: [
    { name: 'isOpen', type: 'boolean', required: true, description: 'Visibility state' },
    { name: 'title', type: 'string', required: true, description: 'Dialog title' },
    { name: 'onClose', type: 'function', required: true, description: 'Dismiss callback' },
  ],
  accessibility: {
    role: 'dialog',
    aria: { label: 'required', live: 'assertive' },
    keyboard: {
      focusable: true,
      shortcuts: [
        { key: 'Escape', action: 'Closes the modal and returns focus to trigger' },
        { key: 'Tab', action: 'Traps focus within modal interactive elements' },
      ],
    },
    screenReader: {
      roleDescription: 'Modal dialog',
      talkback: { contentDescription: 'Dialog: {title}' },
    },
    touch: { minTargetSize: '44px' },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: true },
  },
  guidelines: {
    do: [
      'Trap keyboard focus within the modal while open',
      'Return focus to the element that triggered the modal when closed',
      'Provide an explicit close button with aria-label="Close dialog"',
    ],
    dont: ['Never launch unexpected modals without user interaction'],
    whenToUse: 'Use Modal for critical confirmations, complex forms, or interruptions requiring immediate user decision.',
  },
};

export const AlertComponent: ComponentDefinition = {
  name: 'Alert',
  category: 'feedback',
  description: 'Prominent contextual message notifying users of an important status, warning, or error.',
  tokens: {
    colors: {
      successBg: '--dm-color-success-50',
      successText: '--dm-color-success-900',
      errorBg: '--dm-color-error-50',
      errorText: '--dm-color-error-900',
      warningBg: '--dm-color-warning-50',
      warningText: '--dm-color-warning-900',
      infoBg: '--dm-color-info-50',
      infoText: '--dm-color-info-900',
    },
    spacing: { padding: '--dm-space-4', gap: '--dm-space-3' },
    borders: { radius: '--dm-radius-md', width: '--dm-border-thin' },
  },
  variants: {
    variant: ['info', 'success', 'warning', 'error'],
  },
  states: ['default'],
  props: [
    { name: 'title', type: 'string', required: false, description: 'Alert headline' },
    { name: 'children', type: 'ReactNode | string', required: true, description: 'Message body' },
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", required: false, default: 'info', description: 'Severity' },
  ],
  accessibility: {
    role: 'alert',
    aria: { live: 'polite' },
    screenReader: {
      roleDescription: 'Alert banner',
      talkback: { contentDescription: '{variant} alert: {title}. {message}' },
    },
    touch: { minTargetSize: '0px' },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: false },
  },
  guidelines: {
    do: [
      'Include a distinct status icon (e.g. checkmark, warning triangle, exclamation mark)',
      'Use role="alert" with aria-live="assertive" for critical errors',
    ],
    dont: ['Do not use alerts for trivial information that belongs in body text'],
    whenToUse: 'Use Alert for high-visibility notices, form submission errors, or system outages.',
  },
};

export const TooltipComponent: ComponentDefinition = {
  name: 'Tooltip',
  category: 'feedback',
  description: 'Floating label that provides brief informational text when hovering or focusing an element.',
  tokens: {
    colors: {
      bg: '--dm-color-neutral-900',
      text: '#FFFFFF',
    },
    spacing: { paddingX: '--dm-space-2-half', paddingY: '--dm-space-1' },
    borders: { radius: '--dm-radius-sm' },
    typography: { fontSize: '--dm-font-size-xs' },
  },
  variants: { position: ['top', 'bottom', 'left', 'right'] },
  states: ['hidden', 'visible'],
  props: [
    { name: 'content', type: 'string', required: true, description: 'Tooltip explanation text' },
    { name: 'children', type: 'ReactNode', required: true, description: 'Trigger element' },
  ],
  accessibility: {
    role: 'tooltip',
    aria: { describedby: 'required' },
    keyboard: {
      focusable: false,
      shortcuts: [{ key: 'Escape', action: 'Dismisses active tooltip' }],
    },
    screenReader: { roleDescription: 'Tooltip' },
    touch: { minTargetSize: '0px' },
    visual: { minContrastRatio: 4.5, colorNotSoleIndicator: true, focusVisible: false },
  },
  guidelines: {
    do: ['Trigger tooltips on both mouse hover AND keyboard focus', 'Keep tooltip content under 1-2 concise lines'],
    dont: ['Never put interactive elements (buttons, links) inside a tooltip — use Popover instead'],
    whenToUse: 'Use Tooltip to explain the purpose of icon-only buttons or provide abbreviated context.',
  },
};
