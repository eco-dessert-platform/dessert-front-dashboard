// 토스페이먼츠 표준 은행 코드. PATCH /seller/sellers/account 가 이 코드로 토스 재인증을 호출함.
export const BANK_CODES = [
  { code: '02', label: 'KDB산업은행' },
  { code: '03', label: 'IBK기업은행' },
  { code: '04', label: 'KB국민은행' },
  { code: '07', label: '수협은행' },
  { code: '11', label: 'NH농협은행' },
  { code: '12', label: '지역농축협' },
  { code: '20', label: '우리은행' },
  { code: '23', label: 'SC제일은행' },
  { code: '27', label: '한국씨티은행' },
  { code: '31', label: 'iM뱅크(대구)' },
  { code: '32', label: '부산은행' },
  { code: '34', label: '광주은행' },
  { code: '35', label: '제주은행' },
  { code: '37', label: '전북은행' },
  { code: '39', label: '경남은행' },
  { code: '45', label: '새마을금고' },
  { code: '48', label: '신협' },
  { code: '50', label: '저축은행중앙회' },
  { code: '64', label: '산림조합' },
  { code: '71', label: '우체국' },
  { code: '81', label: '하나은행' },
  { code: '88', label: '신한은행' },
  { code: '89', label: '케이뱅크' },
  { code: '90', label: '카카오뱅크' },
  { code: '92', label: '토스뱅크' },
] as const

export type BankCode = (typeof BANK_CODES)[number]['code']

const BANK_LABEL_BY_CODE: Map<string, string> = new Map(
  BANK_CODES.map((b) => [b.code, b.label]),
)

export function getBankLabel(code: string): string {
  return BANK_LABEL_BY_CODE.get(code) ?? code
}
