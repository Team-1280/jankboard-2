import { cubicOut } from 'svelte/easing'
import type { EasingFunction } from 'svelte/transition'

export function expand(
  node: Element,
  params: { delay: number; duration: number; easing: EasingFunction }
) {
  const { delay = 0, duration = 400, easing = cubicOut } = params

  const w = parseFloat(getComputedStyle(node).strokeWidth)

  return {
    delay,
    duration,
    easing,
    css: (t: number) => `opacity: ${t}; stroke-width: ${t * w}`,
  }
}
