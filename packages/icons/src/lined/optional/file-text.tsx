import * as React from 'react'
import { SVGProps, useId } from 'react'

const FileTextIcon = ({
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
        d="M14.008 14.715a.6.6 0 0 1 0 1.2H9.162a.6.6 0 0 1 0-1.2h4.846ZM12.173 11.347a.6.6 0 0 1 0 1.2H9.16a.6.6 0 0 1 0-1.2h3.012Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14.286 3.411h.125l.12.012a.6.6 0 0 1 .313.173l4.545 4.733a.601.601 0 0 1 .167.416v8.22l-.003.206a4.089 4.089 0 0 1-3.92 3.908H8.347A4.035 4.035 0 0 1 4.4 16.97V7.344a4.027 4.027 0 0 1 4.04-3.93l5.623-.002a.605.605 0 0 1 .222 0Zm-5.848 1.2a2.828 2.828 0 0 0-2.837 2.76v9.612a2.836 2.836 0 0 0 2.771 2.897h7.214a2.888 2.888 0 0 0 2.77-2.905V9.52h-1.878a2.91 2.91 0 0 1-2.902-2.91v-2H8.438Zm6.337 2a1.71 1.71 0 0 0 1.706 1.71h1.238l-2.944-3.065V6.61Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default FileTextIcon
