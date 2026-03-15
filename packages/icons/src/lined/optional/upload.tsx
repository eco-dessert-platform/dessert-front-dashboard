import * as React from 'react'
import { SVGProps, useId } from 'react'

const UploadIcon = ({
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
        d="M19.032 14.547c.369 0 .668.299.668.667v2.005a2.671 2.671 0 0 1-2.67 2.673H7.667A2.669 2.669 0 0 1 5 17.22v-2.005a.668.668 0 0 1 1.336 0v2.005c0 .74.596 1.337 1.332 1.337h9.361c.738 0 1.335-.598 1.335-1.337v-2.005c0-.368.3-.667.668-.667Z"
      />
      <path
        fill="#212121"
        d="M11.925 4.175a.602.602 0 0 1 .85 0l4.01 4.008a.602.602 0 0 1-.851.85l-2.982-2.98v9.24a.602.602 0 0 1-1.203 0V6.05L8.766 9.034a.601.601 0 0 1-.851-.85l4.01-4.01Z"
      />
    </svg>
  )
}
export default UploadIcon
