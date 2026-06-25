import { FieldValues, Path, useFormContext } from 'react-hook-form'

export function useCreateInfoValidation<T extends FieldValues>(
  fields: Array<Path<T>>,
) {
  const form = useFormContext<T>()
  const { watch, formState } = form

  // getFieldState는 중첩 path도 정확히 판정합니다(errors[field] 직접 접근은 중첩 키를 못 읽음)
  const hasError = fields.some(
    (field) => form.getFieldState(field, formState).invalid,
  )

  // 값 존재 여부 체크 (필수값 확인용)
  const isAllFilled = fields.every((field) => {
    const val = watch(field)

    // null이나 undefined 체크
    if (val === null || val === undefined) return false

    // 문자열 체크
    if (typeof val === 'string') return val.trim() !== ''

    // 배열 체크
    if (Array.isArray(val)) return val.length > 0

    // 숫자 등 기타 타입은 존재하면 true
    return true
  })

  // 값 변화 감시
  const watchedValues = watch(fields)

  return {
    isValid: !hasError && isAllFilled,
    values: watchedValues,
  }
}
