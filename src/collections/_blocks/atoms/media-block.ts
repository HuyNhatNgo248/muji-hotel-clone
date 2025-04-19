import { Block } from 'payload'

const MediaBlock: Block = {
  slug: 'media',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'link',
      type: 'text',
      localized: true,
    },
  ],
}

export default MediaBlock
