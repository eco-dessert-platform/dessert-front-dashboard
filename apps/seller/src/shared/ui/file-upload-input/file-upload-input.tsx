import { Input } from '@dessert/ui'
import { useRef } from 'react'

interface FileUploadInputProps {
  label?: string
  required?: boolean
  placeholder: string
  buttonText?: string
  reuploadButtonText?: string
  helperText?: string
  value?: string
  onChange?: (file: File | null) => void
  disabled?: boolean
}

export function FileUploadInput({
  label,
  required = false,
  placeholder,
  buttonText = '업로드',
  reuploadButtonText = '재업로드',
  helperText,
  value,
  onChange,
  disabled = false,
}: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const hasFile = !!value
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange?.(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col items-start gap-4 self-stretch">
      {label && (
        <label className="typo-body-12-r text-gray-800">
          {label}
          {required && (
            <span className="text-primary-500" aria-label="필수">
              *
            </span>
          )}
        </label>
      )}
      <div className="flex items-start gap-16 self-stretch">
        <Input
          className="flex-1"
          placeholder={placeholder}
          value={value}
          readOnly
          disabled={disabled}
        />
        <button
          className="flex min-w-[90px] cursor-pointer items-center justify-center rounded-10 border border-primary-500 bg-primary-500 px-16 py-8 disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          <span className="typo-title-16-m text-white">
            {hasFile ? reuploadButtonText : buttonText}
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {helperText && (
        <span className="typo-body-12-r text-gray-500">{helperText}</span>
      )}
    </div>
  )
}
