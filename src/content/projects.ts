export type ProjectLegend = { kind: 'text'; number: string; code: string; stack: string } | { kind: 'relpa' }

/** Legend engraved on the key for each `.proj` article, in the same order as the markup. */
export const PROJECT_LEGENDS: readonly ProjectLegend[] = [
  { kind: 'text', number: '01', code: 'AI', stack: 'Gemini · FastAPI' },
  { kind: 'text', number: '02', code: 'URL', stack: 'Node.js · MongoDB' },
  { kind: 'text', number: '03', code: 'WS', stack: 'Socket.IO · JWT' },
  { kind: 'relpa' },
]
