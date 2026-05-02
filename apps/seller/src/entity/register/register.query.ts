import { queryOptions } from '@tanstack/react-query'

import {
  getAccountVerification,
  getStoreApplication,
  getStoreNames,
} from './register.api'

export const registerQueries = {
  all: () => ['register'],
  storeNamesList: () => [...registerQueries.all(), 'storeNames'],
  storeNames: (query: string) => {
    const normalized = query.replace(/\s/g, '').trim()
    return queryOptions({
      queryKey: [...registerQueries.storeNamesList(), normalized],
      queryFn: () => getStoreNames(normalized),
      enabled: normalized.length > 0,
    })
  },
  application: () =>
    queryOptions({
      queryKey: [...registerQueries.all(), 'application'],
      queryFn: getStoreApplication,
    }),
  accountVerification: () =>
    queryOptions({
      queryKey: [...registerQueries.all(), 'accountVerification'],
      queryFn: getAccountVerification,
      staleTime: 0,
    }),
}
