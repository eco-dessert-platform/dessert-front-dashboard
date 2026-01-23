import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
type TooltipAlign = 'start' | 'center' | 'end'

export interface BgrTooltipProps {
    children: React.ReactNode
    content: React.ReactNode | string
    position?: TooltipPosition
    align?: TooltipAlign
    sideOffset?: number
    delayDuration?: number
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

/**
 * Left/Right Position에서 align을 반전
 * - start → end (위)
 * - end → start (아래)
 */
const convertAlignPosition = (
    position: TooltipPosition,
    align: TooltipAlign,
): TooltipAlign => {
    if (position === 'left' || position === 'right') {
        if (align === 'start') return 'end'
        if (align === 'end') return 'start'
    }
    return align
}

/**
 * Top/Bottom Position에서 Arrow offset 계산
 * - start: 30px (왼쪽)
 * - end: 30px (오른쪽)
 */
const getAlignOffset = (
    position: TooltipPosition,
    align: TooltipAlign,
): number => {
    if (align === 'center') return 0

    // Top/Bottom: 더 많이 이동 (30px)
    if (position === 'top' || position === 'bottom') {
        return 30
    }

    // Left/Right: 기본 Radix 동작 사용
    return 0
}

export const BgrTooltip = ({
    children,
    content,
    position = 'top',
    align = 'center',
    sideOffset = 2,
    delayDuration = 0,
    className,
    open,
    onOpenChange,
}: BgrTooltipProps) => {
    const convertAlign = convertAlignPosition(position, align)
    const alignOffset = getAlignOffset(position, align)

    return (
        <TooltipPrimitive.Provider
            delayDuration={delayDuration}
            skipDelayDuration={300}
        >
            <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side={position}
                        align={convertAlign}
                        alignOffset={alignOffset}
                        sideOffset={sideOffset}
                        collisionPadding={10}
                        className={cn(
                            'relative z-50',
                            'px-2 py-1.5',
                            'rounded-sm',

                            // ! Opacity/Black 관련 컬러가 현재 프로젝트 tailwind 설정에 존재하지 않음
                            // ! 예슬님이 디자인 시스템의 컬러를 추가하면 수정 예정
                            'bg-gray-700 text-white',
                            // ! tailwind-merge + custom tailwind className 충돌 문제를 먼저 해결해야
                            // ! variables.pcss에서 설정한 커스텀 타이포그라피 사용 가능
                            // ! 현재는 하드코딩으로 작성, 추후 이슈가 해결되면 text-body-10-r 사용 예정
                            'text-[10px] leading-[160%] font-normal tracking-[-0.02em]',
                            'max-w-[200px] wrap-break-word',
                            // Shadow
                            // ! 디자인 시스템의 컴포넌트에는 level 형식으로 정의되어 있지만, 실제 shadow 관련 design token을 찾을 수 없음
                            // ! 현재는 shadow를 하드코딩으로 진행함.
                            'shadow-[0_3px_10px_0_rgba(0,0,0,0.1),0_2px_4px_0_rgba(0,0,0,0.08)]',
                            className,
                        )}
                    >
                        {content}

                        <TooltipPrimitive.Arrow
                            // ! Opacity/Black 관련 컬러가 현재 프로젝트 tailwind 설정에 존재하지 않음
                            // ! 예슬님이 디자인 시스템의 컬러를 추가하면 수정 예정
                            className="fill-gray-700"
                            width={6}
                            height={3}
                        />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    )
}

export default BgrTooltip
