import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from './_hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Originals are served to the image optimizer; cap oversized uploads (some current files are 4.4 MB)
    resizeOptions: { width: 2560, withoutEnlargement: true },
  },
}
