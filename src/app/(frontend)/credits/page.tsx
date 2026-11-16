import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Photo credits — Maranello Annual',
  description: 'Photographers and licences for every picture in the Maranello Annual gallery.',
}

export default async function CreditsPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: photos } = await payload.find({
    collection: 'media',
    where: { credit: { exists: true } },
    sort: 'filename',
    limit: 200,
    depth: 0,
  })

  return (
    <main className="credits">
      <a className="wordmark" href="/">
        <Image className="wordmark__shield" src="/ferrari-shield.png" alt="" width={80} height={106} priority />
        <span>Maranello Annual</span>
      </a>
      <h1 className="head credits__title">Photo credits</h1>
      <p className="lead credits__lead">
        Every photograph in the gallery comes from Wikimedia Commons or Openverse, under the
        Creative Commons licence named beside it. Each title links to the original.
      </p>
      <ul className="credits__list">
        {photos.map((p) => (
          <li key={p.id}>
            {p.sourceUrl ? (
              <a className="link" href={p.sourceUrl}>
                {p.alt}
              </a>
            ) : (
              p.alt
            )}
            <span className="credits__who">{p.credit}</span>
          </li>
        ))}
      </ul>
      <p className="small credits__back">
        <a className="link" href="/">Back to the gallery</a>
      </p>
    </main>
  )
}
