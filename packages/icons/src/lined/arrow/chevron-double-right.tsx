import * as React from 'react'
import { SVGProps } from 'react'

const ChevronDoubleRightIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 5a.57.57 0 0 1 .427.19l6 6.46a.645.645 0 0 1 .173.45.676.676 0 0 1-.174.449l-5.999 6.46a.582.582 0 0 1-.426.19.584.584 0 0 1-.428-.19.661.661 0 0 1-.173-.448c0-.168.061-.33.173-.45l5.582-6.011-5.582-6.012a.675.675 0 0 1 0-.898A.6.6 0 0 1 8 5Z"
      clipRule="evenodd"
    />
    <path
      fill="#212121"
      fillRule="evenodd"
      d="M12 5a.599.599 0 0 1 .428.19l5.998 6.46a.676.676 0 0 1 0 .898l-5.999 6.462a.584.584 0 0 1-.427.19.583.583 0 0 1-.427-.19.662.662 0 0 1-.174-.45c0-.167.062-.328.174-.449l5.582-6.011-5.582-6.012a.645.645 0 0 1-.174-.45.678.678 0 0 1 .174-.449A.57.57 0 0 1 12 5Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronDoubleRightIcon
