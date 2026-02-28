import { SettlementOverview } from '@/features/settlement/history/history-overview'
import { DailySettlementTable } from '@/features/settlement/history/history-daily-table'
import { SettlementFilter } from '@/features/settlement/history/history-filter'
import { TransactionSettlementTable } from '@/features/settlement/history/history-transaction-table'
import { Tab, TabContent, TabList, TabTrigger } from '@/shared/ui/tab/tab'

const SettlementPage = () => {
  return (
    <div className="mx-[-90px] -my-40 flex min-h-[calc(100vh-80px)] flex-col gap-24 p-40">
      <Tab defaultValue="daily" variant="btn">
        <TabList>
          <TabTrigger value="daily">일별 정산내역</TabTrigger>
          <TabTrigger value="transaction">건별 정산내역</TabTrigger>
        </TabList>

        <TabContent value="daily" className="mt-24 space-y-20">
          <SettlementOverview />
          <DailySettlementTable />
        </TabContent>

        <TabContent value="transaction" className="mt-24 space-y-20">
          <SettlementFilter />
          <TransactionSettlementTable />
        </TabContent>
      </Tab>
    </div>
  )
}

export default SettlementPage
