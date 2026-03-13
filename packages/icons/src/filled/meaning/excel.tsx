import * as React from 'react'
import { SVGProps } from 'react'

const ExcelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#31C447"
      d="M19.555 5.777h-7.11v12.445h7.11c.245 0 .445-.2.445-.445V6.222c0-.245-.2-.445-.445-.445Z"
    />
    <path
      fill="#fff"
      d="M15.556 8h3.11v1.333h-3.11V8Zm0 4.444h3.11v1.334h-3.11v-1.334Zm0 2.223h3.11V16h-3.11v-1.333Zm0-4.445h3.11v1.334h-3.11v-1.334ZM12.444 8h2.223v1.333h-2.223V8Zm0 4.444h2.223v1.334h-2.223v-1.334Zm0 2.223h2.223V16h-2.223v-1.333Zm0-4.445h2.223v1.334h-2.223v-1.334Z"
    />
    <path fill="url(#a)" d="M13.333 20 4 18.222V5.778L13.333 4v16Z" />
    <path
      fill="#fff"
      d="m9.836 15.111-1.071-2.026a1.653 1.653 0 0 1-.125-.418h-.018c-.022.098-.066.24-.142.436L7.405 15.11H5.733l1.983-3.11-1.814-3.112H7.61l.889 1.867c.071.147.133.324.187.524h.017c.036-.12.098-.302.196-.542l.991-1.849h1.56l-1.867 3.085 1.92 3.137H9.836Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={4}
        x2={20}
        y1={12}
        y2={12}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#21AD64" />
        <stop offset={1} stopColor="#088242" />
      </linearGradient>
    </defs>
  </svg>
)
export default ExcelIcon
