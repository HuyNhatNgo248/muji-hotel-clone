import { cn } from '@/lib/utils'
import Logo from '@/components/organisms/logo'
import { Dictionary } from '@/types'
import Link from 'next/link'
import SocialMedia from '@/components/organisms/social-media'

interface FooterProps {
  className?: string
  dictionary: Dictionary
}

const Footer: React.FC<FooterProps> = ({ className, dictionary }) => {
  return (
    <footer className={cn('bg-gray-100 py-20 flex flex-col gap-12', className)}>
      <Link href="/">
        <Logo
          orientation="horizontal"
          variant="sm"
          companyName="MUJI HOTEL"
          branchName=""
          blockType="logo"
        />
      </Link>

      <SocialMedia
        title={'FOLLOW US'}
        blockType="social-media"
        socialMedia={[
          {
            iconField: 'lu/LuInstagram',
            url: 'https://www.instagram.com/muji_hotel/',
            openInNewTab: true,
          },
          {
            iconField: 'lu/LuFacebook',
            url: 'https://www.facebook.com/muji.stay.official/',
            openInNewTab: true,
          },
        ]}
      />

      <div className="flex md:gap-8 gap-6 justify-center items-center md:flex-row flex-col">
        <Link href="/">
          <Logo
            orientation="horizontal"
            variant="sm"
            companyName="MUJI 無印良品"
            branchName=""
            blockType="logo"
            classNames={{
              companyName: 'text-xl',
            }}
          />
        </Link>

        <Link className="text-xs font-semibold" href="/policy">
          {dictionary['footer']['reservation-policy']}
        </Link>

        <span className="text-xs font-semibold">© Ryohin Keikaku Co., Ltd.</span>
      </div>
    </footer>
  )
}

export default Footer
