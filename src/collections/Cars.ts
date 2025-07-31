import { CollectionConfig } from 'payload'


export const Cars: CollectionConfig = {
    slug: 'cars',
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
        update: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'manufacturer',
            type: 'relationship',
            relationTo: 'manufacturers',
        },
        {
            name: 'year',
            type: 'number',
        },
        {
            name: 'price',
            type: 'number',
        },
        {
            name: 'description',
            type: 'richText',
        },
    ],
    admin: {
        useAsTitle: 'title',
    },
}
