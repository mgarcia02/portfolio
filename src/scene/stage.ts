import * as THREE from 'three'
import { isCompactViewport } from '../config/env'

export const linearColor = (hex: string): THREE.Color => new THREE.Color(hex).convertSRGBToLinear()

/** Image-based lighting generated in code: a lavender room lit by a few softboxes. */
function createEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const room = new THREE.Scene()
  room.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(30, 30, 30),
      new THREE.MeshBasicMaterial({ color: linearColor('#c9cbdc'), side: THREE.BackSide }),
    ),
  )

  const addSoftbox = (
    hex: string,
    power: number,
    position: [number, number, number],
    width: number,
    height: number,
  ) => {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ color: linearColor(hex).multiplyScalar(power), side: THREE.DoubleSide }),
    )
    panel.position.set(...position)
    panel.lookAt(0, 0, 0)
    room.add(panel)
  }
  addSoftbox('#ffffff', 4, [-6, 7, 6], 9, 5)
  addSoftbox('#aab3ff', 3, [9, 1, -5], 3, 12)
  addSoftbox('#ffffff', 1.4, [0, -7, 7], 14, 2)
  addSoftbox('#f0f1fa', 2, [7, 4, 8], 4, 4)

  const generator = new THREE.PMREMGenerator(renderer)
  const texture = generator.fromScene(room, 0.04).texture
  generator.dispose()
  return texture
}

/** Adds lights and environment to the scene; returns the light used for key-press flashes. */
export function lightScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer): THREE.PointLight {
  scene.environment = createEnvironment(renderer)

  const key = new THREE.DirectionalLight(linearColor('#f6f6ff'), 1.5)
  key.position.set(-4, 7, 9)
  const rim = new THREE.DirectionalLight(linearColor('#9aa4ff'), 2.4)
  rim.position.set(7, 3, -7)
  const flash = new THREE.PointLight(linearColor('#cfe6ff'), 0, 7, 2)

  scene.add(key, rim, flash, new THREE.HemisphereLight(linearColor('#ffffff'), linearColor('#2b2e3a'), 0.35))
  return flash
}

/** Tapered keycap: an extruded rounded square, narrower at the top than at the base. */
export function createKeyGeometry(): THREE.BufferGeometry {
  const half = 0.42
  const radius = 0.17
  const shape = new THREE.Shape()
  shape.moveTo(-half + radius, -half)
  shape.lineTo(half - radius, -half)
  shape.quadraticCurveTo(half, -half, half, -half + radius)
  shape.lineTo(half, half - radius)
  shape.quadraticCurveTo(half, half, half - radius, half)
  shape.lineTo(-half + radius, half)
  shape.quadraticCurveTo(-half, half, -half, half - radius)
  shape.lineTo(-half, -half + radius)
  shape.quadraticCurveTo(-half, -half, -half + radius, -half)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelSegments: 6,
    curveSegments: 12,
  })
  geometry.translate(0, 0, -0.21)

  const taper = 0.17
  const minZ = -0.31
  const height = 0.62
  const positions = geometry.attributes.position
  for (let index = 0; index < positions.count; index++) {
    const scale = 1 - taper * Math.min(1, Math.max(0, (positions.getZ(index) - minZ) / height))
    positions.setX(index, positions.getX(index) * scale)
    positions.setY(index, positions.getY(index) * scale)
  }
  positions.needsUpdate = true
  geometry.computeBoundingSphere()
  return geometry
}

/** Dust motes spread over a tall column, so scrolling can drift them upward for parallax. */
export function createDust(): THREE.Points {
  const count = isCompactViewport() ? 380 : 700
  const positions = new Float32Array(count * 3)
  for (let index = 0; index < count; index++) {
    positions[index * 3] = (Math.random() - 0.5) * 18
    positions[index * 3 + 1] = -8 + Math.random() * 48
    positions[index * 3 + 2] = -6 + Math.random() * 8
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = 32
  const context = sprite.getContext('2d')
  if (context) {
    context.fillStyle = '#fff'
    context.beginPath()
    context.arc(16, 16, 14, 0, Math.PI * 2)
    context.fill()
  }

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: linearColor('#2b2e3a'),
      size: 0.035,
      map: new THREE.CanvasTexture(sprite),
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    }),
  )
}
