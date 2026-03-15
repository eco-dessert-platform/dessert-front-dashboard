import * as React from 'react'
import { SVGProps, useId } from 'react'

const RotateCwIcon = ({
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
        d="M10.577 5.149c2.83-.59 5.696.606 7.256 2.955V5.586a.584.584 0 0 1 1.167 0v4.01a.583.583 0 0 1-.583.583h-4.01a.583.583 0 1 1 0-1.166h2.62c-1.296-2.202-3.925-3.317-6.48-2.661a5.837 5.837 0 0 0-4.111 7.4 5.834 5.834 0 0 0 11.348-.992.584.584 0 0 1 1.157.151 6.999 6.999 0 1 1-8.684-7.688l.32-.074Z"
      />
    </svg>
  )
}
export default RotateCwIcon
