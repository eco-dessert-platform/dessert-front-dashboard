import { queryOptions } from '@tanstack/react-query'

import { getRegisteredStores } from './store-registration.api'

import type { GetRegisteredStoresRequestParams } from './store-registration.type'

export const storeRegistrationQueries = {
  all: () => ['stores'] as const,
  registrations: () =>
    [...storeRegistrationQueries.all(), 'registrations'] as const,

  registeredStoreList: (params: GetRegisteredStoresRequestParams = {}) =>
    queryOptions({
      queryKey: [...storeRegistrationQueries.registrations(), params],
      queryFn: () => getRegisteredStores(params),
    }),
}
