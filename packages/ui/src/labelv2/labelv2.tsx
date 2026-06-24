import { ComponentPropsWithoutRef } from 'react'

interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  required?: boolean
}

const LabelV2 = ({
  children,
  required = false,
  className = '',
  ...props
}: LabelProps) => {
  return (
    <label
      className={`typo-body-12-r text-gray-800 inline-flex items-center gap-1 ${className}`}
      {...props}
    >
      {children}
      {required && (
        <span className="text-primary-500" aria-label="필수">
          *
        </span>
      )}
    </label>
  )
}

export { LabelV2 }
