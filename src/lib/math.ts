export const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value))

export const lerp = (from: number, to: number, t: number): number => from + (to - from) * t

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}
