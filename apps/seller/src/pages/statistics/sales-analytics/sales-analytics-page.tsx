import { DateRangeFilter } from '@/features/statistics/sales-analytics/date-range-filter'
import { PaymentAmountChart } from '@/features/statistics/sales-analytics/payment-amount-chart'
import { PaymentCountChart } from '@/features/statistics/sales-analytics/payment-count-chart'
import { RefundRateChart } from '@/features/statistics/sales-analytics/refund-rate-chart'
import { useStatsFilter } from '@/features/statistics/sales-analytics/stats-filter.hook'
import { WeekdayAmountChart } from '@/features/statistics/sales-analytics/weekday-amount-chart'
import { WeekdayAverageChart } from '@/features/statistics/sales-analytics/weekday-average-chart'

/**
 * @description 판매통계 > 판매분석 페이지. 결제금액/결제수/요일별/환불율 5종 차트를 보여준다.
 */
const SalesAnalyticsPage = () => {
  const { apiDate } = useStatsFilter()

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="typo-heading-18-b text-gray-900">판매분석</h1>
        <DateRangeFilter />
      </header>

      <PaymentAmountChart date={apiDate} />
      <PaymentCountChart date={apiDate} />

      <div className="grid grid-cols-2 gap-6">
        <WeekdayAmountChart date={apiDate} />
        <WeekdayAverageChart date={apiDate} />
      </div>

      <RefundRateChart date={apiDate} />
    </div>
  )
}

export default SalesAnalyticsPage
