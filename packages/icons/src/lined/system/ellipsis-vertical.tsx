import * as React from 'react'
import { SVGProps, useId } from 'react'

const EllipsisVerticalIcon = ({
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
        fill="#212121"
        d="M11.5 16a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 10a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
      />
    </svg>
  )
}
export default EllipsisVerticalIcon
