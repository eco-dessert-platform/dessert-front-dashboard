import BgrButton from '../button/BgrButton.tsx'
import BgrInput from '../input/BgrInput.tsx'
import BgrLabel from '../label/BgrLabel.tsx'
import { InputHTMLAttributes } from 'react'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

interface BgrInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    required?: boolean
    helperText?: string
    buttonText: string
    onButtonClick: () => void
    error?: boolean
    errorMessage?: string
    layout?: 'vertical' | 'horizontal'
}

export default function BgrInputField({
    label,
    required,
    placeholder,
    helperText,
    buttonText,
    onButtonClick,
    error,
    errorMessage,
    value,
    onChange,
    layout = 'vertical',
    disabled,
    className,
    ...restProps
}: BgrInputFieldProps) {
    const isHorizontal = layout === 'horizontal'

    return (
        <div
            className={cn(
                'flex w-full gap-1.5',
                isHorizontal ? 'flex-row items-start gap-2' : 'flex-col',
                className,
            )}
        >
            {label && (
                <BgrLabel
                    label={label}
                    required={required}
                    className={cn(isHorizontal && 'mt-[9px] w-[80px] shrink-0')}
                />
            )}

            <div className="flex grow flex-col gap-1.5">
                <div className="flex w-full items-center gap-2">
                    <BgrInput
                        className="w-full"
                        placeholder={placeholder}
                        error={error}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        {...restProps}
                    />
                    <BgrButton
                        title={buttonText}
                        size="md"
                        onClick={onButtonClick}
                        disabled={disabled || !value?.toString().trim()}
                        className="whitespace-nowrap"
                    />
                </div>

                {error && errorMessage ? (
                    <span className="text-body-12-r text-error-500">
                        {errorMessage}
                    </span>
                ) : (
                    helperText && (
                        <span className="text-body-12-r text-gray-500">
                            {helperText}
                        </span>
                    )
                )}
            </div>
        </div>
    )
}
