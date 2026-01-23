import Logo from 'src/assets/logo/BGR-header-logo.svg?react'

function BgrHeader() {
    return (
        <header className='flex h-20  max-w-[1920px] shrink-0 items-center gap-[82px] bg-white px-6 py-2.5 border-b border-b-gray-300'>
            <Logo className="flex items-center justify-center gap-[9px]" />
        </header>
    )
}

export default BgrHeader