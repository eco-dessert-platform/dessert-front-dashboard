import Label from '@/shared/components/ui/label/label'
import { cn } from '@/shared/lib/utils'
import { formFieldBase } from '@/styles/form-control.styles'

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
          className={cn(
            formFieldBase,
            'h-input rounded-10 px-12 py-8 flex items-center',
            error &&
              'border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/40',
            maxLength && 'pr-14',
          )}
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
