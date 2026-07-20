import { type ReactElement } from 'react'

import { ResponsiveContainer } from 'recharts'

import { CHART_HEIGHT } from './chart-constants'

interface ChartContainerProps {
  children: ReactElement
  height?: number
}

// Recharts의 ResponsiveContainer는 ReactElement(단일 자식)만 받음.
// 기본 높이를 일관되게 강제하고, 추후 라이브러리 교체 시 단일 진입점이 되도록 wrap.
export const ChartContainer = ({
  children,
  height = CHART_HEIGHT.full,
}: ChartContainerProps) => (
  <ResponsiveContainer width="100%" height={height}>
    {children}
  </ResponsiveContainer>
)
