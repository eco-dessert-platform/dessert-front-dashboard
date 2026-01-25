import Label from '@/shared/components/ui/label/label'
import { cn } from '@/shared/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  helperText?: string
  error?: boolean
  errorMessage?: string
}

const Input = ({
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
}: InputProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-1.5 self-stretch',
        className,
      )}
    >
      {label && <Label label={label} required={required} />}
      <div className="relative w-full">
        <input
          type={type}
          className={`w-full text-title-16-r ${cn(
            'h-input gap-input-gap rounded-input px-input-px py-input-py flex items-center border border-gray-300 bg-white text-gray-900 transition-all duration-200 placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-1',
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
        <span className="text-body-12-r text-error-500">{errorMessage}</span>
      ) : (
        helperText && (
          <span className="text-body-12-r text-gray-500">{helperText}</span>
        )
      )}
    </div>
  )
}

export default Input
