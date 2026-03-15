import * as React from 'react'
import { SVGProps, useId } from 'react'

const MinusIcon = ({
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
        d="M18.4 11c.332 0 .6.337.6.751s-.269.749-.6.749H5.6c-.331 0-.6-.335-.6-.749s.268-.75.6-.751h12.8Z"
      />
    </svg>
  )
}
export default MinusIcon
