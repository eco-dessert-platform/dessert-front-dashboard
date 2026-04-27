import { LogoHeader } from '@dessert/ui'
import { Outlet } from 'react-router-dom'

import Lnb from '@/shared/block/lnb/lnb'

export function FixedLayout() {
  return (
    <>
      <LogoHeader />
      <div className="flex h-[calc(100vh-80px)] w-full flex-row overflow-y-auto">
        <Lnb />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="relative px-[90px] pt-40">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
