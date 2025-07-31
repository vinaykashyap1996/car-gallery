import { CollectionConfig } from "payload";


export const Manufacturers: CollectionConfig = {
    slug: 'manufacturers',
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        { name: 'cars', type: 'join', on: 'manufacturer', collection: 'cars' }
    ],
    upload: true,
    admin: {
        useAsTitle: 'title',
    },
}       