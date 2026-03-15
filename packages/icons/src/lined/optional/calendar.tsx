import * as React from 'react'
import { SVGProps, useId } from 'react'

const CalendarIcon = ({
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
        d="M18.222 5.7h-.889v-.85c0-.467-.4-.85-.889-.85-.488 0-.888.383-.888.85v.85H8.444v-.85c0-.467-.4-.85-.888-.85-.49 0-.89.383-.89.85v.85h-.888c-.987 0-1.77.765-1.77 1.7L4 19.3c0 .45.187.883.52 1.202A1.82 1.82 0 0 0 5.779 21h12.444C19.2 21 20 20.235 20 19.3V7.4c0-.935-.8-1.7-1.778-1.7Zm0 12.75c0 .468-.4.85-.889.85H6.667c-.49 0-.89-.383-.89-.85v-8.5h12.445v8.5Zm-10.666-6.8h1.777v1.7H7.556v-1.7Zm3.555 0h1.778v1.7H11.11v-1.7Zm3.556 0h1.777v1.7h-1.777v-1.7Z"
      />
    </svg>
  )
}
export default CalendarIcon
