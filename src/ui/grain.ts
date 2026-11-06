import { $ } from '../lib/dom'

const TILE_SIZE = 160

/** Generates the film-grain tile once and hands it to the stylesheet. */
export function initGrain(): void {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = TILE_SIZE
  const context = canvas.getContext('2d')
  if (!context) return

  const image = context.createImageData(TILE_SIZE, TILE_SIZE)
  for (let index = 0; index < image.data.length; index += 4) {
    const value = Math.random() * 255
    image.data[index] = image.data[index + 1] = image.data[index + 2] = value
    image.data[index + 3] = 255
  }
  context.putImageData(image, 0, 0)
  $('.grain').style.setProperty('--noise', `url(${canvas.toDataURL('image/webp', 0.6)})`)
}
