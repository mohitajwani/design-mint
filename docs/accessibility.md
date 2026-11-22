# Accessibility Architecture (WCAG 2.2)

DesignMint was architected with accessibility compliance at its core rather than as a post-processing check.

---

## 🏛️ Guiding Standards

DesignMint implements the latest **W3C Web Content Accessibility Guidelines (WCAG) 2.2**:

| Criterion | Level | Implementation |
|-----------|-------|----------------|
| **1.4.1 Use of Color** | A | States always combine color with text and SVG icons |
| **1.4.3 Contrast (Minimum)** | AA | Normal text ≥ 4.5:1, large text ≥ 3.0:1 |
| **1.4.6 Contrast (Enhanced)** | AAA | Enforced at ≥ 7.0:1 in High Contrast theme mode |
| **1.4.11 Non-text Contrast** | AA | Form inputs, buttons & switches achieve ≥ 3.0:1 against adjacent surfaces |
| **2.1.1 Keyboard Navigation** | A | All interactive elements support Tab, Enter, Space, and Arrow keys |
| **2.4.7 Focus Visible** | AA | Dedicated `--dm-focus-ring-*` tokens provide high-visibility focus indicators |
| **2.5.8 Target Size (Minimum)** | AA | Interactive mobile touch targets enforce minimum 44×44px |

---

## 🌓 Theme Modes

Every generated design system provides 3 theme modes out of the box:

### 1. Light Theme
- White canvas background (`#FFFFFF`)
- Dark neutral text (`#0F172A`)
- High contrast primary actions

### 2. Dark Theme
- Deep slate background (`#020617` / `#0F172A`)
- Light text (`#F8FAFC`)
- Saturation-balanced accents (reduces eye strain and eliminates vibrating neon colors)

### 3. High Contrast Theme (WCAG AAA)
- Maximum contrast black canvas (`#000000`)
- Pure white text and borders (`#FFFFFF`)
- 3px thick focus rings and zero transparency
- Activated automatically via `@media (prefers-contrast: more)` or `data-theme="high-contrast"`

---

## 📱 Mobile Accessibility (TalkBack, VoiceOver & Haptics)

Components generated with DesignMint include mobile accessibility metadata:

- **Android TalkBack**: `contentDescription` templates and traversal ordering
- **iOS VoiceOver**: `UIAccessibilityTraits` (e.g., button, header, searchField) and accessibility hints
- **Haptic Patterns**:
  - `light`: Subtle tap feedback for chip and tab selections
  - `medium`: Checkbox and toggle activation
  - `heavy`: Destructive actions
  - `error`: Form validation rejections and modal dismissals
