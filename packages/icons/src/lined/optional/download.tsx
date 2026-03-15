import * as React from 'react'
import { SVGProps, useId } from 'react'

const DownloadIcon = ({
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
        d="M19.032 14.653c.37 0 .668.3.668.668v2.005A2.671 2.671 0 0 1 17.03 20H7.667A2.669 2.669 0 0 1 5 17.326v-2.005a.668.668 0 0 1 1.336 0v2.005c0 .74.596 1.337 1.332 1.337h9.361c.738 0 1.335-.598 1.335-1.337v-2.005c0-.369.3-.668.668-.668Z"
      />
      <path
        fill="currentColor"
        d="M12.35 5c.333 0 .602.27.602.602v9.24l2.982-2.982a.601.601 0 0 1 .85.85l-4.009 4.01a.601.601 0 0 1-.85 0l-4.01-4.01a.602.602 0 0 1 .85-.85l2.984 2.984V5.602c0-.333.27-.602.602-.602Z"
      />
    </svg>
  )
}
export default DownloadIcon
