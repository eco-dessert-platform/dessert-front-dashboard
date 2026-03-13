import * as React from 'react'
import { SVGProps } from 'react'

const RadioCheckedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <rect
      width={15}
      height={15}
      x={0.5}
      y={0.5}
      fill="#F04C28"
      stroke="#F04C28"
      rx={7.5}
    />
    <rect width={8} height={8} x={4} y={4} fill="#fff" rx={4} />
  </svg>
)
export default RadioCheckedIcon
