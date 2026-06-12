import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import { paymentsQueries } from '@/entity/payments'

import { ChartCard } from '../chart-card'
import {
  CHART_COLORS,
  CHART_HEIGHT,
  ChartContainer,
  ChartTooltip,
  formatKRW,
  formatKRWShort,
  formatWeekday,
} from '../chart-primitives'

interface WeekdayAverageChartProps {
  date?: string
}

// 요일별 평균 결제금액 — 기획서대로 period=DAY 고정. WeekdayAmountChart와 같은 /weekday query 공유(dedup).
export function WeekdayAverageChart({ date }: WeekdayAverageChartProps) {
  const { data } = useQuery(paymentsQueries.weekday({ date, period: 'DAY' }))

  return (
    <ChartCard
      title="요일별 평균 결제금액"
      info="요일별 평균적인 결제성과를 이해할 수 있습니다."
    >
      <ChartContainer height={CHART_HEIGHT.half}>
        <BarChart data={data?.weekdayAmounts ?? []}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="weekday"
            tickFormatter={formatWeekday}
            stroke={CHART_COLORS.axis}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={formatKRWShort}
            stroke={CHART_COLORS.axis}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={
              <ChartTooltip
                valueFormatter={formatKRW}
                labelFormatter={(l) => `${formatWeekday(Number(l))}요일`}
              />
            }
          />
          <Bar
            dataKey="averageAmount"
            name="평균 결제금액"
            fill={CHART_COLORS.accent}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
