import * as React from 'react'
import { SVGProps, useId } from 'react'

const RadioCheckedIcon = ({
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
      viewBox="0 0 16 16"
      fill="none"
      role="img"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}

      <rect
        width={15}
        height={15}
        x={0.5}
        y={0.5}
        fill="#F04C28"
        stroke="#F04C28"
        rx={7.5}
      />
      <rect width={8} height={8} x={4} y={4} fill="#fff" rx={4} />
    </svg>
  )
}
export default RadioCheckedIcon
