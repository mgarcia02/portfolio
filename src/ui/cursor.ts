import { hasFinePointer, prefersReducedMotion } from '../config/env'
import { pointer } from '../input/pointer'
import { $, closest } from '../lib/dom'

const RING_INERTIA = 0.16

/** Dot plus trailing ring. Grows over links and shows "Pulsa" over the 3D keys. */
export class Cursor {
  private readonly enabled = hasFinePointer && !prefersReducedMotion
  private readonly root = $('#cursor')
  private readonly dot = $('#curDot')
  private readonly ring = $('#curRing')
  private ringX = pointer.x
  private ringY = pointer.y

  constructor() {
    document.documentElement.classList.toggle('has-cursor', this.enabled)
    document.addEventListener('pointerover', (event) => {
      this.root.classList.toggle('is-link', Boolean(closest(event.target, 'a,button,[data-key]')))
    })
  }

  update(isOverKey: boolean): void {
    this.root.classList.toggle('is-key', isOverKey)
    if (!this.enabled) {
      document.body.style.cursor = isOverKey ? 'pointer' : ''
      return
    }
    this.ringX += (pointer.x - this.ringX) * RING_INERTIA
    this.ringY += (pointer.y - this.ringY) * RING_INERTIA
    this.dot.style.transform = `translate3d(${pointer.x}px,${pointer.y}px,0)`
    this.ring.style.transform = `translate3d(${this.ringX}px,${this.ringY}px,0)`
  }
}
