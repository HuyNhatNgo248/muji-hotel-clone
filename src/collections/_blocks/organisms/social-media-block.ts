import { Block } from 'payload'
import IconField from '@/collections/_fields/atoms/icon-select-field'
import urlFieldsHelper from '@/collections/_fields/helpers/url-fields-helper'

const SocialMediaBlock: Block = {
  slug: 'social-media',
  interfaceName: 'SocialMediaBlock',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'socialMedia',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Social Media Item',
        plural: 'Social Media Items',
      },
      fields: [IconField, ...urlFieldsHelper],
    },
  ],
}

export default SocialMediaBlock
