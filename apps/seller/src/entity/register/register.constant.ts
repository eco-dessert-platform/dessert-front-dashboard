export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf'] as const,
}

// 토스페이먼츠 기관코드 기준 (https://docs.tosspayments.com/codes/org-codes)
export const BANK_OPTIONS = [
  { label: '경남은행', value: '39' },
  { label: '광주은행', value: '34' },
  { label: '부산은행', value: '32' },
  { label: '새마을금고', value: '45' },
  { label: '산림조합', value: '64' },
  { label: '신한은행', value: '88' },
  { label: '신협', value: '48' },
  { label: '씨티은행', value: '27' },
  { label: '우리은행', value: '20' },
  { label: '우체국예금보험', value: '71' },
  { label: '저축은행중앙회', value: '50' },
  { label: '전북은행', value: '37' },
  { label: '제주은행', value: '35' },
  { label: '카카오뱅크', value: '90' },
  { label: '케이뱅크', value: '89' },
  { label: '토스뱅크', value: '92' },
  { label: '하나은행', value: '81' },
  { label: '홍콩상하이은행', value: '54' },
  { label: 'IBK기업은행', value: '03' },
  { label: 'KB국민은행', value: '04' },
  { label: 'iM뱅크(대구)', value: '31' },
  { label: '한국산업은행', value: '02' },
  { label: 'NH농협은행', value: '11' },
  { label: 'SC제일은행', value: '23' },
  { label: 'Sh수협은행', value: '07' },
]
