import { RadioCheckedIcon, RadioDefaultIcon } from '@dessert/icons'

import { cn } from '../lib/utils'

interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioProps {
  options: readonly RadioOption[]
  value?: string
  name: string
  direction?: 'horizontal' | 'vertical'
  className?: string
  labelClassName?: string // 개별 선택지 라벨 커스텀용
  onChange?: (value: string) => void
  size?: 'md' | 'lg'
}

const Radio = ({
  options,
  value,
  name,
  direction = 'horizontal',
  className = '',
  labelClassName = '',
  onChange,
  size = 'lg',
}: RadioProps) => {
  return (
    <div
      className={cn(
        `flex gap-2 ${direction === 'vertical' ? 'flex-col' : ''}`,
        className,
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            `flex items-center gap-2`,
            option.disabled
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer',
            labelClassName,
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onChange?.(option.value)}
            className="sr-only"
          />
          {value === option.value ? (
            <RadioCheckedIcon className="size-16 shrink-0" />
          ) : (
            <RadioDefaultIcon className="size-16 shrink-0" />
          )}
          <span
            className={`text-gray-800 ${
              size === 'lg' ? 'typo-title-16-r' : 'typo-body-12-r'
            }`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}

export { Radio }
