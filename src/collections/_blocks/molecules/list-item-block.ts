import { Block } from 'payload'

const ListItemBlock: Block = {
  slug: 'list-item',
  interfaceName: 'ListItemBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
  ],
}

export default ListItemBlock
