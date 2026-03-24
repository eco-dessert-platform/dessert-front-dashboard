import { useEffect, useState } from 'react'

export function useNumberInput(
  value: number | null,
  onChange: (value: number | null) => void,
  options?: { allowNegative?: boolean },
) {
  const { allowNegative = false } = options ?? {}

  const [displayValue, setDisplayValue] = useState(
    value !== null ? value.toLocaleString('ko-KR') : '',
  )

  useEffect(() => {
    setDisplayValue(value !== null ? value.toLocaleString('ko-KR') : '')
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value

    const cleaned = allowNegative
      ? raw.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '')
      : raw.replace(/[^0-9]/g, '')

    // '-' 만 입력된 중간 상태는 표시만 유지, onChange는 호출 안 함
    if (cleaned === '-') {
      setDisplayValue('-')
      return
    }

    if (cleaned === '') {
      setDisplayValue('')
      onChange(null)
      return
    }

    const num = Number(cleaned)
    setDisplayValue(num.toLocaleString('ko-KR'))
    onChange(num)
  }

  return { displayValue, handleChange }
}
