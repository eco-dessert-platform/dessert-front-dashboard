import { Tab, TabContent, TabList, TabTrigger } from '@dessert/ui'

import { DailySettlementTable } from '@/features/settlement/history/history-daily-table'
import { SettlementFilter } from '@/features/settlement/history/history-filter'
import { SettlementOverview } from '@/features/settlement/history/history-overview'
import { TransactionSettlementTable } from '@/features/settlement/history/history-transaction-table'
import { useSettlementFilter } from '@/features/settlement/history/model/use-settlement-filter'

import Layout from './layout'

const SettlementPage = () => {
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
          <SettlementOverview />
          <DailySettlementTable />
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
