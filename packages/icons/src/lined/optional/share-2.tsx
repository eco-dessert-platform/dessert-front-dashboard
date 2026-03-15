import * as React from 'react'
import { SVGProps, useId } from 'react'

const Share2Icon = ({
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
        d="M17 3.4a3 3 0 0 1 0 6c-.889 0-1.685-.389-2.234-1.004l-4.527 2.642c.103.303.161.627.161.964 0 .336-.058.658-.16.96l4.528 2.639a2.99 2.99 0 0 1 2.232-1 3 3 0 1 1-2.839 2.035l-4.527-2.638A2.989 2.989 0 0 1 7.4 15.002a3 3 0 0 1 0-6 2.99 2.99 0 0 1 2.232 1L14.16 7.36A2.99 2.99 0 0 1 14 6.4a3 3 0 0 1 3-3Zm0 12.4c-.638 0-1.199.333-1.519.835-.008.02-.016.04-.027.06-.013.022-.029.04-.044.06A1.801 1.801 0 1 0 17 15.8ZM7.4 10.2a1.801 1.801 0 1 0 .001 3.603 1.801 1.801 0 0 0 0-3.603ZM17 4.6a1.802 1.802 0 0 0-1.563 2.692l.01.013.002.006a1.798 1.798 0 0 0 3.35-.91A1.8 1.8 0 0 0 17 4.6Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default Share2Icon
