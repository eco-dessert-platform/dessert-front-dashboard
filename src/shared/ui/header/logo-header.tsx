import Logo from '@/assets/logo/BGR-header-logo.svg?react'
import { cn } from '@/shared/libs/utils'

interface LogoHeaderProps {
  className?: string
}

function LogoHeader({ className }: LogoHeaderProps) {
  return (
    <header
      className={cn(
        'flex h-header max-w-[1920px] shrink-0 items-center bg-white px-24 py-10',
        className,
      )}
    >
      <Logo />
    </header>
  )
}

export default LogoHeader
