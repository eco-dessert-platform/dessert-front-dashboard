import * as React from 'react'
import { SVGProps, useId } from 'react'

const LogOutIcon = ({
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
        d="M14.135 5a.595.595 0 1 1 0 1.189H6.189V17.81h7.946a.595.595 0 0 1 0 1.19H6.09A1.09 1.09 0 0 1 5 17.909V6.09C5 5.488 5.488 5 6.09 5h8.045Z"
      />
      <path
        fill="currentColor"
        d="M15.582 9.178a.595.595 0 0 1 .841 0l2.403 2.402a.595.595 0 0 1 0 .841l-2.403 2.402a.595.595 0 0 1-.841-.841l1.387-1.387H9.864a.596.596 0 0 1 0-1.19h7.105l-1.387-1.387a.595.595 0 0 1 0-.84Z"
      />
    </svg>
  )
}
export default LogOutIcon
