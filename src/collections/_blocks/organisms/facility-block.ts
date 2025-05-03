import { Block } from 'payload'

import ListItemBlock from '../molecules/list-item-block'
import MediaListBlock from '../molecules/media-list-block'

const HoursBlock: Block = {
  slug: 'hours',
  interfaceName: 'HoursBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [ListItemBlock],
    },
  ],
}

const FacilityBlock: Block = {
  slug: 'facility',
  interfaceName: 'FacilityBlock',
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
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [ListItemBlock, HoursBlock, MediaListBlock],
    },
  ],
}

export default FacilityBlock
