'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryCar } from '../page'
import { transitions } from './motion'

const fields = ['rosso', 'ink', 'giallo', 'grey'] as const

/**
 * A chequered wall: each road car is a number tile beside its photograph.
 * Tapping the number turns it over to show what the name means.
 */
export default function RoadWall({ cars }: { cars: GalleryCar[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <ol className="wall">
      {cars.map((car, k) => {
        const isOpen = open.has(car.id)
        // Desktop: two pairs per row, flipped on odd rows. Phone: one pair per row, flipped on odd rows.
        const flips = [Math.floor(k / 2) % 2 === 1 ? 'flip-d' : '', k % 2 === 1 ? 'flip-m' : '']
        return (
          <li
            key={car.id}
            id={`car-${car.id}`}
            className={`pair ${flips.join(' ')}`}
            data-reveal
            style={{ '--i': k % 2 } as React.CSSProperties}
          >
            <motion.button
              type="button"
              className={`tile tile--${fields[k % fields.length]}`}
              aria-pressed={isOpen}
              aria-label={`${car.title}, ${car.year}. ${isOpen ? 'Hide' : 'Show'} what the name means`}
              onClick={() => toggle(car.id)}
              whileTap={{ scale: 0.97 }}
              transition={transitions.spring}
            >
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.span
                    key="back"
                    className="tile__back"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={transitions.spring}
                  >
                    <span className="tile__meaning">{car.nameMeaning ?? car.title}</span>
                    <span className="tile__spec">
                      {[car.engine, car.power].filter(Boolean).join(' · ')}
                    </span>
                    {car.summary ? <span className="tile__summary">{car.summary}</span> : null}
                  </motion.span>
                ) : (
                  <motion.span
                    key="face"
                    className="tile__face"
                    initial={{ y: '-100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={transitions.spring}
                  >
                    <span className="tile__code">{car.code}</span>
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="tile__caption">
                {car.title} · {car.year}
              </span>
            </motion.button>
            <figure className="tile tile--photo">
              {car.image ? (
                <Image src={car.image.url} alt={car.image.alt} fill sizes="(max-width: 899px) 50vw, 25vw" />
              ) : null}
            </figure>
          </li>
        )
      })}
    </ol>
  )
}
