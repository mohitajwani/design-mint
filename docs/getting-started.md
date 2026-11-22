# Getting Started with DesignMint

> **Mint your design system in minutes.**

DesignMint is an accessibility-first design system generator that translates brand colors and typography into a complete, unified design system across web, mobile, and AI agent workflows.

---

## 📦 Installation

Install the CLI globally or as a project devDependency:

```bash
# Global installation
npm install -g @designmint/cli

# Or in your local project
npm install --save-dev @designmint/core @designmint/cli
```

---

## ⚡ Quick 3-Step Setup

### Step 1: Initialize Configuration

Run the `init` command in your project directory:

```bash
designmint init
```

This creates a `designmint.config.yaml` with smart defaults.

### Step 2: Configure Your Brand

Open `designmint.config.yaml` and set your brand primary color:

```yaml
brand:
  name: "Acme Corp"
  colors:
    primary: "#2563EB"       # Your core brand color
    secondary: "#7C3AED"     # Optional
    accent: "#F59E0B"        # Optional
  typography:
    headingFont: "Plus Jakarta Sans"
    bodyFont: "Inter"
  accessibility:
    compliance: "AA"         # AA or AAA
    themes: ["light", "dark", "high-contrast"]
    reducedMotion: true
```

### Step 3: Mint Your Design Tokens

Generate your design system across all platforms:

```bash
designmint generate
```

Outputs will be generated in `dist/designmint/`:
- `tokens.css` — CSS Custom Properties with light, dark, high-contrast & reduced motion
- `tailwind.theme.js` — Tailwind CSS theme extension
- `tokens.json` & `tokens.dtcg.json` — W3C Design Tokens Community Group format
- `DesignMintTokens.swift` — iOS SwiftUI & UIKit tokens
- `android/` — Android `colors.xml`, `dimens.xml`, and Jetpack Compose theme
- `app_theme.dart` — Flutter ThemeData & ColorScheme

---

## ♿ Verify Accessibility

Run the built-in WCAG 2.2 auditor:

```bash
designmint audit
```

This checks all color contrast ratios, verifies touch targets meet 44px minimum, checks color-blind safety for state indicators, and ensures keyboard focus ring visibility.
