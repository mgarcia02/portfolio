import Lenis from 'lenis'
import { prefersReducedMotion } from '../config/env'
import { $$ } from '../lib/dom'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

/** Starts Lenis paused, synced with ScrollTrigger; `startSmoothScroll` releases it. */
export function initSmoothScroll(): void {
  if (!prefersReducedMotion) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis?.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    lenis.stop()
  }

  $$<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.getAttribute('href')?.slice(1) ?? '')
      if (!target) return
      event.preventDefault()
      if (lenis) lenis.scrollTo(target, { duration: 1.6 })
      else target.scrollIntoView({ behavior: 'auto' })
    })
  })
}

export function startSmoothScroll(): void {
  lenis?.start()
}

export function scrollToPosition(y: number): void {
  if (lenis) lenis.scrollTo(y, { duration: 1.1 })
  else window.scrollTo(0, y)
}
