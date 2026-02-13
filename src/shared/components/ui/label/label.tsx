import { ReactNode } from 'react'

interface LabelProps {
  label: ReactNode
  required?: boolean
  className?: string
}

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

export default Label
