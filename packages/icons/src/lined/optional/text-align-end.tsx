import * as React from 'react'
import { SVGProps, useId } from 'react'

const TextAlignEndIcon = ({
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
        d="M19.125 18.35a.65.65 0 0 1 0 1.3H6.875a.65.65 0 0 1 0-1.3h12.25ZM19.125 14.85a.65.65 0 0 1 0 1.3h-7a.65.65 0 0 1 0-1.3h7ZM19.125 11.35a.65.65 0 0 1 0 1.3H6.875a.65.65 0 0 1 0-1.3h12.25ZM19.125 7.85a.65.65 0 0 1 0 1.3h-7a.65.65 0 0 1 0-1.3h7ZM19.125 4.35a.65.65 0 0 1 0 1.3H6.875a.65.65 0 0 1 0-1.3h12.25Z"
      />
    </svg>
  )
}
export default TextAlignEndIcon
