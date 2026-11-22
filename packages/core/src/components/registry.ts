/**
 * Component Registry and Recommendation Engine
 */

import { ComponentDefinition } from '../schemas/component.js';
import { ButtonComponent } from './button.js';
import { InputComponent } from './input.js';
import { SelectComponent } from './select.js';
import { CheckboxComponent, RadioComponent, ToggleComponent } from './checkbox.js';
import { TextComponent, HeadingComponent, BadgeComponent, ChipComponent } from './text.js';
import { CardComponent, TabsComponent, ModalComponent, AlertComponent, TooltipComponent } from './card.js';

export class ComponentRegistry {
  private components: Map<string, ComponentDefinition> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    const defaults = [
      ButtonComponent,
      InputComponent,
      SelectComponent,
      CheckboxComponent,
      RadioComponent,
      ToggleComponent,
      TextComponent,
      HeadingComponent,
      BadgeComponent,
      ChipComponent,
      CardComponent,
      TabsComponent,
      ModalComponent,
      AlertComponent,
      TooltipComponent,
    ];

    for (const comp of defaults) {
      this.register(comp);
    }
  }

  public register(component: ComponentDefinition): void {
    this.components.set(component.name.toLowerCase(), component);
  }

  public get(name: string): ComponentDefinition | undefined {
    return this.components.get(name.toLowerCase());
  }

  public list(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  public listByCategory(category: string): ComponentDefinition[] {
    return this.list().filter((c) => c.category === category);
  }

  /**
   * Intelligently recommends a UI component based on user requirements
   */
  public recommend(userNeed: string): {
    recommendedComponent: ComponentDefinition;
    reasoning: string;
    alternatives: string[];
    accessibilityNotes: string[];
  } {
    const q = userNeed.toLowerCase();

    // Matching logic based on interaction intents
    if (
      q.includes('switch') ||
      q.includes('on/off') ||
      q.includes('toggle') ||
      q.includes('instant') ||
      q.includes('binary')
    ) {
      const comp = this.get('Toggle')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Toggle is best for instant binary preferences (on/off) that take effect immediately without submitting a form.',
        alternatives: ['Checkbox'],
        accessibilityNotes: ['Uses role="switch" with aria-checked and haptic feedback on state change.'],
      };
    }

    if (
      q.includes('multiple') ||
      q.includes('multi-select') ||
      q.includes('multi select') ||
      q.includes('checkbox') ||
      q.includes('pick several') ||
      q.includes('permissions')
    ) {
      const comp = this.get('Checkbox')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Checkbox allows users to select zero, one, or multiple independent items from a list.',
        alternatives: ['Chip', 'Select'],
        accessibilityNotes: ['Ensure the label text is wrapped in the touch target to meet the 44px minimum target size.'],
      };
    }

    if (q.includes('single choice') || q.includes('pick one') || q.includes('radio') || q.includes('one of few')) {
      const comp = this.get('Radio')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Radio buttons are optimal when choosing exactly one option from 2-5 visible choices.',
        alternatives: ['Select', 'Tabs'],
        accessibilityNotes: ['Group radio buttons with role="radiogroup" and enable arrow key navigation.'],
      };
    }

    if (q.includes('dropdown') || q.includes('many options') || q.includes('country') || q.includes('select item')) {
      const comp = this.get('Select')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Select is appropriate when space is limited and users choose one item from 5+ options.',
        alternatives: ['Radio', 'Modal'],
        accessibilityNotes: ['Follow ARIA combobox pattern with keyboard ArrowUp/ArrowDown selection.'],
      };
    }

    if (q.includes('confirm') || q.includes('dialog') || q.includes('popup') || q.includes('modal') || q.includes('interrupt')) {
      const comp = this.get('Modal')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Modal blocks page interaction to focus user attention on a critical decision or task.',
        alternatives: ['Alert', 'Card'],
        accessibilityNotes: ['Must trap keyboard focus within modal and close on Escape key.'],
      };
    }

    if (q.includes('filter') || q.includes('tag') || q.includes('badge') || q.includes('pill')) {
      const comp = this.get('Chip')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Chips are compact and interactive, ideal for dynamic filters and multi-value tag inputs.',
        alternatives: ['Badge', 'Checkbox'],
        accessibilityNotes: ['Support Backspace key to remove dismissible chips.'],
      };
    }

    if (q.includes('notify') || q.includes('warning') || q.includes('error message') || q.includes('banner')) {
      const comp = this.get('Alert')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Alert provides contextual, high-visibility feedback for successes, errors, and system warnings.',
        alternatives: ['Modal', 'Tooltip'],
        accessibilityNotes: ['Uses role="alert" with aria-live="polite" and status icons (not color alone).'],
      };
    }

    // Default fallback to Button or Card
    if (q.includes('click') || q.includes('action') || q.includes('submit')) {
      const comp = this.get('Button')!;
      return {
        recommendedComponent: comp,
        reasoning: 'Button is the standard interactive control for triggering discrete actions.',
        alternatives: ['Link', 'IconButton'],
        accessibilityNotes: ['Ensure explicit text or aria-label for screen reader users.'],
      };
    }

    const comp = this.get('Card')!;
    return {
      recommendedComponent: comp,
      reasoning: 'Card groups related content, actions, and media into a clean structural container.',
      alternatives: ['Modal'],
      accessibilityNotes: ['Use semantic heading hierarchy inside the card content.'],
    };
  }
}

export const defaultRegistry = new ComponentRegistry();
