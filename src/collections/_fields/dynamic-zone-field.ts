import { Field } from 'payload'
import HeroBlock from '../_blocks/organisms/hero-block'
import ServiceIntroBlock from '../_blocks/organisms/service-intro-block'
import SeparatorBlock from '../_blocks/molecules/separator-block'

const DynamicZoneField: Field = {
  name: 'dynamicZone',
  type: 'blocks',
  blocks: [HeroBlock, ServiceIntroBlock, SeparatorBlock],
}

export default DynamicZoneField
