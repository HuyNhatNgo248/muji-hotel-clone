import { Block } from 'payload'

const NewsBlock: Block = {
  slug: 'news',
  interfaceName: 'NewsBlock',
  fields: [
    {
      name: 'news',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
    },
  ],
}

export default NewsBlock
