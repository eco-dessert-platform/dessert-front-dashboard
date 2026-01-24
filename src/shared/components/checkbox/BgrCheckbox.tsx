import * as Checkbox from '@radix-ui/react-checkbox'
import CheckboxOffIcon from 'src/assets/icons/icn-check-off.svg?react'
import CheckboxMultipleIcon from 'src/assets/icons/icn-check-on-multiple.svg?react'
import CheckboxOnOutlineIcon from 'src/assets/icons/icn-check-on-outline.svg?react'
import CheckboxOnFilledIcon from 'src/assets/icons/icn-check-on.svg?react'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

interface BgrCheckboxProps {
    className?: string
    checked?: Checkbox.CheckedState
    onCheckedChange?: (checked: Checkbox.CheckedState) => void
    disabled?: boolean
    size?: 'm' | 'l'
    label?: string
    variant?: 'default' | 'multiple'
}

export default function BgrCheckbox({
    className,
    checked,
    onCheckedChange,
    disabled = false,
    size = 'l',
    label,
    variant = 'default',
    ...rest
}: BgrCheckboxProps) {
    return (
        <label
            className={cn(
                'flex items-center gap-2',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                className,
            )}
        >
            <Checkbox.Root
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className={cn(
                    'group relative flex h-4 w-4 shrink-0 items-center justify-center focus:outline-none',
                )}
                {...rest}
            >
                <CheckboxOffIcon className="h-full w-full group-data-[state=checked]:hidden group-data-[state=indeterminate]:hidden" />
                <Checkbox.Indicator className="h-full w-full" asChild>
                    {variant === 'multiple' ? (
                        checked === 'indeterminate' ? (
                            <CheckboxMultipleIcon className="h-full w-full" />
                        ) : (
                            <CheckboxOnOutlineIcon className="h-full w-full" />
                        )
                    ) : (
                        <CheckboxOnFilledIcon className="h-full w-full" />
                    )}
                </Checkbox.Indicator>
            </Checkbox.Root>
            {label && (
                <span
                    className={`${cn('text-gray-900')} ${size === 'l' ? 'text-title-16-r' : 'text-body-12-r'}`}
                >
                    {label}
                </span>
            )}
        </label>
    )
}
