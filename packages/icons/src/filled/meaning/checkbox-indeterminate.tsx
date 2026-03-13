import * as React from 'react'
import { SVGProps } from 'react'

const CheckboxIndeterminateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#F04C28"
      stroke="#F04C28"
      d="M4 .5h8A3.5 3.5 0 0 1 15.5 4v8a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 12V4A3.5 3.5 0 0 1 4 .5Z"
    />
    <path
      fill="#fff"
      d="M12.267 7.333c.22 0 .4.225.4.501s-.18.5-.4.5H3.733c-.22 0-.4-.224-.4-.5s.18-.5.4-.5h8.534Z"
    />
  </svg>
)
export default CheckboxIndeterminateIcon
