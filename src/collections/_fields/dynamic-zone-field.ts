import { Field } from 'payload'
import HeroBlock from '../_blocks/organisms/hero-block'

const DynamicZoneField: Field = {
  name: 'dynamicZone',
  type: 'blocks',
  blocks: [HeroBlock],
}

export default DynamicZoneField
