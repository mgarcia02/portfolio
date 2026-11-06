import { hasFinePointer, prefersReducedMotion } from '../config/env'
import { $$ } from '../lib/dom'

const PULL_X = 0.25
const PULL_Y = 0.35

/** `[data-magnetic]` elements lean towards the pointer while it is over them. */
export function initMagneticButtons(): void {
  if (!hasFinePointer || prefersReducedMotion) return
  $$('[data-magnetic]').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left - rect.width / 2) * PULL_X
      const y = (event.clientY - rect.top - rect.height / 2) * PULL_Y
      element.style.transform = `translate(${x}px,${y}px)`
    })
    element.addEventListener('pointerleave', () => {
      element.style.transform = ''
    })
  })
}
