import * as React from 'react'
import { SVGProps, useId } from 'react'

const ThumbUpIcon = ({
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
        fillRule="evenodd"
        d="M13.412 4.4c.657 0 1.288.26 1.754.724a2.47 2.47 0 0 1 .729 1.75v4.087h2.222c.658 0 1.29.26 1.755.724a2.47 2.47 0 0 1 .728 1.75c0 .04-.004.079-.012.118l-.94 4.686-.005.02c-.155.658-.457 1.26-.892 1.694-.428.427-.98.676-1.574.642h-6.59a3.43 3.43 0 0 1-2.349-.93 1.539 1.539 0 0 1-1.415.93H4.941A1.536 1.536 0 0 1 3.4 19.059v-6.56a1.535 1.535 0 0 1 1.541-1.537h2.824c.84 0 1.645-.333 2.238-.924.593-.59.927-1.391.927-2.225v-.938c0-.657.262-1.286.727-1.75a2.488 2.488 0 0 1 1.755-.724Zm0 1.2c-.34 0-.668.135-.908.375a1.27 1.27 0 0 0-.374.899v.938c0 1.154-.46 2.26-1.28 3.076a4.371 4.371 0 0 1-2.486 1.23v5.066c0 .585.234 1.148.65 1.563a2.23 2.23 0 0 0 1.574.648h6.589l.05.003c.201.016.44-.058.677-.296.244-.242.455-.628.57-1.119l.924-4.596a1.27 1.27 0 0 0-.373-.852 1.288 1.288 0 0 0-.908-.375h-2.823a.6.6 0 0 1-.6-.6V6.874c0-.337-.135-.66-.375-.9a1.287 1.287 0 0 0-.907-.374Zm-8.47 6.56a.344.344 0 0 0-.243.1.337.337 0 0 0-.1.238v6.56c0 .09.037.175.1.238.064.063.151.1.242.1h1.882a.344.344 0 0 0 .242-.1.336.336 0 0 0 .1-.237V12.16H4.941Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
export default ThumbUpIcon
