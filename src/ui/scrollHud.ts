import { $, $$, documentTop } from '../lib/dom'
import { clamp } from '../lib/math'

/** How far down the viewport a section must reach to count as the active one. */
const ACTIVE_LINE = 0.45
/** The HUD percentage appears after scrolling this share of the first screen. */
const SHOW_AFTER = 0.7

/** Live scroll percentage and active link in the section menu. */
export class ScrollHud {
  private readonly percentage = $('#scrollPct')
  private readonly links = $$<HTMLAnchorElement>('.menu-card a')
  private readonly sections = this.links.map((link) => $(link.getAttribute('href') ?? ''))
  private sectionTops: number[] = []
  private maxScroll = 1

  measure(): void {
    this.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    this.sectionTops = this.sections.map(documentTop)
  }

  update(scrollY: number): void {
    this.percentage.textContent = `${String(Math.round(clamp(scrollY / this.maxScroll) * 100)).padStart(3, '0')}%`
    document.documentElement.classList.toggle('hud-on', scrollY > window.innerHeight * SHOW_AFTER)

    const line = scrollY + window.innerHeight * ACTIVE_LINE
    const active = this.sectionTops.reduce((current, top, index) => (line >= top ? index : current), 0)
    this.links.forEach((link, index) => link.classList.toggle('on', index === active))
  }
}
