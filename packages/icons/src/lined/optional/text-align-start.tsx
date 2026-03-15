import * as React from 'react'
import { SVGProps, useId } from 'react'

const TextAlignStartIcon = ({
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
        d="M4.875 18.35a.65.65 0 0 0 0 1.3h12.25a.65.65 0 0 0 0-1.3H4.875ZM4.875 14.85a.65.65 0 0 0 0 1.3h7a.65.65 0 0 0 0-1.3h-7ZM4.875 11.35a.65.65 0 0 0 0 1.3h12.25a.65.65 0 0 0 0-1.3H4.875ZM4.875 7.85a.65.65 0 0 0 0 1.3h7a.65.65 0 0 0 0-1.3h-7ZM4.875 4.35a.65.65 0 0 0 0 1.3h12.25a.65.65 0 0 0 0-1.3H4.875Z"
      />
    </svg>
  )
}
export default TextAlignStartIcon
