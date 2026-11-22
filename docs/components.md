# Component Library Reference

DesignMint includes a built-in library of 15+ foundational components across 7 categories.

---

## 🗂️ Component Directory

### Actions
- **Button**: Interactive action control supporting primary, secondary, outline, ghost, and destructive variants
- **IconButton**: Icon-only button enforcing required `aria-label` for screen reader legibility

### Inputs
- **Input**: Single-line text input with label, helper text, and `aria-errormessage` integration
- **Select**: Dropdown selection control following WAI-ARIA combobox pattern
- **Checkbox**: Multi-select control with keyboard Space toggle and indeterminate support
- **Radio**: Mutually exclusive single-select control with arrow-key keyboard navigation
- **Toggle**: Instant binary switch (role="switch") for real-time preferences

### Display
- **Text**: Semantic body copy supporting paragraph, caption, and lead styles
- **Heading**: Semantic hierarchy headings (h1–h6)
- **Badge**: Read-only status indicator with accessible color pairings
- **Chip**: Compact interactive element for filters and multi-value tags

### Layout
- **Card**: Structural content container with elevation and border tokens

### Navigation
- **Tabs**: Tabbed interface with WAI-ARIA tablist arrow-key navigation

### Feedback
- **Modal**: Interruptive dialog trapping focus, dismissing on Escape, and restoring trigger focus
- **Alert**: Contextual notification banner using `role="alert"` and polite live regions
- **Tooltip**: Non-interactive hover/focus label linked via `aria-describedby`

---

## 💡 Custom Component Authoring

Developers and AI agents can define custom components using the DesignMint component schema:

```yaml
name: "NotificationBanner"
category: "feedback"
description: "Dismissible alert banner placed at page top"

tokens:
  colors:
    bg: "--dm-color-info-50"
    text: "--dm-color-info-900"
  spacing:
    padding: "--dm-space-4"

accessibility:
  role: "alert"
  aria:
    live: "polite"
  keyboard:
    focusable: true
  screenReader:
    roleDescription: "Notification"
  touch:
    minTargetSize: "44px"
```
