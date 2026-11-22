import { CollectionConfig } from 'payload'

import DynamicZoneField from './_fields/dynamic-zone-field'
import { revalidateAfterChange, revalidateAfterDelete } from './_hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    DynamicZoneField,
  ],
}
