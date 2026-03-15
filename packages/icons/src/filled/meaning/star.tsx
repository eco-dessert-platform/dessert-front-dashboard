import * as React from 'react'
import { SVGProps, useId } from 'react'

const StarIcon = ({
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
        fill="#E0E0E0"
        d="m9.518 8.83-4.936.705-.087.018a.777.777 0 0 0-.55.544.75.75 0 0 0 .21.74l3.575 3.428-.843 4.844-.01.083a.753.753 0 0 0 .353.686.782.782 0 0 0 .78.034l4.414-2.287 4.405 2.287.078.035a.786.786 0 0 0 .771-.118.762.762 0 0 0 .275-.72l-.845-4.844 3.578-3.43.06-.064a.756.756 0 0 0-.12-1.077.78.78 0 0 0-.37-.158L15.32 8.83l-2.206-4.405a.782.782 0 0 0-1.388 0L9.518 8.83Z"
      />
    </svg>
  )
}
export default StarIcon
