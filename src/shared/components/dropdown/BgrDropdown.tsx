import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

interface BgrDropdownOption {
    label: string
    value: string
    disabled?: boolean
}

interface BgrDropdownProps {
    options: BgrDropdownOption[]
    value?: string
    placeholder?: string
    disabled?: boolean
    type?: 'list' | 'checkbox'
    className?: string
    onSelect?: (value: string) => void
}

const BgrDropdown = ({
    options,
    value,
    placeholder = '선택하세요',
    disabled = false,
    type = 'list',
    className = '',
    onSelect,
}: BgrDropdownProps) => {
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

    const handleSelect = (option: BgrDropdownOption) => {
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
                className={`text-title-16-r ${cn(
                    'flex h-input w-full items-center justify-between rounded-input border px-input-px py-input-py transition-all duration-200',
                    'text-gray-900',
                    'border-gray-300 bg-white',
                    'font-pretendard hover:border-gray-400 focus:border-gray-500 focus:outline-none',
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
                <ChevronDown
                    className={cn(
                        'h-5 w-5 shrink-0 text-gray-600 transition-transform duration-200',
                        isOpen && 'rotate-180',
                    )}
                />
            </button>

            {isOpen && (
                <div
                    className={cn(
                        'z-dropdown absolute left-0 mt-1 w-full p-1',
                        'rounded-input border border-gray-200 bg-white shadow-md',
                        'animate-in fade-in zoom-in-95 duration-200',
                    )}
                >
                    <ul className="max-h-[240px] overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = option.value === value
                            return (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        disabled={option.disabled}
                                        onClick={() => handleSelect(option)}
                                        className={`text-title-14-r ${cn(
                                            'flex h-[38px] w-full items-center gap-2 rounded-sm px-[10px] py-[6px] transition-colors duration-200',
                                            'text-left text-gray-800',
                                            'hover:bg-gray-50',
                                            isSelected && 'bg-gray-100',
                                            option.disabled &&
                                            'cursor-not-allowed opacity-50',
                                        )}`}
                                    >
                                        {type === 'checkbox' && (
                                            <div
                                                className={cn(
                                                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
                                                    isSelected
                                                        ? 'border-primary-500 bg-primary-500'
                                                        : 'border-gray-200 bg-gray-100',
                                                )}
                                            >
                                                {isSelected && (
                                                    <Check
                                                        className="h-3 w-3 text-white"
                                                        strokeWidth={3}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <span className="flex-1 truncate">
                                            {option.label}
                                        </span>
                                        {type === 'list' && isSelected && (
                                            <Check className="text-primary-500 h-4 w-4 shrink-0" />
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

export default BgrDropdown
