# Multi-Platform Export Reference

DesignMint generates native token formats for every major client platform.

---

## 🌐 Web

### CSS Custom Properties (`tokens.css`)
- Light, Dark, High-Contrast (`@media (prefers-contrast: more)`), and Reduced Motion (`@media (prefers-reduced-motion)`) media queries.
- Clean semantic tokens: `--dm-canvas-bg`, `--dm-text-primary`, `--dm-focus-ring-color`.

### Tailwind CSS (`tailwind.theme.js`)
- Plug-and-play theme configuration for `tailwind.config.js`:

```javascript
// tailwind.config.js
const designMintTheme = require('./dist/designmint/tailwind.theme.js');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...designMintTheme.theme.extend,
    },
  },
};
```

---

## 🍏 iOS (Swift & SwiftUI)

### `DesignMintTokens.swift`
- Type-safe `Color` and `CGFloat` constants for SwiftUI and UIKit:

```swift
import SwiftUI

struct PrimaryButton: View {
    var title: String
    
    var body: some View {
        Text(title)
            .padding(.horizontal, DesignMintTokens.Spacing.space_4)
            .padding(.vertical, DesignMintTokens.Spacing.space_2)
            .background(DesignMintTokens.Colors.primary_600)
            .foregroundColor(.white)
            .cornerRadius(8)
            .frame(minHeight: DesignMintTokens.Accessibility.minTouchTarget) // 44pt touch target
    }
}
```

---

## 🤖 Android (XML & Jetpack Compose)

### XML Resources (`res/values/colors.xml`, `dimens.xml`)
- Standard Android resource identifiers: `@color/dm_primary_600`, `@dimen/dm_space_4`.

### Jetpack Compose (`DesignMintTheme.kt`)
- Kotlin object containing Compose `Color` and `Dp` values:

```kotlin
@Composable
fun PrimaryButton(text: String, onClick: () -> Unit) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = DesignMintTheme.Colors.primary_600
        ),
        modifier = Modifier.defaultMinSize(minHeight = DesignMintTheme.Accessibility.minTouchTarget)
    ) {
        Text(text)
    }
}
```

---

## 🎯 Flutter (`app_theme.dart`)

- Type-safe Dart constants and `ThemeData` builders:

```dart
import 'package:flutter/material.dart';
import 'app_theme.dart';

void main() {
  runApp(MaterialApp(
    theme: createDesignMintTheme(isDark: false),
    darkTheme: createDesignMintTheme(isDark: true),
    home: HomeScreen(),
  ));
}
```
