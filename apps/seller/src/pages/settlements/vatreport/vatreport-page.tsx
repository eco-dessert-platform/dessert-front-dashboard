import { useCallback, useState } from 'react'

import { format, subDays } from 'date-fns'

import { vatDescriptions } from '@/entity/settlement/vatreport/constants'
import type { IVatReportFilter } from '@/entity/settlement/vatreport/entities'
import SettlementTitles from '@/features/settlement/common/titles'
import VatReportFilter from '@/features/settlement/vatreport/vatreport-filter'

import Layout from '../layout'

const Vatreport = () => {
  const [filters, setFilters] = useState<IVatReportFilter>(() => {
    const today = new Date()
    return {
      startDate: format(subDays(today, 7), 'yyyy-MM-dd'),
      endDate: format(today, 'yyyy-MM-dd'),
    }
  })

  const updateVatReportSearch = useCallback(
    (updates: Partial<IVatReportFilter>) => {
      setFilters((prev) => ({
        ...prev,
        ...updates,
      }))
    },
    [],
  )

  return (
    <Layout>
      <SettlementTitles
        title="부가세 신고 내역"
        descriptions={vatDescriptions}
      />
      <VatReportFilter
        filtersDate={{
          startDate: filters.startDate,
          endDate: filters.endDate,
        }}
        onSearch={updateVatReportSearch}
      />
    </Layout>
  )
}

export default Vatreport
