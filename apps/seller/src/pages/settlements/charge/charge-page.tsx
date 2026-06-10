import { useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Button, Text } from '@dessert/ui'
import { format, subDays } from 'date-fns'
import type {
  IChargeFilter,
  IChargePageResponse,
} from '@/entity/settlement/charge/entities'
import ChargeFilter from '@/features/settlement/charge/charge-filter'
import ChargeTable from '@/features/settlement/charge/charge-table'
import { chargeQueries } from '@/hooks/queries/charge-queries'

import Layout from '../layout'
import ChargeWithdrawModal from '@/features/settlement/charge/modal/charge-withdraw-modal'

const ChargePage: React.FC = () => {
  const today = new Date()
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [filters, setFilters] = useState<IChargeFilter>({
    startDate: format(subDays(today, 7), 'yyyy-MM-dd'),
    endDate: format(today, 'yyyy-MM-dd'),
    page: 0,
  })

  const { data } = useQuery(chargeQueries.getChargeBalance(filters))

  const updateChargeSearch = (updates: Partial<IChargeFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  const pageResponse: IChargePageResponse = useMemo(
    () =>
      data?.pageResponse
        ? data.pageResponse
        : {
            content: [],
            page: filters.page ?? 0,
            size: 10,
            totalPages: 1,
            totalElements: 0,
          },
    [data],
  )

  return (
    <>
      <Layout>
        <Text as="h2" variant="heading20-sb" className="mb-10">
          충전금 현황
        </Text>
        <ChargeFilter
          onSearch={(dateFilters) =>
            updateChargeSearch({ ...dateFilters, page: 0 })
          }
        >
          <div className="flex items-center gap-12">
            <Text as="span" variant="title16-m">
              충전금 잔액
            </Text>
            <Text as="span" variant="title16-m" color="primary-500">
              {data?.chargeBalance?.toLocaleString() ?? 0}원
            </Text>
            <Button
              title="출금하기"
              variant="primary-outlined"
              size="sm"
              className="max-h-[31px] min-w-[61px] rounded-[4px]"
              onClick={() => setIsWithdrawModalOpen(true)}
            />
          </div>
        </ChargeFilter>
        <ChargeTable
          pageResponse={pageResponse}
          onPageChange={(nextPage) =>
            updateChargeSearch({ page: nextPage - 1 })
          }
        />
      </Layout>
      <ChargeWithdrawModal
        open={isWithdrawModalOpen}
        onOpenChange={setIsWithdrawModalOpen}
        chargeBalance={data?.chargeBalance ?? 0}
      />
    </>
  )
}

export default ChargePage
