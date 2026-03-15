import * as React from 'react'
import { SVGProps, useId } from 'react'

const HeartWhiteShadowIcon = ({
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) => {
  const titleId = useId()
  const hasLabel = Boolean(title || ariaLabel || ariaLabelledBy)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      role="img"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}

      <g clipRule="evenodd" filter="url(#a)" shapeRendering="crispEdges">
        <path
          fill="#fff"
          fillOpacity={0.3}
          fillRule="evenodd"
          d="M4.331 11.644c-.96-2.978.162-6.382 3.31-7.39a5.404 5.404 0 0 1 4.859.811c1.302-1 3.196-1.338 4.85-.81 3.147 1.007 4.276 4.41 3.317 7.389C19.173 16.364 12.5 20 12.5 20s-6.624-3.58-8.169-8.356Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.331 11.644c-.96-2.978.162-6.382 3.31-7.39a5.404 5.404 0 0 1 4.859.811c1.302-1 3.196-1.338 4.85-.81 3.147 1.007 4.276 4.41 3.317 7.389C19.173 16.364 12.5 20 12.5 20s-6.624-3.58-8.169-8.356Z"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={21.996}
          height={21}
          x={1.501}
          y={1.5}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.529183 0 0 0 0 0.520312 0 0 0 0 0.520312 0 0 0 0.8 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_2622"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1_2622"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
export default HeartWhiteShadowIcon
