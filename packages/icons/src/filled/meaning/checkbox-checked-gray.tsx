import * as React from 'react'
import { SVGProps } from 'react'

const CheckboxCheckedGrayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 17"
    {...props}
  >
    <rect
      width={15}
      height={15}
      x={0.5}
      y={1}
      fill="#E0E0E0"
      stroke="#E0E0E0"
      rx={3.5}
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.5 8.5 7 11l5-5"
    />
  </svg>
)
export default CheckboxCheckedGrayIcon
