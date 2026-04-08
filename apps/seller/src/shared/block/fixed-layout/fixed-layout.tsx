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

/**
 * @deprecated `widgets` 폴도로 이동되었습니다.
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `@/widgets` 폴더에 구현된 컴포넌트를 사용해주세요.
 */
export default FixedLayout
