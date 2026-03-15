import * as React from 'react'
import { SVGProps, useId } from 'react'

const SearchIcon = ({
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
        d="M10.797 4a6.797 6.797 0 0 1 6.795 6.797 6.763 6.763 0 0 1-1.474 4.22l3.654 3.655a.778.778 0 0 1-1.1 1.1l-3.654-3.654a6.764 6.764 0 0 1-4.221 1.474 6.797 6.797 0 0 1 0-13.592Zm0 1.556a5.241 5.241 0 1 0 0 10.479 5.241 5.241 0 0 0 0-10.479Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default SearchIcon
