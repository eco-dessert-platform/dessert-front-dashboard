import * as React from 'react'
import { SVGProps, useId } from 'react'

const CopyIcon = ({
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
        d="M17.622 8.666c.344 0 .622.279.622.622v7.333a3.29 3.29 0 0 1-3.289 3.29h-6a.622.622 0 0 1 0-1.245h6A2.045 2.045 0 0 0 17 16.621V9.288c0-.343.279-.622.622-.622Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.46 4c.696 0 1.362.277 1.854.769l1.496 1.494c.492.492.767 1.159.767 1.854v5.838a3.289 3.289 0 0 1-3.288 3.29h-4A3.29 3.29 0 0 1 5 13.954V7.29A3.29 3.29 0 0 1 8.29 4h3.17ZM8.29 5.244A2.045 2.045 0 0 0 6.243 7.29v6.666c0 1.13.916 2.045 2.045 2.045h4a2.045 2.045 0 0 0 2.044-2.045V8.4h-1.821a1.78 1.78 0 0 1-1.778-1.777V5.244H8.29Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default CopyIcon
