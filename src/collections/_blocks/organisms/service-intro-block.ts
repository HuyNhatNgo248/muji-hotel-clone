import { Block } from 'payload'
import MediaBlock from '../atoms/media-block'
import ButtonBlock from '../atoms/button-block'
import urlFieldsHelper from '@/collections/_fields/helpers/url-fields-helper'

const ServiceIntroBlock: Block = {
  slug: 'service-intro',
  interfaceName: 'ServiceIntroBlock',
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
    ...urlFieldsHelper,
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      maxRows: 20,
      blocks: [MediaBlock, ButtonBlock],
    },
  ],
}

export default ServiceIntroBlock
