import * as React from 'react'
import { SVGProps } from 'react'

const StrikethroughIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M17.735 4.3a.7.7 0 0 1 .7.7v1.974a.7.7 0 0 1-1.4 0V5.7h-4.39v6.541h6.414a.7.7 0 0 1 0 1.4h-6.415V20a.7.7 0 0 1-1.399 0v-6.358H4.941a.7.7 0 0 1 0-1.4h6.304V5.7h-4.28v1.274a.7.7 0 0 1-1.4 0V5a.7.7 0 0 1 .7-.7h11.47Z"
    />
  </svg>
)
export default StrikethroughIcon
