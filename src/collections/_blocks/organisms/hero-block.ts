import { Block } from 'payload'

import MediaListBlock from '../molecules/media-list-block'
import BannerBlock from './banner-block'
import LogoBlock from '../molecules/logo-block'

const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'description',
      type: 'richText',
      localized: true
    },
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [MediaListBlock, BannerBlock, LogoBlock],
    },
  ],
}

export default HeroBlock
