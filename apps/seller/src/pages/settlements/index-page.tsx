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

        {/** Tab 컴포넌트에 gap-2가 있어 mt를 -2px만큼 줄여야함 원래는 mt-20임 */}
        <TabContent value="daily" className="mt-[18px] space-y-10">
          <SettlementOverview />
          <DailySettlementTable />
        </TabContent>

        {/** Tab 컴포넌트에 gap-2가 있어 mt를 -2px만큼 줄여야함 원래는 mt-20임 */}
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
