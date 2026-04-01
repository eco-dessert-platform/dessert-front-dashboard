import { LogoHeader } from '@dessert/ui'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Outlet } from 'react-router-dom'

import Lnb from '@/shared/block/lnb/lnb'

const FixedLayout = () => {
  return (
    <>
      <LogoHeader />
      <div className="flex h-[calc(100vh-80px)] w-full flex-row overflow-y-auto">
        <Lnb />
        <main className="size-full max-w-[1240px] bg-gray-50">
          <ScrollArea className="size-full px-[90px] py-40">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </>
  )
}

export default FixedLayout
