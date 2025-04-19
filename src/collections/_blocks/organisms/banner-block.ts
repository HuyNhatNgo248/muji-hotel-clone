import { Block } from 'payload'

import urlFieldsHelper from '@/collections/_fields/helpers/url-fields-helper'

const BannerBlock: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  fields: [
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    ...urlFieldsHelper,
  ],
}

export default BannerBlock
