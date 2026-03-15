import * as React from 'react'
import { SVGProps, useId } from 'react'

const TrashIcon = ({
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
        d="M9.954 10.187c.452 0 .818.354.818.79v6.14c0 .436-.366.79-.818.79a.804.804 0 0 1-.817-.79v-6.14c0-.436.366-.79.817-.79ZM14.046 10.187c.452 0 .817.354.817.79v6.14c0 .436-.365.79-.817.79a.804.804 0 0 1-.818-.79v-6.14c0-.436.366-.79.818-.79Z"
      />
      <path
        fill="#212121"
        fillRule="evenodd"
        d="M14.046 2c.498 0 .969.198 1.311.541.342.342.529.8.53 1.27v2.282h4.295c.452 0 .818.354.818.79 0 .436-.366.79-.818.79h-.267l-.963 11.554a2.822 2.822 0 0 1-.826 1.933 2.877 2.877 0 0 1-2.035.84H7.91c-.77 0-1.5-.306-2.035-.84a2.821 2.821 0 0 1-.826-1.933L4.085 7.672h-.267C3.366 7.672 3 7.32 3 6.883c0-.436.366-.79.818-.79h4.296V3.812c0-.472.187-.93.529-1.271A1.854 1.854 0 0 1 9.954 2h4.092ZM6.678 19.101a.76.76 0 0 1 .003.063c0 .342.137.666.37.9.233.232.542.358.858.358h8.182c.316 0 .625-.126.858-.358.233-.234.37-.558.37-.9 0-.021 0-.042.003-.063l.952-11.429H5.726l.952 11.429ZM9.954 3.578a.192.192 0 0 0-.134.06.25.25 0 0 0-.07.174v2.28h4.5v-2.28a.25.25 0 0 0-.07-.175.204.204 0 0 0-.066-.045l-.068-.014H9.954Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default TrashIcon
