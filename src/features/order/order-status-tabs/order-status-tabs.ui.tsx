import { ORDER_STATUS_TABS } from '@/entity/order/order.constant'
import type {
  OrderStatusCount,
  OrderStatusTab,
} from '@/entity/order/order.type'
import { Tab, TabList, TabTrigger } from '@/shared/components/ui/tab/tab'

interface OrderStatusTabsProps {
  selectedTab: OrderStatusTab
  statusCount: OrderStatusCount
  onChange: (tab: OrderStatusTab) => void
}

export function OrderStatusTabs({
  selectedTab,
  statusCount,
  onChange,
}: OrderStatusTabsProps) {
  return (
    <Tab
      variant="btn"
      value={selectedTab}
      onValueChange={(value) => onChange(value as OrderStatusTab)}
    >
      <TabList className="space-x-10">
        {ORDER_STATUS_TABS.map((tab) => (
          <TabTrigger
            key={tab.value}
            value={tab.value}
            number={
              tab.value === 'all' ? statusCount.total : statusCount[tab.value]
            }
            className="rounded-10"
          >
            {tab.label}
          </TabTrigger>
        ))}
      </TabList>
    </Tab>
  )
}
