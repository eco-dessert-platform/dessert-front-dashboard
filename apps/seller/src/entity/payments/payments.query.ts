import { queryOptions } from '@tanstack/react-query'

import {
  getDailyAmountStats,
  getDailyCountStats,
  getDailyRefundRateStats,
  getWeekdayStats,
} from './payments.api'

import type { PaymentStatsRequest } from './payments.type'

export const paymentsQueries = {
  all: () => ['payments'],
  statistics: () => [...paymentsQueries.all(), 'statistics'],
  dailyAmount: (request: PaymentStatsRequest) =>
    queryOptions({
      queryKey: [...paymentsQueries.statistics(), 'daily-amount', request],
      queryFn: () => getDailyAmountStats(request),
    }),
  dailyCount: (request: PaymentStatsRequest) =>
    queryOptions({
      queryKey: [...paymentsQueries.statistics(), 'daily-count', request],
      queryFn: () => getDailyCountStats(request),
    }),
  dailyRefundRate: (request: PaymentStatsRequest) =>
    queryOptions({
      queryKey: [...paymentsQueries.statistics(), 'daily-refund-rate', request],
      queryFn: () => getDailyRefundRateStats(request),
    }),
  weekday: (request: PaymentStatsRequest) =>
    queryOptions({
      queryKey: [...paymentsQueries.statistics(), 'weekday', request],
      queryFn: () => getWeekdayStats(request),
    }),
}
