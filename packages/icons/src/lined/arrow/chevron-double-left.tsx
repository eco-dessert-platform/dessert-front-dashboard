import * as React from 'react'
import { SVGProps } from 'react'

const ChevronDoubleLeftIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 5a.57.57 0 0 1 .426.19.645.645 0 0 1 .174.449.676.676 0 0 1-.174.449L6.843 12.1l5.583 6.011c.112.12.174.282.174.45a.662.662 0 0 1-.174.449.583.583 0 0 1-.426.19.584.584 0 0 1-.428-.19l-6-6.461a.674.674 0 0 1 0-.898l6-6.462A.599.599 0 0 1 12 5Z"
      clipRule="evenodd"
    />
    <path
      fill="#212121"
      fillRule="evenodd"
      d="M15.999 5a.6.6 0 0 1 .556.396.675.675 0 0 1-.129.692L10.843 12.1l5.583 6.011c.112.12.173.282.173.45a.661.661 0 0 1-.173.449.584.584 0 0 1-.427.19.582.582 0 0 1-.427-.19l-6-6.461a.643.643 0 0 1-.173-.45.675.675 0 0 1 .174-.449l5.999-6.46a.57.57 0 0 1 .427-.19Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronDoubleLeftIcon
