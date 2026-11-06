import { closest } from '../lib/dom'

/** Elements that take the pointer away from the 3D keys behind them. */
export const UI_SELECTOR = 'a,button,.card,input,.menu-card,.cats'

export const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  /** Normalised device coordinates, -1 to 1. */
  ndcX: 0,
  ndcY: 0,
  hasMoved: false,
  overUi: false,
}

export function initPointer(): void {
  addEventListener(
    'pointermove',
    (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.ndcX = (event.clientX / window.innerWidth) * 2 - 1
      pointer.ndcY = -(event.clientY / window.innerHeight) * 2 + 1
      pointer.hasMoved = true
    },
    { passive: true },
  )
  addEventListener(
    'pointerover',
    (event) => {
      pointer.overUi = Boolean(closest(event.target, UI_SELECTOR))
    },
    { passive: true },
  )
}
