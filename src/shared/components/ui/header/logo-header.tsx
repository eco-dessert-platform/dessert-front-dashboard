import Logo from '@/assets/logo/BGR-header-logo.svg?react'

function LogoHeader() {
  return (
    <header className="flex h-header max-w-[1920px] shrink-0 items-center border-b border-b-gray-300 px-24 py-10">
      <Logo />
    </header>
  )
}

export default LogoHeader
