import Lnb from '@/shared/components/blocks/lnb/lnb'
import LogoHeader from '@/shared/components/ui/header/logo-header'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Outlet } from 'react-router-dom'

const FixedLayout = () => {
  return (
    <>
      <LogoHeader />
      <div className="flex h-[calc(100vh-80px)] w-full flex-row overflow-y-auto">
        <Lnb />
        <main className="h-full w-full max-w-[1240px] bg-gray-50">
          <ScrollArea className="h-full w-full px-[90px] py-[40px]">
            <Outlet />
          </ScrollArea>
        </main>
      </div>
    </>
  )
}

export default FixedLayout
