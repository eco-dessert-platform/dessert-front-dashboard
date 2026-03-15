import * as React from 'react'
import { SVGProps, useId } from 'react'

const XIcon = ({
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
      viewBox="0 0 24 24"
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
        d="M16.862 6.195a.667.667 0 1 1 .943.943L12.943 12l4.862 4.862a.666.666 0 1 1-.943.943L12 12.943l-4.862 4.862a.666.666 0 1 1-.943-.943L11.057 12 6.195 7.138a.667.667 0 1 1 .943-.943L12 11.057l4.862-4.862Z"
      />
    </svg>
  )
}
export default XIcon
