import * as React from 'react'
import { SVGProps } from 'react'

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 5a.57.57 0 0 1 .427.19l6 6.46a.676.676 0 0 1 0 .898l-6 6.462a.582.582 0 0 1-.426.19.584.584 0 0 1-.428-.19.661.661 0 0 1-.173-.45c0-.167.061-.328.173-.449l5.582-6.011-5.582-6.012a.675.675 0 0 1 0-.898A.6.6 0 0 1 10 5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronRightIcon
