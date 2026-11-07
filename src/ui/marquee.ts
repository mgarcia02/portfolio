import { prefersReducedMotion } from '../config/env'
import { $ } from '../lib/dom'
import { clamp } from '../lib/math'

const BASE_SPEED = 50
const SCROLL_BOOST = 0.5
const MAX_SKEW = 14
const SKEW_PER_VELOCITY = 0.006
const SKEW_SMOOTHING = 0.12
const VELOCITY_SMOOTHING = 0.2

/** Endless text strip that speeds up with scrolling and leans with its velocity. */
export class Marquee {
  private readonly track = $('#mqTrack')
  private x = 0
  private skew = 0
  private velocity = 0
  private lastScrollY = 0

  constructor() {
    // The second copy is what makes the loop seamless.
    this.track.innerHTML += this.track.innerHTML
  }

  update(scrollY: number, dt: number): void {
    const delta = scrollY - this.lastScrollY
    this.lastScrollY = scrollY
    if (prefersReducedMotion) return

    this.velocity += (delta / Math.max(dt, 0.001) - this.velocity) * VELOCITY_SMOOTHING
    this.x -= dt * BASE_SPEED + Math.abs(delta) * SCROLL_BOOST
    const loopWidth = this.track.scrollWidth / 2
    if (loopWidth > 0 && -this.x > loopWidth) this.x += loopWidth

    const targetSkew = clamp(-this.velocity * SKEW_PER_VELOCITY, -MAX_SKEW, MAX_SKEW)
    this.skew += (targetSkew - this.skew) * SKEW_SMOOTHING
    this.track.style.transform = `translate3d(${this.x}px,0,0) skewX(${this.skew}deg)`
  }
}
