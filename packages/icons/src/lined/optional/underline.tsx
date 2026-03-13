import * as React from 'react'
import { SVGProps } from 'react'

const UnderlineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M20 19.355a.7.7 0 0 1 0 1.4H4a.7.7 0 0 1 0-1.4h16ZM16.444 4.244a.7.7 0 0 1 .7.7v5.778c0 .733-.25 2.087-.995 3.279-.765 1.226-2.08 2.31-4.149 2.31S8.616 15.227 7.85 14c-.744-1.192-.995-2.546-.995-3.28V4.945a.7.7 0 0 1 1.4 0v5.778c0 .503.194 1.594.783 2.538.568.909 1.476 1.651 2.962 1.651 1.486 0 2.394-.742 2.962-1.651.589-.944.782-2.035.782-2.538V4.944a.7.7 0 0 1 .7-.7Z"
    />
  </svg>
)
export default UnderlineIcon
