import BgrButton from '../button/BgrButton.tsx'
import BgrInput from '../input/BgrInput.tsx'
import BgrLabel from '../label/BgrLabel.tsx'
import { InputHTMLAttributes } from 'react'

interface BgrInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    required?: boolean
    placeholder?: string
    helperText?: string
    buttonText: string
    onButtonClick: () => void
    error?: boolean
    errorMessage?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
}: BgrInputFieldProps) {
    return (
        <div className="flex w-full flex-col gap-1">
            {label && <BgrLabel label={label} required={required} />}
            <div className="flex w-full items-start gap-2 self-stretch">
                <BgrInput
                    className="w-full"
                    placeholder={placeholder}
                    error={error}
                    value={value}
                    onChange={onChange}
                />
                <BgrButton
                    title={buttonText}
                    size="md"
                    onClick={onButtonClick}
                    disabled={!value?.trim()}
                />
            </div>

            {error
                ? errorMessage && (
                      <span className="text-body-12-r text-error-500">
                          {errorMessage}
                      </span>
                  )
                : helperText && (
                      <span className="text-body-12-r text-gray-500">
                          {helperText}
                      </span>
                  )}
        </div>
    )
}
