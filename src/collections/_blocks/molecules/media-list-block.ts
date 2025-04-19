import { Block } from 'payload'

import MediaBlock from '../atoms/media-block'

const MediaListBlock: Block = {
  slug: 'media-list',
  interfaceName: 'MediaListBlock',
  fields: [
    {
      name: 'mediaList',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [MediaBlock],
    },
  ],
}

export default MediaListBlock
