import { Tab, TabList, TabTrigger } from '@dessert/ui'

export const FilterTabs = () => {
  return (
    <Tab variant={'btn'} className="mb-5" defaultValue="all">
      <TabList>
        <TabTrigger value="all" number={99}>
          전체
        </TabTrigger>
        <TabTrigger value="active" number={50}>
          판매중
        </TabTrigger>
        <TabTrigger value="inactive" number={55}>
          품절
        </TabTrigger>
        <TabTrigger value="inactive2" number={55}>
          판매중지
        </TabTrigger>
        <TabTrigger value="inactive3" number={55}>
          판매대기
        </TabTrigger>
        <TabTrigger value="inactive4" number={55}>
          판매금지
        </TabTrigger>
      </TabList>
    </Tab>
  )
}
