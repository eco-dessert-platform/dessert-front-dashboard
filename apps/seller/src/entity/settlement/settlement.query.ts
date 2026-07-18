import { queryOptions } from '@tanstack/react-query'

import { getDailySettlements } from './settlement.api'
import { DailySettlementFilters } from './settlement.type'

export const settlementQueries = {
  all: () => ['settlement'],
  dailyLists: () => [...settlementQueries.all(), 'daily'],
  daily: (filters: DailySettlementFilters) =>
    queryOptions({
      queryKey: [...settlementQueries.dailyLists(), filters],
      queryFn: () => getDailySettlements(filters),
    }),
}
