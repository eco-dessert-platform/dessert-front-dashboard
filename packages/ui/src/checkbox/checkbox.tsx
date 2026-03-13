import * as React from 'react'

import {
  CheckboxCheckedGrayIcon,
  CheckboxCheckedIcon,
  CheckboxCheckedLightIcon,
  CheckboxIndeterminateIcon,
} from '@dessert/icons'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '../lib/utils'

interface CheckboxProps {
  className?: string
  checked?: CheckboxPrimitive.CheckedState
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
  disabled?: boolean
  size?: 'md' | 'lg'
  label?: string
  type?: 'single' | 'multiple'
}

export function Checkbox({
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
    <div className={cn('inline-flex items-center gap-8', className)}>
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`group relative flex size-16 shrink-0 items-center justify-center focus:outline-none ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        {...rest}
      >
        <CheckboxCheckedGrayIcon className="size-full group-data-[state=checked]:hidden group-data-[state=indeterminate]:hidden" />
        <CheckboxPrimitive.Indicator className="size-full" asChild>
          {type === 'multiple' ? (
            checked === 'indeterminate' ? (
              <CheckboxIndeterminateIcon className="size-full" />
            ) : (
              <CheckboxCheckedLightIcon className="size-full" />
            )
          ) : (
            <CheckboxCheckedIcon className="size-full" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className={`text-gray-900 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          } ${size === 'lg' ? 'typo-title-16-r' : 'typo-body-12-r'}`}
        >
          {label}
        </label>
      )}
    </div>
  )
}
