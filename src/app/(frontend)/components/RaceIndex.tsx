'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { transitions } from './motion'
import type { GalleryCar } from '../page'

/**
 * Formula 1 cars on a pinned stage: one screen of scroll per car. The photograph wipes in from
 * the bottom while the index below the heading moves to the current car. On phones and without
 * script the cars simply stack.
 */
export default function RaceIndex({ cars, title }: { cars: GalleryCar[]; title: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stackRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const step = window.innerHeight
      const i = Math.floor((-rect.top + step * 0.35) / step)
      setActive(Math.max(0, Math.min(cars.length - 1, i)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [cars.length])

  const goTo = useCallback((i: number) => {
    const section = sectionRef.current
    if (!section) return
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    // Phones (and pages without the pinned stage) stack the cars: scroll to the card itself.
    if (window.matchMedia('(max-width: 899px)').matches) {
      stackRefs.current[i]?.scrollIntoView({ behavior, block: 'start' })
      return
    }
    const top = section.getBoundingClientRect().top + window.scrollY + i * window.innerHeight
    window.scrollTo({ top, behavior })
  }, [])

  // The footer's grid links ask for a car by its position
  useEffect(() => {
    const onGoto = (e: Event) => goTo((e as CustomEvent<number>).detail)
    window.addEventListener('race:goto', onGoto)
    return () => window.removeEventListener('race:goto', onGoto)
  }, [goTo])

  const current = cars[active]

  return (
    <section
      className="race"
      id="race"
      ref={sectionRef}
      aria-labelledby="race-title"
      style={{ '--count': cars.length } as React.CSSProperties}
    >
      <div className="race__stage">
        <div className="race__side">
          <h2 className="head" id="race-title" data-reveal>
            Formula 1,
            <br /> {title.toLowerCase()}
          </h2>

          <div className="race__now" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {current ? (
                <motion.div
                  key={current.id}
                  className="race__now-inner"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={transitions.swap}
                >
                  <p className="lead">
                    {current.title}, {current.year}
                  </p>
                  <p>{current.summary}</p>
                  <dl className="race__facts">
                    <div>
                      <dt>Drivers</dt>
                      <dd>{current.drivers}</dd>
                    </div>
                    <div>
                      <dt>Engine</dt>
                      <dd>{current.engine}</dd>
                    </div>
                  </dl>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <LayoutGroup id="timing">
            <ol className="race__index">
              {cars.map((car, i) => (
                <li key={car.id}>
                  <button
                    type="button"
                    className={i === active ? 'is-active' : undefined}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => goTo(i)}
                  >
                    {i === active ? (
                      <motion.span
                        layoutId="timing-bar"
                        className="race__bar"
                        transition={transitions.spring}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="race__name">{car.title}</span>
                    <span className="race__year">{car.year}</span>
                  </button>
                </li>
              ))}
            </ol>
          </LayoutGroup>
        </div>

        <div className="race__pictures">
          {cars.map((car, i) => {
            const shown = i === 0 || i <= active
            return (
              <motion.figure
                key={car.id}
                className="race__picture"
                aria-hidden={i !== active}
                initial={false}
                animate={{ clipPath: shown ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
                transition={transitions.wipe}
              >
                <motion.div
                  className="race__drift"
                  initial={false}
                  animate={{ scale: i === active ? 1 : 1.08 }}
                  transition={{ duration: 1.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  {car.image ? (
                    <Image src={car.image.url} alt={car.image.alt} fill sizes="(max-width: 899px) 100vw, 58vw" />
                  ) : null}
                </motion.div>
              </motion.figure>
            )
          })}
        </div>
      </div>

      {/* Stacked version for phones and for no script */}
      <ol className="race__stack">
        {cars.map((car, i) => (
          <li
            key={car.id}
            data-reveal
            ref={(el) => {
              stackRefs.current[i] = el
            }}
          >
            <figure className="race__stack-picture">
              {car.image ? (
                <Image src={car.image.url} alt={car.image.alt} fill sizes="100vw" />
              ) : null}
            </figure>
            <p className="lead">
              {car.title}, {car.year}
            </p>
            <p>{car.summary}</p>
            <p className="race__stack-facts">
              {car.drivers} · {car.engine}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
