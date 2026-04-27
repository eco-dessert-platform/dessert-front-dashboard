import { LogoHeader } from '@dessert/ui'
import { Outlet } from 'react-router-dom'

import Lnb from '@/shared/block/lnb/lnb'

export function FixedLayout() {
  return (
    <>
      <LogoHeader />
      <div className="flex h-[calc(100vh-80px)] w-full flex-row">
        <Lnb />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="relative p-40 px-[90px]">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
