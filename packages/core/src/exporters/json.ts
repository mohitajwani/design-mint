/**
 * JSON and W3C Design Tokens Community Group (DTCG) Exporter
 */

import { DesignTokens } from '../schemas/tokens.js';

export function exportToJson(tokens: DesignTokens): string {
  return JSON.stringify(tokens, null, 2);
}

/**
 * Exports to W3C Design Tokens Community Group ($value, $type) standard
 */
export function exportToDtcg(tokens: DesignTokens): string {
  const dtcg: Record<string, any> = {
    $description: `DesignMint Design Tokens for ${tokens.brandName}`,
    color: {},
    dimension: {},
    fontFamily: {},
  };

  for (const [scaleName, scale] of Object.entries(tokens.colors)) {
    dtcg.color[scaleName] = {};
    for (const [step, t] of Object.entries(scale as Record<string, any>)) {
      dtcg.color[scaleName][step] = {
        $value: t.hex,
        $type: 'color',
      };
    }
  }

  for (const [key, t] of Object.entries(tokens.spacing)) {
    dtcg.dimension[key] = {
      $value: t.px,
      $type: 'dimension',
    };
  }

  return JSON.stringify(dtcg, null, 2);
}
