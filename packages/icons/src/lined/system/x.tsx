import * as React from 'react'
import { SVGProps } from 'react'

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M16.862 6.195a.667.667 0 1 1 .943.943L12.943 12l4.862 4.862a.666.666 0 1 1-.943.943L12 12.943l-4.862 4.862a.666.666 0 1 1-.943-.943L11.057 12 6.195 7.138a.667.667 0 1 1 .943-.943L12 11.057l4.862-4.862Z"
    />
  </svg>
)
export default XIcon
