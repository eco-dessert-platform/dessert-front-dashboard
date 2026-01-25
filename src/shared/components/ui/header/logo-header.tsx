import Logo from '@/assets/logo/BGR-header-logo.svg?react'

function LogoHeader() {
  return (
    <header className="flex h-20 max-w-[1920px] shrink-0 items-center border-b border-b-gray-300 px-6 py-2.5">
      <Logo />
    </header>
  )
}

export default LogoHeader
