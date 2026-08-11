// 토스페이먼츠 기관코드 기준
export const BANK_CODE_LABELS: Record<string, string> = {
  '02': '한국산업은행',
  '03': 'IBK기업은행',
  '04': 'KB국민은행',
  '06': 'KB국민은행',
  '07': 'Sh수협은행',
  '11': 'NH농협은행',
  '12': '단위농협(지역농축협)',
  '20': '우리은행',
  '23': 'SC제일은행',
  '27': '씨티은행',
  '30': '수협중앙회',
  '31': 'iM뱅크(대구)',
  '32': '부산은행',
  '34': '광주은행',
  '35': '제주은행',
  '37': '전북은행',
  '39': '경남은행',
  '45': '새마을금고',
  '48': '신협',
  '50': '저축은행중앙회',
  '54': '홍콩상하이은행',
  '64': '산림조합',
  '71': '우체국예금보험',
  '81': '하나은행',
  '88': '신한은행',
  '89': '케이뱅크',
  '90': '카카오뱅크',
  '92': '토스뱅크',
}

/** API가 "004" / "04"처럼 자릿수가 다른 은행코드를 줄 수 있어 정규화 */
function normalizeBankCode(code: string): string {
  const digits = code.replace(/\D/g, '')
  if (!digits) return code
  return String(Number(digits)).padStart(2, '0')
}

export function getBankLabel(code: string): string {
  const normalized = normalizeBankCode(code)
  return BANK_CODE_LABELS[normalized] ?? BANK_CODE_LABELS[code] ?? code
}

export function formatJoinDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}
