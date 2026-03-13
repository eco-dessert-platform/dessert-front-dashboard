import * as React from 'react'
import { SVGProps } from 'react'

const ChevronUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      fillRule="evenodd"
      d="M12.1 7.4a.675.675 0 0 1 .449.173l6.46 6a.57.57 0 0 1 .14.66.6.6 0 0 1-.346.322.675.675 0 0 1-.692-.128L12.1 8.844l-6.012 5.583a.661.661 0 0 1-.45.173.661.661 0 0 1-.449-.173.584.584 0 0 1-.189-.428c0-.162.069-.315.19-.427l6.46-5.999a.675.675 0 0 1 .45-.173Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronUpIcon
