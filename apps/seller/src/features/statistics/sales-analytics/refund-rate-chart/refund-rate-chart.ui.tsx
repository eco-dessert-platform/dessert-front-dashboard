import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
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
  formatPercent,
  formatShortDate,
} from '../chart-primitives'
import { UnitToggle } from '../unit-toggle'

interface RefundRateChartProps {
  date?: string
}

export function RefundRateChart({ date }: RefundRateChartProps) {
  const [period, setPeriod] = useState<PaymentStatsPeriod>('DAY')
  const periodLabel = PERIOD_LABEL[period]
  const { data } = useQuery(paymentsQueries.dailyRefundRate({ date, period }))

  return (
    <ChartCard
      title={`${periodLabel} 환불율`}
      info={`환불금액 및 환불율을 ${periodLabel}로 확인할 수 있습니다.`}
      headerRight={<UnitToggle value={period} onChange={setPeriod} />}
    >
      <ChartContainer>
        <ComposedChart data={data?.dailyRefundRates ?? []}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="date"
            tickFormatter={formatShortDate}
            stroke={CHART_COLORS.axis}
            tick={{ fontSize: 12 }}
          />
          {/* 좌측: 금액 / 우측: 환불율(%) — 단위가 달라 dual axis */}
          <YAxis
            yAxisId="amount"
            tickFormatter={formatKRWShort}
            stroke={CHART_COLORS.axis}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="rate"
            orientation="right"
            tickFormatter={(v: number) => `${v}%`}
            stroke={CHART_COLORS.axis}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={
              <ChartTooltip
                valueFormatter={(value, name) =>
                  name === '환불율' ? formatPercent(value) : formatKRW(value)
                }
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
            yAxisId="amount"
            dataKey="paymentAmount"
            name="결제금액"
            fill={CHART_COLORS.primaryMuted}
          />
          <Bar
            yAxisId="amount"
            dataKey="refundAmount"
            name="환불금액"
            fill={CHART_COLORS.danger}
          />
          <Line
            yAxisId="rate"
            type="monotone"
            dataKey="refundRate"
            name="환불율"
            stroke={CHART_COLORS.accent}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ChartContainer>
    </ChartCard>
  )
}
