import { FieldValues, Path, useFormContext } from 'react-hook-form'

export function CreateInfoValidator<T extends FieldValues>(
  fields: Array<Path<T>>,
) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<T>()

  // 에러 객체에 현재 섹션 필드가 있는지 체크
  const hasError = fields.some((field) => !!errors[field])

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
