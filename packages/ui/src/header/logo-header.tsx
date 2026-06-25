import { BbanggreuiOvenLogo } from '@dessert/icons'

import { cn } from '../lib/utils'

interface LogoHeaderProps {
  bordered?: boolean
}

function LogoHeader({ bordered = true }: LogoHeaderProps) {
  return (
    <header
      className={cn(
        'flex h-header max-w-[1920px] shrink-0 items-center bg-white px-24 py-10',
        bordered && 'border-b border-b-gray-300',
      )}
    >
      <BbanggreuiOvenLogo />
    </header>
  )
}

export { LogoHeader }
