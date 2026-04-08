import { useState } from 'react'

import {
  CompletedOrderFilters,
  CompletedOrderTab,
} from '@/entity/order/order.type'

const createInitialState = (
  initialTab: CompletedOrderTab,
): CompletedOrderFilters => ({
  tab: initialTab,
  searchType: 'ORDER_NUMBER',
  sort: 'DESC',
  searchKeyword: '',
  orderStatus: 'ALL',
  size: '10',
})

export function useCompletedOrderFilter(initialTab: CompletedOrderTab) {
  const initialState = createInitialState(initialTab)

  const [draftFilters, setDraftFilters] =
    useState<CompletedOrderFilters>(initialState)
  const [appliedFilters, setAppliedFilters] =
    useState<CompletedOrderFilters>(initialState)

  const apply = () => setAppliedFilters(draftFilters)

  const reset = (tab?: CompletedOrderTab) => {
    const resetState = createInitialState(tab ?? initialTab)
    setDraftFilters(resetState)
    setAppliedFilters(resetState)
  }

  return {
    draftFilters,
    setDraftFilters,
    appliedFilters,
    setAppliedFilters,
    apply,
    reset,
  }
}
