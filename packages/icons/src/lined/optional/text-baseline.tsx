import * as React from 'react'
import { SVGProps, useId } from 'react'

const TextBaselineIcon = ({
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
        d="M18.111 15.667a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-3.333a1 1 0 0 1-1-1v-3.333a1 1 0 0 1 1-1h3.333ZM16.444 4.3a.7.7 0 0 1 .7.7v1.988a.7.7 0 0 1-1.4 0V5.7H11.31v14.411a.7.7 0 1 1-1.399 0V5.701H5.59v1.287a.7.7 0 0 1-1.4 0V5a.7.7 0 0 1 .7-.7h11.555Z"
      />
    </svg>
  )
}
export default TextBaselineIcon
