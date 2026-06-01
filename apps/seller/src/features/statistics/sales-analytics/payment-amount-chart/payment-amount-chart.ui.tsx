import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { type PaymentStatsPeriod, paymentsQueries } from '@/entity/payments'

import { ChartCard } from '../chart-card'
import {
  CHART_COLORS,
  ChartContainer,
  ChartTooltip,
  PERIOD_LABEL,
  formatKRW,
  formatKRWShort,
  formatShortDate,
} from '../chart-primitives'
import { UnitToggle } from '../unit-toggle'

interface PaymentAmountChartProps {
  // 페이지 DatePicker에서 내려오는 기준 날짜(yyyy-MM-dd). 미지정 시 API 기본값(오늘) 사용.
  date?: string
}

export function PaymentAmountChart({ date }: PaymentAmountChartProps) {
  const [period, setPeriod] = useState<PaymentStatsPeriod>('DAY')
  const periodLabel = PERIOD_LABEL[period]
  const { data } = useQuery(paymentsQueries.dailyAmount({ date, period }))

  return (
    <ChartCard
      title={`${periodLabel} 결제금액`}
      info={`결제금액을 ${periodLabel}로 조회할 수 있으며, 7일 평균을 통해 결제금액의 이동 추세를 확인할 수 있습니다.`}
      headerRight={<UnitToggle value={period} onChange={setPeriod} />}
    >
      <ChartContainer>
        <BarChart data={data?.dailyAmounts ?? []}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
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
                labelFormatter={(l) => formatShortDate(String(l))}
              />
            }
          />
          <Bar dataKey="amount" name="결제금액" fill={CHART_COLORS.primary} />
          {data?.averageAmount != null && (
            <ReferenceLine
              y={data.averageAmount}
              stroke={CHART_COLORS.accent}
              strokeDasharray="3 3"
              label={{
                value: '7일 평균',
                position: 'right',
                fontSize: 11,
                fill: CHART_COLORS.accent,
              }}
            />
          )}
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
