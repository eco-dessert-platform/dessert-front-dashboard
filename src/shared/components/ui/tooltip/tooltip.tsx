import { cn } from '@/shared/lib/utils'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

interface TooltipContextValue {
  position: TooltipPosition
  align: TooltipAlign
  sideOffset: number
  delayDuration: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const TooltipContext = React.createContext<
  TooltipContextValue | undefined
>(undefined)

// Custom Hook으로 Context 접근
function useTooltipContext() {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error(
      'Tooltip compound components must be used within Tooltip.Root',
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

interface TooltipRootProps {
  children: React.ReactNode
  position?: TooltipPosition
  align?: TooltipAlign
  sideOffset?: number
  delayDuration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const TooltipRoot = ({
  children,
  position = 'top',
  align = 'center',
  sideOffset = 2,
  delayDuration = 0,
  open,
  onOpenChange,
}: TooltipRootProps) => {
  const contextValue: TooltipContextValue = {
    position,
    align,
    sideOffset,
    delayDuration,
    open,
    onOpenChange,
  }

  return (
    <TooltipContext.Provider value={contextValue}>
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
          {children}
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

const TooltipTrigger = ({
  children,
  asChild = false,
  className,
}: TooltipTriggerProps) => {
  return (
    <TooltipPrimitive.Trigger asChild={asChild} className={className}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
}

const TooltipContent = ({ children, className }: TooltipContentProps) => {
  const { position, align, sideOffset } = useTooltipContext()
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
      <TooltipPrimitive.Arrow className="fill-gray-700" width={8} height={7} />
    </TooltipPrimitive.Content>
  )
}

type TooltipCompound = typeof TooltipRoot & {
  Trigger: typeof TooltipTrigger
  Content: typeof TooltipContent
}

const Tooltip = TooltipRoot as TooltipCompound
Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent

export { Tooltip }
