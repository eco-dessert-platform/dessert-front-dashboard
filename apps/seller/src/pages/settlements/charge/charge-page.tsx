import { useMemo, useState } from 'react'

import { Button, Text } from '@dessert/ui'
import { getChargePageResponseMock } from '@/entity/settlement/charge/charge-mock'
import ChargeFilter from '@/features/settlement/charge/charge-filter'
import type { ChargeFilterValue } from '@/features/settlement/charge/charge-filter'
import ChargeTable from '@/features/settlement/charge/charge-table'

import Layout from '../layout'
import { ChargePageResponse } from '@/entity/settlement/charge/entities'

const ChargePage = () => {
  const [page, setPage] = useState(1)

  const pageResponse: ChargePageResponse = useMemo(
    () => getChargePageResponseMock(page - 1),
    [page],
  )

  const handleSearch = (filters: ChargeFilterValue) => {
    // TODO: API 연동 시 조회 파라미터로 사용
    void filters
    setPage(1)
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
      <ChargeTable pageResponse={pageResponse} onPageChange={setPage} />
    </Layout>
  )
}

export default ChargePage
