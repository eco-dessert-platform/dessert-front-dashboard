import * as React from 'react'
import { SVGProps, useId } from 'react'

const CheckIcon = ({
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
      width={24}
      height={24}
      fill="none"
      role="img"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}

      <path
        fill="currentColor"
        d="M17.97 7.47a.75.75 0 1 1 1.06 1.06l-8.333 8.333a.75.75 0 0 1-1.06 0L5.47 12.697a.75.75 0 0 1 1.06-1.06l3.636 3.636L17.97 7.47Z"
      />
    </svg>
  )
}
export default CheckIcon
