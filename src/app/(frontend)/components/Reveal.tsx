'use client'

import { useEffect } from 'react'

/**
 * Adds `is-in` to [data-reveal] and [data-reveal-photo] elements once, as they enter the screen.
 * Photos start fully clipped, which Chrome's IntersectionObserver counts as invisible, so for those
 * we watch the unclipped parent and mark the photo itself.
 */
export default function Reveal() {
  useEffect(() => {
    const pairs = new Map<Element, Element>()
    document.querySelectorAll('[data-reveal]').forEach((el) => pairs.set(el, el))
    document.querySelectorAll('[data-reveal-photo]').forEach((el) => {
      pairs.set(el.parentElement ?? el, el)
    })

    if (!('IntersectionObserver' in window)) {
      pairs.forEach((target) => target.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            pairs.get(e.target)?.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 },
    )
    pairs.forEach((_target, watched) => io.observe(watched))
    return () => io.disconnect()
  }, [])
  return null
}
