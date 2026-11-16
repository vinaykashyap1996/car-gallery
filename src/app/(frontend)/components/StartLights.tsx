'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const LIGHTS = 5
const STEP = 160 // ms between lights
const HOLD = 260 // ms all five stay on before lights out

/**
 * The Formula 1 start gantry: five red lights come on one by one, then all go out.
 * Plays once on load (unless reduced motion is set); tap it to run the start again.
 */
export default function StartLights() {
  const [lit, setLit] = useState(0)
  const timers = useRef<number[]>([])

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const run = useCallback(() => {
    clear()
    setLit(0)
    for (let i = 1; i <= LIGHTS; i++) {
      timers.current.push(window.setTimeout(() => setLit(i), 120 + i * STEP))
    }
    timers.current.push(window.setTimeout(() => setLit(0), 120 + LIGHTS * STEP + HOLD))
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) run()
    // "Back to the start" in the footer replays the sequence
    window.addEventListener('lights:replay', run)
    return () => {
      window.removeEventListener('lights:replay', run)
      clear()
    }
  }, [run])

  return (
    <div className="lights">
      <button type="button" className="lights__gantry" onClick={run} aria-label="Run the start lights again">
        {Array.from({ length: LIGHTS }, (_, i) => (
          <span key={i} className="lights__panel" aria-hidden="true">
            {[0, 1].map((lamp) => (
              <motion.span
                key={lamp}
                className="lights__lamp"
                initial={false}
                animate={
                  i < lit
                    ? { backgroundColor: '#ff1a1a', scale: [1.22, 1] }
                    : { backgroundColor: '#2a0606', scale: 1 }
                }
                transition={{ duration: i < lit ? 0.22 : 0.06, ease: 'easeOut' }}
              />
            ))}
          </span>
        ))}
      </button>
      <p className="small lights__note">Five reds, then lights out. Tap to start again.</p>
    </div>
  )
}
