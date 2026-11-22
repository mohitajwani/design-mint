# Design Tokens Reference

DesignMint generates comprehensive, semantic design tokens structured per W3C Design Tokens Community Group (DTCG) principles.

---

## 🎨 Color Tokens

### 11-Step Scales (`50` to `950`)
Every color scale is mathematically computed in HSL color space with perceptually balanced lightness distribution:

```css
--dm-color-primary-50:  #eff6ff;
--dm-color-primary-100: #dbeafe;
--dm-color-primary-200: #bfdbfe;
--dm-color-primary-300: #93c5fd;
--dm-color-primary-400: #60a5fa;
--dm-color-primary-500: #3b82f6; /* Brand mid-point */
--dm-color-primary-600: #2563eb;
--dm-color-primary-700: #1d4ed8;
--dm-color-primary-800: #1e40af;
--dm-color-primary-900: #1e3a8a;
--dm-color-primary-950: #172554;
```

### Semantic Scales Available
- `primary`: Core brand color
- `secondary`: Secondary brand accent
- `accent`: Attention-grabbing highlight
- `neutral`: Balanced slate gray scale for backgrounds and text
- `success`: Emerald positive feedback (#10B981 default)
- `warning`: Amber cautionary feedback (#F59E0B default)
- `error`: Red destructive feedback (#EF4444 default)
- `info`: Blue informational notices (#3B82F6 default)

---

## 📐 Spacing Tokens

Based on a standard 4px grid:

| Token | Rem | Px | Example Use |
|-------|-----|----|-------------|
| `--dm-space-1` | `0.25rem` | 4px | Micro spacing, icon gaps |
| `--dm-space-2` | `0.5rem` | 8px | Button inline padding (Y) |
| `--dm-space-3` | `0.75rem` | 12px | Compact item gaps |
| `--dm-space-4` | `1rem` | 16px | Standard component padding |
| `--dm-space-6` | `1.5rem` | 24px | Card container padding |
| `--dm-space-8` | `2rem` | 32px | Section gutters |
| `--dm-space-12` | `3rem` | 48px | Page header spacing |
| `--dm-space-16` | `4rem` | 64px | Hero section margins |

---

## 🔤 Typography Tokens

Font sizes follow a Major Third scale (1.25 ratio):

```css
--dm-font-size-xs:   0.64rem;  /* 10.2px */
--dm-font-size-sm:   0.8rem;   /* 12.8px */
--dm-font-size-base: 1rem;     /* 16.0px (Body default) */
--dm-font-size-md:   1.118rem; /* 17.9px */
--dm-font-size-lg:   1.25rem;  /* 20.0px (Subheading) */
--dm-font-size-xl:   1.563rem; /* 25.0px (H4) */
--dm-font-size-2xl:  1.953rem; /* 31.2px (H3) */
--dm-font-size-3xl:  2.441rem; /* 39.1px (H2) */
--dm-font-size-4xl:  3.052rem; /* 48.8px (H1) */
```

---

## ♿ Accessibility Tokens

```css
/* Focus Ring (WCAG 2.4.7 & 2.4.11) */
--dm-focus-ring-color: #2563EB;
--dm-focus-ring-width: 2px;
--dm-focus-ring-offset: 2px;

/* Touch Target Minimum (WCAG 2.5.8) */
--dm-touch-target-min: 44px;

/* Motion Duration (supports prefers-reduced-motion) */
--dm-duration-fast: 150ms;
--dm-duration-normal: 250ms;
--dm-duration-slow: 400ms;
```
