import type { IChargeFilter } from '@/entity/settlement/charge/entities'

export const chargeKeys = {
  all: () => ['charge'] as const,
  list: (filters: IChargeFilter) => [...chargeKeys.all(), filters] as const,
}
