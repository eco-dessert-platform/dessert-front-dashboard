import { format, parseISO } from 'date-fns'
import type { DateRange } from 'react-day-picker'

export const stringToDateRange = (
  start?: string,
  end?: string,
): DateRange => ({
  from: start ? parseISO(start) : undefined,
  to: end ? parseISO(end) : undefined,
})

export const dateToString = (date?: Date) =>
  date ? format(date, 'yyyy-MM-dd') : undefined

export const dateRangeToFilterDates = (range?: DateRange) => ({
  startDate: dateToString(range?.from),
  endDate: dateToString(range?.to),
})
