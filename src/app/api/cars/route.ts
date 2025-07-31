import { getPayload } from "payload"
import configPromise from '@payload-config'

const payload = await getPayload({
    config: configPromise,
})

export const GET = async (request: Request) => {
    const cars = await payload.find({
        collection: 'cars',
    })

    return Response.json(cars)
}

export const POST = async (request: Request) => {
    const data = await request.json()
    const newCar = await payload.create({
        collection: 'cars',
        data,
    })

    return Response.json(newCar)
}

export const DELETE = async (request: Request) => {
    const { id } = await request.json()
    if (!id) {
        return Response.json({ error: 'ID is required' }, { status: 400 })
    }
    await payload.delete({
        collection: 'cars',
        id,
    })
    return Response.json({ message: 'Car deleted successfully' })
}