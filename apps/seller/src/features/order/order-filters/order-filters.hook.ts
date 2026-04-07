import { useState } from 'react'

import { OrderFilters, OrderStatusTab } from '@/entity/order/order.type'

const createInitialState = (initialTab: OrderStatusTab): OrderFilters => ({
  tab: initialTab,
  searchType: 'ORDER_NUMBER',
  sort: 'DESC',
  searchKeyword: '',
  size: '10',
})

export function useOrderFilter(initialTab: OrderStatusTab) {
  const initialState = createInitialState(initialTab)

  // UI에서 입력 중인 임시 상태 (API 호출 없음)
  const [draftFilters, setDraftFilters] = useState<OrderFilters>(initialState)
  // 실제 API queryKey에 사용되는 상태 (조회 버튼 클릭 시에만 업데이트)
  const [appliedFilters, setAppliedFilters] =
    useState<OrderFilters>(initialState)

  // 조회 버튼 클릭 → draftFilters를 appliedFilters로 반영
  const apply = () => setAppliedFilters(draftFilters)

  // 초기화 → 두 상태 모두 리셋
  const reset = (tab?: OrderStatusTab) => {
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
