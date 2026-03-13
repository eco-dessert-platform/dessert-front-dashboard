import { useState } from 'react'

import { SettlementFilters } from '@/entity/settlement/types'

const INITIAL_FILTERS: SettlementFilters = {
  dateType: 'expectedDate',
  startDate: null,
  endDate: null,
  searchType: 'orderNumber',
  keyword: '',
  page: 1,
  size: 10,
}

export function useSettlementFilter() {
  const [draftFilters, setDraftFilters] =
    useState<SettlementFilters>(INITIAL_FILTERS)
  const [appliedFilters, setAppliedFilters] =
    useState<SettlementFilters>(INITIAL_FILTERS)

  const apply = () => {
    setAppliedFilters({ ...draftFilters, page: 1 })
  }

  const reset = () => {
    setDraftFilters(INITIAL_FILTERS)
    setAppliedFilters(INITIAL_FILTERS)
  }

  const setPage = (page: number) => {
    setAppliedFilters((prev) => ({ ...prev, page }))
  }

  return {
    draftFilters,
    setDraftFilters,
    appliedFilters,
    setAppliedFilters,
    apply,
    reset,
    setPage,
  }
}
