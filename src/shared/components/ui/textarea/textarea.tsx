import Label from '@/shared/components/ui/label/label'
import { cn } from '@/shared/lib/utils'

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
            'text-title-16-r flex min-h-[100px] w-full resize-none items-start gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400',
            error && 'border-red-500',
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
        <span className="text-body-12-r text-red-500">{errorMessage}</span>
      )}
      {!error && helperText && (
        <span className="text-body-12-r text-gray-500">{helperText}</span>
      )}
    </div>
  )
}

export default Textarea
