import * as THREE from 'three'
import { hasFinePointer, prefersReducedMotion } from '../config/env'
import { KEYS, SIGNATURE_KEY, type Category } from '../content/keys'
import { PROJECT_LEGENDS } from '../content/projects'
import { pointer } from '../input/pointer'
import { clamp, easeInOutCubic, lerp, smoothstep } from '../lib/math'
import { gsap } from '../motion/gsap'
import { CAMERA, KEY_BODY_COLORS, RELPA_BODY_COLOR } from './constants'
import { LAYOUTS, type Pose } from './layouts'
import { LegendFactory } from './legends'
import { createDust, createKeyGeometry, lightScene, linearColor } from './stage'
import { SECTION, isHolding, type ScrollState, type SectionIndex, type Timeline } from './timeline'

/** Share of a transition over which keys start one after another. */
const TRANSITION_STAGGER = 0.32
const LEGEND_OFFSET = 0.313
const LEGEND_SIZE = 0.68
/** After a scroll jump the key may never turn its back: swap the legend anyway after this long. */
const LEGEND_SWAP_TIMEOUT = 0.9
const PRESS_DURATION_MS = 320
const PRESS_DOWN_MS = 70

interface Key {
  group: THREE.Group
  body: THREE.Mesh
  bodyMaterial: THREE.MeshStandardMaterial
  legendMaterial: THREE.MeshStandardMaterial
  stackLegend: THREE.Texture
  messageLegend: THREE.Texture
  currentLegend: THREE.Texture
  pendingLegend: THREE.Texture | null
  pendingSince: number
  hover: number
  lift: number
  pressedAt: number
  flashedAt: number
}

export interface SceneFrame {
  scrollY: number
  time: number
  dt: number
  state: ScrollState
  activeProject: number
  activeCategory: Category
  /** Key raised from outside the canvas, by hovering its tag; -1 if none. */
  focusedKey: number
}

/** The one WebGL scene behind the page: twelve keycaps choreographed by the scroll timeline. */
export class KeyboardScene {
  hoveredKey = -1

  private readonly canvas: HTMLCanvasElement
  private readonly timeline: Timeline
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, 0.1, 100)
  private readonly world = new THREE.Group()
  private readonly raycaster = new THREE.Raycaster()
  private readonly flash: THREE.PointLight
  private readonly dust: THREE.Points
  private readonly keys: Key[]
  private readonly projectLegends: THREE.Texture[]
  private readonly signatureColor = linearColor(KEY_BODY_COLORS.indigo)
  private readonly relpaColor = linearColor(RELPA_BODY_COLOR)
  private readonly intro = { scale: prefersReducedMotion ? 1 : 0, spin: prefersReducedMotion ? 1 : 0 }

  private readonly tmpQuaternion = new THREE.Quaternion()
  private readonly tmpVector = new THREE.Vector3()
  private readonly tmpNdc = new THREE.Vector2()

  constructor(canvas: HTMLCanvasElement, timeline: Timeline, relpaLogo: HTMLImageElement) {
    this.canvas = canvas
    this.timeline = timeline
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.08
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera.position.set(0, 0, CAMERA.z)
    this.flash = lightScene(this.scene, this.renderer)
    this.dust = createDust()
    this.scene.add(this.world, this.dust)

    const legends = new LegendFactory(Math.min(8, this.renderer.capabilities.getMaxAnisotropy()))
    const signature = KEYS[SIGNATURE_KEY]
    this.projectLegends = PROJECT_LEGENDS.map((legend) =>
      legend.kind === 'relpa' ? legends.logo(relpaLogo) : legends.project(legend, signature),
    )

    const bodyGeometry = createKeyGeometry()
    const legendGeometry = new THREE.PlaneGeometry(LEGEND_SIZE, LEGEND_SIZE)
    this.keys = KEYS.map((definition, index) => {
      const stackLegend = index === SIGNATURE_KEY ? legends.signature(definition) : legends.skill(definition)
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: linearColor(KEY_BODY_COLORS[definition.color]),
        roughness: definition.color === 'indigo' ? 0.36 : 0.52,
        metalness: 0,
        envMapIntensity: 0.95,
        emissive: linearColor('#3a4bff'),
        emissiveIntensity: 0,
      })
      const legendMaterial = new THREE.MeshStandardMaterial({
        map: stackLegend,
        transparent: true,
        roughness: 0.3,
        metalness: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        envMapIntensity: 0.6,
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.userData.key = index
      const legend = new THREE.Mesh(legendGeometry, legendMaterial)
      legend.position.z = LEGEND_OFFSET
      const group = new THREE.Group()
      group.add(body, legend)
      this.world.add(group)

      return {
        group,
        body,
        bodyMaterial,
        legendMaterial,
        stackLegend,
        messageLegend: legends.letter(definition),
        currentLegend: stackLegend,
        pendingLegend: null,
        pendingSince: 0,
        hover: 0,
        lift: 0,
        pressedAt: -9,
        flashedAt: -9,
      }
    })
  }

  resize(): { width: number; height: number } {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    return { width, height }
  }

  /** Signature key entrance: spins in and overshoots its size. */
  playIntro(): void {
    if (prefersReducedMotion) return
    gsap.to(this.intro, { scale: 1, duration: 1.6, ease: 'back.out(1.8)', delay: 0.45 })
    gsap.to(this.intro, { spin: 1, duration: 2.2, ease: 'power3.out', delay: 0.45 })
  }

  pressKey(key: number, withFlash = false): void {
    const now = performance.now() / 1000
    this.keys[key].pressedAt = now
    if (withFlash) this.keys[key].flashedAt = now
  }

  /** Key under a viewport position, or -1. */
  pick(ndcX: number, ndcY: number): number {
    this.tmpNdc.set(ndcX, ndcY)
    this.raycaster.setFromCamera(this.tmpNdc, this.camera)
    const targets = this.keys.filter((key) => key.group.scale.x > 0.08).map((key) => key.body)
    const hit = this.raycaster.intersectObjects(targets, false)[0]
    return hit ? (hit.object.userData.key as number) : -1
  }

  update(frame: SceneFrame): void {
    this.keys.forEach((key, index) => this.updateKey(key, index, frame))
    this.updateFlash(frame.time)

    if (!prefersReducedMotion) {
      this.world.rotation.x += (-pointer.ndcY * 0.08 - this.world.rotation.x) * 0.05
      this.world.rotation.y += (pointer.ndcX * 0.12 - this.world.rotation.y) * 0.05
      this.dust.position.y = frame.scrollY * 0.0016
      this.dust.rotation.y = frame.time * 0.012
    }

    const canHover = pointer.hasMoved && hasFinePointer && !document.hidden && !pointer.overUi
    this.hoveredKey = canHover ? this.pick(pointer.ndcX, pointer.ndcY) : -1

    this.renderer.render(this.scene, this.camera)
  }

  /** Target pose for a key and the section that decides its legend. */
  private resolvePose(index: number, { state, time }: SceneFrame): { pose: Pose; section: SectionIndex } {
    if (state.kind === 'hold') {
      const context = { slot: this.timeline.slot(state.section), progress: state.progress, time }
      return { pose: LAYOUTS[state.section](index, context), section: state.section }
    }

    const from = LAYOUTS[state.from](index, { slot: this.timeline.slot(state.from), progress: 1, time })
    const to = LAYOUTS[state.to](index, { slot: this.timeline.slot(state.to), progress: 0, time })
    const delay = index === SIGNATURE_KEY ? 0 : (index / (KEYS.length - 1)) * TRANSITION_STAGGER
    const linear = clamp((state.progress - delay) / (1 - TRANSITION_STAGGER))
    const eased = prefersReducedMotion ? Math.round(linear) : easeInOutCubic(linear)

    const pose = from.map((value, axis) => lerp(value, to[axis], eased)) as Pose
    if (!prefersReducedMotion) {
      const arc = Math.sin(Math.PI * eased)
      pose[2] += arc * 1.6 * (index === SIGNATURE_KEY ? 0.6 : 1)
      pose[5] += arc * 0.5 * (index % 2 ? 1 : -1)
    }
    return { pose, section: eased > 0.5 ? state.to : state.from }
  }

  private updateKey(key: Key, index: number, frame: SceneFrame): void {
    const { dt, time, focusedKey, activeCategory, state } = frame
    const { pose, section } = this.resolvePose(index, frame)
    const [x] = pose
    let [, y, z, rotX, rotY, rotZ, scale] = pose

    if (index === SIGNATURE_KEY) {
      scale *= this.intro.scale
      rotY += (1 - this.intro.spin) * Math.PI * -3
    }
    if (!prefersReducedMotion) {
      y += Math.sin(time * 0.9 + index * 1.3) * 0.045 * Math.min(1, scale * 1.5)
      rotX += Math.sin(time * 0.7 + index) * 0.035
      rotZ += Math.cos(time * 0.6 + index * 0.7) * 0.025
    }

    // In the stack section the keys of the active category rise and the rest sink.
    const inStack = isHolding(state, SECTION.stack) && !prefersReducedMotion
    const liftTarget = inStack ? (KEYS[index].category === activeCategory ? 1 : -0.45) : 0
    key.lift += (liftTarget - key.lift) * Math.min(1, dt * 7)
    z += key.lift * 0.3 * scale
    rotX += key.lift * 0.07
    scale *= 1 + key.lift * 0.05

    const isRaised = this.hoveredKey === index || focusedKey === index
    key.hover += ((isRaised ? 1 : 0) - key.hover) * Math.min(1, dt * 10)
    z += (key.hover * 0.35 - this.pressDepth(key, time) * 0.28) * scale
    scale *= 1 + key.hover * 0.05

    key.bodyMaterial.emissiveIntensity = Math.exp(-Math.max(0, time - key.flashedAt) * 5) * 0.6
    key.group.position.set(x, y, z)
    key.group.rotation.set(rotX, rotY, rotZ)
    key.group.scale.setScalar(Math.max(1e-4, scale))
    key.group.visible = scale > 0.003

    if (index === SIGNATURE_KEY) {
      const showsRelpa = section === SECTION.projects && PROJECT_LEGENDS[frame.activeProject].kind === 'relpa'
      key.bodyMaterial.color.lerp(showsRelpa ? this.relpaColor : this.signatureColor, Math.min(1, dt * 9))
    }
    this.updateLegend(key, this.legendFor(key, index, section, frame.activeProject), scale, time)
  }

  private pressDepth(key: Key, time: number): number {
    const elapsed = (time - key.pressedAt) * 1000
    if (elapsed < 0 || elapsed > PRESS_DURATION_MS) return 0
    return elapsed < PRESS_DOWN_MS
      ? elapsed / PRESS_DOWN_MS
      : 1 - smoothstep(PRESS_DOWN_MS, PRESS_DURATION_MS, elapsed)
  }

  private legendFor(key: Key, index: number, section: SectionIndex, activeProject: number): THREE.Texture {
    if (section <= SECTION.stack) return key.stackLegend
    if (index === SIGNATURE_KEY && section === SECTION.projects) return this.projectLegends[activeProject]
    return key.messageLegend
  }

  /** Swaps a legend only when nobody can see it happen: the key is facing away or tiny. */
  private updateLegend(key: Key, wanted: THREE.Texture, scale: number, time: number): void {
    if (wanted === key.currentLegend) return
    if (key.pendingLegend !== wanted) {
      key.pendingLegend = wanted
      key.pendingSince = time
    }
    key.group.getWorldQuaternion(this.tmpQuaternion)
    this.tmpVector.set(0, 0, 1).applyQuaternion(this.tmpQuaternion)
    const timedOut = time - key.pendingSince > LEGEND_SWAP_TIMEOUT
    if (this.tmpVector.z < 0.12 || scale < 0.06 || timedOut) {
      key.legendMaterial.map = wanted
      key.currentLegend = wanted
      if (timedOut && !prefersReducedMotion) key.flashedAt = time
    }
  }

  private updateFlash(time: number): void {
    const latest = this.keys.reduce((newest, key) => (key.flashedAt > newest.flashedAt ? key : newest))
    this.flash.position.copy(latest.group.position).add(this.tmpVector.set(0, 0.4, 1.4))
    this.flash.intensity = 5 * Math.exp(-Math.max(0, time - latest.flashedAt) * 4)
  }
}
