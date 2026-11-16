/**
 * Seeds the gallery: 16 road cars, 7 Formula 1 cars and 3 photographs of Maranello and Monza.
 * Run with:  npm run seed
 * Safe to run again: cars are matched by title and updated, photographs are matched by file name.
 */
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.resolve(dirname, 'images')

type Credit = {
  file: string
  title: string
  creator: string | null
  license: string
  page: string
  via: string
}

type SeedCar = {
  title: string
  category: 'road' | 'f1'
  code: string
  nameMeaning?: string
  image: string
  year: number
  engine: string
  power?: string
  drivers?: string
  summary: string
}

const cars: SeedCar[] = [
  // Road cars
  {
    title: '125 S',
    category: 'road',
    code: '125',
    nameMeaning: '125 cc in each of 12 cylinders',
    image: '125-s',
    year: 1947,
    engine: '1.5 L V12',
    power: '118 cv',
    summary: 'The first car to carry the Ferrari name. It won the Rome Grand Prix two weeks after its debut.',
  },
  {
    title: '250 GTO',
    category: 'road',
    code: '250',
    nameMeaning: '250 cc per cylinder, 3.0 litres in all',
    image: '250-gto',
    year: 1962,
    engine: '3.0 L V12',
    power: '300 cv',
    summary: 'Built to homologate a GT racer; 36 were made. GTO stands for Gran Turismo Omologato.',
  },
  {
    title: 'Dino 246 GT',
    category: 'road',
    code: '246',
    nameMeaning: '2.4 litres, 6 cylinders',
    image: 'dino-246',
    year: 1969,
    engine: '2.4 L V6',
    power: '195 cv',
    summary: 'Named for Enzo’s son Alfredo “Dino” Ferrari, and sold without the Ferrari badge.',
  },
  {
    title: '365 GTB/4 Daytona',
    category: 'road',
    code: '365',
    nameMeaning: '365 cc per cylinder, 4 camshafts',
    image: 'daytona',
    year: 1968,
    engine: '4.4 L V12',
    power: '352 cv',
    summary: 'Nicknamed for the 1-2-3 finish at Daytona in 1967. Front engine, rear-mounted gearbox.',
  },
  {
    title: '308 GTB',
    category: 'road',
    code: '308',
    nameMeaning: '3.0 litres, 8 cylinders',
    image: '308-gtb',
    year: 1975,
    engine: '2.9 L V8',
    power: '255 cv',
    summary: 'A mid-engined V8 two-seater styled by Pininfarina. The first cars had glassfibre bodies.',
  },
  {
    title: 'Testarossa',
    category: 'road',
    code: 'TR',
    nameMeaning: '“Red head”: its cam covers are painted red',
    image: 'testarossa',
    year: 1984,
    engine: '4.9 L flat-12',
    power: '390 cv',
    summary: 'The side strakes feed the radiators mounted beside the engine.',
  },
  {
    title: 'F40',
    category: 'road',
    code: 'F40',
    nameMeaning: 'Forty years of Ferrari, 1947 to 1987',
    image: 'f40',
    year: 1987,
    engine: '2.9 L twin-turbo V8',
    power: '478 cv',
    summary: 'The last car launched while Enzo Ferrari was alive. Top speed 324 km/h.',
  },
  {
    title: 'F50',
    category: 'road',
    code: 'F50',
    nameMeaning: 'Fifty years of Ferrari, 1947 to 1997',
    image: 'f50',
    year: 1995,
    engine: '4.7 L V12',
    power: '520 cv',
    summary: 'Its V12 was derived from the 1990 Formula 1 engine and bolted straight to the chassis.',
  },
  {
    title: 'Enzo Ferrari',
    category: 'road',
    code: 'Enzo',
    nameMeaning: 'Named for the founder',
    image: 'enzo',
    year: 2002,
    engine: '6.0 L V12',
    power: '660 cv',
    summary: 'Built with lessons from the Schumacher-era Formula 1 cars, including the paddle gearbox.',
  },
  {
    title: '458 Italia',
    category: 'road',
    code: '458',
    nameMeaning: '4.5 litres, 8 cylinders',
    image: '458-italia',
    year: 2009,
    engine: '4.5 L V8',
    power: '570 cv',
    summary: 'The last naturally aspirated mid-engined Ferrari V8.',
  },
  {
    title: 'LaFerrari',
    category: 'road',
    code: 'La',
    nameMeaning: '“The Ferrari”',
    image: 'laferrari',
    year: 2013,
    engine: '6.3 L V12 hybrid',
    power: '963 cv',
    summary: 'The first hybrid Ferrari, using a Formula 1 style energy recovery system.',
  },
  {
    title: '812 Superfast',
    category: 'road',
    code: '812',
    nameMeaning: '800 cv, 12 cylinders',
    image: '812-superfast',
    year: 2017,
    engine: '6.5 L V12',
    power: '800 cv',
    summary: 'At launch, the most powerful naturally aspirated road car Ferrari had built.',
  },
  {
    title: 'SF90 Stradale',
    category: 'road',
    code: 'SF90',
    nameMeaning: '90 years of Scuderia Ferrari, 1929 to 2019',
    image: 'sf90',
    year: 2019,
    engine: '4.0 L twin-turbo V8 plug-in hybrid',
    power: '1000 cv',
    summary: 'Three electric motors, two of them driving the front wheels.',
  },
  {
    title: '296 GTB',
    category: 'road',
    code: '296',
    nameMeaning: '2.9 litres, 6 cylinders',
    image: '296-gtb',
    year: 2021,
    engine: '3.0 L twin-turbo V6 hybrid',
    power: '830 cv',
    summary: 'The first six-cylinder road car to carry the Ferrari badge.',
  },
  {
    title: 'Purosangue',
    category: 'road',
    code: 'PS',
    nameMeaning: '“Thoroughbred”',
    image: 'purosangue',
    year: 2022,
    engine: '6.5 L V12',
    power: '725 cv',
    summary: 'Four doors, four seats, and the V12 in front. The rear doors open backwards.',
  },
  {
    title: '12Cilindri',
    category: 'road',
    code: '12',
    nameMeaning: 'Twelve cylinders',
    image: '12cilindri',
    year: 2024,
    engine: '6.5 L V12',
    power: '830 cv',
    summary: 'A front-engined V12 grand tourer, named for the engine alone.',
  },

  // Formula 1
  {
    title: '500 F2',
    category: 'f1',
    code: '500',
    image: '500-f2',
    year: 1952,
    engine: '2.0 L inline-4',
    drivers: 'Alberto Ascari',
    summary: 'Ascari won the 1952 and 1953 World Championships in it, Ferrari’s first two titles.',
  },
  {
    title: '156 F1 “Sharknose”',
    category: 'f1',
    code: '156',
    nameMeaning: '1.5 litres, 6 cylinders',
    image: '156-sharknose',
    year: 1961,
    engine: '1.5 L V6',
    drivers: 'Phil Hill, Wolfgang von Trips',
    summary: 'Named for its twin nostril intakes. Phil Hill became the first American world champion.',
  },
  {
    title: '312T',
    category: 'f1',
    code: '312T',
    nameMeaning: '3 litres, 12 cylinders, transverse gearbox',
    image: '312t',
    year: 1975,
    engine: '3.0 L flat-12',
    drivers: 'Niki Lauda, Clay Regazzoni',
    summary: 'Lauda’s first title, and Ferrari’s first constructors’ title in eleven years.',
  },
  {
    title: '640',
    category: 'f1',
    code: '640',
    image: '640',
    year: 1989,
    engine: '3.5 L V12',
    drivers: 'Nigel Mansell, Gerhard Berger',
    summary: 'The first Formula 1 car with a paddle-shift gearbox. Mansell won on its debut in Brazil.',
  },
  {
    title: 'F2004',
    category: 'f1',
    code: 'F2004',
    image: 'f2004',
    year: 2004,
    engine: '3.0 L V10',
    drivers: 'Michael Schumacher, Rubens Barrichello',
    summary: 'Won 15 of 18 races. Schumacher’s seventh title, his fifth in a row with Ferrari.',
  },
  {
    title: 'F2007',
    category: 'f1',
    code: 'F2007',
    image: 'f2007',
    year: 2007,
    engine: '2.4 L V8',
    drivers: 'Kimi Räikkönen, Felipe Massa',
    summary: 'Räikkönen won the title at the last race, by one point.',
  },
  {
    title: 'SF-25',
    category: 'f1',
    code: 'SF-25',
    image: 'sf-25',
    year: 2025,
    engine: '1.6 L V6 turbo hybrid',
    drivers: 'Charles Leclerc, Lewis Hamilton',
    summary: 'Lewis Hamilton’s first season in red, alongside Charles Leclerc.',
  },
]

const places: { image: string; alt: string }[] = [
  { image: 'maranello', alt: 'The Ferrari factory gate on Via Abetone Inferiore, Maranello' },
  { image: 'fiorano', alt: 'The entrance to the Pista di Fiorano, Ferrari’s test track' },
  { image: 'tifosi', alt: 'Tifosi crowding the track under the podium at Monza' },
]

const credits: Credit[] = JSON.parse(fs.readFileSync(path.join(imagesDir, 'credits.json'), 'utf8'))

const creditFor = (image: string) => {
  const c = credits.find((x) => path.basename(x.file, '.jpg') === image)
  if (!c) return { credit: undefined, sourceUrl: undefined }
  return {
    credit: `${c.creator || 'unknown photographer'}, ${c.license}`,
    sourceUrl: c.page,
  }
}

const payload = await getPayload({ config })

async function upsertMedia(image: string, alt: string) {
  const filename = `${image}.jpg`
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  const data = { alt, ...creditFor(image) }
  if (existing.docs[0]) {
    return payload.update({ collection: 'media', id: existing.docs[0].id, data })
  }
  return payload.create({
    collection: 'media',
    data,
    filePath: path.join(imagesDir, filename),
  })
}

const manufacturer = await payload.find({
  collection: 'manufacturers',
  where: { title: { like: 'Ferrari' } },
  limit: 1,
})
const manufacturerId = manufacturer.docs[0]?.id

for (const place of places) {
  await upsertMedia(place.image, place.alt)
  payload.logger.info(`photo  ${place.image}`)
}

for (const car of cars) {
  const media = await upsertMedia(
    car.image,
    `Ferrari ${car.title}${car.category === 'f1' ? `, ${car.year} Formula 1 car` : `, ${car.year}`}`,
  )
  const { image: _image, ...fields } = car
  const data = { ...fields, image: media.id, ...(manufacturerId ? { manufacturer: manufacturerId } : {}) }

  const existing = await payload.find({
    collection: 'cars',
    where: { title: { equals: car.title } },
    limit: 1,
  })
  if (existing.docs[0]) {
    await payload.update({ collection: 'cars', id: existing.docs[0].id, data })
  } else {
    await payload.create({ collection: 'cars', data })
  }
  payload.logger.info(`car    ${car.title}`)
}

payload.logger.info(`Seeded ${cars.length} cars.`)
process.exit(0)
