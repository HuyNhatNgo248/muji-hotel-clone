import { Block } from 'payload'

const SeparatorBlock: Block = {
  slug: 'separator',
  interfaceName: 'SeparatorBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}

export default SeparatorBlock
