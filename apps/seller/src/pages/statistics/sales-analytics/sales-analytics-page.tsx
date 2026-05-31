/** @temp Entity 브랜치 API 동작 검증용 — PR 3에서 실제 페이지로 교체 */
import { useQuery } from '@tanstack/react-query'

import { paymentsQueries } from '@/entity/payments'

// @temp
const SalesAnalyticsPage = () => {
  const request = { period: 'DAY' as const }
  const dailyAmount = useQuery(paymentsQueries.dailyAmount(request))
  const dailyCount = useQuery(paymentsQueries.dailyCount(request))
  const weekday = useQuery(paymentsQueries.weekday(request))
  const refundRate = useQuery(paymentsQueries.dailyRefundRate(request))

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">[@temp] 판매통계 API 동작 검증</h1>

      <section>
        <h2 className="font-semibold">daily-amount</h2>
        <pre className="overflow-auto bg-gray-100 p-2 text-xs">
          {JSON.stringify(dailyAmount.data, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="font-semibold">daily-count</h2>
        <pre className="overflow-auto bg-gray-100 p-2 text-xs">
          {JSON.stringify(dailyCount.data, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="font-semibold">weekday</h2>
        <pre className="overflow-auto bg-gray-100 p-2 text-xs">
          {JSON.stringify(weekday.data, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="font-semibold">daily-refund-rate</h2>
        <pre className="overflow-auto bg-gray-100 p-2 text-xs">
          {JSON.stringify(refundRate.data, null, 2)}
        </pre>
      </section>
    </div>
  )
}

export default SalesAnalyticsPage
