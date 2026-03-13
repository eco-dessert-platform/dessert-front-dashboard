import * as React from 'react'
import { SVGProps } from 'react'

const CircleCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M15.4 8.99a.644.644 0 1 1 .911.91l-4.94 4.94a.645.645 0 0 1-.912 0l-2.47-2.469a.645.645 0 0 1 0-.911v-.001a.645.645 0 0 1 .911 0l2.014 2.015L15.4 8.989Z"
    />
    <path
      fill="#212121"
      fillRule="evenodd"
      d="M12 3.4a8.6 8.6 0 0 1 8.6 8.6 8.6 8.6 0 0 1-8.6 8.6A8.6 8.6 0 0 1 3.4 12 8.6 8.6 0 0 1 12 3.4Zm0 1.2a7.4 7.4 0 1 0 0 14.8 7.4 7.4 0 0 0 0-14.8Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CircleCheckIcon
