import { queryOptions } from '@tanstack/react-query'

import type { IChargeFilter } from '@/entity/settlement/charge/entities'
import { chargeService } from '@/services/charge-service'

import { chargeKeys } from './charge-keys'

export const chargeQueries = {
  getChargeBalance: (filters: IChargeFilter) =>
    queryOptions({
      queryKey: chargeKeys.list(filters),
      queryFn: () => chargeService.getChargeBalance(filters),
    }),
}
