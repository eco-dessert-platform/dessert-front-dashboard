/**
 * 주문상태 변경 사유입력 모달에서 사용하는 상수
 *
 * 액션 바 버튼 → 사유 모달 매핑:
 * - cancelOrder, approveCancellation → 주문취소 사유
 * - rejectCancellation → 주문취소 거절 사유
 * - requestReturn, approveReturn → 반품 사유
 * - rejectReturn, turnDownReturn → 반품 거절 사유
 * - holdReturn → 반품 보류 사유
 * - requestExchange → 교환 사유
 */

/** 사유 입력이 필요한 주문 액션 타입 */
export type ReasonAction =
  | 'cancelOrder' // 주문취소 (결제완료/발주확인 탭)
  | 'approveCancellation' // 취소승인 (취소 탭)
  | 'rejectCancellation' // 취소거절 (취소 탭)
  | 'requestReturn' // 반품 (발주확인/상품발송/배송완료 탭)
  | 'approveReturn' // 반품승인 (반품/교환 탭)
  | 'rejectReturn' // 반품거절 (반품/교환 탭)
  | 'turnDownReturn' // 반품반려 (반품/교환 탭)
  | 'holdReturn' // 반품보류 (반품/교환 탭)
  | 'requestExchange' // 교환 (발주확인/상품발송/배송완료 탭)

/** 액션별 모달 타이틀 */
export const REASON_MODAL_TITLE: Record<ReasonAction, string> = {
  cancelOrder: '주문취소 사유',
  approveCancellation: '주문취소 사유',
  rejectCancellation: '주문취소 거절 사유',
  requestReturn: '반품 사유',
  approveReturn: '반품 사유',
  rejectReturn: '반품 거절 사유',
  turnDownReturn: '반품 거절 사유',
  holdReturn: '반품 보류 사유',
  requestExchange: '교환 사유',
}

/** 액션별 토스트 메시지 */
export const REASON_TOAST_MESSAGE: Record<ReasonAction, string> = {
  cancelOrder: '주문취소를 완료했어요.',
  approveCancellation: '주문취소를 완료했어요.',
  rejectCancellation: '주문취소 거절을 완료했어요.',
  requestReturn: '반품을 완료했어요.',
  approveReturn: '반품을 완료했어요.',
  rejectReturn: '반품 거절을 완료했어요.',
  turnDownReturn: '반품 거절을 완료했어요.',
  holdReturn: '반품 보류를 완료했어요.',
  requestExchange: '교환을 완료했어요.',
}

type SelectOption = { label: string; value: string }

/** 주문취소 사유 옵션 */
const CANCEL_OPTIONS: SelectOption[] = [
  { label: '고객변심', value: '고객변심' },
  { label: '구매 의사 취소', value: '구매 의사 취소' },
  { label: '주문 실수', value: '주문 실수' },
  { label: '상품 변경 후 재주문', value: '상품 변경 후 재주문' },
  { label: '상품 품절', value: '상품 품절' },
  { label: '기타', value: '기타' },
]

/** 주문취소 거절 사유 옵션 */
const REJECT_CANCEL_OPTIONS: SelectOption[] = [
  { label: '상품 발송 완료', value: '상품 발송 완료' },
  { label: '기타', value: '기타' },
]

/** 반품 사유 옵션 */
const RETURN_OPTIONS: SelectOption[] = [
  { label: '품질 이상', value: '품질 이상' },
  { label: '유통기한 초과', value: '유통기한 초과' },
  { label: '오배송', value: '오배송' },
  { label: '배송 사고', value: '배송 사고' },
  { label: '주문 실수(신선식품 불가)', value: '주문 실수(신선식품 불가)' },
  { label: '기타', value: '기타' },
]

/** 반품 거절 사유 옵션 */
const REJECT_RETURN_OPTIONS: SelectOption[] = [
  { label: '소비자 과실 손상', value: '소비자 과실 손상' },
  { label: '반품 기한 초과', value: '반품 기한 초과' },
  {
    label: '주문 실수(신선식품일 경우만)',
    value: '주문 실수(신선식품일 경우만)',
  },
]

/** 반품 보류 사유 옵션 */
const HOLD_RETURN_OPTIONS: SelectOption[] = [
  {
    label: '반품 요청 기한 내 판단 불가',
    value: '반품 요청 기한 내 판단 불가',
  },
  { label: '추가 확인 필요', value: '추가 확인 필요' },
  { label: '기타', value: '기타' },
]

/** 교환 사유 옵션 */
const EXCHANGE_OPTIONS: SelectOption[] = [
  { label: '품질 이상', value: '품질 이상' },
  { label: '유통기한 초과', value: '유통기한 초과' },
  { label: '오배송', value: '오배송' },
  { label: '배송 사고', value: '배송 사고' },
  { label: '주문 실수(신선식품 불가)', value: '주문 실수(신선식품 불가)' },
  { label: '기타', value: '기타' },
]

/** 액션별 사유유형 드롭다운 옵션 */
export const REASON_TYPE_OPTIONS: Record<ReasonAction, SelectOption[]> = {
  cancelOrder: CANCEL_OPTIONS,
  approveCancellation: CANCEL_OPTIONS,
  rejectCancellation: REJECT_CANCEL_OPTIONS,
  requestReturn: RETURN_OPTIONS,
  approveReturn: RETURN_OPTIONS,
  rejectReturn: REJECT_RETURN_OPTIONS,
  turnDownReturn: REJECT_RETURN_OPTIONS,
  holdReturn: HOLD_RETURN_OPTIONS,
  requestExchange: EXCHANGE_OPTIONS,
}

/** 사유 입력이 필요한 액션인지 확인 */
export const REASON_REQUIRED_ACTIONS: Set<string> = new Set<string>([
  'cancelOrder',
  'approveCancellation',
  'rejectCancellation',
  'requestReturn',
  'approveReturn',
  'rejectReturn',
  'turnDownReturn',
  'holdReturn',
  'requestExchange',
])
