import * as React from 'react'
import { SVGProps } from 'react'

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.56 9.4a.676.676 0 0 1 .45.173.6.6 0 0 1 .19.428.57.57 0 0 1-.19.427l-6.461 5.999a.676.676 0 0 1-.898 0l-6.462-6A.582.582 0 0 1 5 10.002c0-.162.069-.316.19-.428a.661.661 0 0 1 .449-.173c.167 0 .329.062.449.173l6.012 5.582 6.011-5.582a.675.675 0 0 1 .45-.173Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronDownIcon
