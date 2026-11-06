import { prefersReducedMotion } from '../config/env'
import { $, $$ } from '../lib/dom'
import { clamp } from '../lib/math'

const MESSAGES = [
  'Inyectando PBT en el molde…',
  'Grabando leyendas a láser…',
  'Lubricando estabilizadores…',
  'Calibrando switches lineales · 45 g…',
  'Flasheando firmware…',
  'Montando las 12 teclas en la placa…',
]
const SEGMENTS = 30
const MIN_DURATION_MS = prefersReducedMotion ? 500 : 2300
/** Progress waits here until the page reports it is ready. */
const WAITING_PROGRESS = 0.92
const EXIT_DELAY_MS = 220
const WIPE_DURATION_MS = 1200

/** Runs the 000→100 counter and wipes the screen once `isReady` holds; then calls `onDone`. */
export function runLoader(isReady: () => boolean, onDone: () => void): void {
  const loader = $('#loader')
  const counter = $('#ldNum')
  const message = $('#ldMsg')
  const bar = $('#ldBar')
  for (let index = 0; index < SEGMENTS; index++) bar.appendChild(document.createElement('i'))
  const segments = $$('i', bar)

  const startedAt = performance.now()
  let lastFrame = startedAt
  let shown = 0

  const tick = (now: number) => {
    const elapsed = clamp((now - startedAt) / MIN_DURATION_MS)
    const target = isReady() ? elapsed : Math.min(elapsed, WAITING_PROGRESS)
    const dt = Math.min(0.25, (now - lastFrame) / 1000)
    lastFrame = now
    shown += (target - shown) * (prefersReducedMotion ? 1 : 1 - Math.exp(-dt * 8))
    if (target >= 1 && shown > 0.995) shown = 1

    counter.textContent = String(Math.round(shown * 100)).padStart(3, '0')
    const filled = Math.round(shown * SEGMENTS)
    segments.forEach((segment, index) => segment.classList.toggle('on', index < filled))
    message.textContent = MESSAGES[Math.min(MESSAGES.length - 1, Math.floor(shown * MESSAGES.length))]

    if (shown < 1) {
      requestAnimationFrame(tick)
      return
    }
    setTimeout(() => {
      loader.classList.add('out')
      setTimeout(() => {
        loader.style.display = 'none'
      }, WIPE_DURATION_MS)
      onDone()
    }, EXIT_DELAY_MS)
  }
  requestAnimationFrame(tick)
}
