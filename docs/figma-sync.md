# Figma Integration Guide

DesignMint bridges the gap between code and design by exporting tokens directly into Figma-native formats.

---

## 🎨 Supported Export Formats

### 1. Figma Variables API
DesignMint exports token collections structured for Figma's native Variables system:
- **Collections**:
  - `Colors & Themes` (with Modes: `Light`, `Dark`, `High Contrast`)
  - `Dimensions & Spacing`
- **Variable Types**:
  - `COLOR`: Canvas background, surface, text, and action colors
  - `FLOAT`: Numeric pixel spacing and border radius values

### 2. Tokens Studio (Figma Tokens Plugin)
Exports W3C DTCG-compliant JSON tokens compatible with the Tokens Studio plugin:
- Set up automated synchronization between your git repository and Figma.
- Automatically maps theme sets: `light`, `dark`, and `high-contrast`.

---

## 🔄 Workflow

```bash
# Export tokens in Figma-compatible format
designmint export --platform json
```

Import the generated `tokens.dtcg.json` into Tokens Studio, or upload `figma-variables.json` via the Figma REST API.
