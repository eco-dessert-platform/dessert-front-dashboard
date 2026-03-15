import * as React from 'react'
import { SVGProps, useId } from 'react'

const CheckboxCheckedIcon = ({
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) => {
  const titleId = useId()
  const hasLabel = Boolean(title || ariaLabel || ariaLabelledBy)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      role="img"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}

      <path
        fill="#F04C28"
        stroke="#F04C28"
        d="M4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4A3.5 3.5 0 0 1 4 .5Z"
      />
      <path
        fill="#fff"
        d="M11.98 4.98a.5.5 0 1 1 .707.707l-5.555 5.555a.5.5 0 0 1-.707 0L3.647 8.465a.5.5 0 0 1 .707-.707l2.423 2.424L11.98 4.98Z"
      />
    </svg>
  )
}
export default CheckboxCheckedIcon
