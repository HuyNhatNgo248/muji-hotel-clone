import { Block } from 'payload'

const FaqItem: Block = {
  slug: 'faq-item',
  interfaceName: 'FaqItemBlock',
  fields: [
    {
      name: 'question',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      localized: true,
      required: true,
    },
  ],
}

const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  fields: [
    {
      name: 'groupTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'faqItems',
      type: 'blocks',
      minRows: 1,
      maxRows: 50,
      blocks: [FaqItem],
    },
  ],
}

export default FaqBlock
