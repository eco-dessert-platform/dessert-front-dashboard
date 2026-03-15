import * as React from 'react'
import { SVGProps, useId } from 'react'

const StrikethroughIcon = ({
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
        d="M17.735 4.3a.7.7 0 0 1 .7.7v1.974a.7.7 0 0 1-1.4 0V5.7h-4.39v6.541h6.414a.7.7 0 0 1 0 1.4h-6.415V20a.7.7 0 0 1-1.399 0v-6.358H4.941a.7.7 0 0 1 0-1.4h6.304V5.7h-4.28v1.274a.7.7 0 0 1-1.4 0V5a.7.7 0 0 1 .7-.7h11.47Z"
      />
    </svg>
  )
}
export default StrikethroughIcon
