import { ReactNode } from 'react'

interface LabelProps {
  label: ReactNode
  required?: boolean
  className?: string
}

/**
 * @deprecated
 * 리팩토링 기간 이후 이 컴포넌트는 삭제될 예정입니다.
 * 새로운 코드에서는 `LabelV2` 컴포넌트를 사용해주세요.
 */
const Label = ({ label, required = false, className = '' }: LabelProps) => {
  return (
    <label className={`typo-body-12-r text-gray-800 ${className}`}>
      {label}
      {required && (
        <span className="text-primary-500" aria-label="필수">
          *
        </span>
      )}
    </label>
  )
}

export { Label }
