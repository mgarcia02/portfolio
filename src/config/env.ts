export const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
export const hasFinePointer = matchMedia('(pointer: fine)').matches

/** Keep in sync with the `max-width` breakpoint used across the stylesheets. */
export const isCompactViewport = (): boolean => window.innerWidth <= 820

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Landscape phones and the like: pinned sections need more height than this to fit their content. */
export const isTooShortToPin = (): boolean => window.innerHeight < 600
