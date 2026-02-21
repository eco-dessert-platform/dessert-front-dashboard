import Lnb from '@/shared/components/blocks/lnb/lnb'
import LogoHeader from '@/shared/components/ui/header/logo-header'
import { Outlet } from 'react-router-dom'

const FixedLayout = () => {
  return (
    <>
      <LogoHeader />
      <div className="flex h-[calc(100vh-80px)] w-full flex-row">
        <Lnb />
        <main className="h-full w-full bg-gray-50">
          <div className="h-full w-full overflow-auto">
            <div className="mx-auto min-h-full w-full max-w-[1200px] px-[90px] py-40">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default FixedLayout
