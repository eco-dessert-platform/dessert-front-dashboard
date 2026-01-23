import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

interface SwitchProps
    extends React.ComponentProps<typeof SwitchPrimitive.Root> {
    buttonIcon?: React.ReactNode
}

/**
 * Switch 컴포넌트 (React 19)
 *
 * @example
 * ```tsx
 * const [isOn, setIsOn] = useState(false)
 *
 * <Switch
 *   checked={isOn}
 *   onCheckedChange={setIsOn}
 *   aria-label="알림 설정"
 * />
 * ```
 */
function Switch({ className, buttonIcon, ...props }: SwitchProps) {
    return (
        <SwitchPrimitive.Root
            className={cn(
                'peer data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-gray-300',
                'focus-visible:border-ring focus-visible:ring-ring/50',
                'dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.7rem] w-12',
                'shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all',
                'outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    'dark:data-[state=unchecked]:bg-foreground bg-white',
                    'dark:data-[state=checked]:bg-primary-foreground pointer-events-none',
                    'block size-6 rounded-full ring-0',
                    'transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
                    buttonIcon && 'flex items-center justify-center',
                )}
            >
                {buttonIcon}
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    )
}

Switch.displayName = 'Switch'

export { Switch, type SwitchProps }
