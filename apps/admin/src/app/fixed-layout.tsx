import { LogoHeader } from '@dessert/ui'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Outlet } from 'react-router'

import { Lnb } from '@/widgets/lnb'

const FixedLayout = () => {
  return (
    <>
      <LogoHeader />
      <div className="flex h-[calc(100vh-80px)] w-full flex-row overflow-y-auto">
        <Lnb />
        <main className="size-full max-w-[1240px] bg-gray-50 py-40">
          <ScrollArea.Root className="size-full">
            <ScrollArea.Viewport className="px-[90px]">
              <Outlet />
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </main>
      </div>
    </>
  )
}

export default FixedLayout
