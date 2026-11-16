import { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
    update: () => true,
  },
  defaultSort: 'year',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'road',
      options: [
        { label: 'Road car', value: 'road' },
        { label: 'Formula 1', value: 'f1' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'code',
      type: 'text',
      admin: {
        description: 'The number or short name set large on the gallery tile, e.g. "308" or "F40".',
      },
    },
    {
      name: 'nameMeaning',
      label: 'What the name means',
      type: 'text',
      admin: {
        description: 'Shown when a visitor taps the tile, e.g. "3.0 litres, 8 cylinders".',
      },
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
      name: 'engine',
      type: 'text',
    },
    {
      name: 'power',
      type: 'text',
    },
    {
      name: 'drivers',
      type: 'text',
      admin: {
        condition: (data) => data?.category === 'f1',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'One or two sentences shown with the car.',
      },
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
    defaultColumns: ['title', 'category', 'year', 'code'],
  },
}
