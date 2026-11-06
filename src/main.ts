import relpaMonogramUrl from './assets/relpa-monogram.svg'
import { prefersReducedMotion, supportsWebGL } from './config/env'
import { initPointer, UI_SELECTOR } from './input/pointer'
import { $, closest } from './lib/dom'
import { ScrollTrigger } from './motion/gsap'
import { initSmoothScroll, startSmoothScroll } from './motion/smoothScroll'
import { initTextReveal } from './motion/textReveal'
import { KeyboardScene } from './scene/KeyboardScene'
import { SECTION, Timeline, isHolding, type ScrollState } from './scene/timeline'
import { ContactTyping } from './ui/contactTyping'
import { initCopyEmail } from './ui/copyEmail'
import { Cursor } from './ui/cursor'
import { initGrain } from './ui/grain'
import { runLoader } from './ui/loader'
import { initMagneticButtons } from './ui/magnetic'
import { Marquee } from './ui/marquee'
import { initMenu } from './ui/menu'
import { ProjectsPanel } from './ui/projectsPanel'
import { ScrollHud } from './ui/scrollHud'
import { StackPanel } from './ui/stackPanel'

const FONT_TIMEOUT_MS = 2500
const LOGO_TIMEOUT_MS = 1500
const RESIZE_DEBOUNCE_MS = 150
/** Transition progress from which the keys count as settled on the contact message. */
const CONTACT_SETTLED = 0.985

const root = document.documentElement
const timeline = new Timeline()
let scene: KeyboardScene | null = null
let isReady = false

// Pinned layouts only make sense with the 3D scene: without WebGL the page stays a plain document.
const has3D = supportsWebGL()
root.classList.toggle('pinned', has3D)

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

initGrain()
initPointer()
initSmoothScroll()
initMenu()
initMagneticButtons()
initCopyEmail()

const playHeroEntrance = prefersReducedMotion ? null : initTextReveal()
const hud = new ScrollHud()
const marquee = new Marquee()
const cursor = new Cursor()
const projectsPanel = new ProjectsPanel()
const stackPanel = new StackPanel(timeline, (key) => scene?.pressKey(key))
const contactTyping = new ContactTyping((key, withFlash) => scene?.pressKey(key, withFlash))

const isAtContact = (state: ScrollState): boolean =>
  isHolding(state, SECTION.contact) ||
  (state.kind === 'transition' && state.to === SECTION.contact && state.progress > CONTACT_SETTLED)

function measure(): void {
  hud.measure()
  if (!scene) return
  const { width, height } = scene.resize()
  timeline.measure(width, height)
}

let lastTime = 0
function frame(now: number): void {
  requestAnimationFrame(frame)
  const time = now / 1000
  const dt = Math.min(0.05, time - lastTime || 0.016)
  lastTime = time
  const scrollY = window.scrollY

  hud.update(scrollY)
  marquee.update(scrollY, dt)
  cursor.update((scene?.hoveredKey ?? -1) > -1)
  if (!scene) return

  const state = timeline.stateAt(scrollY)
  projectsPanel.update(state)
  stackPanel.update(scrollY, time, state, scene.hoveredKey)
  contactTyping.setActive(isAtContact(state))
  scene.update({
    scrollY,
    time,
    dt,
    state,
    activeProject: projectsPanel.activeIndex,
    activeCategory: stackPanel.activeCategory,
    focusedKey: stackPanel.focusedKey,
  })
}

addEventListener('click', (event) => {
  if (!scene || closest(event.target, UI_SELECTOR)) return
  const ndcX = (event.clientX / window.innerWidth) * 2 - 1
  const ndcY = -(event.clientY / window.innerHeight) * 2 + 1
  const key = scene.pick(ndcX, ndcY)
  if (key < 0) return
  scene.pressKey(key, true)
  stackPanel.registerTap(key, performance.now() / 1000)
})

const withTimeout = (task: Promise<unknown>, ms: number): Promise<unknown> =>
  Promise.race([task, new Promise((resolve) => setTimeout(resolve, ms))]).catch(() => undefined)

/** Legends are drawn on canvas, so the font and the logo must be available beforehand. */
async function loadSceneAssets(): Promise<HTMLImageElement> {
  const logo = new Image()
  logo.src = relpaMonogramUrl
  await Promise.all([
    withTimeout(
      Promise.all([
        document.fonts.load('500 100px "DM Sans Variable"'),
        document.fonts.load('400 100px "DM Sans Variable"'),
      ]),
      FONT_TIMEOUT_MS,
    ),
    withTimeout(logo.decode(), LOGO_TIMEOUT_MS),
  ])
  return logo
}

async function boot(): Promise<void> {
  const logo = await loadSceneAssets()
  if (has3D) {
    try {
      scene = new KeyboardScene($<HTMLCanvasElement>('#scene'), timeline, logo)
    } catch (error) {
      console.error(error)
      root.classList.remove('pinned')
    }
  }
  measure()

  ScrollTrigger.addEventListener('refresh', measure)
  let resizeTimer = 0
  addEventListener('resize', () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), RESIZE_DEBOUNCE_MS)
  })

  isReady = true
  requestAnimationFrame(frame)
}

runLoader(
  () => isReady,
  () => {
    startSmoothScroll()
    ScrollTrigger.refresh()
    playHeroEntrance?.()
    scene?.playIntro()
  },
)
void boot()
