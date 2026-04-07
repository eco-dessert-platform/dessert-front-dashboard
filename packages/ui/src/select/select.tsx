import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

import { Label } from '../label/label'
import { cn } from '../lib/utils'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  helperText?: string
  className?: string
  labelClassName?: string
  onValueChange?: (value: string) => void
}

const Select = ({
  options,
  value,
  placeholder = '선택하세요',
  label,
  required = false,
  disabled = false,
  error = false,
  errorMessage,
  helperText,
  className = '',
  labelClassName,
  onValueChange,
}: SelectProps) => {
  return (
    <div
      className={cn('flex flex-col items-start gap-4 self-stretch', className)}
    >
      {label && (
        <Label label={label} required={required} className={labelClassName} />
      )}
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            'flex h-input w-full cursor-pointer items-center justify-between gap-8 rounded-10 border border-gray-300 bg-white px-12 py-8 typo-title-16-r text-gray-800 outline-none',
            'hover:border-gray-400',
            'focus-visible:border-primary-500 focus-visible:ring-8 focus-visible:ring-primary-200',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
            error && 'border-red-500',
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="transition-transform duration-200 data-[state=open]:rotate-180">
            <ChevronDown size={20} className="text-gray-400" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            side="bottom"
            sideOffset={16}
            align="start"
            className={cn(
              'z-50 min-w-(--radix-select-trigger-width) overflow-hidden rounded-10 border border-gray-200 bg-white shadow-lg',
            )}
          >
            <SelectPrimitive.Viewport className="p-4">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    'relative flex cursor-pointer items-center rounded-16 px-12 py-8 typo-title-16-r text-gray-800 outline-none select-none',
                    'hover:bg-gray-50',
                    'focus:bg-gray-50',
                    'disabled:pointer-events-none disabled:opacity-50',
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && errorMessage && (
        <span className="typo-body-12-r text-red-500">{errorMessage}</span>
      )}
      {!error && helperText && (
        <span className="typo-body-12-r text-gray-500">{helperText}</span>
      )}
    </div>
  )
}

export { Select }
