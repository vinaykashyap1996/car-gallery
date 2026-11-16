'use client'

import React from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'

/** Shared transition presets, tuned to the page's CSS easing tokens. */
export const transitions = {
  /** Tiles turning over, the timing bar moving between rows. */
  spring: { type: 'spring', stiffness: 420, damping: 34, mass: 0.9 },
  /** Picture wipes: the same quart in-out curve as --ease-in-out. */
  wipe: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  /** Text swapping in the race panel. */
  swap: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
} as const

/** Turns transform animations off for visitors who ask for reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

/** A red bar across the top that fills as you scroll: how far round the lap you are. */
export function LapProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div className="lap" style={{ scaleX }} aria-hidden="true" />
}
