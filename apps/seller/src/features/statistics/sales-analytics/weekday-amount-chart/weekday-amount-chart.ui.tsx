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

interface WeekdayAmountChartProps {
  date?: string
}

// 요일별 결제금액 — 단위 토글 없음 (period=DAY 고정).
// /weekday 응답은 결제금액(amount)과 평균(averageAmount)을 모두 포함하며,
// WeekdayAverageChart와 같은 query를 공유 (TanStack Query 캐시 dedup).
export function WeekdayAmountChart({ date }: WeekdayAmountChartProps) {
  const { data } = useQuery(paymentsQueries.weekday({ date, period: 'DAY' }))

  return (
    <ChartCard
      title="요일별 결제금액"
      info="결제금액을 요일별로 비교하여 요일별 성과를 쉽게 이해할 수 있습니다."
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
          <Bar dataKey="amount" name="결제금액" fill={CHART_COLORS.primary} />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
