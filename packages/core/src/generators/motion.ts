/**
 * Motion and animation token generator supporting prefers-reduced-motion
 */

export interface DurationToken {
  name: string;
  ms: number;
  css: string;
}

export interface EasingToken {
  name: string;
  css: string;
}

export interface MotionTokens {
  reducedMotion: boolean;
  durations: Record<string, DurationToken>;
  easings: Record<string, EasingToken>;
  transitions: Record<string, string>;
}

export function generateMotionTokens(reducedMotion: boolean = false): MotionTokens {
  const durations: Record<string, DurationToken> = {
    instant: { name: 'duration-instant', ms: 0, css: '0ms' },
    fast: { name: 'duration-fast', ms: reducedMotion ? 0 : 150, css: reducedMotion ? '0ms' : '150ms' },
    normal: { name: 'duration-normal', ms: reducedMotion ? 0 : 250, css: reducedMotion ? '0ms' : '250ms' },
    slow: { name: 'duration-slow', ms: reducedMotion ? 0 : 400, css: reducedMotion ? '0ms' : '400ms' },
    slower: { name: 'duration-slower', ms: reducedMotion ? 0 : 600, css: reducedMotion ? '0ms' : '600ms' },
  };

  const easings: Record<string, EasingToken> = {
    default: { name: 'ease-default', css: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    in: { name: 'ease-in', css: 'cubic-bezier(0.4, 0, 1, 1)' },
    out: { name: 'ease-out', css: 'cubic-bezier(0, 0, 0.2, 1)' },
    inOut: { name: 'ease-in-out', css: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    spring: { name: 'ease-spring', css: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  };

  const transitions: Record<string, string> = {
    all: reducedMotion ? 'none' : `all ${durations.normal.css} ${easings.default.css}`,
    colors: reducedMotion ? 'none' : `color ${durations.fast.css} ${easings.default.css}, background-color ${durations.fast.css} ${easings.default.css}, border-color ${durations.fast.css} ${easings.default.css}`,
    transform: reducedMotion ? 'none' : `transform ${durations.normal.css} ${easings.spring.css}`,
    opacity: reducedMotion ? 'none' : `opacity ${durations.fast.css} ${easings.out.css}`,
  };

  return {
    reducedMotion,
    durations,
    easings,
    transitions,
  };
}
