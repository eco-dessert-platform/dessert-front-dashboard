import * as React from 'react'
import { SVGProps, useId } from 'react'

const CircleAlertFilledIcon = ({
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
        fill="#EC0000"
        d="M12 3.4a8.6 8.6 0 0 1 8.6 8.6 8.6 8.6 0 0 1-8.6 8.6A8.6 8.6 0 0 1 3.4 12 8.6 8.6 0 0 1 12 3.4Zm-.001 11.702c-.55 0-.995.425-.995.95 0 .524.446.949.995.949h.01c.55 0 .995-.425.995-.95 0-.523-.446-.948-.995-.948h-.01Zm0-8.101c-.55 0-.995.425-.995.95V12c0 .524.446.95.995.95.55-.001.994-.426.994-.95v-4.05c0-.525-.445-.95-.994-.95Z"
      />
    </svg>
  )
}

export default CircleAlertFilledIcon
