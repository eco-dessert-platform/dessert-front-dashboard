import clsx from 'clsx'
import RadioOnIcon from 'src/assets/icons/icon-radio-on.svg?react'
import RadioOffIcon from 'src/assets/icons/icon-radio-off.svg?react'

interface BgrRadioOption {
    label: string
    value: string
    disabled?: boolean
}

export interface BgrRadioProps {
    options: BgrRadioOption[]
    value?: string
    name: string
    direction?: 'horizontal' | 'vertical'
    className?: string
    onChange?: (value: string) => void
    size?: 'm' | 'l'
}

const BgrRadio = ({
    options,
    value,
    name,
    direction = 'horizontal',
    className = '',
    onChange,
    size = 'l',
}: BgrRadioProps) => {
    return (
        <div
            className={clsx(
                'flex gap-2',
                direction === 'vertical' && 'flex-col',
                className,
            )}
            role="radiogroup"
        >
            {options.map((option) => (
                <label
                    key={option.value}
                    className={clsx(
                        'flex cursor-pointer items-center gap-2',
                        option.disabled && 'cursor-not-allowed opacity-50',
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
                        <RadioOnIcon className="h-4 w-4 shrink-0" />
                    ) : (
                        <RadioOffIcon className="h-4 w-4 shrink-0" />
                    )}
                    <span
                        className={clsx(
                            'text-gray-800',
                            size === 'l' ? 'text-title-16-r' : 'text-body-12-r',
                        )}
                    >
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    )
}

export default BgrRadio
