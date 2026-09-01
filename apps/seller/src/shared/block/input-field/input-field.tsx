import { InputHTMLAttributes } from 'react'

import { cn } from '@dessert/core'
import { Button, Input, Label } from '@dessert/ui'


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  helperText?: string
  buttonText: string
  onButtonClick: () => void
  error?: boolean
  errorMessage?: string
  layout?: 'vertical' | 'horizontal'
}

/**
 * @deprecated `widgets` 폴더로 이동되었습니다.
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `@/widgets` 폴더에 구현된 컴포넌트를 사용해주세요.
 */
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
  className,
  ...restProps
}: InputFieldProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <div
      className={cn(
        'flex w-full gap-6',
        isHorizontal ? 'flex-row items-start gap-8' : 'flex-col',
        className,
      )}
    >
      <Label
        label={label}
        required={required}
        className={cn(isHorizontal && 'mt-[9px] w-20 shrink-0')}
      />

      <div className="flex grow flex-col gap-6">
        <div className="flex w-full items-center gap-8">
          <Input
            className="w-full"
            placeholder={placeholder}
            error={error}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...restProps}
          />
          <Button
            title={buttonText}
            size="md"
            onClick={onButtonClick}
            disabled={disabled || !value?.toString().trim()}
            className="whitespace-nowrap"
          />
        </div>

        {error && errorMessage ? (
          <span className="typo-body-12-r text-error-500">{errorMessage}</span>
        ) : (
          helperText && (
            <span className="typo-body-12-r text-gray-500">{helperText}</span>
          )
        )}
      </div>
    </div>
  )
}
