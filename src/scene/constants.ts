import type { KeyColor } from '../content/keys'

export const CAMERA = { fov: 30, z: 12 } as const

/** Albedo of each key. */
export const KEY_BODY_COLORS: Record<KeyColor, string> = {
  // Calibrated so the lit top face renders as the UI accent (--accent); see the signature material.
  accent: '#397fb7',
  paper: '#ffffff',
  graphite: '#2b2e3a',
  lime: '#c1ff00',
  tools: '#aab3ff',
}

export const KEY_LEGEND_COLORS: Record<KeyColor, string> = {
  accent: '#ffffff',
  paper: '#000000',
  graphite: '#ffffff',
  lime: '#000000',
  tools: '#000000',
}

/** Body colour of the signature key while it shows the Relpa project. */
export const RELPA_BODY_COLOR = '#111111'
