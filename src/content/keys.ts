export type Category = 'FE' | 'BE' | 'AI' | 'OPS'
export type KeyColor = 'accent' | 'paper' | 'graphite' | 'lime' | 'tools'

export interface KeyDefinition {
  label: string
  /** Null for the signature key, which belongs to no category. */
  category: Category | null
  /** Shown in the readout when the key is hovered or tapped. */
  description: string
  color: KeyColor
  /** Character the key shows when the keys spell the contact message. */
  letter: string
}

/** Same order as the category row in the markup. */
export const CATEGORIES: readonly Category[] = ['FE', 'BE', 'AI', 'OPS']

export const SIGNATURE_KEY = 0

/** Grid order: left to right, top to bottom. `data-key` attributes in the markup index this list. */
export const KEYS: readonly KeyDefinition[] = [
  { label: 'MG.', category: null, description: 'MG. — la tecla de autor', color: 'accent', letter: '↵' },
  { label: 'React', category: 'FE', description: 'React · Frontend', color: 'paper', letter: 'H' },
  { label: 'TypeScript', category: 'FE', description: 'TypeScript · Frontend', color: 'paper', letter: 'O' },
  { label: 'Vue', category: 'FE', description: 'Vue · Frontend', color: 'paper', letter: 'L' },
  { label: 'Node.js', category: 'BE', description: 'Node.js · Backend', color: 'graphite', letter: 'M' },
  { label: 'Python', category: 'BE', description: 'Python · Backend', color: 'graphite', letter: 'U' },
  { label: 'MySQL', category: 'BE', description: 'MySQL · Backend', color: 'graphite', letter: 'N' },
  { label: 'MongoDB', category: 'BE', description: 'MongoDB · Backend', color: 'graphite', letter: 'D' },
  {
    label: 'Prompt Eng.',
    category: 'AI',
    description: 'Prompt Eng. · AI / LLMs',
    color: 'lime',
    letter: '!',
  },
  { label: 'Agentes IA', category: 'AI', description: 'Agentes IA · AI / LLMs', color: 'lime', letter: ',' },
  { label: 'Git', category: 'OPS', description: 'Git · Herramientas', color: 'tools', letter: 'A' },
  { label: 'Docker', category: 'OPS', description: 'Docker · Herramientas', color: 'tools', letter: 'O' },
]

/** Key order that types "HOLA, MUNDO!" followed by enter. */
export const TYPING_ORDER: readonly number[] = [1, 2, 3, 10, 9, 4, 5, 6, 7, 11, 8, 0]

export const CONTACT_ROWS: readonly (readonly number[])[] = [
  [1, 2, 3, 10, 9],
  [4, 5, 6, 7, 11, 8, 0],
]

export const CONTACT_ROWS_COMPACT: readonly (readonly number[])[] = [
  [1, 2, 3, 10, 9],
  [4, 5, 6, 7, 11],
  [8, 0],
]
