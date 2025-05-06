'use client'

import { cn } from '@/lib/utils'
import Logo from './logo'
import { Dictionary } from '@/types'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { LuMenu } from 'react-icons/lu'
import { LuX } from 'react-icons/lu'
import LogoComp from '@/components/organisms/logo'
import Link from 'next/link'
import LanguageSwitcher from './language-switcher'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface MobileNavMenuProps {
  className?: string
  dictionary: Dictionary
}

export default function MobileNavMenu({ className, dictionary }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseMenu = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  return (
    <div className={cn('lg:hidden flex justify-between items-center', className)}>
      <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <LuMenu className="size-8" />
        </DrawerTrigger>
        <DrawerContent className="w-full bg-white font-thin overflow-hidden data-[vaul-drawer-direction=left]:sm:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=left]:max-w-full">
          <DrawerHeader>
            <DrawerTitle className="hidden">MUJI HOTEL</DrawerTitle>
            <DrawerDescription className="hidden">navigation menu</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col px-8 gap-10 h-full">
            <div className="flex justify-between items-center w-full">
              <Link href={'/'} onClick={handleCloseMenu}>
                <LogoComp
                  blockType="logo"
                  variant="sm"
                  orientation="horizontal"
                  companyName="MUJI HOTEL"
                  branchName="GINZA"
                />
              </Link>

              <DrawerClose className="size-8" asChild>
                <button className="cursor-pointer">
                  <LuX className="size-6" />
                </button>
              </DrawerClose>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="border-1 rounded-xl">
                <Link href={'https://hotel.muji.com/ginza/ja/confirm/'} className="uppercase">
                  {dictionary['navigation-menu']['find-reservation']}
                </Link>
              </Button>
              <Button variant="default" className="bg-black text-white rounded-xl">
                <Link
                  href={'https://go-mujihotelginza.reservation.jp/ja/searchInput'}
                  className="uppercase"
                >
                  {dictionary['navigation-menu']['reservations']}
                </Link>
              </Button>
            </div>

            <div className="flex flex-col gap-8 uppercase">
              <Link className="text-lg" href={'/news'} onClick={handleCloseMenu}>
                {dictionary['navigation-menu']['news']}
              </Link>
              <Link className="text-lg" href={'/location'} onClick={handleCloseMenu}>
                {dictionary['navigation-menu']['location']}
              </Link>
              <Link className="text-lg" href={'/rooms'} onClick={handleCloseMenu}>
                {dictionary['navigation-menu']['rooms']}
              </Link>
              <Link className="text-lg" href={'/facilities'} onClick={handleCloseMenu}>
                {dictionary['navigation-menu']['facilities']}
              </Link>
              <Link className="text-lg" href={'/contact'} onClick={handleCloseMenu}>
                {dictionary['navigation-menu']['contact-us']}
              </Link>
            </div>

            <LanguageSwitcher className="mt-auto mb-8" />
          </div>
        </DrawerContent>
      </Drawer>
      <div>
        <Logo variant="sm" />
      </div>
      <div></div>
    </div>
  )
}
