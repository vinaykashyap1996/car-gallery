'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { GalleryCar } from '../page'

/**
 * The 1975 pair: road car and race car side by side. As the page scrolls the photographs travel
 * slower than the page and the red note travels faster, so the hero has depth.
 */
export default function HeroPicture({ cars }: { cars: GalleryCar[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const noteY = useTransform(scrollYProgress, [0, 1], [40, -60])

  return (
    <div className="hero__picture" ref={ref}>
      <div className="hero__pair" data-open>
        {cars.map((car) =>
          car.image ? (
            <figure key={car.id} className="hero__frame">
              <motion.div className="hero__drift" style={{ y: photoY }}>
                <Image
                  src={car.image.url}
                  alt={car.image.alt}
                  fill
                  priority
                  sizes="(max-width: 899px) 50vw, 30vw"
                />
              </motion.div>
              <figcaption>
                {car.title}, {car.year}
              </figcaption>
            </figure>
          ) : null,
        )}
      </div>
      <motion.div className="hero__note-wrap" style={{ y: noteY }}>
        <div className="hero__note">
          <p className="hero__figure">1975</p>
          <p>The 308 GTB and the 312T: both three litres, both named for it.</p>
        </div>
      </motion.div>
    </div>
  )
}
