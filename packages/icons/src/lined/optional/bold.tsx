import * as React from 'react'
import { SVGProps, useId } from 'react'

const BoldIcon = ({
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
        d="M11.049 4c2.164 0 3.786.266 4.868.888 1.172.622 1.713 1.687 1.713 3.197 0 .888-.27 1.688-.63 2.31-.205.303-.47.562-.78.76a2.73 2.73 0 0 1-1.024.394c.515.119 1.004.33 1.443.622.36.266.72.71.991 1.154.283.644.406 1.344.36 2.043a4.032 4.032 0 0 1-.356 1.868 4.093 4.093 0 0 1-1.176 1.507 6.927 6.927 0 0 1-4.417 1.243H6V4h5.049Zm.36 6.306c.992 0 1.713-.09 2.074-.444.45-.267.631-.8.631-1.333 0-.621-.27-1.065-.721-1.332-.45-.266-1.172-.444-2.164-.444H9.426v3.553h1.983ZM9.426 12.97v4.352h2.254c.992 0 1.803-.267 2.164-.622.45-.444.63-.888.63-1.598a1.754 1.754 0 0 0-.63-1.421c-.451-.356-1.172-.533-2.254-.533H9.336l.09-.178Z"
      />
    </svg>
  )
}
export default BoldIcon
