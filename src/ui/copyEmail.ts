import { $ } from '../lib/dom'

const FEEDBACK_MS = 1800

/** Copies the address, or selects it when the clipboard is not available. */
export function initCopyEmail(): void {
  const button = $('#copyEmail')
  const email = $('#emailText')
  const label = button.textContent ?? ''

  const showFeedback = (text: string) => {
    button.textContent = text
    setTimeout(() => {
      button.textContent = label
    }, FEEDBACK_MS)
  }
  const selectAddress = () => {
    const range = document.createRange()
    range.selectNodeContents(email)
    const selection = getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    showFeedback('Selecciónalo')
  }

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(email.textContent ?? '').then(() => showFeedback('Copiado'), selectAddress)
  })
}
