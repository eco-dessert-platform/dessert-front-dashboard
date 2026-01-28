import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

interface BgrTooltipContextValue {
    position: TooltipPosition
    align: TooltipAlign
    sideOffset: number
    delayDuration: number
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const BgrTooltipContext = React.createContext<
    BgrTooltipContextValue | undefined
>(undefined)

// Custom Hook으로 Context 접근
function useBgrTooltipContext() {
    const context = React.useContext(BgrTooltipContext)
    if (!context) {
        throw new Error(
            'BgrTooltip compound components must be used within BgrTooltip.Root',
        )
    }
    return context
}

const getAlignOffset = (
    position: TooltipPosition,
    align: TooltipAlign,
): number => {
    if (align === 'center') return 0
    if (position === 'top' || position === 'bottom') {
        return 25
    }

    if (position === 'left' || position === 'right') {
        return 12.5
    }
    return 0
}

interface BgrTooltipRootProps {
    children: React.ReactNode
    position?: TooltipPosition
    align?: TooltipAlign
    sideOffset?: number
    delayDuration?: number
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const BgrTooltipRoot = ({
    children,
    position = 'top',
    align = 'center',
    sideOffset = 2,
    delayDuration = 0,
    open,
    onOpenChange,
}: BgrTooltipRootProps) => {
    const contextValue: BgrTooltipContextValue = {
        position,
        align,
        sideOffset,
        delayDuration,
        open,
        onOpenChange,
    }

    return (
        <BgrTooltipContext.Provider value={contextValue}>
            <TooltipPrimitive.Provider delayDuration={delayDuration}>
                <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
                    {children}
                </TooltipPrimitive.Root>
            </TooltipPrimitive.Provider>
        </BgrTooltipContext.Provider>
    )
}

interface BgrTooltipTriggerProps {
    children: React.ReactNode
    asChild?: boolean
    className?: string
}

const BgrTooltipTrigger = ({
    children,
    asChild = false,
    className,
}: BgrTooltipTriggerProps) => {
    return (
        <TooltipPrimitive.Trigger asChild={asChild} className={className}>
            {children}
        </TooltipPrimitive.Trigger>
    )
}

interface BgrTooltipContentProps {
    children: React.ReactNode
    className?: string
}

const BgrTooltipContent = ({ children, className }: BgrTooltipContentProps) => {
    const { position, align, sideOffset } = useBgrTooltipContext()
    const alignOffset = getAlignOffset(position, align)

    return (
        <TooltipPrimitive.Content
            side={position}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            className={`typo-body-10-r ${cn(
                'relative z-50',
                'px-2 py-1.5',
                'rounded-sm',

                // ! Opacity/Black 관련 컬러가 현재 프로젝트 tailwind 설정에 존재하지 않음
                'bg-gray-700 text-white',
                'max-w-[200px] wrap-break-word',

                // ! 디자인 시스템의 컴포넌트에는 level 형식으로 정의되어 있지만, 실제 shadow 관련 design token을 찾을 수 없음
                // ! 현재는 shadow를 하드코딩으로 진행함.
                'shadow-[0_3px_10px_0_rgba(0,0,0,0.1),0_2px_4px_0_rgba(0,0,0,0.08)]',
                'animate-in fade-in-0 zoom-in-95',
                className,
            )}`}
        >
            {children}
            <TooltipPrimitive.Arrow
                className="fill-gray-700"
                width={8}
                height={7}
            />
        </TooltipPrimitive.Content>
    )
}

type BgrTooltipCompound = typeof BgrTooltipRoot & {
    Trigger: typeof BgrTooltipTrigger
    Content: typeof BgrTooltipContent
}

const BgrTooltip = BgrTooltipRoot as BgrTooltipCompound
BgrTooltip.Trigger = BgrTooltipTrigger
BgrTooltip.Content = BgrTooltipContent

export { BgrTooltip }
