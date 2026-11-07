import { CanvasTexture, sRGBEncoding, type Texture } from 'three'
import type { KeyDefinition } from '../content/keys'
import type { ProjectLegend } from '../content/projects'
import { KEY_LEGEND_COLORS } from './constants'

const SIZE = 512
const FONT_FAMILY = '"DM Sans Variable", system-ui, sans-serif'
const TRACKING = -0.02

type Draw = (context: CanvasRenderingContext2D) => void

function setFont(context: CanvasRenderingContext2D, weight: number, size: number): void {
  context.font = `${weight} ${size}px ${FONT_FAMILY}`
  if ('letterSpacing' in context) context.letterSpacing = `${TRACKING * size}px`
}

/** Shrinks the font until `text` fits in `maxWidth`. */
function fitFont(
  context: CanvasRenderingContext2D,
  text: string,
  weight: number,
  size: number,
  maxWidth: number,
): void {
  let current = size
  setFont(context, weight, current)
  while (context.measureText(text).width > maxWidth && current > 24) {
    current -= 4
    setFont(context, weight, current)
  }
}

/** Draws key legends onto canvases and uploads them as textures. */
export class LegendFactory {
  private readonly anisotropy: number

  constructor(anisotropy: number) {
    this.anisotropy = anisotropy
  }

  private texture(draw: Draw): Texture {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = SIZE
    const context = canvas.getContext('2d')
    if (!context) throw new Error('2D canvas is not available')
    draw(context)
    const texture = new CanvasTexture(canvas)
    texture.encoding = sRGBEncoding
    texture.anisotropy = this.anisotropy
    return texture
  }

  /** Name top-left and category bottom-right, like the legends of a real keycap. */
  skill(key: KeyDefinition): Texture {
    return this.texture((context) => {
      context.fillStyle = KEY_LEGEND_COLORS[key.color]
      context.textAlign = 'left'
      context.textBaseline = 'top'
      fitFont(context, key.label, 500, 100, 410)
      context.fillText(key.label, 52, 56)

      context.globalAlpha = 0.55
      setFont(context, 500, 40)
      context.textBaseline = 'alphabetic'
      context.fillText('+', 52, 458)
      context.textAlign = 'right'
      context.fillText(key.category ?? '', 460, 458)
    })
  }

  signature(key: KeyDefinition): Texture {
    return this.texture((context) => {
      context.fillStyle = KEY_LEGEND_COLORS[key.color]
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      setFont(context, 500, 210)
      context.fillText(key.label, 256, 250)

      context.globalAlpha = 0.6
      setFont(context, 500, 34)
      context.textBaseline = 'alphabetic'
      context.textAlign = 'right'
      context.fillText('Full Stack', 460, 458)
      context.textAlign = 'left'
      context.fillText('fn', 52, 88)
    })
  }

  letter(key: KeyDefinition): Texture {
    const isPunctuation = key.letter === ',' || key.letter === '!'
    return this.texture((context) => {
      context.fillStyle = KEY_LEGEND_COLORS[key.color]
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      setFont(context, 500, isPunctuation ? 330 : 300)
      context.fillText(key.letter, 256, key.letter === ',' ? 210 : 266)
    })
  }

  project(legend: Extract<ProjectLegend, { kind: 'text' }>, key: KeyDefinition): Texture {
    return this.texture((context) => {
      context.fillStyle = KEY_LEGEND_COLORS[key.color]
      context.textBaseline = 'top'
      context.textAlign = 'left'
      context.globalAlpha = 0.7
      setFont(context, 500, 38)
      context.fillText(legend.number, 52, 52)

      context.globalAlpha = 1
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      fitFont(context, legend.code, 500, 200, 380)
      context.fillText(legend.code, 256, 262)

      context.globalAlpha = 0.7
      context.textAlign = 'left'
      context.textBaseline = 'alphabetic'
      fitFont(context, legend.stack, 500, 36, 400)
      context.fillText(legend.stack, 52, 462)
    })
  }

  /** Centred logo with nothing around it, keeping half its width clear on every side. */
  logo(image: HTMLImageElement): Texture {
    return this.texture((context) => {
      if (!image.naturalWidth) return
      const width = SIZE / 2
      const height = (width * image.naturalHeight) / image.naturalWidth
      context.drawImage(image, (SIZE - width) / 2, (SIZE - height) / 2, width, height)
    })
  }
}
