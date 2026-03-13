import * as React from 'react'
import { SVGProps } from 'react'

const MinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M18.4 11c.332 0 .6.337.6.751s-.269.749-.6.749H5.6c-.331 0-.6-.335-.6-.749s.268-.75.6-.751h12.8Z"
    />
  </svg>
)
export default MinusIcon
