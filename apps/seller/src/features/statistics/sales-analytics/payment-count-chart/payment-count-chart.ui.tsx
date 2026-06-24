import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
  formatCount,
  formatShortDate,
} from '../chart-primitives'
import { UnitToggle } from '../unit-toggle'

interface PaymentCountChartProps {
  date?: string
}

export function PaymentCountChart({ date }: PaymentCountChartProps) {
  const [period, setPeriod] = useState<PaymentStatsPeriod>('DAY')
  const periodLabel = PERIOD_LABEL[period]
  const { data } = useQuery(paymentsQueries.dailyCount({ date, period }))

  return (
    <ChartCard
      title={`${periodLabel} 결제자수 및 결제수`}
      info={`결제자수와 결제수를 ${periodLabel}로 확인할 수 있습니다.`}
      headerRight={<UnitToggle value={period} onChange={setPeriod} />}
    >
      <ChartContainer>
        <BarChart data={data?.dailyCounts ?? []}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
            stroke={CHART_COLORS.axis}
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke={CHART_COLORS.axis} tick={{ fontSize: 12 }} />
          <Tooltip
            content={
              <ChartTooltip
                valueFormatter={formatCount}
                labelFormatter={(l) => formatShortDate(String(l))}
              />
            }
          />
          <Legend
            verticalAlign="top"
            height={32}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
          />
          <Bar
            dataKey="buyerCount"
            name="결제자수"
            fill={CHART_COLORS.primary}
          />
          <Bar
            dataKey="paymentCount"
            name="결제수"
            fill={CHART_COLORS.accent}
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  )
}
