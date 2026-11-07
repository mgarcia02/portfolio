import { isCompactViewport } from '../config/env'
import { CONTACT_ROWS, CONTACT_ROWS_COMPACT, KEYS, SIGNATURE_KEY } from '../content/keys'
import { PROJECT_LEGENDS } from '../content/projects'
import { clamp, smoothstep } from '../lib/math'
import type { Slot } from './timeline'

/** Position, rotation and uniform scale of one key. */
export type Pose = [x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number, scale: number]

interface LayoutContext {
  slot: Slot
  /** Progress through the section, 0 to 1. */
  progress: number
  time: number
}

type Layout = (key: number, context: LayoutContext) => Pose

/** Keys that are not part of a layout wait, invisibly small, behind the signature key. */
const HIDDEN_SCALE = 1e-4
const HIDDEN_DEPTH = -0.3
const GRID_COLUMNS = 4
const GRID_COLUMNS_COMPACT = 3

const fitToSlot = (slot: Slot): number => Math.min(slot.width, slot.height) * 0.78

const hero: Layout = (key, { slot }) => {
  const isSignature = key === SIGNATURE_KEY
  return [
    slot.x,
    slot.y,
    isSignature ? 0 : HIDDEN_DEPTH,
    -0.32,
    0.5,
    0.12,
    isSignature ? fitToSlot(slot) : HIDDEN_SCALE,
  ]
}

/** Three-quarter view that slowly opens up as the About copy lights up. */
const about: Layout = (key, { slot, progress }) => {
  const isSignature = key === SIGNATURE_KEY
  return [
    slot.x,
    slot.y,
    isSignature ? 0 : HIDDEN_DEPTH,
    -0.3 + progress * 0.12,
    -0.78 + progress * 0.42,
    -0.08,
    isSignature ? fitToSlot(slot) * 0.95 : HIDDEN_SCALE,
  ]
}

/** Tilted keyboard plate with a soft wave running across the keys. */
const stack: Layout = (key, { slot, progress, time }) => {
  const columns = isCompactViewport() ? GRID_COLUMNS_COMPACT : GRID_COLUMNS
  const rows = KEYS.length / columns
  const spacing = Math.min(slot.width / columns, slot.height / (rows * 0.9))
  const rowSpacing = Math.min(spacing * 1.04, slot.height / rows)
  const column = key % columns
  const row = Math.floor(key / columns)
  const wave = Math.sin(time * 1.6 - (column + row) * 0.7) * 0.05 * spacing
  return [
    slot.x + (column - (columns - 1) / 2) * spacing,
    slot.y - (row - (rows - 1) / 2) * rowSpacing,
    wave,
    -0.55 + progress * 0.1,
    (progress - 0.5) * 0.25,
    0,
    spacing * 0.8,
  ]
}

/**
 * Each project holds the key still, then spins it a full turn into the next one. `index` flips
 * halfway through the turn, when the key shows its back, so the legend swap is never seen.
 * The extra turn makes the key also spin on its way in from the stack grid.
 */
export function projectTurn(progress: number): { rotation: number; index: number } {
  const count = PROJECT_LEGENDS.length
  const position = clamp(progress) * count
  const current = Math.min(count - 1, Math.floor(position))
  const turn = current < count - 1 ? smoothstep(0.5, 0.96, position - current) : 0
  return { rotation: Math.PI * 2 * (1 + current + turn), index: current + (turn > 0.5 ? 1 : 0) }
}

const projects: Layout = (key, { slot, progress }) => {
  const isSignature = key === SIGNATURE_KEY
  return [
    slot.x,
    slot.y,
    0,
    -0.18,
    projectTurn(progress).rotation,
    0.06,
    isSignature ? fitToSlot(slot) * 0.92 : HIDDEN_SCALE,
  ]
}

/** Keys rearranged to spell the contact message, one centred row per line. */
const contact: Layout = (key, { slot }) => {
  const rows = isCompactViewport() ? CONTACT_ROWS_COMPACT : CONTACT_ROWS
  const longestRow = Math.max(...rows.map((row) => row.length))
  const spacing = Math.min(slot.width / longestRow, slot.height / (rows.length * 0.92))
  const rowIndex = rows.findIndex((row) => row.includes(key))
  const row = rows[rowIndex]
  return [
    slot.x + (row.indexOf(key) - (row.length - 1) / 2) * spacing,
    slot.y - (rowIndex - (rows.length - 1) / 2) * spacing * 0.92,
    0,
    -0.5,
    0,
    0,
    spacing * 0.84,
  ]
}

/** Indexed by `SECTION`. */
export const LAYOUTS = [hero, about, stack, projects, contact] as const
