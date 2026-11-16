'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { transitions } from './motion'

type GridCar = { id: string; code: string; title: string; year: number | null }

const smooth = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

/**
 * The finish line: a chequered flag, the whole grid as links, a way back to the start,
 * then the name across the full width.
 */
export default function Footer({ road, race }: { road: GridCar[]; race: GridCar[] }) {
  const backToStart = (e: React.MouseEvent) => {
    e.preventDefault()
    // Replay the start lights once the page is back at the top
    let fired = false
    const replay = () => {
      if (fired) return
      fired = true
      window.removeEventListener('scrollend', onEnd)
      window.dispatchEvent(new Event('lights:replay'))
    }
    const onEnd = () => {
      if (window.scrollY < 4) replay()
    }
    window.addEventListener('scrollend', onEnd)
    window.setTimeout(replay, 2500) // browsers without scrollend
    window.scrollTo({ top: 0, behavior: smooth() })
  }

  const goToRace = (e: React.MouseEvent, i: number) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('race:goto', { detail: i }))
  }

  return (
    <footer className="footer" aria-labelledby="footer-title">
      <svg className="footer__flag" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="chequer" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="#ffffff" />
            <rect width="16" height="16" fill="#0b0b0c" />
            <rect x="16" y="16" width="16" height="16" fill="#0b0b0c" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chequer)" />
      </svg>

      <div className="footer__finish">
        <div className="footer__call">
          <h2 className="head" id="footer-title">
            The full grid
          </h2>
          <p className="lead">
            {road.length + race.length} cars from Maranello. Jump to any of them, or line up
            for another start.
          </p>
          <motion.a
            className="button button--light"
            href="#top"
            onClick={backToStart}
            whileTap={{ scale: 0.97 }}
            transition={transitions.spring}
          >
            Back to the start
          </motion.a>
        </div>

        <nav className="footer__grid" aria-label="Every car">
          <div>
            <p className="footer__label">Road cars</p>
            <ul>
              {road.map((car) => (
                <li key={car.id}>
                  <a href={`#car-${car.id}`} title={`${car.title}, ${car.year}`}>
                    {car.code}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer__label">Formula 1</p>
            <ul>
              {race.map((car, i) => (
                <li key={car.id}>
                  <a href="#race" onClick={(e) => goToRace(e, i)} title={`${car.title}, ${car.year}`}>
                    {car.code}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="footer__info">
        <div>
          <p className="footer__label">Maranello</p>
          <p>Via Abetone Inferiore 4</p>
          <p>41053 Maranello, Modena, Italy</p>
        </div>
        <div>
          <p className="footer__label">Edit the gallery</p>
          <p>
            Every car here is a record in Payload.{' '}
            <Link className="link" href="/admin/collections/cars/create">Add a car</Link> or{' '}
            <Link className="link" href="/admin/collections/cars">change one</Link>.
          </p>
        </div>
        <div>
          <p className="footer__label">About</p>
          <p>
            A fan project, not affiliated with or endorsed by Ferrari S.p.A.{' '}
            <a className="link" href="/credits">Photo credits</a>.
          </p>
        </div>
      </div>

      <div className="footer__end">
        <p className="footer__wordmark" aria-hidden="true">
          <span>Maranello</span> <span>Annual</span>
        </p>
        <div className="footer__legal">
          <Image src="/ferrari-shield.png" alt="Ferrari shield" width={80} height={106} />
          <p className="small">
            Ferrari, the prancing horse shield and the names of its cars are trademarks of Ferrari
            S.p.A. Photographs are used under Creative Commons licences.
          </p>
        </div>
      </div>
    </footer>
  )
}
