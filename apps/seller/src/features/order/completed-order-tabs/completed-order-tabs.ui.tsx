import { Tab, TabList, TabTrigger } from '@dessert/ui'

import { COMPLETED_ORDER_TABS } from '@/entity/order/order.constant'
import type {
  CompletedOrderStatusCount,
  CompletedOrderTab,
} from '@/entity/order/order.type'

interface CompletedOrderTabsProps {
  selectedTab: CompletedOrderTab
  statusCount: CompletedOrderStatusCount
  onChange: (tab: CompletedOrderTab) => void
}

export function CompletedOrderTabs({
  selectedTab,
  statusCount,
  onChange,
}: CompletedOrderTabsProps) {
  return (
    <Tab
      variant="btn"
      value={selectedTab}
      onValueChange={(value) => onChange(value as CompletedOrderTab)}
    >
      <TabList className="space-x-10">
        {COMPLETED_ORDER_TABS.map((tab) => (
          <TabTrigger
            key={tab.value}
            value={tab.value}
            number={statusCount[tab.value]}
            className="rounded-10"
          >
            {tab.label}
          </TabTrigger>
        ))}
      </TabList>
    </Tab>
  )
}
