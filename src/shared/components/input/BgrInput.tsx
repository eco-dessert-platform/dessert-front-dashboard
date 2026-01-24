import { Input } from 'src/shared/lib/shadcn/components/ui/input.tsx'
import BgrLabel from '../label/BgrLabel'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

interface BgrInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    required?: boolean
    helperText?: string
    error?: boolean
    errorMessage?: string
}

const BgrInput = ({
    label,
    required = false,
    placeholder,
    value,
    onChange,
    disabled = false,
    type = 'text',
    error,
    errorMessage,
    helperText,
    className = '',
    maxLength,
    ...restProps
}: BgrInputProps) => {
    return (
        <div
            className={cn(
                'flex flex-col items-start gap-1.5 self-stretch',
                className,
            )}
        >
            {label && <BgrLabel label={label} required={required} />}
            <div className="relative w-full">
                <Input
                    type={type}
                    className={`text-title-16-r ${cn(
                        'flex h-input items-center gap-input-gap rounded-input border border-gray-300 bg-white px-input-px py-input-py text-gray-900 transition-all duration-200 placeholder:text-gray-400',
                        'focus-visible:border-gray-800 focus-visible:ring-4 focus-visible:ring-gray-600/40 focus-visible:ring-offset-0',
                        'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
                        error &&
                        'border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/40',
                        maxLength && 'pr-14',
                    )}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    maxLength={maxLength}
                    {...restProps}
                />
                {maxLength && (
                    <span className="text-body-12-r absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                        {String(value || '').length}/{maxLength}
                    </span>
                )}
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
    )
}

export default BgrInput
