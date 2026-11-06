import { hasFinePointer, prefersReducedMotion } from '../config/env'
import { CATEGORIES, KEYS, type Category } from '../content/keys'
import { $, $$ } from '../lib/dom'
import { clamp } from '../lib/math'
import { gsap } from '../motion/gsap'
import { scrollToPosition } from '../motion/smoothScroll'
import { SECTION, isHolding, type ScrollState, type Timeline } from '../scene/timeline'

const READOUT_HINT = hasFinePointer ? 'Pasa el cursor por una tecla' : 'Toca una tecla'
/** Bridges the gap between a category heading and its tags. */
const HOVER_RELEASE_MS = 260
const TAP_HOLD_SECONDS = 2.2
const RIPPLE_STEP_MS = 90

export type PressKey = (key: number) => void

/**
 * Category row under the key grid. Scrolling walks through the categories; hovering a category,
 * a tag or a key takes over for as long as the pointer stays there.
 */
export class StackPanel {
  /** Key whose tag is hovered, raised from the 3D scene; -1 if none. */
  focusedKey = -1

  private readonly timeline: Timeline
  private readonly pressKey: PressKey
  private readonly categories = $$('.cat')
  private readonly readout = $('#readout')
  private readonly tagByKey = new Map<number, HTMLElement>()
  private activeIndex = 0
  private hoveredCategory = -1
  private hoverReleaseTimer = 0
  private tappedKey = -1
  private tappedAt = -9
  private highlightedTag: HTMLElement | null = null
  private lastProgress = -1

  constructor(timeline: Timeline, pressKey: PressKey) {
    this.timeline = timeline
    this.pressKey = pressKey
    this.readout.textContent = READOUT_HINT

    this.categories.forEach((category, index) => this.bindCategory(category, index))
    $$('li[data-key]').forEach((tag) => {
      const key = Number(tag.dataset.key)
      this.tagByKey.set(key, tag)
      tag.addEventListener('pointerenter', () => {
        this.focusedKey = key
      })
      tag.addEventListener('pointerleave', () => {
        this.focusedKey = -1
      })
    })
  }

  get activeCategory(): Category {
    return CATEGORIES[this.activeIndex]
  }

  registerTap(key: number, time: number): void {
    this.tappedKey = key
    this.tappedAt = time
  }

  update(scrollY: number, time: number, state: ScrollState, hoveredKey: number): void {
    const progress = this.timeline.progressThrough(SECTION.stack, scrollY)
    if (progress !== this.lastProgress) {
      this.lastProgress = progress
      this.categories.forEach((category, index) => {
        category.style.setProperty('--f', String(clamp(progress * CATEGORIES.length - index)))
      })
    }

    const inStack = isHolding(state, SECTION.stack)
    const tapped = time - this.tappedAt < TAP_HOLD_SECONDS ? this.tappedKey : -1
    const key = [hoveredKey, this.focusedKey, tapped].find((candidate) => candidate > -1) ?? -1
    const keyCategory = key > -1 ? CATEGORIES.indexOf(KEYS[key].category as Category) : -1

    const scrollCategory = Math.min(CATEGORIES.length - 1, Math.floor(progress * CATEGORIES.length))
    const hovered = this.hoveredCategory > -1 ? this.hoveredCategory : scrollCategory
    this.setActive(keyCategory > -1 ? keyCategory : hovered, inStack && keyCategory < 0)

    this.highlightTag(key > -1 ? (this.tagByKey.get(key) ?? null) : null)
    if (inStack) {
      const text = key > -1 ? KEYS[key].description : READOUT_HINT
      if (this.readout.textContent !== text) this.readout.textContent = text
    }
  }

  private bindCategory(category: HTMLElement, index: number): void {
    const heading = $('.cat-head', category)
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      clearTimeout(this.hoverReleaseTimer)
      this.hoveredCategory = index
    }
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      this.hoverReleaseTimer = window.setTimeout(() => {
        this.hoveredCategory = -1
      }, HOVER_RELEASE_MS)
    }
    for (const element of [heading, $('.cat-chips', category)]) {
      element.addEventListener('pointerenter', onEnter)
      element.addEventListener('pointerleave', onLeave)
    }
    heading.addEventListener('click', () => {
      this.hoveredCategory = -1
      scrollToPosition(this.timeline.positionAt(SECTION.stack, (index + 0.5) / CATEGORIES.length))
    })
  }

  private setActive(index: number, withRipple: boolean): void {
    if (index === this.activeIndex) return
    this.activeIndex = index

    this.categories.forEach((category, position) => {
      const isActive = position === index
      category.classList.toggle('on', isActive)
      $('.cat-head', category).setAttribute('aria-pressed', String(isActive))
    })
    if (prefersReducedMotion) return

    gsap.fromTo(
      $$('li', this.categories[index]),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.04, overwrite: true },
    )
    if (withRipple) {
      KEYS.flatMap((key, position) => (key.category === CATEGORIES[index] ? [position] : [])).forEach(
        (key, order) => {
          setTimeout(() => this.pressKey(key), RIPPLE_STEP_MS * order)
        },
      )
    }
  }

  private highlightTag(tag: HTMLElement | null): void {
    if (tag === this.highlightedTag) return
    this.highlightedTag?.classList.remove('hit')
    tag?.classList.add('hit')
    this.highlightedTag = tag
  }
}
