import { Block } from 'payload'

import IconSelectField from '@/collections/_fields/atoms/icon-select-field'

const ButtonBlock: Block = {
  slug: 'Button',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      defaultValue: '/',
    },
    IconSelectField,
    {
      name: 'variant',
      type: 'select',
      options: [
        {
          label: 'Contained',
          value: 'contained',
        },
        {
          label: 'Outlined',
          value: 'outlined',
        },
        {
          label: 'Text',
          value: 'text',
        },
      ],
      defaultValue: 'contained',
    },
    {
      name: 'borderRadius',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Default', value: 'default' },
        { label: 'Rounded', value: 'rounded' },
      ],
      defaultValue: 'default',
      admin: {
        description: 'Default value is 4px, rounded value is 9999px',
      },
    },
    {
      name: 'displayAsLink',
      type: 'checkbox',
      label: 'Display as link',
      defaultValue: true,
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      label: 'Open in new tab',
    },
  ],
}

export default ButtonBlock
