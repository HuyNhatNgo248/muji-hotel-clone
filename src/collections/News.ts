import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
    },
  ],
}
