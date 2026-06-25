import { IChargeRow } from './entities'

export const CATEGORY_LABELS: Record<IChargeRow['category'], string> = {
  ACCUMULATE: '충전',
  DEDUCT: '차감',
}

export const STATUS_LABELS: Record<IChargeRow['status'], string> = {
  PENDING: '대기',
  COMPLETED: '완료',
}
