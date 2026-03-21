export function useNumberInput(
  value: number | null,
  onChange: (value: number | null) => void,
) {
  const displayValue =
    value !== null && value !== undefined ? value.toLocaleString('ko-KR') : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자와 쉼표 외 모든 문자 제거 (문자, 특수문자 차단)
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '')

    if (onlyNumber === '') {
      onChange(null)
      return
    }

    onChange(Number(onlyNumber))
  }

  return { displayValue, handleChange }
}
