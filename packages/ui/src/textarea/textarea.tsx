import { Label } from '../label/label'
import { cn } from '../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  placeholder?: string
  value?: string
  disabled?: boolean
  helperText?: string
  error?: boolean
  errorMessage?: string
  className?: string
  textareaClassName?: string
  maxLength?: number
  showCount?: boolean
}

const formFieldBase =
  'w-full typo-title-16-r border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400'

const Textarea = ({
  label,
  required = false,
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  errorMessage,
  helperText,
  className = '',
  textareaClassName = '',
  maxLength,
  showCount = false,
  ...restProps
}: TextareaProps) => {
  const currentLength = value?.toString().length || 0

  return (
    <div
      className={cn('flex flex-col items-start gap-1 self-stretch', className)}
    >
      {label && <Label label={label} required={required} />}
      <div className="relative w-full">
        <textarea
          className={cn(
            formFieldBase,
            'min-h-[100px] resize-none items-start gap-6 rounded-10 px-12 py-8 disabled:cursor-not-allowed',
            error &&
              'border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/40',
            textareaClassName,
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          {...restProps}
        />
        {showCount && maxLength && (
          <div className="absolute right-3 bottom-2 typo-body-10-r text-gray-400">
            <span className={currentLength > maxLength ? 'text-red-500' : ''}>
              {currentLength}
            </span>
            /{maxLength}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <span className="typo-body-12-r text-error-500">{errorMessage}</span>
      )}
      {!error && helperText && (
        <span className="typo-body-12-r text-gray-500">{helperText}</span>
      )}
    </div>
  )
}

export { Textarea }
