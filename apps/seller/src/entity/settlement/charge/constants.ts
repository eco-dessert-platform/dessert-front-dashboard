import { ChargeRow } from './entities'

export const CATEGORY_LABELS: Record<ChargeRow['category'], string> = {
  ACCUMULATE: '충전',
  DEDUCT: '차감',
}

export const STATUS_LABELS: Record<ChargeRow['status'], string> = {
  PENDING: '대기',
  COMPLETED: '완료',
}
