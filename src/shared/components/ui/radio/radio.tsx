import RadioOffIcon from '@/assets/icons/icon-radio-off.svg?react'
import RadioOnIcon from '@/assets/icons/icon-radio-on.svg?react'
import { cn } from '@/shared/lib/utils'

interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioProps {
  options: RadioOption[]
  value?: string
  name: string
  direction?: 'horizontal' | 'vertical'
  className?: string
  onChange?: (value: string) => void
  size?: 'md' | 'lg'
}

const Radio = ({
  options,
  value,
  name,
  direction = 'horizontal',
  className = '',
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
          className={`flex items-center gap-2 ${
            option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
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
            <RadioOnIcon className="h-16 w-16 shrink-0" />
          ) : (
            <RadioOffIcon className="h-16 w-16 shrink-0" />
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

export default Radio
