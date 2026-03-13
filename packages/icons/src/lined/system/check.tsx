import { SVGProps } from 'react'

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.97 7.47a.75.75 0 1 1 1.06 1.06l-8.333 8.333a.75.75 0 0 1-1.06 0L5.47 12.697a.75.75 0 0 1 1.06-1.06l3.636 3.636L17.97 7.47Z"
    />
  </svg>
)
export default CheckIcon
