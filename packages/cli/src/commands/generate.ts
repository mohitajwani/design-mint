/**
 * CLI Generate Command — Builds complete design system and platform outputs
 */

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import { generateDesignSystem } from '@designmint/core';

export async function generateCommand(options: {
  config?: string;
  output?: string;
  platform?: string;
}): Promise<void> {
  const configPath = path.resolve(process.cwd(), options.config || 'designmint.config.yaml');
  const outDir = path.resolve(process.cwd(), options.output || 'dist/designmint');

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config file not found at: ${configPath}`);
    console.log('Run `designmint init` to create a starter configuration.');
    process.exit(1);
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  const parsed = configPath.endsWith('.json') ? JSON.parse(raw) : yaml.parse(raw);
  const brandData = parsed.brand || parsed;

  console.log(`🌿 Generating DesignMint system for "${brandData.name}"...`);

  const ds = generateDesignSystem(brandData);
  fs.mkdirSync(outDir, { recursive: true });

  const platform = options.platform || 'all';

  // 1. Web exports (CSS, Tailwind)
  if (platform === 'all' || platform === 'web') {
    const cssPath = path.join(outDir, 'tokens.css');
    fs.writeFileSync(cssPath, ds.exporters.css());
    console.log(`  ✓ Generated CSS Custom Properties: ${cssPath}`);

    const tailwindPath = path.join(outDir, 'tailwind.theme.js');
    fs.writeFileSync(tailwindPath, ds.exporters.tailwind());
    console.log(`  ✓ Generated Tailwind Configuration: ${tailwindPath}`);
  }

  // 2. Universal Tokens (JSON & DTCG)
  if (platform === 'all' || platform === 'json') {
    const jsonPath = path.join(outDir, 'tokens.json');
    fs.writeFileSync(jsonPath, ds.exporters.json());
    console.log(`  ✓ Generated Tokens JSON: ${jsonPath}`);

    const dtcgPath = path.join(outDir, 'tokens.dtcg.json');
    fs.writeFileSync(dtcgPath, ds.exporters.dtcg());
    console.log(`  ✓ Generated W3C DTCG Standard Tokens: ${dtcgPath}`);
  }

  // 3. iOS Export (Swift)
  if (platform === 'all' || platform === 'ios') {
    const swiftPath = path.join(outDir, 'DesignMintTokens.swift');
    fs.writeFileSync(swiftPath, ds.exporters.swift());
    console.log(`  ✓ Generated iOS Swift / SwiftUI tokens: ${swiftPath}`);
  }

  // 4. Android Export (XML & Jetpack Compose)
  if (platform === 'all' || platform === 'android') {
    const androidOut = path.join(outDir, 'android');
    fs.mkdirSync(androidOut, { recursive: true });

    const xml = ds.exporters.androidXml();
    fs.writeFileSync(path.join(androidOut, 'colors.xml'), xml.colorsXml);
    fs.writeFileSync(path.join(androidOut, 'dimens.xml'), xml.dimensXml);

    const composePath = path.join(androidOut, 'DesignMintTheme.kt');
    fs.writeFileSync(composePath, ds.exporters.compose());
    console.log(`  ✓ Generated Android XML and Compose Theme: ${androidOut}`);
  }

  // 5. Compose Multiplatform (Android, iOS, Desktop, Web)
  if (platform === 'all' || platform === 'compose-multiplatform' || platform === 'cmp') {
    const cmpOut = path.join(outDir, 'compose-multiplatform');
    fs.mkdirSync(cmpOut, { recursive: true });

    const bundle = ds.exporters.composeMultiplatform();
    fs.writeFileSync(path.join(cmpOut, 'Color.kt'), bundle.colorKt);
    fs.writeFileSync(path.join(cmpOut, 'Typography.kt'), bundle.typographyKt);
    fs.writeFileSync(path.join(cmpOut, 'Shape.kt'), bundle.shapeKt);
    fs.writeFileSync(path.join(cmpOut, 'Theme.kt'), bundle.themeKt);
    fs.writeFileSync(path.join(cmpOut, 'Accessibility.kt'), bundle.accessibilityKt);
    console.log(`  ✓ Generated Compose Multiplatform commonMain Suite: ${cmpOut}`);
  }

  // 5. Flutter Export
  if (platform === 'all' || platform === 'flutter') {
    const flutterPath = path.join(outDir, 'app_theme.dart');
    fs.writeFileSync(flutterPath, ds.exporters.flutter());
    console.log(`  ✓ Generated Flutter Theme: ${flutterPath}`);
  }

  console.log(`\n🎉 Design system minted successfully in: ${outDir}\n`);
}
