import * as React from 'react'
import { SVGProps, useId } from 'react'

const ItalicIcon = ({
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
        d="M19 4.3a.7.7 0 0 1 .64.981l-.866 1.974a.7.7 0 0 1-1.282-.563l.436-.992h-4.08l-3.683 13.6h2.741a.7.7 0 0 1 0 1.4H6a.7.7 0 0 1 0-1.4h2.715l3.683-13.6H8.19l-.682 1.555a.7.7 0 0 1-1.282-.563l.867-1.973.048-.091a.7.7 0 0 1 .592-.328H19Z"
      />
    </svg>
  )
}
export default ItalicIcon
