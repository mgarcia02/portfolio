/** Returns the first match or throws: a missing element is a markup bug, not a runtime state. */
export function $<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T {
  const element = root.querySelector<T>(selector)
  if (!element) throw new Error(`Missing element: ${selector}`)
  return element
}

export function $$<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector))
}

export function closest(target: EventTarget | null, selector: string): Element | null {
  return target instanceof Element ? target.closest(selector) : null
}

/** Distance from the top of the document, independent of the current scroll position. */
export function documentTop(element: Element): number {
  return element.getBoundingClientRect().top + window.scrollY
}
