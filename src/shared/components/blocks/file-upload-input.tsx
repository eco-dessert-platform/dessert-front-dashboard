import Input from '@/shared/components/ui/input/input'

interface FileUploadInputProps {
  label?: string
  required?: boolean
  placeholder: string
  buttonText?: string
  helperText?: string
  value?: string
  onChange?: (file: File | null) => void
  disabled?: boolean
}

const FileUploadInput = ({
  label,
  required = false,
  placeholder,
  buttonText = '업로드',
  helperText,
  value,
  onChange,
  disabled = false,
}: FileUploadInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange?.(file)
  }

  return (
    <div className="flex flex-col items-start gap-1 self-stretch">
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
      <div className="flex items-start gap-4 self-stretch">
        <Input
          className="flex flex-1 items-center gap-1.5 rounded-10 border border-gray-300 px-3 py-2 typo-title-16-r text-gray-800 placeholder:text-gray-400"
          placeholder={placeholder}
          value={value}
          readOnly
          disabled={disabled}
        />
        <button
          className="flex min-w-[90px] cursor-pointer items-center justify-center rounded-10 border border-gray-300 bg-gray-300 px-4 py-2 disabled:cursor-not-allowed"
          disabled={disabled}
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.jpg,.jpeg,.png,.pdf'
            input.onchange = handleFileChange as () => void
            input.click()
          }}
        >
          <span className="typo-title-16-m text-white">{buttonText}</span>
        </button>
      </div>
      {helperText && (
        <span className="typo-body-12-r text-gray-500">{helperText}</span>
      )}
    </div>
  )
}

export default FileUploadInput
