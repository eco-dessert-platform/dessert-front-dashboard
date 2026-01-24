import React from 'react'
import BgrHeader from 'src/shared/components/header/BgrHeader.tsx'
import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'
import BgrLnb from '../components/lnb/BgrLnb'

const BgrLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <BgrHeader />
            <div className="flex h-[calc(100vh-80px)] w-full flex-row">
                <BgrLnb />
                <main className='h-full max-w-[1200px] w-full bg-gray-50'>
                    <ScrollArea className='h-full w-full px-[90px] py-[40px]'>
                        {children}
                    </ScrollArea>
                </main>
            </div>
        </>
    )
}

export default BgrLayout
