import { Field } from 'payload'
import HeroBlock from '../_blocks/organisms/hero-block'
import ServiceIntroBlock from '../_blocks/organisms/service-intro-block'
import SeparatorBlock from '../_blocks/molecules/separator-block'
import SocialMediaBlock from '../_blocks/organisms/social-media-block'
import NewsBlock from '../_blocks/organisms/news-block'
import FacilityBlock from '../_blocks/organisms/facility-block'
import FaqBlock from '../_blocks/organisms/faq-block'

const DynamicZoneField: Field = {
  name: 'dynamicZone',
  type: 'blocks',
  blocks: [
    HeroBlock,
    ServiceIntroBlock,
    SeparatorBlock,
    SocialMediaBlock,
    NewsBlock,
    FacilityBlock,
    FaqBlock,
  ],
}

export default DynamicZoneField
