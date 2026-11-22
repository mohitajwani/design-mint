/**
 * WCAG 2.2 standards reference data for design systems
 */

export interface WCAGCriterion {
  id: string;
  name: string;
  level: 'A' | 'AA' | 'AAA';
  description: string;
  designSystemImpact: string;
}

export const WCAG_STANDARDS: Record<string, WCAGCriterion> = {
  '1.4.1': {
    id: '1.4.1',
    name: 'Use of Color',
    level: 'A',
    description: 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
    designSystemImpact: 'Components with status (Alert, Badge, Form Input) must combine color with text, icons, or patterns.',
  },
  '1.4.3': {
    id: '1.4.3',
    name: 'Contrast (Minimum)',
    level: 'AA',
    description: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for large text (at least 3:1).',
    designSystemImpact: 'All generated body text and neutral palettes must meet 4.5:1 against surfaces.',
  },
  '1.4.6': {
    id: '1.4.6',
    name: 'Contrast (Enhanced)',
    level: 'AAA',
    description: 'The visual presentation of text and images of text has a contrast ratio of at least 7:1 (4.5:1 for large text).',
    designSystemImpact: 'Enforced automatically in DesignMint High-Contrast theme mode.',
  },
  '1.4.11': {
    id: '1.4.11',
    name: 'Non-text Contrast',
    level: 'AA',
    description: 'The visual presentation of UI components and graphical objects has a contrast ratio of at least 3:1 against adjacent colors.',
    designSystemImpact: 'Component borders, toggles, checkboxes, and focus indicators must achieve 3:1 contrast.',
  },
  '1.4.12': {
    id: '1.4.12',
    name: 'Text Spacing',
    level: 'AA',
    description: 'No loss of content or functionality occurs when users override line height to 1.5x, letter spacing to 0.12x, and word spacing to 0.16x font size.',
    designSystemImpact: 'Component layouts must use flexible containers and rem units to prevent clipping.',
  },
  '2.1.1': {
    id: '2.1.1',
    name: 'Keyboard',
    level: 'A',
    description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
    designSystemImpact: 'All interactive components (Buttons, Selects, Modals, Tabs) include full keyboard specs.',
  },
  '2.4.7': {
    id: '2.4.7',
    name: 'Focus Visible',
    level: 'AA',
    description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
    designSystemImpact: 'DesignMint ships dedicated --dm-focus-ring-* tokens with 2px+ width and distinct outline.',
  },
  '2.4.11': {
    id: '2.4.11',
    name: 'Focus Appearance (Minimum)',
    level: 'AA',
    description: 'When the focus indicator becomes visible, an area of the focus indicator has a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states.',
    designSystemImpact: 'Focus rings have minimum 3:1 contrast against both the component and background.',
  },
  '2.5.8': {
    id: '2.5.8',
    name: 'Target Size (Minimum)',
    level: 'AA',
    description: 'The size of the target for pointer inputs is at least 24 by 24 CSS pixels, or provides sufficient spacing.',
    designSystemImpact: 'DesignMint enforces 44×44px by default, exceeding the minimum 24×24px requirement.',
  },
};
