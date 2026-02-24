import Input from '@/shared/components/ui/input/input'
import Label from '@/shared/components/ui/label/label'

interface EmailInputProps {
  label?: string
  required?: boolean
  localPart?: string
  domain?: string
  onLocalPartChange?: (value: string) => void
  onDomainChange?: (value: string) => void
  disabled?: boolean
}

const EmailInput = ({
  label,
  required = false,
  localPart,
  domain,
  onLocalPartChange,
  onDomainChange,
  disabled = false,
}: EmailInputProps) => {
  return (
    <>
      <div className="flex flex-1/2 flex-col items-start gap-1">
        <Label label={label} required={required} />
        <Input
          className="flex flex-1 items-center gap-1.5 rounded-10 border border-gray-300 bg-white px-3 py-2 typo-title-16-r text-gray-800 placeholder:text-gray-400"
          placeholder="이메일 주소를 입력해주세요"
          value={localPart}
          onChange={(e) => onLocalPartChange?.(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="flex h-[42px] w-[15px] flex-col items-center justify-center gap-2.5">
        <p className="self-stretch typo-title-16-r text-gray-800">@</p>
      </div>

      <Input
        className="flex flex-1/2 items-center gap-1.5 rounded-10 border border-gray-300 bg-gray-100 px-3 py-2 typo-title-16-r text-gray-400"
        value={domain}
        onChange={(e) => onDomainChange?.(e.target.value)}
        disabled
      />

      <div className="flex min-w-[150px] flex-col items-start gap-1">
        <div className="flex w-[150px] cursor-pointer items-center gap-2 rounded-10 border border-gray-300 py-1 pr-2 pl-3">
          <p className="flex-1 typo-title-16-r text-gray-400">선택하세요</p>
        </div>
      </div>
    </>
  )
}

export default EmailInput
