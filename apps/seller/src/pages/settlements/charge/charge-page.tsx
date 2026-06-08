import { Button, Text } from '@dessert/ui'
import ChargeFilter from '@/features/settlement/charge/charge-filter'
import type { ChargeFilterValue } from '@/features/settlement/charge/charge-filter'

import Layout from '../layout'

const ChargePage = () => {
  const handleSearch = (filters: ChargeFilterValue) => {
    // TODO: API 연동 시 조회 파라미터로 사용
    void filters
  }

  return (
    <Layout>
      <Text as="h2" variant="heading20-sb" className="mb-10">
        충전금 현황
      </Text>
      <ChargeFilter onSearch={handleSearch}>
        <div className="flex items-center gap-12">
          <Text as="span" variant="title16-m">
            충전금 잔액
          </Text>
          <Text as="span" variant="title16-m" color="primary-500">
            100,000원
          </Text>
          <Button
            title="출금하기"
            variant="primary-outlined"
            size="sm"
            className="max-h-[31px] min-w-[61px] rounded-[4px]"
          />
        </div>
      </ChargeFilter>
    </Layout>
  )
}

export default ChargePage
