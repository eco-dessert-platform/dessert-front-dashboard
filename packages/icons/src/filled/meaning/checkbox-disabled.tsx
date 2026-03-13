import * as React from 'react'
import { SVGProps } from 'react'

const CheckboxDisabledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#FAFAFA"
      stroke="#EEE"
      d="M4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4A3.5 3.5 0 0 1 4 .5Z"
    />
  </svg>
)
export default CheckboxDisabledIcon
