import { createQueryKeys } from '@lukemorales/query-key-factory'
import { createQuery } from 'react-query-kit'

import { getRegisteredStores } from './store-registration.api'

import type {
  GetRegisteredStoresRequestParams,
  RegisteredStoreListResult,
} from './store-registration.type'

export const storeRegistrationQueries = createQueryKeys('stores', {
  registeredStoreList: null,
})

export const useRegisteredStoreListQuery = createQuery<
  RegisteredStoreListResult,
  GetRegisteredStoresRequestParams
>({
  queryKey: storeRegistrationQueries.registeredStoreList.queryKey,
  fetcher: (params) => getRegisteredStores(params),
})
