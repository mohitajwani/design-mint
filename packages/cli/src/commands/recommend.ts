/**
 * CLI Recommend Command — Ask which component to use for a UI need
 */

import { defaultRegistry } from '@designmint/core';

export async function recommendCommand(query: string): Promise<void> {
  if (!query) {
    console.log('Please provide a UI requirement (e.g. `designmint recommend "user needs to pick multiple options"`)');
    return;
  }

  const rec = defaultRegistry.recommend(query);
  console.log(`\n🎯 Recommendation for: "${query}"\n`);
  console.log(`Component:    ${rec.recommendedComponent.name} (${rec.recommendedComponent.category})`);
  console.log(`Description:  ${rec.recommendedComponent.description}`);
  console.log(`Why:          ${rec.reasoning}`);
  if (rec.alternatives.length > 0) {
    console.log(`Alternatives: ${rec.alternatives.join(', ')}`);
  }
  console.log('\n♿ Accessibility Guidelines:');
  for (const note of rec.accessibilityNotes) {
    console.log(`  - ${note}`);
  }
  console.log('');
}
