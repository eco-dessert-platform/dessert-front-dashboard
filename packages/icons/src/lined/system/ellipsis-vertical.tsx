import * as React from 'react'
import { SVGProps } from 'react'

const EllipsisVerticalIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M11.5 16a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 10a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
    />
  </svg>
)
export default EllipsisVerticalIcon
