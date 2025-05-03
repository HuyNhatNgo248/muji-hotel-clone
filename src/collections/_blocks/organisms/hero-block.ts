import { Block } from 'payload'

import MediaListBlock from '../molecules/media-list-block'
import BannerBlock from './banner-block'
import LogoBlock from '../molecules/logo-block'
import ButtonBlock from '../atoms/button-block'

const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [MediaListBlock, BannerBlock, LogoBlock, ButtonBlock],
    },
  ],
}

export default HeroBlock
