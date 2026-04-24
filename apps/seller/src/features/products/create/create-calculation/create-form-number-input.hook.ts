import { useEffect, useState } from 'react'

export function useNumberInput(
  value: number | null | undefined, // undefined 추가
  onChange: (value: number | null) => void,
  options?: { allowNegative?: boolean },
) {
  const { allowNegative = false } = options ?? {}

  // 💡 undefined 체크 추가하여 에러 방지
  const [displayValue, setDisplayValue] = useState(
    value !== null && value !== undefined ? value.toLocaleString('ko-KR') : '',
  )

  useEffect(() => {
    // 💡 undefined 체크 추가하여 에러 방지
    setDisplayValue(
      value !== null && value !== undefined
        ? value.toLocaleString('ko-KR')
        : '',
    )
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value

    const cleaned = allowNegative
      ? raw.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, '')
      : raw.replace(/[^0-9]/g, '')

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
