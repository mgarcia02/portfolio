import { prefersReducedMotion } from '../config/env'
import { KEYS, TYPING_ORDER } from '../content/keys'
import { $ } from '../lib/dom'

const ENTER = '↵'
const RESTING_TEXT = 'hola, mundo!'
const RESTART_DELAY_MS = 1700

const pauseAfter = (letter: string): number => {
  if (letter === ',') return 420
  if (letter === '!') return 520
  return 190 + Math.random() * 90
}

/** Presses the contact keys in sequence and mirrors them in the line below, in a loop. */
export class ContactTyping {
  private readonly output = $('#typed')
  private readonly pressKey: (key: number, withFlash: boolean) => void
  private isRunning = false
  private step = 0
  private timer = 0

  constructor(pressKey: (key: number, withFlash: boolean) => void) {
    this.pressKey = pressKey
  }

  setActive(active: boolean): void {
    if (prefersReducedMotion || active === this.isRunning) return
    this.isRunning = active
    window.clearTimeout(this.timer)
    this.step = 0
    this.output.textContent = active ? '' : RESTING_TEXT
    if (active) this.typeNext()
  }

  private typeNext = (): void => {
    if (this.step >= TYPING_ORDER.length) {
      this.step = 0
      this.timer = window.setTimeout(() => {
        this.output.textContent = ''
        this.typeNext()
      }, RESTART_DELAY_MS)
      return
    }
    const key = TYPING_ORDER[this.step++]
    const { letter } = KEYS[key]
    this.pressKey(key, letter === ENTER)
    if (letter !== ENTER) this.output.textContent += letter.toLowerCase() + (letter === ',' ? ' ' : '')
    this.timer = window.setTimeout(this.typeNext, pauseAfter(letter))
  }
}
