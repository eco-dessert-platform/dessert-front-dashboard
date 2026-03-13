import * as React from 'react'
import { SVGProps } from 'react'

const CircleCheckFilledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#43A047"
      d="M12 3.4a8.6 8.6 0 0 1 8.6 8.6 8.6 8.6 0 0 1-8.6 8.6A8.6 8.6 0 0 1 3.4 12 8.6 8.6 0 0 1 12 3.4Zm4.311 5.59a.644.644 0 0 0-.91 0l-4.487 4.484L8.9 11.459a.645.645 0 0 0-.91 0l-.002.001a.645.645 0 0 0 .001.911l2.47 2.47c.252.252.66.252.912 0l4.94-4.94a.644.644 0 0 0 0-.912Z"
    />
  </svg>
)
export default CircleCheckFilledIcon
