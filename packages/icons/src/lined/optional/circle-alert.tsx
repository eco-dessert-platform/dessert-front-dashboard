import * as React from 'react'
import { SVGProps, useId } from 'react'

const CircleAlertIcon = ({
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
        d="M12.008 14.45a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1 0-1.5h.008ZM12 8.05a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-1.5 0V8.8a.75.75 0 0 1 .75-.75Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 3.4a8.6 8.6 0 0 1 8.6 8.6 8.6 8.6 0 0 1-8.6 8.6A8.6 8.6 0 0 1 3.4 12 8.6 8.6 0 0 1 12 3.4Zm0 1.2a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default CircleAlertIcon
