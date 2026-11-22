/**
 * CLI Init Command — Creates starter designmint.config.yaml
 */

import fs from 'node:fs';
import path from 'node:path';

export async function initCommand(options: { template?: string }): Promise<void> {
  const targetPath = path.resolve(process.cwd(), 'designmint.config.yaml');

  if (fs.existsSync(targetPath)) {
    console.log('⚠️ designmint.config.yaml already exists in this directory.');
    return;
  }

  const starterContent = `# ==============================================================================
# DesignMint Configuration
# ==============================================================================

brand:
  name: "My App"
  colors:
    primary: "#2563EB"       # Your brand color
    secondary: "#7C3AED"
    accent: "#F59E0B"
  typography:
    headingFont: "Plus Jakarta Sans"
    bodyFont: "Inter"
    monoFont: "JetBrains Mono"
  accessibility:
    compliance: "AA"
    themes: ["light", "dark", "high-contrast"]
    reducedMotion: true
  preferences:
    style: "modern"
    density: "comfortable"
`;

  fs.writeFileSync(targetPath, starterContent, 'utf8');
  console.log('✨ Created designmint.config.yaml!');
  console.log('Next steps:');
  console.log('  1. Edit designmint.config.yaml with your brand colors & fonts');
  console.log('  2. Run `designmint generate` to mint your tokens');
  console.log('  3. Run `designmint audit` to check WCAG compliance\n');
}
