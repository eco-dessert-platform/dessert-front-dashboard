import { useQuery } from '@tanstack/react-query'
import { Tab, TabContent, TabList, TabTrigger } from '@dessert/ui'

import { settlementQueries } from '@/entity/settlement/settlement.query'
import { DailySettlementTable } from '@/features/settlement/history/history-daily-table'
import { SettlementFilter } from '@/features/settlement/history/history-filter'
import { SettlementOverview } from '@/features/settlement/history/history-overview'
import { TransactionSettlementTable } from '@/features/settlement/history/history-transaction-table'
import { useDailySettlementFilter } from '@/features/settlement/history/model/use-daily-settlement-filter'
import { useSettlementFilter } from '@/features/settlement/history/model/use-settlement-filter'

import Layout from './layout'

const SettlementPage = () => {
  const {
    draftFilters: dailyDraftFilters,
    setDraftFilters: setDailyDraftFilters,
    appliedFilters: dailyAppliedFilters,
    apply: applyDailyFilters,
    setPage: setDailyPage,
  } = useDailySettlementFilter()

  const { data: dailyData } = useQuery(
    settlementQueries.daily(dailyAppliedFilters),
  )

  const { draftFilters, setDraftFilters, appliedFilters, apply, setPage } =
    useSettlementFilter()

  return (
    <Layout>
      <Tab defaultValue="daily" variant="btn">
        <TabList>
          <TabTrigger value="daily">일별 정산내역</TabTrigger>
          <TabTrigger value="transaction">건별 정산내역</TabTrigger>
        </TabList>

        {/** Tab의 gap-2(8px) 때문에 mt-20(80px) 대신 mt-[18px] 사용 */}
        <TabContent value="daily" className="mt-[18px] space-y-10">
          <SettlementOverview
            filters={dailyDraftFilters}
            onChange={setDailyDraftFilters}
            onSearch={applyDailyFilters}
            summary={dailyData?.summary}
          />
          <DailySettlementTable
            pageResponse={dailyData?.settlements}
            onPageChange={(page) => setDailyPage(page - 1)}
          />
        </TabContent>

        {/** Tab의 gap-2(8px) 때문에 mt-20(80px) 대신 mt-[18px] 사용 */}
        <TabContent value="transaction" className="mt-[18px] space-y-10">
          <SettlementFilter
            filters={draftFilters}
            onChange={setDraftFilters}
            onSearch={apply}
          />
          <TransactionSettlementTable
            filters={appliedFilters}
            onPageChange={setPage}
          />
        </TabContent>
      </Tab>
    </Layout>
  )
}

export default SettlementPage
