import * as React from 'react'
import { SVGProps } from 'react'

const ItalicIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M19 4.3a.7.7 0 0 1 .64.981l-.866 1.974a.7.7 0 0 1-1.282-.563l.436-.992h-4.08l-3.683 13.6h2.741a.7.7 0 0 1 0 1.4H6a.7.7 0 0 1 0-1.4h2.715l3.683-13.6H8.19l-.682 1.555a.7.7 0 0 1-1.282-.563l.867-1.973.048-.091a.7.7 0 0 1 .592-.328H19Z"
    />
  </svg>
)
export default ItalicIcon
