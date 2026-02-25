import { SettlementOverview } from '@/features/settlement/ui/settlement-overview'
import { DailySettlementTable } from '@/features/settlement/ui/daily-settlement-table'
import { SettlementFilter } from '@/features/settlement/ui/settlement-filter'
import { TransactionSettlementTable } from '@/features/settlement/ui/transaction-settlement-table'
import {
  Tab,
  TabContent,
  TabList,
  TabTrigger,
} from '@/shared/components/ui/tab/tab'

const SettlementPage = () => {
  return (
    <div className="mx-[-90px] -my-40 flex min-h-[calc(100vh-80px)] flex-col gap-24 px-40 py-40">
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
