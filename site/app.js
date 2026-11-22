/**
 * DesignMint Interactive Studio Client
 */

// Color utilities in browser
function hexToRgb(hex) {
  const cleanHex = hex.replace(/^#/, '');
  let fullHex = cleanHex;
  if (cleanHex.length === 3) {
    fullHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHsl(r, g, b) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h, s, l) {
  const hNorm = (h % 360) / 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p, q, t) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return { r, g, b };
}

function rgbToHex(r, g, b) {
  const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = v => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const transform = val => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

const LIGHTNESS_STEPS = {
  '50': 96, '100': 91, '200': 82, '300': 72, '400': 60,
  '500': 48, '600': 38, '700': 30, '800': 22, '900': 15, '950': 9
};

// State
let currentPrimary = '#2563EB';
let currentTheme = 'light';
let currentCodeTab = 'css';

// DOM Elements
const primaryPicker = document.getElementById('primary-picker');
const primaryHex = document.getElementById('primary-hex');
const contrastRatioEl = document.getElementById('contrast-ratio');
const contrastBadgeEl = document.getElementById('contrast-badge');
const contrastStatusEl = document.getElementById('contrast-status');
const paletteStripEl = document.getElementById('palette-strip');
const codeDisplayEl = document.getElementById('code-display');
const copyCodeBtn = document.getElementById('copy-code-btn');

function updateSystem(hex) {
  currentPrimary = hex.toUpperCase();
  primaryPicker.value = currentPrimary;
  primaryHex.value = currentPrimary;

  // Apply to root CSS variable
  document.documentElement.style.setProperty('--primary-color', currentPrimary);

  // Compute scale
  const rgb = hexToRgb(currentPrimary);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const scale = {};

  paletteStripEl.innerHTML = '';
  for (const [step, l] of Object.entries(LIGHTNESS_STEPS)) {
    const s = step === '50' ? Math.round(hsl.s * 0.4) : step === '100' ? Math.round(hsl.s * 0.6) : hsl.s;
    const stepHex = hslToHex(hsl.h, s, l);
    scale[step] = stepHex;

    const div = document.createElement('div');
    div.className = 'palette-step';
    div.style.backgroundColor = stepHex;
    div.style.color = l > 60 ? '#0F172A' : '#FFFFFF';
    div.innerHTML = `<span>${step}</span>`;
    paletteStripEl.appendChild(div);
  }

  // Update contrast
  const canvasBg = currentTheme === 'dark' ? '#090D16' : currentTheme === 'high-contrast' ? '#000000' : '#FFFFFF';
  const ratio = getContrastRatio(currentPrimary, canvasBg);
  contrastRatioEl.textContent = `${ratio}:1`;

  if (ratio >= 7.0) {
    contrastBadgeEl.textContent = 'WCAG AAA Pass';
    contrastBadgeEl.className = 'badge badge-success';
    contrastStatusEl.textContent = 'Meets strict 7.0:1 ratio required for AAA compliance';
  } else if (ratio >= 4.5) {
    contrastBadgeEl.textContent = 'WCAG AA Pass';
    contrastBadgeEl.className = 'badge badge-success';
    contrastStatusEl.textContent = 'Meets 4.5:1 minimum required for normal body text';
  } else if (ratio >= 3.0) {
    contrastBadgeEl.textContent = 'Large Text Only (3:1)';
    contrastBadgeEl.className = 'badge badge-warning';
    contrastStatusEl.textContent = 'Acceptable for large headings (≥18pt) & UI component borders';
  } else {
    contrastBadgeEl.textContent = 'Fails WCAG (Below 3:1)';
    contrastBadgeEl.className = 'badge badge-error';
    contrastStatusEl.textContent = 'Insufficient contrast against canvas. Adjust lightness.';
  }

  renderCode(scale);
}

function renderCode(scale) {
  const p = currentPrimary;
  if (currentCodeTab === 'css') {
    codeDisplayEl.textContent = `:root {
  /* Brand Tokens */
  --dm-color-primary-50:  ${scale['50']};
  --dm-color-primary-100: ${scale['100']};
  --dm-color-primary-200: ${scale['200']};
  --dm-color-primary-500: ${p};
  --dm-color-primary-600: ${scale['600']};
  --dm-color-primary-900: ${scale['900']};

  /* Touch & Focus Accessibility */
  --dm-touch-target-min: 44px;
  --dm-focus-ring-color: ${p};
  --dm-focus-ring-width: 2px;
}

@media (prefers-contrast: more) {
  :root {
    --dm-focus-ring-width: 3px;
    --dm-focus-ring-color: #FFFFFF;
  }
}`;
  } else if (currentCodeTab === 'tailwind') {
    codeDisplayEl.textContent = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '${scale['50']}',
          100: '${scale['100']}',
          500: '${p}',
          600: '${scale['600']}',
          900: '${scale['900']}',
        },
      },
    },
  },
};`;
  } else if (currentCodeTab === 'cmp') {
    const clean = p.replace('#', '').toUpperCase();
    codeDisplayEl.textContent = `// Compose Multiplatform (Android, iOS, Desktop, Web)
package com.designmint.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

object DesignMintColors {
    val Primary500 = Color(0xFF${clean})
    val Primary600 = Color(0xFF${scale['600'].replace('#', '').toUpperCase()})
}

@Composable
fun DesignMintTheme(content: @Composable () -> Unit) {
    MaterialTheme(content = content)
}`;
  } else if (currentCodeTab === 'swift') {
    codeDisplayEl.textContent = `// iOS SwiftUI Design Tokens
import SwiftUI

public enum DesignMintTokens {
    public enum Colors {
        public static let primary500 = Color(hex: "${p}")
        public static let primary600 = Color(hex: "${scale['600']}")
    }
    public enum Accessibility {
        public static let minTouchTarget: CGFloat = 44.0
    }
}`;
  } else if (currentCodeTab === 'flutter') {
    codeDisplayEl.textContent = `// Flutter ThemeData
import 'package:flutter/material.dart';

class DesignMintTokens {
  static const Color primary500 = Color(0xFF${p.replace('#', '')});
  static const double minTouchTarget = 44.0;
}`;
  } else if (currentCodeTab === 'json') {
    codeDisplayEl.textContent = JSON.stringify({
      "$description": "W3C Design Tokens Community Group format",
      "color": {
        "primary": {
          "500": { "$value": p, "$type": "color" },
          "600": { "$value": scale['600'], "$type": "color" }
        }
      }
    }, null, 2);
  }
}

// Event Listeners
primaryPicker.addEventListener('input', e => updateSystem(e.target.value));
primaryHex.addEventListener('change', e => {
  if (/^#?[0-9a-fA-F]{6}$/.test(e.target.value)) {
    const val = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
    updateSystem(val);
  }
});

document.querySelectorAll('.color-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    updateSystem(btn.getAttribute('data-color'));
  });
});

// Theme Buttons
document.getElementById('theme-light-btn').addEventListener('click', () => {
  currentTheme = 'light';
  document.documentElement.setAttribute('data-theme', 'light');
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('theme-light-btn').classList.add('active');
  updateSystem(currentPrimary);
});

document.getElementById('theme-dark-btn').addEventListener('click', () => {
  currentTheme = 'dark';
  document.documentElement.setAttribute('data-theme', 'dark');
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('theme-dark-btn').classList.add('active');
  updateSystem(currentPrimary);
});

document.getElementById('theme-hc-btn').addEventListener('click', () => {
  currentTheme = 'high-contrast';
  document.documentElement.setAttribute('data-theme', 'high-contrast');
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('theme-hc-btn').classList.add('active');
  updateSystem(currentPrimary);
});

// Code Tabs
document.querySelectorAll('.code-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCodeTab = btn.getAttribute('data-code');
    updateSystem(currentPrimary);
  });
});

copyCodeBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(codeDisplayEl.textContent).then(() => {
    copyCodeBtn.textContent = '✓ Copied!';
    setTimeout(() => copyCodeBtn.textContent = '📋 Copy Code', 2000);
  });
});

// Perception Simulation
document.getElementById('cb-sim-select').addEventListener('change', e => {
  document.body.className = '';
  if (e.target.value !== 'none') {
    document.body.classList.add(`sim-${e.target.value}`);
  }
});

// Interactive Tabs
document.querySelectorAll('.tab-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-item').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const target = btn.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});

// Modal Logic
const modal = document.getElementById('demo-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const confirmModalBtn = document.getElementById('confirm-modal-btn');

function openModal() {
  modal.removeAttribute('hidden');
  closeModalBtn.focus();
}

function closeModal() {
  modal.setAttribute('hidden', '');
  openModalBtn.focus();
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);
confirmModalBtn.addEventListener('click', closeModal);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
    closeModal();
  }
});

// Initialize
updateSystem('#2563EB');
