import { $, closest } from '../lib/dom'

export function initMenu(): void {
  const root = document.documentElement
  const button = $('#menuBtn')
  const isOpen = () => root.classList.contains('menu-open')
  const setOpen = (open: boolean) => {
    root.classList.toggle('menu-open', open)
    button.setAttribute('aria-expanded', String(open))
  }

  button.addEventListener('click', () => setOpen(!isOpen()))
  document.addEventListener('click', (event) => {
    if (!closest(event.target, '#hud') || closest(event.target, '.menu-card a')) setOpen(false)
  })
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false)
      button.focus()
    }
  })
}
