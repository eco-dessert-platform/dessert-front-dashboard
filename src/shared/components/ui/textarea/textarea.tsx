import Label from '@/shared/components/ui/label/label'
import { cn } from '@/shared/lib/utils'
import { formFieldBase } from '@/shared/styles/form-control.styles'

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
  maxLength?: number
  showCount?: boolean
}

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
            'min-h-[100px] resize-none items-start gap-1.5 rounded-[10px] px-3 py-2',
            error &&
              'border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/40',
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          {...restProps}
        />
        {showCount && maxLength && (
          <div className="text-body-10-r absolute right-3 bottom-2 text-gray-400">
            <span className={currentLength > maxLength ? 'text-red-500' : ''}>
              {currentLength}
            </span>
            /{maxLength}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <span className="text-body-12-r text-error-500">{errorMessage}</span>
      )}
      {!error && helperText && (
        <span className="text-body-12-r text-gray-500">{helperText}</span>
      )}
    </div>
  )
}

export default Textarea
