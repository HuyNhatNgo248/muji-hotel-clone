import { Field } from 'payload'

const urlFieldsHelper: Field[] = [
  {
    name: 'url',
    type: 'text',
    defaultValue: '/',
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
  },
]

export default urlFieldsHelper
