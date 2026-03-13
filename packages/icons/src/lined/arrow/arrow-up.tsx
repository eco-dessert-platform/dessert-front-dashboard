import * as React from 'react'
import { SVGProps } from 'react'

const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M12.1 4a.675.675 0 0 1 .449.173l6.46 5.999a.57.57 0 0 1 0 .854.675.675 0 0 1-.898 0L12.677 5.98l.078 12.827a.69.69 0 0 1-1.38.008l-.076-12.627-5.211 4.84a.661.661 0 0 1-.45.172.661.661 0 0 1-.449-.173A.584.584 0 0 1 5 10.6c0-.162.069-.315.19-.427l6.46-6A.675.675 0 0 1 12.1 4Z"
    />
  </svg>
)
export default ArrowUpIcon
