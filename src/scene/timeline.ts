import { $, documentTop } from '../lib/dom'
import { clamp } from '../lib/math'
import { CAMERA } from './constants'

/** Order in which the keys travel through the page. */
export const SECTION = { hero: 0, about: 1, stack: 2, projects: 3, contact: 4 } as const
export type SectionIndex = (typeof SECTION)[keyof typeof SECTION]

/** A DOM slot projected onto the z = 0 plane, in world units. */
export interface Slot {
  x: number
  y: number
  width: number
  height: number
}

interface Anchor {
  /** Scroll positions between which the section holds its layout. */
  start: number
  end: number
  slot: Slot
}

export type ScrollState =
  | { kind: 'hold'; section: SectionIndex; progress: number }
  | { kind: 'transition'; from: SectionIndex; to: SectionIndex; progress: number }

interface ScreenRect {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Maps scroll position to a section layout or to the transition between two of them.
 * Slots are measured where they sit while their section is on screen, so a key lands exactly
 * on its slot regardless of the current scroll position.
 */
export class Timeline {
  private anchors: Anchor[] = []

  measure(viewWidth: number, viewHeight: number): void {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const worldHeight = 2 * CAMERA.z * Math.tan((CAMERA.fov * Math.PI) / 360)
    const worldWidth = (worldHeight * viewWidth) / viewHeight

    const toSlot = (rect: ScreenRect): Slot => ({
      x: ((rect.x + rect.width / 2) / viewWidth - 0.5) * worldWidth,
      y: -((rect.y + rect.height / 2) / viewHeight - 0.5) * worldHeight,
      width: (rect.width / viewWidth) * worldWidth,
      height: (rect.height / viewHeight) * worldHeight,
    })

    /** Slot inside normal flow, as seen when the page is scrolled to `scrollY`. */
    const flowAnchor = (slotSelector: string, scrollY: number): Anchor => {
      const slot = $(slotSelector).getBoundingClientRect()
      return {
        start: scrollY,
        end: scrollY,
        slot: toSlot({
          x: slot.left,
          y: slot.top + window.scrollY - scrollY,
          width: slot.width,
          height: slot.height,
        }),
      }
    }

    /** Slot inside a sticky section: while pinned, its inner frame sits at the viewport top. */
    const pinnedAnchor = (sectionSelector: string, slotSelector: string): Anchor => {
      const section = $(sectionSelector)
      const frame = $('.pin-inner', section).getBoundingClientRect()
      const slot = $(slotSelector).getBoundingClientRect()
      const start = documentTop(section)
      return {
        start,
        end: start + section.offsetHeight - window.innerHeight,
        slot: toSlot({ x: slot.left, y: slot.top - frame.top, width: slot.width, height: slot.height }),
      }
    }

    this.anchors = [
      flowAnchor('#slotHero', 0),
      pinnedAnchor('#sobre-mi', '#slotAbout'),
      pinnedAnchor('#stack', '#slotGrid'),
      pinnedAnchor('#proyectos', '#slotProj'),
      flowAnchor('#slotContact', maxScroll),
    ]
  }

  slot(section: SectionIndex): Slot {
    return this.anchors[section].slot
  }

  /** Progress (0 to 1) through a pinned section; clamped outside of it. */
  progressThrough(section: SectionIndex, scrollY: number): number {
    const { start, end } = this.anchors[section]
    return clamp((scrollY - start) / Math.max(1, end - start))
  }

  /** Scroll position at a given progress through a pinned section. */
  positionAt(section: SectionIndex, progress: number): number {
    const { start, end } = this.anchors[section]
    return start + (end - start) * progress
  }

  stateAt(scrollY: number): ScrollState {
    const last = (this.anchors.length - 1) as SectionIndex
    for (let index = 0; index <= last; index++) {
      const section = index as SectionIndex
      const anchor = this.anchors[section]
      if (scrollY > anchor.end && section !== last) continue
      if (scrollY >= anchor.start || section === SECTION.hero) {
        return { kind: 'hold', section, progress: this.progressThrough(section, scrollY) }
      }
      const previous = this.anchors[section - 1]
      return {
        kind: 'transition',
        from: (section - 1) as SectionIndex,
        to: section,
        progress: clamp((scrollY - previous.end) / Math.max(1, anchor.start - previous.end)),
      }
    }
    return { kind: 'hold', section: last, progress: 1 }
  }
}

export const isHolding = (state: ScrollState, section: SectionIndex): boolean =>
  state.kind === 'hold' && state.section === section
