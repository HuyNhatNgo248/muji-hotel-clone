import { Field } from 'payload'

const IconField: Field = {
  name: 'iconField',
  label: 'Icon',
  type: 'text',
  admin: {
    components: {
      Field: '/components/payload/icon-select.tsx',
    },
  },
  hasMany: false,
  localized: false,
}

export default IconField
