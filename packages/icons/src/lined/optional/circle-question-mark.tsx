import * as React from 'react'
import { SVGProps, useId } from 'react'

const CircleQuestionMarkIcon = ({
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
        d="M12.008 15.4a.6.6 0 1 1 0 1.2H12a.6.6 0 1 1 0-1.2h.008ZM10.416 7.81a3.001 3.001 0 0 1 4.52 2.59c0 1.118-.831 1.875-1.467 2.3a6.237 6.237 0 0 1-1.216.623l-.089.032-.026.01-.008.002-.003.001-.001.001a.601.601 0 0 1-.38-1.139h.001l.015-.005.063-.024a5.042 5.042 0 0 0 .977-.501c.565-.376.934-.82.934-1.3a1.802 1.802 0 0 0-2.713-1.555 1.8 1.8 0 0 0-.785.954.6.6 0 0 1-1.133-.399c.236-.668.7-1.231 1.311-1.59Z"
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
export default CircleQuestionMarkIcon
