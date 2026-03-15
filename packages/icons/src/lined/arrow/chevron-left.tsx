import * as React from 'react'
import { SVGProps, useId } from 'react'

const ChevronLeftIcon = ({
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
        fillRule="evenodd"
        d="M13.999 5a.6.6 0 0 1 .556.396.675.675 0 0 1-.129.692L8.843 12.1l5.583 6.011c.112.12.173.282.173.45a.661.661 0 0 1-.173.449.584.584 0 0 1-.427.19.582.582 0 0 1-.427-.19l-6-6.461a.674.674 0 0 1 0-.898l6-6.462a.57.57 0 0 1 .427-.19Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default ChevronLeftIcon
