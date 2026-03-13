import * as React from 'react'
import { SVGProps } from 'react'

const HeartFilledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#E0E0E0"
      fillRule="evenodd"
      stroke="#E0E0E0"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.331 11.644c-.96-2.978.162-6.382 3.31-7.39a5.404 5.404 0 0 1 4.859.811c1.302-1 3.196-1.338 4.85-.81 3.147 1.007 4.276 4.41 3.317 7.389C19.173 16.364 12.5 20 12.5 20s-6.624-3.58-8.169-8.356Z"
      clipRule="evenodd"
    />
  </svg>
)
export default HeartFilledIcon
