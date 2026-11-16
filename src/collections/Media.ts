import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,

  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Photographer, licence and source, shown in the site footer.',
      },
    },
    {
      name: 'sourceUrl',
      type: 'text',
    },
  ],
  upload: {
    adminThumbnail: "adminThumbnail",
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
      },
      {
        name: 'banner',
        width: 1024,
        height: 600,
      },
    ],
  },
}
