# 🌿 DesignMint

**Mint your design system in minutes.**

> Do you feel AI generates very similar UI, or you can make out if the UI was designed by AI? DesignMint is the answer.

DesignMint is an accessibility-first design system generator that understands your brand, builds a complete token system, component library, and design guidelines — then aligns everything with Figma so you can focus on building your app, not worrying about design.

Built-in MCP server for seamless agent integration. Works everywhere — web, iOS, Android, Flutter, desktop.

---

## ✨ Features

- **🎨 Smart Brand Understanding** — Give us your brand colors and fonts, or just a primary color — we'll generate the rest
- **🪙 Complete Token System** — Colors, spacing, typography, shadows, borders, breakpoints, motion, focus, and touch tokens
- **🧩 Component Library** — 30+ built-in components with full styling specs, guidelines, and variants
- **♿ Accessibility First** — WCAG 2.2 AA/AAA compliant, with light/dark/high-contrast themes, TalkBack, VoiceOver, haptic feedback, and keyboard navigation built into every component
- **📱 Multi-Platform Export** — CSS, SCSS, Tailwind, iOS (Swift/SwiftUI), Android (XML/Compose), Flutter (Dart), and more
- **🔌 MCP Server** — AI agents can query tokens, get component recommendations, run a11y audits, and generate new components
- **🎯 Figma Sync** — Export to Figma Variables and Tokens Studio format

## 📦 Packages

| Package | Description |
|---------|-------------|
| `@designmint/core` | Core engine — token generators, components, accessibility, exporters |
| `@designmint/cli` | CLI tool — `designmint init`, `generate`, `export`, `audit` |
| `@designmint/mcp-server` | MCP server for AI agent integration |
| `@designmint/figma-sync` | Figma token sync and export |

## 🚀 Quick Start

### Installation

```bash
npm install -g @designmint/cli
```

### Create a Design System

```bash
# Interactive setup wizard
designmint init

# Or generate from a config file
designmint generate --config designmint.config.yaml

# Export to your platform
designmint export --platform web        # CSS, SCSS, Tailwind
designmint export --platform ios        # Swift / SwiftUI
designmint export --platform android    # XML / Compose
designmint export --platform flutter    # Dart ThemeData
designmint export --platform all        # Everything
```

### Brand Configuration

**Option A: Full Control**

```yaml
# designmint.config.yaml
brand:
  name: "Acme Corp"
  colors:
    primary: "#2563EB"
    secondary: "#7C3AED"
    accent: "#F59E0B"
  typography:
    heading:
      family: "Plus Jakarta Sans"
    body:
      family: "Inter"
  accessibility:
    compliance: "AA"
    themes: ["light", "dark", "high-contrast"]
    reduced_motion: true
  preferences:
    style: "modern"
    density: "comfortable"
```

**Option B: Just a Color**

```yaml
brand:
  name: "Acme Corp"
  primary_color: "#2563EB"
```

> ⚠️ Auto-generated palettes are starting points. Review and adjust to match your exact brand guidelines.

### MCP Server

```bash
# Start the MCP server
npx @designmint/mcp-server

# Or add to your MCP config
{
  "mcpServers": {
    "designmint": {
      "command": "npx",
      "args": ["@designmint/mcp-server"]
    }
  }
}
```

## 🪙 Token System

DesignMint generates a comprehensive token system with semantic naming:

| Category | Examples | Theme-Aware |
|----------|---------|-------------|
| **Color** | `--dm-color-primary-500`, `--dm-color-surface` | ✅ Light/Dark/HC |
| **Spacing** | `--dm-space-1` (4px) through `--dm-space-20` (80px) | — |
| **Typography** | `--dm-font-size-lg`, `--dm-font-weight-bold` | — |
| **Shadows** | `--dm-shadow-sm` through `--dm-shadow-2xl` | ✅ |
| **Borders** | `--dm-radius-md`, `--dm-border-width-thin` | — |
| **Motion** | `--dm-motion-duration-fast`, `--dm-motion-easing-default` | ✅ Reduced motion |
| **Focus** | `--dm-focus-ring-color`, `--dm-focus-ring-width` | ✅ HC |
| **Touch** | `--dm-touch-target-min` (44px) | — |

## ♿ Accessibility

Every design system is WCAG 2.2 compliant out of the box:

- **Contrast**: All color pairs meet AA (4.5:1) or AAA (7:1) ratios
- **Themes**: Light, Dark, and High Contrast modes generated automatically
- **Components**: ARIA roles, keyboard shortcuts, screen reader labels, focus management
- **Mobile**: TalkBack content descriptions, VoiceOver traits and hints, haptic feedback patterns
- **Touch**: Minimum 44×44px touch targets (configurable up to 56px)
- **Motion**: Reduced motion variants respect `prefers-reduced-motion`
- **Color Blindness**: Palette validation for protanopia, deuteranopia, tritanopia

```bash
# Run an accessibility audit
designmint audit
```

## 🧩 Components

30+ built-in components, each with:
- Token-aware styling for all theme modes
- Full accessibility specification (ARIA, keyboard, screen reader, haptic)
- Usage guidelines (do / don't / when to use)
- Multiple variants and states

[View full component catalog →](docs/components.md)

### Create Custom Components

```bash
designmint component add
```

Or define in YAML:

```yaml
name: "ProductCard"
category: "display"
description: "Displays a product with image, title, price, and action"
# ... full schema with tokens, variants, states, a11y specs
```

## 🔌 MCP Tools

| Tool | What It Does |
|------|-------------|
| `generate_design_system` | Generate complete system from brand config |
| `get_tokens` | Get tokens by category and platform |
| `recommend_component` | Which component for a UI need? |
| `get_component` | Full component spec with a11y guidelines |
| `create_component` | Create component from description |
| `audit_accessibility` | Run WCAG 2.2 audit |
| `validate_contrast` | Check color contrast |
| `export_tokens` | Export to any platform |
| `suggest_palette` | Palette from primary color |
| `get_font_pairing` | Free font pairing suggestions |
| `get_haptic_pattern` | Haptic feedback for interactions |
| `get_theme_tokens` | Tokens for specific theme mode |

## 🗂️ Project Structure

```
packages/
├── core/          # Token generators, components, a11y engine, exporters
├── cli/           # Command-line interface
├── mcp-server/    # MCP server for agent integration
└── figma-sync/    # Figma token export
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/mohitajwani/design-mint.git
cd design-mint

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

## 📄 License

MIT © [Mohit Ajwani](https://github.com/mohitajwani)
