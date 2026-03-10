import Button from '@/shared/components/ui/button/button'
import Input from '@/shared/components/ui/input/input'
import Label from '@/shared/components/ui/label/label'
import { cn } from '@/shared/lib/utils'
import { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  helperText?: string
  buttonText?: string
  onButtonClick: () => void
  error?: boolean
  errorMessage?: string
  layout?: 'vertical' | 'horizontal'
  readOnly?: boolean
}

export default function InputField({
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
  readOnly,
  className,
  ...restProps
}: InputFieldProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <div
      className={cn(
        'flex w-full gap-1.5',
        isHorizontal ? 'flex-row items-start gap-2' : 'flex-col',
        className,
      )}
    >
      <Label
        label={label}
        required={required}
        className={cn(isHorizontal && 'mt-[9px] w-20 shrink-0')}
      />

      <div className="flex grow flex-col gap-1.5">
        <div className="flex w-full items-center gap-8">
          <Input
            className="w-full"
            placeholder={placeholder}
            error={error}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            {...restProps}
          />
          {buttonText && (
            <Button
              title={buttonText}
              size="md"
              onClick={onButtonClick}
              disabled={disabled}
              className="whitespace-nowrap"
            />
          )}
        </div>

        {error && errorMessage ? (
          <span className="text-body-12-r text-error-500">{errorMessage}</span>
        ) : (
          helperText && (
            <span className="typo-body-12-r text-gray-500">{helperText}</span>
          )
        )}
      </div>
    </div>
  )
}
