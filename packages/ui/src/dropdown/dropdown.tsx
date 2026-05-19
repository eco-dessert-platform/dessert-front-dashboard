import { useEffect, useRef, useState } from 'react'

import {
  CheckIcon,
  CheckboxCheckedGrayIcon,
  CheckboxCheckedIcon,
  ChevronDownIcon,
} from '@dessert/icons'

import { cn } from '../lib/utils'

interface dropdownOption {
  label: string
  value: string
  disabled?: boolean
}

interface DropdownProps {
  options: dropdownOption[]
  value?: string
  placeholder?: string
  disabled?: boolean
  type?: 'list' | 'checkbox'
  className?: string
  listClassName?: string
  onSelect?: (value: string) => void
}

const Dropdown = ({
  options,
  value,
  placeholder = '선택하세요',
  disabled = false,
  type = 'list',
  className = '',
  listClassName = '',
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option: dropdownOption) => {
    if (option.disabled) return
    onSelect?.(option.value)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`typo-title-16-r ${cn(
          'flex h-input w-full items-center justify-between rounded-10 border py-8 pr-8 pl-12 transition-all duration-200',
          'text-gray-900',
          'border-gray-300 bg-white',
          'cursor-pointer font-pretendard hover:border-gray-400 focus:border-gray-500 focus:outline-none',
          isOpen && 'border-gray-500',
          disabled &&
            'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400',
        )}`}
      >
        <span
          className={cn(
            'flex-1 truncate text-left',
            !selectedOption && 'text-gray-400',
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon
          className={cn(
            'size-20 shrink-0 text-gray-600 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute left-0 z-dropdown mt-1 w-full p-1',
            'rounded-10 border border-gray-200 bg-white shadow-md',
            'animate-in duration-200 zoom-in-95 fade-in',
          )}
        >
          <ul className={cn('max-h-[178px] overflow-y-auto', listClassName)}>
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                    className={`typo-title-14-r ${cn(
                      'flex h-[34px] w-full cursor-pointer items-center gap-8 rounded-4 px-10 py-6 transition-colors duration-200',
                      'text-left text-gray-800',
                      'hover:bg-gray-50',
                      isSelected && 'bg-gray-100',
                      option.disabled && 'cursor-not-allowed opacity-50',
                    )}`}
                  >
                    {type === 'checkbox' && (
                      <div className="flex size-16 shrink-0 items-center justify-center">
                        {isSelected ? (
                          <CheckboxCheckedIcon className="size-16" />
                        ) : (
                          <CheckboxCheckedGrayIcon className="size-16" />
                        )}
                      </div>
                    )}
                    <span className="flex-1 truncate text-left">
                      {option.label}
                    </span>
                    {type === 'list' && isSelected && (
                      <CheckIcon className="size-16 shrink-0 text-primary-500" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export { Dropdown }
