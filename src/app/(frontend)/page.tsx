import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Car, Media } from '@/payload-types'
import RoadWall from './components/RoadWall'
import RaceIndex from './components/RaceIndex'
import Reveal from './components/Reveal'
import StartLights from './components/StartLights'
import HeroPicture from './components/HeroPicture'
import Footer from './components/Footer'
import { champions } from './champions'

export const dynamic = 'force-dynamic'

export type GalleryCar = {
  id: string
  title: string
  code: string
  nameMeaning: string | null
  year: number | null
  engine: string | null
  power: string | null
  drivers: string | null
  summary: string | null
  image: { url: string; alt: string } | null
}

const toGalleryCar = (car: Car): GalleryCar => {
  const media = car.image && typeof car.image === 'object' ? (car.image as Media) : null
  return {
    id: car.id,
    title: car.title,
    code: car.code || car.title,
    nameMeaning: car.nameMeaning ?? null,
    year: car.year ?? null,
    engine: car.engine ?? null,
    power: car.power ?? null,
    drivers: car.drivers ?? null,
    summary: car.summary ?? null,
    image: media?.url ? { url: media.url, alt: media.alt } : null,
  }
}

const numberWords = [
  'No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
  'Nineteen', 'Twenty',
]
const inWords = (n: number) => numberWords[n] ?? String(n)

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: cars }, { docs: photos }] = await Promise.all([
    payload.find({
      collection: 'cars',
      where: { category: { in: ['road', 'f1'] } },
      sort: 'year',
      limit: 200,
      depth: 1,
    }),
    payload.find({
      collection: 'media',
      where: { credit: { exists: true } },
      sort: 'filename',
      limit: 200,
      depth: 0,
    }),
  ])

  const road = cars.filter((c) => c.category === 'road').map(toGalleryCar)
  const race = cars.filter((c) => c.category === 'f1').map(toGalleryCar)

  const photoByFile = (name: string) => photos.find((p) => p.filename === name)
  const gate = photoByFile('maranello.jpg')
  const tifosi = photoByFile('tifosi.jpg')
  const fiorano = photoByFile('fiorano.jpg')

  // The hero pairs the 1975 road car with the 1975 race car: both three litres, both named for it.
  const heroRoad = road.find((c) => c.code === '308') ?? road[0]
  const heroRace = race.find((c) => c.code === '312T') ?? race[0]

  const first = road[0]?.year ?? 1947

  return (
    <>
      <Reveal />
      <header className="hero" id="top">
        <div className="hero__side">
          <a className="wordmark" href="#top">
            <Image className="wordmark__shield" src="/ferrari-shield.png" alt="" width={80} height={106} priority />
            <span>Maranello Annual</span>
          </a>
          <div className="hero__talk">
            <p className="lead" data-load style={{ '--d': '420ms' } as React.CSSProperties}>
              An unofficial gallery of {road.length} Ferrari road cars and {race.length} Scuderia
              Formula&nbsp;1 cars, from {first} to today.
            </p>
            <a className="button" href="#road" data-load style={{ '--d': '480ms' } as React.CSSProperties}>
              See the road cars
            </a>
          </div>
          <StartLights />
        </div>
        <div className="hero__main">
          <nav className="nav" aria-label="Sections">
            <a className="link" href="#road">Road cars</a>
            <a className="link" href="#race">Formula 1</a>
            <a className="link" href="#titles">Titles</a>
            <Link className="link" href="/admin/collections/cars">Admin</Link>
          </nav>
          <h1 className="display lines">
            <span className="line">
              <span data-line style={{ '--i': 0 } as React.CSSProperties}>Ferrari,</span>
            </span>
            <span className="line">
              <span data-line style={{ '--i': 1 } as React.CSSProperties}>road &amp; race</span>
            </span>
          </h1>
        </div>
        <HeroPicture cars={[heroRoad, heroRace].filter((c): c is GalleryCar => Boolean(c))} />
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro__text">
            <h2 className="head" id="intro-title" data-reveal>
              Racing came first
            </h2>
            <p className="statement" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
              Enzo Ferrari sold his first road car in 1947 to pay for his racing team. Every car on
              this page came out of that bargain.
            </p>
            <div className="intro__body" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
              <p>
                The road cars are mostly named for their engines. A 308 is three litres and eight
                cylinders; an 812 is 800 horsepower and twelve. The race cars kept the same rule for
                decades, a 156 is 1.5 litres and six, then switched to the season: F2004, F2007.
              </p>
              <p>
                Both are built in Maranello, behind the gate on Via Abetone Inferiore, and both are
                shaken down at Fiorano, the private test track Ferrari opened next to the factory in
                1972.
              </p>
            </div>
          </div>
          {gate?.url ? (
            <figure className="intro__photo">
              <div className="shutter" data-reveal-photo>
                <Image src={gate.url} alt={gate.alt} fill sizes="(max-width: 899px) 62vw, 22vw" />
              </div>
              <figcaption className="small">
                The factory gate, Via Abetone Inferiore 4, Maranello. The road cars leave from here,
                and the Formula 1 cars are built in the same town.
              </figcaption>
            </figure>
          ) : null}
        </section>

        <section className="road" id="road" aria-labelledby="road-title">
          <div className="road__head">
            <h2 className="head" id="road-title" data-reveal>
              {inWords(road.length)} road cars
            </h2>
            <p className="lead" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
              Tap a number to read it. Most Ferrari names are the engine, written down.
            </p>
          </div>
          <RoadWall cars={road} />
        </section>

        <RaceIndex cars={race} title={`${inWords(race.length)} cars`} />

        <section className="titles" id="titles" aria-labelledby="titles-title">
          <h2 className="head titles__head" id="titles-title" data-reveal>
            Fifteen titles
            <br /> in red
          </h2>
          <div className="titles__body">
            <div className="titles__photos">
              {fiorano?.url ? (
                <figure className="titles__photo titles__photo--wide">
                  <div className="shutter" data-reveal-photo>
                    <Image src={fiorano.url} alt={fiorano.alt} fill sizes="(max-width: 899px) 100vw, 30vw" />
                  </div>
                  <figcaption className="small">
                    Pista di Fiorano, opened in 1972, where Ferrari tests its road and race cars.
                  </figcaption>
                </figure>
              ) : null}
              {tifosi?.url ? (
                <figure className="titles__photo">
                  <div className="shutter" data-reveal-photo>
                    <Image src={tifosi.url} alt={tifosi.alt} fill sizes="(max-width: 899px) 60vw, 26vw" />
                  </div>
                  <figcaption className="small">The tifosi under the podium at Monza, 2011.</figcaption>
                </figure>
              ) : null}
            </div>
            <div className="titles__table">
              <p className="lead" data-reveal>
                Fifteen drivers’ championships won in a Ferrari, and sixteen constructors’ titles, the last in 2008.
              </p>
              <table>
                <caption className="sr-only">Formula 1 drivers’ champions with Ferrari</caption>
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Driver</th>
                    <th scope="col">Car</th>
                  </tr>
                </thead>
                {champions.map((era) => (
                  <tbody key={era.era} data-reveal>
                    {era.rows.map((row) => (
                      <tr key={row.year}>
                        <td>{row.year}</td>
                        <td>{row.driver}</td>
                        <td>{row.car}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer
        road={road.map(({ id, code, title, year }) => ({ id, code, title, year }))}
        race={race.map(({ id, code, title, year }) => ({ id, code, title, year }))}
      />
    </>
  )
}
