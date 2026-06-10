import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import { type PaymentStatsPeriod, paymentsQueries } from '@/entity/payments'

import { ChartCard } from '../chart-card'
import {
  CHART_COLORS,
  CHART_HEIGHT,
  ChartContainer,
  ChartTooltip,
  formatDateRange,
  formatKRW,
  formatKRWShort,
  formatWeekday,
} from '../chart-primitives'
import { UnitToggle } from '../unit-toggle'

interface WeekdayAmountChartProps {
  date?: string
  period: PaymentStatsPeriod
  onPeriodChange: (period: PaymentStatsPeriod) => void
}

// 요일별 결제금액 — period 토글은 이 카드에 두되 상태는 페이지가 소유(평균 차트와 공유).
// period는 조회 "범위 폭"(DAY=7일/WEEK=7주/MONTH=7개월)이며 데이터는 항상 요일별로 합산됨.
// WeekdayAverageChart와 같은 /weekday query를 공유 (period 동일 → TanStack 캐시 dedup).
export function WeekdayAmountChart({
  date,
  period,
  onPeriodChange,
}: WeekdayAmountChartProps) {
  const { data } = useQuery(paymentsQueries.weekday({ date, period }))

  return (
    <ChartCard
      title="요일별 결제금액"
      subtitle={
        data ? formatDateRange(data.startDate, data.endDate) : undefined
      }
      info="결제금액을 요일별로 비교하여 요일별 성과를 쉽게 이해할 수 있습니다."
      headerRight={<UnitToggle value={period} onChange={onPeriodChange} />}
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
