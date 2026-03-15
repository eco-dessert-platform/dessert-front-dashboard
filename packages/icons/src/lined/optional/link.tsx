import * as React from 'react'
import { SVGProps, useId } from 'react'

const LinkIcon = ({
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
        d="M11.325 8.73a3.946 3.946 0 0 1 2.79 1.156.601.601 0 0 1-.85.85 2.744 2.744 0 0 0-3.88 0l-3.38 3.38a2.743 2.743 0 0 0 3.88 3.878l.012-.012.317-.3a.601.601 0 0 1 .827.873l-.306.288v.001A3.947 3.947 0 0 1 4 16.055c0-1.046.416-2.05 1.156-2.79l3.379-3.38a3.946 3.946 0 0 1 2.79-1.155Z"
      />
      <path
        fill="#212121"
        d="M16.054 4a3.947 3.947 0 0 1 2.925 6.594l-.135.142-3.378 3.38a3.945 3.945 0 0 1-5.58 0 .602.602 0 0 1 .85-.85 2.744 2.744 0 0 0 3.88 0l3.377-3.38a2.744 2.744 0 0 0-3.879-3.88l-.014.013-1.014.949a.6.6 0 0 1-.821-.878l1.014-.948A3.946 3.946 0 0 1 16.054 4Z"
      />
    </svg>
  )
}
export default LinkIcon
