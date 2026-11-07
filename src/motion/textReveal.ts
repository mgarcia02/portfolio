import { $, $$ } from '../lib/dom'
import { gsap } from './gsap'

const HIDDEN_CHAR = { yPercent: 118, rotate: 9, transformOrigin: '0% 100%' }
const DIMMED_WORD = 0.14
/** Viewport share the section has travelled when its words start lighting up. */
const LIGHTING_START = 0.65

/** Wraps every character of each `.ln` line in a span, keeping words unbreakable. */
function splitIntoChars(heading: HTMLElement): HTMLElement[] {
  heading.setAttribute('aria-label', (heading.textContent ?? '').replace(/\s+/g, ' ').trim())
  const chars: HTMLElement[] = []

  $$('.ln', heading).forEach((line) => {
    const words = (line.textContent ?? '').trim().split(/\s+/)
    line.textContent = ''
    line.setAttribute('aria-hidden', 'true')

    words.forEach((word, index) => {
      const wordEl = document.createElement('span')
      wordEl.className = 'w'
      for (const char of word) {
        const charEl = document.createElement('span')
        charEl.className = 'c'
        charEl.textContent = char
        wordEl.appendChild(charEl)
        chars.push(charEl)
      }
      line.appendChild(wordEl)
      if (index < words.length - 1) line.appendChild(document.createTextNode(' '))
    })
  })
  return chars
}

function revealHeadingsOnScroll(): void {
  $$('.reveal').forEach((heading) => {
    const chars = splitIntoChars(heading)
    gsap.set(chars, HIDDEN_CHAR)
    gsap.to(chars, {
      yPercent: 0,
      rotate: 0,
      duration: 1.15,
      ease: 'expo.out',
      stagger: 0.024,
      scrollTrigger: { trigger: heading.closest('section'), start: 'top 62%', once: true },
    })
  })
}

/** Lights the About copy word by word as the pinned section advances. */
function lightAboutCopyOnScroll(): void {
  const words: HTMLElement[] = []
  $$('#lit p').forEach((paragraph) => {
    const parts = (paragraph.textContent ?? '').split(/(\s+)/)
    paragraph.textContent = ''
    parts.forEach((part) => {
      if (!part.trim()) {
        paragraph.appendChild(document.createTextNode(part))
        return
      }
      const word = document.createElement('span')
      word.textContent = part
      paragraph.appendChild(word)
      words.push(word)
    })
  })
  // The copy stays fully legible until the section is about to enter the viewport.
  const section = $('#sobre-mi')
  const stagger = 0.08
  const duration = 0.4
  const lightingTime = duration + stagger * (words.length - 1)
  const leadShare = LIGHTING_START / (section.offsetHeight / window.innerHeight)
  const leadTime = (lightingTime * leadShare) / (1 - leadShare)

  gsap
    .timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } })
    .set(words, { opacity: DIMMED_WORD }, 0.001)
    .to(words, { opacity: 1, ease: 'none', stagger, duration }, leadTime)
}

function parallaxHeroTitle(): void {
  const acrossHero = () => ({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true })
  gsap.to('#heroTitle .l1', { xPercent: -22, yPercent: -30, ease: 'none', scrollTrigger: acrossHero() })
  gsap.to('#heroTitle .l2', { xPercent: 22, yPercent: 40, ease: 'none', scrollTrigger: acrossHero() })
  gsap.to('#scrollInd', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '20% top', scrub: true },
  })
}

/** Prepares every text animation and returns the function that plays the hero entrance. */
export function initTextReveal(): () => void {
  const heroChars = splitIntoChars($('#heroTitle'))
  gsap.set(heroChars, HIDDEN_CHAR)
  revealHeadingsOnScroll()
  lightAboutCopyOnScroll()
  parallaxHeroTitle()

  return () => {
    gsap.to(heroChars, {
      yPercent: 0,
      rotate: 0,
      duration: 1.3,
      ease: 'expo.out',
      stagger: 0.045,
      delay: 0.25,
    })
  }
}
