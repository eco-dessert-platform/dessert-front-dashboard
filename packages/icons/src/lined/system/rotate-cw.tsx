import * as React from 'react'
import { SVGProps } from 'react'

const RotateCwIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M10.577 5.149c2.83-.59 5.696.606 7.256 2.955V5.586a.584.584 0 0 1 1.167 0v4.01a.583.583 0 0 1-.583.583h-4.01a.583.583 0 1 1 0-1.166h2.62c-1.296-2.202-3.925-3.317-6.48-2.661a5.837 5.837 0 0 0-4.111 7.4 5.834 5.834 0 0 0 11.348-.992.584.584 0 0 1 1.157.151 6.999 6.999 0 1 1-8.684-7.688l.32-.074Z"
    />
  </svg>
)
export default RotateCwIcon
