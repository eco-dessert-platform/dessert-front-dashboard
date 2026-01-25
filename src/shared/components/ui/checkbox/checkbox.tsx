import CheckboxOffIcon from '@/assets/icons/icn-check-off.svg?react'
import CheckboxMultipleIcon from '@/assets/icons/icn-check-on-multiple.svg?react'
import CheckboxOnOutlineIcon from '@/assets/icons/icn-check-on-outline.svg?react'
import CheckboxOnFilledIcon from '@/assets/icons/icn-check-on.svg?react'
import { cn } from '@/shared/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

interface CheckboxProps {
  className?: string
  checked?: CheckboxPrimitive.CheckedState
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
  disabled?: boolean
  size?: 'md' | 'lg'
  label?: string
  type?: 'single' | 'multiple'
}

export default function Checkbox({
  className,
  checked,
  onCheckedChange,
  disabled = false,
  size = 'lg',
  label,
  type = 'single',
  ...rest
}: CheckboxProps) {
  const id = React.useId()

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`group relative flex h-4 w-4 shrink-0 items-center justify-center focus:outline-none ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        {...rest}
      >
        <CheckboxOffIcon className="h-full w-full group-data-[state=checked]:hidden group-data-[state=indeterminate]:hidden" />
        <CheckboxPrimitive.Indicator className="h-full w-full" asChild>
          {type === 'multiple' ? (
            checked === 'indeterminate' ? (
              <CheckboxMultipleIcon className="h-full w-full" />
            ) : (
              <CheckboxOnOutlineIcon className="h-full w-full" />
            )
          ) : (
            <CheckboxOnFilledIcon className="h-full w-full" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className={`text-gray-900 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          } ${size === 'lg' ? 'text-title-16-r' : 'text-body-12-r'}`}
        >
          {label}
        </label>
      )}
    </div>
  )
}
