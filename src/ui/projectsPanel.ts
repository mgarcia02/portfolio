import { prefersReducedMotion } from '../config/env'
import { PROJECT_LEGENDS } from '../content/projects'
import { $, $$ } from '../lib/dom'
import { gsap } from '../motion/gsap'
import { projectTurn } from '../scene/layouts'
import { SECTION, type ScrollState } from '../scene/timeline'

/** Keeps the project copy, rolling counter and progress bar in sync with the key's turns. */
export class ProjectsPanel {
  activeIndex = 0

  private readonly articles = $$('.proj')
  private readonly counter = $('#roll')
  private readonly dots = $$('.pbar .dot')
  private readonly progressBar = $('#pbarFill')

  constructor() {
    this.dots[0].classList.add('on')
  }

  update(state: ScrollState): void {
    const isBefore = state.kind === 'hold' ? state.section < SECTION.projects : state.to <= SECTION.projects
    let progress = isBefore ? 0 : 1
    if (state.kind === 'hold' && state.section === SECTION.projects) progress = state.progress

    this.progressBar.style.transform = `scaleX(${progress})`
    this.setActive(progress === 1 ? PROJECT_LEGENDS.length - 1 : projectTurn(progress).index)
  }

  private setActive(index: number): void {
    if (index === this.activeIndex) return
    this.activeIndex = index

    this.articles.forEach((article, position) => article.classList.toggle('is-active', position === index))
    this.dots.forEach((dot, position) => dot.classList.toggle('on', position <= index))
    this.counter.style.transform = `translateY(${-index}em)`

    if (prefersReducedMotion) return
    gsap.fromTo(
      $$('[data-stagger]', this.articles[index]),
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06, overwrite: true },
    )
  }
}
